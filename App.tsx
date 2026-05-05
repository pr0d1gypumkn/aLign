/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    requestPermissions();
    const timeout = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {showSplash ? <SplashScreen /> : <AppContent />}
    </SafeAreaProvider>
  );
}

function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashTitle}>aLign</Text>
      <Text style={styles.splashSubtitle}>
        Requesting camera and motion access...
      </Text>
    </View>
  );
}

function requestPermissions() {
  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MOTION],
    android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.BODY_SENSORS],
    default: [],
  }) ?? [];

  permissions.forEach(async (permission) => {
    const status = await check(permission);
    if (status !== RESULTS.GRANTED) {
      await request(permission);
    }
  });
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
  },
  splashSubtitle: {
    marginTop: 14,
    fontSize: 16,
    color: '#444444',
  },
});

export default App;
