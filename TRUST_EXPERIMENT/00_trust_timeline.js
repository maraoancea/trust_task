/*--------------------------------------------------------------------------------
Dynamic Trust Task written in jspsych by Amrita K. Lamba @ MIT - 2024
--------------------------------------------------------------------------------*/

// Add global variable to store username
window.stored_username = '';

// get the Prolific PID 
jatos.onLoad(function () {
    PROLIFIC_PID = jatos.urlQueryParameters.PROLIFIC_PID;
    //jatos.appendResultData(PROLIFIC_PID)
    console.log("this is the prolific PID:", PROLIFIC_PID)
});




/* specify the experiment timeline */
var timeline = [];

// Move preload definition to the top before using it
var preload = {
    type: jsPsychPreload,
    images: ['src/images/blue_guy.png',
        'src/images/gray_guy.png',
        'src/images/green_guy.png',
        'src/images/red_guy.png',
        'src/images/yellow_guy.png',
        'src/images/choice.png',
        'src/images/quadruple.png',
        'src/images/return.png']
};

timeline.push(preload);

timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: "<p style='font-family: \"Times New Roman\", Times, serif; font-size: 18px;'>This experiment must be run in fullscreen mode.</p><p style='font-family: \"Times New Roman\", Times, serif; font-size: 18px;'>If you exit fullscreen mode during the experiment, it will be paused until you return to fullscreen.</p>",
    on_finish: function() {
        // Ensure fullscreen monitor is initialized after entering fullscreen
        if (typeof initFullscreenMonitor === 'function') {
            initFullscreenMonitor();
        }
    }
});

// Automatically fill Prolific PID on participant_id page
var participant_id = {
    type: jsPsychSurveyHtmlForm,
    html: function () {
        // Get Prolific PID
        const prolificPID = typeof PROLIFIC_PID !== 'undefined' ? PROLIFIC_PID : (jatos.urlQueryParameters.PROLIFIC_PID || '');
        return `
        <div class ="wrapTextBox">
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Participant ID</strong></p>
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Your Prolific ID has been automatically filled in.</p>
            <p><input name="participant_id" type="text" maxlength="24" required value="${prolificPID}" readonly style="font-family: 'Times New Roman', Times, serif; font-size: 18px; background-color: #eee;" /></p>
        </div>`;
    },
    on_finish: function(data) {
        // Save participant_id to jsPsych data
        jsPsych.data.addProperties({
            participant_id: data.response.participant_id
        });
        // Also save to global variable
        window.participant_id = data.response.participant_id;
        console.log("Participant ID set to:", data.response.participant_id);
    }
};

// Move username input screen right after participant ID input
timeline.push(participant_id);
timeline.push(input_username);
timeline.push(welcome);
timeline.push(quiz_loop);
timeline.push(partners_ready);

// Add practice phase before main experiment
timeline.push(practice_instructions);
timeline.push(practice_timeline);
timeline.push(practice_complete);

// Add transition between practice and main experiment
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        transition_html =
        `
        <div class ="wrapTextBox">
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Preparing main experiment...</strong></p>
        </div>
        `;
        return apply_instructions_html_top() + transition_html + apply_instructions_html_bottom();
    },
    trial_duration: 1500,
    choices: "NO_KEYS",
    on_start: function() {
        // Ensure username is recovered from multiple possible sources
        user_name = window.current_username || window.stored_username || permanent_user_name || user_name || "Player";
        permanent_user_name = user_name;

        console.log("Starting main experiment with username:", user_name);

        // Reset trial counter for progress bar
        trial_cnt = 0;

        // Initialize progress bar for formal phase
        if (typeof showProgressBar === 'function' && typeof updateProgressBar === 'function') {
            showProgressBar();
            updateProgressBar(0);
        }
    }
});

// Main experiment
timeline.push(full_timeline);
timeline.push(game_complete);

// Partner stimuli is already defined in 02_trust_functions.js with 4 partners

timeline.push(pattern_recognition_survey);
timeline.push(similarity_ratings);
timeline.push(belief_check_survey);
timeline.push(debrief_page); // Final debriefing first
timeline.push(final_page);  // Bonus payment page last

/*
jsPsych.run(timeline)
*/

/* start the experiment */
jatos.onLoad(() => {
    jsPsych.run(timeline);
});

