var H5_loading = function(images, firstPage) {
    
        var id = this.id;
        
        if (this._images === undefined) { // 第一次进入
        
            this._images = (images || []).length;
            this._loaded = 0;
            
            // 将当前对象存储在全局对象window中, 用来进行某个图片加载完成之后的回调
            window[id] = this;
            
            for (var i=0; i<images.length; i++) {
                var img = new Image;
                img.onload = function() {
                    window[id].loader();
                }
                img.src = images[i];
            }
            
            $('#rate').text('0%');
            return this;
            
        } else {
            this._loaded++;
            $('#rate').text(((this._loaded / this._images * 100) >> 0) + '%');
            
            if (this._loaded < this._images) {
                return this;
            }
            window[id] = null;
        }
    
        this.el.fullpage({
            onLeave: function(index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function(anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.el.show();
        this.page[0].find('.h5_component').trigger('onLoad');
        
        if (firstPage) {
            $.fn.fullpage.moveTo(firstPage);
        }
}