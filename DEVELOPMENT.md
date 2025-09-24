# 🤖 AhFai Development Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **pnpm** 8+
- **Git** for version control
- **VS Code** (recommended) with Svelte extension

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:5174
```

---

## 🏗️ Project Architecture

### Tech Stack
- **Frontend**: SvelteKit 2 + Svelte 5 (Runes)
- **Styling**: Tailwind CSS + shadcn-svelte
- **TypeScript**: Full type safety
- **AI Integration**: Local LLM + OpenAI API
- **Privacy**: Local data processing
- **WhatsApp**: Business API integration

### Folder Structure
```
AhFai/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable UI components
│   │   ├── stores/             # Svelte stores (state management)
│   │   ├── ai/                 # AI processing modules
│   │   ├── privacy/            # Privacy protection utilities
│   │   ├── whatsapp/           # WhatsApp integration
│   │   └── types/              # TypeScript type definitions
│   ├── routes/                 # SvelteKit routes
│   ├── app.html               # HTML template
│   └── app.css                # Global styles
├── static/                    # Static assets
├── tests/                     # Test files
└── docs/                      # Documentation
```

---

## 🤖 AI System Implementation

### Local AI Processing
```typescript
// Example local AI implementation
interface AIRequest {
  message: string;
  context: ConversationContext;
  privacy: PrivacySettings;
}

class LocalAI {
  private model: LocalLLM;
  
  async process(request: AIRequest): Promise<AIResponse> {
    // All processing happens locally - no data leaves device
    return this.model.generate({
      prompt: request.message,
      context: request.context,
      maxTokens: 1000,
      temperature: 0.7
    });
  }
}
```

### Privacy-First Architecture
- **Local Processing**: All AI inference runs on device
- **No Data Collection**: Zero telemetry or analytics
- **Encrypted Storage**: Local conversation history encrypted
- **Memory Management**: Automatic data cleanup
- **Offline Capability**: Works without internet connection

---

## 📱 WhatsApp Integration

### Business API Setup
```typescript
// WhatsApp Business API integration
interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
  webhookVerifyToken: string;
  businessAccountId: string;
}

class WhatsAppIntegration {
  async sendMessage(to: string, message: string): Promise<void> {
    // Implementation in /src/lib/whatsapp/api.ts
  }
  
  async receiveWebhook(payload: WebhookPayload): Promise<void> {
    // Handle incoming messages
  }
}
```

### Message Processing Pipeline
1. **Receive**: WhatsApp webhook receives message
2. **Privacy Check**: Ensure no sensitive data logging
3. **AI Processing**: Local AI generates response
4. **Send**: Response sent back via WhatsApp API
5. **Cleanup**: Temporary data cleared

---

## 🎨 UI/UX Development

### Design System (Violet Theme)
```css
:root {
  --primary: 139 92 246;       /* Violet 500 - AI & Innovation */
  --secondary: 168 85 247;     /* Purple 500 - Creativity */
  --accent: 124 58 237;        /* Violet 600 - Actions */
  --muted: 196 181 253;        /* Violet 200 - Backgrounds */
}
```

### Chat Interface Components
```svelte
<!-- Example: AI Chat Component -->
<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import type { Message } from '$lib/types/chat';
  
  interface Props {
    messages: Message[];
    onSend: (message: string) => void;
    isProcessing?: boolean;
  }
  
  let { messages, onSend, isProcessing = false }: Props = $props();
  let inputValue = $state('');
  
  function handleSend() {
    if (inputValue.trim()) {
      onSend(inputValue);
      inputValue = '';
    }
  }
</script>

