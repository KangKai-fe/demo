define(['animate'], function(a) {
    function Tabview() {
        this.name = 'Tabview';
        this.animate = new a.Animate();
    }
    return {
        Tabview: Tabview
    }
})