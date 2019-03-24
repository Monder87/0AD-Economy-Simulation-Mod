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
  // kush
  this.kushCities = [
    "Napata﻿",
    "Meroë﻿",
    "Naqa",
    "Kawa",
    "Tabo",
    "Sanam",
    "Dangeil",
    "Basa",
    "Sedeinga",
    "Sonijat ",
    "Muweis",
    "Karanog",
    "Dakka",
    "Hamadab﻿﻿",
    "Amara﻿ East"
  ];
  this.kushCityCounter = 0;
  this.kushCityCounter2 = 1;
};

CityNameGenerator.prototype.GenerateCityName = function(civ) {
  if (this.cartCityCounter % this.cartCities.length == 0) {
    this.cartCityCounter2 += 1;
  }
  if (this.kushCityCounter % this.kushCities.length == 0) {
    this.kushCityCounter2 += 1;
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
  } else if (civ == "kush") {
    let city = this.kushCities[0];
    this.kushCities.shift();
    let city2 = city.replace(/[0-9]/g, "");
    this.kushCities.push(`${city2}${this.kushCityCounter2}`);
    this.kushCityCounter += 1;
    return city;
  }
};

Engine.RegisterSystemComponentType(
  IID_CityNameGenerator,
  "CityNameGenerator",
  CityNameGenerator
);
