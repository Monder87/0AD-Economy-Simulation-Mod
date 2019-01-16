function EntityProducer() {}

EntityProducer.prototype.Schema =
  "<a:help>Lets the unit collect and consume products!.</a:help>" +
  "<a:example>" +
  "<ProductCapacities>" +
  "<sausage>100</sausage>" +
  "<bread>100</bread>" +
  "<steak>10</steak>" +
  "<wine>10</wine>" +
  "<clothes>10</clothes>" +
  "<entertainment>5</entertainment>" +
  "<jewelry>2</jewelry>" +
  "<slave>0</slave>" +
  "</ProductCapacities>" +
  "<ProducingRate>" +
  "<sausage>1</sausage>" +
  "<bread>1</bread>" +
  "<steak>0</steak>" +
  "<wine>0</wine>" +
  "<clothes>1</clothes>" +
  "<entertainment>0</entertainment>" +
  "<jewelry>1</jewelry>" +
  "<slave>0</slave>" +
  "</ProducingRate>" +
  "</a:example>" +
  "<element name='ProductCapacities' a:help='Max Product the Entity can hold '>" +
  "<interleave>" +
  "<element name='sausage' a:help='sausage'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='bread' a:help='bread'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='steak' a:help='steak'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='wine' a:help='wine'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='clothes' a:help='clothes'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='entertainment' a:help='entertainment'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='jewelry' a:help='jewelry'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='slave' a:help='slave'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "</interleave>" +
  "</element>" +
  "<element name='ProducingRate' a:help='Consuming Rate of the Entity'>" +
  "<interleave>" +
  "<element name='sausage' a:help='sausage'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='bread' a:help='bread'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='steak' a:help='steak'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='wine' a:help='wine'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='clothes' a:help='clothes'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='entertainment' a:help='entertainment'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='jewelry' a:help='jewelry'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='slave' a:help='slave'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "</interleave>" +
  "</element>";

EntityProducer.prototype.Init = function() {
  //error("i am a producer");
  this.type = null;
  this.productCatalogue = {};
  this.ConstProductCatalogue();
};

EntityProducer.prototype.Identify = function() {
  return "PRODUCER";
};

EntityProducer.prototype.GetRange = function() {
  return {
    min: 0,
    max: 10
  };
};

EntityProducer.prototype.getType = function() {
  for (let type in this.template.ProductCapacities) {
    if (
      type == "sausage" ||
      type == "bread" ||
      type == "steak" ||
      type == "wine"
    ) {
      this.type = "Food_Dealer";
    } else if (type == "clothes") {
      this.type = "Clothes_Dealer";
    } else if (type == "jewelry") {
      this.type = "Jewelry_Dealer";
    } else if (type == "entertainment") {
      this.type = "Artist";
    }
  }

  return this.type;
};

EntityProducer.prototype.ConstProductCatalogue = function() {
  // We get the product needed Type
  for (let type in this.template.ProductCapacities) {
    if (this.template.ProductCapacities[type] != 0) {
      // we construct the productsCarring Object
      this.productCatalogue[type] = 100;
    }
  }
};

EntityProducer.prototype.AddProductToCatalogue = function(type, amount) {
  for (let type2 in this.productCatalogue) {
    if (type2 == type) {
      this.productCatalogue[type2] += amount;
    }
  }
};

EntityProducer.prototype.MinusProductToCatalogue = function(type, amount) {
  for (let type2 in this.productCatalogue) {
    if (type2 == type) {
      this.productCatalogue[type2] -= amount;
    }
  }
};

EntityProducer.prototype.GetProductCatalogue = function() {
  // We get the product stoked
  return this.productCatalogue;
};

EntityProducer.prototype.GetProductAvailability = function(type) {
  // We get the product stoked
  for (let type2 in this.productCatalogue) {
    if (type2 == type) {
      return this.productCatalogue[type2];
    }
  }
};

Engine.RegisterComponentType(
  IID_EntityProducer,
  "EntityProducer",
  EntityProducer
);
