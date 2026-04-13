export function openTab(tabName, { evt = null, btn = null } = {}) {
  if (!evt && !btn) {
    throw new Error("openTab requires either evt or btn to be provided");
  }
  // Declare all variables 
  let tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("board");
  for (let content of tabcontent) {
    content.style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (let link of tablinks) {
    link.className = link.className.replace("active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  const target = btn || evt.currentTarget;
  target.className += " active";

  // Save in local storage
  localStorage.setItem("tab", tabName);
}

export function loadTab() {
  const buttons = document.querySelector("button.tablinks");
  const tab = localStorage.getItem("tab") || buttons ? buttons.dataset.name : null;
  if (tab) {
    const btn = document.querySelector(`button[data-name='${tab}']`);
    openTab(tab, { btn: btn });
  }
}

