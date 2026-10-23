import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export interface AnimatedTabPaneProps {
  isActive: boolean;
  direction?: 'left' | 'right' | 'none';
  children: React.ReactNode;
}

/**
 * AnimatedTabPane provides instant tab switching
 * while keeping all screens mounted so scroll position and state are preserved.
 */
export const AnimatedTabPane: React.FC<AnimatedTabPaneProps> = ({
  isActive,
  children,
}) => {
  return (
    <View
      style={[
        styles.pane,
        { display: isActive ? 'flex' : 'none', zIndex: isActive ? 10 : 1 },
      ]}
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  pane: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.slate[50],
  },
});

