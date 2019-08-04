(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  toBuy.buy = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var _this = this;
  var toBuyItems = [
    { name: "Cookies", quantity: 10 },
    { name: "Maggie Noodles", quantity: 7 },
    { name: "Nachos", quantity: 5 },
    { name: "Soda", quantity: 6 },
    { name: "Corn Flakes", quantity: 1 }];

  var boughtItems = [];

  
  _this.getToBuyItems = function () {
    return toBuyItems;
  };

  _this.getBoughtItems = function () {
    return boughtItems;
  };
  
  _this.buyItem = function(index) {
    boughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index, 1);
  };

}

})();
