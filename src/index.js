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

import { polygon, bsc, sepolia } from "wagmi/chains";
const chains = [polygon, bsc, sepolia];
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
		<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
