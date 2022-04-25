export const APP_BRIDGE_API_KEY = 'apiApp';

export const APP_BRIDGE_CHANNELS = {
  QUIT: 'app:quit',
};

export interface IAppBridge {
  quitApp: () => void;
}
