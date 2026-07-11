#!/usr/bin/env python3
"""Fetch all post metadata from the SOURCE WordPress site (web-audience.net).
Keeps title + slug 100% identical; permalinks are /{slug}.html."""
import json, urllib.request, sys, time

BASE = "https://www.web-audience.net/wp-json/wp/v2"

def get(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "wa-migrate/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode("utf-8")), dict(r.headers)
        except Exception as e:
            if i == tries - 1:
                raise
            time.sleep(2 * (i + 1))

posts = []
page = 1
while True:
    url = (f"{BASE}/posts?per_page=100&page={page}&_embed=1"
           "&_fields=id,slug,title,date,modified,link,featured_media,excerpt,_links,_embedded")
    data, headers = get(url)
    if not data:
        break
    for p in data:
        fm = None
        emb = p.get("_embedded", {}).get("wp:featuredmedia")
        if emb and isinstance(emb, list) and emb[0].get("source_url"):
            fm = emb[0]["source_url"]
        posts.append({
            "id": p["id"],
            "slug": p["slug"],
            "title": p["title"]["rendered"],
            "date": p["date"],
            "modified": p.get("modified"),
            "link": p["link"],
            "featured_media_id": p.get("featured_media"),
            "featured_image": fm,
            "excerpt": p["excerpt"]["rendered"],
        })
    total_pages = int(headers.get("X-WP-TotalPages", page))
    print(f"page {page}/{total_pages} -> {len(posts)} posts", file=sys.stderr)
    if page >= total_pages:
        break
    page += 1

with open("data/posts.json", "w", encoding="utf-8") as f:
    json.dump(posts, f, ensure_ascii=False, indent=1)

with_img = sum(1 for p in posts if p["featured_image"])
html = sum(1 for p in posts if p["link"].endswith(".html"))
print(f"TOTAL={len(posts)} WITH_IMAGE_URL={with_img} DOTHTML_LINKS={html}", file=sys.stderr)
