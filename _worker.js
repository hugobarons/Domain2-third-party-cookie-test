export default {
async fetch(request, env) {
  const url = new URL(request.url);

  if (url.pathname === "/api/set-third-cookie") {
    const testId = url.searchParams.get("test_id") || `tp_${Date.now()}`;

    return new Response(
      JSON.stringify({
        ok: true,
        scenario: "third-party-set-cookie",
        cookieName: "tp_cookie_server",
        cookieValue: testId,
        message: "Third-party cookie was set by Domain2 server response"
      }),
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store",
          "set-cookie": `tp_cookie_server=${testId}; Path=/; Max-Age=1800; Secure; SameSite=None`
        }
      }
    );
  }

  if (url.pathname === "/api/show-third-cookie") {
    const cookieHeader = request.headers.get("cookie") || "";
    const parsedValue = getCookieValue(cookieHeader, "tp_cookie_server");

    return new Response(
      JSON.stringify({
        ok: true,
        scenario: "third-party-show-cookie",
        receivedCookieHeader: cookieHeader || null,
        parsedCookieValue: parsedValue
      }),
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store"
        }
      }
    );
  }

  return env.ASSETS.fetch(request);
}
};

function getCookieValue(cookieHeader, name) {
if (!cookieHeader) return null;

const parts = cookieHeader.split(/;\s*/);

for (const part of parts) {
  const [key, ...rest] = part.split("=");
  if (key === name) {
    return rest.join("=") || "";
  }
}

return null;
}
