function Builder() {}

Builder.prototype.Schema =
  "<a:help>Allows the unit to construct and repair buildings.</a:help>" +
  "<a:example>" +
  "<Rate>1.0</Rate>" +
  "<Entities datatype='tokens'>" +
  "\n    structures/{civ}_barracks\n    structures/{civ}_civil_centre\n    structures/pers_apadana\n  " +
  "</Entities>" +
  "</a:example>" +
  "<element name='Rate' a:help='Construction speed multiplier (1.0 is normal speed, higher values are faster)'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='Entities' a:help='Space-separated list of entity template names that this unit can build. The special string \"{civ}\" will be automatically replaced by the unit&apos;s four-character civ code. This element can also be empty, in which case no new foundations may be placed by the unit, but they can still repair existing buildings'>" +
  "<attribute name='datatype'>" +
  "<value>tokens</value>" +
  "</attribute>" +
  "<text/>" +
  "</element>";

Builder.prototype.Init = function() {};

Builder.prototype.Serialize = null; // we have no dynamic state to save

Builder.prototype.GetEntitiesList = function() {
  var entities = [];
  var string = this.template.Entities._string;
  if (string) {
    // Replace the "{civ}" codes with this entity's civ ID
    var cmpIdentity = Engine.QueryInterface(this.entity, IID_Identity);

    // we select who can build structures

    // ---  Slave and Farmer Can build

    if (cmpIdentity.HasClass("Builder")) {
      //error("Schiava");
      if (cmpIdentity)
        string = string.replace(/\{civ\}/g, cmpIdentity.GetCiv());
      entities = string.split(/\s+/);

      // Remove disabled entities
      var cmpPlayer = QueryOwnerInterface(this.entity, IID_Player);
      var disabledEntities = cmpPlayer.GetDisabledTemplates();

      for (var i = entities.length - 1; i >= 0; --i)
        if (disabledEntities[entities[i]]) entities.splice(i, 1);
    }
    //error(entities);
    return entities;
  }
};

Builder.prototype.GetEntitiesListSpecial = function() {
  var entities = [];
  var string = this.template.Entities._string;
  if (string) {
    // Replace the "{civ}" codes with this entity's civ ID
    var cmpIdentity = Engine.QueryInterface(this.entity, IID_Identity);

    // we select who can build structures

    // ---  Slave and Farmer Can build

    //error("Schiava");
    if (cmpIdentity) string = string.replace(/\{civ\}/g, cmpIdentity.GetCiv());
    entities = string.split(/\s+/);

    // Remove disabled entities
    var cmpPlayer = QueryOwnerInterface(this.entity, IID_Player);
    var disabledEntities = cmpPlayer.GetDisabledTemplates();

    for (var i = entities.length - 1; i >= 0; --i)
      if (disabledEntities[entities[i]]) entities.splice(i, 1);

    //error(entities);
    return entities;
  }
};

Builder.prototype.GetBuilderQuotation = function(rawMaterials) {
  //we get the earning rate
  var cmpEntityFinance = Engine.QueryInterface(this.entity, IID_EntityFinance);
  let earningRate = cmpEntityFinance.GetEarningRate();
  // we calculate cost of product and hourPay
  let cmpProductsManager = Engine.QueryInterface(
    SYSTEM_ENTITY,
    IID_ProductsManager
  );
  for (let material in rawMaterials) {
    // first we get market price for each product
    //cmpProductsManager.InitMarket();
  }
};

Builder.prototype.GetRange = function() {
  var cmpObstruction = Engine.QueryInterface(this.entity, IID_Obstruction);
  var max = 2;
  if (cmpObstruction) max += cmpObstruction.GetUnitRadius();

  return { max: max, min: 0 };
};

Builder.prototype.GetRate = function() {
  return ApplyValueModificationsToEntity(
    "Builder/Rate",
    +this.template.Rate,
    this.entity
  );
};
/**
 * Build/repair the target entity. This should only be called after a successful range check.
 * It should be called at a rate of once per second.
 * Returns obj with obj.finished==true if this is a repair and it's fully repaired.
 */
Builder.prototype.PerformBuilding = function(target) {
  let rate = ApplyValueModificationsToEntity(
    "Builder/Rate",
    +this.template.Rate,
    this.entity
  );

  // If it's a foundation, then build it
  let cmpFoundation = Engine.QueryInterface(target, IID_Foundation);
  if (cmpFoundation) {
    cmpFoundation.Build(this.entity, rate);
    return;
  }

  // Otherwise try to repair it
  let cmpRepairable = Engine.QueryInterface(target, IID_Repairable);
  if (cmpRepairable) {
    cmpRepairable.Repair(this.entity, rate);
    return;
  }
};

Engine.RegisterComponentType(IID_Builder, "Builder", Builder);
