console.debug("Contingent Staffing Fixer");

// Block loading of the tabs.js script that is causing problems.
function blockTabsLoad(event) {
  var element = event.target;
  var tab_pattern = /\/.*\/_resource\/ZUI\/js\/tabs.js/
  console.debug("In tab.js blocking function.");
  if (element.nodeName.toUpperCase() === 'SCRIPT') {
    var src = element.src;
    if (tab_pattern.exec(src)) {
      //event.preventDefault();
      console.debug("Matched.");
    }
  }
}

document.addEventListener("beforeload", blockTabsLoad, true);