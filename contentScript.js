// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "startAutoClick") {
    const { interval, buttonClass } = message;
    if (!interval || !buttonClass) {
      console.error("Invalid message format. Missing required properties.");
      return;
    }

    // Function to click the target button with the specified class
    function clickTargetButton() {
      const button = document.querySelector(`.${buttonClass}`);
      if (button) {
        button.click();
      } else {
        console.error(`Button with class '${buttonClass}' not found.`);
      }
    }

    // Start auto-clicking at the specified interval
    const autoClickInterval = setInterval(clickTargetButton, interval * 1000);

    // Send response to the background script
    sendResponse({ started: true });

    // Listen for stopAutoClick message to stop the auto-clicking
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      if (message.command === "stopAutoClick") {
        clearInterval(autoClickInterval);
        sendResponse({ stopped: true });
        console.log('Stop Clicker');
      }
    });
  }
});
