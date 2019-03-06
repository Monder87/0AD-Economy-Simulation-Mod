function EntityHappiness() {}

EntityHappiness.prototype.Schema =
  "<element name='HappinessIcon'>" + "<data type='decimal'/>" + "</element>";

EntityHappiness.prototype.Init = function() {
  this.happiness = null;
  this.iconName = null;
};

EntityHappiness.prototype.OnTimerEntityHappinessUpdate = function(msg) {
  this.GetIconName();
  Engine.BroadcastMessage(MT_EntityHappinessValueChanged, {
    icon: this.iconName,
    happiness: this.happiness
  });
};

EntityHappiness.prototype.CalculateHappinessLevel = function() {
  let cmpEntityConsumer = Engine.QueryInterface(
    this.entity,
    IID_EntityConsumer
  );
  let prCarring = cmpEntityConsumer.GetProductCarring();
  let prCapacities = cmpEntityConsumer.GetProductCapacities();
  let percentsAry = [];
  for (let type in prCarring) {
    let percent =
      100 * Math.max(0, Math.min(1, prCarring[type] / prCapacities[type]));

    percentsAry.push(percent);
  }
  let sum = 0;
  for (let i = 0; i < percentsAry.length; i++) {
    sum += percentsAry[i];
  }
  let happiness = sum / percentsAry.length / 100;
  this.happiness = Math.floor(happiness * 100) / 100;
  return this.happiness;
  //this.SendIconNameToStatusBarCmp(this.happiness);
};

EntityHappiness.prototype.GetIconName = function() {
  this.CalculateHappinessLevel();

  let iconName;
  if (this.happiness > 0.8) {
    iconName = "happy";
  } else if (this.happiness > 0.6 && this.happiness <= 0.8) {
    iconName = "happy8";
  } else if (this.happiness > 0.4 && this.happiness <= 0.6) {
    iconName = "happy6";
  } else if (this.happiness > 0.2 && this.happiness <= 0.4) {
    iconName = "happy4";
  } else if (this.happiness > 0 && this.happiness <= 0.2) {
    iconName = "happy2";
  }
  this.iconName = iconName;
  return iconName;
};

EntityHappiness.prototype.RecordValue = function(value) {
  this.happiness = value;
  Engine.BroadcastMessage(MT_EntityHappinessValueChanged, { value: value });
};

Engine.RegisterComponentType(
  IID_EntityHappiness,
  "EntityHappiness",
  EntityHappiness
);
