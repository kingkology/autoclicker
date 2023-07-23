document.getElementById("startStop").addEventListener("click", function () {
    const intervalSeconds = parseInt(document.getElementById("interval").value, 10);
    const buttonClass = document.getElementById("buttonClass").value.trim();
  
    if (isNaN(intervalSeconds) || intervalSeconds < 1) {
      alert("Invalid interval. Please enter a positive number.");
      return;
    }
  
    if (buttonClass === "") {
      alert("Please enter the button class name.");
      return;
    }
  
    // Get the active tab to execute the content script.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) {
        alert("No active tab found.");
        return;
      }
  
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({
        command: "toggleAutoClick",
        interval: intervalSeconds,
        buttonClass,
        tabId // Pass the tabId to the background script.
      });
    });
  });
  