import React, { useContext, useEffect, useState } from "react";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ServicesComp from "../../components/servicesComp";

import { IoCopyOutline } from "react-icons/io5";
import { services, teamData } from "../../data";
import SectionHeading from "../../components/servicesComp/sectionHeading";
import { images } from "../../assests";
import MemberComp from "../../components/teamMember";
import TintHeading from "../../components/servicesComp/sectionHeading/tintHeading";
import { therapyContext } from "../../context/therapyContext";

const Home = () => {
	const {
		connectWallet,
		currentAccount,
		stage,
		price,
		NativeToTokenHelper,
		buyTokenWithNative,
		buyTokenWithToken,
		tokenBalance,
	} = useContext(therapyContext);
	const [ethPrice, setEthPrice] = useState(0);
	const [therapyPrice, setTherapyPrice] = useState(0);
	const [usdtPrice, setUsdtPrice] = useState(0);
	const [tokenPrice, setTokenPrice] = useState(0);
	useEffect(() => {
		const fetchPrice = async () => {
			const price = await NativeToTokenHelper(ethPrice);
			setTherapyPrice(price);
		};
		fetchPrice();
	}, [ethPrice]);

	const [activeTab, setActiveTab] = useState(0);
	const handleTabChange = (index) => {
		setActiveTab(index);
	};

	const buyHandler = async () => {
		if (activeTab === 0) {
			await buyTokenWithNative(ethPrice, therapyPrice);
		} else if (activeTab === 1) {
			await buyTokenWithToken(usdtPrice, tokenPrice);
		}
	};

	const usdtChangeHandler = (e) => {
		setUsdtPrice(e.target.value);
		const newPice = e.target.value / price;
		setTokenPrice(newPice);
	};
	const contractAddress = "0x1f131b6b30C3982b7EaaDf6345AB5C4b762E9AC1";

	const copyToClipboard = () => {
		navigator.clipboard.writeText(contractAddress);
	};
	function formatEthereumAddress(address) {
		// Extract the first four characters
		const firstFour = address.slice(0, 4);
		// Extract the last four characters
		const lastFour = address.slice(-4);
		// Return the formatted string
		return `${firstFour}...${lastFour}`;
	}

	const formattedAddress = formatEthereumAddress(currentAccount);

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
											<span className="text-tint-purple md:text-xl text-lg md:font-semibold font-normal capitalize">
												STAGE {stage + 1}
											</span>
										</div>

										<div className="f-col">
											<p className="md:text-sm text-xs font-medium text-white ">
												ICO at ${price}
											</p>
											<p className="md:text-sm text-xs font-medium text-white ">
												Listing at $0.001
											</p>
										</div>
										<div className="relative before:absolute before:content-[' '] before:left-1/2 before:-translate-x-1/2 before:z-0 before:w-full before:h-[1px] before:bg-white before:m-auto"></div>

										<h4 className="md:text-lg text-base font-bold text-white capitalize">
											PURCHASE $RXDOG
										</h4>
										<Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
											<div className="flex flex-col gap-1 justify-start items-start">
												<TabList>
													<div className=" text-nowrap flex flex-wrap ">
														<Tab>
															<div className="tab text-base flex md:gap-0.5 gap-[05px] items-center ">
																<img
																	src={images.eth}
																	alt="ether"
																	className="w-[20px] h-[20px]"
																/>
																<span className="uppercase">eth</span>
															</div>
														</Tab>

														<Tab>
															<div className="tab-r text-base flex md:gap-0.5 gap-[05px] items-center">
																<img
																	src={images.tether}
																	alt="ether"
																	className="w-[20px] h-[20px]"
																/>
																<span className="uppercase">usdt</span>
															</div>
														</Tab>
													</div>
												</TabList>

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
																	onChange={(e) => setEthPrice(e.target.value)}
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

													<TabPanel>
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
													</TabPanel>
												</div>
											</div>
										</Tabs>
										{currentAccount && (
											<div className="f-col">
												<p className="md:text-sm text-xs font-medium text-white capitalize">
													<span className="font-bold">wallet:</span>{" "}
													{formattedAddress}
												</p>
												<p className="md:text-sm text-xs font-medium text-white capitalize">
													<span className="font-bold">balance:</span>{" "}
													{tokenBalance} $RXDOG
												</p>
											</div>
										)}
										<div className="flex md:flex-row gap-1 flex-col flex-between items-center">
											<span className="md:text-sm text-xs font-medium text-white "></span>
											{currentAccount ? (
												<button
													className="btn bg-secondary text-white md:text-lg text-base md:font-semibold cursor-pointer font-normal hover:bg-tint-purple"
													onClick={buyHandler}
												>
													Buy
												</button>
											) : (
												<button
													className="btn bg-secondary text-white md:text-lg text-base md:font-semibold cursor-pointer font-normal hover:bg-tint-purple"
													onClick={connectWallet}
												>
													connect wallet
												</button>
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
										Over the past 24 months, Elevate has provided 17,939
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
											0x4C2e29dbc437C4b781963E5B2B393b1D4ea64b19
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
									<span>18</span>
								</div>
							</div>
							<div className="md:p-[24px] p-1 bg-secondary md:rounded-2xl rounded-xl md:col-span-1 col-span-3 text-white">
								<div className="flex flex-col gap-0.75 items-start md:text-base text-sm md:font-bold font-semibold ">
									<span>Network:</span>
									<span>Ethereum</span>
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
								<img src={images.Roadmap} alt="roadmp" />
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
