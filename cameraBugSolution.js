```javascript
import * as Camera from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [isPreviewFrozen, setIsPreviewFrozen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlePreviewError = () => {
    setIsPreviewFrozen(true);
    setTimeout(() => {
      if (cameraRef.current) {
        cameraRef.current.resumePreview();
        setIsPreviewFrozen(false);
      }
    }, 2000);
  };

  if (hasPermission === null) {
    return <View />; // Loading...
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={cameraRef}
        onCameraReady={() => console.log('Camera ready')}
        onMountError={(error) => {
          console.error('Camera mount error:', error);
          handlePreviewError(); // Call error handler
        }}
      />
    </View>
  );
};


export default CameraScreen;
```