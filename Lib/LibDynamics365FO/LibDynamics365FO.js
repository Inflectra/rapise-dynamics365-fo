// Put library code here

function DFO_Launch()
{
	DfoLaunch();
}

function DFO_PassWelcomeScreen()
{
	DfoPassWelcomeScreen();
}

function DFO_SelectCompany(/**string*/ company)
{
	DfoSelectCompany(company);
}

function DFO_SearchPage(/**string*/ page)
{
	DfoSearchPage(page);
}

function DFO_Wait()
{
	DfoWait();
}

function DFO_Menu(/**string*/ menu)
{
	DfoMenu(menu);
}

function DFO_ClickButton(/**string*/ button)
{
	DfoClickButton(button);
}

function DFO_SetFieldText(/**string*/ field, /**string*/ text)
{
	DfoSetFieldText(field, text);
}

function DFO_ExpandCombobox(/**string*/ field)
{
	DfoExpandCombobox(field);
}

function DFO_ClickFormButton(/**string*/ button)
{
	DfoClickFormButton(button)
} 

function DFO_SearchRecords(/**string*/ value)
{
	DfoSearchRecords(value);
}

function DFO_GridAddNewRow(/**objectId*/ grid, /**objectId*/ button)
{
	DfoGridAddNewRow(grid, button);
}

if (typeof(SeSGlobalObject) != "undefined")
{
	SeSGlobalObject("DFO");
}