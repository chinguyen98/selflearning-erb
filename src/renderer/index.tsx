import { createRoot } from 'react-dom/client';
import App from './App';
import { APP_BRIDGE_API_KEY, IAppBridge } from '../bridge/app.bridge';
import { PHOTO_BRIDGE_API_KEY, IPhotoBridge } from '../bridge/photo.bridge';

declare global {
  interface Window {
    [APP_BRIDGE_API_KEY]: IAppBridge;
    [PHOTO_BRIDGE_API_KEY]: IPhotoBridge;
  }
}

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
