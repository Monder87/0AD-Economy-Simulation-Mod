# 0AD-Economy-Simulation-Mod

[![N|Solid](https://play0ad.com/wp-content/uploads/2014/10/Empires-Ascendant-2048.png)](https://play0ad.com/)

Create a Economy System for 0Ad to give more Realism and add Strategy to the Game.


# Goal 

Create a Economy System for 0Ad to give more Realism and add Strategy to the Game. 

3 Main Concepts of the Economy System :

 
  - Economy Entities
  - Money
  - Products
  
  
### 1) Economy Entities

Dividing the Military Unit from the Civilian , we focus just in the latter for our Economy.

Civilian Entity can Upgrade from Slave to Noble paying fee to special structure ( like Academy) or collecting a certain amount of experience ( calculated in money earned ).

There are two kind of entity in our model:

Passive: Earn Money from the resource gathering job

Active: Earn Money producing and selling products

We can say that Passive Entity are just Consumer, and Active are both Consumer and Producer.

All the Economy Entities consume product and resources, can stock products , have own money saved in them personal wallet and most important  they can spend or earn.

In more details:

Slave work for free and consume just some food the only owner is the State which account for the food and benefits of the resources gathered

Citizen the can earn and spend; they consume food and also other commodities like textile or wine, they can buy food from the State or from Food vendors, and the other commodities from the shops or in the market, the own the money earned but also the State own them: all resources gathered go to State which pay them producing money from free

Shops, Market, Circus are instead Structures which spend money to buy resources from State and resell them to Citizens offering different products from clothes exotic food  entreatment etc..also they need to pay a tax for each transaction to State

Nobles  instead they can own Slave and earn a percent for all the Lifecycles of them economy once they upgrade in the different economy entity described above. They Spend money for very expensive commodities and they influence the civ evolution like giving some very good benefits to win the game( not sure yet which one ) 



### 2) Money

Of course all is about money, so the first thing i did is to create the Money Resource.

The Player represent the State in my Economy System, perceive a Tax for every transaction done in its kingdom, ( ex. 20%) plus it can collect money selling resources to the producers and adding other fee after a certain amount of time. More glorious is his economy more money he can make.

 

### 3) Products

So far i created 8 products that can be sold: 

- Food:

bread, wine, steak, sausage

- Clothes

- Entertainment

- Jewelry

- Slave

Each Product has a price that change based on the Supply and Demand, they are being calculated by a PriceManager Component, which will calculate the demand and offer every tot amount of time, to give realism of the Economy Model.


### Todos

 - The software is still under heavy developement... i will need some time before finishing.
 
 

License
----

MIT


**Free Software, Hell Yeah!**
