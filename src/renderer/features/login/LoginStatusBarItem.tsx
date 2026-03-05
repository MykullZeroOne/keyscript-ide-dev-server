import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, LogIn, LogOut, Server } from 'lucide-react';
import LoginDialog from './LoginDialog';

const LoginStatusBarItem: React.FC = () => {
  const { isLoggedIn, username, instance, logout } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2 h-full">
      <div 
        className={`flex items-center space-x-2 px-2 h-full cursor-pointer hover:bg-white/10 transition-colors ${isLoggedIn ? 'text-green-300' : 'text-slate-300'}`}
        onClick={() => !isLoggedIn && setIsDialogOpen(true)}
      >
        {isLoggedIn ? (
          <>
            <User className="w-3 h-3" />
            <span className="font-medium">{username}</span>
            <span className="text-white/50 px-1">|</span>
            <Server className="w-3 h-3" />
            <span>{instance}</span>
          </>
        ) : (
          <>
            <LogIn className="w-3 h-3" />
            <span>Not Logged In</span>
          </>
        )}
      </div>

      {isLoggedIn && (
        <button 
          onClick={logout}
          className="px-2 h-full hover:bg-white/10 transition-colors text-slate-300 flex items-center"
          title="Logout"
        >
          <LogOut className="w-3 h-3" />
        </button>
      )}

      <LoginDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
};

export default LoginStatusBarItem;
