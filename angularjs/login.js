angular.module('loginFormApp', [])
  .controller('ExampleController', ['$scope', '$http',
    function ($scope, $http) {
      $scope.user = {};
      $scope.login_form = true;
      /**
       * method to get register page
       */
      $scope.showRegister = function () {
        $scope.login_form = false;
        $scope.register_form = true;
        $scope.alertMsg = false
      };
      /**
      * method to get login page
      */
      $scope.showLogin = function () {
        $scope.register_form = false;
        $scope.login_form = true;
        $scope.alertMsg = false
      };
      $scope.login = function () {
        $scope.registrations = {};
        $http({
          method: 'post',
          dataType: 'json',
          data: $scope.user,
          url: 'http://localhost/codeigniter/login',

          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
          debugger
          /**
           * condition to get alert message
           */
          if (data.data.errr != '') {
            $scope.alertMsg = true;
            $scope.alertClass = 'alert-danger';
            $scope.alertMessage = data.data.errr;
          }
          else {
            location.reload();
          }
          $scope.alertMessage = data.data.message;
          $scope.alertMsg = true;
          $scope.successMessage = "LOGIN successfully";
          $scope.registrations = data;

        });

      };

      $scope.registration = function () {

        $scope.registrations = {};
        $http({
          method: 'post',
          dataType: 'json',
          data: $scope.user,
          url: 'http://localhost/codeigniter/insert',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
          debugger
          $scope.successMessage = "Form submitted successfully";
          $scope.registrations = data;
          if (data.data.error != '') {
            $scope.alertMsg = true;
            $scope.alertMessage = data.data.error;
          }
          else {
            $scope.alertMsg = true;
            $scope.alertMessage = data.data.message;
          }
          // window.location = 'index.html';
        });

      };
      // $scope.reset();
    }]);


