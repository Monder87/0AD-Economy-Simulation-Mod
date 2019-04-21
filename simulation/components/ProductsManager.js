//The structure of the market Object will be :
/*
this.market = [
  {
    cityCenter: Cityname,
    cityEntId: idCityCenter,
    pop: 104,
    happyness: 0.2
    producers: [
      {
        id:11,
        type: food_vendor,
        catalogue: {
          sausage: 2,
          bread: 4
        }
      },
      {
        id:14,
        type: clothes_vendor,
        catalogue: {
          leather_clothe: 2
        }
      }
    ],
    products: [{ sausage: 2 }, { bread: 4 }, { leather_clothe: 2 }]
  },
  {
  cityCenter: Cityname,
  cityEntId: idCityCenter,
  pop: 103,
  happyness: 0.5
    producers: [
      {
        id:1,
        type: food_vendor,
        catalogue: {
          sausage: 2,
          bread: 4
        }
      },
      {
        id:19,
        type: clothes_vendor,
        catalogue: {
          leather_clothe: 2
        }
      }
    ],
    products: [{ sausage: 2 }, { bread: 4 }, { leather_clothe: 2 }]
  }
];
*/

function ProductsManager() {}

ProductsManager.prototype.Schema =
  "<a:help>Manage all products prices and availability.</a:help>" + "<empty/>";

ProductsManager.prototype.Init = function() {
  this.dayOfMonth = 0;

  // here where we set all the game products

  this.products = {
    bread: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        grain: 5,
        wood: 10
      },
      processingTime: 1
    },
    cheese: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        milk: 5,
        wood: 10
      },
      processingTime: 2
    },
    sausage: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        herbs: 5,
        meat: 10,
        wood: 15
      },
      processingTime: 2
    },
    soup: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        herbs: 5,
        wood: 10
      },
      processingTime: 1
    },
    beer: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        herbs: 10,
        wood: 20,
        grain: 20
      },
      processingTime: 5
    },
    cake: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        milk: 15,
        fruit: 15,
        wood: 30
      },
      processingTime: 5
    },
    soap: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        oil: 15,
        meat: 30,
        wood: 20
      },
      processingTime: 1
    },
    broom: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        metal: 10,
        wood: 20
      },
      processingTime: 3
    },
    parfume: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        metal: 10,
        wood: 50,
        herbs: 50,
        oil: 30
      },
      processingTime: 10
    },
    woolenClothes: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        wool: 50,
        metal: 15,
        wood: 20
      },
      processingTime: 10
    },
    leatherClothes: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        meat: 40,
        wool: 30,
        metal: 10,
        wood: 25
      },
      processingTime: 20
    },
    shoes: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        wool: 20,
        metal: 15,
        wood: 20
      },
      processingTime: 15
    },
    banner: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        wool: 30,
        metal: 15,
        wood: 20
      },
      processingTime: 10
    },
    indoorDecoration: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        wool: 50,
        stone: 50,
        metal: 50,
        wood: 50
      },
      processingTime: 30
    },
    outdoorDecoration: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        stone: 100,
        metal: 50,
        wood: 80
      },
      processingTime: 40
    },
    jewellery: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        stone: 200,
        metal: 200,
        wood: 400
      },
      processingTime: 50
    },
    sword: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        stone: 20,
        metal: 50,
        wood: 50
      },
      processingTime: 15
    },
    bow: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        stone: 20,
        metal: 30,
        wood: 60
      },
      processingTime: 15
    },
    shield: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        stone: 30,
        metal: 80,
        wood: 10
      },
      processingTime: 20
    },
    engineParts: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      rawMaterial: {
        stone: 60,
        metal: 100,
        wood: 100
      },
      processingTime: 40
    },
    fish: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    milk: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    oil: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    herbs: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    wool: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    fruit: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    grain: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    meat: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    metal: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    wood: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    },
    stone: {
      available: 0,
      initialPrice: 5,
      actualPrice: 5,
      cost: 0,
      processingTime: 40
    }
  };
  this.test = [];
  // here where we store all consumes by city
  this.allCitiesConsumes = {};
  // here where we store all the product produces by city
  this.allCitiesProduction = {};
  // here where we store all stats
  this.statistics = {
    day: [
      {
        consumes: {},
        produced: {}
      }
    ]
  };
  // here where we store old data of market
  this.marketOld = [];
  // here where we store new data of the market
  this.marketNew = [];
  // we initialize the market for the first time
  this.InitMarket();
};
ProductsManager.prototype.GetProductPrice = function(type, cityID) {
  // we get the day stat
  let todayStat = this.statistics.day[this.statistics.day.length - 1];
  // we get the city stats of consumption and production of today
  let todayConsumeCityStat = todayStat.consumes[cityID];
  let todayProductionCityStat = todayStat.produced[cityID];

  // we calculate the ratio dividing supply for demand
  let ratio;
  if (todayProductionCityStat[type] && todayConsumeCityStat[type]) {
    ratio = todayProductionCityStat[type] / todayConsumeCityStat[type];
  } else if (!todayProductionCityStat[type] && todayConsumeCityStat[type]) {
    ratio = 0.1 / todayConsumeCityStat[type];
  } else if (todayProductionCityStat[type] && !todayConsumeCityStat[type]) {
    ratio = todayProductionCityStat[type] / 0.1;
  } else if (!todayProductionCityStat[type] && !todayConsumeCityStat[type]) {
    ratio = 1;
  }
  // we get the cost
  let cost = 0;
  // if is a processed product

  if (this.products[type].rawMaterial) {
    for (let rawMaterial in this.products[type].rawMaterial) {
      let costraw = this.GetProductPrice(rawMaterial, cityID);
      let totalCost = costraw * this.products[type].rawMaterial[rawMaterial];

      cost += totalCost;
    }
  } else {
    // otherwise we give a base cost of 1 dollar
    cost = 1;
  }
  //we define an avarage profit margin of 12% and we proportionate it with the ratio of supply and demand
  let markup = cost / 100 * 12 / ratio;
  // we calculate the price
  let price = cost + markup;
  return Math.round(price * 100) / 100;
};

