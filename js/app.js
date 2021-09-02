/////////////////////////////////////////
//         GET ELEMENTS
/////////////////////////////////////////
let main = document.getElementById("main-content");
let sections = main.getElementsByTagName("section");
// PREFERENCE PANEL ELEMENTS
let panel = document.getElementById("preference-panel");
let bgColorPicker = document.getElementById("background-color-picker");
let fontColorPicker = document.getElementById("font-color-picker");
let fontSizeSlider = document.getElementById("font-range-slider");
let sliderDisplay = document.getElementById("slider-displayed-font-size");
// PREFERENCE PANEL BUTTONS
let prefsResetDefaults = document.getElementById("prefs-reset-defaults-btn");
let prefsSaveButton = document.getElementById("prefs-save-btn");
let prefsCancelButton = document.getElementById("prefs-cancel-btn");
// CONTACT SECTION ELEMENTS
let checkBoxes = document.getElementsByName("interests");
// TEST BUTTON
let testBtn = document.getElementById("test-btn");

/////////////////////////////////////////
//         EVENT LISTENERS
/////////////////////////////////////////
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<< CLICK >>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
// Event Listener (click) for test button
testBtn.addEventListener("click", () => {
  applyPreferences(testPreferences);
  // console.log(confirmAtLeast1InterestChecked());
});

// Event listener (click) for reset default button.
prefsResetDefaults.addEventListener("click", () => {
  if (localStorage["defaults"] != null) {
    // apply the preferences to the page
    applyPreferences(getPreferences("defaults"));
    // set the values in the preferences panel
    setPreferencePanelValues(getPreferences("defaults"));
    setPreferencePanelDisplayedFontSize();
  } else {
    console.log(
      "Cannot reset defaults as no default preferences were found in local storage"
    );
  }
});
// Event listener (click) for prefs save button.
prefsSaveButton.addEventListener("click", () => {
  // let userPreferences = getPreferencePanelValues();
  savePreferences(getPreferencePanelValues(), "userPreferences");
});
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<< CHANGE >>>>>>>>>>>>>>>>>//
//<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>//

// Event listener (change) for fontSizeSlider element.
fontSizeSlider.addEventListener("change", (e) => {
  setPreferencePanelDisplayedFontSize();
});

// Event listener (change) for any element within the preferences panel
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
  //Defaults preferences object
  let defaults = {
    backgroundColor: RGBToHex(getComputedStyle(sections[0]).backgroundColor),
    fontSize: parseInt(getComputedStyle(main).fontSize),
    color: RGBToHex(getComputedStyle(main).color),
  };
  //save the defaults to local storage
  savePreferences(defaults, "defaults");

  // if we have user preferences in local storage apply them and set values of the inputs in the pref panel.
  if (localStorage["userPreferences"] != null) {
    applyPreferences(getPreferences("userPreferences"));
    // set the values in the preferences panel
    setPreferencePanelValues(getPreferences("userPreferences"));
    setPreferencePanelDisplayedFontSize();
  } else {
    console.log("Window onLoad: No user preferences found in local storage");
  }

  setPreferencePanelDisplayedFontSize();
};

/////////////////////////////////////////
// Function to set values of the color
// Pickers and range in Prefs panel
/////////////////////////////////////////
/****************************************
 * Name: setPreferencePanelValues()
 * Purpose:
 * Parameters: (1) preferences Object
 * Returns: no return value
 ****************************************/
function setPreferencePanelValues(preferences) {
  bgColorPicker.value = preferences.backgroundColor;
  fontColorPicker.value = preferences.color;
  fontSizeSlider.value = preferences.fontSize;
}

/////////////////////////////////////////
//    Preference object for testing
/////////////////////////////////////////
let testPreferences = {
  backgroundColor: "#0000FF",
  fontSize: "22",
  color: "#FF00FF",
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
  let panelStyle = getComputedStyle(panel);
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
  let preferencesJSONstring = JSON.stringify(preferences);
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
let fetchedSettings = getPreferences("testSettings");
// console.log(fetchedSettings);

/////////////////////////////////////////
// Function To confirm if at least 1 checkbox
// has been checked
/////////////////////////////////////////
/****************************************
 * Name: confirmAtLeast1InterestChecked()
 * Purpose: confirm if at least 1 checkbox
 *          has been checked
 * Parameters: (0)
 * Returns: BOOLEAN
 ****************************************/
function confirmAtLeast1InterestChecked() {
  for (let checkbox of checkBoxes) {
    if (checkbox.checked) {
      return true;
    }
  }
  return false;
}
