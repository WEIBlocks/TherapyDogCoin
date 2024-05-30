import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TherapyContextProvider } from "./context/therapyContext";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { polygon, bsc } from "wagmi/chains";
const chains = [polygon, bsc];
const projectId = "90bf105ef4aa4e1e16a2d0284385ed7a";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <TherapyContextProvider>
        <App />
      </TherapyContextProvider>
    </WagmiConfig>
    <Web3Modal
      projectId={projectId}
      ethereumClient={ethereumClient}
      explorerRecommendedWalletIds={[
        "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
        "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
        "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4",
        "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
        "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
        "e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4",
        "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",
        "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
      ]}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
