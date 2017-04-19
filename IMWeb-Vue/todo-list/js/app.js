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