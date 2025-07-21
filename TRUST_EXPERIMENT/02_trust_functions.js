/*--------------------------------------------------------------------------------
Dynamic Trust Task written in jspsych by Amrita K. Lamba @ MIT - 2024
--------------------------------------------------------------------------------*/

/* initialize trial counter */
var rotate_cnt = 0;
var binned_trial_cnt = 0;
var user_name = '';
var permanent_user_name = '';

/* preload images */
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

const avatars = ["src/images/blue_guy.png",
                 "src/images/yellow_guy.png",
                 "src/images/green_guy.png",
                 "src/images/red_guy.png"];

// Function to generate random number between 1 and 12, formatted as two digits
function getRandomMonth() {
    const month = Math.floor(Math.random() * 12) + 1; // 1-12
    return month < 10 ? `0${month}` : `${month}`; // Format as 01-12
}

// Partner names with random month numbers (01-12)
const stim_identities = ["KeJo" + getRandomMonth(),
                         "BaSa" + getRandomMonth(),
                         "GePl" + getRandomMonth(),
                         "ClMa" + getRandomMonth()];



var partner_stimuli = [
    { avatar: avatars[0], stimulus_identity: stim_identities[0], partner_number: 0 }, // Group 1: KeJo with random month
    { avatar: avatars[1], stimulus_identity: stim_identities[1], partner_number: 1 }, // Group 1: BaSa with random month
    { avatar: avatars[2], stimulus_identity: stim_identities[2], partner_number: 2 }, // Group 2: GePl with random month
    { avatar: avatars[3], stimulus_identity: stim_identities[3], partner_number: 3 }  // Group 2: ClMa with random month
];

var trial_cnt = 0;

/* initiate the choice phase */
var display_offer = {
    type: jsPsychHtmlKeyboardResponse,
    on_load: function () {
        trial_cnt++;

        // Show and update progress bar in formal phase
        if (typeof showProgressBar === 'function' && typeof updateProgressBar === 'function') {
            showProgressBar();
            updateProgressBar(trial_cnt);
        }

        if (rotate_cnt < 2 && trial_cnt != 1) {
            rotate_cnt++;
        } else if (rotate_cnt == 2) { /* reset counter */
            rotate_cnt = 0;
            binned_trial_cnt++;
        }
    },
    stimulus: function () {
    /* get the username string */
    if (trial_cnt == 0) {
        user_name = jsPsych.data.get().last(2).values()[0].response.session_username;
    }
        return create_offer_html(user_name)
    },
    choices: ['f', 'j'],
    data: {
        task: 'make_choice',
    },
    trial_duration: 4000,
    on_finish: function (data) {
        if (data.response == "f") {
            data.choice = 1;
        } else if (data.response == "j") {
            data.choice = 10;
        }

        /* index current partner */
        var partnerNumber = jsPsych.timelineVariable('partner_number');

        /* compute & save trial earnings */
        var partner_return = generate_trial_parameters(binned_trial_cnt, partnerNumber)
        var outcomes = compute_trial_earnings(data.choice, partner_return)

        /* store partner number */
        data.player_num = partnerNumber;
        data.trial_num = trial_cnt;
        data.binned_trial_num = binned_trial_cnt + 1; /* just corrects for 0 indexing */
        data.reward = outcomes[1];
        data.prop_return = outcomes[2];
        data.prop_return_noise = outcomes[3];

    }
};

/* duration should be randomly drawn from a distribution 2-4 seconds */
var display_choice = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        var choice = jsPsych.data.get().last(1).values()[0].choice; /* indexes previous response */
        if (choice != null) {
            return create_choice_summ_html(choice)
        } else if (choice == null) {
            return create_missed_trial_summ_html()
        }
    },
    choices: "NO_KEYS",
    trial_duration: function generate_random_iti() {

        /* note first input is max iti, second is min iti */
        random_iti = Math.random() * (4000 - 2000) + 2000;
        return random_iti
    }
};

