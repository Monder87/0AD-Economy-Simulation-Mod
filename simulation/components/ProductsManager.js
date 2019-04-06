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
      initialPrice: 5,
      rawMaterial: {
        grain: 5,
        wood: 10
      },
      processingTime: 1
    },
    cheese: {
      initialPrice: 5,
      rawMaterial: {
        milk: 5,
        wood: 10
      },
      processingTime: 2
    },
    sausage: {
      initialPrice: 5,
      rawMaterial: {
        herbs: 5,
        meat: 10,
        wood: 15
      },
      processingTime: 2
    },
    soup: {
      initialPrice: 5,
      rawMaterial: {
        herbs: 5,
        wood: 10
      },
      processingTime: 1
    },
    beer: {
      initialPrice: 5,
      rawMaterial: {
        herbs: 10,
        wood: 20,
        grain: 20
      },
      processingTime: 5
    },
    cake: {
      initialPrice: 5,
      rawMaterial: {
        milk: 15,
        fruit: 15,
        wood: 30
      },
      processingTime: 5
    },
    soap: {
      initialPrice: 5,
      rawMaterial: {
        oil: 15,
        meat: 30,
        wood: 20
      },
      processingTime: 1
    },
    broom: {
      initialPrice: 5,
      rawMaterial: {
        metal: 10,
        wood: 20
      },
      processingTime: 3
    },
    parfume: {
      initialPrice: 5,
      rawMaterial: {
        metal: 10,
        wood: 50,
        herbs: 50,
        oil: 30
      },
      processingTime: 10
    },
    woolenClothes: {
      initialPrice: 5,
      rawMaterial: {
        wool: 50,
        metal: 15,
        wood: 20
      },
      processingTime: 10
    },
    leatherClothes: {
      initialPrice: 5,
      rawMaterial: {
        meat: 40,
        wool: 30,
        metal: 10,
        wood: 25
      },
      processingTime: 20
    },
    shoes: {
      initialPrice: 5,
      rawMaterial: {
        wool: 20,
        metal: 15,
        wood: 20
      },
      processingTime: 15
    },
    banner: {
      initialPrice: 5,
      rawMaterial: {
        wool: 30,
        metal: 15,
        wood: 20
      },
      processingTime: 10
    },
    indoorDecoration: {
      initialPrice: 5,
      rawMaterial: {
        wool: 50,
        stone: 50,
        metal: 50,
        wood: 50
      },
      processingTime: 30
    },
    outdoorDecoration: {
      initialPrice: 5,
      rawMaterial: {
        stone: 100,
        metal: 50,
        wood: 80
      },
      processingTime: 40
    },
    jewellery: {
      initialPrice: 5,
      rawMaterial: {
        stone: 200,
        metal: 200,
        wood: 400
      },
      processingTime: 50
    },
    swords: {
      initialPrice: 5,
      rawMaterial: {
        stone: 20,
        metal: 50,
        wood: 50
      },
      processingTime: 15
    },
    bows: {
      initialPrice: 5,
      rawMaterial: {
        stone: 20,
        metal: 30,
        wood: 60
      },
      processingTime: 15
    },
    shield: {
      initialPrice: 5,
      rawMaterial: {
        stone: 30,
        metal: 80,
        wood: 10
      },
      processingTime: 20
    },
    engineParts: {
      initialPrice: 5,
      rawMaterial: {
        stone: 60,
        metal: 100,
        wood: 100
      },
      processingTime: 40
    }
  };
  // here where we store old data of market
  this.marketOld = [];
  // here where we store new data of the market
  this.marketNew = [];
  // we initialize the market for the first time
  this.InitMarket();
};

ProductsManager.prototype.GetProductData = function(type) {
  return {
    name: type,
    icon: `products/${type}.png`
  };
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

  let cityMarket = {
    cityCenter: cityName,
    cityEntId: center,
    pop: consumers.length,
    avarageHappiness: avarageHappiness,
    producers: [],
    products: [],
    resources: playerResources
  };
  // we define first the producers data
  producers.forEach(function(producer) {
    let cmpEntityProducer = Engine.QueryInterface(producer, IID_EntityProducer);
    let catalogue = cmpEntityProducer.GetProductCatalogue();
    let producer_data = {
      id: producer,
      type: cmpEntityProducer.getType(),
      catalogue: catalogue
    };
    // also we add a list f product sold in the city
    for (let product in catalogue) {
      if (cityMarket.products.indexOf(product) === -1) {
        cityMarket.products.push(product);
      }
    }
    // we save all in this City Market
    cityMarket.producers.push(producer_data);
  });
  return cityMarket;
};

ProductsManager.prototype.InitMarket = function() {
  error("market initiated");
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

ProductsManager.prototype.GetMarketPrice = function(product, trade_type) {};

ProductsManager.prototype.GetMarket = function() {
  this.UpdateMarket();
  return this.marketNew;
};
// Listener \\

ProductsManager.prototype.OnTimerDayChanged = function(msg) {
  if (msg.day !== this.dayOfMonth) {
    this.dayOfMonth = msg.day;
    this.UpdateMarket();
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
