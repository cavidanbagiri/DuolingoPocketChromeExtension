
document.addEventListener("mouseup", () => {
    const selection = window.getSelection().toString().trim();

    if (selection.length > 0) {
        console.log("✅ Selected text:", selection);

        try {
            chrome.runtime.sendMessage(
                { type: "WORD_SELECTED", payload: selection },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.warn("⚠️ Message not received by popup");
                    } else {
                        console.log("📬 Response from popup:", response);
                    }
                }
            );
        } catch (e) {
            console.error("🚨 Failed to send message", e);
        }
    }
});



