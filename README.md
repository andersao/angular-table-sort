Angular Table Utils
===================

Instalação
-------

### Bower

Instale o pacote através do bower

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
bower install prettus-table-utils
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Adicione a dependencia no modulo da sua aplicação

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
angular.module('your-module', [
 	...,
    'prettus.table.utils'
]);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 

Uso
-------


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
angular.module('your-module')
.factory('Clientes', ['$resource', function($resource){
	return $resource('/clientes/:id');
}]);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
angular.module('your-module')
.controller('ClientesController',['$scope','Cliente', function($scope, Cliente){
	
	$scope.clientes = [];

	Cliente.get().$promise.then(function(response){
		$scope.clientes = response;
	});

	$scope.onSortTable = function(column, order){
		Cliente.get({orderBy:column, sortBy:order}).$promise.then(function(response){
			$scope.clientes = response;
		});
	};
}]);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<table prettus-table on-sort="onSortTable(column, order)" class="table table-striped">
    <thead>
    <tr>
        <th prettus-table-sort="nome" >Nome</th>
        <th prettus-table-sort="email" >Email</th>
        <th>Telefone</th>
    </tr>
    </thead>
    <tbody>
        <tr ng-repeat="cliente in clientes">
            <td>{{cliente.nome}}</td>
            <td>{{cliente.email}}</td>
            <td>{{cliente.telefone}}</td>
        </tr>
    </tbody>
</table>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~