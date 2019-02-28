function EntityConsumer() {}

EntityConsumer.prototype.Schema =
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
  "<ConsumingRate>" +
  "<sausage>1</sausage>" +
  "<bread>1</bread>" +
  "<steak>0</steak>" +
  "<wine>0</wine>" +
  "<clothes>1</clothes>" +
  "<entertainment>0</entertainment>" +
  "<jewelry>1</jewelry>" +
  "<slave>0</slave>" +
  "</ConsumingRate>" +
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
  "<element name='ConsumingRate' a:help='Consuming Rate of the Entity'>" +
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

EntityConsumer.prototype.Init = function() {
  this.consumerSetting = {
    maxBudg: 10000,
    minConsume: 0.033,
    maxConsume: 100,
    maxAvailibility: 100,
    maxStock: 10000,
    consumeBias: 10
  };
  this.dayOfMonth = 0;
  this.productsCarring = {};
  this.productsCapacities = {};
  this.productDailyConsume = {};
  this.productDailyAvailability = {};
  this.sampleDailyAvailability = {
    // calculated as sum of product type produced - sum of product type consumed / sum citizen all in 1 Day
    sausage: 0.0001,
    bread: 0.002,
    steak: 3,
    wine: 1,
    clothes: 1,
    entertainment: 0.1,
    jewelry: 0.1,
    slave: 0.5
  };
  this.purchaseList = [];
  this.productNeedPriority = {};
  this.GetProductNeededTypes();
  this.GetProductNeededCosumesRates();
  this.GetProductNeededDailyAvailability();
  this.test = 0;
};

EntityConsumer.prototype.OnEntityFinanceChanged = function(msg) {
  this.EntityNeedManager();
  //this.PerformPurchase();
};

// We count the day here

EntityConsumer.prototype.OnTimerDayChanged = function(msg) {
  if (msg.day !== this.dayOfMonth) {
    this.dayOfMonth = msg.day;
    this.ConsumeDaily();
  }
};

// Here the entities consume the product needed daily

EntityConsumer.prototype.ConsumeDaily = function() {
  for (let type in this.productDailyConsume) {
    this.productsCarring[type] -= this.productDailyConsume[type];
  }
};

EntityConsumer.prototype.GetProductCarring = function() {
  return this.productsCarring;
};

EntityConsumer.prototype.GetProductCarring2 = function() {
  return this.sampleDailyAvailability;
};

EntityConsumer.prototype.AddProductCarring = function(type, amount) {
  for (let type2 in this.productsCarring) {
    if (type2 == type) {
      if (
        this.productsCarring[type2] < this.productsCapacities[type2] &&
        this.productsCarring[type2] + amount < this.productsCapacities[type2]
      ) {
        this.productsCarring[type2] += amount;
      }
    }
  }
};

EntityConsumer.prototype.GetProductNeededTypes = function() {
  // We get the product needed Type
  for (let type in this.template.ProductCapacities) {
    if (this.template.ProductCapacities[type] != 0) {
      // we construct the productsCarring Object
      this.productsCarring[type] = 1;
    }
  }
};

EntityConsumer.prototype.GetProductTypes = function() {
  let obj = [];
  for (let type in this.template.ProductCapacities) {
    if (this.template.ProductCapacities[type] != 0) {
      // we construct the productsCarring Object
      obj.push(type);
    }
  }
  return obj;
};

EntityConsumer.prototype.GetProductCapacities = function() {
  // We get the product needed Type
  for (let type in this.template.ProductCapacities) {
    if (this.template.ProductCapacities[type] != 0) {
      // we construct the productsCarring Object
      this.productsCapacities[type] = this.template.ProductCapacities[type];
    }
  }
  return this.productsCapacities;
};

EntityConsumer.prototype.GetProductNeededCosumesRates = function() {
  // We get the product Consume rates
  for (let type in this.template.ConsumingRate) {
    if (this.template.ConsumingRate[type] != 0) {
      // we construct the productsCarring Object
      this.productDailyConsume[type] = this.template.ConsumingRate[type];
    }
  }
};

EntityConsumer.prototype.GetProductNeededDailyAvailability = function() {
  // We get the product Consume rates
  for (let type in this.template.ConsumingRate) {
    if (this.template.ConsumingRate[type] != 0) {
      // we construct the productsCarring Object
      this.productDailyAvailability[type] = this.sampleDailyAvailability[type];
    }
  }
};

