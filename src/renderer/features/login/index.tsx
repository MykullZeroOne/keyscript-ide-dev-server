import { FeatureDefinition } from '../types';
import LoginStatusBarItem from './LoginStatusBarItem';
import { useAuthStore } from '../../store/useAuthStore';

const LoginFeature: FeatureDefinition = {
  id: 'login',
  name: 'Authentication',
  initialize: async () => {
    try {
      // Check session status on load
      const response = await fetch('/UserLogin?loginStatus=Y');
      const data = await response.json();
      if (data.success) {
        useAuthStore.getState().setLogin(
          data.userName || 'Logged In', 
          data.databaseName || 'Test',
          data.JSESSIONID
        );
      }
    } catch (e) {
      console.warn('Failed to check session status', e);
    }
  },
  statusBarItems: [
    {
      id: 'login-status',
      alignment: 'left',
      component: LoginStatusBarItem
    }
  ]
};

export default LoginFeature;
