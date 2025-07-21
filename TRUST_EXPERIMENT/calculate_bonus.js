/*
 * Bonus Calculation Script
 * This script calculates the bonus payment by randomly selecting 4 trials from the 200 total trials
 * and averaging the participant's earnings from those trials
 */

// Function to calculate bonus from 4 randomly selected trials
function calculateBonus() {
    // Get all completed trials with reward data
    const allTrials = jsPsych.data.get().filter({trial_type: 'html-keyboard-response'}).filter(function(trial) {
        return trial.hasOwnProperty('reward') && trial.reward !== undefined;
    });

    // If we don't have enough trials, return a default value
    if (allTrials.count() < 4) {
        console.warn('Not enough trials with reward data for bonus calculation. Using default bonus.');
        return {
            bonus: 10.00,
            selectedTrials: [],
            averageBonus: 10.00
        };
    }

    // Convert to array for easier manipulation
    const trialsArray = allTrials.values();

    // Randomly select 4 trials
    const selectedIndices = [];
    const selectedTrials = [];

    // Ensure we select 4 unique trials
    while (selectedIndices.length < 4) {
        const randomIndex = Math.floor(Math.random() * trialsArray.length);
        if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
            selectedTrials.push(trialsArray[randomIndex]);
        }
    }

    // Calculate earnings for each selected trial
    const trialEarnings = selectedTrials.map(trial => {
        // If the participant chose $1, they kept $9 for themselves
        const keptAmount = trial.choice === 1 ? 9 : 0;
        // The reward is what they got back from the partner
        const returnedAmount = trial.reward || 0;
        // Total earnings for this trial
        return keptAmount + returnedAmount;
    });

    // Calculate average earnings
    const totalEarnings = trialEarnings.reduce((sum, earning) => sum + earning, 0);
    const averageBonus = totalEarnings / 4;

    // Round to 2 decimal places
    const roundedBonus = Math.round(averageBonus * 100) / 100;

    // Return the bonus amount and selected trials for display
    return {
        bonus: roundedBonus,
        selectedTrials: selectedTrials,
        trialEarnings: trialEarnings,
        averageBonus: roundedBonus
    };
}

// Store the calculated bonus in a global variable for access across components
let calculatedBonus = null;

// Function to get the bonus (calculate if not already done)
function getBonus() {
    if (calculatedBonus === null) {
        calculatedBonus = calculateBonus();
    }
    return calculatedBonus;
}

// Function to format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}
