// Returns a mutation observer on the specified element with the given callback.
function addMutationObserver(domElement, callback, config) {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(callback);
  observer.observe(domElement, config);
  return observer;
}

function checkForElement(selector, callback) {
  var elt = document.querySelector(selector);
  if (elt) {
    if (callback) {
      callback(elt);
      return;
    } else {
      console.debug(selector + " element found");
      return elt;
    }
  }
}

function checkForElements(selector, callback) {
  var elt = document.querySelectorAll(selector);
  if (elt.length > 0) {
    if (callback) {
      callback(elt);
      return;
    } else {
      console.debug(selector + " element found");
      return elt;
    }
  }
}

function checkForBodyElement() {
  return checkForElement("body", onBodyFound);
}

function onScriptsFound(scriptElts) {
  console.debug("Script element found!");
  if (!injected_script) {
    for (var i = 0; i < scriptElts.length; i++) {
      var scriptElt = scriptElts.item(i);
      var result = scriptElt.outerHTML.indexOf("function setButtonNav");
      if (result !== -1) {
        var location = chrome.extension.getURL('js/submissionBuild-pageScript.js');
        injectExtScriptAfter(scriptElt, location);
        injected_script = true;
        break;
      }
    }
  }
}

function checkForBodyScripts() {
  return checkForElements('body > script:not([src])', onScriptsFound);
}

function injectExtScriptAfter(elt, location) {
  var script = document.createElement("script");
  script.src = location;
  elt.parentNode.insertBefore(script, elt.nextSibling);
}

function onBodyFound(bodyDom) {
  console.debug("Body found!");
  var config = { childList: true };
  
  addMutationObserver(bodyDom, checkForBodyScripts, config);
}

console.debug("Contingent Staffing Fixer");

var html_elt = document.querySelector("html");

var injected_script = false;

// Add mutation observer to html node
var config = { childList: true };
addMutationObserver(html_elt, checkForBodyElement, config);