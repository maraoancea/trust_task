/* script will will set up the html for setup */
function create_welcome_html() {
    welcome_html =
    `
    <div class="wrapTextBox" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; text-align: center; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 20px; padding: 40px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); max-width: 800px; width: 90%;">
            <!-- 标题部分 -->
            <div style="margin-bottom: 30px;">
                <h1 style="color: #2a9d8f; font-size: 18px; margin: 0 0 10px 0; font-weight: bold; font-family: 'Times New Roman', Times, serif;">Welcome to the Experiment!</h1>
            </div>
            <!-- 内容部分 -->
            <p style="font-size: 18px; line-height: 1.6; color: #333; margin: 20px 0; font-family: 'Times New Roman', Times, serif;">Click continue to learn more about the study you will be participating in today.</p>
        </div>
    </div>
    `
    return [apply_instructions_html_top() + welcome_html + apply_instructions_html_bottom()]
}

function create_id_html() {
    id_html =
    `
    <div class="wrapTextBox">
        <div class="card-container">
            <div class="card-header">
                <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Participant Identification</h2>
            </div>
            <div class="card-body">
                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Please enter your assigned participant ID below:</p>
                <div class="input-container">
                    <input name="participant_id" type="text" placeholder="Enter ID here..." required style="font-family: 'Times New Roman', Times, serif; font-size: 18px;" />
                </div>
                <div class="info-box" style="margin-top: 20px;">
                    <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">This ID will be used to track your participation and ensure you receive proper credit.</p>
                </div>
            </div>
        </div>
    </div>
    `
    return apply_global_html_top() + id_html + apply_global_html_bottom();
}

function create_username_html() {
    username_html =
    `
    <div class="wrapTextBox">
        <div class="card-container">
            <div class="card-header">
                <h2>Create Your Username</h2>
            </div>
            <div class="card-body">
                <p>Please create a username using the following format:</p>
                
                <div class="format-box">
                    <div class="format-item">
                        <div>
                            <strong>First Name:</strong> First two letters
                        </div>
                    </div>
                    <div class="format-item">
                        <div>
                            <strong>Last Name:</strong> First two letters
                        </div>
                    </div>
                    <div class="format-item">
                        <div>
                            <strong>Birth Month:</strong> Two digits (01-12)
                        </div>
                    </div>
                </div>
                
                <div class="example-box">
                    <div>
                        <strong>Example:</strong> ToMi05 (for Tom Miller born in May)
                    </div>
                </div>
                
                <div class="input-container">
                    <input name="session_username" type="text" maxlength="6" placeholder="Enter username..." required />
                </div>
                
                <p id="username-error" style="color: #e74c3c; font-weight: bold; display: none; margin-top: 10px;">Please enter a valid username following the format above.</p>
                
                <div class="info-box" style="margin-top: 20px;">
                    <p>This username will be visible to other participants during the game.</p>
                </div>
            </div>
        </div>
    </div>
    `
    return apply_global_html_top() + username_html + apply_global_html_bottom();
}

function create_contact_html() {

    contact_html =
    `
    <div class ="wrapTextBox">
        <p><strong>Please find the experimenter to take the instruction quiz before starting the experiment.</strong></p>
    </div>
    `
    return [apply_global_html_top() + contact_html + apply_global_html_bottom()]
}

// The comp_check HTML is now handled directly in the jsPsychSurveyMultiChoice component

function create_partners_html() {
    partners_html =
    `
    <div class ="wrapTextBox">
        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">All participants are ready to begin the session.</p>
        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Four participants have been randomly matched as your partners for this experiment.</p>
        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Press the spacebar to begin the game!</strong></p>
    </div>
    `
    return [apply_global_html_top() + partners_html + apply_global_html_bottom()]
}


function apply_global_html_top() {

    global_html_top =
        `<div class="gameHeader">
        </div>
    <div class="offerCard" style="display: flex; justify-content: center;">
        <div class="bidOffer" style="display: flex; flex-direction: column; justify-content: center;">`;
    return global_html_top

}

function apply_global_html_bottom() {

    global_html_bottom =
        `</div>
    </div>`;
    return global_html_bottom

}