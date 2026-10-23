if (typeof window !== 'undefined' && typeof window.dispatchEvent !== 'function') {
  window.dispatchEvent = () => true;
}

const mockStorage = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn((key, value) => {
      mockStorage[key] = value;
      return Promise.resolve(null);
    }),
    getItem: jest.fn(key => Promise.resolve(mockStorage[key] || null)),
    removeItem: jest.fn(key => {
      delete mockStorage[key];
      return Promise.resolve(null);
    }),
    clear: jest.fn(() => {
      Object.keys(mockStorage).forEach(k => delete mockStorage[k]);
      return Promise.resolve(null);
    }),
  },
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  const InsetsContext = React.createContext(inset);
  const FrameContext = React.createContext(frame);

  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children(inset),
    SafeAreaView: ({ children, style }) => children,
    SafeAreaInsetsContext: InsetsContext,
    SafeAreaFrameContext: FrameContext,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame,
  };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({ children }) => children,
    PanGestureHandler: ({ children }) => children,
    TapGestureHandler: ({ children }) => children,
    State: {},
    Directions: {},
    GestureDetector: ({ children }) => children,
  };
});

// Mock lottie-react-native
jest.mock('lottie-react-native', () => {
  const React = require('react');
  const View = require('react-native').View;
  return React.forwardRef((props, ref) => React.createElement(View, props));
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const View = require('react-native').View;
  return {
    __esModule: true,
    default: {
      View: View,
      Text: require('react-native').Text,
      ScrollView: require('react-native').ScrollView,
      createAnimatedComponent: (c) => c,
    },
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    useAnimatedScrollHandler: (handlers) => (typeof handlers === 'function' ? handlers : (handlers.onScroll || (() => { }))),
    interpolate: (val, input, output) => output[1] ?? output[0],
    Extrapolation: {
      CLAMP: 'clamp',
      EXTEND: 'extend',
      IDENTITY: 'identity',
    },
    withTiming: (toValue, config, cb) => {
      if (cb) cb(true);
      return toValue;
    },
    withSpring: (toValue, config, cb) => {
      if (cb) cb(true);
      return toValue;
    },
    withDelay: (delay, anim) => anim,
    withRepeat: (anim) => anim,
    withSequence: (...anims) => anims[0],
    runOnJS: (fn) => fn,
    Easing: {
      out: () => (t) => t,
      in: () => (t) => t,
      cubic: (t) => t,
      ease: (t) => t,
      linear: (t) => t,
    },
  };
});
