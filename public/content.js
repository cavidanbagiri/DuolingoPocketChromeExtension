

const createFloatingIcon = () => {
    const icon = document.createElement('div');
    icon.innerHTML = `
        <img src="${chrome.runtime.getURL('icons/logo-32.png')}" 
             style="width:24px;height:24px;cursor:pointer;">
    `;
    
    Object.assign(icon.style, {
        position: 'fixed',
        zIndex: '999999',
        display: 'none',
        transition: 'opacity 0.2s ease-in-out',
        opacity: '0',
        pointerEvents: 'none'
    });

    icon.id = 'lingua-pocket-float-icon';
    icon.style.left = '0';
    icon.style.top = '0';
    icon.style.width = 'auto'; // Let image control size
    document.body.appendChild(icon);

    // Make sure it works on mobile too
    icon.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    });

    return icon;
};

const floatingIcon = createFloatingIcon();
let hideIconTimeout;


const showIconNearSelection = (selectionObj) => {
    if (!selectionObj || selectionObj.rangeCount === 0) return;

    try {
        const range = selectionObj.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (rect.width < 5) return; // Ignore small selections (like single clicks)

        // Set new position
        floatingIcon.style.left = `${rect.right + window.scrollX + 8}px`;
        floatingIcon.style.top = `${rect.top + window.scrollY - 30}px`;
        floatingIcon.style.display = 'block';

        // Animate in
        setTimeout(() => {
            floatingIcon.style.opacity = '1';
            floatingIcon.style.pointerEvents = 'auto';
        }, 50); // Small delay to allow layout render

        // Clear previous timeout
        clearTimeout(hideIconTimeout);

        // Auto-hide after 3 seconds
        hideIconTimeout = setTimeout(() => {
            floatingIcon.style.opacity = '0';
            floatingIcon.style.pointerEvents = 'none';
            setTimeout(() => {
                floatingIcon.style.display = 'none';
            }, 200); // Match transition
        }, 3000);

    } catch (error) {
        console.error('Error positioning icon:', error);
    }
};

const handleSelection = (event) => {
    // Ignore if clicking on the icon itself
    if (event.target.closest('#lingua-pocket-float-icon')) {
        return;
    }

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (!selectedText) {
        floatingIcon.style.display = 'none';
        return;
    }

    // Show the icon near the selection
    showIconNearSelection(selection);

    // Your existing message sending logic
    if (!extensionContextValid) {
        console.log("Extension context invalid - attempting recovery");
        window.location.reload();
        return;
    }

    try {
        chrome.runtime.sendMessage(
            { type: "WORD_SELECTED", payload: selectedText },
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
};

// Rest of your existing code (handleContextInvalidation, event listeners, etc.)
const hideFloatingIcon = () => {
    Object.assign(floatingIcon.style, {
        opacity: '0',
        pointerEvents: 'none',
        transform: 'translateY(-5px)'
    });
    setTimeout(() => {
        floatingIcon.style.display = 'none';
    }, 200); // Match transition duration
};

// Selection Handling
let extensionContextValid = true;




const handleContextInvalidation = () => {
    extensionContextValid = false;
    console.log("Extension context invalidated - reloading page");
    window.location.reload();
};


// Event Listeners
document.addEventListener('mouseup', handleSelection);
document.addEventListener('mousedown', (e) => {
    const iconRect = floatingIcon.getBoundingClientRect();
    const isClickOutsideIcon = !(
        e.clientX >= iconRect.left &&
        e.clientX <= iconRect.right &&
        e.clientY >= iconRect.top &&
        e.clientY <= iconRect.bottom
    );

    if (isClickOutsideIcon) {
        hideFloatingIcon();
    }
});



window.addEventListener('scroll', hideFloatingIcon, { passive: true });
window.addEventListener('resize', hideFloatingIcon, { passive: true });

// Context checking (keep your existing implementation)
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'CONTEXT_CHECK') {
        return Promise.resolve({ status: 'alive' });
    }
    return false;
});

setInterval(() => {
    if (!extensionContextValid) return;
    chrome.runtime.sendMessage(
        { type: 'PING' },
        (response) => {
            if (chrome.runtime.lastError) {
                handleContextInvalidation();
            }
        }
    );
}, 5000);