/* this should be a fixed viewing time */
var display_trial_outcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function (data) {
        partnerNumber = jsPsych.timelineVariable('partner_number');
        var choice = jsPsych.data.get().last(2).values()[0].choice;
        if (choice != null) {
            var reward = jsPsych.data.get().last(2).values()[0].reward;
             return create_trial_outcome_html(choice*4, reward)
        } else if (choice == null) { /* missed trial */
            return create_missed_trial_html()
        }
    },
    choices: "NO_KEYS",
    trial_duration: 4000
};

/* iti duration randomly drawn from a distribution 2-4 seconds */
var display_trial_iti = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return create_iti_html()
    },
    choices: "NO_KEYS",
    trial_duration: function generate_random_iti() {

        /* note first input is max iti, second is min iti */
        random_iti = Math.random() * (4000 - 2000) + 2000;
        return random_iti
    },
    conditional_function: function() {
        // Don't show ITI after the last trial (trial_cnt will be 200 after the last trial)
        return trial_cnt < 200;
    }
};

var display_next = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return create_next_screen_html()
    },
    choices: " ",
};

/* Create block structure - ensure each partner appears once per block in random order */
function createBlocks(numBlocks) {
    var trialOrder = [];
    for (let block = 0; block < numBlocks; block++) {
        // Create an array of partner indices [0,1,2,3] and shuffle it
        var blockOrder = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        // Append this block to the trial order
        trialOrder = trialOrder.concat(blockOrder);
    }
    return trialOrder;
}

/* define test procedure */
// Create a conditional ITI component that only shows if it's not the last trial
var conditional_iti = {
    timeline: [display_trial_iti],
    conditional_function: function() {
        // Don't show ITI after the last trial (trial_cnt will be 200 after the last trial)
        return trial_cnt < 200;
    },
    on_load: function() {
        // Check if rest break point is reached
        if (rest_break_points.includes(trial_cnt)) {
            console.log('Rest break triggered at trial', trial_cnt);
            // 延迟显示休息弹窗，确保ITI正常显示
            setTimeout(function() {
                showRestBreakModal();
            }, 1000);
        }
    }
};

// Create 'Next trial starting soon' prompt trial
function createNextTrialPrompt() {
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            return `
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; font-family: 'Times New Roman', Times, serif; text-align: center;">
                    <h2 style="color: #2a9d8f; margin-bottom: 20px;">Next Trial Starting Soon</h2>
                    <p style="font-size: 18px; margin-bottom: 30px;">The next trial will begin in a moment.</p>
                    <p style="font-size: 16px; color: #666;">Please get ready to make your decision.</p>
                </div>
            `;
        },
        choices: "NO_KEYS",
        trial_duration: 2000 // 2秒提示
    };
}

// Global variable to track rest break points
var rest_break_points = [];
var current_trial_index = 0;

// Create rest break modal
function createRestBreakModal() {
    return `
        <div id="rest-break-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.8); z-index: 9999; display: flex; justify-content: center; align-items: center;">
            <div style="max-width: 700px; margin: 20px; padding: 40px; background-color: white; border-radius: 10px; font-family: 'Times New Roman', Times, serif;">
                <h2 style="text-align:center; color:#2a9d8f; margin-bottom: 20px;">Rest Break</h2>
                <p style="font-size:18px; margin-bottom: 15px;">You now have a 15-minute break to relax.</p>
                <p style="font-size:16px; margin-bottom: 20px;">When you are ready to continue, you can press the <b>spacebar</b> at any time, or wait for the countdown to finish and the task will resume automatically.</p>
                
                <p style="color:red; font-weight:bold; font-size:18px; margin-bottom: 15px;">Friendly Reminder:</p>
                <p style="font-size:18px; margin-bottom: 20px;">Every decision you make in this task involves real money, especially your participation fee. Please take each decision seriously.</p>
                
                <p style="font-size:18px; font-weight:bold; margin-bottom: 15px;">Task Instructions:</p>
                <ul style="font-size:18px; text-align:left; max-width:600px; margin:0 auto 20px;">
                    <li><strong>Key Controls:</strong> Press "F" to invest $1, Press "J" to invest $10</li>
                    <li><strong>Investment Choices:</strong> You decide how much to invest with your partner</li>
                    <li><strong>Partner Feedback:</strong> Your partner will return 0-50% of the multiplied amount</li>
                    <li><strong>Bonus Calculation:</strong> 4 rounds will be randomly selected, average earnings = your bonus</li>
                    <li><strong>Time Limit:</strong> You have 4 seconds to make each decision</li>
                </ul>
                
                <div id="rest-timer" style="font-size:22px; color:#e76f51; text-align:center; margin-bottom: 20px;">Time left: 15:00</div>
                
                <div id="rest-next-notice" style="display:none; padding:15px; background-color:#e8f5e8; border-radius:8px; text-align:center; margin-top: 20px;">
                    <p style="font-size:18px; color:#2a9d8f; font-weight:bold; margin:0;">Next trial starting in 3 seconds...</p>
                </div>
            </div>
        </div>
    `;
}

