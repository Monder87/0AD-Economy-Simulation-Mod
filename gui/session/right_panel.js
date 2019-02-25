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
  Engine.GetGUIObjectByName("panelContainerCommand").hidden = false;
  Engine.GetGUIObjectByName("panelContainerConsume").hidden = true;
  Engine.GetGUIObjectByName("panelContainerProduce").hidden = true;
}

function openConsume() {
  Engine.GetGUIObjectByName("panelContainerCommand").hidden = true;
  Engine.GetGUIObjectByName("panelContainerConsume").hidden = false;
  Engine.GetGUIObjectByName("panelContainerProduce").hidden = true;
}

function openProduce() {
  Engine.GetGUIObjectByName("panelContainerCommand").hidden = true;
  Engine.GetGUIObjectByName("panelContainerConsume").hidden = true;
  Engine.GetGUIObjectByName("panelContainerProduce").hidden = false;
}
