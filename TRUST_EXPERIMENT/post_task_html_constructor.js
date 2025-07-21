/* html for setup */
function create_game_done_html() {
    // Add button styles to ensure proper display
    const buttonStyles = `
    <style>
        /* Position button at the bottom center of the screen */
        .jspsych-btn {
            position: fixed !important;
            bottom: 50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 8px 20px !important;
            background-color: #3498db !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            font-size: 16px !important;
            cursor: pointer !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            z-index: 1000 !important;
        }
        
        .jspsych-btn:hover {
            background-color: #2980b9 !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        /* Add padding to the bottom of the page to ensure content isn't hidden behind the fixed button */
        .jspsych-content {
            padding-bottom: 100px !important;
        }
    </style>
    `;
    
    done_html =
    `
    ${buttonStyles}
    <div>
        <p style="text-align: center; font-size: 18px;"><strong>You are now finished with the game!</strong></p>
        <p style="text-align: center; font-size: 16px;">We will now ask you a series of questions about the other participants in the game. Your answers to these questions will not be shown to the other participants and all of your responses will be <strong>private and anonymous.</strong></p>
        <p style="text-align: center; font-size: 18px;">Please press the <strong>spacebar</strong> to continue</p>
    </div>
    `
    return [apply_global_html_top() + done_html + apply_global_html_bottom()]
}

