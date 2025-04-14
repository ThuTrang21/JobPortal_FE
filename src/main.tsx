import { createRoot } from "react-dom/client";
import "./index.css";
import "simplebar-react/dist/simplebar.min.css";
import "rc-picker/assets/index.css";
import { Provider } from "react-redux";
import App from "./pages/index.tsx";
import store, { persistor } from "./store/configureStore.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer />
      <App />
    </PersistGate>
  </Provider>
);
