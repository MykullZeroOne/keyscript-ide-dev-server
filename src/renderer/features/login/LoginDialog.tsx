import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { LogIn, Server, User, Lock, AlertCircle } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instance, setInstance] = useState('Test');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setLogin = useAuthStore(state => state.setLogin);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Get Device Information
      // In the real app, this might be on a different port, but the proxy mocks it.
      // We'll try to fetch it from the proxy's service port.
      const servicePort = 3001; // Should probably be dynamic
      let deviceIdentifier = '';
      try {
        const deviceRes = await fetch(`http://localhost:${servicePort}/GetDeviceInformation`);
        const deviceXml = await deviceRes.text();
        const match = deviceXml.match(/<identifier>(.*?)<\/identifier>/);
        if (match) deviceIdentifier = match[1];
      } catch (e) {
        console.warn('Failed to get device information', e);
      }

      // 2. Perform Login
      // The proxy expects the instance in the URL or it uses the last one seen.
      // We should probably hit /{instance}/UserLogin
      const response = await fetch(`/${instance}/UserLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          loginUsername: username,
          loginPassword: password,
          loginDeviceIdentifier: deviceIdentifier,
          loginDeviceInsertOption: 'N'
        })
      });

      const data = await response.json();

      if (data.success) {
        setLogin(username, instance, data.JSESSIONID);
        onClose();
      } else {
        setError(data.exception?.join(' ') || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-lg">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Keystone Login</h2>
              <p className="text-slate-400 text-sm">Enter your credentials to connect</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Instance</label>
              <div className="relative">
                <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  value={instance}
                  onChange={(e) => setInstance(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="Test">Test</option>
                  <option value="Prod">Prod</option>
                  <option value="Dev">Dev</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start space-x-2 p-3 bg-red-900/30 border border-red-500/50 rounded-md text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-600 rounded-md text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-slate-400 rounded-md text-white font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Login</span>
                    <LogIn className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
