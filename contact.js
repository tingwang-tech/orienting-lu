/* Builds the privacy-page mailto link so the address is not in the HTML. */
(function () {
  "use strict";

  var link = document.getElementById("contact-email");
  if (!link) return;

  var address = "hi" + "@" + "tzuting.com";
  link.textContent = address;
  link.href = "mailto:" + address;
  link.hidden = false;
})();
