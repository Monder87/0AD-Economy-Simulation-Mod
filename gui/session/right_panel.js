function openSlave() {
  Engine.GetGUIObjectByName("panelContainer").hidden = false;
}

function closeSlave() {
  Engine.GetGUIObjectByName("panelContainer").hidden = true;
}

function toggleSlave() {
  Engine.GetGUIObjectByName(
    "panelContainer"
  ).hidden = !Engine.GetGUIObjectByName("panelContainer").hidden;
}
