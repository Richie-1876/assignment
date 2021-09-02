/////////////////////////////////////////
//         GET ELEMENTS
/////////////////////////////////////////
var main = document.getElementById("main-content");
var panel = document.getElementById("preference-panel");
var bgColorPicker = document.getElementById("background-color-picker");
var fontColorPicker = document.getElementById("font-color-picker");
var fontSizeSlider = document.getElementById("font-range-slider");
var sliderDisplay = document.getElementById("slider-displayed-font-size");
var sections = main.getElementsByTagName("section");

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

// Event listener for change events on fontSizeSlider element.
fontSizeSlider.addEventListener("change", (e) => {
  setPreferencePanelDisplayedFontSize();
});

// Event listener for change events for any element within the preferences panel
panel.addEventListener("change", () => {
  applyPreferences(getPreferencePanelValues());
});

/////////////////////////////////////////
//        WINDOW ONLOAD
/////////////////////////////////////////
/****************************************
 * Name: Anonymous
 * Purpose: Run specified code when the page is fully loaded
 * Parameters: (0)
 ****************************************/
window.onload = function () {
  setPreferencePanelDisplayedFontSize();
};

/////////////////////////////////////////
//    Preference object for testing
/////////////////////////////////////////
var testPreferences = {
  backgroundColor: "blue",
  fontSize: "22",
  color: "magenta",
};

//////////////////////////////////////////////////
// Function to get values of all pref panel inputs
//////////////////////////////////////////////////
/*************************************************
 * Name: getPreferencePanelValues()
 * Purpose: generate a preferences object from the preference panel values.
 * Params: (0)
 * returns: A preference object - {
 *   backgroundColor: "VALUE",
 *   fontSize: "VALUE",
 *   color: "VALUE",
 * }
 ************************************************/
function getPreferencePanelValues() {
  return {
    backgroundColor: bgColorPicker.value,
    fontSize: fontSizeSlider.value,
    color: fontColorPicker.value,
  };
}

/////////////////////////////////////////
// Function to update displayed font
// size in preference panel
/////////////////////////////////////////
/****************************************
 * Name: setPreferencePanelDisplayedFontSize()
 * purpose:
 *  - get the value of the font-range-slider
 *  - update innerText of slider-displayed-font-size element <td>
 * Parameters: (0)
 * returns: No return value.
 ****************************************/
function setPreferencePanelDisplayedFontSize() {
  sliderDisplay.innerText = `Font size ${fontSizeSlider.value}px`;
}

/////////////////////////////////////////
// FUNCTION TO TOGGLE THE DISPLAY
//   OF USER PREFERENCES PANEL
/////////////////////////////////////////
/****************************************
 * Name: togglePreferencePanel()
 * Purpose: toggle between display block and display none
 * Parameters: (0)
 * returns: No return Value.
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
//    Function to set preferences
/////////////////////////////////////////
/****************************************
 * Name: applyPreferences()
 * Purpose: Set the <main> font size and color, <section> elements inside <main> Background-color
 * Parameters: (1) name: preferences type: Object
 ****************************************/

function applyPreferences(preferences) {
  if (preferences.backgroundColor != undefined) {
    // iterate through each element in the sections collection and set its backgroundColor to the preferences object backgroundColor.
    for (const section of sections) {
      section.style.backgroundColor = preferences.backgroundColor;
    }
  } else {
    console.log("no key of backgroundColor found in preferences object");
  }

  if (preferences.color != undefined) {
    main.style.color = preferences.color;
  } else {
    console.log("no key of color found in preferences object");
  }

  if (preferences.fontSize != undefined) {
    main.style.fontSize = `${preferences.fontSize}px`;
  } else {
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
    applyPreferences(testPreferences);
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
 * Returns: No return value.
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
 * returns: preferences object OR null.
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
