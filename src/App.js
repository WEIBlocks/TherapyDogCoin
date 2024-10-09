import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as walletAdapterReact from "@solana/wallet-adapter-react";
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const QUICKNODE_RPC = "https://api.devnet.solana.com";
function App() {
	const endpoint = QUICKNODE_RPC;
	const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
			],
		},
	]);

	return (
		<walletAdapterReact.ConnectionProvider endpoint={endpoint}>
			<walletAdapterReact.WalletProvider wallets={wallets}>
				<WalletModalProvider>
					<ToastContainer />
					<RouterProvider router={router} />
				</WalletModalProvider>
			</walletAdapterReact.WalletProvider>
		</walletAdapterReact.ConnectionProvider>
	);
}

export default App;
