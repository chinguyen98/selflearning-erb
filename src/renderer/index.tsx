import { createRoot } from 'react-dom/client';
import App from './App';
import { APP_BRIDGE_API_KEY, IAppBridge } from '../bridge/app.bridge';

declare global {
  interface Window {
    [APP_BRIDGE_API_KEY]: IAppBridge;
  }
}

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
