var app = angular.module("salesforceApp", ['ngResource']);
         
app.controller('salesforceController', ['$scope', 'AppService', function($scope, AppService) {
   var s = $scope;
   s.item = {};
   s.leads = [];
   s.items = [];

   s.init = function() {
      AppService.obtenerLeads(
         function(data) {
            s.leads = data.Data;
         }, function(data) {
            alert('Ha ocurrido un error: ' + data.data.Message);
         }
      );   
   };

   s.obtenerItemsPorLead = function(lead) {
      AppService.obtenerItemsPorLead({LeadID : lead.Id}, 
         function(data) {
            s.items = data.Data;
         }, function (data) {
            alert('Ha ocurrido un error: ' + data.data.Message);
         }
      );
   };

   s.agregarItem = function() {
      $scope.item.Lead__c = $scope.leadAssignment.Id;
      AppService.agregarItem({}, s.item, 
         function(data) {
            s.item = null;
         }, function(data) {
            alert('Ha ocurrido un error: ' + data.data.Message);
         }
      );
   };
}]);

app.factory('AppService', ['$resource', function($resource){
   var resource = $resource('api/item/:id', {
            id : '@id'
         }, {
            obtenerLeads : {
               method : 'GET',
               headers: { 'Authorization': 'Bearer 00D1U00000153FR!AQoAQNdTMnyDwoqtIaa5j8z6ZCf9Y9D2IfqeILeu91vkhJvpOMvfaotXyQq9k54E9MqY1Y4oQmsjyAaoa1AC1pkfTyXVJ13b' },
               url : 'https://na85.salesforce.com/services/apexrest/lead'
            },
            obtenerItemsPorLead : {
               method : 'GET',
               headers: { 'Authorization': 'Bearer 00D1U00000153FR!AQoAQNdTMnyDwoqtIaa5j8z6ZCf9Y9D2IfqeILeu91vkhJvpOMvfaotXyQq9k54E9MqY1Y4oQmsjyAaoa1AC1pkfTyXVJ13b' },
               url : 'https://na85.salesforce.com/services/apexrest/item'
            },
            agregarItem : {
               method : 'POST',
               headers: { 'Authorization': 'Bearer 00D1U00000153FR!AQoAQNdTMnyDwoqtIaa5j8z6ZCf9Y9D2IfqeILeu91vkhJvpOMvfaotXyQq9k54E9MqY1Y4oQmsjyAaoa1AC1pkfTyXVJ13b' },
               url : 'https://na85.salesforce.com/services/apexrest/item'
            }
         }
      );
      return resource;
}]);