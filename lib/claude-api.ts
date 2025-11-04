/**
 * Claude API Service for Schema Generation
 * Using Anthropic Claude Sonnet 4.5 via REST API
 */

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
}

export class ClaudeAPI {
  private apiKey: string;
  private baseURL = 'https://api.anthropic.com/v1/messages';
  private model = 'claude-sonnet-4-20250514'; // Latest Claude Sonnet 4.5

  constructor(apiKey?: string) {
    // Get API key from environment variable or passed parameter
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️  ANTHROPIC_API_KEY not set. Schema generation will be skipped.');
    } else {
      console.log('✅ ANTHROPIC_API_KEY configured, schema generation enabled');
    }
  }

  /**
   * Send a message to Claude and get a response
   */
  async sendMessage(
    prompt: string,
    systemPrompt?: string,
    options?: {
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<string> {
    if (!this.apiKey) {
      console.log('⚠️  Skipping Claude API call (no API key)');
      return '';
    }

    const messages: ClaudeMessage[] = [
      {
        role: 'user',
        content: prompt,
      },
    ];

    // Add 15-second timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const startTime = Date.now();
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: options?.maxTokens || 4096,
          temperature: options?.temperature || 0.3, // Lower for structured output
          system: systemPrompt,
          messages,
        }),
        signal: controller.signal,
        // Don't cache - we want fresh responses for each page
        cache: 'no-store',
      });

      clearTimeout(timeoutId);
      
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Claude API error: ${response.status} - ${error}`);
      }

      const data: ClaudeResponse = await response.json();
      
      console.log(`⏱️  Claude API call completed in ${elapsed}s`);
      
      if (data.content && data.content.length > 0) {
        return data.content[0].text;
      }

      return '';
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.error('❌ Claude API timeout after 15 seconds');
      } else {
        console.error('❌ Claude API Error:', error);
      }
      return '';
    }
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

// Singleton instance
let claudeInstance: ClaudeAPI | null = null;

export function getClaudeAPI(): ClaudeAPI {
  if (!claudeInstance) {
    claudeInstance = new ClaudeAPI();
  }
  return claudeInstance;
}

