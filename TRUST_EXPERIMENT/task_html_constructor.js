function create_offer_html(user_name) {
    /* index trial level variables */
    let avatar = jsPsych.timelineVariable('avatar');
    let partnerName = jsPsych.timelineVariable('stimulus_identity');

    let offer_bar_html =
        `
        <div class="offers">
        <div class="textPrompt"><p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">How much money do you want
        <br>to give ${partnerName}?</p></div>
            <div class ="trustElements">
            <div class="player1Card"><p class="player1Image"><img src="src/images/gray_guy.png" width="150"></p>
                <div class="player1Name"><p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">${user_name || window.stored_username || permanent_user_name || 'Player'}</p></div>
            </div>

                <div class="investmentCard">
                    <div id="leftBlock" class="leftBlock">
                        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">$1</p>
                        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin-top: 5px; color: #666;">Press "F" key</p>
                    </div>
                    <div id="rightBlock" class="rightBlock">
                        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">$10</p>
                        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin-top: 5px; color: #666;">Press "J" key</p>
                    </div>
                </div>

            <div class="player2Card"><p class="player2Image"><img src=${avatar} width="150"></p>
                <div class="player2Name"><p>${partnerName}</p></div>
            </div>
            </div>
        </div>
        `;

    return apply_global_html_top() + offer_bar_html + apply_global_html_bottom()
}

function create_choice_summ_html(choice) {
    let choice_summ_html =
        `<div class="outcomeText"><p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">You selected $${choice.toFixed(2)}</p>

        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><br>Your partner is deciding how much to return.</p></div>`
    return apply_global_html_top() + choice_summ_html + apply_global_html_bottom()
}

function create_missed_trial_summ_html() {
    let missed_summ_html =
        `<div class="outcomeText"><p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>You did not respond in time!</strong></p></div>`;
    return apply_global_html_top() + missed_summ_html + apply_global_html_bottom()
}

function create_trial_outcome_html(p1outcome, p2outcome) {
    let partnerName = jsPsych.timelineVariable('stimulus_identity');
    let avatar = jsPsych.timelineVariable('avatar');

    // Simplified feedback page, maintaining consistent avatar and name display as in the decision phase, with investment and return amounts in bold
    let trial_outcome_html =
        `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
            <div class="player2Card" style="margin-bottom: 20px;">
                <p class="player2Image"><img src=${avatar} width="150"></p>
                <div class="player2Name"><p>${partnerName}</p></div>
            </div>

            <div style="background-color: #f8f9fa; border-radius: 10px; padding: 15px; text-align: center; max-width: 400px;">
                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 0;">${partnerName} received <strong>$${p1outcome.toFixed(2)}</strong> and returned <strong>$${p2outcome.toFixed(2)}</strong> to you.</p>
            </div>
        </div>`;

    return apply_global_html_top() + trial_outcome_html + apply_global_html_bottom()
}

function create_missed_trial_html() {
    let partnerName = jsPsych.timelineVariable('stimulus_identity');
    let avatar = jsPsych.timelineVariable('avatar');

    // Simplified non-response feedback page, maintaining consistent avatar and name display as in the decision phase, with amounts in bold
    let missed_trial_html =
        `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
            <div class="player2Card" style="margin-bottom: 20px;">
                <p class="player2Image"><img src=${avatar} width="150"></p>
                <div class="player2Name"><p>${partnerName}</p></div>
            </div>

            <div style="background-color: #f8f9fa; border-radius: 10px; padding: 15px; text-align: center; max-width: 400px;">
                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 0; color: #d9534f;"><strong>You did not respond in time!</strong></p>
                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 10px 0 0 0;">You earned <strong>$0.00</strong></p>
                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 5px 0 0 0;">${partnerName} earned <strong>$0.00</strong>.</p>
            </div>
        </div>`;

    return apply_global_html_top() + missed_trial_html + apply_global_html_bottom()
}

function create_iti_html() {
    let iti_html =
        `<div class="outcomeText"><p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">The next round will begin momentarily.</p>

    <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Please wait.</p></div>`;

    return apply_global_html_top() + iti_html + apply_global_html_bottom()
}

function create_next_screen_html() {
    // Use a generic message for all trials - progress is shown by the progress bar
    let next_screen_html =
    `<div class="outcomeText"><p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Your next partner is ready!<p>

    <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Press the <strong>spacebar</strong> to start the round.</p></div>`;

    return apply_global_html_top() + next_screen_html + apply_global_html_bottom()
}

function apply_global_html_top() {

    let global_html_top =
        `<div class="gameHeader">
        </div>
    <div class="offerCard" style="display: flex; justify-content: center;">
        <div class="bidOffer" style="display: flex; flex-direction: column; justify-content: center;">`;
    return global_html_top

}

function apply_global_html_bottom() {

    let global_html_bottom =
        `</div>
    </div>`;
    return global_html_bottom

}

