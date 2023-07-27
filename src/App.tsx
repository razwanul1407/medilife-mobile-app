import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import RootNavigation from 'src/navigation/RootNavigation';

const queryClient = new QueryClient();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};
const App = () => (
  <PaperProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </QueryClientProvider>
  </PaperProvider>
);

export default App;
