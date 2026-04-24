import { useState, useEffect } from "react";

const SETTINGS_KEY = "app_settings_v1";

const DEFAULT_SETTINGS = {
  tone: "classic",
  volume: 0.7,
  darkMode: false,
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.body.classList.toggle("dark", settings.darkMode);
  }, [settings.darkMode]);

  const updateSetting = (key, value) =>
    setSettings((s) => ({ ...s, [key]: value }));

  return { settings, updateSetting };
}