ProductsManager.prototype.GetProductData = function(type) {
  for (let prType in this.products) {
    if (prType == type) {
      return {
        name: type,
        icon: `products/${type}.png`,
        data: this.products[type]
      };
    }
  }
};

ProductsManager.prototype.GetAllCivCenters = function() {
  // we got the player
  var players = Engine.QueryInterface(
    SYSTEM_ENTITY,
    IID_PlayerManager
  ).GetAllPlayers();
  // we take all city centers
  let cityCenters = [];
  let resourceDropsite;
  let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
  players.forEach(function(player) {
    for (let site of cmpRangeManager.GetEntitiesByPlayer(player)) {
      if (Engine.QueryInterface(site, IID_Identity).HasClass("CivCentre")) {
        cityCenters.push(site);
      }
    }
  });
  return cityCenters;
};

ProductsManager.prototype.GetAllCityProducts = function(center) {
  // we get the player
  var cmpOwnership = Engine.QueryInterface(center, IID_Ownership);
  if (!cmpOwnership || cmpOwnership.GetOwner() == INVALID_PLAYER)
    return undefined;
  var owner = cmpOwnership.GetOwner();

  // we get all resources
  var cmpPlayer = QueryPlayerIDInterface(owner);
  let playerResources = cmpPlayer.GetResourceCounts();
  //error(playerResources);

  // we set an avarage city range
  var range = 100;
  // we find all producers in city
  let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
  let producers = cmpRangeManager.ExecuteQuery(
    center,
    0,
    range,
    [owner],
    IID_EntityProducer
  );
  let consumers = cmpRangeManager.ExecuteQuery(
    center,
    0,
    range,
    [owner],
    IID_EntityConsumer
  );
  // to finish
  let avarageHappiness = 0;
  consumers.forEach(function(cons) {
    let cmpEntityConsumer = Engine.QueryInterface(cons, IID_EntityConsumer);
    let happy = cmpEntityConsumer.GetEntityHappyness();
    avarageHappiness += happy;
  });
  avarageHappiness = avarageHappiness / consumers.length;

  // we find all product sold for each producer and the city name

  let cmpIdentity = Engine.QueryInterface(center, IID_Identity);
  let cityName = cmpIdentity.GetCityName();

  // we get all city consumes

  if (!this.allCitiesConsumes.hasOwnProperty(center))
    this.allCitiesConsumes[center] = {};

  let cityMarket = {
    cityCenter: cityName,
    cityEntId: center,
    pop: consumers.length,
    avarageHappiness: avarageHappiness,
    consumes: this.allCitiesConsumes[center],
    productions: this.allCitiesProduction[center],
    producers: [],
    products: [],
    resources: playerResources,
    timeLife: this.dayOfMonth
  };
  // we define  the products data
  for (let product in this.products) {
    // we reset the counter each update
    this.products[product].available = 0;
    cityMarket.products.push({ name: product, data: this.products[product] });
  }

  // we define first the producers data
  producers.forEach(function(producer) {
    let cmpEntityProducer = Engine.QueryInterface(producer, IID_EntityProducer);
    let catalogue = cmpEntityProducer.GetProductCatalogue();
    let producer_data = {
      id: producer,
      type: cmpEntityProducer.getType(),
      catalogue: catalogue
    };
    // also we decleare the list f product actually sold in the city in the moment

    for (let product in catalogue) {
      cityMarket.products.forEach((product2, index) => {
        if (product == product2.name) {
          // we calculate the products sum
          cityMarket.products[index].data.available += catalogue[product];
        }
      });
    }
    // we save all in this City Market
    cityMarket.producers.push(producer_data);
  });

  return cityMarket;
};

