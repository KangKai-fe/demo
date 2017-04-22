## 【IMWeb训练营作业】custom-select
-------------------
> 7组 - kangkai
### demo展示

![demo展示](http://img.blog.csdn.net/20170422113029465?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM1MDM1OTA2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

demo: [http://kangkai-fe.github.io/demo/vue/custom-select/](http://kangkai-fe.github.io/demo/vue/custom-select/)
github: [https://github.com/KangKai-fe/demo/tree/master/IMWeb/vue/custom-select](https://github.com/KangKai-fe/demo/tree/master/IMWeb/vue/custom-select)

### html 代码

``` html
<div id="app">
	<section class="container">
		<h3>列表一</h3>
		<custom-select :list="listOne.list" :btn="listOne.btn"></custom-select>
	</section>
	<section class="container">
		<h3>列表二</h3>
		<custom-select :list="listTwo.list" :btn="listTwo.btn"></custom-select>
	</section>
</div>
```

### javascript 代码

``` js
//注册组件
Vue.component("custom-select", {
	props: ['btn', 'list'],
	data: function () {
		return {
			listShown: false,
			searchValue: ''
		}
	},
	template: `<div class="searchIpt clearFix">
				<div class="clearFix">
					<input placeholder="点击查询" type="text" class="keyWord"
						:value="searchValue"
						@focus="listShown = !listShown"
					/>
					<input type="button"
						:value="btn"
						@click="listShown = !listShown"
					/>
				</div>
				<custom-list
					:list="list"
					@listClicked="listClickedHandler"
					v-show="listShown"
				></custom-list>
			</div>`,
	methods: {
		listClickedHandler(value) {
			this.listShown = false;
			this.searchValue = value;
		}
	}
});

Vue.component('custom-list', {
	props: ['list'],
	template: `<ul class="list">
				<li
					v-for="item in list"
					@click="listClicked(item)"
				>{{ item }}</li>
			</ul>`,
	methods: {
		listClicked(value) {
			this.$emit('listClicked', value);
		}
	}
})

new Vue({
	el: "#app",
	data: {
		listOne: {
			btn: '城市',
			list: ['北京', '上海', '广州', '石家庄']
		},
		listTwo: {
			btn: 'Vue',
			list: ['vue', 'vue-router', 'vuex', 'vue-cli']
		}
	}
})
```
