import { readSettings } from "../common/settings";

export class Banner {
  constructor(options) {
    this.settings = readSettings();
  }

  render() {
    const banner = document.querySelector("img#banner");
    banner.src = `banners/${this.settings.banner}`;
    banner.alt = "Banner";
    banner.classList.add("max-h-64", "w-auto", "object-contain");
  }
}
