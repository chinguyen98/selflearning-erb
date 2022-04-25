import { ipcMain, app } from 'electron';
import { APP_BRIDGE_CHANNELS } from '../../bridge/app.bridge';

const quitApp = (): void => {
  ipcMain.on(APP_BRIDGE_CHANNELS.QUIT, (): void => {
    app.quit();
  });
};

const appListener = (): void => {
  quitApp();
};

export default appListener;
