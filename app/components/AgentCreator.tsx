'use client'

import React, { useState } from 'react'
import { Bot, Settings, Code, Zap, Save, ArrowLeft } from 'lucide-react'
import { Agent, AgentType, CreateAgentRequest } from '../types'

interface AgentCreatorProps {
  onAgentCreated: (agent: Agent) => void
}

export default function AgentCreator({ onAgentCreated }: AgentCreatorProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CreateAgentRequest>({
    name: '',
    description: '',
    type: 'assistant',
    configuration: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: '',
      tools: [],
      memory: {
        type: 'conversation',
        maxMessages: 10,
        ttl: 3600
      },
      apiKeys: []
    }
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleConfigChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [field]: value
      }
    }))
  }

  const handleSubmit = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      type: formData.type,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      configuration: formData.configuration as any,
      metrics: {
        totalRequests: 0,
        successfulRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        lastUsed: new Date().toISOString()
      }
    }
    onAgentCreated(newAgent)
  }

  const agentTypes: { value: AgentType; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'chatbot',
      label: 'Chatbot',
      description: 'Conversational AI for customer support and engagement',
      icon: <Bot className="h-6 w-6" />
    },
    {
      value: 'assistant',
      label: 'Assistant',
      description: 'General-purpose AI assistant for various tasks',
      icon: <Code className="h-6 w-6" />
    },
    {
      value: 'automation',
      label: 'Automation',
      description: 'Automated workflows and task execution',
      icon: <Zap className="h-6 w-6" />
    },
    {
      value: 'analytics',
      label: 'Analytics',
      description: 'Data analysis and insights generation',
      icon: <Settings className="h-6 w-6" />
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create New Agent</h2>
        <p className="text-slate-600">Build your AI agent step by step</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-16 h-0.5 mx-2 ${
                step > stepNumber ? 'bg-blue-600' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Basic Information</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Agent Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input-field"
                placeholder="Enter agent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Describe what your agent does"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Agent Type
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {agentTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => handleInputChange('type', type.value)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.type === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600">{type.icon}</div>
                      <div>
                        <h4 className="font-medium text-slate-900">{type.label}</h4>
                        <p className="text-sm text-slate-600">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.description}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Configuration */}
      {step === 2 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Agent Configuration</h3>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Model
                </label>
                <select
                  value={formData.configuration?.model}
                  onChange={(e) => handleConfigChange('model', e.target.value)}
                  className="input-field"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude-3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Temperature
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={formData.configuration?.temperature}
                  onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Focused</span>
                  <span>{formData.configuration?.temperature}</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Tokens
              </label>
              <input
                type="number"
                value={formData.configuration?.maxTokens}
                onChange={(e) => handleConfigChange('maxTokens', parseInt(e.target.value))}
                className="input-field"
                min="100"
                max="4000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                System Prompt
              </label>
              <textarea
                value={formData.configuration?.systemPrompt}
                onChange={(e) => handleConfigChange('systemPrompt', e.target.value)}
                className="input-field"
                rows={4}
                placeholder="Define the agent's personality and behavior..."
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(1)}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="btn-primary"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review and Create */}
      {step === 3 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Review and Create</h3>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Agent Summary</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-slate-600">Name:</span>
                  <span className="ml-2 text-slate-900">{formData.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-600">Type:</span>
                  <span className="ml-2 text-slate-900 capitalize">{formData.type}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-600">Description:</span>
                  <p className="mt-1 text-slate-900">{formData.description}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-600">Model:</span>
                  <span className="ml-2 text-slate-900">{formData.configuration?.model}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-600">Temperature:</span>
                  <span className="ml-2 text-slate-900">{formData.configuration?.temperature}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(2)}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Create Agent</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 