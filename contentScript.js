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
        console.log('Clicked');
      } else {
        console.error(`Button with class '${buttonClass}' not found.`);
      }
    }

    // Function to scroll the mouse randomly within the viewport.
    function scrollPageRandomly() {
      const direction = Math.random() < 0.5 ? -1 : 1;
      const randomScrollAmount = Math.floor(Math.random() * 300) * direction;
    
      window.scrollBy(0, randomScrollAmount);
      console.log('Scrolled');
    }

    // Function to move the mouse randomly within the viewport.
    function moveMouseRandomly() {
      const viewport = document.documentElement;
      const viewportWidth = viewport.clientWidth;
      const viewportHeight = viewport.clientHeight;

      const randomX = Math.floor(Math.random() * viewportWidth);
      const randomY = Math.floor(Math.random() * viewportHeight);

      const event = new MouseEvent("mousemove", {
        clientX: randomX,
        clientY: randomY,
      });

      document.dispatchEvent(event);
      console.log('Mouse moved');
    }

    // Start auto-clicking at the specified interval
    const autoClickInterval = setInterval(clickTargetButton, interval * 1000);
    // Start auto-scrolling at the specified interval
    const autoScrollInterval = setInterval(scrollPageRandomly, (interval) * 1000);
    // Start auto-mouse move at the specified interval
    const autoMouseMoveInterval = setInterval(moveMouseRandomly, (interval) * 1000);

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
