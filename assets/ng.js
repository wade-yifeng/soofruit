var app=angular.module("app",["ngRoute"]);app.config(["$routeProvider",function(r){r.when("/order/create",{controller:"OrderCtrl",templateUrl:"/order/create.html"}).otherwise({redirectTo:"/order/create"})}]);var app=angular.module("app");app.controller("OrderCtrl",["$scope","$http",function(r,e){r.order={customer:"leo",amount:0,delivery_date:new Date},r.createOrder=function(r){e.post("/orders",r,function(r){alert(r)})}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci5qcyIsIm9yZGVyLmpzIl0sIm5hbWVzIjpbImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJjb250cm9sbGVyIiwidGVtcGxhdGVVcmwiLCJvdGhlcndpc2UiLCJyZWRpcmVjdFRvIiwiJHNjb3BlIiwiJGh0dHAiLCJvcmRlciIsImN1c3RvbWVyIiwiYW1vdW50IiwiZGVsaXZlcnlfZGF0ZSIsIkRhdGUiLCJjcmVhdGVPcmRlciIsInBvc3QiLCJkYXRhIiwiYWxlcnQiXSwibWFwcGluZ3MiOiJBQUdBLEdBQUlBLEtBQU1DLFFBQVFDLE9BQU8sT0FDckIsV0FHSkYsS0FBSUcsUUFBQSxpQkFBTyxTQUFVQyxHQUNqQkEsRUFDS0MsS0FBSyxpQkFFRUMsV0FBWSxZQUNaQyxZQUFhLHVCQUVwQkMsV0FDR0MsV0FBWSxvQkNaeEIsSUFBSVQsS0FBTUMsUUFBUUMsT0FBTyxNQUV6QkYsS0FBSU0sV0FBVyxhQUFBLFNBQUEsUUFBYSxTQUFVSSxFQUFRQyxHQUMxQ0QsRUFBT0UsT0FDSEMsU0FBVSxNQUNWQyxPQUFRLEVBQ1JDLGNBQWUsR0FBSUMsT0FHdkJOLEVBQU9PLFlBQWMsU0FBVUwsR0FDM0JELEVBQU1PLEtBQUssVUFBV04sRUFBTyxTQUFVTyxHQUNuQ0MsTUFBTUQiLCJmaWxlIjoibmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB4el9saXUgb24gMjAxNi8zLzkuXHJcbiAqL1xyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcclxuICAgICduZ1JvdXRlJ1xyXG5dKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvb3JkZXIvY3JlYXRlJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ09yZGVyQ3RybCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9vcmRlci9jcmVhdGUuaHRtbCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9vcmRlci9jcmVhdGUnXHJcbiAgICAgICAgfSk7XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHh6X2xpdSBvbiAyMDE2LzMvOS5cclxuICovXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyk7XHJcblxyXG5hcHAuY29udHJvbGxlcignT3JkZXJDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHApIHtcclxuICAgICRzY29wZS5vcmRlciA9IHtcclxuICAgICAgICBjdXN0b21lcjogJ2xlbycsXHJcbiAgICAgICAgYW1vdW50OiAwLFxyXG4gICAgICAgIGRlbGl2ZXJ5X2RhdGU6IG5ldyBEYXRlKClcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNyZWF0ZU9yZGVyID0gZnVuY3Rpb24gKG9yZGVyKSB7XHJcbiAgICAgICAgJGh0dHAucG9zdCgnL29yZGVycycsIG9yZGVyLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBhbGVydChkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
