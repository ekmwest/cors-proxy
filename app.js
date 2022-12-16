import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(handler);

async function handler(req) {
    const remoteUrl = extractRemoteUrl(req);
    if (!remoteUrl) {
        return notFound();
    }

    const res = await fetch(remoteUrl);

    const proxyHeaders = createProxyHeaders(res.headers);

    return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers: proxyHeaders
    });
}

function extractRemoteUrl(req) {
    const url = new URL(req.url);
    const remoteUrl = url.href.replace(url.origin + '/', '');

    if (!remoteUrl.startsWith('http://') && !remoteUrl.startsWith('https://')) {
        return null;
    }
    return remoteUrl;
}

function createProxyHeaders(headers) {
    const proxyHeaders = new Headers();

    for (const header of headers.entries()) {
        proxyHeaders.set(header[0], header[1]);
    }

    proxyHeaders.set("access-control-allow-origin", "*");

    return proxyHeaders;
}

async function notFound() {
    return new Response('Not Found', { status: 404 });
}
