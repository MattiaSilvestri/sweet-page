import { LinkButton } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };


export function addTab() {
  for (const [key, value] of Object.entries(config)) {
    const tab = new Tab({
      text: key,
      type: value.type,
      fgColor: value["fg-colour"],
      bgColor: value["bg-colour"],
      // icon: value.icon,
    })
  }
}

export function addLinkButton() {
  for (const [key, value] of Object.entries(tab.links)) {
    const linkButton = new LinkButton({
      text: key,
      type: "primary",
      size: "medium",
      container: document.getElementById("links"),
      fgColor: value["fg-colour"],
      bgColor: value["bg-colour"],
      onClick: () => {
        window.open(value.link, "_blank");
      },
    })
  }
}