ProductsManager.prototype.InitMarket = function() {
  let _this = this;
  // first we got all city centers
  let civCenters = this.GetAllCivCenters();
  // for each we take all product sold and producer data
  civCenters.forEach(function(center) {
    let cityMarket = _this.GetAllCityProducts(center);
    _this.marketNew.push(cityMarket);
    //error(cityMarket.cityCenter);
    //cityMarket.products.forEach(function(product) {
    //  error(product);
    //});
  });
};

ProductsManager.prototype.UpdateMarket = function() {
  let _this = this;
  // we save old data
  this.marketOld = this.marketNew;
  this.marketNew = [];
  // first we got all city centers
  let civCenters = this.GetAllCivCenters();
  // for each we take all product sold and producer data
  civCenters.forEach(function(center) {
    // we store all new info in new market
    let cityMarket = _this.GetAllCityProducts(center);
    _this.marketNew.push(cityMarket);
  });
};

ProductsManager.prototype.GetMarket = function() {
  this.UpdateMarket();
  return this.marketNew;
};

ProductsManager.prototype.GetMarketStats = function() {
  this.UpdateMarket();
  return this.statistics;
};

// Listener \\

ProductsManager.prototype.OnTimerDayChanged = function(msg) {
  if (msg.day !== this.dayOfMonth) {
    this.dayOfMonth = msg.day;
    this.UpdateMarket();

    let allCitiesConsumesCopy = {};
    let allCitiesProductionCopy = {};
    for (let city in this.allCitiesConsumes) {
      allCitiesConsumesCopy[city] = {};
      for (let type in this.allCitiesConsumes[city]) {
        allCitiesConsumesCopy[city][type] = this.allCitiesConsumes[city][type];
      }
    }
    for (let city in this.allCitiesProduction) {
      allCitiesProductionCopy[city] = {};
      for (let type in this.allCitiesProduction[city]) {
        allCitiesProductionCopy[city][type] = this.allCitiesProduction[city][
          type
        ];
      }
    }
    this.statistics.day.push({
      consumes: allCitiesConsumesCopy,
      produced: allCitiesProductionCopy
    });
    /*
    this.statistics.day.forEach((stat, index) => {
      error(index);
      for (let city in stat.consumes) {
        //error(city);
        for (let type in stat.consumes[city]) {
          if (type == "bread") {
            error(type);
            error(stat.consumes[city][type]);
          }
        }
      }
    });*/
  }
};

