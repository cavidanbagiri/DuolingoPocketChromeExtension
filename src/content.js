

// Connection state tracking
let extensionContextValid = true;

function handleSelection() {
    if (!extensionContextValid) {
        console.log("Extension context invalid - attempting recovery");
        window.location.reload();
        return;
    }

    const selection = window.getSelection().toString().trim();
    if (!selection) return;

    try {
        chrome.runtime.sendMessage(
            { type: "WORD_SELECTED", payload: selection },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.log("Message failed:", chrome.runtime.lastError);
                    handleContextInvalidation();
                }
            }
        );
    } catch (e) {
        console.log("Send message error:", e);
        handleContextInvalidation();
    }
}

function handleContextInvalidation() {
    extensionContextValid = false;
    console.log("Extension context invalidated - reloading page");
    window.location.reload();
}

// Listen for context invalidation
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'CONTEXT_CHECK') {
        return Promise.resolve({status: 'alive'});
    }
});

// Initial setup
document.addEventListener('mouseup', handleSelection);

// Periodically check connection
setInterval(() => {
    if (!extensionContextValid) return;
    
    chrome.runtime.sendMessage(
        {type: 'PING'},
        (response) => {
            if (chrome.runtime.lastError) {
                handleContextInvalidation();
            }
        }
    );
}, 5000); // Check every 5 seconds


