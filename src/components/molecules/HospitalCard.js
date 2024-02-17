import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {SharedStyles} from '../../shared';
import {StyledText} from '../atoms';
import {CloseIcon} from '../../asstes/SVGs';
import {COLORS} from '../../constants';

const HospitalCard = ({
  rating,
  status,
  name,
  address,
  onHospitalClosePress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.constiner}>
        <View style={styles.row}>
          <StyledText
            textStyle={styles.title}
            containerStyle={SharedStyles.fullFlex}>
            {'Hospital Name: '}
            <Text style={styles.text}>{name || ''}</Text>
          </StyledText>
          <Pressable onPress={onHospitalClosePress}>
            <CloseIcon />
          </Pressable>
        </View>
        {status && (
          <StyledText textStyle={styles.title}>
            {'Hospital Status: '}
            <Text style={styles.text}>{status || ''}</Text>
          </StyledText>
        )}
        {rating && (
          <StyledText textStyle={styles.title}>
            {'Hospital Rating: '}
            <Text style={styles.text}>{rating || ''}</Text>
          </StyledText>
        )}
        {address && (
          <StyledText textStyle={styles.title}>
            {'Hospital Address: '}
            <Text style={styles.text}>{address || ''}</Text>
          </StyledText>
        )}
      </View>
    </View>
  );
};

export default HospitalCard;

const styles = StyleSheet.create({
  card: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
  },
  constiner: {
    width: '90%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
    ...SharedStyles.shadow,
    backgroundColor: COLORS.WHITE,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    padding: 2,
    fontSize: 12,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  text: {
    color: COLORS.PRIMARY,
  },
});