// Show rest break modal
function showRestBreakModal() {
    // 添加弹窗到页面
    document.body.insertAdjacentHTML('beforeend', createRestBreakModal());
    
    // 暂停jsPsych
    jsPsych.pauseExperiment();
    
    // 开始倒计时
    var totalSeconds = 15*60;
    var timerDiv = document.getElementById('rest-timer');
    var nextNotice = document.getElementById('rest-next-notice');
    
    function updateRestTimer() {
        var min = Math.floor(totalSeconds/60);
        var sec = totalSeconds%60;
        timerDiv.innerHTML = 'Time left: ' + (min<10?'0':'')+min+':' + (sec<10?'0':'')+sec;
        
        // Show 'Next trial starting soon' notice in last 3 seconds
        if (totalSeconds <= 3 && totalSeconds > 0) {
            nextNotice.style.display = 'block';
        }
        
        if(totalSeconds > 0) { 
            totalSeconds--; 
            setTimeout(updateRestTimer, 1000); 
        } else {
            // Time's up, close modal and continue experiment
            closeRestBreakModal();
        }
    }
    updateRestTimer();
    
    // Listen for spacebar to end break early
    function handleRestKeydown(e) {
        if(e.code === 'Space') {
            // 显示"下一个trial即将开始"提示
            nextNotice.style.display = 'block';
            nextNotice.innerHTML = '<p style="font-size:18px; color:#2a9d8f; font-weight:bold; margin:0;">Next trial starting in 3 seconds...</p>';
            
            // 3秒后关闭弹窗
            setTimeout(function() {
                closeRestBreakModal();
            }, 3000);
            
            // 移除事件监听
            document.removeEventListener('keydown', handleRestKeydown);
        }
    }
    document.addEventListener('keydown', handleRestKeydown);
}

// 关闭休息弹窗
function closeRestBreakModal() {
    var modal = document.getElementById('rest-break-modal');
    if (modal) {
        modal.remove();
    }
    // 继续实验
    jsPsych.resumeExperiment();
}

// 动态构建主实验timeline，在ITI阶段检测休息点
function build_main_timeline(trials) {
    const timeline = [];
    const total = trials.length;
    
    // 休息点只在block之间（即第4个trial后）
    rest_break_points = [50, 100, 150];
    console.log('Total trials:', total, 'Rest break points:', rest_break_points);
    
    // 添加所有trial，不插入休息trial
    for (let i = 0; i < total; i++) {
        timeline.push(trials[i]);
    }
    
    return timeline;
}

// 生成所有trial block
var all_trials = [];
const numBlocks = 50; // 50 blocks
const trialOrder = createBlocks(numBlocks);
for (let i = 0; i < trialOrder.length; i++) {
    all_trials.push({
        timeline: [display_offer, display_choice, display_trial_outcome, conditional_iti],
        timeline_variables: [partner_stimuli[trialOrder[i]]]
    });
}

var mini_timeline = {
    timeline: build_main_timeline(all_trials)
};

var full_timeline = {
    timeline: [mini_timeline]
};

