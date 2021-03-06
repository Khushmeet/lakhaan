'use strict'

angular.module('lakhaanaApp')
  .controller('MenuCtrl', function ($scope, $stateParams, $location, menuService, Auth, shareData, userService, shareData2, shareData3) {
    $scope.order = {}
    var i = 0
    var res_phone
    $scope.quantity = 1
    var baseImg
    var min_delivery
    var send = []

    menuService.get({id: $stateParams.id},
      function success (response) {
        baseImg = response.photo
        $scope.res_obj = {
          name: response.name,
          spec: response.speciality,
          address: response.address,
          rating: response.rating,
          phone: response.phone,
          photo: response.photo
        }
        shareData3.store(response.name);
        send[0] = response.phone
        send[1] = response.min_delivery
        $scope.menuObject = response.menu
        $scope.keys = Object.keys($scope.menuObject)
      },
      function error (errorResponse) {
        console.log(errorResponse)
      })

    

    $scope.addItem = function (quantity, name, price) {
      var obj = {
        'name': name,
        'quantity': quantity,
        'price': price
      }
      $scope.order[i] = obj
      i++
      $scope.quantity = 1
    }

    $scope.deleteItem = function (item) {
      var key = _.findKey($scope.order, item)
      delete $scope.order[key]
    }

    $scope.continue = function () {
      var id = Auth.getCurrentUser()._id
      shareData.store($scope.order)
      shareData2.store(send)
      console.log($scope.order)
      $location.path('/checkout')
    }
  }).filter('underscoreless', function () {
  return function (input) {
    return input.replace(/_/g, ' ')
  }
}).filter('capitalize', function () {
  return function (input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : ''
  }
}).filter('isEmpty', function () {
  var bar
  return function (obj) {
    for (bar in obj) {
      if (obj.hasOwnProperty(bar)) {
        return false
      }
    }
    return true
  }
})
