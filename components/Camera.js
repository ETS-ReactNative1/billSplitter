import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { View, Container, Text, Pressable, Image } from 'native-base';
//import testImage from '../assets/ocr-test-image.jpeg';
const axios = require('axios');

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const capture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({ base64: true });
      console.log('This is data in the Camera Component', data);
      setImage(data.base64);

      console.log(
        'This is Image in the camera Component, after setting Image',
        image,
      );
      // const headers = {
      //   apiKey: 'K81848835288957',
      // };
      // const body = {
      //   language: 'eng',
      //   isOverlayRequired: false,
      //   url: 'http://dl.a9t9.com/ocrbenchmark/eng.png',
      //   iscreatesearchlabelpdf: false,
      //   issearchablepdfhidetextlayer: false,
      // };

      axios
        .post('https://api.ocr.space/parse/image', body, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      const options = {
        method: 'POST',
        url: 'https://api.ocr.space/parse/image',
        body: {
          language: 'eng',
          isOverlayRequired: false,
          url: 'http://dl.a9t9.com/ocrbenchmark/eng.png',
          iscreatesearchlabelpdf: false,
          issearchablepdfhidetextlayer: false,
          //apiKey: 'K81848835288957',
        },
        headers: {
          apiKey: 'K81848835288957',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      /*
       STEP 1 : have image = base64 string
       STEP 2 : make axios call to api route
       STEP 3 : Receive text from image conversion
       STEP 4 : Pass that text to OCR COmponent for the user to view!
       */

      navigation.navigate('OCRComponent');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //this shows the image after capture delete if not needed
  if (image) {
    return <Image source={{ uri: image }} flex={1} alt="receipt" />;
  }

  return (
    <View flex={1}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => setCamera(ref)}
      >
        <Container
          flex={1}
          backgroundColor="transparent"
          flexDirection={'row'}
          mb="10"
          ml="5"
        >
          <Pressable
            flex={0.1}
            alignSelf="flex-end"
            alignItems="center"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text color="white" fontSize="lg">
              Flip
            </Text>
          </Pressable>
          <Pressable
            flex={0.9}
            alignSelf="flex-end"
            alignItems="center"
            onPress={() => capture()}
          >
            <Text color="white" fontSize="lg">
              Capture
            </Text>
          </Pressable>
        </Container>
      </Camera>
    </View>
  );
}
