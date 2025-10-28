import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext({
  mode: 'system', // 'system' | 'light' | 'dark'
  isDark: true,
  accent: '#5EE1FF',
  setMode: (_m) => {},
  toggleDark: () => {},
  setAccent: (_c) => {},
  setAccentFromWeather: (_cond) => {},
});

function pickAccentFromCondition(condition) {
  const key = String(condition || '').toLowerCase();
  if (key.includes('clear')) return '#FFD369';
  if (key.includes('cloud')) return '#8AB4F8';
  if (key.includes('rain') || key.includes('drizzle')) return '#5EE1FF';
  if (key.includes('thunder')) return '#7D5CFF';
  if (key.includes('snow')) return '#B3F0FF';
  if (key.includes('mist') || key.includes('fog')) return '#A3B1C6';
  return '#5EE1FF';
}

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState('system');
  const [accent, setAccent] = useState('#5EE1FF');

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';

  const toggleDark = useCallback(() => {
    // When user toggles dark manually, exit system mode
    if (mode === 'system') {
      setMode('dark');
    } else {
      setMode((m) => (m === 'dark' ? 'light' : 'dark'));
    }
  }, [mode]);
  const setAccentFromWeather = useCallback((condition) => {
    setAccent(pickAccentFromCondition(condition));
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, isDark, accent, toggleDark, setAccent, setAccentFromWeather }),
    [mode, setMode, isDark, accent, toggleDark, setAccentFromWeather]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}


