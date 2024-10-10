import React, { useContext, useEffect, useState } from "react";
import { TabPanel, Tabs } from "react-tabs";
import ServicesComp from "../../components/servicesComp";
import { IoCopyOutline } from "react-icons/io5";
import { services, teamData } from "../../data";
import SectionHeading from "../../components/servicesComp/sectionHeading";
import { images } from "../../assests";
import MemberComp from "../../components/teamMember";
import TintHeading from "../../components/servicesComp/sectionHeading/tintHeading";
import { therapyContext } from "../../context/therapyContext";
import axios from "axios";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import {
	PublicKey,
	LAMPORTS_PER_SOL,
	Transaction,
	SystemProgram,
} from "@solana/web3.js";
import Modal from "../../components/HowToBuyModal/Modal";
const Home = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const {} = useContext(therapyContext);
	const { connection } = useConnection();
	const {
		publicKey: fromPublicKey,
		sendTransaction,
		signMessage,
		connected,
	} = useWallet();
	const [ethPrice, setEthPrice] = useState(0);
	const [therapyPrice, setTherapyPrice] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [solanaPrice, setSolanaPrice] = useState(0);
	const [activeTab, setActiveTab] = useState(0);
	const [presaleDetails, setPresaleDetails] = useState({
		total_amount_in_usd: 0,
		total_token_sent: 0,
	});
	const [buying, setBuying] = useState(false);

	const handleTabChange = (index) => {
		setActiveTab(index);
	};

	const waitForSolanaSignature = async () => {
		if (connected) {
			const randomString = Math.random().toString(36).slice(2);
			const message = `Please sign this message to purchase $RXDOG: ${randomString}`;
			const signatureUint8 = await signMessage(
				new TextEncoder().encode(message)
			);

			const signature = ethers.utils.base58.encode(signatureUint8);
			return { signature, message };
		}
	};

	const transferTokens = async (signature, message, transactionHash) => {
		const data = {
			userWallet: fromPublicKey.toString(),
			transactionHash: transactionHash,
			signature: signature,
			message: message,
		};
		return await axios.post(
			"https://therapybackend-production.up.railway.app/send-tokens",
			data
		);
	};

	const buyHandler = async () => {
		setBuying(true);
		const toastId = toast.loading("Processing transaction...");
		try {
			if (Number(ethPrice) <= 0) {
				toast.update(toastId, {
					render: "Transaction failed: SOL amount must be greater than 0.",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
				return; // Exit the function early
			}

			const { signature, message } = await waitForSolanaSignature();

			// Step 2: Check balance
			const balance = await connection.getBalance(new PublicKey(fromPublicKey));
			const l = balance / LAMPORTS_PER_SOL;

			if (Number(ethPrice) > l) {
				toast.update(toastId, {
					render: "Insufficient Balance",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
				return;
			}

			// Step 3: Prepare transaction
			const lamports = Number(ethPrice) * LAMPORTS_PER_SOL;
			const transaction = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: fromPublicKey,
					toPubkey: new PublicKey(
						"8e25U3kPaAxKS55qz1HiJGp8Dy5HyYPtgjtLwWYut9N1"
					), // change
					lamports,
				})
			);

			// Step 4: Send transaction
			const latestBlockHash = await connection.getLatestBlockhash();
			transaction.recentBlockhash = latestBlockHash.blockhash;
			transaction.feePayer = fromPublicKey;

			const hash = await sendTransaction(transaction, connection);

			// Step 5: Confirm transaction
			await connection.confirmTransaction({
				signature: hash,
				lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
				blockhash: latestBlockHash.blockhash,
			});

			// Step 6: Transfer tokens and update state
			await transferTokens(signature, message, hash);
			await totalTokenSoldAndAmountRaised();

			toast.update(toastId, {
				render: "Transaction Successful",
				type: "success",
				isLoading: false,
				autoClose: 5000,
			});
		} catch (err) {
			// Enhanced error handling
			if (axios.isAxiosError(err)) {
				const responseError =
					err.response?.data?.message || "Unknown error occurred.";
				toast.update(toastId, {
					render: `Transaction failed: ${responseError}`,
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			} else if (err.message.includes("Insufficient funds")) {
				toast.update(toastId, {
					render: "Transaction failed: Insufficient funds in your wallet.",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			} else if (err.message.includes("User rejected the request")) {
				toast.update(toastId, {
					render: "User rejected the request.",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			} else if (err.message.includes("Network error")) {
				toast.update(toastId, {
					render: "Transaction failed: Network error. Please try again later.",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			} else if (err.message.includes("Signature verification failed")) {
				toast.update(toastId, {
					render: "Transaction failed: Signature verification failed.",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			} else if (err.message.includes("Transaction timeout")) {
				toast.update(toastId, {
					render: "Transaction failed: Transaction timeout. Please try again.",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			} else {
				toast.update(toastId, {
					render: "An unexpected error occurred. Please try again.",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
				console.error("Error details:", err); // Log the error details for debugging
			}
		} finally {
			setBuying(false);
		}
	};

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const sendEmail = async () => {
		if (email) {
			await axios.post(`https://weiblocks.pythonanywhere.com/api/send-email/`, {
				email_address: email,
				token_amount: therapyPrice,
			});

			setIsOpen(!isOpen);
		} else {
			alert("Please enter a valid email address");
		}
	};

	const ethChangeHandler = (e) => {
		const ethValue = Number(e.target.value);
		if (ethValue < 0) {
			if (!toast.isActive("negativeValueError")) {
				toast.error("Value cannot be negative", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					toastId: "negativeValueError",
				});
			}
			return;
		}
		setEthPrice(ethValue);
		const newPrice = ethValue * Number(solanaPrice);
		const totalToken = newPrice / 0.0001;
		setTherapyPrice(totalToken.toFixed(2));
	};

	const contractAddress = "mX8c9EF1Sq7CAiBd9H3FQ6LUnKFqheWNSayVTi2rBrb";

	const copyToClipboard = () => {
		navigator.clipboard.writeText(contractAddress);
	};

	async function fetchData() {
		const solanaPriceResponse = await axios.get(
			"https://api.dexscreener.com/latest/dex/pairs/bsc/0x9f5a0ad81fe7fd5dfb84ee7a0cfb83967359bd90"
		);
		const solanaUsdPrice = solanaPriceResponse.data.pair.priceUsd;
		setSolanaPrice(solanaUsdPrice);
	}

	async function totalTokenSoldAndAmountRaised() {
		const response = await axios.get(
			"https://therapybackend-production.up.railway.app/total-collected-amount"
		);
		setPresaleDetails(response.data);
	}

	useEffect(() => {
		fetchData();
		totalTokenSoldAndAmountRaised();
	}, []);

	const faqContent = [
		{
			question: "I don’t see the tokens in my wallet!",
			answer:
				"Ensure the transaction is confirmed on the Solana blockchain. You may need to manually add the token to Phantom.",
		},
		{
			question: "I can’t connect my wallet!",
			answer:
				"Ensure your Phantom wallet and browser are up to date. Try clearing your browser cache or switching browsers.",
		},
		{
			question: "What happens if the transaction fails?",
			answer:
				"If the transaction fails, your SOL will remain in your wallet and you can try the purchase again.",
		},
		// Add more FAQ questions and answers as needed
	];

	return (
		<>
			{/* hero section */}
			<seiction id="home">
				<div className="bg-hero-pattern primary-transparent bg-no-repeat bg-cover bg-fixed ">
					<div className="bg-secondary">
						<div className="container  sec-pad-x sec-pad-y ">
							<div className="flex md:flex-row flex-col gap-1 items-center">
								<div className="flex flex-col items-start gap-1 md:w-1/2 w-full">
									<h1 className="lg:text-5xl md:text-4xl text-2xl font-semibold text-white">
										The world first use of blockchain technology to increase
										mental health awareness and{" "}
										<span className="text-primary font-black">
											access to treatment
										</span>
									</h1>
									<p className="lg:text-4xl md:text-3xl text-xl font-semibold text-white  ">
										We provide real access to treatment for individuals with
										mental illness and addiction
									</p>
								</div>
								<div className="md:w-1/2 w-full flex md:justify-end  justify-center">
									<div className="max-w-[380px] w-full bg-light-secondary md:p-[20px] p-[15px] rounded-xl flex flex-col gap-1">
										<div className="flex flex-between items-center">
											<h4 className="md:text-2xl text-xl font-bold text-white text-center">
												Presale is live{" "}
												<span className="text-3xl text-green-400">•</span>
											</h4>
										</div>

										<div className="f-col">
											<p className="md:text-sm text-xs font-medium text-white ">
												ICO at $0.0001
											</p>
											<p className="md:text-sm text-xs font-medium text-white ">
												Listing at $0.001
											</p>
										</div>
										<div className="relative before:absolute before:content-[' '] before:left-1/2 before:-translate-x-1/2 before:z-0 before:w-full before:h-[1px] before:bg-white before:m-auto"></div>

										<h4 className="md:text-lg text-base font-bold text-white capitalize">
											PURCHASE $RXDOG
										</h4>
										<div className="flex flex-col gap-1">
											<p className="md:text-xl text-lg font-bold text-white capitalize">
												Total amount raised: $
												{presaleDetails.total_amount_in_usd.toFixed(2)}
											</p>
										</div>
										<Tabs
											selectedIndex={activeTab}
											onSelect={handleTabChange}
											key={activeTab}
										>
											<div className="flex flex-col gap-1 justify-start items-start">
												<div className="w-full">
													<TabPanel>
														<div className="flex flex-col gap-1">
															<div className="flex items-center p-0.5  bg-white md:rounded-md rounded-sm overflow-hidden gap-0.75">
																<img
																	src={images.eth}
																	alt="ether"
																	className="w-[25px] h-[25px]"
																/>
																<input
																	className="card-input"
																	type="number"
																	value={ethPrice}
																	onChange={ethChangeHandler}
																/>
															</div>
															<div className="flex items-center p-0.5  bg-white md:rounded-md rounded-sm overflow-hidden gap-0.75">
																<img
																	src={images.brandLogo}
																	alt="ether"
																	className="w-[25px] h-[25px]"
																/>
																<input
																	className="card-input"
																	type="number"
																	value={
																		therapyPrice < 1 ||
																		therapyPrice === undefined ||
																		therapyPrice === null
																			? 0
																			: therapyPrice
																	}
																	disabled
																/>
															</div>
														</div>
													</TabPanel>

													{/* <TabPanel>
														<div className="flex flex-col gap-1">
															<div className="flex items-center p-0.5  bg-white md:rounded-md rounded-sm overflow-hidden gap-0.75">
																<img
																	src={images.tether}
																	alt="ether"
																	className="w-[25px] h-[25px]"
																/>
																<input
																	className="card-input"
																	type="number"
																	value={usdtPrice}
																	onChange={usdtChangeHandler}
																/>
															</div>
															<div className="flex items-center p-0.5  bg-white md:rounded-md rounded-sm overflow-hidden gap-0.75">
																<div className="">
																	<img
																		src={images.brandLogo}
																		alt="ether"
																		className="w-[25px] h-[25px] object-cover"
																	/>
																</div>

																<input
																	className="card-input"
																	type="number"
																	disabled
																	value={
																		tokenPrice < 1 ||
																		tokenPrice === undefined ||
																		tokenPrice === null
																			? 0
																			: tokenPrice
																	}
																/>
															</div>
														</div>
													</TabPanel> */}
												</div>
											</div>
										</Tabs>
										{fromPublicKey && (
											<div className="f-col">
												<p className="md:text-sm text-xs font-medium text-white capitalize">
													<span className="font-bold">wallet:</span>{" "}
													{fromPublicKey.toString().slice(0, 4) +
														"..." +
														fromPublicKey.toString().slice(-4)}
												</p>
												{/* <p className="md:text-sm text-xs font-medium text-white capitalize">
													<span className="font-bold">balance:</span>{" "}
													{tokenBalance} $RXDOG
												</p> */}
											</div>
										)}
										<div className="flex md:flex-row gap-1 flex-col flex-between items-center">
											<span className="md:text-sm text-xs font-medium text-white "></span>

											<button
												className=" rounded-md w-[45%] py-[10px] bg-secondary text-white md:text-lg text-base md:font-semibold cursor-pointer font-normal hover:bg-tint-purple"
												onClick={() => setIsOpenModal(true)}
											>
												How to Buy
											</button>

											{/* Pass data and state handling to Modal */}
											{isOpenModal && (
												<Modal
													isOpenModal={isOpenModal}
													onClose={() => setIsOpenModal(false)}
													faqContent={faqContent}
												/>
											)}
											{fromPublicKey ? (
												<button
													className="rounded-md w-[50%] py-[10px] bg-fuchsia-900 text-white md:text-lg text-base md:font-semibold cursor-pointer font-normal hover:bg-tint-purple"
													onClick={buyHandler}
													disabled={buying}
												>
													Buy
												</button>
											) : (
												<WalletMultiButton />
											)}

											{isOpen && (
												<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
													<div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
														<h2 className="text-xl font-semibold mb-4">
															Thanks for your purchase
														</h2>
														<p className="mb-4">
															If you want to get email recipt please enter your
															email address
														</p>

														<input
															type="email"
															placeholder="Enter your email"
															className="px-4 py-2 bg-gray-200 text-black rounded w-full"
															onChange={(e) => {
																const emailValue = e.target.value;
																setEmail(emailValue);

																const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
																if (!emailRegex.test(emailValue)) {
																	e.target.style.border = "1px solid red";
																} else {
																	e.target.style.border = "1px solid green";
																}
															}}
														/>

														<div className="flex justify-center mt-4 space-x-4">
															<button
																onClick={sendEmail}
																className={`px-4 py-2 text-white rounded ${
																	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
																		? "bg-green-500"
																		: "bg-gray-500"
																}`}
																disabled={
																	!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
																}
															>
																Send
															</button>
															<button
																onClick={togglePopup}
																className="px-4 py-2 bg-red-500 text-white rounded"
															>
																Cancel
															</button>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</seiction>
			{/* hero section */}
			<section id="partners" className="bg-gray-200">
				<div className="container mx-auto">
					<div className="flex flex-wrap justify-center items-center gap-4">
						<a
							href="https://www.benzinga.com/partner/health-care/24/05/39006472/web-3-0-could-revolutionize-the-future-of-healthcare-heres-how"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={images.benziga} alt="Partner 1" className="h-32" />
						</a>
						<a
							href="https://www.benzinga.com/partner/health-care/24/04/38378856/90-of-americans-believe-we-are-experiencing-a-mental-health-care-crisis-elevate-health-and-we"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={images.benziga} alt="Partner 1" className="h-32" />
						</a>
					</div>
				</div>
			</section>
			<section id="about">
				{/* about section */}
				<div className="container sec-pad-y sect-pad-x">
					<div className="flex gap-1 flex-col items-center">
						<SectionHeading heading="About TherapyDogCoin" effect={"Therapy"} />
						<div className="flex md:flex-row flex-col   md:p-1 p-0.1  items-center gap-1">
							<div className="md:w-1/2 w-full ">
								<div className="max-w-[440px] w-full">
									<p className="md:text-xl text-lg font-medium text-grey">
										Therapydogcoin is a blockchain based system to reform mental
										healthcare and in the future healthcare insurance to be fair
										and dignified.
									</p>
								</div>
							</div>
							<div className="md:w-1/2 w-full">
								<div className="w-full ">
									<img src={images.about1} alt="mangement" />
								</div>
							</div>
						</div>
						<div className="sec-pad-y w-full">
							<div className="flex md:flex-row flex-col-reverse  items-center gap-1 md:p-1 p-0.1">
								<div className="md:w-1/2 w-full">
									<div className="w-full ">
										<img src={images.about2} alt="mangement" />
									</div>
								</div>
								<div className="md:w-1/2 w-full ">
									<div className="max-w-[440px] w-full">
										<p className="md:text-xl text-lg font-medium text-grey">
											We are real company with real futuristic roadmap. We build
											community to create the change while we do the work on the
											ground to help patients with mental health issues. With
											blockchain-based medical records, prescription data can be
											updated in real-time by any provider, streamlining the
											information flow and reducing the risk of errors and
											contraindications between drugs.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex md:flex-row flex-col   md:p-1 p-0.1  items-center gap-1">
							<div className="md:w-1/2 w-full ">
								<h3 className="relative inline-flex lg:text-2xl md:text-xl text-lg md:font-bold font-semibold before:absolute before:content-[' '] before:left-1/2 before:bottom-0 before:-translate-x-1/2 before:z-0 before:w-full before:h-[1px] before:bg-black before:m-auto">
									About the company
								</h3>
								<div className="max-w-[440px] w-full">
									<p className="md:text-xl text-lg font-medium text-grey">
										{/* Our psychiatry team has provided MAT injections (Sublocade
                    and Vivitrol) to 389 clients with substance abuse issues and
                    over 100 monthly oral MAT prescriptions. Additionally, we
                    have conducted nearly 430 sessions of Intensive Outpatient
                    Groups, and an additional 200 Relapse Prevention groups. */}
										Over the past 24 months, Meditoxcare has provided 17,939
										individual psychiatry and therapy appointments to more than
										1,800 clients. Of those, 48% were provided to individuals
										with Medicaid benefits who are of lower socioeconomic means.
										Tentatively launching it's 2 inpatient facilities in
										Connecticut and New York in 2025 and 2026, the company says
										its token will be used to increase awareness, build a
										stronger supportive community and connect individuals with
										mental health disorders and addiction with therapists and
										psychiatrists instantly. Blockchain-based software will also
										allow for the creation of smart insurance contracts (i.e.,
										contracts that are self-executing, in which the terms of the
										agreement are directly written into lines of code) for
										mental health and wellness to provide an alternative to
										conventional insurance.
									</p>
								</div>
							</div>
							<div className="md:w-1/2 w-full">
								<div className="w-full ">
									<img src={images.about3} alt="mangement" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* about section */}

			{/* services section */}
			<section id="services">
				<div className="container sec-pad-y">
					<div className="flex flex-col gap-1">
						<SectionHeading
							heading="TherapyDogCoin services"
							effect={"services"}
						/>

						{/* <div className="lg:rounded-tl-3xl md:rounded-tl-lg rounded-tl-md lg:rounded-tr-3xl md:rounded-tr-lg rounded-tr-md relative overflow-hidden lg:h-[640px] md:h-[540px] h-[440px] w-full flex flex-col justify-between border-primary border-[3px] ">
            <div className="lg:p-1 md:p-0.10 p-0.75 bg-primary flex justify-between">
              <div className="flex items-center">
                <div className="lg:text-3xl md:text-2xl text-xl text-dark-primary mr-1">
                  <SiBnbchain />
                </div>
                <h2 className="md:text-lg  text-base text-white font-semibold capitalize text-nowrap ">
                  task chain
                </h2>
              </div>
              <div className="flex gap-1 items-center">
                <span className="nav-link">Outpatient</span>
                <span className="nav-link">Inpatient</span>
                <span className="nav-link">Intesnive outpatient</span>
              </div>
            </div> */}
						<div className="sec-pad-x sec-pad-y flex gap-1 justify-center flex-wrap">
							{services.map((service) => (
								<ServicesComp key={service.id} service={service} />
							))}
						</div>
						{/* </div> */}
					</div>
				</div>
			</section>

			{/* services section */}

			{/* RXDOG tokenomics */}
			<section id="tokenomics">
				<div className="bg-secondary">
					<div className="container sec-pad-y sec-pad-x">
						<div className="flex gap-1 flex-col items-center">
							<TintHeading heading="RXDOG tokenomics" effect={"tokenomics"} />

							{/* <h1 className="lg:text-5xl md:text-4xl text-3xl font-black text-center text-white">
              RXDOG tokenomics
            </h1> */}

							<div className=" max-w-[880px] w-full lg:pt-[48px] md:pt-[34px] pt-[20px]">
								<img src={images.Graph} alt="graph" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* RXDOG tokenomics */}

			{/* Contract details  */}
			<section id="contract">
				<div className="container sec-pad-y sec-pad-x">
					<div className="flex md:gap-1.5 gap-1 md:flex-row flex-col items-center">
						<div className="md:w-[40%] w-full flex flex-col gap-1">
							<h2 className="lg:text-3xl md:text-2xl text-xl font-black text-black">
								Token Contract Details
							</h2>
							<p className="md:text-xl text-lg font-medium text-black">
								Below are the contract details needed to add the RXDOG token to
								your wallet.
							</p>
						</div>
						<div className="grid grid-cols-3 gap-1 md:w-[60%] w-full">
							<div className="col-span-3 md:p-[24px] p-1 bg-secondary text-white md:rounded-2xl rounded-xl">
								<div className="flex flex-col gap-0.75 ">
									<h4 className="md:text-xl text-lg md:font-bold font-semibold">
										Contract address:
									</h4>
									<div className="flex gap-[5px] items-center md:text-base text-sm md:font-bold font-semibold ">
										<span className="text-wrap break-words break-all">
											mX8c9EF1Sq7CAiBd9H3FQ6LUnKFqheWNSayVTi2rBrb
										</span>

										<span onClick={copyToClipboard} className="cursor-pointer">
											<IoCopyOutline />
										</span>
									</div>
									<p className="md:text-base text-sm md:font-bold font-semibold">
										Do not send any cryptocurrency to this address, they would
										be lost forever!
									</p>
								</div>
							</div>
							<div className="md:p-[24px] p-1 bg-secondary md:rounded-2xl rounded-xl md:col-span-1 col-span-3 text-white">
								<div className="flex flex-col gap-0.75 items-start md:text-base text-sm md:font-bold font-semibold ">
									<span>Decimals:</span>
									<span>8</span>
								</div>
							</div>
							<div className="md:p-[24px] p-1 bg-secondary md:rounded-2xl rounded-xl md:col-span-1 col-span-3 text-white">
								<div className="flex flex-col gap-0.75 items-start md:text-base text-sm md:font-bold font-semibold ">
									<span>Network:</span>
									<span>Solana</span>
								</div>
							</div>
							<div className="md:p-[24px] p-1 bg-secondary md:rounded-2xl rounded-xl md:col-span-1 col-span-3 text-white">
								<div className="flex flex-col gap-0.75 items-start md:text-base text-sm md:font-bold font-semibold ">
									<span>Token symbol:</span>
									<span>RXDOG</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contract details  */}

			{/* roadmap details  */}
			<section id="roadmap">
				<div className="bg-secondary border-b-2 border-primary">
					<div className="container sec-pad-y sec-pad-x">
						<div className="flex gap-1 flex-col items-center">
							<TintHeading heading="Roadmap" effect={"Roadmap"} />
							{/* <h1 className="lg:text-5xl md:text-4xl text-3xl font-black text-center text-white">
              Roadmap
            </h1> */}

							<div className=" max-w-[880px] w-full lg:pt-[48px] md:pt-[34px] pt-[20px]">
								<img src={"/CHARTT.png"} alt="roadmp" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* roadmap details  */}

			{/* meetteam Section */}
			<section id="team">
				<div className="bg-white border-b-2 border-primary">
					<div className="container sec-pad-y sec-pad-x ">
						<div className="flex gap-1 flex-col items-center">
							{/* <h1 className="lg:text-5xl md:text-4xl text-3xl font-black text-center text-primary">
              Meet team
            </h1> */}
							<SectionHeading heading="Meet team" effect={"Team"} />

							<div className=" max-w-[1180px] w-full lg:pt-[48px] md:pt-[34px] pt-[20px] flex flex-wrap justify-center items-center gap-1">
								{/* <MemberComp
                name="Jennifer Hrbek, LCSW"
                desigination="EXECUTIVE DIRECTOR"
                profilePic={images.EXECUTIVE_DIRECTOR}
              />
              <MemberComp
                name="Dr. Mohamed Elsamra, MD"
                desigination="MEDICAL DIRECTOR"
                profilePic={images.MEDICAL_DIRECTOR}
              />
              <MemberComp
                name="Dr. Carolyn Dennett, PsyD"
                desigination="CLINICAL PSYCHOLOGIST"
                profilePic={images.CLINICAL_PSYCHOLOGIST}
              /> */}

								{teamData.map((team) => (
									<MemberComp
										key={team.id}
										name={team.name}
										desigination={team.desigination}
										profilePic={team.profilePic}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* meetteam Section */}
		</>
	);
};

export default Home;
