function EntityProducer() {}

EntityProducer.prototype.Schema =
  "<a:help>Lets the unit collect and consume products!.</a:help>" +
  "<a:example>" +
  "<RawMaterialCapacities>" +
  "<fish>100</fish>" +
  "<milk>100</milk>" +
  "<oil>10</oil>" +
  "<herbs>10</herbs>" +
  "<wool>10</wool>" +
  "<fruit>5</fruit>" +
  "<grain>2</grain>" +
  "<meat>0</meat>" +
  "<metal>0</metal>" +
  "<wood>0</wood>" +
  "<stone>0</stone>" +
  "</RawMaterialCapacities>" +
  "<ProducingRate>" +
  "<bread>1</bread>" +
  "</ProducingRate>" +
  "</a:example>" +
  "<element name='RawMaterialCapacities' a:help='Max Raw Material the Entity can hold '>" +
  "<interleave>" +
  "<element name='fish' a:help='fish'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='milk' a:help='milk'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='oil' a:help='oil'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='herbs' a:help='herbs'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='wool' a:help='wool'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='fruit' a:help='fruit'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='grain' a:help='grain'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='meat' a:help='meat'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='metal' a:help='metal'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='wood' a:help='wood'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='stone' a:help='stone'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "</interleave>" +
  "</element>" +
  "<element name='ProducingRate' a:help='Consuming Rate of the Entity'>" +
  "<interleave>" +
  "<element name='bread' a:help='bread'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='cheese' a:help='cheese'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='sausage' a:help='sausage'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='soup' a:help='soup'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='beer' a:help='beer'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='cake' a:help='cake'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='soap' a:help='soap'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='broom' a:help='broom'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='parfume' a:help='parfume'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='woolenClothes' a:help='woolenClothes'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='leatherClothes' a:help='leatherClothes'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='shoes' a:help='shoes'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='banner' a:help='banner'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='indoorDecoration' a:help='indoorDecoration'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='outdoorDecoration' a:help='outdoorDecoration'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='jewellery' a:help='jewellery'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='swords' a:help='swords'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='bows' a:help='bows'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='shield' a:help='shield'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "<element name='engineParts' a:help='engineParts'>" +
  "<ref name='nonNegativeDecimal'/>" +
  "</element>" +
  "</interleave>" +
  "</element>";

EntityProducer.prototype.Init = function() {
  error("i am a producer");
  this.type = null;
  this.productCatalogue = {};
  this.RawMaterialCapacities = {};
  this.RawMaterialStock = {};
  this.ConstProductCatalogue();
  this.ConstRawMaterialStock();
  this.dayOfMonth = 0;
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
  for (let type in this.template.ProducingRate) {
    if (this.template.ProducingRate[type] != 0) {
      // we construct the productsCarring Object
      this.productCatalogue[type] = 100;
    }
  }
};

EntityProducer.prototype.GetRawMaterialStock = function() {
  // We get the raw materials stock
  return this.RawMaterialStock;
};

EntityProducer.prototype.ConstRawMaterialStock = function() {
  // We get the product needed Type
  for (let type in this.template.RawMaterialCapacities) {
    if (this.template.RawMaterialCapacities[type] != 0) {
      // we also contruct the maxcap for each raw material
      this.RawMaterialCapacities[type] = this.template.RawMaterialCapacities[
        type
      ];
      // we construct the productsCarring Object
      this.RawMaterialStock[type] = 100;
    }
  }
};

EntityProducer.prototype.GetRawMaterialCapacities = function() {
  return this.RawMaterialCapacities;
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

// listeners

EntityProducer.prototype.OnTimerDayChanged = function(msg) {
  if (msg.day !== this.dayOfMonth) {
    this.dayOfMonth = msg.day;
    this.ProduceDaily();
  }
};

EntityProducer.prototype.ProduceDaily = function() {
  let cmpProductsManager = Engine.QueryInterface(
    SYSTEM_ENTITY,
    IID_ProductsManager
  );
  for (let product in this.productCatalogue) {
    let productData = cmpProductsManager.GetProductData(product).data;
    // for each product we consume some raw materials
    for (let type in productData.rawMaterial) {
      this.RawMaterialStock[type] -= productData.rawMaterial[type];
      // we add them to consumption
      Engine.BroadcastMessage(MT_ProductConsumed, {
        ent: this.entity,
        type: type,
        consume: Number(productData.rawMaterial[type])
      });
    }
    // we add the products to the catalogue
    this.productCatalogue[product] += Number(
      this.template.ProducingRate[product]
    );
    // we notify the products manager that we got n production
    Engine.BroadcastMessage(MT_ProductProduced, {
      ent: this.entity,
      type: product,
      production: Number(this.template.ProducingRate[product])
    });
  }
};

Engine.RegisterComponentType(
  IID_EntityProducer,
  "EntityProducer",
  EntityProducer
);
