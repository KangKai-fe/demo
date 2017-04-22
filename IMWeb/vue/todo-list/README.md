
## 【IMWeb训练营作业】vue todoList
-------------------
> 7组 - kangkai
### demo展示

![demo展示](http://img.blog.csdn.net/20170419234558269?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM1MDM1OTA2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

[链接地址](http://kangkai-fe.github.io/vue/todolist)

### html 代码

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue todo list</title>
    <link rel="stylesheet" href="./css/index.css">
    <!-- 引入vue-core -->
    <script src="./js/vue.js"></script>
</head>
<body>
    <div class="page-top">
        <div class="page-content">
            <h2>任务计划列表</h2>
        </div>
    </div>
    <div id="app" class="main">
        <h3 class="big-title">添加任务：</h3>
        <input
            placeholder="请输入计划任务; 提示: 按回车即可添加任务"
            class="task-input"
            type="text"
            v-model="itemToAdd"
            @keyup.enter="addItem"
        />
        <ul class="task-count" v-show="filteredList.length">
            <li>{{ uncheckedCount }}个任务未完成</li>
            <li class="action">
                <a href="#"
	               :class="{
		               active: (currentHash === (''))
		           }"
			    >所有任务</a>
                <a href="#unchecked"
	               :class="{
		               active: currentHash === 'unchecked'
		           }"
		        >未完成的任务</a>
                <a href="#checked"
	               :class="{
		               active: currentHash === 'checked'
		           }"
		        >完成的任务</a>
            </li>
        </ul>
        <h3 class="big-title">任务列表：</h3>
        <div class="tasks">
            <span class="no-task-tip"
		          v-show="!filteredList.length"
		    >还没有添加任何任务</span>
            <ul class="todo-list">
                <li class="todo"
	                :class="{
		                completed: item.checked,
		                editing: index === indexBeingEdited
		            }"
	                v-for="(item, index) in filteredList"
	            >
                    <div class="view">
                        <input class="toggle"
		                       type="checkbox"
		                       v-model="item.checked"
		                />
                        <label @dblclick="editItem(item, index)">{{ item.content }}</label>
                        <button class="destroy"
		                        @click="deleteItem(index)"
		                ></button>
                    </div>
                    <input
                        v-focus="index === indexBeingEdited"
                        class="edit"
                        type="text"
                        v-model="item.content"
                        @blur="saveEditing()"
                        @keyup.13="saveEditing()"
                        @keyup.esc="cancelEditing(item)"
                    />
                </li>
            </ul>
        </div>
    </div>
    <script src="./js/app.js"></script>
</body>
</html>
```

### javascript 代码

``` js
// localStorage for data
var storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

// mock data
var todoList = [
    {
        content: 'vue',
        checked: true
    }, {
        content: 'vue-router',
        checked: false
    }, {
        content: 'vuex',
        checked: false
    }, {
        content: 'axios',
        checked: false
    }
]

// initializing
var vm = new Vue({
    el: '#app',
    data: {
        list: storage.get('todoList'),
        itemToAdd: '',
        indexBeingEdited: -1,
        contentBeingEdited: '',
        currentHash: ''
    },
    computed: {
        uncheckedCount: function () {
            return this.list.filter(item => !item.checked).length;
        },
        filteredList: function() {
            switch (this.currentHash) {
                case 'checked':
                    return this.list.filter(item => item.checked);
                    break;
                case 'unchecked':
                    return this.list.filter(item=>!item.checked);
                    break;
                default:
                    return this.list;
            }
        }
    },
    watch: {
        list: {
            handler: function() {
                storage.set('todoList', this.list);
            },
            deep: true // 监听数组内部值的变化
        }
    },
    methods: {
        addItem() {
            this.list.push({
                content: this.itemToAdd,
                checked: false
            });
            this.itemToAdd = '';
        },
        deleteItem(index) {
            this.list.splice(index, 1);
        },
        editItem(item, index) {
            this.indexBeingEdited = index;
            this.contentBeingEdited = item.content;
        },
        saveEditing() {
            this.indexBeingEdited = -1;
            this.contentBeingEdited = '';
        },
        cancelEditing(item) {
            item.content = this.contentBeingEdited;
            this.indexBeingEdited = -1;
            this.contentBeingEdited = '';
        }
    },
    directives: {
        focus: {
            update(el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        }
    }
});

// handle hashchange event
function hashChangeHandler() {
    vm.currentHash = window.location.hash.slice(1);
    console.log(vm.currentHash)
}

hashChangeHandler();

// watch hashchange event
window.addEventListener('hashchange', hashChangeHandler);
```