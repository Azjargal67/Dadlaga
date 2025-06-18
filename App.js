import React from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import AppNavigation from "./src/navigation/AppNavigation";
import LoadingIndicator from "./src/components/LodingIndicator";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
        <AppNavigation />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
};

export default App;
