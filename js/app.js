/////////////////////////////////////////
//         GET ELEMENTS
/////////////////////////////////////////
let panel = document.getElementById("preference-panel");
var main = document.getElementById("main-content");
/////////////////////////////////////////
//         TOGGLE THE DISPLAY
//         OF USER PREFERENCES PANEL
/////////////////////////////////////////

function togglePreferencePanel() {
  //get css style declaration object of the current computed styling of the element.
  var panelStyle = getComputedStyle(panel);

  if (panelStyle.display == "none") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}
/////////////////////////////////////////
//    Preference object for testing
/////////////////////////////////////////
var testPreferences = {
  backgroundColor: "blue",
  fontSize: "22px",
  color: "magenta",
};

/////////////////////////////////////////
//    Function to set preferences
/////////////////////////////////////////
/****************************************
 * Name: setPreferences()
 * Purpose: Set the <main> font size and color, <main> Background-color
 * Parameters: (1) name: preferences type: Object
 ****************************************/

function setPreferences(preferences) {
  // if the key of backgroundColor is present in the object - set the background color to its value
  if (preferences.backgroundColor != undefined) {
    main.style.backgroundColor = preferences.backgroundColor;
  }
  // Otherwise log "no key of backgroundColor found in preferences object"
  else {
    console.log("no key of backgroundColor found in preferences object");
  }
  // if the key of color is present in the object - set the color in <main> to its value

  if (preferences.color != undefined) {
    main.style.color = preferences.color;
  }
  // Otherwise log "no key of color found in preferences object"
  else {
    console.log("no key of color found in preferences object");
  }
  // if the key of fontSize is present in the object - set the fontsize in <main> to its value

  if (preferences.fontSize != undefined) {
    main.style.fontSize = preferences.fontSize;
  }
  // Otherwise log "no key of fontSize found in preferences object"
  else {
    console.log("no key of fontSize found in preferences object");
  }
}

// call the setPreferences function on click of the test button in the preferences panel
let testBtn = document
  .getElementById("test-btn")
  .addEventListener("click", () => {
    setPreferences(testPreferences);
  });
