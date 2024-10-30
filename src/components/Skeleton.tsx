import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Skeleton = ({ width, height }: { width: number, height: number }) => {
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(x, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000
    })).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.box, { height: height, width: width }]}>
        <AnimatedLinearGradient 
          colors={['#cfd0d0', '#8d9398', '#cfd0d0']} 
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [
              {
              translateX: x.interpolate({
                inputRange: [0, 1],
                outputRange: [-width, width]
              })
              }
            ]
          }} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    borderRadius: 8,
    backgroundColor: '#cfd0d0',
    overflow: 'hidden'
  },
  line: {
    ...StyleSheet.absoluteFillObject
  }
});