// Modified practice_complete to ensure username is remembered
var practice_complete = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        // Use most reliable username
        const displayName = user_name || permanent_user_name || window.stored_username || "Player";

        // Get partner names from stim_identities array and make them bold
        const partnerNames = stim_identities.map(name => `<strong>${name}</strong>`).join(', ');

        complete_html =
        `
        <div class ="wrapTextBox">
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Practice Complete!</strong></p>
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">You have finished the practice phase.</p>
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">The real experiment will now begin. Your decisions will now count toward your final payment.</p>
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">During the practice phase, four participants (${partnerNames}) have been randomly matched as your partners for this experiment.</p>
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Press the spacebar to start the experiment.</p>
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin-top:15px;">You are playing as: <strong>${displayName}</strong></p>
        </div>
        `;
        return apply_instructions_html_top() + complete_html + apply_instructions_html_bottom();
    },
    choices: [' '],
    on_finish: function() {
        // Save username to global variable
        window.stored_username = user_name || permanent_user_name || window.stored_username;

        // Remember current username
        var savedUsername = window.stored_username;

        // Reset counter for single block of 4 trials
        trial_cnt = 0;

        // Restore username
        user_name = savedUsername;
        permanent_user_name = savedUsername;

        console.log("Practice completed, username preserved as:", user_name);
    }
};

// Modified display_offer to check username
var display_offer = {
    type: jsPsychHtmlKeyboardResponse,
    on_load: function () {
        trial_cnt++;
        // Check username at the start of each trial
        if (!user_name || user_name === "undefined" || user_name === '') {
            if (permanent_user_name && permanent_user_name !== "undefined") {
                user_name = permanent_user_name;
            } else if (window.stored_username && window.stored_username !== "undefined") {
                user_name = window.stored_username;
            } else {
                try {
                    let allData = jsPsych.data.get().values();
                    for (let i = allData.length - 1; i >= 0; i--) {
                        if (allData[i].response && allData[i].response.session_username) {
                            user_name = allData[i].response.session_username;
                            permanent_user_name = user_name;
                            window.stored_username = user_name;
                            break;
                        }
                    }
                } catch (e) {
                    console.error("Error retrieving username from data:", e);
                }
                if (!user_name || user_name === "undefined") {
                    user_name = "Player";
                }
            }
            console.log("Username in main phase recovered to:", user_name);
        }
        if (rotate_cnt < 2 && trial_cnt != 1) {
            rotate_cnt++;
        } else if (rotate_cnt == 2) {
            rotate_cnt = 0;
            binned_trial_cnt++;
        }
        // Update progress bar if it exists
        if (typeof updateProgressBar === 'function') {
            let progress = (trial_cnt / 200) * 100;
            updateProgressBar(progress);
        }
    },
    stimulus: function () {
        const displayName = user_name || permanent_user_name || window.stored_username || "Player";
        console.log("Main phase displaying username:", displayName);
        return create_offer_html(displayName);
    },
    choices: ['f', 'j'],
    data: {
        task: 'make_choice',
    },
    trial_duration: 4000,
    on_finish: function (data) {
        // Key: write choice and reward data, ensure bonus calculation
        if (data.response === 'f') {
            data.choice = 1;
        } else if (data.response === 'j') {
            data.choice = 10;
        } else {
            data.choice = null;
        }
        // Get current partner number
        var partnerNumber = jsPsych.timelineVariable ? jsPsych.timelineVariable('partner_number') : (typeof partnerNumber !== 'undefined' ? partnerNumber : 0);
        // Generate partner return parameter
        var partner_return = typeof generate_trial_parameters === 'function' ? generate_trial_parameters(binned_trial_cnt, partnerNumber) : 0.25;
        // Compute trial earnings
        var outcomes = typeof compute_trial_earnings === 'function' ? compute_trial_earnings(data.choice, partner_return) : [0,0,0,0];
        data.player_num = partnerNumber;
        data.trial_num = trial_cnt;
        data.binned_trial_num = binned_trial_cnt + 1;
        data.reward = outcomes[1];
        data.prop_return = outcomes[2];
        data.prop_return_noise = outcomes[3];
    }
};


// Get the PID and save it
const jsPsych = initJsPsych({
    on_trial_start: jatos.addAbortButton,
    on_finish: () => {
        jsPsych.data.addProperties({
            PID: PROLIFIC_PID,
            participant_id: window.participant_id // Ensure participant_id is saved
        });
        jatos.endStudy(jsPsych.data.get().json())
    }
});