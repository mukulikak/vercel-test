'use client'

import React, { useState } from 'react'
import { Bot, Plus, Settings, BarChart3, Code, Zap, Users, Shield } from 'lucide-react'
import AgentCreator from './components/AgentCreator'
import AgentList from './components/AgentList'
import AgentDashboard from './components/AgentDashboard'
import { Agent } from './types'

export default function Home() {
  const [activeView, setActiveView] = useState<'dashboard' | 'create' | 'list'>('dashboard')
  const [agents, setAgents] = useState<Agent[]>([])

  const handleAgentCreated = (agent: Agent) => {
    setAgents([...agents, agent])
    setActiveView('dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Agent Creator Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Agent</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Create Agent
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              My Agents
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Build Intelligent AI Agents
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Create, deploy, and manage AI agents with our developer-friendly platform. 
                From chatbots to automation workflows, build the future of AI applications.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card">
                <Code className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Development</h3>
                <p className="text-slate-600">Simple API and intuitive interface for rapid agent development.</p>
              </div>
              <div className="card">
                <Zap className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Powerful Tools</h3>
                <p className="text-slate-600">Access to web search, file processing, and custom integrations.</p>
              </div>
              <div className="card">
                <BarChart3 className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Analytics</h3>
                <p className="text-slate-600">Monitor performance and usage with detailed metrics and insights.</p>
              </div>
              <div className="card">
                <Shield className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure</h3>
                <p className="text-slate-600">Enterprise-grade security with encrypted API keys and data protection.</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Agents</p>
                    <p className="text-2xl font-bold text-slate-900">{agents.length}</p>
                  </div>
                  <Bot className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Agents</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {agents.filter(a => a.status === 'active').length}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Requests</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {agents.reduce((sum, agent) => sum + agent.metrics.totalRequests, 0)}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Recent Agents */}
            {agents.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Agents</h3>
                <div className="space-y-3">
                  {agents.slice(0, 3).map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900">{agent.name}</h4>
                        <p className="text-sm text-slate-600">{agent.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        agent.status === 'active' ? 'bg-green-100 text-green-800' :
                        agent.status === 'inactive' ? 'bg-slate-100 text-slate-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'create' && (
          <AgentCreator onAgentCreated={handleAgentCreated} />
        )}

        {activeView === 'list' && (
          <AgentList agents={agents} setAgents={setAgents} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-6 w-6 text-blue-400" />
                <span className="font-semibold">Agent Creator</span>
              </div>
              <p className="text-slate-400">Build the future of AI applications with our developer platform.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Agent Creator Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 