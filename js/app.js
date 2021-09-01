/////////////////////////////////////////
//         GET ELEMENTS
/////////////////////////////////////////
var panel = document.getElementById("preference-panel");
var main = document.getElementById("main-content");

//Form Inputs
// var formName = document.getElementById("contact-form-name");
// var formAge = document.getElementById("contact-form-age");
// var formDob = document.getElementById("contact-form-dob");
// var formGender0 = document.getElementById("contact-form-gender_0");
// var formGender1 = document.getElementById("contact-form-gender_1");
// var formInterests0 = document.getElementById("contact-form-interests_0");
// var formInterests1 = document.getElementById("contact-form-interests_1");
// var formInterests2 = document.getElementById("contact-form-interests_2");
// var formInterests3 = document.getElementById("contact-form-interests_3");

/////////////////////////////////////////
//         EVENT LISTENERS
/////////////////////////////////////////
document
  .getElementById("background-color-picker")
  .addEventListener("change", (e) => {
    console.log("Background color picker changed", `value: ${e.target.value}`);
  });
document.getElementById("font-color-picker").addEventListener("change", (e) => {
  console.log("Font color picker changed", `value: ${e.target.value}`);
});
document.getElementById("font-range-slider").addEventListener("change", (e) => {
  console.log("Font size value changed", `value: ${e.target.value}`);
});
/////////////////////////////////////////
//      Function to update displayed font
//      size in preference panel
/////////////////////////////////////////
/****************************************
 *
 ****************************************/

/////////////////////////////////////////
//         TOGGLE THE DISPLAY
//         OF USER PREFERENCES PANEL
/////////////////////////////////////////
/****************************************
 * Name: togglePreferencePanel()
 * Purpose: toggle between display block an display none
 * Parameters: (0)
 ****************************************/

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
/////////////////////////////////////////
//   Add eventListener to text button
/////////////////////////////////////////
/************************************
 * call the setPreferences function on
 * click of the test button in the preferences panel
 *************************************/
let testBtn = document
  .getElementById("test-btn")
  .addEventListener("click", () => {
    setPreferences(testPreferences);
  });
////////////////////////////////////////////////
// Function to save preferences object in local storage
////////////////////////////////////////////////
/****************************************
 * Name: savePreferences()
 * Purpose:
 * 1 - create a JSON string of the preferences object
 * 2 - Save that JSON string and keyName to Local Storage
 * Parameters: (2) preferences(object), keyName(string)
 * preferences object should have keys of:
 * backgroundColor: "VALUE",
 * fontSize: "VALUE",
 * color: "VALUE",
 ****************************************/
function savePreferences(preferences, keyName) {
  var preferencesJSONstring = JSON.stringify(preferences);
  localStorage.setItem(keyName, preferencesJSONstring);
}
////////////////////////////////////////////////
// Function to retrieve preference object from
// local storage by given key name
////////////////////////////////////////////////
/****************************************
 * Name: getPreferences()
 * Purpose:
 *   - get a preferences object from local storage
 *     by a given keyName.
 *   - If it exists returns the preferences object.
 *   - Otherwise return null
 * Parameters: (1) keyName(string)
 ****************************************/
function getPreferences(keyName) {
  if (localStorage[keyName] != undefined) {
    console.log(`Preferences Object with keyName ${keyName}`);
    return JSON.parse(localStorage[keyName]);
  } else {
    console.error(
      `No preference Object with keyName: ${keyName} found in local storage`
    );
    return null;
  }
}

////////////////////////////////////////////////
// Test of the savePreferences Function with testPreferences
////////////////////////////////////////////////
// savePreferences(testPreferences, "testSettings");
var fetchedSettings = getPreferences("testSettings");
console.log(fetchedSettings);