function create_partner_ratings_html(partnerName, avatar) {
    // Create HTML structure consistent with other experiment pages
    let ratings_html = `
        <div class="jspsych-survey-html-form" style="padding-top: 150px; padding-bottom: 200px;">
            <h3 style="text-align: center; margin: 0 0 8px 0; font-size: 18px; font-family: 'Times New Roman', Times, serif;">Partner Ratings</h3>
            <p style="text-align: center; margin: 0 0 5px 0; font-size: 18px; line-height: 1.2; font-family: 'Times New Roman', Times, serif;">To what extent do the following words describe <strong>${partnerName}</strong>?</p>
            <p style="text-align: center; margin: 0 0 15px 0; font-size: 18px; line-height: 1.2; font-family: 'Times New Roman', Times, serif;">Please rate on a scale from 1 (not at all) to 7 (very much).</p>

            <div style="display: flex; justify-content: center; align-items: center; margin: 5px auto 15px auto;">
                <img src="${avatar}" width="90" style="margin: 0;">
            </div>
    `;

    // 添加特质评分项目，每个都使用滑条
    const traits = ['Trustworthy', 'Generous', 'Selfish', 'Greedy', 'Fair', 'Similar to me'];
    
    for (let i = 0; i < traits.length; i++) {
        ratings_html += `
        <div style="display: flex; align-items: center; margin: 8px 0;">
            <!-- 题目放在左侧 -->
            <div style="width: 200px; padding-right: 15px; font-size: 18px; line-height: 1.4; font-family: 'Times New Roman', Times, serif;">
                ${traits[i]}
            </div>
            
            <!-- 滑条和标签放在右侧 -->
            <div style="flex: 1; min-width: 0;">
                <!-- 顶部标签 -->
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 16px; font-family: 'Times New Roman', Times, serif;">
                    <span>Not at all</span>
                    <span>Very much</span>
                </div>
                
                <!-- 滑条 -->
                <div style="margin: 5px 0;">
                    <input type="range" 
                           name="${traits[i].toLowerCase().replace(/ /g, '_')}_rating" 
                           min="1" 
                           max="7" 
                           step="1" 
                           value="4" 
                           style="
                               -webkit-appearance: none;
                               width: 100%;
                               height: 8px;
                               border-radius: 4px;
                               background: #e0e0e0;
                               outline: none;
                               margin: 10px 0;
                           "
                           oninput="this.style.background='linear-gradient(to right, #3498db 0%, #3498db ' + ((this.value-1)/6*100) + '%, #e0e0e0 ' + ((this.value-1)/6*100) + '%, #e0e0e0 100%)'"
                           onmouseover="this.style.cursor='pointer'"
                           required>
                    <style>
                        input[type="range"]::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: #3498db;
                            cursor: pointer;
                            margin-top: -6px;
                            border: 2px solid #fff;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                        }
                        input[type="range"]::-moz-range-thumb {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: #3498db;
                            cursor: pointer;
                            border: 2px solid #fff;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                        }
                    </style>
                </div>
                
                <!-- 数字标签 -->
                <div style="display: flex; justify-content: space-between; font-size: 16px; margin-top: 5px; font-family: 'Times New Roman', Times, serif;">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                </div>
            </div>
        </div>
        `;
    }
    
    // 关闭容器标签
    ratings_html += `
        </div>`;

    // 添加更紧凑的样式
    const basicStyles = `
    <style>
        /* 表单样式 */
        .jspsych-survey-html-form {
            max-width: 700px;
            margin: 0 auto;
            padding: 20px 20px 100px 20px;
            font-family: 'Times New Roman', Times, serif !important;
            font-size: 18px !important;
            line-height: 1.3 !important;
            color: #333;
            box-sizing: border-box;
        }
        
        /* partner-survey类的样式 */
        .partner-survey {
            margin: 0 !important;
            padding: 0 !important;
        }
        
        /* 使所有元素更紧凑 */
        .jspsych-survey-html-form * {
            margin: 0 !important;
            padding: 0 !important;
        }
        
        .jspsych-survey-html-form p {
            margin: 8px 0 !important;
            line-height: 1.4 !important;
            font-size: 18px !important;
            font-family: 'Times New Roman', Times, serif !important;
        }
        
        .jspsych-survey-html-form div {
            margin: 8px 0 !important;
        }
        
        .jspsych-survey-html-form h3 {
            margin: 10px 0 8px !important;
        }
        
        /* 滑条样式 - 与最后一个问卷一致 */
        input[type="range"] {
            -webkit-appearance: none;
            width: 100%;
            height: 25px;
            background: transparent;
            outline: none;
            margin: 8px 0;
        }
        
        /* 响应式调整 */
        @media screen and (max-height: 600px) {
            .jspsych-survey-html-form {
                padding: 8px;
            }
            
            .jspsych-survey-html-form p {
                font-size: 13px;
            }
            
            .jspsych-survey-html-form div {
                margin: 6px 0;
            }
            
            input[type="range"] {
                height: 20px;
            }
            
            input[type="range"]::-webkit-slider-thumb {
                width: 16px;
                height: 16px;
            }
            
            input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
            }
        }
        
        /* 确保内容不会被底部按钮遮挡 */
        .jspsych-content {
            padding-bottom: 120px !important;
        }
        
        /* 滑条轨道 */
        input[type="range"]::-webkit-slider-runnable-track {
            width: 100%;
            height: 6px;
            background: #d3d3d3;
            border-radius: 3px;
        }
        
        input[type="range"]::-moz-range-track {
            width: 100%;
            height: 6px;
            background: #d3d3d3;
            border-radius: 3px;
        }
        
        /* 滑条滑块 */
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3498db;
            cursor: pointer;
            margin-top: -7px;
            position: relative;
            z-index: 1;
        }
        
        input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3498db;
            cursor: pointer;
            border: none;
            position: relative;
            z-index: 1;
        }
        
        /* 按钮样式 */
        button.jspsych-btn {
            position: fixed !important;
            bottom: 50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 8px 20px !important;
            background-color: #3498db !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            font-size: 16px !important;
            cursor: pointer !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 120px !important;
            z-index: 1000 !important;
        }

        button.jspsych-btn:hover {
            background-color: #2980b9 !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        button.jspsych-btn:disabled {
            background-color: #cccccc !important;
            cursor: not-allowed !important;
        }
        
        /* 添加底部内边距，确保内容不会被固定按钮遮挡 */
        .jspsych-content {
            padding-bottom: 100px !important;
        }
        
        /* 响应式调整 */
        @media (max-width: 600px) {
            .jspsych-survey-html-form {
                padding: 10px;
            }
            
            input[type="range"] {
                width: 90%;
            }
        }
        
        /* 使所有元素更紧凑 */
        .jspsych-survey-html-form * {
            margin: 0 !important;
            padding: 0 !important;
        }
        
        .jspsych-survey-html-form p {
            margin: 5px 0 !important;
            line-height: 1.2 !important;
        }
        
        .jspsych-survey-html-form div {
            margin: 8px 0 !important;
        }
        
        .jspsych-survey-html-form h3 {
            margin: 10px 0 8px !important;
        }
    </style>
    `;

    // 返回完整的HTML，与最后一个问卷格式一致
    return basicStyles + ratings_html;
}

