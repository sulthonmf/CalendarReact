import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface PaddingWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
}

const PaddingWrapper: React.FC<PaddingWrapperProps> = ({ children, style }) => {
  return (
    <View style={{ paddingLeft: 10, paddingRight: 10, ...style }}>
      {children}
    </View>
  );
};

export default PaddingWrapper;
