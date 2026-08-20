import './style.css'
import { loadTab, openTab } from "./common/utils";
import { addClock, addModal, addPoetry, addSearchBar, addTab } from "./common/components";
import "iconify-icon";
import { Banner } from './components/banner';
import { JsonEditor } from './components/jsonEditor';
import { DEFAULT_CONFIG } from "./common/defaults";

document.addEventListener("DOMContentLoaded", () => {

  // Load default config if needed
  if (!JSON.parse(localStorage.getItem("config"))) {
    localStorage.setItem('config', JSON.stringify(DEFAULT_CONFIG));
  }
  // Add banner
  const banner = new Banner();
  banner.render();

  addClock();
  addPoetry(10);

  addSearchBar();
  addModal();
  addTab();
  // Event delegation: survives tab buttons being rebuilt (e.g. after saving
  // the json editor), unlike attaching listeners to each button directly.
  document.querySelector(".tabbed-container").addEventListener("click", evt => {
    const btn = evt.target.closest(".tablinks");
    const tabs = Array.from(document.getElementsByClassName('tablinks'));
    const index = tabs.indexOf(btn);
    if (!btn) return;
    openTab(btn.dataset.name, index, { btn, evt });
  });

  // Add Json editor
  const jsonEditor = new JsonEditor({ target: "jsoneditor-content" });
  jsonEditor.render();

  const addBookmarkBtn = document.getElementById("add-bookmark");
  const jsonEditorModal = document.getElementById("jsoneditor-modal");
  addBookmarkBtn.addEventListener("click", () => {
    jsonEditorModal.classList.add("open");
  });
  jsonEditorModal.addEventListener("click", (e) => {
    if (e.target === jsonEditorModal) jsonEditorModal.classList.remove("open");
  });
  jsonEditorModal.addEventListener("click", (e) => {
    if (e.target === jsonEditorModal.querySelector("#json-save")) jsonEditor.saveConfig();
  });


  // Load last tab
  loadTab();
})