function create_partner_similarity_html(partners) {

    // Select two partners, one from group 1, one from group 2
    const group1Partner = partners[0]; // KeJo with random month (Group 1)
    const group2Partner = partners[2]; // GePl with random month (Group 2)
    const selectedPartners = [group1Partner, group2Partner];

    // Create HTML structure with consistent Times New Roman, 18px font
    let similarity_html = `
        <div style="padding-top: 40px; font-family: 'Times New Roman', Times, serif;">
            <h3 style="text-align: center; margin: 0 0 15px 0; font-size: 22px; font-weight: bold;">Partner Return Similarity</h3>
            <p style="text-align: center; margin: 0 0 30px 0; font-size: 18px; line-height: 1.4;">For each question below, please identify which partner's returns were most similar to those of the highlighted partner.</p>
        </div>
    `;

    // Add each question
    selectedPartners.forEach((currentPartner, index) => {
        // Filter to get only the other partners (excluding the current one)
        const otherPartners = partners.filter(p => p.partner_number !== currentPartner.partner_number);

        // Use the same standardized text for all questions
        let questionText = `Which partner's return were most similar to those of ${currentPartner.stimulus_identity}?`;

        // Create question and radio button layout with consistent styling
        similarity_html += `
        <div style="margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; font-family: 'Times New Roman', Times, serif;">
            <div style="display: flex; margin-bottom: 10px; align-items: center;">
                <div style="width: 100px; text-align: center; margin-right: 15px;">
                    <img src="${currentPartner.avatar}" width="70" style="border-radius: 5px;">
                    <p style="margin: 5px 0 0 0; font-size: 18px; line-height: 1.2; font-weight: bold;">${currentPartner.stimulus_identity}</p>
                </div>
                <div style="flex: 1;">
                    <p style="margin: 0; font-size: 18px; line-height: 1.4;"><strong>${questionText}</strong></p>
                </div>
            </div>

            <div style="display: flex; justify-content: center; gap: 30px; margin-top: 15px;">
        `;

        // Add radio buttons for each other partner with consistent styling
        otherPartners.forEach(other => {
            similarity_html += `
                <label style="display: flex; flex-direction: column; align-items: center; width: 90px; cursor: pointer; padding: 10px; border-radius: 5px; transition: background-color 0.2s; font-family: 'Times New Roman', Times, serif;">
                    <input type="radio" name="similar_to_${currentPartner.partner_number}" value="${other.partner_number}" required style="margin-bottom: 8px;">
                    <img src="${other.avatar}" width="70" style="border-radius: 5px; margin-bottom: 5px;">
                    <p style="font-size: 18px; text-align: center; margin: 5px 0 0 0; line-height: 1.2;">${other.stimulus_identity}</p>
                </label>
                `;
        });

        similarity_html += `
            </div>
        </div>
        `;
    });

    // No need to close container as we removed the opening div

    // Add CSS that ensures the button is positioned at the bottom center with updated styles
    const basicStyles = `
    <style>
        /* Global styles */
        body {
            font-family: 'Times New Roman', Times, serif !important;
            font-size: 18px !important;
            line-height: 1.4 !important;
            color: #333 !important;
        }

        /* Position button at the bottom center of the screen */
        button.jspsych-btn {
            position: fixed !important;
            bottom: 30px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 10px 30px !important;
            background-color: #3498db !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            font-size: 18px !important;
            font-family: 'Times New Roman', Times, serif !important;
            cursor: pointer !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            visibility: visible !important;
            opacity: 1 !important;
            min-width: 150px !important;
            z-index: 1000 !important;
            transition: background-color 0.2s, transform 0.1s !important;
        }

        button.jspsych-btn:hover {
            background-color: #2980b9 !important;
            transform: translateX(-50%) translateY(-2px) !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }

        button.jspsych-btn:active {
            transform: translateX(-50%) translateY(1px) !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
        }
        
        /* Add padding to the bottom of the page to ensure content isn't hidden behind the fixed button */
        .jspsych-content {
            padding-bottom: 120px !important;
        }
        
        /* Style radio buttons for better visibility */
        input[type="radio"] {
            transform: scale(1.3);
            margin-right: 5px;
        }
        
        /* Hover effect for partner options */
        label:hover {
            background-color: #f5f5f5;
        }
    </style>
    `;

    // Return with minimal wrapper to avoid interference
    return basicStyles + similarity_html;
}

