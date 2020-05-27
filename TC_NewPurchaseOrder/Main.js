
function Test(params)
{
	RVL.DoPlayScript("%WORKDIR%\\TC_NewPurchaseOrder\\Main.rvl.xlsx", "RVL");
}

function GetPurchaseOrderNumber()
{
	var title = SeS('HeaderTitle').GetInnerText();
	var parts = title.split(':');
	if (parts.length == 2)
	{
		return Global.DoTrim(parts[0]);
	}
	return null;
}

g_load_libraries=["%g_browserLibrary%", "DomDynamicsAX"];


