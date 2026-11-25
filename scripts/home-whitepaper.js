(function () {
  var toast = document.querySelector("[data-whitepaper-toast]");
  if (!toast) return;

  var endpoint = toast.getAttribute("data-endpoint") || "";
  var downloadUrl = toast.getAttribute("data-download-url") || "";
  var form = toast.querySelector("[data-whitepaper-form]");
  var closeButton = toast.querySelector("[data-whitepaper-close]");
  var status = toast.querySelector("[data-whitepaper-status]");
  var submitButton = form ? form.querySelector('button[type="submit"]') : null;
  var downloadLink = toast.querySelector("[data-whitepaper-download]");
  var dismissedKey = "inosx.whitepaper.dismissedUntil";
  var completedKey = "inosx.whitepaper.completedUntil";
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function trimField(value, limit) {
    return String(value || "")
      .trim()
      .slice(0, limit);
  }
  function now() {
    return Date.now();
  }
  function daysFromNow(days) {
    return now() + days * 24 * 60 * 60 * 1000;
  }
  function getStoredUntil(key) {
    var value = Number(window.localStorage.getItem(key) || 0);
    return Number.isFinite(value) ? value : 0;
  }
  function suppressUntil(key, days) {
    window.localStorage.setItem(key, String(daysFromNow(days)));
  }
  function isSuppressed() {
    return (
      getStoredUntil(dismissedKey) > now() ||
      getStoredUntil(completedKey) > now()
    );
  }
  function setStatus(message, type) {
    if (!status) return;
    status.textContent = message || "";
    status.classList.toggle("is-error", type === "error");
    status.classList.toggle("is-success", type === "success");
  }
  function isSafeIntakeEndpoint(value) {
    try {
      var url = new URL(value);
      return (
        url.protocol === "https:" &&
        url.hostname === "api.inosx.com" &&
        url.pathname === "/v1/public-intake"
      );
    } catch (e) {
      return false;
    }
  }
  function isSafeDownloadUrl(value) {
    try {
      var url = new URL(value, window.location.origin);
      return (
        url.origin === window.location.origin &&
        url.pathname ===
          "/assets/whitepaper/AITEAM-X_Operating_Agents_Whitepaper.pdf" &&
        !url.search &&
        !url.hash
      );
    } catch (e) {
      return false;
    }
  }
  function showToast() {
    if (isSuppressed()) return;
    toast.hidden = false;
    if (window.turnstile) window.inosxTurnstileReady();
    window.requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });
  }
  function hideToast() {
    toast.classList.remove("is-visible");
    window.setTimeout(function () {
      toast.hidden = true;
    }, 180);
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      suppressUntil(dismissedKey, 7);
      hideToast();
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(form);
      var email = trimField(formData.get("email"), 120).toLowerCase();
      var name = trimField(formData.get("name"), 80);
      var company = trimField(formData.get("company"), 120);
      var consent = formData.get("consent") === "on";

      if (!email || !emailPattern.test(email)) {
        setStatus(window.i18n.t("landing.extra.message_1"), "error");
        var emailInput = form.querySelector('input[name="email"]');
        if (emailInput) emailInput.focus();
        return;
      }
      if (!consent) {
        setStatus(window.i18n.t("landing.extra.message_2"), "error");
        var consentInput = form.querySelector('input[name="consent"]');
        if (consentInput) consentInput.focus();
        return;
      }
      var widget = form.querySelector("[data-turnstile-container]");
      var widgetId = widget ? widget.getAttribute("data-widget-id") : "";
      var turnstileToken = formData.get("cf-turnstile-response") || "";
      if (
        !isSafeIntakeEndpoint(endpoint) ||
        !isSafeDownloadUrl(downloadUrl) ||
        !turnstileToken
      ) {
        setStatus(window.i18n.t("landing.extra.message_3"), "error");
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = window.i18n.t("landing.extra.message_4");
      }
      if (downloadLink) downloadLink.hidden = true;
      setStatus(window.i18n.t("landing.extra.message_5"));

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "whitepaper",
          email: email,
          name: name || email.split("@")[0],
          company: company,
          message: "Requested AITEAM-X Operating Agents whitepaper",
          source: "inosx.com",
          sourceRef: "operating-agents-whitepaper",
          consent: true,
          locale: document.documentElement.lang === "en" ? "en" : "pt-BR",
          turnstileToken: turnstileToken,
        }),
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return {};
            })
            .then(function (data) {
              if (
                !response.ok ||
                (data.status !== "accepted" && data.status !== "duplicate")
              ) {
                throw new Error(
                  data.status || "intake_failed_" + response.status,
                );
              }
              return data;
            });
        })
        .then(function () {
          suppressUntil(completedKey, 30);
          if (downloadLink) {
            downloadLink.href = downloadUrl;
            downloadLink.hidden = false;
            downloadLink.focus();
            downloadLink.click();
          }
          setStatus(window.i18n.t("landing.extra.message_6"), "success");
        })
        .catch(function () {
          setStatus(window.i18n.t("landing.extra.message_7"), "error");
        })
        .finally(function () {
          if (widgetId && window.turnstile)
            widget.dispatchEvent(new Event("intake-reset"));
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = window.i18n.t("landing.extra.message_8");
          }
        });
    });
  }

  // The whitepaper remains available for a future contextual trigger. It must not interrupt the first reading pass.
})();
