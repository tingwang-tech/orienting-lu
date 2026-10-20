/*
 * Gates the homepage Google Form until the visitor accepts.
 *
 * orienting.lu has no site-wide cookie banner. This file covers the
 * contact embed only. A slot opts in with:
 *
 * <div class="consent-embed" data-consent-src="https://...">
 *   <div class="consent-fallback">...</div>
 * </div>
 *
 * The iframe is created only after Accept. The choice is stored in
 * localStorage under "orienting-consent".
 */
(function () {
  "use strict";

  var STORAGE_KEY = "orienting-consent";
  var memoryChoice = null;

  function readChoice() {
    if (memoryChoice === "accepted") return memoryChoice;
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      if (value === "accepted") {
        memoryChoice = value;
        return value;
      }
    } catch (err) {
      /* Storage can throw in private mode. Fall back to this page view. */
    }
    return memoryChoice;
  }

  function writeChoice() {
    memoryChoice = "accepted";
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch (err) {}
  }

  function slots() {
    return document.querySelectorAll(".consent-embed[data-consent-src]");
  }

  function httpsUrl(value) {
    try {
      return new URL(value, window.location.href).protocol === "https:";
    } catch (err) {
      return false;
    }
  }

  function mount(slot) {
    if (slot.querySelector("iframe")) return;
    var src = slot.getAttribute("data-consent-src");
    if (!httpsUrl(src)) return;
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = slot.getAttribute("data-consent-title") || "Embedded form";
    var width = slot.getAttribute("data-consent-width");
    var height = slot.getAttribute("data-consent-height");
    if (width) iframe.width = width;
    if (height) iframe.height = height;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("scrolling", slot.getAttribute("data-consent-scrolling") || "auto");
    iframe.style.border = "0";
    iframe.style.background = "transparent";
    var fallback = slot.querySelector(".consent-fallback");
    if (fallback) slot.insertBefore(iframe, fallback);
    else slot.appendChild(iframe);
    slot.classList.add("is-loaded");
    if (fallback) fallback.hidden = true;
  }

  function apply() {
    if (readChoice() !== "accepted") return;
    slots().forEach(mount);
  }

  function onClick(event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var accept = target.closest("[data-consent-accept]");
    if (!accept) return;
    event.preventDefault();
    writeChoice();
    apply();
    var slot = accept.closest(".consent-embed");
    if (slot) {
      slot.tabIndex = -1;
      slot.focus();
    }
  }

  function init() {
    apply();
    document.addEventListener("click", onClick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
