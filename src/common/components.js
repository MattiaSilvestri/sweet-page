import { LinkButton } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };

for (const [key, value] of Object.entries(config)) {
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
