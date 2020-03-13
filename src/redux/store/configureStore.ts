import prodConfig from "redux/store/configureStore.prod";
import devConfig from "redux/store/configureStore.dev";
import { config } from 'conf/config';

export const configureStore = config.isProd ? prodConfig : devConfig;
