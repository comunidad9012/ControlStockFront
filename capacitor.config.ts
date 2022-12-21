import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ControlStock',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: 'http://34.95.208.112:8080/ControlStockBackend-0.0.1-SNAPSHOT/'
    //url: 'http://34.95.208.112:8888/'
  }
};

export default config;
