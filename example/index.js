/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWithoutClass from './AppWithoutClass';
import App from './A';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
