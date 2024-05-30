import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ethers } from "ethers";
// import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// const projectId = '0b23065559254ced9aca22e0aa943d4c'
// // 2. Set chains
// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com'
// }

// const metadata = {
//   name: 'My Website',
//   description: 'My Website description',
//   url: 'https://mywebsite.com', // origin must match your domain & subdomain
//   icons: ['https://avatars.mywebsite.com/']
// }

// const ethersConfig = defaultConfig({
//   /*Required*/
//   metadata,

//   /*Optional*/
//   enableEIP6963: true, // true by default
//   enableInjected: true, // true by default
//   enableCoinbase: true, // true by default
//   rpcUrl: '...', // used for the Coinbase SDK
//   defaultChainId: 1 // used for the Coinbase SDK
// })

// createWeb3Modal({
//   ethersConfig,
//   chains: [mainnet],
//   projectId,
//   enableAnalytics: true // Optional - defaults to your Cloud configuration
// })
function App() {
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
    <>
      <ToastContainer />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
