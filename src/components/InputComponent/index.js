import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Slide } from '../../animations';
import globalStyle from '../../theme/globalStyle';
const Input = ({children, ...props}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showAnimated, setShowAnimated] = useState(false);
  const handleFocus = () => {
    setShowAnimated(true);
    setShowPlaceholder(false);
  };
  return (
    <View style={[styles.containerInput,props.style]}>
      {showAnimated && (
        <View style={styles.title}>
          <Slide direction="vertical">
            <Text>{children}</Text>
          </Slide>
        </View>
      )}
      <TextInput
        placeholder={showPlaceholder ? props.placeholder : ''}
        onFocus={handleFocus}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  containerInput: {
    borderColor: globalStyle.mainColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 17,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  title: {
    backgroundColor: 'white',
    position: 'absolute',
    ...globalStyle.textMedium,
    paddingHorizontal: 4,
    paddingVertical: 2,
    left: 12,
    top: '-80%',
  },
});
