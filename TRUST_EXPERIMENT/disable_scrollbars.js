/*
 * Disable Scrollbars Script
 * OOOPS!QAQ This script ensures that no scrollbars are displayed on any page during the experiment
 */

// Disable scrollbars and adjust button positions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    disableScrollbars();
    adjustButtonPositions();

    // Delayed execution to ensure buttons are visible
    setTimeout(forceButtonsVisible, 500);

    // Set timer to check button visibility every second
    setInterval(forceButtonsVisible, 1000);
});

// Disable scrollbars and adjust button positions at the start of each jsPsych trial
if (typeof jsPsych !== 'undefined') {
    jsPsych.pluginAPI.registerCallback('on_trial_start', function() {
        disableScrollbars();
        adjustButtonPositions();

        // Delayed execution to ensure buttons are visible
        setTimeout(forceButtonsVisible, 500);
    });
}

// Function to disable scrollbars
function disableScrollbars() {
    // Disable scrollbars on body
    document.body.style.overflow = 'hidden';

    // Disable scrollbars on jsPsych elements
    const jspsychElements = document.querySelectorAll('.jspsych-display-element, .jspsych-content-wrapper');
    jspsychElements.forEach(function(element) {
        element.style.overflow = 'hidden';
    });

    // Disable scrollbars on all potential containers
    const containers = document.querySelectorAll('.bidOffer, .wrapTextBox, .survey, .survey2, .surveyAvatar');
    containers.forEach(function(container) {
        container.style.overflow = 'hidden';
    });

    // Ensure content fits the viewport
    const contentElements = document.querySelectorAll('.jspsych-content');
    contentElements.forEach(function(element) {
        element.style.maxHeight = '90vh';
        element.style.overflow = 'hidden';
    });

    // Disable scroll events
    window.addEventListener('scroll', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
}

// Prevent scroll events
function preventScroll(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
}

// Function to adjust button positions
function adjustButtonPositions() {
    // Get current page index
    let pageIndex = 0;

    // Try to get index from page attribute
    const pageIndexAttr = document.body.getAttribute('data-page-index');
    if (pageIndexAttr) {
        pageIndex = parseInt(pageIndexAttr);
    } else {
        // If no page index attribute, try to get current trial index from jsPsych
        if (typeof jsPsych !== 'undefined' && jsPsych.data && jsPsych.data.get) {
            pageIndex = jsPsych.data.get().count();
        }
    }

    // Update page index attribute
    document.body.setAttribute('data-page-index', (pageIndex + 1).toString());

    // Check if this is the first or second page
    const isWelcomePage = document.querySelector('.welcome-screen') !== null;
    const isFirstOrSecondPage = pageIndex < 2 || isWelcomePage;

    // If this is the third page or later, adjust button positions
    if (!isFirstOrSecondPage) {
        // Get all buttons
        const buttons = document.querySelectorAll('.jspsych-btn');

        // Loop through all buttons
        buttons.forEach(function(button) {
            // Set button style
            button.style.position = 'absolute';
            button.style.top = '200px'; // Use fixed pixel value
            button.style.left = '50%';
            button.style.transform = 'translateX(-50%)';
            button.style.zIndex = '9999';
        });

        // Adjust button group positions
        const buttonGroups = document.querySelectorAll(
            '#jspsych-html-button-response-btngroup, ' +
            '#jspsych-image-button-response-btngroup, ' +
            '#jspsych-audio-button-response-btngroup, ' +
            '#jspsych-video-button-response-btngroup, ' +
            '#jspsych-canvas-button-response-btngroup'
        );

        buttonGroups.forEach(function(group) {
            group.style.position = 'absolute';
            group.style.top = '200px'; // Use fixed pixel value
            group.style.left = '50%';
            group.style.transform = 'translateX(-50%)';
            group.style.zIndex = '9999';
        });
    }
}

// Function to force buttons to be visible
function forceButtonsVisible() {
    // Get current page index
    const pageIndexAttr = document.body.getAttribute('data-page-index');
    const pageIndex = pageIndexAttr ? parseInt(pageIndexAttr) : 0;

    // If this is the third page or later
    if (pageIndex >= 3) {
        // Get all buttons
        const buttons = document.querySelectorAll('.jspsych-btn');

        // If buttons are found
        if (buttons.length > 0) {
            // Loop through all buttons
            buttons.forEach(function(button) {
                // Force button to be visible
                button.style.position = 'absolute';
                button.style.top = '200px'; // Use fixed pixel value
                button.style.left = '50%';
                button.style.transform = 'translateX(-50%)';
                button.style.zIndex = '9999';
                button.style.display = 'block';
                button.style.visibility = 'visible';
                button.style.opacity = '1';

                // Add prominent styling
                button.style.backgroundColor = '#ff5722';
                button.style.color = 'white';
                button.style.padding = '15px 30px';
                button.style.fontSize = '20px';
                button.style.fontWeight = 'bold';
                button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                button.style.border = '2px solid #ff8a65';
            });
        }

        // Get all button groups
        const buttonGroups = document.querySelectorAll(
            '#jspsych-html-button-response-btngroup, ' +
            '#jspsych-image-button-response-btngroup, ' +
            '#jspsych-audio-button-response-btngroup, ' +
            '#jspsych-video-button-response-btngroup, ' +
            '#jspsych-canvas-button-response-btngroup'
        );

        // If button groups are found
        if (buttonGroups.length > 0) {
            // Loop through all button groups
            buttonGroups.forEach(function(group) {
                // Force button group to be visible
                group.style.position = 'absolute';
                group.style.top = '200px'; // Use fixed pixel value
                group.style.left = '50%';
                group.style.transform = 'translateX(-50%)';
                group.style.zIndex = '9999';
                group.style.display = 'block';
                group.style.visibility = 'visible';
                group.style.opacity = '1';
            });
        }
    }
}
