import { Button } from "../components/buttons.js";

const linkButton = new Button({
  text: "Link",
  type: "link",
  size: "medium",
  container: document.getElementById("links"),
  onClick: () => {
    window.open("https://www.google.com", "_blank");
  },
})
