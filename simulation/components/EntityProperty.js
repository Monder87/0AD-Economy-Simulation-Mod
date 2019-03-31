function EntityProperty() {}

EntityProperty.prototype.Schema =
  "<a:help>track the property of the entity.</a:help>" + "<empty/>";

EntityProperty.prototype.Init = function() {
  this.owner = null;
};

EntityProperty.prototype.GenerateProperty = function(civ) {
  let civs = {
    gaia: "Gaia",
    athen: "Athenians",
    brit: "Britons",
    cart: "Carthaginians",
    gaul: "Gauls",
    iber: "Iberians",
    mace: "Macedonians",
    maur: "Mauryans",
    pers: "Persians",
    ptol: "Ptolemies",
    rome: "Romans",
    sele: "Seleucids",
    spart: "Spartans"
  };
  for (let c in civs) {
    if (c == civ) {
      civ = civs[c];
    }
  }
  this.owner = `King of ${civ}`;
};

EntityProperty.prototype.SetOwner = function(ent) {
  this.owner = ent;
};
EntityProperty.prototype.GetOwner = function() {
  return this.owner;
};

Engine.RegisterSystemComponentType(
  IID_EntityProperty,
  "EntityProperty",
  EntityProperty
);
