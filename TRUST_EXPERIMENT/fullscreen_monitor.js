/*
 * Fullscreen Monitor Script
 * This script monitors the fullscreen state and pauses the experiment if the user exits fullscreen mode
 */

// Create a fullscreen overlay element to display when user exits fullscreen
function createFullscreenOverlay() {
    // Check if overlay already exists
    if (document.getElementById('fullscreen-overlay')) {
        return;
    }

    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'fullscreen-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(243, 241, 232, 0.95)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'none';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.textAlign = 'center';
    overlay.style.padding = '20px';
    overlay.style.boxSizing = 'border-box';

    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.style.maxWidth = '600px';
    messageContainer.style.backgroundColor = 'white';
    messageContainer.style.borderRadius = '10px';
    messageContainer.style.padding = '30px';
    messageContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

    // Create message heading
    const heading = document.createElement('h2');
    heading.textContent = 'Fullscreen Mode Required';
    heading.style.color = '#333';
    heading.style.marginTop = '0';
    heading.style.marginBottom = '20px';

    // Create message text
    const message = document.createElement('p');
    message.textContent = 'You have exited fullscreen mode. The experiment requires fullscreen mode to continue.';
    message.style.fontSize = '18px';
    message.style.lineHeight = '1.5';
    message.style.marginBottom = '25px';

    // Create button
    const button = document.createElement('button');
    button.textContent = 'Return to Fullscreen';
    button.style.backgroundColor = '#4682B4';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '12px 24px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    button.style.transition = 'all 0.2s ease';

    // Add hover effect
    button.onmouseover = function() {
        this.style.backgroundColor = '#36648B';
        this.style.transform = 'scale(1.05)';
    };
    button.onmouseout = function() {
        this.style.backgroundColor = '#4682B4';
        this.style.transform = 'scale(1)';
    };

    // Add click event to return to fullscreen
    button.onclick = function() {
        requestFullscreen();
    };

    // Assemble the overlay
    messageContainer.appendChild(heading);
    messageContainer.appendChild(message);
    messageContainer.appendChild(button);
    overlay.appendChild(messageContainer);
    document.body.appendChild(overlay);
}

// Function to request fullscreen
function requestFullscreen() {
    const element = document.documentElement;
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Function to check if currently in fullscreen mode
function isInFullscreen() {
    return !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

// Function to show the fullscreen overlay
function showFullscreenOverlay() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

// Function to hide the fullscreen overlay
function hideFullscreenOverlay() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Fullscreen change event handler
function handleFullscreenChange() {
    if (!isInFullscreen()) {
        // User exited fullscreen
        if (typeof jsPsych !== 'undefined') {
            // Pause the experiment
            jsPsych.pauseExperiment();
            console.log('Experiment paused: User exited fullscreen mode');
        }
        
        // Show the overlay
        showFullscreenOverlay();
    } else {
        // User entered fullscreen
        if (typeof jsPsych !== 'undefined') {
            // Resume the experiment
            jsPsych.resumeExperiment();
            console.log('Experiment resumed: User returned to fullscreen mode');
        }
        
        // Hide the overlay
        hideFullscreenOverlay();
    }
}

// Initialize fullscreen monitoring
function initFullscreenMonitor() {
    // Create the overlay
    createFullscreenOverlay();
    
    // Add event listeners for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    console.log('Fullscreen monitor initialized');
}

// Initialize when the document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFullscreenMonitor);
} else {
    initFullscreenMonitor();
}
