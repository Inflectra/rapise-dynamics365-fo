//Put your custom functions and variables in this file

g_recordUrls = false;
g_objectNameMaxLength = 64;

g_browserLibrary = "Chrome";

function TestInit()
{
	if (g_entryPointName == "Test")
	{
		KillAllBrowsers();
	}

	Global.DoLoadObjects('%WORKDIR%/Objects.js');
	Navigator.QuitIfNotConnected = false;
	Navigator.EnsureVisibleVerticalAlignment = "center";
}

function TestFinish()
{
	if(Tester.GetTestStatus() != Tester.Pass)
	{
		Navigator.DoScreenshot();
	}

	if (g_entryPointName == "Test")
	{
		Tester.Message("About to close Navigator...");
		Navigator.Close();
		Tester.Message("Navigator closed");
		KillAllBrowsers();
	}
}

function KillAllBrowsers()
{
	Global.DoMouseMove(0, 0);
	Global.DoKillByName('iexplore.exe');
	Global.DoKillByName('firefox.exe');
	Global.DoKillByName('msedge.exe');
	Global.DoKillByName('chrome.exe');
	Global.DoKillByName('RapiseChromeProxy.exe');
}

function LogAssert(/**string*/ msg)
{
	Log(msg);
	Tester.Assert(msg, false);
}

function DfoFindObject(/**string*/ xpath)
{
	for(var i = 0; i < g_objectLookupAttempts; i++)
	{
		var obj = Navigator.Find(xpath);
		if (obj)
		{
			return obj;
		}
		Global.DoSleep(g_objectLookupAttemptInterval);
	}
	return null;
}

/**
 * Launches Dynamics 365 for Finance and Operations in a browser. Dynamics365FOUrl, UserName, Password must be set in Config.xlsx
 */
function DfoLaunch()
{
	var url = Global.GetProperty("Dynamics365FOUrl", "", "%WORKDIR%\\Config.xlsx");
	var usr = Global.GetProperty("UserName", "", "%WORKDIR%\\Config.xlsx");
	var pwd = Global.GetProperty("Password", "", "%WORKDIR%\\Config.xlsx");
	LoginMicrosoftOnline(url, usr, pwd);
}

/**
 * Passes through welcome messages: Dive in...
 */
function DfoPassWelcomeScreen()
{
	var xpath = "//span[.='Dive in!']";
	// Dive In!
	var obj = DfoFindObject(xpath);
	if (obj)
	{
		obj.object_name = "DiveIn";
		obj.DoClick();
		// Let's get started
		xpath = "//span[contains(.,'get started!')]";
		obj = DfoFindObject(xpath);
		if (obj)
		{
			obj.object_name = "GetStarted";
			obj.DoClick();
		}
	}
}

function DfoSelectCompany(/**string*/ company)
{
    Navigator.DoClickUntilOnScreen('G_CompanyButton', 'G_CompanyChooser', 10, 1000);
    SeS('G_CompanyChooser').DoOpen();
    SeS('G_CompanyLookup').DoClickCell(company, 1);
	Global.DoSleep(5000);
	DfoWait();
	
}

/**
 * Searches for a page.
 * @param page Name of a page.
 */
function DfoSearchPage(/**string*/ page)
{
	SeS("G_NavigationSearchBox").DoSearch(page);
	DfoWait();
}

/**
 * Waits until "Please wait. We're processing your request" message disappears.
 */
function DfoWait()
{
	Global.DoSleep(2000);

	var waitPane = Navigator.Find('//div[@id="ShellProcessingDiv"]');
	if (!waitPane)
	{
		return true;
	}
	
	var waitResult = Global.DoWaitForProperty(waitPane, '_DoDOMGetAttribute', 'display: none;', 300000, 'style');
	return waitResult != false;	
}

/**
 * Navigates to a page via menu.
 * @param menu Path to the menu. E.g. Modules;Product information management;Products;Released products
 */
function DfoMenu(/**string*/ menu)
{
	SeS("G_Menu").DoMenu(menu);
	DfoWait();
}

/**
 * Clicks a button. E.g. New, Edit, Delete
 * @param button Name of a button.
 */
function DfoClickButton(/**string*/ button)
{
	var xpath = "//button[@data-dyn-role='MenuItemButton' and .//span/text()='" + button + "']" + " | " + "//button[@data-dyn-role='CommandButton' and .//span/text()='" + button + "']";
	var obj = DfoFindObject(xpath)
	
	if (!obj)
	{
		LogAssert("DfoClickToolbarButton: button not found: " + button);
		return;
	}
	
	obj.object_name = button;
	obj.DoClick();
}

/**
 * Enter text into a field.
 * @param field Name of a field.
 * @param text Text to enter.
 */
