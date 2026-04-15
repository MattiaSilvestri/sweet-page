import { DEFAULT_SETTINGS } from "./defaults";

const ACCENT_COLORS = {
  mauve: { hex: '#cba6f7', rgb: '203, 166, 247' },
  blue:  { hex: '#89b4fa', rgb: '137, 180, 250' },
  teal:  { hex: '#94e2d5', rgb: '148, 226, 213' },
  green: { hex: '#a6e3a1', rgb: '166, 227, 161' },
  peach: { hex: '#fab387', rgb: '250, 179, 135' },
};

export function applyAccentColor(name) {
  const c = ACCENT_COLORS[name] || ACCENT_COLORS.mauve;
  document.documentElement.style.setProperty('--accent', c.hex);
  document.documentElement.style.setProperty('--accent-rgb', c.rgb);
}

function parseFormData(form) {
  const raw = Object.fromEntries(new FormData(form));

  return Object.fromEntries(
    [...form.elements]
      .filter(el => el.name)
      .map(el => {
        const value = raw[el.name];
        switch (el.dataset.type) {
          case "boolean": return [el.name, value === "true" || el.checked];
          case "number": return [el.name, Number(value)];
          default: return [el.name, value];
        }
      })
  );
}

export function readSettings() {
  const storedSettings = JSON.parse(localStorage.getItem("settings"));
  return storedSettings ? storedSettings : DEFAULT_SETTINGS
}

export function saveSettings(modal) {
  const form = document.querySelector("#settings-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = parseFormData(form);
    localStorage.setItem("settings", JSON.stringify(data));
    applyAccentColor(data['accent-color']);
    window.dispatchEvent(new CustomEvent("settings-changed", { detail: data }));
    modal.classList.remove("open");
  });
}
