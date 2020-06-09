import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';

const store = configureStore();
const ReduxApp =()=>(
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
