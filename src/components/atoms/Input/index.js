import React, {useState, forwardRef} from 'react';
import {TextInput, View, Text} from 'react-native';
import {COLORS} from '../../../constants';
import styles from './styles';

export default forwardRef(
  (
    {
      error,
      onPress = null,
      leftIcon = null,
      rightIcon = null,
      editable = true,
      isCount = false,
      isValid = false,
      totalDigits = null,
      isCounterWhite = false,
      containerStyle = {},
      label = '',
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    let borderColor = onPress ? COLORS.WHITE : '#CCCCCC';
    const backgroundColor = COLORS.WHITE;

    if (isFocused) borderColor = COLORS.BLUE;
    if (error) borderColor = COLORS.red;
    if (isValid) borderColor = COLORS.golden;

    return (
      <View style={[containerStyle]}>
        <Text style={styles.lableText}>{label}</Text>
        <View style={[styles.container, {backgroundColor, borderColor}]}>
          {leftIcon}
          <TextInput
            ref={ref}
            editable={editable}
            {...props}
            placeholderTextColor={COLORS.TEXT_GREY}
            style={[
              styles.textInput,
              {marginLeft: leftIcon ? 6 : 0},
              props?.style,
            ]}
            onFocus={() => {
              setIsFocused(true);
              props?.onFocus?.();
            }}
            onBlur={e => {
              setIsFocused(false);
              props?.onBlur?.(e);
            }}
          />
          {rightIcon}
        </View>
      </View>
    );
  },
);
