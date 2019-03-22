//The structure of the market Object will be :
/*
this.market = [
  {
    cityCenter: Cityname,
    cityEntId: idCityCenter,
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

  // here where we store old data of market
  this.marketOld = [];
  // here where we store new data of the market
  this.marketNew = [];
  // we initialize the market for the first time
  this.InitMarket();
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

ProductsManager.prototype.GetAllProducts = function(center) {
  // we get the player
  var cmpOwnership = Engine.QueryInterface(center, IID_Ownership);
  if (!cmpOwnership || cmpOwnership.GetOwner() == INVALID_PLAYER)
    return undefined;
  var owner = cmpOwnership.GetOwner();
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

  // we find all product sold for each producer and the city name

  let cmpIdentity = Engine.QueryInterface(center, IID_Identity);
  let cityName = cmpIdentity.GetCityName();

  let cityMarket = {
    cityCenter: cityName,
    cityEntId: center,
    producers: [],
    products: []
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
    let cityMarket = _this.GetAllProducts(center);
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
    let cityMarket = _this.GetAllProducts(center);
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
