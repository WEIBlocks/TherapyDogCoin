import React, { useState, useEffect, createContext } from "react";

import { BigNumber, ethers } from "ethers";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount ,useNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { toast } from "react-toastify";
import {
	presaleContractPoly,
	presaleContractBsc,
	erc20ABI,
	presaleABI,
	usdtContractPoly,
	usdtContractBsc,
	polyRPC,
	bscRPC,
} from "./constant.js";

export const therapyContext = createContext();

export const TherapyContextProvider = ({ children }) => {
	const { open } = useWeb3Modal();
	const [contract ,setContract] = useState(null);
	const { address, isConnected } = useAccount();
	const { chain } = useNetwork();
	const [newPrice ,setNewPrice] = useState(0);
	const [currentAccount, setCurrentAccount] = useState("");
	const [tokenBalance, setTokenBalance] = useState(0);
	const [stage, setStage] = useState(0);
	const [tokeninstage, setTokenInstage] = useState(0);
	const [tokenSold, setTokenSold] = useState(0);
	const [price, setPrice] = useState(0);
	const [nextPrice, setNextPrice] = useState(0);
	// const [chainId, setChainId] = useState(56);
	const maticChainAddress = 11155111;
	const bscChainAddress = 56;
	const errorInApproval = () => toast.error("Error while Approving");
	const errorInTransaction = () => toast.error("Error while Transaction");
	const transactionCompleted = () => toast.success("Transaction Completed");
	
	const errorWhileNetworkSwitching = () =>
		toast.error("Error while switching network");
	const chainId = chain?.id;
	useEffect(() => {
		if (!isConnected) {
			setCurrentAccount("");
		}
	}, [isConnected]);
	const switchNetworkFrontend = async () => {
		if (
			chain?.id !== maticChainAddress &&
			chain?.id !== bscChainAddress &&
			isConnected
		) {
			try {
				console.log("isConnected:", isConnected);
				const network = await switchNetwork({ chainId: maticChainAddress });
				window.location.reload();
			} catch (error) {
				errorWhileNetworkSwitching();
			}
		}
	};

	useEffect(() => {
		switchNetworkFrontend();
	}, [chain]);

	const checkIfWalletConnected = async () => {
		try {
			if (isConnected) {
				setCurrentAccount(address.toLowerCase());
			} else {
				setCurrentAccount("");
			}
		} catch (error) {
			console.log("Something wrong while connecting to wallet");
		}
	};

	const fetchContract = async (signerOrProvider, chainId) => {
		console.log("chainId", chainId);
		console.log("signerOrProvider", signerOrProvider);
		console.log("presaleContractPoly",presaleContractPoly);
		if (chainId === maticChainAddress) {
			console.log(chainId, "maticChainAddress");
			return new ethers.Contract(
				presaleContractPoly,
				presaleABI,
				signerOrProvider
			);
		} else if (chainId === bscChainAddress) {
			return new ethers.Contract(
				presaleContractBsc,
				presaleABI,
				signerOrProvider
			);
		}
	};

	const connectingWithSmartContract = async () => {
		try {
			if (!window.ethereum) return;
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = await fetchContract(signer, chain?.id);
			setContract(contract);
			return [signer, contract];
		} catch (error) {
			console.log("Something went wrong while connecting with contract", error);
			throw error;
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, []);
	useEffect(() => {
		if (address !== undefined) {
			setCurrentAccount(address);
		}
	}, [address]);

	useEffect(() => {
		if (chain?.id === maticChainAddress) {
			tokensBought(currentAccount);
		} else if (chain?.id === bscChainAddress) {
			tokensBought(currentAccount);
		}
	}, [address, chain, currentAccount, bscChainAddress, maticChainAddress]);

	useEffect(() => {
		currentStage();
	}, [chain, currentAccount, address]);
	console.log("contract", contract);

	useEffect(() => {
		tokensInStages();
		tokensSoldPerStage();
		priceInStage();
		priceNextStage();
	}, [stage, address]);

	useEffect(() => {
		tokensSoldPerStage();
	}, [tokenBalance]);

	const connectWallet = async () => {
		try {
			await open();
		} catch (error) {
			console.log("Error while connecting to wallet");
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
			let contract;
			if (chain?.id === maticChainAddress) {
				const provider = new ethers.providers.JsonRpcProvider(polyRPC);
				contract = new ethers.Contract(
					presaleContractPoly,
					presaleABI,
					provider
				);
			} else if (chain?.id === bscChainAddress) {
				const provider = new ethers.providers.JsonRpcProvider(bscRPC);
				contract = new ethers.Contract(
					presaleContractBsc,
					presaleABI,
					provider
				);
			} else {
				const provider = new ethers.providers.JsonRpcProvider(polyRPC);
				contract = new ethers.Contract(
					presaleContractPoly,
					presaleABI,
					provider
				);
			}
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
	const priceInStage = async () => {
		try {
			let contract;
			if (chain?.id === maticChainAddress) {
				const provider = new ethers.providers.JsonRpcProvider(polyRPC);
				contract = new ethers.Contract(
					presaleContractPoly,
					presaleABI,
					provider
				);
			} else if (chain?.id === bscChainAddress) {
				const provider = new ethers.providers.JsonRpcProvider(bscRPC);
				contract = new ethers.Contract(
					presaleContractBsc,
					presaleABI,
					provider
				);
			} else {
				const provider = new ethers.providers.JsonRpcProvider(polyRPC);
				contract = new ethers.Contract(
					presaleContractPoly,
					presaleABI,
					provider
				);
			}
			if (contract === undefined) return;
			const pricePerStage = await contract.pricePerStage(Number(stage));
			// console.log("pricePerStage", pricePerStage.toString()	);
			setNewPrice()
			setPrice(Number(ethers.utils.formatEther(pricePerStage.toString())));
		} catch (error) {
			console.log(error);
		}
	};
	const priceNextStage = async () => {
		try {
			const signerAndContract = await connectingWithSmartContract();
			const contract = signerAndContract[1];
			if (contract === undefined) return;
			if (Number(stage) + 1 < 4) {
				const pricePerStage = await contract.pricePerStage(Number(stage) + 1);
				setNextPrice(
					Number(ethers.utils.formatEther(pricePerStage.toString()))
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const NativeToTokenHelper = async (amount) => {
		try {
			const signerAndContract = await connectingWithSmartContract();
			const contract = signerAndContract[1];
			const tokens = await contract.nativeToTokenHelper(
				ethers.utils.parseEther(amount)
			);
			return tokens;
		} catch (error) {
			console.log(error);
		}
	};

	const buyTokenWithNative = async (native, amount) => {
		try {
			const signerAndContract = await connectingWithSmartContract();
			const contract = signerAndContract[1];
			const tx = await contract.buyTokenWithNative(amount, {
				value: ethers.utils.parseEther(native),
			});
			await tx.wait();
			transactionCompleted();
			tokensBought(currentAccount);
		} catch (error) {
			errorInTransaction();
			console.log(error);
		}
	};

	const buyTokenWithToken = async (token, amount) => {
		try {
			const signerAndContract = await connectingWithSmartContract();
			const contract = signerAndContract[1];
			const signer = signerAndContract[0];

			if (chain?.id === maticChainAddress) {
				const tokenContract = new ethers.Contract(
					usdtContractPoly,
					erc20ABI,
					signer
				);
				const tokenInWei = BigNumber.from(Number(token)).mul(
					BigNumber.from(10).pow(6)
				);
				const approve = await tokenContract.approve(
					presaleContractPoly,
					tokenInWei
				);
				await approve.wait();
			} else if (chain?.id === bscChainAddress) {
				const tokenContract = new ethers.Contract(
					usdtContractBsc,
					erc20ABI,
					signer
				);
				const tokenInWei = BigNumber.from(Number(token)).mul(
					BigNumber.from(10).pow(18)
				);
				const approve = await tokenContract.approve(
					presaleContractBsc,
					tokenInWei
				);
				await approve.wait();
			}
			try {
				const tx = await contract.buyTokenWithToken(BigNumber.from(amount));
				await tx.wait();
				transactionCompleted();
				tokensBought(currentAccount);
			} catch (error) {
				errorInTransaction();
				console.log(error);
			}
		} catch (error) {
			errorInApproval();
			console.log(error);
		}
	};

	return (
		<therapyContext.Provider
			value={{
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
				address,
			}}
		>
			{children}
		</therapyContext.Provider>
	);
};
