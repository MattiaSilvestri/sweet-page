import { Button } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };

for (const [key, value] of Object.entries(config)) {
  const linkButton = new Button({
    text: key,
    type: "primary",
    size: "medium",
    container: document.getElementById("links"),
    onClick: () => {
      window.open(value.link, "_blank");
    },
  })
}
