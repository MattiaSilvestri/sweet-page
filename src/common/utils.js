export function openTab(cityName, { evt = null, btn = null } = {}) {
  if (!evt && !btn) {
    throw new Error("openTab requires either evt or btn to be provided");
  }
  // Declare all variables 
  let tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (let content of tabcontent) {
    content.style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (let link of tablinks) {
    link.className = link.className.replace("active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  const target = btn || evt.currentTarget;
  target.className += " active";

  // Save in local storage
  localStorage.setItem("tab", cityName);
}

export function loadTab() {
  const tab = localStorage.getItem("tab") || document.querySelector("button.tablinks").dataset.city;
  if (tab) {
    const btn = document.querySelector(`button[data-city='${tab}']`);
    openTab(tab, { btn: btn });
  }
}

