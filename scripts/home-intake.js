(function () {
  var form = document.getElementById("leadForm");
  var btn = document.getElementById("leadSubmit");
  var ok = document.getElementById("leadSuccess");
  var err = document.getElementById("leadError");
  if (!form) return;

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    ok.classList.remove("show");
    err.classList.remove("show");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btn.disabled = true;
    var labelSpan = btn.querySelector("span:first-child");
    var prev = labelSpan.textContent;
    labelSpan.textContent = window.i18n.t("landing.extra.message_0");

    var data = new FormData(form);
    var endpoint = form.getAttribute("data-endpoint") || "";
    var widget = form.querySelector("[data-turnstile-container]");
    var widgetId = widget ? widget.getAttribute("data-widget-id") : "";
    var turnstileToken = data.get("cf-turnstile-response") || "";
    var safeEndpoint = false;
    try {
      var endpointUrl = new URL(endpoint);
      safeEndpoint =
        endpointUrl.protocol === "https:" &&
        endpointUrl.hostname === "api.inosx.com" &&
        endpointUrl.pathname === "/v1/public-intake";
    } catch (e) {}
    if (!safeEndpoint || !turnstileToken) {
      err.classList.add("show");
      btn.disabled = false;
      labelSpan.textContent = prev;
      return;
    }

    if (data.get("_gotcha")) {
      ok.classList.add("show");
      form.reset();
      btn.disabled = false;
      labelSpan.textContent = prev;
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact",
        name: data.get("name"),
        email: data.get("email"),
        company: data.get("company"),
        phone: data.get("phone"),
        message: data.get("message"),
        source: "inosx.com",
        sourceRef: "contact-form",
        consent: data.get("consent") === "on",
        locale: document.documentElement.lang === "en" ? "en" : "pt-BR",
        turnstileToken: turnstileToken,
      }),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (result) {
            if (
              !res.ok ||
              (result.status !== "accepted" && result.status !== "duplicate")
            )
              throw new Error("intake_failed");
            ok.classList.add("show");
            form.reset();
          });
      })
      .catch(function () {
        err.classList.add("show");
      })
      .finally(function () {
        if (widgetId && window.turnstile)
          widget.dispatchEvent(new Event("intake-reset"));
        btn.disabled = false;
        labelSpan.textContent = prev;
      });
  });
})();
