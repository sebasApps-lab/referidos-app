import "react-native-gesture-handler";
import "./src/shared/polyfills/urlHermesPatch";
import { AppRegistry } from "react-native";
import App from "./src/app/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
