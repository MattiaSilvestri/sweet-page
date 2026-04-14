import { animate } from "motion";

export function openTab(tabName, { evt = null, btn = null, skipAnimation = false } = {}) {
  // Find currently visible tab before changing anything
  const activeLink = document.querySelector(".tablinks.active");
  const prevContent = activeLink ? document.getElementById(activeLink.dataset.name) : null;

  // Remove active from all tab buttons
  const tablinks = document.getElementsByClassName("tablinks");
  for (let link of tablinks) {
    link.classList.remove("active");
  }

  const newContent = document.getElementById(tabName);

  if (skipAnimation || !prevContent || prevContent === newContent) {
    // Snap all off-screen, place active instantly
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let content of tabcontent) {
      content.style.transform = "translateY(-105%)";
      content.style.zIndex = "0";
    }
    newContent.style.transform = "translateY(0%)";
    newContent.style.zIndex = "1";
  } else {
    // New tab slides down from above (on top)
    // Old tab slides up behind it simultaneously
    newContent.style.zIndex = "2";
    prevContent.style.zIndex = "1";

    let opts = { duration: 0.4, ease: [0.323, 0.02, 0, 0.996] };

    animate(newContent, { transform: ["translateY(-105%)", "translateY(0%)"] }, opts);
    animate(prevContent, { transform: ["translateY(0%)", "translateY(-105%)"] }, opts)
  }

  const target = btn || (evt && evt.currentTarget);
  if (target) target.classList.add("active");

  localStorage.setItem("tab", tabName);
}

export function loadTab() {
  const firstBtn = document.querySelector("button.tablinks");
  const tabName = localStorage.getItem("tab") || (firstBtn ? firstBtn.dataset.name : null);
  if (tabName) {
    const btn = document.querySelector(`button[data-name='${tabName}']`);
    openTab(tabName, { btn, skipAnimation: true });
  }
}


export function openSettings() {
  const settings = document.getElementById("settings");
}
