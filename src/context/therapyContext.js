import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  presaleContractPoly,
  // presaleContractBsc,
  erc20ABI,
  presaleABI,
  usdtContractPoly,
  // usdtContractBsc,
} from "./contant";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

export const therapyContext = createContext();

export const TherapyContextProvider = ({ children }) => {
  const { open } = useWeb3Modal();
  const { address } = useWeb3ModalAccount();
  const [currentAccount, setCurrentAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [stage, setStage] = useState(0);
  const [tokeninstage, setTokenInstage] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [price, setPrice] = useState(0);
  const [nextPrice, setNextPrice] = useState(0);
  const maticChainAddress = 11155111;
  // const bscChainAddress = 5;
  const [chainId, setChainId] = useState(maticChainAddress);

  // useEffect(() => {
  // 	if (window.ethereum) {
  // 		window.ethereum.on("accountsChanged", (accounts) => {
  // 			window.location.reload();
  // 		});
  // 		window.ethereum.on("chainChanged", (chainId) => {
  // 			window.location.reload();
  // 		});
  // 	}
  // }, [window.ethereum]);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  }, []);

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0].toLowerCase());
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.log("Something wrong while connecting to wallet");
      console.log(error);
    }
  };

  const fetchContract = async (signerOrProvider, chainId) => {
    if (chainId === maticChainAddress) {
      return new ethers.Contract(
        presaleContractPoly,
        presaleABI,
        signerOrProvider
      );
    }
    // else if (chainId === bscChainAddress) {
    //   const contract = new ethers.Contract(
    //     presaleContractBsc,
    //     presaleABI,
    //     signerOrProvider
    //   );

    //   return contract;
    // }
  };

  const connectingWithSmartContract = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer, chainId);
      return [signer, contract];
    } catch (error) {
      console.log("Something went wrong while connecting with contract", error);
      throw error;
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    getChainId();
  }, []);

  useEffect(() => {
    if (chainId === maticChainAddress) {
      tokensBought(currentAccount);
      currentStage();
    }
    // else if (chainId === bscChainAddress) {
    //   tokensBought(currentAccount);
    //   currentStage();
    // }
  }, [chainId]);

  console.log("stage", stage);

  console.log("tokenInStages", tokeninstage);

  useEffect(() => {
    tokensInStages();
    tokensSoldPerStage();
    priceInStage();
    priceNextStage();
  }, [stage]);

  useEffect(() => {
    tokensSoldPerStage();
  }, [tokenBalance]);

  const getChainId = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      setChainId(chainId);
    } catch (error) {
      console.log("Something went wrong while getting chainId", error);
      throw error;
    }
  };

  const connectWallet = async () => {
    console.log(window.ethereum);
    try {
      // if (!window.ethereum) console.log("Install MetaMask");
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      open();
      setCurrentAccount(address.toLowerCase());
      tokensBought(address.toLowerCase());
    } catch (error) {
      console.log("Error while connecting to wallet");
      console.log(error);
    }
  };

  const tokensBought = async (account) => {
    try {
      if (account === undefined) return;
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      const tokenBalance = await contract.tokensBought(account);
      setTokenBalance(tokenBalance.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const currentStage = async () => {
    try {
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      if (contract === undefined) return;
      const stage = await contract.stage();
      setStage(Number(stage));
    } catch (error) {
      console.log(error);
    }
  };

  const tokensInStages = async () => {
    try {
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      if (contract === undefined) return;
      const tokenInStage = await contract.tokensInStages(Number(stage));
      setTokenInstage(tokenInStage.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const tokensSoldPerStage = async () => {
    try {
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      if (contract === undefined) return;
      const tokenSoldPerStage = await contract.tokensSoldPerStage(
        Number(stage)
      );
      setTokenSold(tokenSoldPerStage.toString());
    } catch (error) {
      console.log(error);
    }
  };
  //current price of token
  const priceInStage = async () => {
    try {
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      if (contract === undefined) return;
      const pricePerStage = await contract.pricePerStage(Number(stage));
      setPrice(Number(ethers.formatEther(pricePerStage.toString())));
    } catch (error) {
      console.log(error);
    }
  };
  //next price of token
  const priceNextStage = async () => {
    try {
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      if (contract === undefined) return;
      if (Number(stage) + 1 < 4) {
        const pricePerStage = await contract.pricePerStage(Number(stage) + 1);
        console.log(pricePerStage.toString());
        setNextPrice(Number(ethers.formatEther(pricePerStage.toString())));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NativeToTokenHelper = async (amount) => {
    try {
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      const tokens = await contract.NativeToTokenHelper(
        ethers.parseEther(amount)
      );
      return tokens;
    } catch (error) {
      console.log(error);
    }
  };

  const buyTokenWithNative = async (native, amount) => {
    try {
      console.log(native, amount);
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      const tx = await contract.buyTokenWithNative(amount, {
        value: ethers.parseEther(native),
      });
      await tx.wait();
      tokensBought(currentAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const buyTokenWithToken = async (token, amount) => {
    try {
      const signerAndContract = await connectingWithSmartContract();
      const contract = signerAndContract[1];
      const signer = signerAndContract[0];

      if (chainId === maticChainAddress) {
        const tokenContract = new ethers.Contract(
          usdtContractPoly,
          erc20ABI,
          signer
        );

        const tokenInWei = Number(token) * 10 ** 6;
        const approve = await tokenContract.approve(
          presaleContractPoly,
          tokenInWei
        );
        await approve.wait();
      }
      // else if (chainId === bscChainAddress) {
      //   const tokenContract = new ethers.Contract(
      //     usdtContractBsc,
      //     erc20ABI,
      //     signer
      //   );

      //   const tokenInWei = Number(token) * 10 ** 6;
      //   const approve = await tokenContract.approve(
      //     presaleContractBsc,
      //     tokenInWei
      //   );
      //   await approve.wait();
      // }
      const tx = await contract.buyTokenWithToken(amount);
      await tx.wait();
      tokensBought(currentAccount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <therapyContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        currentAccount,
        tokenBalance,
        tokensBought,
        chainId,
        stage,
        price,
        nextPrice,
        tokeninstage,
        tokenSold,
        NativeToTokenHelper,
        buyTokenWithNative,
        buyTokenWithToken,
        buyTokenWithToken,
      }}
    >
      {children}
    </therapyContext.Provider>
  );
};
