function EntityFinance() {}

EntityFinance.prototype.Schema =
  "<a:help>Lets the unit earn money for the job done!.</a:help>" +
  "<a:example>" +
  "<WalletCapacities>1000</WalletCapacities>" +
  "</a:example>" +
  "<a:example>" +
  "<EarningRate>1.0</EarningRate>" +
  "</a:example>" +
  "<element name='WalletCapacities' a:help='Max Money the Entity can earn '>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='EarningRate' a:help='Earning Rate of the Entity'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>";

EntityFinance.prototype.Init = function() {
  this.balance = Math.floor(Math.random() * 1000) + 100; // the Actual Amount of money the entity has
  this.walletCapacity = 0;
  this.RecalculateEarningRate(); // Recalculate the Earning Rate
  this.RecalculateWalletCapacities(); // Recalculate the Wallet Capacity
  this.vatTax = 0.2; // The Vat tax to pay to State
};

EntityFinance.prototype.GetFinancialStatus = function() {
  let fin = {
    balance: this.balance,
    walletCapacity: this.GetWalletCapacity(),
    earnRate: this.earningRate
  };
  return fin;
};

EntityFinance.prototype.GetWalletCapacity = function() {
  if (!this.template.WalletCapacities) return 0;
  return this.template.WalletCapacities;
};

EntityFinance.prototype.RecalculateWalletCapacities = function() {
  this.walletCapacity = this.GetWalletCapacity;
  // once added financing tool in tech, right now yet
};

EntityFinance.prototype.RecalculateEarningRate = function() {
  // if Player get some change in earning rate is being update to the entity
  let cmpPlayer = QueryOwnerInterface(this.entity, IID_Player);
  let multiplier = cmpPlayer ? cmpPlayer.GetEarningRateMultiplier() : 1;
  this.earningRate = this.template.EarningRate * multiplier;
  // once added financing tool in tech, right now yet
  /*this.earningRate = ApplyValueModificationsToEntity(
      "EntityFinance/EarningRate",
      +this.template.EarningRate,
      this.entity
    );*/
};
EntityFinance.prototype.Earn = function(amount) {
  // check if not exeeding wallet capacity
  if (this.balance > this.walletCapacity) return null;
  // Adjust earningRate Setting
  amount = amount * this.earningRate;
  // Pay VAT Tax to State
  let vatTax = amount * this.vatTax;
  let cmpPlayer = QueryOwnerInterface(this.entity);
  cmpPlayer.AddMoneyResource(vatTax);
  // Detract the VAT Tax to the Amount
  amount -= vatTax;
  // Add the amount to Balance
  this.balance += amount;
  // Post that Entity earn Money
  Engine.PostMessage(this.entity, MT_EntityFinanceChanged, {
    to: this.GetFinancialStatus()
  });
};

EntityFinance.prototype.Spend = function(amount) {
  // once the entity spend a certain amount of money
  this.balance -= amount;
  Engine.PostMessage(this.entity, MT_EntityFinanceChanged, {
    to: this.GetFinancialStatus()
  });
};

// Listener \\

Engine.RegisterComponentType(IID_EntityFinance, "EntityFinance", EntityFinance);
