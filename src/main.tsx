import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Redux
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// GraphQL
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Styles
import "./index.css";

const client = new ApolloClient({
  uri: "https://deafening-egg-production.up.railway.app",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
