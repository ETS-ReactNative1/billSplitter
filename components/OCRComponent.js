import REACT from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const ocrSpace = require('ocr-space-api-wrapper');

//this is a sample picture url
const imageURL =
  'https://www.perkinselearning.org/sites/elearning.perkinsdev1.org/files/styles/interior_page_image__519x374_/public/alt%20text.jpg?itok=JTk6uicH';

//const imageURL = route.params;
// let text = `I'm empty`;

export default function OCRComponent(text) {
  try {
    const result = async () => {
      await ocrSpace(imageURL, {
        apiKey: 'K81848835288957',
      });
    };

    const text =
      result.ParsedResults[0].ParsedText.replace(/\r\n/g, ' ') ||
      `I'm empty`;
    console.log('THIS IS RESULTS in the OCR Component', text);
  } catch (error) {
    console.log(error);
  }

  return (
    <View flex={1}>
      <Text color="white" fontSize="lg">
        {' '}
        I am in the OCR Component!!!! {text}
      </Text>
    </View>
  );
}