EntityConsumer.prototype.GetFirstAndSecondChoiceProducts = function() {
  // We get the Purchasing List
  let firstChoiceProduct = {};
  let secondChoiceProduct = {};

  // We filter the purchase list and we take just product we need
  this.purchaseList.forEach(function(item, index) {
    if (item[1] > 1) {
      firstChoiceProduct[item[0]] = item[1];
      ///error("first choice needs");
      ///error(item[0]);
      ///error(firstChoiceProduct[item[0]]);
    } else if (item[0] > 0.5 && item[0] < 1) {
      secondChoiceProduct[item[0]] = item[1];
      ///error("second choice needs");
    } else {
      ///error("no needs");
    }
  });

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  if (isEmpty(firstChoiceProduct) == false) {
  }
  let productsNeeded = {
    firstChoiceProduct: isEmpty(firstChoiceProduct) ? null : firstChoiceProduct,
    secondChoiceProduct: isEmpty(secondChoiceProduct)
      ? null
      : firstChoiceProduct
  };
  return productsNeeded;
};

EntityConsumer.prototype.Normalize = function(val, max, min) {
  return (val - min) / (max - min);
};

EntityConsumer.prototype.GetEntityFinances = function() {
  let cmpEntityFinance = Engine.QueryInterface(this.entity, IID_EntityFinance);
  return cmpEntityFinance.GetFinancialStatus();
};

EntityConsumer.prototype.PriorityNeeds = function(
  cost,
  consumeDaily,
  availabilityDaily,
  stock
) {
  let cmpEntityFinance = this.GetEntityFinances();
  let budget = cmpEntityFinance.balance;
  let budgetPriority = budget / cost;
  // normalize
  budgetPriority = this.Normalize(
    budgetPriority,
    this.consumerSetting.maxBudg,
    0
  ).toFixed(8);
  if (budgetPriority == Infinity) {
    budgetPriority = 1;
  }
  //console.log(budgetPriority);
  if (consumeDaily < this.consumerSetting.minConsume) {
    consumeDaily = this.consumerSetting.minConsume;
  }
  if (consumeDaily > this.consumerSetting.maxConsume) {
    consumeDaily = this.consumerSetting.maxConsume;
  }
  if (stock > this.consumerSetting.maxStock) {
    stock = this.consumerSetting.maxStock;
  }
  if (availabilityDaily > this.consumerSetting.maxAvailibility) {
    availabilityDaily = this.consumerSetting.maxAvailibility;
  }
  let dayleft = stock / consumeDaily;
  let daynextsuppl = 1 / availabilityDaily;
  let consumingPriority = daynextsuppl / dayleft;
  consumingPriority = consumingPriority.toFixed(8);
  if (consumingPriority > 100) {
    consumingPriority = 100;
  }
  // normalize
  consumingPriority = this.Normalize(consumingPriority, 100, 0).toFixed(8);
  //console.log(consumingPriority)
  let priority = parseFloat(budgetPriority) + parseFloat(consumingPriority);
  //priority = priority.toFixed(8)
  //console.log(priority)
  return {
    budgetPriority: budgetPriority,
    consumingPriority: consumingPriority,
    priority: priority
  };
};

EntityConsumer.prototype.EntityNeedManager = function() {
  let purchaseList = [];
  for (let type in this.productsCarring) {
    // we define cost until not finish ProductsManager
    let cost = 100;
    let priority = this.PriorityNeeds(
      cost,
      this.productDailyConsume[type],
      this.productDailyAvailability[type],
      this.productsCarring[type]
    );
    this.productNeedPriority[type] = priority.priority;
    // we put in our purchase List
    purchaseList.push([type, this.productNeedPriority[type]]);
  }
  // we sort the Purchase List by priority
  purchaseList.sort(function(a, b) {
    return a[1] - b[1];
  });
  purchaseList.reverse();
  purchaseList.forEach(function(item, index) {
    //error(index + "sort");
    //error(item[0]);
    //error(item[1]);
  });

  this.purchaseList = purchaseList;
};

EntityConsumer.prototype.findTypeofProducer = function(list) {
  let producerType = [];
  for (let type in list) {
    if (
      type == "sausage" ||
      type == "bread" ||
      type == "steak" ||
      type == "wine"
    ) {
      producerType.push("Food_Dealer");
    } else if (type == "clothes") {
      producerType.push("Clothes_Dealer");
    } else if (type == "jewelry") {
      producerType.push("Jewelry_Dealer");
    } else if (type == "entertainment") {
      producerType.push("Artist");
    }
  }

  return producerType;
};

Engine.RegisterComponentType(
  IID_EntityConsumer,
  "EntityConsumer",
  EntityConsumer
);
