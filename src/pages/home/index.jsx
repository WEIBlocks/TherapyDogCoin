import React from "react";
import { SiBnbchain } from "react-icons/si";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ServicesComp from "../../components/servicesComp";
import { LuAlignHorizontalJustifyCenter } from "react-icons/lu";
import { TbHourglassHigh } from "react-icons/tb";
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

      <div className="container sec-pad-y section-pad-x">
        <div className="flex gap-1 flex-col items-center">
          <SectionHeading heading="About TherapyDogCoin" />
          <div className="flex md:flex-row flex-col justify-between  items-center gap-1">
            <div className="md:w-1/2 w-full max-w-[440px]">
              <p className="md:text-xl text-lg font-medium ">
                Therapydogcoin is a blockchain based system to reform mental
                healthcare and in the future healthcare insurance to be fair and
                dignified.
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="w-full ">
                <img src={images.management} alt="mangement" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
