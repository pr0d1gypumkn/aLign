import {
  Platform,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';


import React from 'react';
import {Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import { Camera, useCameraPermission } from 'react-native-vision-camera'


// Shamelessly stolen from the react default page to request permissions 
function requestPermissions() {
  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA],
    android: [PERMISSIONS.ANDROID.CAMERA],
    default: [],
  }) ?? [];

  permissions.forEach(async (permission) => {
    const status = await check(permission);
    if (status !== RESULTS.GRANTED) {
      await request(permission);
    }
  });
}



const HelloWorldApp = () => {

    // Stolen From react
    const [showSplash, setShowSplash] = useState(true);
  
    useEffect(() => {
        requestPermissions();
        const timeout = setTimeout(() => setShowSplash(false), 1200);
        return () => clearTimeout(timeout);
    }, []);

    // Once we have permission we can use the camera view
    
    return (
      <Camera
        style={{ flex: 1 }}
        isActive={true}
        device="back"
       />
  );
};
export default HelloWorldApp;