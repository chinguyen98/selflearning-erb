import { contextBridge, ipcRenderer } from 'electron';
import {
  APP_BRIDGE_API_KEY,
  APP_BRIDGE_CHANNELS,
  IAppBridge,
} from '../../bridge/app.bridge';

const quitApp = () => {
  ipcRenderer.send(APP_BRIDGE_CHANNELS.QUIT);
};

const appRenderer: IAppBridge = {
  quitApp,
};

contextBridge.exposeInMainWorld(APP_BRIDGE_API_KEY, {
  ...appRenderer,
});