<div class="chat-container">
  <div class="messages">
    {#each messages as message}
      <div class="message {message.role}">
        <div class="avatar">
          {#if message.role === 'assistant'}
            🤖
          {:else}
            👤
          {/if}
        </div>
        <div class="content">{message.content}</div>
      </div>
    {/each}
  </div>
  
  <div class="input-area">
    <input
      bind:value={inputValue}
      placeholder="Ask AhFai anything..."
      disabled={isProcessing}
      on:keydown={(e) => e.key === 'Enter' && handleSend()}
    />
    <Button on:click={handleSend} disabled={isProcessing}>
      {#if isProcessing}
        Processing...
      {:else}
        Send
      {/if}
    </Button>
  </div>
</div>
```

---

## 🔒 Privacy Implementation

### Data Protection
```typescript
// Privacy-first data handling
class PrivacyManager {
  // No data collection
  static readonly COLLECT_ANALYTICS = false;
  static readonly COLLECT_TELEMETRY = false;
  static readonly STORE_CONVERSATIONS = false; // Only locally
  
  // Encryption for local storage
  static encryptLocal(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.getLocalKey()).toString();
  }
  
  static decryptLocal(encrypted: string): any {
    const bytes = CryptoJS.AES.decrypt(encrypted, this.getLocalKey());
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  
  // Automatic cleanup
  static scheduleCleanup(): void {
    setInterval(() => {
      this.clearOldConversations();
    }, 24 * 60 * 60 * 1000); // Daily cleanup
  }
}
```

### Local AI Models
```bash
# Download and setup local models
npm run setup:models

# Available models:
# - Llama 2 7B (Recommended for privacy)
# - Mistral 7B (Good performance)
# - CodeLlama (For coding assistance)
# - Custom fine-tuned models
```

---

## 🧪 Testing Strategy

### Privacy Testing
```bash
# Test privacy compliance
npm run test:privacy

# Verify no data leakage
npm run test:data-leakage

# Test local processing
npm run test:local-ai
```

### WhatsApp Integration Testing
```bash
# Test webhook handling
npm run test:whatsapp

# Test message processing
npm run test:messaging

# End-to-end WhatsApp flow
npm run test:e2e:whatsapp
```

---

## 🚀 Deployment

### Environment Configuration
```bash
# .env.local (never commit this file)
VITE_WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
VITE_WHATSAPP_ACCESS_TOKEN=your_access_token
VITE_WEBHOOK_VERIFY_TOKEN=your_webhook_token
VITE_LOCAL_AI_MODEL=llama2-7b
VITE_PRIVACY_MODE=strict
```

### Local AI Setup
```bash
# Install local AI runtime
npm run install:ai-runtime

# Download models
npm run download:models

# Start local AI server
npm run start:ai-server
```

---

## 🤝 Contributing Guidelines

### Privacy-First Development
- **Never** log user conversations
- **Always** process data locally when possible
- **Encrypt** any temporary storage
- **Clear** data after processing
- **Document** privacy implications

### Code Standards
```typescript
// Example: Privacy-compliant logging
// ❌ DON'T DO THIS
console.log('User message:', userMessage);

// ✅ DO THIS
console.log('Message received, length:', userMessage.length);
```

---

## 📚 Resources & Documentation

### AI & Privacy Resources
- **Local AI Models**: https://huggingface.co/models
- **Privacy Engineering**: https://www.privacyengineering.org/
- **WhatsApp Business API**: https://developers.facebook.com/docs/whatsapp
- **Encryption Standards**: https://www.nist.gov/cryptography

### Community
- **Discord**: [AhFai Developers](https://discord.gg/ahfai-dev)
- **Privacy Forum**: [Privacy-First AI](https://forum.ahfai.com/privacy)

---

## 🔒 Security & Compliance

### Privacy Standards
- **Zero Data Collection**: No user data stored on servers
- **Local Processing**: All AI inference on device
- **Encryption**: AES-256 for local storage
- **Automatic Cleanup**: Regular data purging
- **Transparency**: Open source privacy code

### Compliance
- **GDPR**: Full compliance through local processing
- **CCPA**: No data collection = automatic compliance
- **COPPA**: Safe for all ages
- **HIPAA**: Healthcare conversation privacy

---

## 📞 Support & Contact

### Development Support
- **Technical Issues**: [GitHub Issues](https://github.com/TrillionUnicorn/AhFai/issues)
- **Privacy Questions**: privacy@ahfai.com
- **WhatsApp Integration**: whatsapp@ahfai.com

### Team Contact
- **Hunter Ho** (Founder): hunter@ahfai.com
- **Privacy Team**: privacy@ahfai.com
- **General Inquiries**: hello@ahfai.com

---

*Building AI that respects your privacy. Your data stays with you, always.* 🔒🤖
