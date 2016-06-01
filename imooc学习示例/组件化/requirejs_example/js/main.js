require(['tabview', 'treeview'], function(tab, tree) {
    var tabview = new tab.Tabview(),
        treeview = new tree.Treeview();
    alert(tabview.name);
    alert(treeview.name);
    alert(tabview.animate.name);
})