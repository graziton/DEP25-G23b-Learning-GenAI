// ai-chat.js
class AIChat {
    constructor() {
        this.currentModel = '';
        this.conversationHistory = [];
        this.isProcessing = false;
        this.supportedModels = {
            'gpt-4': {
                name: 'GPT-4',
                provider: 'openai',
                maxTokens: 8192,
                parameters: ['temperature', 'top_p', 'presence_penalty', 'frequency_penalty']
            },
            'gpt-3.5-turbo': {
                name: 'GPT-3.5 Turbo',
                provider: 'openai',
                maxTokens: 4096,
                parameters: ['temperature', 'top_p', 'presence_penalty', 'frequency_penalty']
            },
            'claude-3-opus': {
                name: 'Claude 3 Opus',
                provider: 'anthropic',
                maxTokens: 4096,
                parameters: ['temperature', 'top_k', 'top_p']
            },
            'gemini-pro': {
                name: 'Gemini Pro',
                provider: 'google',
                maxTokens: 2048,
                parameters: ['temperature', 'top_p', 'top_k']
            }
        };

        this.settings = {
            language: 'English (UK)',
            lightMode: false,
            autoGenerateTitle: true,
            enterToSubmit: true,
            inlineLatex: false,
            advancedMode: false,
            countTotalTokens: false
        };
        
        this.apiConfig = {
            endpoint: 'https://api.openai.com/v1/chat/completions',
            customEndpoint: false,
            apiKey: ''
        };
        
        // Load saved settings
        this.loadSettings();
        this.loadAPIConfig();
    }

    initializeChat(modelName) {
        if (!this.supportedModels[modelName]) {
            throw new Error(`Model ${modelName} is not supported`);
        }
        
        this.currentModel = modelName;
        this.createChatInterface();
        this.setupEventListeners();
        this.loadConversationHistory();
        this.initializeParameters();
        this.createModals();
        this.addModalStyles();
    }

    createModals() {
        this.createSettingsModal();
        this.createAPIModal();
        this.createImportExportModal();
    }

    // Add all the new modal creation methods and their event handlers here
    // ... settings modal code ...
    // ... API modal code ...
    // ... import/export modal code ...
    
