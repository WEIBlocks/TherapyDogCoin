import React, { useState, useEffect, createContext } from "react";

import { ethers } from "ethers";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useNetwork } from "wagmi";
import { useBalance } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { toast } from "react-toastify";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import {
	presaleContractPoly,
	erc20ABI,
	presaleABI,
	usdtContractPoly,
	polyRPC,
	id,
} from "./constant.js";

export const therapyContext = createContext();

export const TherapyContextProvider = ({ children }) => {
	const { open } = useWeb3Modal();
	const { address, isConnected } = useAccount();

	const { chain } = useNetwork();
	const [currentAccount, setCurrentAccount] = useState("");
	const [tokenBalance, setTokenBalance] = useState(0);
	const [stage, setStage] = useState(0);
	const [tokeninstage, setTokenInstage] = useState(0);
	const [tokenSold, setTokenSold] = useState(0);
	const [price, setPrice] = useState(0);
	const [nextPrice, setNextPrice] = useState(0);
	const maticChainAddress = id;
	const errorWhileNetworkSwitching = () =>
		toast.error("Error while switching network");
	const chainId = chain?.id;

	useEffect(() => {
		if (!isConnected) {
			setCurrentAccount("");
		}
	}, [isConnected]);

	const switchNetworkFrontend = async () => {
		if (chainId !== maticChainAddress && isConnected) {
			try {
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

	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	useEffect(() => {
		if (address !== undefined) {
			setCurrentAccount(address);
		}
	}, [address]);

	useEffect(() => {
		if (address !== undefined) {
			tokensBought(currentAccount);
		}
	}, [address, chain, currentAccount, maticChainAddress]);

	useEffect(() => {
		currentStage();
	}, [currentAccount, address]);

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
			if (account === undefined) {
				return;
			} else {
				try {
					const tokenBalance = await readContract({
						address: presaleContractPoly,
						abi: presaleABI,
						functionName: "tokensBought",
						args: [account],
					});
					console.log("Token Balance:", tokenBalance);
					setTokenBalance(tokenBalance.toString());
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const currentStage = async () => {
		try {
			let contract;
			if (chainId === maticChainAddress) {
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
			if (Number(stage) === undefined) {
				return;
			} else {
				try {
					const tokenInStage = await readContract({
						address: presaleContractPoly,
						abi: presaleABI,
						functionName: "tokensInStages",
						args: [Number(stage)],
					});
					setTokenInstage(tokenInStage.toString());
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const tokensSoldPerStage = async () => {
		try {
			const tokenSoldPerStage = await readContract({
				address: presaleContractPoly,
				abi: presaleABI,
				functionName: "tokensSoldPerStage",
				args: [Number(stage)],
			});
			setTokenSold(tokenSoldPerStage.toString());
		} catch (error) {
			console.log(error);
		}
	};
	const priceInStage = async () => {
		try {
			let contract;
			if (chainId === maticChainAddress) {
				const provider = new ethers.providers.JsonRpcProvider(polyRPC);
				contract = new ethers.Contract(
					presaleContractPoly,
					presaleABI,
					provider
				);
			}
			if (contract === undefined) return;
			const pricePerStage = await contract.pricePerStage(Number(stage));
			console.log(pricePerStage);
			setPrice(Number(ethers.utils.formatEther(pricePerStage.toString())));
		} catch (error) {
			console.log(error);
		}
	};
	const priceNextStage = async () => {
		try {
			if (Number(stage) + 1 < 4) {
				const pricePerStage = await readContract({
					address: presaleContractPoly,
					abi: presaleABI,
					functionName: "pricePerStage",
					args: [Number(stage) + 1],
				});
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
			if (amount === undefined) {
				return;
			} else {
				const tokens = await readContract({
					address: presaleContractPoly,
					abi: presaleABI,
					functionName: "EthToTokenHelper",
					args: [Number(ethers.utils.parseEther(amount))],
				});
				return Number(tokens);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const buyTokenWithNative = async (native, amount) => {
		try {
			const { hash } = await writeContract({
				address: presaleContractPoly,
				abi: presaleABI,
				functionName: "buyTokenWithETH",
				args: [amount],
				value: ethers.utils.parseEther(native),
			});
			await waitForTransaction({ hash });
		} catch (error) {
			console.log(error);
		}
	};

	const buyTokenWithToken = async (token, amount) => {
		try {
			const contractWrite = await writeContract({
				address: usdtContractPoly,
				abi: erc20ABI,
				functionName: "approve",
				args: [presaleContractPoly, Number(token) * 10 ** 6],
			});
			await waitForTransaction({ hash: contractWrite.hash });
			const { hash } = await writeContract({
				address: presaleContractPoly,
				abi: presaleABI,
				functionName: "buyTokenWithUSDT",
				args: [amount],
			});
			await waitForTransaction({ hash });
		} catch (error) {
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
