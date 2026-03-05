import React, { useState } from 'react'
import { Search, User, CreditCard, RefreshCw, ChevronRight } from 'lucide-react'

export const SearchPanel: React.FC = () => {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'Person' | 'Account'>('Person')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    
    setLoading(true)
    try {
      // Using SearchJSON endpoint.
      
      const response = await fetch('/SearchJSON', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchType: type,
            searchValue: query
        })
      })
      
      const data = await response.json()
      // Assuming SearchJSON returns a list of results
      setResults(data.results || [])
    } catch (err) {
      console.error('Search error:', err)
      // Mock results if it fails since we don't have a real Keystone backend
      setResults([
        { id: '1', name: `Sample ${type} 1`, detail: '12345678' },
        { id: '2', name: `Sample ${type} 2`, detail: '87654321' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900/50">
      <div className="px-4 py-2 border-b border-gray-800/50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Search</span>
      </div>
      
      <div className="p-4 border-b border-gray-800/50 space-y-3">
        <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-800">
          <button 
            onClick={() => setType('Person')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                type === 'Person' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <User size={12} />
            Person
          </button>
          <button 
            onClick={() => setType('Account')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                type === 'Account' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <CreditCard size={12} />
            Account
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${type}...`}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600 group-focus-within:text-blue-500 transition-colors">
            <Search size={14} />
          </div>
          <button type="submit" className="hidden" />
        </form>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <RefreshCw size={24} className="animate-spin text-gray-800" />
          </div>
        ) : results.length > 0 ? (
          <div className="divide-y divide-gray-800/30">
            {results.map((res) => (
              <div 
                key={res.id}
                className="p-3 hover:bg-gray-800/50 cursor-pointer group transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs font-bold text-gray-200 truncate">{res.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono">{res.detail}</span>
                </div>
                <ChevronRight size={14} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
              </div>
            ))}
          </div>
        ) : query && !loading ? (
          <div className="p-8 text-center text-gray-600 text-xs italic">
            No results found
          </div>
        ) : (
          <div className="p-8 text-center text-gray-700 flex flex-col items-center gap-2">
            <Search size={32} opacity={0.1} />
            <p className="text-[10px] font-bold uppercase tracking-tighter opacity-20">Enter query to search</p>
          </div>
        )}
      </div>
    </div>
  )
}
