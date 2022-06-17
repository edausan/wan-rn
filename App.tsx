import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { LineupModel } from './Types/Lineup';
import LINEUP from './constants/Lineup';

import { store } from './redux/app/store';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { addLineup } from './redux/slice/lineupSlice';

export type CtxModel = {
  data: LineupModel[];
  setData: React.Dispatch<React.SetStateAction<LineupModel[]>>;
  handleSave?: () => void;
  isSaving: boolean;
};

export const LineupCtx = React.createContext<CtxModel>({
  data: [],
  setData: () => {},
  handleSave: () => {},
  isSaving: false,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [data, setData] = useState<LineupModel[]>(LINEUP.LINEUP);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setData(LINEUP.LINEUP);
  }, []);

  const handleSave = () => {
    console.log('SAVING...');
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  const ctx_values: CtxModel = {
    data,
    setData,
    isSaving,
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StoreProvider store={store}>
        <LineupCtx.Provider value={ctx_values}>
          <SafeAreaProvider>
            <Provider>
              <Navigation colorScheme={colorScheme} />
            </Provider>
            <StatusBar />
          </SafeAreaProvider>
        </LineupCtx.Provider>
      </StoreProvider>
    );
  }
}
