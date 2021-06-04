
function Test(params)
{
	RVL.DoPlayScript("%WORKDIR%\\TC_ErpWakeUp\\Main.rvl.xlsx", "RVL");
	
	if(Tester.GetTestStatus() != Tester.Pass)
	{
		Navigator.DoScreenshot();
		if (g_entryPointName == "Test")
		{
			Navigator.Close();
			Navigator.KillBrowser();
		}
		WScript.Quit(-99); // blocked
	}
}

g_load_libraries=["%g_browserLibrary%", "DomDynamicsAX"];


