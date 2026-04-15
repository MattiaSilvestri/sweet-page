export function applySettings() {
  const settings = readSettings();
  const form = document.querySelector("#search-form");
  const prompt = document.querySelector(".prompt-path");
  if (settings) {
    const searchEngine = settings["search-engine"];
    const newTab = settings["open-in-new-tab"];
    // Apply search engine setting
    switch (searchEngine) {
      case "google":
        form.action = "https://www.google.com/search";
        prompt.textContent = `~/google`;
        break;
      case "duckduckgo":
        form.action = "https://duckduckgo.com/";
        prompt.textContent = `~/duckduckgo`;
        break;
      case "brave":
        form.action = "https://search.brave.com/search";
        prompt.textContent = `~/brave`;
        break;
    }
  }
}

export function readSettings() {
  return JSON.parse(localStorage.getItem("settings"));
}

export function saveSettings(modal) {
  const form = document.querySelector("#settings-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    localStorage.setItem("settings", JSON.stringify(data));
    applySettings();
    modal.classList.remove("open");
  });
}

