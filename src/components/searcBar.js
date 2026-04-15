import { readSettings } from "../common/settings";

export class SearchBar {
  constructor() {
    this.settings = readSettings();
    this.form = document.querySelector("#search-form");
    this.prompt = document.querySelector(".prompt-path");

    this.applySettings();

    // Reload settings reactively
    window.addEventListener("settings-changed", (e) => {
      this.settings = e.detail;
      this.applySettings();
    });
  }

  applySettings() {
    // Apply search engine setting
    const searchEngine = this.settings["search-engine"];
    switch (searchEngine) {
      case "google":
        this.form.action = "https://www.google.com/search";
        this.prompt.textContent = `~/google`;
        break;
      case "duckduckgo":
        this.form.action = "https://duckduckgo.com/";
        this.prompt.textContent = `~/duckduckgo`;
        break;
      case "brave":
        this.form.action = "https://search.brave.com/search";
        this.prompt.textContent = `~/brave`;
        break;
    }
    // Apply target blank settings
    this.form.target = this.settings["open-in-new-tab"] ? "_blank" : "_self";
  }
}
