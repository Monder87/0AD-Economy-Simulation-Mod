function MoneySupply() {}

MoneySupply.prototype.Init = function() {
  // The Money Supply Csapacity is proportional to the size of the Economy of the city
  // Now we do a test in which a tot number of market generate a tot number of money, after will be implemented more deeply as a real economy between individual

  // Tot number of Markets stored in a Array
  this.markets = [];

  this.index = -1;
  this.goods = {
    type: "money",
    amount: null
  };
};
// We Specify the gain
MoneySupply.prototype.CalculateGain = function() {
  let gain = 10;
  return gain;
};
// We add the Money Resources
MoneySupply.prototype.AddResources = function(gain) {
  let numPlayers = Engine.QueryInterface(
    SYSTEM_ENTITY,
    IID_PlayerManager
  ).GetNumPlayers();
  for (let i = 0; i < numPlayers; ++i) {
    let cmpPlayer = QueryPlayerIDInterface(i);

    if (cmpPlayer) cmpPlayer.AddResource(this.goods.type, this.CalculateGain);
  }
  //let cmpStatisticsTracker = QueryOwnerInterface(ent, IID_StatisticsTracker);
  //	if (cmpStatisticsTracker)
  //cmpStatisticsTracker.IncreaseTradeIncomeCounter(gain);
};

Engine.RegisterComponentType(IID_MoneySupply, "MoneySupply", MoneySupply);