function create_belief_check_html() {

    belief_html =
    `
        <div style="padding-top: 40px; font-family: 'Times New Roman', Times, serif;">
            <h3 style="text-align: center; margin: 0 0 15px 0; font-size: 22px; font-weight: bold;">Final Question</h3>
            <p style="text-align: center; margin: 0 0 10px 0; font-size: 18px; line-height: 1.4;">To what extent did you believe that the four partners you interacted with were real human participants?</p>
            <p style="text-align: center; margin: 0 0 25px 0; font-size: 18px; line-height: 1.4;">Please rate on a scale from 1 (definitely not real people) to 10 (definitely real people).</p>

            <div style="display: flex; justify-content: center; align-items: center; width: 90%; margin: 0 auto 15px auto;">
                <div style="text-align: left; width: 120px; font-size: 16px; line-height: 1.2;">
                    <p style="margin: 0;">Definitely not<br>real people</p>
                </div>
                <div style="flex: 1; margin: 0 15px;">
                    <!-- Slider will be placed here -->
                </div>
                <div style="text-align: right; width: 120px; font-size: 16px; line-height: 1.2;">
                    <p style="margin: 0;">Definitely<br>real people</p>
                </div>
            </div>

            <div style="display: flex; justify-content: center; margin: 10px auto 5px auto; width: 90%; max-width: 600px;">
                <input type="range" name="belief_rating" min="1" max="10" step="1" value="5" 
                       style="width: 100%; height: 30px;" required>
            </div>
            <div style="display: flex; justify-content: space-between; width: 90%; max-width: 600px; margin: 0 auto 30px auto;">
                <span style="font-size: 16px; width: 20px; text-align: center;">1</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">2</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">3</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">4</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">5</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">6</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">7</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">8</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">9</span>
                <span style="font-size: 16px; width: 20px; text-align: center;">10</span>
            </div>
        </div>
    `

    // Add button styles to ensure proper display
    const basicStyles = `
    <style>
        /* Position button at the bottom center of the screen */
        button.jspsych-btn {
            position: fixed !important;
            bottom: 50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 8px 20px !important;
            background-color: #3498db !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            font-size: 16px !important;
            cursor: pointer !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 120px !important;
            z-index: 1000 !important;
        }

        button.jspsych-btn:hover {
            background-color: #2980b9 !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        /* Add padding to the bottom of the page to ensure content isn't hidden behind the fixed button */
        .jspsych-content {
            padding-bottom: 100px !important;
        }
    </style>
    `;

    // Return with minimal wrapper to avoid interference
    return basicStyles + belief_html;
}

function create_bonus_html() {
    // Add button styles to ensure proper display
    const basicStyles = `
    <style>
        /* Position button at the bottom center of the screen */
        button.jspsych-btn {
            position: fixed !important;
            bottom: 50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 8px 20px !important;
            background-color: #3498db !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            font-size: 16px !important;
            cursor: pointer !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 120px !important;
            z-index: 1000 !important;
        }

        button.jspsych-btn:hover {
            background-color: #2980b9 !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        /* Add padding to the bottom of the page to ensure content isn't hidden behind the fixed button */
        .jspsych-content {
            padding-bottom: 100px !important;
        }
    </style>
    `;

    debrief_html =
    `
        <div style="padding: 40px 20px; font-family: 'Times New Roman', Times, serif; max-width: 800px; margin: 0 auto;">
            <h2 style="text-align: center; margin: 0 0 30px 0; font-size: 24px; font-weight: bold;">Final Debriefing</h2>
            <div style="font-size: 18px; line-height: 1.6;">
                <p style="margin: 0 0 25px 0;">Thanks again for participating in this task! </p>
                <p style="margin: 0 0 25px 0;">In this study, we are interested in how people make decisions in different situations. Given how the task is set up, we couldn't be upfront about every aspect of this study. However, we want to be totally transparent with you now about the goals and details of the experiment.</p>
                <p style="margin: 0 0 25px 0;">Because we wanted to see how you make decisions that would impact another person, we told you that you were completing this session with other online participants. However, in reality, you were not playing with other real partners, but with a computer that made predetermined decisions. This is because our experiment requires carefully controlled settings that cannot be replicated with other humans.</p>
                <p style="margin: 0 0 30px 0;">We do ask that you do not disclose the nature of this study to other individuals that may also be participating in our experiment in the near future as this would compromise our experimental design!</p>
                <p style="text-align: center; margin: 40px 0 0 0; font-size: 20px;">Press the <strong>spacebar</strong> to see your bonus payment.</p>
            </div>
        </div>
    `;

    return [apply_global_html_top() + basicStyles + debrief_html + apply_global_html_bottom()]
}

