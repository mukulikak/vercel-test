'use client'

import React from 'react'
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react'
import { Agent } from '../types'

interface AgentDashboardProps {
  agents: Agent[]
}

export default function AgentDashboard({ agents }: AgentDashboardProps) {
  const totalRequests = agents.reduce((sum, agent) => sum + agent.metrics.totalRequests, 0)
  const activeAgents = agents.filter(agent => agent.status === 'active').length
  const averageResponseTime = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.metrics.averageResponseTime, 0) / agents.length
    : 0

  const recentAgents = agents
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Agents</p>
              <p className="text-2xl font-bold text-slate-900">{agents.length}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Agents</p>
              <p className="text-2xl font-bold text-slate-900">{activeAgents}</p>
            </div>
            <Zap className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Requests</p>
              <p className="text-2xl font-bold text-slate-900">{totalRequests.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-slate-900">
                {averageResponseTime > 0 ? `${averageResponseTime.toFixed(0)}ms` : 'N/A'}
              </p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Agents</h3>
        {recentAgents.length > 0 ? (
          <div className="space-y-3">
            {recentAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">{agent.name}</h4>
                    <p className="text-sm text-slate-600">Created {new Date(agent.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  agent.status === 'active' ? 'bg-green-100 text-green-800' :
                  agent.status === 'inactive' ? 'bg-slate-100 text-slate-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-600">No agents created yet</p>
          </div>
        )}
      </div>

      {/* Agent Types Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Agent Types</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['chatbot', 'assistant', 'automation', 'analytics'].map((type) => {
            const count = agents.filter(agent => agent.type === type).length
            const percentage = agents.length > 0 ? (count / agents.length) * 100 : 0
            
            return (
              <div key={type} className="text-center">
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-sm text-slate-600 capitalize">{type}</div>
                <div className="text-xs text-slate-500">{percentage.toFixed(1)}%</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 