import { useState } from "react";

const Modal = ({ isOpenModal, onClose, howToBuyContent, faqContent }) => {
  const [activeTab, setActiveTab] = useState("howToBuy");
  const [openFAQ, setOpenFAQ] = useState(null); // To track which FAQ is open

  const handleFaqToggle = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle FAQ on and off
  };

  return (
    <div
      id="modalOverlay"
      onClick={(e) => e.target.id === "modalOverlay" && onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <div
        className={`relative bg-white z-[9999]  rounded-lg w-full max-w-3xl p-8 transform transition-transform duration-300 scale-100 ${isOpenModal ? "animate-zoomIn": "animate-zoomOut"} `}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 text-[24px] right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Tabs */}
        <div className="flex space-x-4 border-b-2 mb-6">
          <button
            className={`pb-2 px-4 ${activeTab === "howToBuy" ? "border-b-2 border-purple-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("howToBuy")}
          >
            How to Buy
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === "faq" ? "border-b-2 border-purple-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto">
          {activeTab === "howToBuy" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">How to Buy TherapyDogCoin in the Presale</h2>
              <div className="prose max-w-none">
                {/* Render howToBuyContent passed from parent */}
                <ol className="list-decimal ml-6">
                  <li className="mb-4">
                    <strong>Download and Install Phantom Wallet:</strong>
                    <ul className="list-disc ml-6">
                      <li>
                        Visit the{" "}
                        <a
                          href="https://phantom.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Phantom Wallet website
                        </a>
                        .
                      </li>
                      <li>Download and install the wallet extension for your browser.</li>
                      <li>Create a new wallet or import an existing one.</li>
                    </ul>
                  </li>
                  <li className="mb-4">
                    <strong>Add SOL to Your Phantom Wallet:</strong>
                    <ul className="list-disc ml-6">
                      <li>You’ll need SOL to buy the presale tokens and cover network fees.</li>
                    </ul>
                  </li>
                  <li className="mb-4">
                    <strong>Connect Your Phantom Wallet to Our Website:</strong>
                    <ul className="list-disc ml-6">
                      <li>Click on the <strong>Connect Wallet</strong> button.</li>
                    </ul>
                  </li>
                  <li className="mb-4">
                    <strong>Enter the Amount of SOL:</strong>
                    <ul className="list-disc ml-6">
                      <li>Enter the desired amount and click <strong>Buy</strong>.</li>
                    </ul>
                  </li>
                  <li className="mb-4">
                    <strong>Confirm the Purchase:</strong>
                    <ul className="list-disc ml-6">
                      <li>Approve the transaction in Phantom Wallet and confirm the details.</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div>
                {faqContent.map((faq, index) => (
                  <div key={index} className="mb-4">
                    <button
                      className="text-lg font-semibold text-purple-600 hover:underline focus:outline-none"
                      onClick={() => handleFaqToggle(index)}
                    >
                      {faq.question}
                    </button>
                    {openFAQ === index && (
                      <p className="mt-2 text-gray-700 transition-all ease-in-out duration-300">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
