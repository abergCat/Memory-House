app.directive("selectTag", function() {

	return {
		restrict: "A",
		template: __inline('./select_tag.html'),
		replace: true,
		scope: {
			displayText: "@",
			tagItem: "=tagItem",
			selectedObject: '=selectedData',
		},
		link: function(scope, element, ngModel) {

		},
		controller: ['$scope', function($scope) {
			$scope.lab = {}; //标签数组
			$scope.lab.choosed = []; //选中对象数组--跟随每次选择动作变化
			$scope.lab.choosedID = []; //选中对象ID数组--跟随每次选择动作变化
			$scope.sure = []; //备份数组
			$scope.sureIDs = []; //备份数组
			$scope.isOther = false; // 是否选择其他
			$scope.no = false; //未勾选其他 内容不可填
			$scope.edit = []; //父级传来已有数组 -- 为第一次选值取消不清空使用

			//接受父级传过来的标签数据
			$scope.$on('tags' + $scope.tagItem, function(event, data) {
				$scope.data = data;
				$scope.no = data.no;
			})

			//接受父级传过来的标签数据--编辑已有
			$scope.$on('tag' + $scope.tagItem, function(event, data) {
				$scope.edit = data;
				for (var i = 0, len = data.length; i < len; i++) {
					var index = $scope.lab.choosedID.indexOf(data[i].id);
					if (index == -1) {
						$scope.lab.choosed.push(data[i]);
						$scope.lab.choosedID.push(data[i].id);

						$scope.sure.push(data[i]);
						$scope.sureIDs.push(data[i].id);
					}
				}
				$scope.sureTag();
			})

			//显示选择框
			$scope.tag = function() {
				$("#selectTag" + $scope.tagItem).modal("show");
			}

			//查看数组中是否有某值
			$scope.arrayIndexOf = function(arr, val) {
				var l = arr.length;
				for (var i = 0; i < l; i++) {
					if (arr[i] == val) return i;
				}
				return -1;
			}

			//选中当前
			$scope.selThis = function(item) {
				var index = $scope.lab.choosedID.indexOf(item.id);
				if (index == -1) {
					$scope.lab.choosed.push(item);
					$scope.lab.choosedID.push(item.id);
				}
			}

			//清除当前
			$scope.cleThis = function(item) {
				var index = $scope.lab.choosedID.indexOf(item.id);
				$scope.lab.choosed.splice(index, 1);
				$scope.lab.choosedID.splice(index, 1);
			}

			//确定
			$scope.sureTag = function() {
				var data = {
					'choosedData': $scope.lab.choosed,
					'others': $('#others' + $scope.tagItem).val(),
					'isOther': $scope.isOther //是否选择其他
				}
				$scope.$emit('tagSelected' + $scope.tagItem, data);
				$("#selectTag" + $scope.tagItem).modal("hide");
				$scope.sure = angular.copy($scope.lab.choosed);
				$scope.sureIDs = angular.copy($scope.lab.choosedID);
			}

			//取消
			$scope.cancelTag = function() {
				$scope.lab.choosed = angular.copy($scope.sure);
				$scope.lab.choosedID = angular.copy($scope.sureIDs);
				$("#selectTag" + $scope.tagItem).modal("hide");
			}

		}]
	};
});
