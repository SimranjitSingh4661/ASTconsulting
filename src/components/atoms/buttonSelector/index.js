import React from 'react';
import StyledText from '../styledText';
import {COLORS} from '../../../constants';
import {StyleSheet, Pressable, View} from 'react-native';

const ButtonSelector = ({activeTab, onChange, btns = []}) => {
  return (
    <View style={styles.container}>
      {btns.map((item, index) => {
        return (
          <Pressable
            key={`btns-${index}`}
            style={[
              styles.btn,
              {
                backgroundColor:
                  activeTab === item ? COLORS.BLUE : COLORS.WHITE,
              },
            ]}
            onPress={() => onChange(item)}>
            <StyledText
              color={activeTab === item ? COLORS.WHITE : COLORS.BLUE}
              textStyle={styles.text}>
              {item}
            </StyledText>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ButtonSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    elevation: 4,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
  },
  btn: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