    // Add settings management methods
    saveSettings() {
        localStorage.setItem('chat_settings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('chat_settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    // Add API config management methods
    saveAPIConfig() {
        localStorage.setItem('api_config', JSON.stringify(this.apiConfig));
    }

    loadAPIConfig() {
        const saved = localStorage.getItem('api_config');
        if (saved) {
            this.apiConfig = { ...this.apiConfig, ...JSON.parse(saved) };
        }
    }

    // Add import/export methods
    async exportChat() {
        // ... export implementation ...
    }

    async importChat(file) {
        // ... import implementation ...
    }

    async importOpenAIChat(file) {
        // ... OpenAI import implementation ...
    }

    createChatInterface() {
        const chatHTML = `
            <div class="ai-chat-container">
                <div class="chat-header">
                    <div class="model-selector">
                        <select id="modelSelect">
                            ${Object.entries(this.supportedModels).map(([key, model]) => 
                                `<option value="${key}" ${key === this.currentModel ? 'selected' : ''}>
                                    ${model.name}
                                </option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="api-key-section">
                        <input type="password" id="apiKeyInput" 
                            placeholder="Enter ${this.supportedModels[this.currentModel].provider} API key">
                        <button id="saveApiKey" class="primary-button">Save Key</button>
                    </div>
                    <div class="chat-controls">
                        <button onclick="document.getElementById('settingsModal').style.display='flex'" class="control-button">
                            <span class="icon">⚙️</span> Settings
                        </button>
                        <button onclick="document.getElementById('apiModal').style.display='flex'" class="control-button">
                            <span class="icon">🔑</span> API
                        </button>
                        <button onclick="document.getElementById('importExportModal').style.display='flex'" class="control-button">
                            <span class="icon">💾</span> Import/Export
                        </button>
                    </div>
                </div>

                <div class="chat-messages" id="chatMessages"></div>

                <div class="parameter-controls">
                    ${this.createParameterInputs()}
                </div>

                <div class="chat-input-container">
                    <textarea id="userInput" 
                        placeholder="Type your message..." 
                        rows="3"></textarea>
                    <button id="sendMessage" class="primary-button">
                        <span class="button-text">Send</span>
                        <span class="loading-spinner hidden"></span>
                    </button>
                </div>
            </div>
        `;

        const container = document.getElementById('ai-chat-mount-point');
        if (container) {
            container.innerHTML = chatHTML;
        }
    }

    createParameterInputs() {
        const model = this.supportedModels[this.currentModel];
        return model.parameters.map(param => `
            <div class="parameter-group">
                <label for="${param}">${this.formatParameterName(param)}:</label>
                <input type="number" 
                    id="${param}" 
                    step="0.1" 
                    min="0" 
                    max="1" 
                    value="${this.getDefaultValueForParameter(param)}">
                <span class="parameter-tooltip">
                    ${this.getParameterDescription(param)}
                </span>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.getElementById('sendMessage')?.addEventListener('click', () => this.sendMessage());
        document.getElementById('saveApiKey')?.addEventListener('click', () => this.saveApiKey());
        document.getElementById('modelSelect')?.addEventListener('change', (e) => this.handleModelChange(e.target.value));
        
        // Handle enter key in textarea
        document.getElementById('userInput')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Parameter change handlers
        this.supportedModels[this.currentModel].parameters.forEach(param => {
            document.getElementById(param)?.addEventListener('change', (e) => {
                this.validateAndSaveParameter(param, e.target.value);
            });
        });
    }

    async sendMessage() {
        if (this.isProcessing) return;

        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        if (!message) return;

        this.setProcessingState(true);
        this.addMessageToChat('user', message);
        userInput.value = '';

        try {
            const response = await this.getModelResponse(message);
            this.addMessageToChat('ai', response);
            this.saveConversationHistory();
        } catch (error) {
            this.handleError(error);
        } finally {
            this.setProcessingState(false);
        }
    }

    async getModelResponse(message) {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            throw new Error(`Please enter your ${this.supportedModels[this.currentModel].provider} API key`);
        }

        const parameters = this.getCurrentParameters();
        
        switch (this.supportedModels[this.currentModel].provider) {
            case 'openai':
                return await this.callOpenAI(message, apiKey, parameters);
            case 'anthropic':
                return await this.callClaude(message, apiKey, parameters);
            case 'google':
                return await this.callGemini(message, apiKey, parameters);
            default:
                throw new Error('Unsupported model provider');
        }
    }

    // API call implementations...
    async callOpenAI(message, apiKey, parameters) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.currentModel,
                messages: [{role: 'user', content: message}],
                ...parameters
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Similar implementations for Claude and Gemini...

    // UI Helper Methods
    setProcessingState(isProcessing) {
        this.isProcessing = isProcessing;
        const sendButton = document.getElementById('sendMessage');
        const spinner = sendButton?.querySelector('.loading-spinner');
        const buttonText = sendButton?.querySelector('.button-text');

        if (spinner && buttonText) {
            spinner.classList.toggle('hidden', !isProcessing);
            buttonText.classList.toggle('hidden', isProcessing);
        }
        
        if (sendButton) {
            sendButton.disabled = isProcessing;
        }
    }

    addMessageToChat(role, content) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        // Convert markdown to HTML if it's an AI response
        if (role === 'ai') {
            messageDiv.innerHTML = marked.parse(content);
        } else {
            messageDiv.textContent = content;
        }

        chatMessages?.appendChild(messageDiv);
        chatMessages?.scrollTo(0, chatMessages.scrollHeight);
        
        // Save to conversation history
        this.conversationHistory.push({ role, content });
    }

    // Utility Methods
    formatParameterName(param) {
        return param.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getDefaultValueForParameter(param) {
        const defaults = {
            'temperature': 0.7,
            'top_p': 1.0,
            'presence_penalty': 0.0,
            'frequency_penalty': 0.0,
            'top_k': 40
        };
        return defaults[param] || 0.5;
    }

    getParameterDescription(param) {
        const descriptions = {
            'temperature': 'Controls randomness (0 = deterministic, 1 = creative)',
            'top_p': 'Controls diversity via nucleus sampling',
            'presence_penalty': 'Penalizes topic repetition',
            'frequency_penalty': 'Penalizes token repetition',
            'top_k': 'Limits the number of tokens considered for each step'
        };
        return descriptions[param] || '';
    }

    // Storage Methods
    saveApiKey() {
        const apiKeyInput = document.getElementById('apiKeyInput');
        const provider = this.supportedModels[this.currentModel].provider;
        
        if (apiKeyInput?.value) {
            localStorage.setItem(`${provider}_api_key`, apiKeyInput.value);
            apiKeyInput.value = '';
            this.showNotification('API key saved successfully');
        }
    }

    getApiKey() {
        const provider = this.supportedModels[this.currentModel].provider;
        return localStorage.getItem(`${provider}_api_key`);
    }

    saveConversationHistory() {
        localStorage.setItem(
            `chat_history_${this.currentModel}`,
            JSON.stringify(this.conversationHistory.slice(-50)) // Keep last 50 messages
        );
    }

    loadConversationHistory() {
        const history = localStorage.getItem(`chat_history_${this.currentModel}`);
        if (history) {
            this.conversationHistory = JSON.parse(history);
            this.conversationHistory.forEach(msg => this.addMessageToChat(msg.role, msg.content));
        }
    }

    // Error Handling
    handleError(error) {
        console.error('Chat Error:', error);
        this.addMessageToChat('error', error.message);
        this.showNotification(error.message, 'error');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Create global instance
window.aiChat = new AIChat();