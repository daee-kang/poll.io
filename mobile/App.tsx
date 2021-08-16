import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import RootNav from './RootNav';

//navigator type exports
export type AuthStackParamList = {
  SignIn: undefined,
  SignUp: undefined;
};

//async function for fetch fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'avenir-heavy': require('./assets/Fonts/Metropolis-SemiBold.otf'),
    'avenir-medium': require('./assets/Fonts/Metropolis-Medium.otf'),
    'avenir-roman': require('./assets/Fonts/AvenirLTStd-Roman.otf'),
    'avenir-light': require('./assets/Fonts/Metropolis-Light.otf')
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