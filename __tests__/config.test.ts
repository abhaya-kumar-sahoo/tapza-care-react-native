import { normalLayoutConfig, diwaliLayoutConfig } from '../src/api/mockData';
import { LayoutConfig } from '../src/types';

describe('LayoutConfig Remote Config Validation', () => {
  const validateConfig = (config: LayoutConfig) => {
    expect(config.version).toBeGreaterThan(0);
    expect(config.theme).toBeDefined();
    expect(config.theme.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(config.theme.background).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(config.theme.surface).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(config.tabs).toBeInstanceOf(Array);
    expect(config.tabs.length).toBeGreaterThanOrEqual(4);
    expect(config.sections).toBeInstanceOf(Array);
    expect(config.sections.length).toBeGreaterThan(0);

    // Each section must have background and type
    config.sections.forEach(sec => {
      expect(sec.id).toBeDefined();
      expect(sec.type).toBeDefined();
      expect(['color', 'gradient', 'image']).toContain(sec.background.kind);
      expect(typeof sec.background.value).toBe('string');
    });
  };

  test('validates Normal Day layout config', () => {
    validateConfig(normalLayoutConfig);
    expect(normalLayoutConfig.theme.primary).toBe('#007A55');
    const hero = normalLayoutConfig.sections.find(s => s.type === 'hero_banner');
    expect(hero).toBeDefined();
  });

  test('validates Diwali Festival layout config', () => {
    validateConfig(diwaliLayoutConfig);
    expect(diwaliLayoutConfig.theme.festival?.name).toBe('Diwali');
    expect(diwaliLayoutConfig.theme.primary).toBe('#C83214');
    const hero = diwaliLayoutConfig.sections.find(s => s.type === 'hero_banner');
    expect(hero).toBeDefined();
    const heroItem = (hero?.items as any[])?.[0];
    expect(heroItem?.promoTitle).toBe('Flat 20% off');
  });
});
