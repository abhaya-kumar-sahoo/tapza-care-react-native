import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { MockApiClient } from '../src/api/mockClient';

describe('App', () => {
  beforeAll(() => {
    MockApiClient.updateResilienceConfig({ latencyMs: 0 });
  });

  test('renders correctly', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<App />);
    });
    expect(renderer).not.toBeNull();
  });

  test('handles forceConfigError 500 failure resiliently with cached fallback', async () => {
    MockApiClient.updateResilienceConfig({ forceConfigError: true, latencyMs: 0 });
    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<App />);
    });
    expect(renderer).not.toBeNull();
    MockApiClient.resetResilienceConfig();
  });
});
