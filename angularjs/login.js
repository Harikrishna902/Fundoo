

angular.module('loginFormApp', [])
  .controller('ExampleController', ['$scope', '$http', '$window',
    function ($scope, $http, $window) {

      $scope.user = {};
      $scope.login_form = true

      $scope.showRegister = function () {
        $scope.login_form = false;
        $scope.register_form = true;
        $scope.alertMsg = false
      };

      $scope.showLogin = function () {
        $scope.register_form = false;
        $scope.login_form = true;
        $scope.alertMsg = false
      };

      $scope.login = function () {
        $scope.registrations = {};
        /**
         * ajax
         */
        $http({
          method: 'post',
          dataType: 'json',
          data: $scope.user,
          /**
           * calling the api
           */
          url: 'http://localhost/codeigniter/sigin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
          debugger
          // alert(data);
          // alert(data[error]);
          if (data.data.errr != '') {
            $scope.alertMsg = true;
            $scope.alertClass = 'alert-danger';
            $scope.alertMessage = data.data.errr;
          }
          else {
            //   location.reload(); 

            $window.location.href = 'http://localhost/codeigniter/angularjs/welcome.html';
            $scope.alertMsg = true;


            $scope.successMessage = "LOGIN successfully";
            $scope.registrations = data;
          }

        });

      };

      $scope.registration = function () {

        $scope.registrations = {};
        $http({
          method: 'post',
          dataType: 'json',
          data: $scope.user,
          /**
           * calling the api
           */
          url: 'httd://localhost/codeigniter/insert',
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
    }]);
/**
 * jquery mouseover event
 */
$(document).ready(function () {
  $(".id").mouseover(function () {
    $(".id").css("background-color", "lightgray");
  })
  $(".id").mouseout(function () {
    $(".id").css("background-color", "white");
  })
});


