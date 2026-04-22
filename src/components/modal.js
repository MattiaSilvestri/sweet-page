import { readSettings } from "../common/settings";

export class SettingsModal {
  constructor() {
    const settings = readSettings();
    this.settings = {
      searchEngine: settings["search-engine"],
      newTab: settings["open-in-new-tab"],
      showSeconds: settings["show-seconds"]
    }
    this.modal = document.getElementById("settings-modal");

    this.render();
  }

  populateGeneral() {
    // Populate search engines options and set default
    const engines = [
      { value: "google", label: "Google" },
      { value: "duckduckgo", label: "DuckDuckGo" },
      { value: "brave", label: "Brave" },
    ]

    const searchEngineSelect = this.modal.querySelector("#search-engine");
    engines.forEach(({ value, label }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      searchEngineSelect.appendChild(option);
      searchEngineSelect.value = this.settings.searchEngine
    });

    // Populate new tab option
    const newTabCheckbox = this.modal.querySelector("#open-in-new-tab");
    newTabCheckbox.checked = this.settings.newTab

    // Populate clock options
    const secondsCheckBox = this.modal.querySelector("#show-seconds");
    secondsCheckBox.checked = this.settings.showSeconds
  }

  render() {
    this.populateGeneral();
  }
}

export class ImagePicker {
  constructor(options) {
    this.images = options.images;
    this.settings = readSettings();
  }

  render() {
    const imgPicker = document.getElementById("img-picker");
  }
}
