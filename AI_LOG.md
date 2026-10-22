# AI Collaboration Log — Tapza Care

This document records the interaction, prompts, architectural decisions, rejections, and learnings during the development of the Tapza Care React Native mobile assignment.

---

## 1. Prompts That Worked Effectively

### A. Strict Tokenization & Server-Driven Schema Definition
- **Prompt Strategy**: Providing exact TypeScript interfaces for `LayoutConfig`, `ThemeConfig`, and section union types (`HeroBannerItem | CategoryChipsItem | QuickActionsItem | ServiceGridItem | DoctorCarouselItem | OfferStripItem`) before writing any UI components.
- **Why It Worked**:
  - Prevented ad-hoc styling and color drift across screens.
  - Enforced that section components consume props strictly derived from the remote config rather than local state.
  - Enabled the safe skipping of unrecognized section types (`return null;`) without throwing unhandled exceptions.

### B. Two-Phase Optimistic Slot Booking with 409 Rollback
- **Prompt Strategy**: Explicitly requesting an optimistic reconciliation flow:
  1. Immediately mark slot as reserved locally and transition UI to pending state.
  2. Send asynchronous reservation request to `MockApiClient.createBooking()`.
  3. If API responds with `409 Conflict` (slot taken), immediately revert local state, invalidate cached slots, show an actionable error banner ("Slot taken — please choose another"), and refresh available slots.
- **Why It Worked**:
  - Accurately matches high-concurrency clinic reservation flows where multiple family members or patients attempt to book the same morning doctor slot simultaneously.
  - Allowed writing deterministic unit tests (`__tests__/booking.test.ts`) that test race conditions and simulated conflicts.

### C. Offline Cache & Stale-While-Revalidate Fallback
- **Prompt Strategy**: Defining an explicit resilience requirement: when `MockApiClient.getConfig()` fails (500 Internal Server Error or network offline), attempt to load the last successful layout configuration persisted in `AsyncStorage`. If present, render the cached layout with an informational alert banner (`"Could not refresh remote configuration. Displaying saved offline layout."`).
- **Why It Worked**:
  - Satisfied the assignment's mid-range Android in tier-2/3 connectivity requirement where mobile internet dropouts are frequent.

---

## 2. Prompts That Failed or Needed Iteration

### A. Relying on React Native's Legacy `SafeAreaView` on Fabric Architecture
- **Failure**: Initial prompt generated standard `import { SafeAreaView } from 'react-native'`.
- **Issue**: On React Native 0.88 with the New Architecture (Fabric) enabled, React Native's built-in `SafeAreaView` is deprecated and renders with 0 height or improper padding on edge-to-edge Android displays.
- **Correction**: Replaced with `SafeAreaProvider` and `useSafeAreaInsets` / `SafeAreaView` from `react-native-safe-area-context`, ensuring reliable status bar and navigation bar insets.

### B. Unmocked `@react-native-async-storage/async-storage` in Native Jest Environment
- **Failure**: Running unit tests with Jest threw `ReferenceError: window is not defined` or native module binding errors when importing `@react-native-async-storage/async-storage`.
- **Correction**: Configured an in-memory storage mock in `jest.setup.js` simulating `getItem`, `setItem`, and `removeItem` asynchronously.

### C. Async Latency Timers in CLI Test Suites
- **Failure**: Initial test run of `MockApiClient.createBooking` timed out or hung because default simulated latency was 350ms, leaving active setTimeout handles after test suite teardown.
- **Correction**: Explicitly added `beforeAll(() => MockApiClient.updateResilienceConfig({ latencyMs: 0 }))` in test suites to ensure instant, deterministic execution.

---

## 3. What Was Rejected from AI Suggestions

### 1. Rejection of Third-Party UI Kits (NativeBase, Paper, Tailwind/NativeWind)
- **AI Suggestion**: Use Tailwind/NativeWind or a heavy UI framework to quickly compose screens.
- **Why Rejected**:
  - The assignment requirement specifically demands a **Zepto-style dynamic layout engine** where colors, typography, paddings, and section backgrounds change dynamically at runtime via remote JSON.
  - Utility CSS engines like Tailwind compile classes statically ahead of time. Passing dynamic remote hex codes, gradient stops, and spacing values via remote JSON works much cleaner with pure, tokenized React Native `StyleSheet` objects and CSS/React Native style objects.
  - Keeps the bundle lightweight and free of unnecessary native dependencies, critical for mid-range Android devices.

### 2. Rejection of Vector Icon Bundles (react-native-vector-icons)
- **AI Suggestion**: Add `@expo/vector-icons` or `react-native-vector-icons` to get Ionicons/MaterialIcons.
- **Why Rejected**:
  - External icon font bundles add significant binary size and require font asset linking in Android Gradle.
  - The reference design features distinct Indian healthcare symbols: Diwali diya oil lamps, medicine capsule pills, stethoscopes, syringes, shields, and rating stars.
  - Handcrafted SVG icon components (`src/components/common/Icon.tsx`) provide crisp rendering, zero native linking issues, and customizable stroke/fill colors driven by the active theme tokens.

### 3. Rejection of Unsafe Section Crashes
- **AI Suggestion**: A switch-statement that throws an `Unhandled section type` error if an unknown section is received.
- **Why Rejected**:
  - In a true server-driven mobile architecture, backend administrators introduce new section types in future app releases. Old client versions must gracefully ignore unknown section types (`return null;`) and render all known sibling sections without crashing.

---

## 4. Where AI Slowed Down the Process

1. **Pixel-Coordinate Guesswork**: Attempting to interact with the Android emulator via hardcoded touch coordinates required manual calibration because the bottom sheet modal occupies a responsive percentage of the screen height.
2. **React Native 0.88 / Fabric Breaking Changes**: Standard online AI patterns often assume legacy architecture or React Native 0.70 conventions. React Native 0.88 has strict deprecation warnings around `ViewPropTypes`, `SafeAreaView`, and bridgeless TurboModules. Hand-tuning to modern New Architecture standards was required.

---

## 5. Summary of Architecture Built
- **Stack**: React Native 0.88, TypeScript, `bun` package manager.
- **Remote Config Layout Engine**: Zepto-style sectioned scroll where section type, content, background colors, and theme tokens are dictated by remote JSON.
- **Festival Remoting**: Instantly toggles between emerald green Normal Day and saffron/gold Diwali Festival without app release.
- **Resilience Controls**: Live in-app Dev Drawer allowing real-time latency throttling (0ms to 3000ms), 500 error injection with AsyncStorage fallback, and 409 slot conflict simulation.
- **Accessibility & Devices**: 44pt touch targets, scalable fonts, tested on Android API 35 (`Medium_Phone`).
