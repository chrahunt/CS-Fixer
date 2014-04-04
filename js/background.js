// Redirect requests to tabs.js
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    
    if (details.url == "https://agencystaffing.apihealthcare.com/flexnurse/_resource/scripts/tabs.js" ||
        details.url == "https://agencystaffing.apihealthcare.com/flexnurse/_resource/ZUI/js/tabs.js") {
      console.debug("Redirecting to alternate tabs.js.");
      return { redirectUrl: chrome.extension.getURL("js/tabs.js") };
    }
  },
  {urls: ["*://agencystaffing.apihealthcare.com/*tabs.js"]},
  ["blocking"]);