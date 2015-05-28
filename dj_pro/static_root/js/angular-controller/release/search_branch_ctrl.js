routeapp.controller('search_branch_ctrl', function($scope, Project_Item ,$http) {
    $scope.project_id = (window.location.pathname).split('/')[3];
    $scope.oneAtATime = true;   // not allow to open all project at one time

    $scope.items_list = [];
    Project_Item.query(function(pro_items){
        for(i in pro_items){
            if(pro_items[i].pro_group == $scope.project_id){
                $scope.items_list.push(pro_items[i]);
            };
        };
        console.log($scope.items_list);
        $scope.status = {
            isItemOpen: new Array($scope.items_list.length),
    	    open: false,
	        isFirstDisabled: false
        };
    });
    
    $scope.show_branch = false;

    $scope.toggle_branch = function(pro_name ,showhide){
        $scope.branches[pro_name+'show'] = !showhide;
        console.log($scope.branches[pro_name+'show']);
        console.log(pro_name+'show');
    };


    $scope.nowbranch = {};
    $scope.branches = {};
    $scope.search_branch = function(pro){
        console.log(pro);
        // return;
        $http({
                method: 'POST',
                url: '/release/project_item_api/branch_list/',
                data: JSON.stringify(pro),
            }).success(function(result){
		for(i in $scope.items_list){
		    if(pro.pro_name == $scope.items_list[i].pro_name){
			var key = $scope.items_list[i].pro_name;
			var showkey = $scope.items_list[i].pro_name + 'show';
			$scope.nowbranch[key] = result[1];
			$scope.branches[key] = result[0];
			$scope.branches[showkey] = false;
		    };
		};
		console.log($scope.nowbranch);
                console.log($scope.branches);
            }).error(function(err){
                console.log('error');
            });
    };

    $scope.change_branch = function(branch){
        $http({
                method: 'POST',
                url: '/release/project_item_api/branch_change/',
                data: {'branch': branch},
            }).success(function(result){
                console.log(result);
            }).error(function(err){
                console.log('error');
            }); 
    };

});
