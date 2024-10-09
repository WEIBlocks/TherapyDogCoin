import React, { createContext } from "react";
export const therapyContext = createContext();

export const TherapyContextProvider = ({ children }) => {
	return (
		<therapyContext.Provider value={{}}>{children}</therapyContext.Provider>
	);
};
