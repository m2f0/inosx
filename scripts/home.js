(function () {
  var badge = document.getElementById("versionBadge");
  if (!badge) return;
  fetch("/version.json", { cache: "default" })
    .then(function (r) {
      return r.ok ? r.json() : Promise.reject();
    })
    .then(function (v) {
      document.getElementById("versionBadgeVer").textContent = "v" + v.version;
      var shortHash = (v.hash || "").slice(0, 7);
      document.getElementById("versionBadgeHash").textContent = shortHash;
      if (v.hash) badge.href = "https://github.com/m2f0/inosx/commit/" + v.hash;
    })
    .catch(function () {
      badge.style.display = "none";
    });
})();

const productTabs = [
  ...document.querySelectorAll(".tabs button[aria-controls]"),
];
function selectProductFamily(panelId) {
  for (const tab of productTabs) {
    const selected = tab.getAttribute("aria-controls") === panelId;
    tab.setAttribute("aria-pressed", String(selected));
    document.getElementById(tab.getAttribute("aria-controls")).hidden =
      !selected;
  }
}
for (const tab of productTabs) {
  tab.addEventListener("click", () =>
    selectProductFamily(tab.getAttribute("aria-controls")),
  );
}
function revealFragment() {
  const target = document.getElementById(location.hash.slice(1));
  if (!target) return;
  const panel = target.closest("#apps, #education");
  if (panel) selectProductFamily(panel.id);
  if (target.matches("details")) target.open = true;
  if (panel) target.scrollIntoView();
}
window.addEventListener("hashchange", revealFragment);
revealFragment();

const languages = document.querySelectorAll(".langs a");
function updateLanguageLinks() {
  const lang = document.documentElement.lang.slice(0, 2);
  for (const link of languages) {
    const languageUrl = new URL(location.href);
    languageUrl.searchParams.set("lang", link.lang);
    link.href = languageUrl.href;
    if (link.lang === lang) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
  for (const link of document.querySelectorAll("[data-agentos-link]")) {
    link.href = "https://agentos.inosx.com/?lang=" + lang;
  }
  document.querySelector(".poster").href =
    "https://youtu.be/" + (lang === "pt" ? "KvdfqKYER9g" : "vOsdKmG0hGQ");
}
for (const link of languages) {
  link.addEventListener("click", (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      !window.i18n
    )
      return;
    event.preventDefault();
    window.i18n.setLanguage(link.lang);
  });
}
document.addEventListener("inosx-language", updateLanguageLinks);
window.addEventListener("hashchange", updateLanguageLinks);
updateLanguageLinks();
