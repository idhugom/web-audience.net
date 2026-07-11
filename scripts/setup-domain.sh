#!/usr/bin/env bash
# Configure custom domain + DNS + apex→www redirect for web-audience.net.
# Serves the site on https://www.web-audience.net and 301-redirects the apex
# (web-audience.net) to the www version. Records live in the (pending) zone and
# activate automatically once the nameservers are pointed to Cloudflare.
#
# Requires env: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
set -euo pipefail

ZONE_ID="61ac55a36ecee07c24163032ecec14f9"
PROJECT="web-audience-preprod"
PAGES_HOST="web-audience-preprod.pages.dev"
API="https://api.cloudflare.com/client/v4"
AUTH=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json")

echo "1) Attach www.web-audience.net as a custom domain on the Pages project…"
curl -sS -X POST "${API}/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${PROJECT}/domains" \
  "${AUTH[@]}" --data '{"name":"www.web-audience.net"}' | python3 -c "import sys,json;d=json.load(sys.stdin);print('   ->',d.get('success'),d.get('errors') or '')"

echo "2) DNS: CNAME www -> ${PAGES_HOST} (proxied)…"
curl -sS -X POST "${API}/zones/${ZONE_ID}/dns_records" "${AUTH[@]}" \
  --data "{\"type\":\"CNAME\",\"name\":\"www\",\"content\":\"${PAGES_HOST}\",\"proxied\":true,\"comment\":\"Pages preprod\"}" \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('   ->',d.get('success'),d.get('errors') or '')"

echo "3) DNS: apex web-audience.net (proxied) so the redirect rule can catch it…"
curl -sS -X POST "${API}/zones/${ZONE_ID}/dns_records" "${AUTH[@]}" \
  --data "{\"type\":\"CNAME\",\"name\":\"@\",\"content\":\"${PAGES_HOST}\",\"proxied\":true,\"comment\":\"apex -> redirect to www\"}" \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('   ->',d.get('success'),d.get('errors') or '')"

echo "4) Redirect rule: web-audience.net/* -> https://www.web-audience.net/* (301)…"
curl -sS -X PUT "${API}/zones/${ZONE_ID}/rulesets/phases/http_request_dynamic_redirect/entrypoint" "${AUTH[@]}" \
  --data '{
    "rules": [{
      "action": "redirect",
      "expression": "(http.host eq \"web-audience.net\")",
      "description": "Apex to www",
      "action_parameters": {
        "from_value": {
          "status_code": 301,
          "target_url": { "expression": "concat(\"https://www.web-audience.net\", http.request.uri.path)" },
          "preserve_query_string": true
        }
      }
    }]
  }' | python3 -c "import sys,json;d=json.load(sys.stdin);print('   ->',d.get('success'),d.get('errors') or '')"

echo "Done. Point the registrar nameservers to: elliott.ns.cloudflare.com / tani.ns.cloudflare.com"
