Engine.LoadComponentScript("interfaces/EntityFinance.js");
Engine.LoadComponentScript("EntityFinance.js");

AddMock(SYSTEM_ENTITY, IID_PlayerManager, {
  GetNumPlayers: () => 3
});

AddMock(entity, IID_Fogging, {
  Activate: () => {}
});

const entity = 60;

let template = {
  WalletCapacities: 1000,
  EarningRate: 1
};

let cmpEntityFinance = ConstructComponent(entity, "EntityFinance", template);

TS_ASSERT(cmpResourceSupply.Earn(10), 20);
