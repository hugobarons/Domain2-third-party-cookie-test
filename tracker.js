(function () {
    const trackerData = {
        loadedAt: new Date().toISOString(),
        pageUrl: window.location.href,
        referrer: document.referrer || "(no referrer)"
    };

    try {
        document.cookie = "tp_script_cookie=script_loaded_" + Date.now() + "; path=/; SameSite=None; Secure";
    } catch (error) {
        console.log("Domain2 tracker.js ielādēšanas laikā sīkdatņu ierakstīšana neizdevās:", error);
    }

    console.log("Domain2 tracker.js ielādēts", trackerData);

    window.domain2TrackerInfo = {
        status: "ielādēts",
        cookie: document.cookie || "(empty)",
        loadedAt: trackerData.loadedAt,
        referrer: trackerData.referrer
    };

    const trackerNotice = document.createElement("div");
    trackerNotice.style.marginTop = "16px";
    trackerNotice.style.padding = "12px";
    trackerNotice.style.border = "1px solid #d1d5db";
    trackerNotice.style.borderRadius = "8px";
    trackerNotice.style.background = "#f9fafb";
    trackerNotice.textContent =
        "Domain2 tracker.js ielādēts. Pārbaudiet konsoli un document.cookie priekš rezultātiem.";

    document.body.appendChild(trackerNotice);
})();