function CityNameGenerator() {}

CityNameGenerator.prototype.Schema =
  "<a:help>Generate the cities centers name.</a:help>" + "<empty/>";

CityNameGenerator.prototype.Init = function() {
  this.Cities = {};
  this.cartCities = [
    "Malaca",
    "Carthage",
    "Utique",
    "Hippo Regius",
    "Gades",
    "Saguntum",
    "Panormus",
    "Lilybaeum",
    "Hadrumetum",
    "Zama Regia"
  ];

  this.cartCityCounter = 0;
  this.cartCityCounter2 = 1;
};

CityNameGenerator.prototype.GenerateCityName = function(civ) {
  if (this.cartCityCounter % 10 == 0) {
    this.cartCityCounter2 += 1;
  }
  if (civ == "cart") {
    // we choose first
    let city = this.cartCities[0];
    // we eliminate the first from top list and we copy again on the button
    this.cartCities.shift();
    // we delete possible numbers
    let city2 = city.replace(/[0-9]/g, "");
    this.cartCities.push(`${city2}${this.cartCityCounter2}`);
    // we addd the counter
    this.cartCityCounter += 1;

    // we return th name
    return city;
  }
};

Engine.RegisterSystemComponentType(
  IID_CityNameGenerator,
  "CityNameGenerator",
  CityNameGenerator
);
