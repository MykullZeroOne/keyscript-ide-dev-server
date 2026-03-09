import { useState, useEffect } from 'react'
import { User, CreditCard, Search, Server, ChevronRight, X } from 'lucide-react'
import { useScriptOptionsStore } from './ScriptOptionsStore'
import { useAuthStore } from '../../store/useAuthStore'
import { searchPerson, searchAccount, PERSON_FILTERS, ACCOUNT_FILTERS } from '../../utils/keystoneSearch'

interface SearchResult {
  serial: string
  name: string
  detail: string
}

const PersonSearchField: React.FC = () => {
  const { personSerial, setPersonSerial } = useScriptOptionsStore()
  const [filter, setFilter] = useState('AUTO')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async (searchQuery?: string): Promise<void> => {
    const q = searchQuery ?? personSerial
    if (!q.trim()) return
    setSearching(true)
    setShowResults(true)
    try {
      const data = await searchPerson(q, filter)
      setResults(
        data.results.map((r) => ({
          serial: r.serial,
          name: r.rowDescription || `Person ${r.serial}`,
          detail: r.serial
        }))
      )
      // If exactly one result, auto-select it
      if (data.results.length === 1) {
        setPersonSerial(data.results[0].serial)
        setShowResults(false)
      }
    } catch {
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const selectResult = (r: SearchResult): void => {
    setPersonSerial(r.serial)
    setShowResults(false)
  }

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-[#858585] flex items-center gap-1.5">
        <User size={10} /> Person Serial
      </label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-[#007acc] mb-1"
      >
        {PERSON_FILTERS.map((f) => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
      <div className="flex gap-1">
        <input
          type="text"
          value={personSerial}
          onChange={(e) => setPersonSerial(e.target.value)}
          placeholder="Serial or search..."
          className="flex-1 bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1.5 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />
        <button
          onClick={() => handleSearch()}
          className="px-2 bg-[#383838] hover:bg-[#2d2d2d] rounded text-[#cccccc] hover:text-white transition-colors"
          title="Search Person"
        >
          <Search size={12} />
        </button>
      </div>

      {showResults && (
        <div className="bg-[#1e1e1e] border border-[#414141] rounded max-h-40 overflow-y-auto">
          {searching ? (
            <div className="p-2 text-[10px] text-[#858585] text-center">Searching...</div>
          ) : results.length > 0 ? (
            results.map((r) => (
              <button
                key={r.serial}
                onClick={() => selectResult(r)}
                className="w-full text-left px-2 py-1.5 hover:bg-[#383838] flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs text-[#e0e0e0]">{r.name}</div>
                  <div className="text-[10px] text-[#858585] font-mono">{r.detail}</div>
                </div>
                <ChevronRight size={10} className="text-[#555555] group-hover:text-[#569cd6]" />
              </button>
            ))
          ) : (
            <div className="p-2 text-[10px] text-[#6e6e6e] text-center italic">No results</div>
          )}
          <button
            onClick={() => setShowResults(false)}
            className="w-full text-center py-1 text-[10px] text-[#6e6e6e] hover:text-[#cccccc] border-t border-[#414141]"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

const AccountSearchField: React.FC = () => {
  const { accountSerial, setAccountSerial } = useScriptOptionsStore()
  const [filter, setFilter] = useState('BY_ACCOUNT_NUMBER')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async (searchQuery?: string): Promise<void> => {
    const q = searchQuery ?? accountSerial
    if (!q.trim()) return
    setSearching(true)
    setShowResults(true)
    try {
      const data = await searchAccount(q, filter)
      setResults(
        data.results.map((r) => ({
          serial: r.serial,
          name: r.rowDescription || `Account ${r.serial}`,
          detail: r.serial
        }))
      )
      // If exactly one result, auto-select it
      if (data.results.length === 1) {
        setAccountSerial(data.results[0].serial)
        setShowResults(false)
      }
    } catch {
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const selectResult = (r: SearchResult): void => {
    setAccountSerial(r.serial)
    setShowResults(false)
  }

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-[#858585] flex items-center gap-1.5">
        <CreditCard size={10} /> Account Serial
      </label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-[#007acc] mb-1"
      >
        {ACCOUNT_FILTERS.map((f) => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
      <div className="flex gap-1">
        <input
          type="text"
          value={accountSerial}
          onChange={(e) => setAccountSerial(e.target.value)}
          placeholder="Serial or search..."
          className="flex-1 bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1.5 text-xs text-white placeholder-[#6e6e6e] focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />
        <button
          onClick={() => handleSearch()}
          className="px-2 bg-[#383838] hover:bg-[#2d2d2d] rounded text-[#cccccc] hover:text-white transition-colors"
          title="Search Account"
        >
          <Search size={12} />
        </button>
      </div>

      {showResults && (
        <div className="bg-[#1e1e1e] border border-[#414141] rounded max-h-40 overflow-y-auto">
          {searching ? (
            <div className="p-2 text-[10px] text-[#858585] text-center">Searching...</div>
          ) : results.length > 0 ? (
            results.map((r) => (
              <button
                key={r.serial}
                onClick={() => selectResult(r)}
                className="w-full text-left px-2 py-1.5 hover:bg-[#383838] flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs text-[#e0e0e0]">{r.name}</div>
                  <div className="text-[10px] text-[#858585] font-mono">{r.detail}</div>
                </div>
                <ChevronRight size={10} className="text-[#555555] group-hover:text-[#569cd6]" />
              </button>
            ))
          ) : (
            <div className="p-2 text-[10px] text-[#6e6e6e] text-center italic">No results</div>
          )}
          <button
            onClick={() => setShowResults(false)}
            className="w-full text-center py-1 text-[10px] text-[#6e6e6e] hover:text-[#cccccc] border-t border-[#414141]"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export const ScriptOptionsPanel: React.FC = () => {
  const { instance, setInstance, personSerial, accountSerial } = useScriptOptionsStore()
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const authInstance = useAuthStore((s) => s.instance)
  const [supportedInstances, setSupportedInstances] = useState<string[]>([])

  useEffect(() => {
    window.api?.getConfig().then((config) => {
      setSupportedInstances(config.supportedInstances)
      if (!instance && config.supportedInstances.length > 0) {
        setInstance(config.supportedInstances[0])
      }
    }).catch(() => {
      setSupportedInstances(['Test'])
    })
  }, [])

  const clearAll = (): void => {
    useScriptOptionsStore.getState().setPersonSerial('')
    useScriptOptionsStore.getState().setAccountSerial('')
  }

  const hasParams = personSerial || accountSerial

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      <div className="p-4 space-y-4">
        {/* Instance Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#858585] flex items-center gap-1.5">
            <Server size={10} /> Instance
          </label>
          <select
            value={instance}
            onChange={(e) => setInstance(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#414141] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007acc]/50"
          >
            {supportedInstances.map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>
          {isLoggedIn && authInstance && authInstance !== instance && (
            <div className="text-[10px] text-amber-400/80 flex items-center gap-1">
              Logged into {authInstance}, running in {instance}
            </div>
          )}
        </div>

        {/* Person Serial */}
        <PersonSearchField />

        {/* Account Serial */}
        <AccountSearchField />

        {/* Clear Button */}
        {hasParams && (
          <button
            onClick={clearAll}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#858585] hover:text-[#cccccc] bg-[#1e1e1e] hover:bg-[#383838] border border-[#414141] rounded transition-colors"
          >
            <X size={10} />
            Clear Parameters
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="mt-auto p-4 border-t border-[#414141]/50">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e6e] mb-2">
          Script Parameters
        </div>
        <div className="space-y-1 text-[10px] font-mono">
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">instance</span>
            <span className="text-[#cccccc]">{instance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">personSerial</span>
            <span className={personSerial ? 'text-[#569cd6]' : 'text-[#555555]'}>
              {personSerial || '(none)'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6e6e6e]">accountSerial</span>
            <span className={accountSerial ? 'text-[#569cd6]' : 'text-[#555555]'}>
              {accountSerial || '(none)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
