(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  
  this.items = ShoppingListCheckOffService.getToBuyItems();
  
  this.buy = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
 
  this.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
 
  var toBuyItems = [
    { name: "Cookies", quantity: 10 },
    { name: "Maggie Noodles", quantity: 7 },
    { name: "Nachos", quantity: 5 },
    { name: "Soda", quantity: 6 },
    { name: "Corn Flakes", quantity: 1 }];

  var boughtItems = [];

  
  this.getToBuyItems = function () {
    return toBuyItems;
  };

  this.getBoughtItems = function () {
    return boughtItems;
  };

  this.buyItem = function(index) {
    boughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index, 1);
  };

}

})();
