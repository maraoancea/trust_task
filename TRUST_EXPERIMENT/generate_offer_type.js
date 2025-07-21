/*--------------------------------------------------------------------------------
Dynamic Trust Task written in jspsych by Amrita K. Lamba @ MIT - 2024
--------------------------------------------------------------------------------*/

const MoneyMultiplier = 4;
const haz = 0.0625;
const partnerStd = 0.01;
const possibleReturns = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50];
const groupIDs = [1,1,2,2];

// Initialize group means randomly from possibleReturns
function getRandomReturn() {
    return possibleReturns[Math.floor(Math.random()*possibleReturns.length)];
}

// Initialize with random values, consistent with MATLAB approach
let groupMeans = [getRandomReturn(), getRandomReturn()];

function generate_trial_parameters(binned_trial_cnt, partnerNumber) {
    if (trial_cnt === 1 || Math.random() < haz) {
        groupMeans = [
            getRandomReturn(),
            getRandomReturn()
        ];
    }
    
    const group = groupIDs[partnerNumber] - 1;
    const baseReturn = groupMeans[group];
    const returnRate = baseReturn + gaussianRand() * partnerStd;
    return Math.max(0, Math.min(0.5, returnRate)); // Modified constraint to match MATLAB
}