let orders = {
  "Order.PerformShopping": function(msg) {
    this.SetNextState("INDIVIDUAL.SHOPPING");
  },
  "Order.Shopping": function(msg) {
    error(this.order.data.producerTargets.closerProducer);
    this.WalkToTarget(this.order.data.producerTargets.closerProducer, false);
    this.PerformShopping(this.order.data.producerTargets.closerProducer);
  },
  SHOPPING: {
    enter: function() {
      this.SelectAnimation("move");
    },

    MoveCompleted: function() {
      this.FinishOrder();
    }
  }
};
// If meantime we work we need to buy some goods
var cmpEntityConsumer = Engine.QueryInterface(this.entity, IID_EntityConsumer);
if (cmpEntityConsumer) {
  // We check if we need some product
  var needToBuy = cmpEntityConsumer.GetFirstAndSecondChoiceProducts();
  if (needToBuy.firstChoiceProduct != null) {
    // if we need we ow need to define which Type of Producer we need
    var firstChoiceProducerType = cmpEntityConsumer.findTypeofProducer(
      needToBuy.firstChoiceProduct
    );
    // now we find the nearest Producer of the Type we looking for
    var targetProducer = this.FindNearestProducer(firstChoiceProducerType);
    // we record our last position
    var lastPos = undefined;
    var cmpPosition = Engine.QueryInterface(this.entity, IID_Position);
    if (cmpPosition && cmpPosition.IsInWorld())
      lastPos = cmpPosition.GetPosition();
    if (targetProducer.closerProducer) {
      error(targetProducer.closerProducer);
      this.PushOrderFront("Shopping", {
        lastPos: lastPos,
        gatheringTarget: this.order.data.target,
        producerTargets: targetProducer
      });
      this.FinishOrder();
      return;
    }

    return;
  }
}

UnitAI.prototype.PerformShopping = function(target, queued) {
  this.AddOrder("PerformShopping", { target: target, force: true }, queued);
};
UnitAI.prototype.FindNearestProducer = function(TypeAry) {
  let cmpOwnership = Engine.QueryInterface(this.entity, IID_Ownership);
  if (!cmpOwnership || cmpOwnership.GetOwner() == INVALID_PLAYER)
    return undefined;

  let cmpPosition = Engine.QueryInterface(this.entity, IID_Position);
  if (!cmpPosition || !cmpPosition.IsInWorld()) return undefined;

  let pos = cmpPosition.GetPosition2D();
  let bestProducer;
  let bestDist = Infinity;
  // Maximum distance a point on an obstruction can be from the center of the obstruction.
  let maxDifference = 40;

  // Find dropsites owned by this unit's player or allied ones if allowed.
  let owner = cmpOwnership.GetOwner();
  let cmpPlayer = QueryOwnerInterface(this.entity);
  let players =
    cmpPlayer && cmpPlayer.HasSharedDropsites()
      ? cmpPlayer.GetMutualAllies()
      : [owner];
  let nearbyProducers = Engine.QueryInterface(
    SYSTEM_ENTITY,
    IID_RangeManager
  ).ExecuteQuery(this.entity, 0, -1, players, IID_EntityProducer);

  let cmpObstructionManager = Engine.QueryInterface(
    SYSTEM_ENTITY,
    IID_ObstructionManager
  );
  for (let producer of nearbyProducers) {
    let cmpEntityProducer = Engine.QueryInterface(producer, IID_EntityProducer);
    if (!this.CheckTargetVisible(producer)) continue;
    if (Engine.QueryInterface(producer, IID_Ownership).GetOwner() != owner)
      continue;
    for (let Type of TypeAry) {
      if (cmpEntityProducer.getType() == Type) {
        // The range manager sorts entities by the distance to their center,
        // but we want the distance to the point where resources will be dropped off.
        let dist = cmpObstructionManager.DistanceToPoint(
          producer,
          pos.x,
          pos.y
        );
        if (dist == -1) continue;

        if (dist < bestDist) {
          bestProducer = producer;
          bestDist = dist;
        } else if (dist > bestDist + maxDifference) break;
        //error("the producer is " + bestProducer);
        return {
          closerProducer: bestProducer,
          allProducers: nearbyProducers
        };
      }
    }
  }
};