ProductsManager.prototype.LocateConsumerProducerCity = function(ent, type) {
  // we get all cities centers
  let City;

  var cmpOwnership = Engine.QueryInterface(ent, IID_Ownership);
  var owner = cmpOwnership.GetOwner();
  var range = 100;
  let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
  let allCitiesCenters = this.GetAllCivCenters();
  if (allCitiesCenters.length > 1) {
    allCitiesCenters.forEach(function(center) {
      // we get all consumers
      if (type == "consumer") {
        let consumers = cmpRangeManager.ExecuteQuery(
          center,
          0,
          range,
          [owner],
          IID_EntityConsumer
        );
        // we locate our consumer entity
        consumers.forEach(function(cons) {
          if (ent == cons) {
            City = center;
          }
        });
      } else {
        let producers = cmpRangeManager.ExecuteQuery(
          center,
          0,
          range,
          [owner],
          IID_EntityProducer
        );
        // we locate our consumer entity
        producers.forEach(function(prod) {
          if (ent == prod) {
            City = center;
          }
        });
      }
    });
  } else {
    if (type == "consumer") {
      let consumers = cmpRangeManager.ExecuteQuery(
        allCitiesCenters[0],
        0,
        range,
        [owner],
        IID_EntityConsumer
      );

      consumers.forEach(function(cons) {
        if (ent == cons) {
          let center = allCitiesCenters[0];
          City = center;
        }
      });
    } else {
      let producers = cmpRangeManager.ExecuteQuery(
        allCitiesCenters[0],
        0,
        range,
        [owner],
        IID_EntityProducer
      );

      producers.forEach(function(prod) {
        if (ent == prod) {
          let center = allCitiesCenters[0];
          City = center;
        }
      });
    }
  }
  return City;
};

ProductsManager.prototype.OnProductConsumed = function(msg) {
  // we locate our consumer entity

  let cityWhereConsumed = this.LocateConsumerProducerCity(msg.ent, "consumer");
  let type = msg.type;
  // we update the consumes in that city
  if (!this.allCitiesConsumes.hasOwnProperty(cityWhereConsumed))
    this.allCitiesConsumes[cityWhereConsumed] = {};

  if (!this.allCitiesConsumes[cityWhereConsumed].hasOwnProperty(type)) {
    this.allCitiesConsumes[cityWhereConsumed][type] = msg.consume;
  } else {
    this.allCitiesConsumes[cityWhereConsumed][type] += msg.consume;
  }
};

ProductsManager.prototype.OnProductProduced = function(msg) {
  // we locate our consumer entity

  let cityWhereProduced = this.LocateConsumerProducerCity(msg.ent, "producer");
  let type = msg.type;
  // we update the production in that city
  if (!this.allCitiesProduction.hasOwnProperty(cityWhereProduced))
    this.allCitiesProduction[cityWhereProduced] = {};

  if (!this.allCitiesProduction[cityWhereProduced].hasOwnProperty(type)) {
    this.allCitiesProduction[cityWhereProduced][type] = msg.production;
  } else {
    this.allCitiesProduction[cityWhereProduced][type] += msg.production;
  }
};

Engine.RegisterSystemComponentType(
  IID_ProductsManager,
  "ProductsManager",
  ProductsManager
);

/*.ExecuteQuery(2, 0, -1, players, IID_ResourceDropsite);
resourceDropsite.forEach(function(site) {
  if (Engine.QueryInterface(site, IID_Identity).HasClass("CivCentre")) {
    cityCenters.push(site);
    error("yep");
  }
});*/
// now we see what changed between old and new, what matter is if the city center still exist and what change in product supply and demand
