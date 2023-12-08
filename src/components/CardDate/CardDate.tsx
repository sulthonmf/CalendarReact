import React, {ReactNode} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableHighlight,
} from 'react-native';

interface CardProps {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  subtitle2?: string | ReactNode;
  children?: ReactNode;
  cardStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  onPress?: () => void;
}

const CardDate: React.FC<CardProps> = ({
  title,
  subtitle,
  subtitle2,
  children,
  cardStyle,
  titleStyle,
  subtitleStyle,
  onPress,
}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.card, cardStyle]}>
        {typeof title === 'string' ? (
          <>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <View style={styles.separator} />
          </>
        ) : (
          title
        )}
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        )}
        {subtitle2 && (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle2}</Text>
        )}
        <View style={styles.content}>{children}</View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingVertical: 10,
    marginVertical: 10,
    width: 130,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
    alignSelf: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 8,
  },
  content: {},
});

export default CardDate;
