//function openSlave() {
//  Engine.GetGUIObjectByName("panelContainer").hidden = false;
//}

//function closeSlave() {
//  Engine.GetGUIObjectByName("panelContainer").hidden = true;
//}

//function toggleSlave() {
//  Engine.GetGUIObjectByName(
//    "panelContainer"
//  ).hidden = !Engine.GetGUIObjectByName("panelContainer").hidden;
//}

function openCommand() {
  Engine.GetGUIObjectByName("unitCommandvvPanel").hidden = false;
  Engine.GetGUIObjectByName("unitConsumePanel").hidden = true;
  Engine.GetGUIObjectByName("unitProducePanel").hidden = true;
  Engine.GetGUIObjectByName("unitConstructionPanel").hidden = true;
  Engine.GuiInterfaceCall("RightPanelFocused", "Command");
}

function openConsume() {
  Engine.GetGUIObjectByName("unitCommandvvPanel").hidden = true;
  Engine.GetGUIObjectByName("unitConsumePanel").hidden = false;
  Engine.GetGUIObjectByName("unitProducePanel").hidden = true;
  Engine.GetGUIObjectByName("unitConstructionPanel").hidden = true;
  Engine.GuiInterfaceCall("RightPanelFocused", "Consume");
}

function openProduce() {
  Engine.GetGUIObjectByName("unitCommandvvPanel").hidden = true;
  Engine.GetGUIObjectByName("unitConsumePanel").hidden = true;
  Engine.GetGUIObjectByName("unitProducePanel").hidden = false;
  Engine.GetGUIObjectByName("unitConstructionPanel").hidden = true;
  Engine.GuiInterfaceCall("RightPanelFocused", "Produce");
}
function openConstruction() {
  Engine.GetGUIObjectByName("unitCommandvvPanel").hidden = true;
  Engine.GetGUIObjectByName("unitConsumePanel").hidden = true;
  Engine.GetGUIObjectByName("unitProducePanel").hidden = true;
  Engine.GetGUIObjectByName("unitConstructionPanel").hidden = false;
  Engine.GuiInterfaceCall("RightPanelFocused", "Construction");
}
