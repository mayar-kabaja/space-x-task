/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { LaunchsStore } from './mobx';

type RootStateContextValue = {
  launchsStore: LaunchsStore;
};

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);
const launchsStore = new LaunchsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <RootStateContext.Provider value={{ launchsStore }}>{children}</RootStateContext.Provider>;
};

export const useRootStore = () => React.useContext(RootStateContext);
