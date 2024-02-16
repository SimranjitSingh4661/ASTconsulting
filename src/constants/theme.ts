import {Dimensions} from 'react-native';

export enum FONTS {
  regular = 'System',
}

const {height, width} = Dimensions.get('window');

export const COLORS = {
  PRIMARY: '#2A4BA0',
  SECONDARY: '#153075',
  LIGHT_BLUE: '#4b71d1',
  YELLOW_DARK: '#F9B023',
  YELLOW_LIGHT: '#FFC83A',
  BORDER_GREY: '#535353',
  TEXT_GREY: '#8891a5',
  BORDER_RED: '#A90808',
  TEXT_GREY_LIGHT: '#6e6e6e',
  LIKE: '#FF8181',
  WHITE: 'white',
  BLACK: 'black',
  BLUE: '#1C568C',
  lightBlue: '#F1F5F9',
  red: '#EC1C24',
  golden: '#FFC05A',
  textInputBlack: '#04131F',
  textGray: '#878997',
  brandRed: '#FB4D58',
  WELCOME_GRADIENT: ['#f6d5f7', '#fbe9d7'],
};

export const FONT_SIZE = {
  SM: 12,
  MD: 16,
  LG: 20,
};

export const SCREEN_PADDING = 20;

export const SCREEN = {
  HEIGHT: height,
  WIDTH: width,
};
