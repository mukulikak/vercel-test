'use client'

import React, { useState } from 'react'
import { Bot, Settings, Play, Pause, Trash2, Edit, Eye, BarChart3 } from 'lucide-react'
import { Agent } from '../types'

interface AgentListProps {
  agents: Agent[]
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>
}

export default function AgentList({ agents, setAgents }: AgentListProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const handleStatusToggle = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' }
        : agent
    ))
  }

  const handleDeleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-slate-100 text-slate-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chatbot':
        return <Bot className="h-5 w-5 text-blue-600" />
      case 'assistant':
        return <Settings className="h-5 w-5 text-green-600" />
      case 'automation':
        return <Play className="h-5 w-5 text-purple-600" />
      case 'analytics':
        return <BarChart3 className="h-5 w-5 text-orange-600" />
      default:
        return <Bot className="h-5 w-5 text-slate-600" />
    }
  }

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <Bot className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Agents Yet</h3>
        <p className="text-slate-600 mb-6">Create your first AI agent to get started</p>
        <button className="btn-primary">
          Create Agent
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">My Agents</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-600">
            {agents.length} agent{agents.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getTypeIcon(agent.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{agent.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3">{agent.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <span>Type: {agent.type}</span>
                    <span>Model: {agent.configuration.model}</span>
                    <span>Requests: {agent.metrics.totalRequests}</span>
                    <span>Created: {new Date(agent.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleStatusToggle(agent.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    agent.status === 'active'
                      ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
                      : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                  title={agent.status === 'active' ? 'Pause Agent' : 'Activate Agent'}
                >
                  {agent.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit Agent"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteAgent(agent.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Agent"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agent Details Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Agent Details</h3>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Basic Information</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Name:</span>
                      <span className="font-medium">{selectedAgent.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="font-medium capitalize">{selectedAgent.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedAgent.status)}`}>
                        {selectedAgent.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Configuration</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Model:</span>
                      <span className="font-medium">{selectedAgent.configuration.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Temperature:</span>
                      <span className="font-medium">{selectedAgent.configuration.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Max Tokens:</span>
                      <span className="font-medium">{selectedAgent.configuration.maxTokens}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Metrics</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Requests:</span>
                      <span className="font-medium">{selectedAgent.metrics.totalRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Success Rate:</span>
                      <span className="font-medium">
                        {selectedAgent.metrics.totalRequests > 0
                          ? `${((selectedAgent.metrics.successfulRequests / selectedAgent.metrics.totalRequests) * 100).toFixed(1)}%`
                          : 'N/A'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Response Time:</span>
                      <span className="font-medium">
                        {selectedAgent.metrics.averageResponseTime > 0
                          ? `${selectedAgent.metrics.averageResponseTime}ms`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle edit functionality
                    setSelectedAgent(null)
                  }}
                  className="btn-primary"
                >
                  Edit Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 