// Create practice partner stimuli with generic "Partner" names
var practice_partner_stimuli = [
    { avatar: avatars[0], stimulus_identity: "Partner", partner_number: 0 },
    { avatar: avatars[1], stimulus_identity: "Partner", partner_number: 1 },
    { avatar: avatars[2], stimulus_identity: "Partner", partner_number: 2 },
    { avatar: avatars[3], stimulus_identity: "Partner", partner_number: 3 }
];

// Reset counters for practice
var practice_trial_cnt = 0;
var practice_rotate_cnt = 0;
var practice_binned_trial_cnt = 0;

// Practice phase display offer
var practice_display_offer = {
    type: jsPsychHtmlKeyboardResponse,
    on_load: function () {
        practice_trial_cnt++;

        if (practice_rotate_cnt < 2 && practice_trial_cnt != 1) {
            practice_rotate_cnt++;
        } else if (practice_rotate_cnt == 2) { /* reset counter */
            practice_rotate_cnt = 0;
            practice_binned_trial_cnt++;
        }
    },
    stimulus: function () {
        return create_offer_html(user_name)
    },
    choices: ['f', 'j'],
    data: {
        task: 'practice_choice',
    },
    trial_duration: 4000,
    on_finish: function (data) {
        if (data.response == "f") {
            data.choice = 1;
        } else if (data.response == "j") {
            data.choice = 10;
        }

        /* index current partner */
        var partnerNumber = jsPsych.timelineVariable('partner_number');

        /* compute & save trial earnings */
        var partner_return = generate_trial_parameters(practice_binned_trial_cnt, partnerNumber)
        var outcomes = compute_trial_earnings(data.choice, partner_return)

        /* store partner number */
        data.player_num = partnerNumber;
        data.trial_num = practice_trial_cnt;
        data.binned_trial_num = practice_binned_trial_cnt + 1;
        data.reward = outcomes[1];
        data.prop_return = outcomes[2];
        data.prop_return_noise = outcomes[3];
    }
};

// Practice phase display choice
var practice_display_choice = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        var choice = jsPsych.data.get().last(1).values()[0].choice;
        if (choice != null) {
            return create_choice_summ_html(choice)
        } else if (choice == null) {
            return create_missed_trial_summ_html()
        }
    },
    choices: "NO_KEYS",
    trial_duration: function generate_random_iti() {
        random_iti = Math.random() * (4000 - 2000) + 2000;
        return random_iti
    }
};

// Practice phase display outcome
var practice_display_trial_outcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function (data) {
        partnerNumber = jsPsych.timelineVariable('partner_number');
        var choice = jsPsych.data.get().last(2).values()[0].choice;
        if (choice != null) {
            var reward = jsPsych.data.get().last(2).values()[0].reward;
             return create_trial_outcome_html(choice*4, reward)
        } else if (choice == null) {
            return create_missed_trial_html()
        }
    },
    choices: "NO_KEYS",
    trial_duration: 4000
};

// Practice phase display ITI
var practice_display_trial_iti = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return create_iti_html()
    },
    choices: "NO_KEYS",
    trial_duration: function generate_random_iti() {
        random_iti = Math.random() * (4000 - 2000) + 2000;
        return random_iti
    }
};

// Practice instructions - change Chinese to English
var practice_instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        practice_html =
        `
        <div class ="wrapTextBox">
            <p><strong>Practice Phase</strong></p>
            <p>Let's practice the task before starting the real experiment.</p>
            <p>You will complete 4 practice trials. These won't count toward your final payment.</p>
            <p>Press the spacebar to begin practice.</p>
        </div>
        `;
        // Using the global page constructor to ensure consistent styling
        return apply_instructions_html_top() + practice_html + apply_instructions_html_bottom();
    },
    choices: [' '],
    on_start: function() {
        // Get username before practice starts if not already set
        if (user_name === '') {
            user_name = jsPsych.data.get().last(2).values()[0].response.session_username;
            console.log("Username set for practice phase:", user_name);
        }
    }
};

