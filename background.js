// Function to toggle the auto-clicking state and handle messages from the popup.
function toggleAutoClicking(tabId, interval, buttonClass) {
  if (interval > 0) {
    chrome.tabs.sendMessage(tabId, {
      command: "startAutoClick",
      interval,
      buttonClass,
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
  } else {
    chrome.tabs.sendMessage(tabId, { command: "stopAutoClick" });
  }
}

// Add a listener to receive messages from the popup script.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "toggleAutoClick") {
    const { interval, buttonClass, tabId } = message;
    if (!interval || !buttonClass || !tabId) {
      console.error("Invalid message format. Missing required properties.");
      return;
    }
    toggleAutoClicking(tabId, interval, buttonClass);
  }
});
