(function () {
  'use strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('SearchService', SearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['SearchService'];
function NarrowItDownController(SearchService) {
  var _this = this;
 _this.filteredItems = SearchService.getItems();
  _this.searchMenuItems = function () {
    if (_this.searchText === "") {
      SearchService.clear();
    } else {
      SearchService.getFilteredItems(_this.searchText)
      .then(function(result) {
       _this.filteredItems = result;
      });
    }
  }

  _this.removeItem = function(itemIndex) {
    SearchService.removeItem(itemIndex);
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'filteredItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundCtrl = this;

  foundCtrl.isNothingFound = function() {
    if (foundCtrl.items.length === 0) {
      return true;
    }
    return false;
  };
}

SearchService.$inject = ['$http', 'ApiBasePath'];
function SearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getFilteredItems = function(searchText) {
    foundItems.splice(0, foundItems.length);
    if (searchText === "") {
      return foundItems;
    }
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result) {
      var allItems = result.data.menu_items;
      foundItems.splice(0, foundItems.length);
      for (var index = 0; index < allItems.length; ++index) {
        if (allItems[index].description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          foundItems.push(allItems[index]);
        }
      }
      return foundItems;
    });
  };

  service.clear = function() {
    foundItems.splice(0, foundItems.length);
  }

  service.removeItem = function(itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

  service.getItems = function() {
    return foundItems;
  };
}

})();
