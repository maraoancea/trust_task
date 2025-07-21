/* script will counterbalance color and name identities */ 

let avatars_shuffled = '';
let stim_identities_shuffled  = '';

function counterbalance_avatar(avatars) {

    avatars_shuffled = shuffle(avatars);
    return avatars_shuffled;

} 

function counterbalance_stim_identity(stim_identities) {

    stim_identities_shuffled = shuffle(stim_identities);
    return stim_identities_shuffled;
    
} 

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

