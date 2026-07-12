// Cloudflare Pages middleware: redirect the apex (sans-www) to the www host.
// The API token lacks Rulesets/Page Rules scope and _redirects can't match on
// host, so the host-based 301 is handled here (runs before static serving).
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'web-audience.net') {
    url.hostname = 'www.web-audience.net';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
