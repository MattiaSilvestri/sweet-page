export class SettingsModal {
  constructor(options) {
    this.config = {
      searchEngine: options.searchEngine || "google",
      newTab: options.newTab || false,
      accentColor: options.accentColor || "mauve",
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
      searchEngineSelect.value = this.config.searchEngine
    });

    // Populate new tab option
    const newTabCheckbox = this.modal.querySelector("#open-in-new-tab");
    newTabCheckbox.checked = this.config.newTab

    // Populate accent color select
    const accentSelect = this.modal.querySelector("#accent-color");
    if (accentSelect) accentSelect.value = this.config.accentColor;
  }

  render() {
    this.populateGeneral();
  }
}
