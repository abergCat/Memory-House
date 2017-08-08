# Memory-House
记忆坊
## 标签选择指令

公共选择标签的指令来动态选择不同的标签值，勾选其他时可填写内容。

[指令html 源码](https://github.com/abergCat/Memory-House/blob/master/select_tag.html)

路由中引用"select_tag.js"

html 使用eg：

``` html
<div select-tag display-text="请选择" tag-item="1" ng-click="showTypeTalent()"></div>

```

[指令js 源码](https://github.com/abergCat/Memory-House/blob/master/select_tag.js)

controller 使用eg：

``` js
    /**
		 * 人才标签 typeTalent
		 */
		var talent = 0;
		$scope.showTypeTalent = function() {
			if (talent == 0) {
				$scope.$broadcast('tags1', $scope.typeTalent);
				talent++;
			}
		}
		$scope.$on('tagSelected1', function(event, data) {
			$scope.tagTalent = angular.copy(data.choosedData);
			$scope.tagTalent_isOther = data.isOther;
			$scope.tagTalent_others = data.others;
		});
```
