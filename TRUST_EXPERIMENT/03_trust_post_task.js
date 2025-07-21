/*--------------------------------------------------------------------------------
Dynamic Trust Task written in jspsych by Amrita K. Lamba @ MIT - 2024
--------------------------------------------------------------------------------*/

var game_complete = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return create_game_done_html()
    },
    choices: [' '],
    on_load: function() {
        // Hide progress bar when formal phase is complete
        if (typeof hideProgressBar === 'function') {
            hideProgressBar();
        }
    }
};

// Add pattern recognition question before similarity ratings
var pattern_recognition_survey = {
    type: jsPsychSurveyHtmlForm,
    css_classes: ['pattern-survey'],
    button_label: 'Continue',
    html: function() {
        return create_pattern_recognition_html();
    },
    on_finish: function(data) {
        data.survey_type = 'pattern_recognition';
        // Store the response in the data
        if (data.response && data.response.pattern_response) {
            data.pattern_response = data.response.pattern_response;
            console.log('Pattern recognition response:', data.pattern_response);
        }
    }
};

// Creating similarity survey for all partners in one page
var partner_similarity_survey = {
    type: jsPsychSurveyHtmlForm,
    css_classes: ['survey2'],
    button_label: 'Continue',
    html: function () {
        // Pass all partner stimuli to the function
        return create_partner_similarity_html(partner_stimuli);
    },
    on_finish: function (data) {
        // Store that this is a similarity survey
        data.survey_type = 'similarity';

        // Since partner names, avatars and numbers are fixed, the logic is simpler
        Object.keys(data.response).forEach(key => {
            if (key.startsWith('similar_to_')) {
                const sourcePartnerNum = parseInt(key.replace('similar_to_', ''));
                const targetPartnerNum = parseInt(data.response[key]);

                // Get partner names
                const sourceName = partner_stimuli.find(p => p.partner_number == sourcePartnerNum)?.stimulus_identity;
                const targetName = partner_stimuli.find(p => p.partner_number == targetPartnerNum)?.stimulus_identity;

                // Record choices
                data[`source_partner_${sourcePartnerNum}`] = targetPartnerNum;
                data[`source_name_${sourcePartnerNum}`] = sourceName;
                data[`target_name_${sourcePartnerNum}`] = targetName;

                // Determine if participant selected partners from the same group
                const correct = (
                    (sourcePartnerNum <= 1 && targetPartnerNum <= 1) || // Both from Group 1
                    (sourcePartnerNum >= 2 && targetPartnerNum >= 2)    // Both from Group 2
                );

                data[`correct_${sourcePartnerNum}`] = correct;

                console.log(`Partner ${sourceName}(${sourcePartnerNum}) was matched with ${targetName}(${targetPartnerNum})`);
                console.log(`Correct match: ${correct}`);
            }
        });

        // Calculate overall accuracy
        let correctCount = 0;
        let totalQuestions = 0;

        Object.keys(data).forEach(key => {
            if (key.startsWith('correct_')) {
                totalQuestions++;
                if (data[key] === true) correctCount++;
            }
        });

        data.total_correct = correctCount;
        data.total_questions = totalQuestions;
        data.accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0;

        console.log(`Overall accuracy: ${data.accuracy * 100}% (${correctCount}/${totalQuestions})`);
    }
};

// No need for timeline_variables since all partners are shown on one page
var similarity_ratings = {
    timeline: [partner_similarity_survey]
};

// Creating belief check survey
var belief_check_survey = {
    type: jsPsychSurveyHtmlForm,
    button_label: 'Continue',
    html: function () {
        return create_belief_check_html();
    },
    on_finish: function (data) {
        data.survey_type = 'belief_check';
    }
};

var debrief_page = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return create_bonus_html()
    },
    choices: [' ']
};

var final_page = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return create_final_page_html()
    },
    choices: [' '],
    on_finish: function() {
        jsPsych.data.addProperties({
            PID: typeof PROLIFIC_PID !== 'undefined' ? PROLIFIC_PID : null,
            participant_id: window.participant_id || null
        });
        jatos.endStudy(jsPsych.data.get().json());
    }
};


