# cors-proxy

Proxy server that adds `access-control-allow-origin=*` to the response.

## Usage

```js
const imageUrl = 'https://via.placeholder.com/150';
const corsProxyUrl = `https://proxie.deno.dev/${imageUrl}`;
const res = await fetch(corsProxyUrl);
```