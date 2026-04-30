# GCP deploy setup

The `deploy.yml` workflow deploys this site to GCP Cloud Run via
Workload Identity Federation (no service-account keys in repo secrets).
Configure once per GCP project; subsequent deploys are automatic on
push to `main`.

## One-time GCP setup

```bash
# Pick names — adjust to match your org's conventions.
export GCP_PROJECT_ID="agentproto-public"
export GCP_REGION="europe-west1"
export ARTIFACT_REPO="agentproto"
export SERVICE_NAME="agentproto-site"
export DEPLOY_SA="agentproto-site-deployer"

# 1. Create the project (skip if it already exists).
gcloud projects create $GCP_PROJECT_ID --name="agentproto"
gcloud config set project $GCP_PROJECT_ID

# 2. Enable required APIs.
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  iamcredentials.googleapis.com \
  iam.googleapis.com

# 3. Create the Artifact Registry repo for the docker image.
gcloud artifacts repositories create $ARTIFACT_REPO \
  --repository-format=docker \
  --location=$GCP_REGION \
  --description="agentproto container images"

# 4. Create the deploy service account.
gcloud iam service-accounts create $DEPLOY_SA \
  --display-name="agentproto-site GitHub deploy SA"

DEPLOY_SA_EMAIL="$DEPLOY_SA@$GCP_PROJECT_ID.iam.gserviceaccount.com"

# 5. Grant deploy permissions to the SA.
for ROLE in \
  roles/run.admin \
  roles/artifactregistry.writer \
  roles/iam.serviceAccountUser \
  roles/storage.admin
do
  gcloud projects add-iam-policy-binding $GCP_PROJECT_ID \
    --member="serviceAccount:$DEPLOY_SA_EMAIL" \
    --role="$ROLE"
done

# 6. Create the Workload Identity Pool + Provider for GitHub OIDC.
gcloud iam workload-identity-pools create "github-actions" \
  --location=global \
  --display-name="GitHub Actions"

WIF_POOL_ID=$(gcloud iam workload-identity-pools describe "github-actions" \
  --location=global --format='value(name)')

gcloud iam workload-identity-pools providers create-oidc "github" \
  --location=global \
  --workload-identity-pool="github-actions" \
  --display-name="GitHub" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner=='agentproto'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

WIF_PROVIDER=$(gcloud iam workload-identity-pools providers describe "github" \
  --location=global --workload-identity-pool="github-actions" \
  --format='value(name)')

# 7. Bind the GitHub repo to the deploy SA via WIF.
gcloud iam service-accounts add-iam-policy-binding $DEPLOY_SA_EMAIL \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/$WIF_POOL_ID/attribute.repository/agentproto/site"

echo "WIF provider: $WIF_PROVIDER"
echo "Deploy SA:    $DEPLOY_SA_EMAIL"
```

## GitHub repo configuration

Open `https://github.com/agentproto/site/settings/variables/actions`
and add the following **repository variables** (not secrets — these
are non-sensitive):

| Variable | Value |
|---|---|
| `GCP_PROJECT_ID` | `agentproto-public` (or your project id) |
| `GCP_REGION` | `europe-west1` |
| `ARTIFACT_REPO` | `agentproto` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | output from step 6 above (`projects/.../providers/github`) |
| `GCP_DEPLOY_SA` | output from step 4 (`agentproto-site-deployer@<project>.iam.gserviceaccount.com`) |

## Triggering content rebuilds

The deploy runs:
- On every push to `main` (build + deploy)
- On manual dispatch from the Actions tab
- On `repository_dispatch` of type `content-changed` (sent by the
  `agentproto/agentproto` repo when specs change — see
  `.github/workflows/notify-site.yml` in that repo)

For the cross-repo dispatch to work, generate a fine-grained PAT with
`repo:write` scope on `agentproto/site` and store it as the
`SITE_DISPATCH_TOKEN` secret in `agentproto/agentproto`.

## Custom domain

After the first successful deploy, map `agentproto.sh` to the Cloud
Run service:

```bash
gcloud run domain-mappings create \
  --service=$SERVICE_NAME \
  --domain=agentproto.sh \
  --region=$GCP_REGION
```

Then add the DNS records GCP outputs (TXT for verification + CNAME or
A for the apex/subdomain).
