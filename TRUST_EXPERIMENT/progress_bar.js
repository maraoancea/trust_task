/*
 * Progress Bar Script
 * This script creates and updates a progress bar at the bottom of the page
 * to show the user's progress through the formal experiment phase
 */

// Constants
const TOTAL_TRIALS = 200; // 50 blocks × 4 partners

// Create the progress bar container and elements
function createProgressBar() {
    // Check if progress bar already exists
    if (document.getElementById('experiment-progress-container')) {
        return;
    }

    // Create container
    const container = document.createElement('div');
    container.id = 'experiment-progress-container';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.width = '80%';
    container.style.maxWidth = '800px';
    container.style.textAlign = 'center';
    container.style.zIndex = '1000';
    container.style.display = 'none'; // Initially hidden until formal phase starts

    // Create progress bar background
    const progressBarBg = document.createElement('div');
    progressBarBg.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    progressBarBg.style.borderRadius = '10px';
    progressBarBg.style.height = '10px';
    progressBarBg.style.width = '100%';
    progressBarBg.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    progressBarBg.style.overflow = 'hidden';

    // Create progress bar fill
    const progressBarFill = document.createElement('div');
    progressBarFill.id = 'progress-bar-fill';
    progressBarFill.style.backgroundColor = '#4682B4'; // Match the button color
    progressBarFill.style.height = '100%';
    progressBarFill.style.width = '0%';
    progressBarFill.style.borderRadius = '10px';
    progressBarFill.style.transition = 'width 0.3s ease';

    // Assemble the progress bar
    progressBarBg.appendChild(progressBarFill);
    container.appendChild(progressBarBg);
    document.body.appendChild(container);
}

// Show the progress bar (call this when formal phase starts)
function showProgressBar() {
    const container = document.getElementById('experiment-progress-container');
    if (container) {
        container.style.display = 'block';
    } else {
        // Create it if it doesn't exist yet
        createProgressBar();
        document.getElementById('experiment-progress-container').style.display = 'block';
    }
}

// Hide the progress bar (call this when formal phase ends)
function hideProgressBar() {
    const container = document.getElementById('experiment-progress-container');
    if (container) {
        container.style.display = 'none';
    }
}

// Update the progress bar based on current trial count
function updateProgressBar(currentTrial) {
    // Ensure progress bar exists
    if (!document.getElementById('experiment-progress-container')) {
        createProgressBar();
        showProgressBar();
    }

    // Calculate progress percentage - use Math.floor instead of Math.round to ensure 100% only shows when all trials are complete
    const progressPercent = Math.min(Math.floor((currentTrial / TOTAL_TRIALS) * 100), 100);

    // Progress text display removed as per request

    // Update progress bar fill
    const progressBarFill = document.getElementById('progress-bar-fill');
    if (progressBarFill) {
        progressBarFill.style.width = `${progressPercent}%`;
    }
}

// Initialize progress tracking
function initProgressBar() {
    createProgressBar();
    console.log('Progress bar initialized');
}

// Initialize when the document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressBar);
} else {
    initProgressBar();
}
