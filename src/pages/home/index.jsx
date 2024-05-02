import React from "react";
import { SiBnbchain } from "react-icons/si";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ServicesComp from "../../components/servicesComp";
import { LuAlignHorizontalJustifyCenter } from "react-icons/lu";
import { TbHourglassHigh } from "react-icons/tb";
import { IoCopyOutline } from "react-icons/io5";
import { services } from "../../data";
import SectionHeading from "../../components/servicesComp/sectionHeading";
import { images } from "../../assests";

const Home = () => {
  return (
    <>
      {/* hero section */}
      <div className="bg-hero-pattern primary-transparent bg-no-repeat bg-cover bg-fixed ">
        <div className="bg-primary-transparent">
          <div className="container  sec-pad-x sec-pad-y ">
            <div className="flex md:flex-row flex-col gap-1 items-center">
              <div className="flex flex-col items-start gap-1 md:w-1/2 w-full">
                <h1 className="lg:text-4xl md:text-3xl text-2xl font-black text-white">
                  The world first use of blockchain technology to increase
                  mental health awareness
                </h1>
                <p className="md:text-xl text-lg font-medium text-white  ">
                  Provide real access to treatment for individuals with mental
                  illness and addiction
                </p>
              </div>
              <div className="md:w-1/2 w-full flex md:justify-end  justify-center">
                <div className="max-w-[380px] w-full bg-primary md:p-[20px] p-[15px] rounded-xl flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h3 className="md:text-lg text-base font-bold text-white ">
                      TherapyDogCoin RXDOG for $0.0001
                    </h3>
                  </div>
                  <div className="f-col">
                    <p className="md:text-sm text-xs font-medium text-white ">
                      Investment at $0.0001
                    </p>
                    <p className="md:text-sm text-xs font-medium text-white ">
                      Listing at $0.0001
                    </p>
                  </div>
                  <div className="relative before:absolute before:content-[' '] before:left-1/2 before:-translate-x-1/2 before:z-0 before:w-full before:h-[1px] before:bg-white before:m-auto"></div>
                  <div className="f-col gap-0.5">
                    <h3 className="md:text-lg text-base font-bold text-white">
                      Reform mental health services
                    </h3>
                    <p className="md:text-sm text-xs font-medium text-white">
                      Increase mental health and treatment{" "}
                    </p>
                    <Tabs>
                      <div className="flex flex-col gap-0.5 justify-start items-start">
                        {/* <div className="btn-inner-0"> */}
                        <TabList>
                          <div className=" text-nowrap   flex flex-wrap ">
                            <Tab>
                              <div className="tab">Week 1 and 2</div>
                            </Tab>
                            <Tab>
                              <span className="tab-no-radius">
                                Week 3 and 4
                              </span>
                            </Tab>
                            <Tab>
                              <span className="tab-r"> Week 5 and 6</span>
                            </Tab>
                          </div>
                        </TabList>

                        {/* </div> */}
                        <div className="w-full">
                          <TabPanel>
                            <div className="md:rounded-lg relative p-[2px] bg-white w-full ">
                              <input
                                value={"$0.0001"}
                                className="card-input"
                                type="text"
                              />
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div className="md:rounded-lg relative p-[2px] bg-white w-full ">
                              <input
                                value={"$0.0004"}
                                className="card-input"
                                type="text"
                              />
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div className="md:rounded-lg relative p-[2px] bg-white w-full ">
                              <input
                                value={"$0.0008"}
                                className="card-input"
                                type="text"
                              />
                            </div>
                          </TabPanel>
                        </div>
                      </div>
                    </Tabs>
                    <p className="md:text-sm text-xs font-medium text-white">
                      Last chance before it gets listed at $0.001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* hero section */}
      {/* services section */}
      <div className="container sec-pad-y">
        <div className="flex flex-col gap-1">
          <SectionHeading heading="TherapyDogCoin services" />

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
      {/* services section */}
      {/* about section */}
      <div className="container sec-pad-y sect-pad-x">
        <div className="flex gap-1 flex-col items-center">
          <SectionHeading heading="About TherapyDogCoin" />
          <div className="flex md:flex-row flex-col   md:p-1 p-0.1  items-center gap-1">
            <div className="md:w-1/2 w-full ">
              <div className="max-w-[440px] w-full">
                <p className="md:text-xl text-lg font-medium ">
                  Therapydogcoin is a blockchain based system to reform mental
                  healthcare and in the future healthcare insurance to be fair
                  and dignified.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="w-full ">
                <img src={images.management} alt="mangement" />
              </div>
            </div>
          </div>
          <div className="sec-pad-y w-full">
            <div className="flex md:flex-row flex-col-reverse  items-center gap-1 md:p-1 p-0.1">
              <div className="md:w-1/2 w-full">
                <div className="w-full ">
                  <img src={images.management2} alt="mangement" />
                </div>
              </div>
              <div className="md:w-1/2 w-full ">
                <div className="max-w-[440px] w-full">
                  <p className="md:text-xl text-lg font-medium ">
                    We are real company with real futuristic roadmap. We build
                    community to create the change while we do the work on the
                    ground to help patients with mental health issues. With
                    blockchain-based medical records, prescription data can be
                    updated in real-time by any provider, streamlining the
                    information flow and reducing the risk of errors and
                    contraindications between drugs
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
                <p className="md:text-xl text-lg font-medium ">
                  Over the past 24 months, Elevate has provided 17,939
                  individual psychiatry and therapy appointments to more than
                  1,800 clients. Of those, 48% were provided to individuals with
                  Medicaid/Husky benefits who are of lower socioeconomic means.
                  Our psychiatry team has provided MAT injections (Sublocade and
                  Vivitrol) to 389 clients with substance abuse issues and over
                  100 monthly oral MAT prescriptions. Additionally, we have
                  conducted nearly 430 sessions of Intensive Outpatient Groups,
                  and an additional 200 Relapse Prevention groups
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="w-full ">
                <img src={images.management} alt="mangement" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about section */}
      {/* RXDOG tokenomics */}
      <div className="bg-primary">
        <div className="container sec-pad-y sec-pad-x">
          <div className="flex gap-1 flex-col items-center">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-black text-center text-white">
              RXDOG tokenomics
            </h1>

            <div className=" max-w-[880px] w-full lg:pt-[48px] md:pt-[34px] pt-[20px]">
              <img src={images.Graph} alt="graph" />
            </div>
          </div>
        </div>
      </div>
      {/* RXDOG tokenomics */}
      {/* Contract details  */}
      <div className="container sec-pad-y sec-pad-x">
        <div className="flex md:gap-1.5 gap-1 md:flex-row flex-col items-center">
          <div className="md:w-[40%] w-full flex flex-col gap-1">
            <h2 className="lg:text-3xl md:text-2xl text-xl font-black text-black">
              Token Contract Details
            </h2>
            <p className="md:text-xl text-lg font-medium text-black">
              Below are the contract details needed to add the $TASKC token to
              your wallet.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1 md:w-[60%] w-full">
            <div className="col-span-3 md:p-[24px] p-1 bg-primary text-white md:rounded-2xl rounded-xl">
              <div className="flex flex-col gap-0.75 ">
                <h4 className="md:text-xl text-lg md:font-bold font-semibold">
                  Contract address:
                </h4>
                <div className="flex gap-[5px] items-center md:text-base text-sm md:font-bold font-semibold ">
                  <span className="text-wrap break-words break-all">
                    0x4C2e29dbc437C4b781963E5B2B393b1D4ea64b19
                  </span>
                  <span>
                    <IoCopyOutline />
                  </span>
                </div>
                <p className="md:text-base text-sm md:font-bold font-semibold">
                  Do not send any cryptocurrency to this address, they would be
                  lost forever!
                </p>
              </div>
            </div>
            <div className="md:p-[24px] p-1 bg-primary md:rounded-2xl rounded-xl md:col-span-1 col-span-3 text-white">
              <div className="flex flex-col gap-0.75 items-start md:text-base text-sm md:font-bold font-semibold ">
                <span>Decimals:</span>
                <span>18</span>
              </div>
            </div>
            <div className="md:p-[24px] p-1 bg-primary md:rounded-2xl rounded-xl md:col-span-1 col-span-3 text-white">
              <div className="flex flex-col gap-0.75 items-start md:text-base text-sm md:font-bold font-semibold ">
                <span>Network:</span>
                <span>Ethereum</span>
              </div>
            </div>
            <div className="md:p-[24px] p-1 bg-primary md:rounded-2xl rounded-xl md:col-span-1 col-span-3 text-white">
              <div className="flex flex-col gap-0.75 items-start md:text-base text-sm md:font-bold font-semibold ">
                <span>Token symbol:</span>
                <span>RXDOG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contract details  */}
      {/* roadmap details  */}
      <div className="bg-[#06163D]">
        <div className="container sec-pad-y sec-pad-x">
          <div className="flex gap-1 flex-col items-center">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-black text-center text-white">
              Roadmap
            </h1>

            <div className=" max-w-[880px] w-full lg:pt-[48px] md:pt-[34px] pt-[20px]">
              <img src={images.Roadmap} alt="roadmp" />
            </div>
          </div>
        </div>
      </div>
      \{/* roadmap details  */}
    </>
  );
};

export default Home;
