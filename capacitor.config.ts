import { CapacitorConfig } from '@capacitor/cli';
import { environment } from './src/environments/environment';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ControlStock',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: environment.capasitorUrl
  }
};

export default config;
