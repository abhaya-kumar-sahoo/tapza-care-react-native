import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { SectionRenderer } from '../src/components/sections/SectionRenderer';
import { ThemeProvider } from '../src/theme';
import { I18nProvider } from '../src/i18n';
import { BaseSectionConfig } from '../src/types';

describe('SectionRenderer', () => {
  const wrap = (component: React.ReactElement) => (
    <ThemeProvider>
      <I18nProvider>{component}</I18nProvider>
    </ThemeProvider>
  );

  test('renders category_chips section correctly', () => {
    const validSection: BaseSectionConfig = {
      id: 'test_sec_chips',
      type: 'category_chips',
      background: { kind: 'color', value: '#FFFFFF' },
      title: 'Explore by category',
      items: [
        { id: 'c1', name: 'Consult', icon: 'stethoscope' },
        { id: 'c2', name: 'Lab Tests', icon: 'flask' },
      ],
    };

    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(wrap(<SectionRenderer section={validSection} />));
    });

    expect(renderer).not.toBeNull();
    const tree = renderer!.toJSON();
    expect(tree).toBeDefined();
  });

  test('renders nothing (null) and NEVER crashes on unknown section type', () => {
    const unknownSection: BaseSectionConfig = {
      id: 'test_unknown_sec',
      type: 'teleportation_drone_delivery',
      background: { kind: 'color', value: '#000000' },
      title: 'Future Feature',
      items: [{ foo: 'bar' }],
    };

    let renderer: ReactTestRenderer.ReactTestRenderer | null = null;
    expect(() => {
      ReactTestRenderer.act(() => {
        renderer = ReactTestRenderer.create(wrap(<SectionRenderer section={unknownSection} />));
      });
    }).not.toThrow();

    // Unknown section returns null
    expect(renderer!.toJSON()).toBeNull();
  });
});
