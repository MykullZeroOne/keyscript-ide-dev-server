import React, { useState } from 'react'
import { useLoginStore } from './LoginStore'
import { LogIn, Server, User, Lock, AlertCircle } from 'lucide-react'

export const LoginDialog: React.FC = () => {
  const { showLoginDialog, setLoggedIn, instance, setInstance } = useLoginStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!showLoginDialog) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Proxy handles /UserLogin. We need to send XML as per Keystone API.
      // Format from original ide-all.js (inferred):
      // <userLogin><userName>{username}</userName><password>{password}</password></userLogin>
      
      const xml = `<?xml version="1.0" encoding="UTF-8"?><userLogin><userName>${username}</userName><password>${password}</password></userLogin>`
      
      const response = await fetch('/UserLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
        },
        body: xml
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseText = await response.text()
      // Keystone usually returns XML or JSON depending on Accept header, but /UserLogin seems to return JSON in the proxy logic if JSESSIONID is present
      // Let's try to parse as JSON first
      try {
        const data = JSON.parse(responseText)
        if (data.JSESSIONID || data.success) {
          setLoggedIn(true, username)
        } else {
          setError('Login failed. Please check your credentials.')
        }
      } catch (e) {
        // If it's XML, we should check for success attribute
        if (responseText.includes('success="true"') || responseText.includes('<JSESSIONID>')) {
          setLoggedIn(true, username)
        } else {
          setError('Login failed. Please check your credentials.')
        }
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700 flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
            <LogIn size={20} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Connect to Keystone</h2>
        </div>
        
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 p-3 rounded-lg flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Instance</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <Server size={18} />
              </div>
              <select
                value={instance}
                onChange={(e) => setInstance(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 transition-all appearance-none"
              >
                <option value="Test">Test</option>
                <option value="Dev">Dev</option>
                <option value="Prod">Prod</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="block w-full pl-10 pr-3 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} />
                <span>Connect</span>
              </>
            )}
          </button>
        </form>
        
        <div className="bg-gray-950/50 px-6 py-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-600">
            Secure connection via Keystone Proxy
          </p>
        </div>
      </div>
    </div>
  )
}
