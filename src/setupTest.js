import { vi } from 'vitest';
vi.mock('react-intl', () => {
  const i18n = vi.importActual('@edx/frontend-platform/i18n');
  const { formatMessage } = vi.importActual('testUtils');
  return {
    ...i18n,
    useIntl: vi.fn(() => ({ formatMessage })),
    defineMessages: m => m,
  };
});

vi.mock('react', () => ({
  ...vi.importActual('react'),
  useEffect: vi.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
  useRef: vi.fn((val) => ({ current: val, useRef: true })),
}));
