# Overview

Framework for testing Microsoft Dynamics 365 for Finance and Operations.

- Reusable functions are defined in `User.js`.
- Data for each test case is defined in `Data.xlsx`.
- `Dropdowns.xlsx` contains lists of values for [RVL dropdowns](https://rapisedoc.inflectra.com/Guide/rvl_editor/#param-dropdowns).
- `Output.xlsx` is used to persist data between test executions (see SetOutputValue, GetOutputValue common functions below).
 
The way of test parameterization and reading data from an Excel spreadsheet is described in the docs:

[Data-Driven Testing](https://rapisedoc.inflectra.com/Guide/ddt/)

## Browser Profiles

The framework includes a [local browser profile](https://rapisedoc.inflectra.com/Guide/browser_settings/#local-browser-profiles) located in `Profiles\BrowserProfiles` folder. It is a profile for Chrome. The profile to use is specified in `User.js` file and is used globally by all test cases:

```javascript
g_browserLibrary = "Chrome";
```

You may change the profile in `User.js` or pass `g_browserLibrary` value from SpiraTest or via command line.

## Common Functions

All functions are defined in [User.js](User.js). Look into this file for details.

### DfoLaunch

Launches Dynamics 365 for Finance and Operations in a browser. Dynamics365FOUrl, UserName, Password must be set in Config.xlsx

### DfoPassWelcomeScreen

Passes through welcome messages: Dive in...

### DfoSelectCompany

Clicks on the current company in the top right corner of the main page, then expands the dropdown with the list of available companies and selects the required one. 

### DfoSearchPage

Searches for a page. Use to perform initial navigation.

### DfoWait

Waits until "Please wait. We're processing your request" message disappears.

### DfoMenu

Navigates to a page via menu. Use path to the menu as an argument. 

Example:  

`Modules;Product information management;Products;Released products`

### DfoClickButton

Clicks toolbar button. E.g. New, Edit, Delete.

### DfoExpandCombobox

Expands a combobox on a form.

### DfoSetFieldText

Enters text into a field. Specify field name and text value.

### DfoClickFormButton

Clicks button on a form.

### SetOutputValue

Writes key/value pair to Output.xlsx

### GetOutputValue

Reads value from Output.xlsx
