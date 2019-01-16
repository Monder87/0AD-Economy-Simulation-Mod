function ProductsManager() {}

ProductsManager.prototype.Schema =
  "<a:help>Manage all products prices and availability.</a:help>" + "<empty/>";

ProductsManager.prototype.Init = function() {
  this.prices = {
    sausage: 2,
    bread: 4,
    steak: 5,
    wine: 8,
    clothes: 9,
    entertainment: 20,
    jewelry: 100,
    slave: 1000
  };
};

ProductsManager.prototype.GetPrice = function(type) {
  for (let type2 in this.prices) {
    if (type == type2) {
      return this.prices[type];
    }
  }
};

Engine.RegisterSystemComponentType(
  IID_ProductsManager,
  "ProductsManager",
  ProductsManager
);