function create_pattern_recognition_html() {
    return `
        <div style="padding: 40px 20px; font-family: 'Times New Roman', Times, serif; max-width: 800px; margin: 0 auto;">
            <div style="font-size: 18px; line-height: 1.6;">
                <p style="margin: 0 0 25px 0;">Did you notice any patterns in the partner's responses? If so, please describe what you noticed in the box below.</p>
                <div style="margin: 20px 0 30px 0;">
                    <textarea name="pattern_response" rows="6" style="width: 100%; padding: 10px; font-family: 'Times New Roman', Times, serif; font-size: 16px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;" placeholder="Please type your response here..."></textarea>
                </div>
                <p style="margin: 0 0 30px 0; color: #666; font-size: 16px;">(If you didn't notice any patterns, you can leave this blank)</p>
            </div>
        </div>
    `;
}

function create_final_page_html() {
    // Calculate the bonus if not already done
    const bonusData = getBonus();
    const bonusAmount = bonusData.bonus;

    // Add button styles to ensure proper display
    const basicStyles = `
    <style>
        /* Position button at the bottom center of the screen */
        button.jspsych-btn {
            position: fixed !important;
            bottom: 50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 8px 20px !important;
            background-color: #3498db !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            font-size: 16px !important;
            cursor: pointer !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 120px !important;
            z-index: 1000 !important;
        }

        button.jspsych-btn:hover {
            background-color: #2980b9 !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        /* Add padding to the bottom of the page to ensure content isn't hidden behind the fixed button */
        .jspsych-content {
            padding-bottom: 100px !important;
        }
    </style>
    `;

    final_html =
    `
        <div style="padding: 40px 20px; font-family: 'Times New Roman', Times, serif; max-width: 800px; margin: 0 auto; text-align: center;">
            <h2 style="margin: 0 0 30px 0; font-size: 24px; font-weight: bold;">Bonus Payment</h2>
            <div style="font-size: 18px; line-height: 1.6;">
                <p style="margin: 0 0 25px 0;">Based on the average of 4 randomly selected decisions, you earned an additional <strong>${formatCurrency(bonusAmount)} bonus</strong>.</p>
                <p style="margin: 0 0 40px 0;">Your total payment will be: base payment + ${formatCurrency(bonusAmount)} bonus.</p>
                <p style="margin: 0 0 20px 0; font-size: 20px;">Press the <strong>spacebar</strong> to end the task.</p>
                <p style="margin: 0 0 0 0; font-size: 18px;">Please find the experimenter to collect your payment.</p>
            </div>
        </div>
    `;

    return [apply_global_html_top() + basicStyles + final_html + apply_global_html_bottom()]
}

function apply_global_html_top() {

    global_html_top =
        `<div class="gameHeader">
        </div>
    <div class="offerCard" style="height: auto; min-height: 90vh; overflow-y: auto; display: flex; justify-content: center;">
        <div class="bidOffer" style="overflow-y: auto; display: flex; flex-direction: column; justify-content: center;">`;
    return global_html_top

}

function apply_global_html_bottom() {

    global_html_bottom =
        `</div>
    </div>`;
    return global_html_bottom

}