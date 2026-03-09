import React, { useState } from 'react'
import { Search, User, CreditCard, RefreshCw, ChevronRight, Filter } from 'lucide-react'
import { searchPerson, searchAccount, PERSON_FILTERS, ACCOUNT_FILTERS } from '../../utils/keystoneSearch'

export const SearchPanel: React.FC = () => {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'Person' | 'Account'>('Person')
  const [personFilter, setPersonFilter] = useState('AUTO')
  const [accountFilter, setAccountFilter] = useState('BY_ACCOUNT_NUMBER')
  const [results, setResults] = useState<{ id: string; name: string; detail: string }[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    setLoading(true)
    try {
      const data = type === 'Person'
        ? await searchPerson(query, personFilter)
        : await searchAccount(query, accountFilter)

      setResults(data.results.map((r) => ({
        id: r.serial,
        name: r.rowDescription || `${type} ${r.serial}`,
        detail: r.serial
      })))
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const filters = type === 'Person' ? PERSON_FILTERS : ACCOUNT_FILTERS
  const currentFilter = type === 'Person' ? personFilter : accountFilter
  const setCurrentFilter = type === 'Person' ? setPersonFilter : setAccountFilter

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      <div className="px-4 py-2 border-b border-[#414141]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#858585]">Search</span>
      </div>

      <div className="p-4 border-b border-[#414141] space-y-3">
        <div className="flex bg-[#1e1e1e] p-1 rounded-lg border border-[#414141]">
          <button
            onClick={() => setType('Person')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                type === 'Person' ? 'bg-[#383838] text-[#569cd6]' : 'text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <User size={12} />
            Person
          </button>
          <button
            onClick={() => setType('Account')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                type === 'Account' ? 'bg-[#383838] text-[#569cd6]' : 'text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <CreditCard size={12} />
            Account
          </button>
        </div>

        {/* Filter selector */}
        <div className="flex items-center gap-2">
          <Filter size={12} className="text-[#6e6e6e] shrink-0" />
          <select
            value={currentFilter}
            onChange={(e) => setCurrentFilter(e.target.value)}
            className="flex-1 bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#007acc]"
          >
            {filters.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${type}...`}
            className="w-full bg-[#1e1e1e] border border-[#414141] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6e6e6e] group-focus-within:text-blue-500 transition-colors">
            <Search size={14} />
          </div>
          <button type="submit" className="hidden" />
        </form>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <RefreshCw size={24} className="animate-spin text-[#555555]" />
          </div>
        ) : results.length > 0 ? (
          <div className="divide-y divide-[#414141]">
            {results.map((res) => (
              <div
                key={res.id}
                className="p-3 hover:bg-[#2d2d2d] cursor-pointer group transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs font-bold text-[#e0e0e0] truncate">{res.name}</span>
                  <span className="text-[10px] text-[#858585] font-mono">{res.detail}</span>
                </div>
                <ChevronRight size={14} className="text-[#555555] group-hover:text-[#007acc] transition-colors" />
              </div>
            ))}
          </div>
        ) : query && !loading ? (
          <div className="p-8 text-center text-[#6e6e6e] text-xs italic">
            No results found
          </div>
        ) : (
          <div className="p-8 text-center text-[#555555] flex flex-col items-center gap-2">
            <Search size={32} opacity={0.1} />
            <p className="text-[10px] font-bold uppercase tracking-tighter opacity-20">Enter query to search</p>
          </div>
        )}
      </div>
    </div>
  )
}
