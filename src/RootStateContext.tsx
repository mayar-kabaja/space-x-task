/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { LaunchsStore, MissionsStore } from './mobx';

type RootStateContextValue = {
  launchsStore: LaunchsStore;
  missionsStore: MissionsStore;
};

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);
const launchsStore = new LaunchsStore();
const missionsStore = new MissionsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <RootStateContext.Provider value={{ launchsStore, missionsStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