function DfoSetFieldText(/**string*/ field, /**string*/ text)
{
	var xpath = "//label[text()='" + field + "']/../input[contains(@id,'Form')]";
	var obj = DfoFindObject(xpath);
	
	if (!obj)
	{
		LogAssert("DfoSetFieldText: field not found: " + field);
		return;
	}
	
	obj.object_name = field;
	obj.DoClick();
	obj.DoSetText(text);
	obj.DoSendKeys("{TAB}");
}

/**
 * Expands combobox.
 * @param field Name of a combobox.
 */
function DfoExpandCombobox(/**string*/ field)
{
	var xpath = "//label[contains(@id,'Form') and text()='" + field + "']/..//div[contains(@class,'lookupButton')]";
	var obj = DfoFindObject(xpath);
	
	if (!obj)
	{
		LogAssert("DfoExpandCombobox: field not found: " + field);
		return;
	}
	
	obj.object_name = field;
	obj.DoClick();
}

/** 
 * Clicks button on a form.
 * @param button Name of a button.
 */
function DfoClickFormButton(/**string*/ button)
{
	var xpath = "//button[contains(@id,'Form') and @data-dyn-role='CommandButton' and .//span/text()='" + button + "']";
	var obj = DfoFindObject(xpath)
	
	if (!obj)
	{
		LogAssert("DfoClickFormButton: field not found: " + button);
		return;
	}
	
	obj.object_name = button;
	obj.DoClick();
} 

/**
 * Searches for records.
 * @param value Value to search for.
 */
function DfoSearchRecords(/**string*/ value)
{
	var input = DfoFindObject("//input[@name='QuickFilterControl_Input']");
	var button = DfoFindObject("//button[@title='Apply filter']");
	
	if (!input)
	{
		LogAssert("DfoSearchRecords: input field not found");
		return;
	}
	
	if (!button)
	{
		LogAssert("DfoSearchRecords: button field not found");
		return;
	}
	
	
	input.object_name = "SearchField";
	button.object_name = "SearchButton";
	
	input.DoClick();
	input.DoSetText(value);
	button.DoClick();
}

/**
 * Clicks new line button and waits for grid to get a new line.
 * @param grid Id of a grid object
 * @param button Id of a new line button
 */
function DfoGridAddNewRow(/**objectId*/ grid, /**objectId*/ button)
{
	var result = false;
	var gridObj = SeS(grid);
	var buttonObj = SeS(button);
	var rowCount = gridObj.GetRowCount();
	
	buttonObj.DoClick();
	for(var i = 0; i < 60; i++)
	{
		var newRowCount = gridObj.GetRowCount();
		if (newRowCount > rowCount)
		{
			result = true;
			break;
		}
		Global.DoSleep(1000);
	}
	Tester.Assert("New line added to " + grid, result);
}


/**
 * Writes key/value pair to Output.xlsx
 * @param key
 * @param value
 */
function SetOutputValue(/**string*/ key, /**string*/ value)
{
	Global.SetProperty(key, value, "%WORKDIR%\\Output.xlsx");
}

/**
 * Reads value from Output.xlsx
 * @param key
 * @param [defValue]
 */
function GetOutputValue(/**string*/ key, /**string*/ defValue)
{
	return Global.GetProperty(key, defValue, "%WORKDIR%\\Output.xlsx");
}

/**
 * Navigates to the specified URL and performs login at https://login.microsoftonline.com/
 * Opens a browser if necessary.
 * @param url
 * @param userName
 * @param password
 */
function LoginMicrosoftOnline(/**string*/ url, /**string*/ userName, /**string*/ password)
{
	var o = {
		"UseAnotherAccount": "//div[@id='otherTileText']",
		"UserName": "//input[@name='loginfmt']",
		"Sumbit": "//input[@type='submit']",
		"Password": "//input[@name='passwd' and @type='password']",
		"DontShowAgain": "//input[@name='DontShowAgain']",
		"No": "//input[@type='button' and @id='idBtn_Back']"
	};

	Navigator.Open(url);
	Navigator.SetPosition(0, 0);
	
	Tester.SuppressReport(true);

	try
	{
		if (Navigator.Find(o["UseAnotherAccount"]))
		{
			Navigator.Find(o["UseAnotherAccount"]).DoClick();	
		}
		
		Navigator.Find(o["UserName"]).DoSetText(userName);
		Navigator.Find(o["Sumbit"]).DoClick();
		Global.DoSleep(2000);
		Navigator.Find(o["Password"]).DoSetText(password);
		Navigator.Find(o["Sumbit"]).DoClick();
		Global.DoSleep(2000);
		
		if (Navigator.Find(o["DontShowAgain"]))
		{
			Navigator.Find(o["No"]).DoClick();	
		}
		
		Tester.SuppressReport(false);
		Tester.Message("Logged in as " + userName);
	}
	catch(e)
	{
		Tester.SuppressReport(false);	
		Tester.Message(e.message);
	}
}
