import { LinkButton, Tab } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };

function addLinkButton(tab) {
  for (const [key, value] of Object.entries(tab.links)) {
    new LinkButton({
      text: key,
      type: "primary",
      size: "medium",
      container: document.getElementById("links"),
      fgColor: value["fg-colour"],
      bgColor: value["bg-colour"],
      icon: value.icon,
      container: document.getElementById(tab.config.name), // Create inside tab
      onClick: () => {
        window.open(value.link, "_blank");
      },
    })
  }
}

export function addTab() {
  for (const [key, value] of Object.entries(config)) {
    // Create new tab first
    const tab = new Tab({
      text: key,
      type: value.type,
      fgColor: value["fg-colour"],
      bgColor: value["bg-colour"],
      // icon: value.icon,
      links: value.links
    })

    // Add buttons for this tab
    addLinkButton(tab);
  }
}

