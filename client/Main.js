
import { registerRootComponent } from 'expo';
import { Store } from "./store";
import { Provider } from "react-redux";
import App from './App 2.js';

function Main() {
  return (
    <Provider store={Store}>
      <App />
    </Provider>    
  );
}

registerRootComponent(Main);