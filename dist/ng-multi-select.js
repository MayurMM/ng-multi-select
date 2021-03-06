/*!
 * See LICENSE in this repository for license information
 */
(function(){
'use strict';

angular
  .module('ng-multi-select', [])
  .value('version', '0.1');

/*!
 * See LICENSE in this repository for license information
 */
(function(){
  'use strict';

  angular
      .module('ng-multi-select', [])
      .value('version', '0.1');

  /*!
   * See LICENSE in this repository for license information
   */
  (function(){
    'use strict';

    angular
        .module('ng-multi-select', [])
        .value('version', '0.1');

    'use strict';

    angular.module('ng-multi-select').directive('taDropDownGroup',function(){
      return{
        controller:function(){
          var vm = this;
          vm.groups = [];
          vm.closeOthers = function(item){
            item.isOpen = true;
            vm.groups.forEach(function(d){
              if(d != item){
                d.isOpen = false;
              }
            });
          };
          vm.addGroup = function(item){
            vm.groups.push(item);
          };

        },
        controllerAs:'taDropDownGroup'
      }

    });
    angular.module('ng-multi-select').directive('taDropDown',["$templateCache", "$timeout", "$document", function($templateCache,$timeout,$document){


      var processTemplate = function(taItemTemplate){
        var itemTemplate = taItemTemplate? '<div class="ta-list-main" ng-include="\''+taItemTemplate+'\'"></div>':'<span  class = "ta-list-main" data-ng-bind=\"i[itemName]\"></span>';

        var mainTemplate = "<div class=\"multi-box\"><div class=\"multi-box-detail\"><span data-ng-bind=\"multiSelectItems\"></span></div><div class=\"multi-box-icon\"><i class=\"glyphicon glyphicon-triangle-bottom\"></i></div></div><div data-ng-hide=\"show\" class=\"shadow-div\"><div class=\"form-group has-feedback\"><input type=\"text\" placeholder=\"search\" data-ng-model=\"term\" data-ng-change=\"query()\" class=\"form-control\"/><span data-ng-show=\"term === \'\'||!term\" class=\"glyphicon glyphicon-search form-control-feedback\"></span><span data-ng-show=\"term &amp;&amp; term !== \'\'\" data-ng-click=\"cancelSearch()\" class=\"glyphicon glyphicon-remove-circle search-box-icon\"></span></div><ul class=\"list-unstyled\"><li data-ng-show=\"term\" class=\"ta-list-header\">Search Results: {{taItems.length}}</li><li item=\"i\" data-ng-repeat=\"i in taItems | filter:term \" data-ng-hide=\"defaultFlag\" data-ng-click=\"vm.select(i)\" class=\"ta-list-item\"><div class=\"row\"><div class=\"col-md-10\">"+itemTemplate+"</span></div><div class=\"col-md-2\"><i data-ng-show=\"i.selected\" class=\"pull-right glyphicon glyphicon-ok gi-2x create-color\"></i></div></div></li><li data-ng-show=\" selectedItems &amp;&amp; selectedItems.length &gt; 0\" class=\"ta-list-header\">Selected Items:</li><li item=\"i\" data-ng-repeat=\"i in selectedItems\" data-ng-click=\"vm.select(i)\" class=\"ta-list-item\"><div class=\"row\"><div class=\"col-md-10\">"+itemTemplate+"</span></div><div class=\"col-md-2\"><i class=\"pull-right glyphicon glyphicon-ok gi-2x create-color\"></i></div></div></li><li data-ng-show=\"defaultFlag\" class=\"ta-list-header\">Suggested List:</li><li item=\"i\" data-ng-repeat=\"i in taDefaultItems\" data-ng-show=\"defaultFlag\" data-ng-click=\"vm.select(i)\" class=\"ta-list-item\"><div class=\"row\"><div class=\"col-md-10\">"+itemTemplate+"</span></div></div></li></ul></div>";
        return mainTemplate;
      };

      return{
        transclude: true,
        require:['?^taDropDownGroup','taDropDown'],
        template: function(elem,attrs){
          return processTemplate(attrs.taItemTemplate);
        },
        scope: {
          search: '&',
          select: '&',
          taItems: "=",
          taDefaultItems: '=',
          taLabel: '=',
          selectedItems: "=?",
          multiSelect: "@"
        },
        controller:["$scope", function($scope){
          var vm = this;
          $scope.defaultFlag = true;
          $scope.items = [];
          $scope.hide = true;
          vm.remoteSearch = false;
          $scope.multiSelectItems = "All";
          $scope.term="";

          if(!$scope.selectedItems){
            $scope.selectedItems= [];

          }

          vm.createActivate = function(active){
            $scope.createFlag = active;
          };
          $scope.cancelSearch = function(){
            $scope.term = "";
            if(vm.remoteSearch){$scope.taItems = []};
            $scope.defaultFlag = true;
          }
          $scope.showDefaultItems = function(){
            if($scope.taItems){
              return $scope.taItems.length === 0;
            }
            else{
              return false;
            }
          };

          vm.activate = function(item) {
            $scope.active = item;
          };
          vm.activateNextItem = function() {
            var index = $scope.taItems.indexOf($scope.active);
            vm.activate($scope.taItems[(index + 1) % $scope.taItems.length]);
          };

          vm.activatePreviousItem = function() {
            var index = $scope.taItems.indexOf($scope.active);
            vm.activate($scope.taItems[index === 0 ? $scope.taItems.length - 1 : index - 1]);
          };

          vm.isActive = function(item) {
            return $scope.active === item;
          };

          vm.selectActive = function() {
            vm.select($scope.active);
          };

          vm.select = function(item) {
            item.taId = item[$scope.itemName];

            var output = "";
            var idx = $scope.selectedItems.indexOf(item);
            if(item.selected){
              item.selected = false;
              $scope.selectedItems.splice(idx,1);
              if($scope.taDefaultItems){
                $scope.taDefaultItems.push(item);
              }
              else{
                $scope.taItems.push(item);
              }

            }
            else{
              item.selected = true;
              if(idx === -1){
                $scope.selectedItems.push(item);
                if($scope.taDefaultItems){
                  var i = _.findIndex($scope.taDefaultItems,function(d,i){
                    return d[$scope.itemName] === item[$scope.itemName];
                  });
                  $scope.taDefaultItems.splice(i,1)
                }
                else{
                  var i = _.findIndex($scope.taItems,function(d,i){
                    return d[$scope.itemName] === item[$scope.itemName];
                  })
                  $scope.taItems.splice(i,1);
                }
                ;
              }
            }


            $scope.selectedItems.forEach(function(d,i){
              output = output+ d[$scope.itemName]+', ';
            });
            $scope.multiSelectItems = output? output.substring(0,output.length-2): "All";
            $scope.select({item:item});
          };

          vm.showTooltip = function(){

            $scope.hide = false;
            $scope.focused = true;
          };
          vm.removeSelectedItem = function(){
            $scope.selectedItems.pop();
          };
          $scope.showCreateElement = function(){
            if($scope.term && $scope.createFlag){

              return $scope.term.length >= 3;
            }
          };
          $scope.createItem = function(){
            var itemobj = {};
            itemobj[$scope.itemName] = $scope.term;
            $scope.selectedItems.push(itemobj);
            $scope.create({taitem: $scope.term});
            $scope.term = null;
          };

          $scope.isVisible = function() {
            return $scope.isOpen && !$scope.hide && ($scope.focused || $scope.mousedOver);
          };


          $scope.query = function() {
            $scope.hide = false;
            if($scope.term){
              console.log(vm.remoteSearch);;
              if(vm.remoteSearch){
                $scope.search({term:$scope.term});
              }

            }
            else{
              if(vm.remoteSearch){
                console.log('m here');
                $scope.taItems = [];
              }
              if($scope.taDefaultItems) $scope.defaultFlag = true;
            }

          };


        }],
        controllerAs:'vm',
        link: function(scope,element,attr,ctrl){
          var groupController = ctrl[0];
          if(groupController){
            groupController.addGroup(scope);
          }
          else{
            scope.isOpen = true;
          }
          var controller = ctrl[1];
          var $input = element.find('.multi-box');
          //var $tooltip = element.find('.fa-sort-desc');
          var $list = element.find('> .shadow-div');
          var w= element.parent()[0].offsetWidth;

          w = w>=450?w:400;

          controller.remoteSearch = attr.search? true: false;

          scope.itemName = attr.taName;
          scope.taLabel = attr.taLabel;

          element.on('click',function(e){
            e.stopPropagation();
          });

          $input.bind('click',function(){
            if(groupController){
              groupController.closeOthers(scope);
            }
            scope.$apply(function(){
              controller.showTooltip();
            });
          });
          $document.click(function(){
            scope.$apply(function(){
              if(controller.remoteSearch) { scope.taItems = [];}
              if(attr.taDefaultItems) scope.defaultFlag = true;
              //scope.defaultFlag = true;
              scope.term = "";
              scope.hide = true ;
            });
          });
          $input.bind('focus', function() {
            scope.$apply(function() { scope.focused = true; });
          });

          $input.bind('blur', function() {
            scope.$apply(function() { scope.focused = false; });
          });

          $list.bind('mouseover', function() {
            scope.$apply(function() { scope.mousedOver = true; });
          });

          $list.bind('mouseleave', function() {
            scope.$apply(function() { scope.mousedOver = false; });
          });

          $input.bind('keyup', function(e) {
            if (e.keyCode === 13) {
              scope.$apply(function() { controller.selectActive(); });
            }

            if (e.keyCode === 27) {
              scope.$apply(function() {
                // scope.hide = true;
              });
            }
          });

          $input.bind('keydown', function(e) {
            if ( e.keyCode === 13 || e.keyCode === 27) {
              e.preventDefault();
            };

            if (e.keyCode === 40) {
              e.preventDefault();
              scope.$apply(function() { controller.activateNextItem(); });
              scope.hide = false;
            }
            if(e.keyCode === 8 && !scope.term){
              e.preventDefault();
              scope.$apply(function(){ controller.removeSelectedItem(); });

            }
            if (e.keyCode === 38) {
              e.preventDefault();
              scope.$apply(function() { controller.activatePreviousItem(); });
            }
          });

          scope.$watch('taItems', function(items) {
            if(!items || items.length === 0){
              //scope.hide = true;
            }
            else{
              console.log(items);

              items.forEach(function(d1){
                d1.taId = d1[scope.itemName];
                if(scope.selectedItems){
                  scope.selectedItems.forEach(function(d2){
                    if(d1[scope.itemName] === d2[scope.itemName]){
                      d1.selected = true;
                    }
                  })
                }
              });
              scope.defaultFlag = false;
              controller.activate(items.length ? items[0] : null);
            }

          },true);

          scope.$watch('focused', function(focused) {
            if (focused) {
              $timeout(function() { $input.focus(); }, 0, false);
            }
          });

          scope.$watch('isVisible()', function(visible) {
            if (visible) {
              var pos = $input.position();
              var height = $input[0].offsetHeight;

              $list.css({
                "width": w,
                top: pos.top + height,
                left: pos.left,
                position: 'absolute',
                display: 'block',
                "z-index": '10',
                "background-color": 'white'
              });
            } else {
              $list.css('display', 'none');
            }
          });
        }

      }
    }]);

  })();
})();
angular.module("ng-multi-select").run(["$templateCache", function($templateCache) {$templateCache.put("taDropDown.html","<div class=\"multi-box\"><div class=\"multi-box-detail\"><span data-ng-bind=\"multiSelectItems\"></span></div><div class=\"multi-box-icon\"><i class=\"glyphicon glyphicon-triangle-bottom\"></i></div></div><div data-ng-hide=\"show\" class=\"shadow-div\"><div class=\"form-group has-feedback\"><input type=\"text\" placeholder=\"search\" data-ng-model=\"term\" data-ng-change=\"query()\" class=\"form-control\"/><span data-ng-show=\"term === \'\'||!term\" class=\"glyphicon glyphicon-search form-control-feedback\"></span><span data-ng-show=\"term &amp;&amp; term !== \'\'\" data-ng-click=\"cancelSearch()\" class=\"glyphicon glyphicon-remove-circle search-box-icon\"></span></div><ul class=\"list-unstyled\"><li data-ng-show=\"term\" class=\"ta-list-header\">Search Results: {{taItems.length}}</li><li item=\"i\" data-ng-repeat=\"i in taItems | filter:term \" data-ng-hide=\"defaultFlag\" data-ng-click=\"vm.select(i)\" class=\"ta-list-item\"><div class=\"row\"><div class=\"col-md-10\"><span data-ng-bind=\"i[itemName]\"></span></div><div class=\"col-md-2\"><i data-ng-show=\"i.selected\" class=\"pull-right glyphicon glyphicon-ok gi-2x create-color\"></i></div></div></li><li data-ng-show=\" selectedItems &amp;&amp; selectedItems.length &gt; 0\" class=\"ta-list-header\">Selected Items:</li><li item=\"i\" data-ng-repeat=\"i in selectedItems\" data-ng-click=\"vm.select(i)\" class=\"ta-list-item\"><div class=\"row\"><div class=\"col-md-10\"><span data-ng-bind=\"i[itemName]\"></span></div><div class=\"col-md-2\"><i class=\"pull-right glyphicon glyphicon-ok gi-2x create-color\"></i></div></div></li><li data-ng-show=\"defaultFlag\" class=\"ta-list-header\">Suggested List:</li><li item=\"i\" data-ng-repeat=\"i in taDefaultItems\" data-ng-show=\"defaultFlag\" data-ng-click=\"vm.select(i)\" class=\"ta-list-item\"><div class=\"row\"><div class=\"col-md-10\"><span data-ng-bind=\"i[itemName]\"></span></div></div></li></ul></div>");
$templateCache.put("taDropDownItem.html","<!--Created by mayur_2 on 3/22/2016.\n--><li ng-transclude=\"ng-transclude\" class=\"ta-list-item\"></li>");}]);
})();