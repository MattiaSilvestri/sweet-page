import { LinkButton, Tab } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };
import { SettingsModal } from "../components/modal.js";
import { readSettings, saveSettings } from "./settings.js";
import { SearchBar } from "../components/searcBar.js";

function addLinkButtons(tab) {
  for (const [key, value] of Object.entries(tab.links)) {
    new LinkButton({
      text: key,
      container: document.getElementById("links"),
      iconColor: value["icon-color"],
      icon: value.icon,
      container: document.getElementById(tab.config.name), // Create inside tab
      href: value.link
      // onClick: () => {
      //   window.open(value.link);
      // },
    })
  }
}

export function addSearchBar() {
  new SearchBar();
}

export function addTab() {
  for (const [key, value] of Object.entries(config)) {
    // Create new tab first
    const tab = new Tab({
      text: key,
      links: value.links
    })

    // Add buttons for this tab
    addLinkButtons(tab);
  }
}

export function addModal() {
  // Read settings from config and create modal
  // const settings = Object.fromEntries(Object.entries(config.settings))
  const settings = readSettings();
  new SettingsModal({
    searchEngine: settings ? settings["search-engine"] : null,
    newTab: settings ? settings["open-in-new-tab"] : null,
  })
  // Append settings modal event handlers //
  // Open modal
  const modal = document.getElementById("settings-modal");
  document.getElementById("settings").addEventListener("click", () => modal.classList.add("open"));
  // Close modal
  modal.querySelector("#settings-close").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
  // Save settings
  modal.querySelector("#settings-save").addEventListener("click", () => saveSettings(modal));
}
