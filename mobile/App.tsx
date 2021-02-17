import React, { useEffect, useMemo, useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { AuthContext } from './context';
import RootNav from './RootNav';

//navigator type exports
export type AuthStackParamList = {
  SignIn: undefined,
  SignUp: undefined;
};

//async function for fetch fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'roboto-slab-bold': require('./assets/Fonts/RobotoSlab-Bold.ttf'),
    'roboto-slab': require('./assets/Fonts/RobotoSlab-Regular.ttf'),
    'roboto-slab-light': require('./assets/Fonts/RobotoSlab-Light.ttf')
  });
};

export default function App() {
  //for loading fonts
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err: any) => console.log(err)
      } />;
  }

  return (
    <RootNav />
  );
}