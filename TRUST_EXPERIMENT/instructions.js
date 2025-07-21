function get_page_1() {
    page_1 = `
    <div class="wrapTextBox">
        <div class="card-container">
            <div class="card-header">
                <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Welcome to the Investment Task!</h2>
            </div>
            <div class="card-body">
                <p class="intro-text" style="font-family: 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.2;">In this experiment, you will participate in a series of investment decisions with four different partners who are also participating in this task.</p>
                
                <div class="section-divider">
                    <span class="divider-content" style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Key Information</span>
                </div>
                
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-card-header">
                            <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Your Goal</h3>
                        </div>
                        <div class="info-card-body">
                            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.2;">Earn as much money as possible in each round by making strategic investment decisions.</p>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-header">
                            <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Your Partners</h3>
                        </div>
                        <div class="info-card-body">
                            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.2;">You'll interact with four different partners who are also making decisions simultaneously.</p>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-header">
                            <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Your Bonus</h3>
                        </div>
                        <div class="info-card-body">
                            <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.2;">4 rounds will be randomly selected at the end, and the average of your earnings from these rounds will be your bonus payment.</p>
                        </div>
                    </div>
                </div>
                
                <div class="highlight-box">
                    <div class="highlight-content">
                        <h4 style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Remember</h4>
                        <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.2;">Maximize your earnings in each round to increase your bonus payment!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return [apply_instructions_html_top() + page_1 + apply_instructions_html_bottom()];
}

function get_page_2() {
    page_2 = `
    <div class="wrapTextBox">
        <div class="card-container">
            <div class="card-header">
                <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">How the Task Works</h2>
            </div>
            <div class="card-body">
                <p class="intro-text" style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Each round follows these four key steps. Pay close attention to the multiplication and partner's decision steps, as they directly affect your earnings!</p>
                
                <div class="steps-container" style="margin-bottom: 10px;">
                    <div class="step-card" style="margin-bottom: 8px;">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-header" style="margin-bottom: 2px;">
                                <h3 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px; color: black;">Start with $10.00</h3>
                            </div>
                            <p style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px;">You begin each round with \$10.00 in your account.</p>
                        </div>
                    </div>
                    
                    <div class="step-card" style="margin-bottom: 8px;">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-header" style="margin-bottom: 2px;">
                                <h3 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px; color: black;">Make Your Choice</h3>
                            </div>
                            <p style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px;">Send \$1 (press "f") or \$10 (press "j") to your partner.</p>
                        </div>
                    </div>
                    
                    <div class="step-card" style="margin-bottom: 8px;">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <div class="step-header" style="margin-bottom: 2px;">
                                <h3 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px; color: black;">Multiplication (×4)</h3>
                            </div>
                            <p style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px;">The amount you invest is multiplied by 4 before your partner receives it.</p>
                        </div>
                    </div>
                    
                    <div class="step-card" style="margin-bottom: 8px;">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <div class="step-header" style="margin-bottom: 2px;">
                                <h3 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px; color: black;">Partner's Decision</h3>
                            </div>
                            <p style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px;">Your partner can return between 0% and 50% of the amount they received.</p>
                        </div>
                    </div>
                </div>
                
                <div class="next-section-box" style="margin-top: 5px; padding: 8px; display: flex; align-items: center; background-color: #3498db; border-radius: 6px; color: white;">
                    <div class="next-section-content">
                        <h4 style="margin: 0 0 2px 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; color: white;">What's Next?</h4>
                        <p style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; color: white;">The next pages will show you detailed examples of how these steps work in practice, including specific dollar amounts and the task interface.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return [apply_instructions_html_top() + page_2 + apply_instructions_html_bottom()];
}

