export interface Agent {
  id: string
  name: string
  description: string
  type: AgentType
  status: AgentStatus
  createdAt: string
  updatedAt: string
  configuration: AgentConfiguration
  metrics: AgentMetrics
}

export type AgentType = 'chatbot' | 'assistant' | 'automation' | 'analytics' | 'custom'
export type AgentStatus = 'draft' | 'active' | 'inactive' | 'error'

export interface AgentConfiguration {
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  tools: Tool[]
  memory: MemoryConfig
  apiKeys: ApiKey[]
}

export interface Tool {
  id: string
  name: string
  description: string
  type: ToolType
  configuration: Record<string, any>
}

export type ToolType = 'web_search' | 'file_reader' | 'calculator' | 'api_call' | 'database' | 'custom'

export interface MemoryConfig {
  type: 'none' | 'conversation' | 'vector' | 'redis'
  maxMessages: number
  ttl: number
}

export interface ApiKey {
  name: string
  value: string
  isEncrypted: boolean
}

export interface AgentMetrics {
  totalRequests: number
  successfulRequests: number
  averageResponseTime: number
  errorRate: number
  lastUsed: string
}

export interface CreateAgentRequest {
  name: string
  description: string
  type: AgentType
  configuration: Partial<AgentConfiguration>
}

export interface UpdateAgentRequest {
  name?: string
  description?: string
  configuration?: Partial<AgentConfiguration>
} 