// Practice complete message - change Chinese to English
var practice_complete = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        // Get partner names from stim_identities array and make them bold
        const partnerNames = stim_identities.map(name => `<strong>${name}</strong>`).join(', ');

        complete_html =
        `
        <div class ="wrapTextBox">
            <p><strong>Practice Complete!</strong></p>
            <p>You have finished the practice phase.</p>
            <p>The real experiment will now begin. Your decisions will now count toward your final payment.</p>
            <p>During the practice phase, four participants (${partnerNames}) have been randomly matched as your partners for this experiment.</p>
            <p>Press the spacebar to start the experiment.</p>
        </div>
        `;
        // Using the global page constructor to ensure consistent styling
        return apply_instructions_html_top() + complete_html + apply_instructions_html_bottom();
    },
    choices: [' '],
    on_finish: function() {
        // Reset counters
        trial_cnt = 0;
        rotate_cnt = 0;
        binned_trial_cnt = 0;
        console.log("Practice completed, resetting counters for main experiment");
    }
};

// Create a conditional ITI component for practice that only shows if it's not the last trial
var practice_conditional_iti = {
    timeline: [practice_display_trial_iti],
    conditional_function: function() {
        // Don't show ITI after the last practice trial (practice_trial_cnt will be 4 after the last trial)
        return practice_trial_cnt < 4;
    }
};

// Practice timeline
var practice_timeline = {
    timeline: [practice_display_offer, practice_display_choice, practice_display_trial_outcome, practice_conditional_iti],
    timeline_variables: practice_partner_stimuli.slice(0, 4), // Ensure only the first 4 partners are used
    randomize_order: false // Keep fixed order for better control
};

// Then modify input_username to save the username to both variables and validate format
var input_username = {
    type: jsPsychSurveyHtmlForm,
    html: function () {
        return `
        <div class ="wrapTextBox">
            <p><strong>Create your username</strong></p>
            <p>Please create a username by entering the first two letters of your first name, followed by the first two letters of your last name, and your birth month (01-12).</p>
            <p>For example: ToMi05 (for May)</p>
            <p>Note: This is the username that the other participants will see in the game.</p>
            <p><input name="session_username" type="text" maxlength="6" required /></p>
            <p id="username-error" style="color: red; display: none;">Please enter the first two letters of your first name, followed by the first two letters of your last name, and your birth month (01-12).</p>
        </div>`;
    },
    on_load: function() {
        // Add form validation - more robust implementation
        setTimeout(function() {
            var form = document.querySelector('#jspsych-survey-html-form');
            var submitButton = document.querySelector('#jspsych-survey-html-form-next');
            var usernameInput = document.querySelector('input[name="session_username"]');
            var errorElement = document.querySelector('#username-error');

            // Disable the default form submission
            if (submitButton) {
                submitButton.type = "button"; // Change from submit to button

                // Add click event to handle validation
                submitButton.addEventListener('click', function() {
                    // Validate format: 4 letters followed by 2 numbers
                    var usernamePattern = /^[A-Za-z]{4}[0-9]{2}$/;

                    if (!usernamePattern.test(usernameInput.value)) {
                        errorElement.style.display = 'block'; // Show error message
                        return false;
                    } else {
                        errorElement.style.display = 'none'; // Hide error message

                        // Manually trigger form submission if validation passes
                        if (form) {
                            // Create and dispatch a submit event
                            var submitEvent = new Event('submit', {
                                bubbles: true,
                                cancelable: true
                            });
                            form.dispatchEvent(submitEvent);
                        }
                    }
                });
            }

            // Still add the submit handler as a backup
            if (form) {
                form.addEventListener('submit', function(e) {
                    var usernamePattern = /^[A-Za-z]{4}[0-9]{2}$/;

                    if (!usernamePattern.test(usernameInput.value)) {
                        e.preventDefault(); // Prevent form submission
                        errorElement.style.display = 'block'; // Show error message
                        return false;
                    } else {
                        errorElement.style.display = 'none'; // Hide error message
                    }
                });
            }
        }, 10);
    },
    on_finish: function(data) {
        // Save username to both variables to ensure it persists
        user_name = data.response.session_username;
        permanent_user_name = data.response.session_username;
        console.log("Username set:", user_name);
    }
};




