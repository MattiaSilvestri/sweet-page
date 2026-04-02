export function openTab(evt, cityName) {
  // Declare all variables 
  let tabcontent, tablinks;
  const savedTab = localStorage.getItem("tab");

  // Get all elements with class="tabcontent" and hide them if necessary
  tabcontent = document.getElementsByClassName("tabcontent");
  for (let content of tabcontent) {
    if (content.id === savedTab) {
      content.style.display = "block";
      continue;
    }
    content.style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (let link of tablinks) {
    if (link.dataset.city === savedTab) {
      link.className += " active";
      continue;
    }
    link.className = link.className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
  // Save tab in localstorage to open next time
  localStorage.setItem("tab", cityName);
}

