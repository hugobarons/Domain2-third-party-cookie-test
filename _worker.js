export default {
async fetch(request, env) {
  const url = new URL(request.url);

  if (url.pathname === "/api/set-third-cookie") {
    const testId = url.searchParams.get("test_id") || `tp_${Date.now()}`;

    return jsonResponse({
      ok: true,
      scenario: "third-party-set-cookie",
      cookieName: "tp_cookie_server",
      cookieValue: testId,
      message: "Third-party cookie was set by Domain2 server response"
    }, {
      "set-cookie": `tp_cookie_server=${testId}; Path=/; Max-Age=1800; Secure; SameSite=None`
    });
  }

  if (url.pathname === "/api/show-third-cookie") {
    const cookieHeader = request.headers.get("cookie") || "";
    const parsedValue = getCookieValue(cookieHeader, "tp_cookie_server");

    return jsonResponse({
      ok: true,
      scenario: "third-party-show-cookie",
      receivedCookieHeader: cookieHeader || null,
      parsedCookieValue: parsedValue
    });
  }

  if (url.pathname === "/api/set-third-cookie-chips") {
    const testId = url.searchParams.get("test_id") || `chips_${Date.now()}`;

    return jsonResponse({
      ok: true,
      scenario: "third-party-chips-cookie",
      cookieName: "tp_cookie_partitioned",
      cookieValue: testId,
      message: "Partitioned third-party cookie was set by Domain2 server response"
    }, {
      "set-cookie": `tp_cookie_partitioned=${testId}; Path=/; Max-Age=1800; Secure; SameSite=None; Partitioned`
    });
  }

  if (url.pathname === "/api/show-third-cookie-chips") {
    const cookieHeader = request.headers.get("cookie") || "";
    const parsedValue = getCookieValue(cookieHeader, "tp_cookie_partitioned");

    return jsonResponse({
      ok: true,
      scenario: "third-party-show-chips-cookie",
      receivedCookieHeader: cookieHeader || null,
      parsedCookieValue: parsedValue
    });
  }

  if (url.pathname === "/api/set-storage-access-cookie") {
    const testId = url.searchParams.get("test_id") || `saa_${Date.now()}`;

    return jsonResponse({
      ok: true,
      scenario: "storage-access-set-cookie",
      cookieName: "saa_cookie",
      cookieValue: testId,
      message: "Storage Access API preparation cookie was set"
    }, {
      "set-cookie": `saa_cookie=${testId}; Path=/; Max-Age=1800; Secure; SameSite=None`
    });
  }

  if (url.pathname === "/api/show-storage-access-cookie") {
    const cookieHeader = request.headers.get("cookie") || "";
    const parsedValue = getCookieValue(cookieHeader, "saa_cookie");

    return jsonResponse({
      ok: true,
      scenario: "storage-access-show-cookie",
      receivedCookieHeader: cookieHeader || null,
      parsedCookieValue: parsedValue
    });
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

function jsonResponse(payload, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store",
      ...extraHeaders
    }
  });
}
