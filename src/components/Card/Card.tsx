import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface CardProps {
  title?: string;
  children: ReactNode;
  cardStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  cardStyle,
  titleStyle,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={[styles.card, cardStyle]}>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // paddingVertical: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 8,
    color: 'black'
  },
  content: {},
});

export default Card;
