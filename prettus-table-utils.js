angular
    .module('prettus.table.utils',[])
    .constant('prettusTableConfig',{
        'classAsc' :'fa fa-sort-asc',
        'classDesc':'fa fa-sort-desc',
        'classAlphaAsc' :'fa fa-sort-alpha-asc',
        'classAlphaDesc':'fa fa-sort-alpha-desc',
        'classNumericAsc' :'fa fa-sort-numeric-asc',
        'classNumericDesc':'fa fa-sort-numeric-desc',
        'classAmountAsc' :'fa fa-sort-amount-asc',
        'classAmountDesc':'fa fa-sort-amount-desc',
        'sortDefault':'reverse',
        'sortTypeDefault':'default'
    })
    .controller('prettusTableSortController', ['$scope', '$filter', '$attrs',function($scope, $filter, $attrs){

        var tableState = {
            sort: {}
        };

        this.sortBy = function sortBy(column, reverse) {

            tableState.sort = {
                column :column,
                reverse:reverse,
                order  :reverse ? 'desc' : 'asc'
            };

            if( angular.isFunction($scope.onSort) ){
                $scope.onSort(tableState.sort);
            }
        };

        this.tableState = function getTableState() {
            return tableState;
        };

    }])
    .directive('prettusTable', [function(){
        return {
            restrict    : 'A',
            controller  : 'prettusTableSortController',
            scope:{
                onSort:"&"
            },
            link:function(scope, element, attr, ctrl){

            }
        };
    }])
    .directive('prettusTableSort', ['prettusTableConfig',function(prettusTableConfig){
        return {
            require:'^prettusTable',
            restrict: 'A',
            link:function(scope, element, attr, ctrl){

                var column       = attr.prettusTableSort;
                var index        = 0;

                var classAscent  = attr.classAscent   || null;
                var classDescent = attr.classDescent  || null;

                var sortType     = attr.sortType      || prettusTableConfig.sortTypeDefault;

                if( sortType == "" || sortType == null ){
                    sortType = 'default';
                }

                if( sortType == 'default' ){
                    classAscent  = classAscent  != null ? classAscent  : prettusTableConfig.classAsc;
                    classDescent = classDescent != null ? classDescent : prettusTableConfig.classDesc;
                }else if(sortType == 'alpha'){
                    classAscent  = prettusTableConfig.classAlphaAsc;
                    classDescent = prettusTableConfig.classAlphaDesc;
                }else if(sortType == 'numeric'){
                    classAscent  = prettusTableConfig.classNumericAsc;
                    classDescent = prettusTableConfig.classNumericDesc;
                }else if(sortType == 'amount'){
                    classAscent  = prettusTableConfig.classAmountAsc;
                    classDescent = prettusTableConfig.classAmountDesc;
                }

                var stateClasses = [classAscent, classDescent];

                function sort() {
                    index++;
                    ctrl.sortBy(column, index % 2 === 0);
                }

                element.bind('click', function sortClick() {
                    scope.$apply(sort);
                });

                if (attr.sortDefault !== undefined) {
                    index = attr.sortDefault === 'reverse' ? 1 : 0;
                    sort();
                }

                scope.$watch(function () {
                    return ctrl.tableState().sort;
                }, function (newValue) {

                    if( element.find('i').length == 0 ){
                        element.prepend(document.createElement('i'));
                    }

                    var elementIcon = element.find('i');

                    if (newValue.column !== column) {
                        index = 0;
                        elementIcon.removeClass(classAscent).removeClass(classDescent);
                    } else {
                        index = newValue.reverse === true ? 2 : 1;
                        elementIcon.removeClass(stateClasses[index % 2]).addClass(stateClasses[index - 1]);
                    }
                }, true);
            }
        };
    }]);


