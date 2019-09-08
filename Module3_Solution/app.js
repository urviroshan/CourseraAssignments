(function () {
  'use strict'

angular.module('SearchApp', [])
.controller('SearchController', SearchController)
.service('SearchService', SearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiRoot', "https://davids-restaurant.herokuapp.com");


SearchController.$inject = ['SearchService'];
function SearchController(SearchService) {
  var _this = this;
 _this.filteredItems = SearchService.getItems();
  _this.searchMenuItems = function () {
    if (_this.searchTerm !== "") {
       SearchService.getFilteredItems(_this.searchTerm)
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

SearchService.$inject = ['$http', 'ApiRoot'];
function SearchService($http, ApiRoot) {
  var lclService = this;
  var foundItems = [];
  
  lclService.getItems = function() {
    return foundItems;
  };

  lclService.removeItem = function(index) {
    foundItems.splice(index, 1);
  };
  lclService.getFilteredItems = function(searchTerm) {
    foundItems.splice(0, foundItems.length);
    if (searchTerm === "") {
      return foundItems;
    }
    return $http({
      method: "GET",
      url: (ApiRoot + "/menu_items.json")
    }).then(function(result) {
      var allItems = result.data.menu_items;
      foundItems.splice(0, foundItems.length);
      for (var index = 0; index < allItems.length; ++index) {
        if (allItems[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(allItems[index]);
        }
      }
      return foundItems;
    });
  };

}

})();
