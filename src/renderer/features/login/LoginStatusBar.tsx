import React from 'react'
import { useLoginStore } from './LoginStore'
import { Globe, User, LogIn } from 'lucide-react'

export const LoginStatusBar: React.FC = () => {
  const { isLoggedIn, username, instance, setShowLoginDialog } = useLoginStore()

  if (!isLoggedIn) {
    return (
      <button 
        onClick={() => setShowLoginDialog(true)}
        className="flex items-center gap-2 px-3 py-1 bg-red-900/40 text-red-300 hover:bg-red-800/50 transition-colors cursor-pointer border-r border-gray-800"
      >
        <LogIn size={14} />
        <span className="text-xs font-bold uppercase tracking-tighter">Not Connected</span>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3 px-3 py-1 text-xs text-gray-400 border-r border-gray-800">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-900/50" />
        <div className="flex items-center gap-1 font-mono uppercase tracking-widest text-[10px] text-gray-500">
          <Globe size={12} />
          <span>{instance}</span>
        </div>
      </div>
      <div className="w-px h-3 bg-gray-800 mx-1" />
      <div className="flex items-center gap-1.5 font-medium text-gray-300">
        <User size={12} className="text-gray-500" />
        <span>{username}</span>
      </div>
    </div>
  )
}
