/////////////////////////////////////////
//         TOGGLE THE DISPLAY
//         OF USER PREFERENCES PANEL
/////////////////////////////////////////
let panel = document.getElementById("preference-panel");

function togglePreferencePanel() {
  //get css style declaration object of the current computed styling of the element.
  var panelStyle = getComputedStyle(panel);

  if (panelStyle.display == "none") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}
