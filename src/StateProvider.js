import React, { createContext, useContext, useReducer } from "react";
//Prepares the data layer
export const StateContext = createContext();
//wrap your app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
//Pull Information from data layer
export const useStateValue = () => useContext(StateContext);
export default StateProvider;
