import { DEFAULT_CONFIG, DEFAULT_SETTINGS } from "./defaults";

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
    window.dispatchEvent(new CustomEvent("settings-changed", { detail: data }));
    modal.classList.remove("open");
  });
}

export function readConfig() {
  const storedConfig = JSON.parse(localStorage.getItem("config"));
  return storedConfig ? storedConfig : DEFAULT_CONFIG;
}

