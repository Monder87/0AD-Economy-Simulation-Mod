function CityNameGenerator() {}

CityNameGenerator.prototype.Schema =
  "<a:help>Generate the cities centers name.</a:help>" + "<empty/>";

CityNameGenerator.prototype.Init = function() {
  this.Cities = {};
  this.cartCities = [
    "Carthage",
    "Utique",
    "Hippo Regius",
    "Gades",
    "Saguntum",
    "Panormus",
    "Lilybaeum",
    "Hadrumetum",
    "Zama Regia",
    "Malaca"
  ];
};

CityNameGenerator.prototype.GenerateCityName = function(civ) {
  if (civ == "cart") {
    // we choose first
    let city = this.cartCities[0];
    // we eliminate the first from list
    this.cartCities.shift();
    // we return th name
    return city;
  }
};

Engine.RegisterSystemComponentType(
  IID_CityNameGenerator,
  "CityNameGenerator",
  CityNameGenerator
);
