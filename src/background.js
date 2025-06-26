


let lastSelectedWord = "";

// Message handler (keep your existing one)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "WORD_SELECTED") {
        console.log("🦜 Word received:", message.payload);
        lastSelectedWord = message.payload;
        sendResponse({ status: "received" });
        return true;
    }
    
    if (message.type === "REQUEST_WORD") {
        console.log("🔌 Word requested");
        sendResponse({
            type: "CURRENT_WORD",
            payload: lastSelectedWord
        });
        return true;
    }
    
    sendResponse({ status: "ignored" });
});

// NEW: Track active tab and ensure content script is injected
let activeTabId = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
    activeTabId = activeInfo.tabId;
    ensureContentScriptInjected(activeTabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (tabId === activeTabId && changeInfo.status === 'complete') {
        ensureContentScriptInjected(tabId);
    }
});

async function ensureContentScriptInjected(tabId) {
    try {
        await chrome.scripting.executeScript({
            target: {tabId},
            files: ['content.js']
        });
        console.log(`Content script injected into tab ${tabId}`);
    } catch (error) {
        console.log(`Injection failed for tab ${tabId}:`, error);
    }
}

// Handle extension install/update
chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === chrome.runtime.OnInstalledReason.UPDATE) {
        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                if (tab.url?.startsWith('http')) {
                    ensureContentScriptInjected(tab.id);
                }
            });
        });
    }
});

