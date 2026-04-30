import { readSettings } from "../common/settings";

export class Banner {
  constructor(options) {
    this.settings = readSettings();
  }

  render() {
    const banner = document.querySelector("img#banner");
    banner.src = `banners/${this.settings.banner}`;
    banner.alt = "Banner";

    // Reload settings reactively
    window.addEventListener("settings-changed", (e) => {
      banner.src = `banners/${e.detail["banner"]}`;
    });
    banner.classList.add("w-96", "h-60", "object-cover");
  }
}
