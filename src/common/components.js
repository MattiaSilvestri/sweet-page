import { LinkButton, Tab } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };
import { SettingsModal } from "../components/modal.js";
import { readSettings, saveSettings } from "./settings.js";
import { SearchBar } from "../components/searcBar.js";

function addLinkButtons(tab) {
  for (const [key, value] of Object.entries(tab.links)) {
    new LinkButton({
      text: key,
      iconColor: value["icon-color"],
      icon: value.icon,
      container: document.getElementById(tab.config.name),
      href: value.link
    })
  }
}

export function addSearchBar() {
  new SearchBar();
}

export function addTab() {
  for (const [key, value] of Object.entries(config.bookmarks)) {
    const tab = new Tab({
      text: key,
      links: value.links
    })
    addLinkButtons(tab);
  }
}

export function addModal() {
  const settings = readSettings();
  const settingsModal = new SettingsModal({
    searchEngine: settings ? settings["search-engine"] : null,
    newTab: settings ? settings["open-in-new-tab"] : null,
    accentColor: settings ? settings["accent-color"] : null,
  })
  // Open modal
  document.getElementById("settings").addEventListener("click", () => modal.classList.add("open"));
  // Close modal
  const modal = document.getElementById("settings-modal");
  modal.querySelector("#settings-close").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
  // Save settings
  modal.querySelector("#settings-save").addEventListener("click", saveSettings(modal));
}