function get_page_3() {
    page_3 = `
    <div class="wrapTextBox">
        <div class="card-container" style="padding: 0; margin: 0; max-width: 850px; margin: 0 auto;">
            <div class="card-header" style="padding: 8px 15px; margin-bottom: 10px; background-color: #3498db; border-radius: 6px; border-left: 4px solid #3498db; color: white;">
                <h2 style="font-size: 18px; font-family: 'Times New Roman', Times, serif; margin: 0; color: white;">Task Interface & Examples</h2>
            </div>
            <div class="card-body" style="padding: 10px;">
                <!-- Horizontal Layout for Game Screen and Examples -->
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; margin: 0; text-align: left;">
                    <!-- Task Interface Section -->
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="background-color: #3498db; color: white; padding: 6px 10px; border-radius: 6px 6px 0 0; display: flex; align-items: center; gap: 8px;">
                            <h3 style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; font-weight: 600; color: white;">Task Interface</h3>
                        </div>
                        <div style="padding: 10px 5px; text-align: left;">
                            <div class="textPrompt" style="margin: 0 0 10px 0; text-align: left;"><p style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: left;">You have $10 this round. How much would you like to invest with <span class="partner-name">Partner</span>?</p></div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin: 0; padding: 0; text-align: left;">
                                <div style="width: 60px; text-align: center; margin: 0;">
                                    <p style="margin: 0;"><img src="src/images/gray_guy.png" width="50" style="margin: 0;"></p>
                                    <div style="margin: 0;"><p style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; font-weight: 600;">You</p></div>
                                </div>

                                <div style="display: flex; justify-content: center; gap: 15px; margin: 0;">
                                    <div style="padding: 8px; margin: 0; border: 1px solid #ddd; border-radius: 6px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                        <p style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; font-weight: 600;">$1</p>
                                        <p style="font-size: 18px; font-family: 'Times New Roman', Times, serif; margin-top: 4px; color: #666;">Press F key</p>
                                    </div>
                                    <div style="padding: 8px; margin: 0; border: 1px solid #ddd; border-radius: 6px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                        <p style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; font-weight: 600;">$10</p>
                                        <p style="font-size: 18px; font-family: 'Times New Roman', Times, serif; margin-top: 4px; color: #666;">Press J key</p>
                                    </div>
                                </div>

                                <div style="width: 60px; text-align: center; margin: 0;">
                                    <p style="margin: 0;"><img src="src/images/blue_guy.png" width="50" style="margin: 0;"></p>
                                    <div style="margin: 0;"><p style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif;">Partner</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- $1 Investment Example -->
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="background-color: #3498db; color: white; padding: 6px 10px; border-radius: 6px 6px 0 0; display: flex; align-items: center; gap: 8px;">
                            <h3 style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; font-weight: 600; color: white;">$1 Investment</h3>
                        </div>
                        <div style="padding: 10px 5px;">
                            <div style="text-align: left !important;">
                                <p style="margin: 0 0 6px 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: left !important;">If you invest <strong>$1</strong>:</p>
                                <div style="text-align: left !important;">
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">$1 × 4 = <strong>$4</strong> （每block），50 blocks 共200 trials</p>
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">Partner receives <strong>$4</strong></p>
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">Partner returns <strong>$1</strong> (25%)</p>
                                </div>
                                <div style="margin-top: 8px; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: left !important;">
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">Final balance:</p>
                                    <div style="background-color: #e9f7ef; padding: 5px 8px; border-radius: 4px; font-size: 18px; font-family: 'Times New Roman', Times, serif; border-left: 3px solid #2ecc71; text-align: left !important;">
                                        <span style="text-align: left !important;">$10 - $1 + $1 = $10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- $10 Investment Example -->
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="background-color: #3498db; color: white; padding: 6px 10px; border-radius: 6px 6px 0 0; display: flex; align-items: center; gap: 8px;">
                            <h3 style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; font-weight: 600; color: white;">$10 Investment</h3>
                        </div>
                        <div style="padding: 10px 5px;">
                            <div style="text-align: left !important;">
                                <p style="margin: 0 0 6px 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: left !important;">If you invest <strong>$10</strong>:</p>
                                <div style="text-align: left !important;">
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">$10 × 4 = <strong>$40</strong> （每block），50 blocks 共200 trials</p>
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">Partner receives <strong>$40</strong></p>
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">Partner returns <strong>$20</strong> (50%)</p>
                                </div>
                                <div style="margin-top: 8px; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: left !important;">
                                    <p style="margin: 0 0 4px 0; text-align: left !important;">Final balance:</p>
                                    <div style="background-color: #e9f7ef; padding: 5px 8px; border-radius: 4px; font-size: 18px; font-family: 'Times New Roman', Times, serif; border-left: 3px solid #2ecc71; text-align: left !important;">
                                        <span style="text-align: left !important;">$10 - $10 + $20 = $20</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 15px; padding: 10px; display: flex; align-items: center; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); text-align: left;">
                    <div style="text-align: left;">
                        <h4 style="margin: 0 0 3px 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; color: #856404; text-align: left;">Important Notice</h4>
                        <p style="margin: 0; font-size: 18px; font-family: 'Times New Roman', Times, serif; text-align: left;">You have up to <strong style="color: red;">4 seconds</strong> per trial to decide on your investment, so make your decision as quickly as possible.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return [apply_instructions_html_top() + page_3 + apply_instructions_html_bottom()];
}

function get_page_4() {
    page_4 = `
    <div class="wrapTextBox">
        <div class="card-container">
            <div class="card-header">
                <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Investment Game Examples</h2>
            </div>
            <div class="card-body">
                <div class="content-section">
                    <div class="section-header">
                        <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Decision Options</h3>
                    </div>
                    <div class="option-grid">
                        <div class="option-card">
                            <div class="option-header">
                                <h4 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Option 1</h4>
                            </div>
                            <div class="option-content">
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">$1 × 4 = $4</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>You keep:</strong> $9</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Partner gets:</strong> $4</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Return range:</strong> $0-$2</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Your total:</strong> $9 + return</p>
                            </div>
                        </div>
                        
                        <div class="option-card">
                            <div class="option-header">
                                <h4 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Option 2</h4>
                            </div>
                            <div class="option-content">
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">$10 × 4 = $40</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>You keep:</strong> $0</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Partner gets:</strong> $40</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Return range:</strong> $0-$20</p>
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;"><strong>Your total:</strong> $0 + return</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="content-section">
                    <div class="section-header">
                        <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">Bonus Calculation</h3>
                    </div>
                    <p style="font-family: 'Times New Roman', Times, serif; font-size: 18px;">4 rounds will be randomly selected from all the rounds you play. The average earnings from these 4 rounds will be your bonus payment.</p>
                    <p style="text-align: center; font-weight: bold; margin-top: 10px; font-family: 'Times New Roman', Times, serif; font-size: 18px;">Round 1 + Round 2 + Round 3 + Round 4 → Average = Your Bonus</p>
                </div>
            </div>
        </div>
    </div>
    `;
    return [apply_instructions_html_top() + page_4 + apply_instructions_html_bottom()];
}

function get_page_5() {
    page_5 = `
    <div class="wrapTextBox">
        <div class="card-container">
            <div class="card-header" style="text-align: center; margin-bottom: 25px;">
                <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 22px; color: white;">Experiment Overview</h2>
            </div>
            
            <!-- Horizontal layout for the three phases -->
            <div class="card-body" style="display: flex; flex-direction: row; justify-content: space-between; gap: 20px; margin-bottom: 30px;">
                <!-- Phase 1: Comprehension Check -->
                <div class="content-section" style="flex: 1; background-color: #f8f9fa; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <div class="section-header" style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="background-color: #4682B4; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 10px;">1</div>
                        <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; color: #264653; margin: 0; font-weight: normal;">Comprehension Check</h3>
                    </div>
                    <ul style="font-size: 18px; color: #333; margin: 0; padding-left: 18px; font-family: 'Times New Roman', Times, serif; line-height: 1.5;">
                        <li>Test your understanding of the rules</li>
                        <li>You must pass to continue</li>
                    </ul>
                </div>
                
                <!-- Phase 2: Practice Phase -->
                <div class="content-section" style="flex: 1; background-color: #f8f9fa; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <div class="section-header" style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="background-color: #4682B4; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 10px;">2</div>
                        <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 0;">Practice Phase</h3>
                    </div>
                    <ul style="font-size: 18px; color: #333; margin: 0; padding-left: 15px; font-family: 'Times New Roman', Times, serif; line-height: 1.5;">
                        <li>You'll have a chance to practice the task</li>
                        <li>Get comfortable with the game mechanics</li>
                        <li>Remember: You have 4 seconds for each decision!</li>
                    </ul>
                </div>
                
                <!-- Phase 3: Main Experiment -->
                <div class="content-section" style="flex: 1; background-color: #f8f9fa; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <div class="section-header" style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="background-color: #4682B4; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 10px;">3</div>
                        <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 18px; margin: 0;">Main Experiment</h3>
                    </div>
                    <ul style="font-size: 18px; color: #333; margin: 0; padding-left: 15px; font-family: 'Times New Roman', Times, serif; line-height: 1.5;">
                        <li>These rounds count toward your bonus payment</li>
                        <li>A progress bar will show your completion</li>
                        <li>Remember: You have 4 seconds for each decision!</li>
                    </ul>
                </div>
            </div>
            
            <!-- Flow diagram -->
            <div style="display: flex; justify-content: center; align-items: center; margin: 20px 0 30px;">
                <div style="display: flex; align-items: center; font-family: 'Times New Roman', Times, serif; font-size: 18px;">
                    <div style="background-color: #4682B4; color: white; padding: 10px 15px; border-radius: 5px;">Comprehension Quiz</div>
                    <div style="margin: 0 15px;">→</div>
                    <div style="background-color: #4682B4; color: white; padding: 10px 15px; border-radius: 5px;">Practice Phase</div>
                    <div style="margin: 0 15px;">→</div>
                    <div style="background-color: #4682B4; color: white; padding: 10px 15px; border-radius: 5px;">Main Experiment</div>
                </div>
            </div>
            
            <div class="info-box" style="text-align: center; margin-top: 20px; padding: 15px; background-color: #4682B4; border-radius: 8px; border-left: 5px solid #4682B4; color: white;">
                <p style="margin-bottom:0; font-family: 'Times New Roman', Times, serif; font-size: 18px; color: white;">Click "Continue" to start the comprehension quiz</p>
            </div>
            </div>
        </div>
    </div>
    `;
    return [apply_instructions_html_top() + page_5 + apply_instructions_html_bottom()];
}

// 第6页已被删除

// 第7-10页已被删除

function apply_instructions_html_top() {

    global_html_top =
    `<div class="gameHeader">
        </div>
    <div class="offerCard">
        <div class="bidOffer">
            <div class="instructionsText">`;
    return global_html_top

}

function apply_instructions_html_bottom() {

    global_html_bottom =
            `</div>
        </div>
    </div>`;
    return global_html_bottom

}

function create_instructions_html() {
    return [get_page_1(), get_page_2(), get_page_3(), get_page_4(), get_page_5()]
}
