/* 折线图组件对象 */

var H5ComponentPolyline = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    
    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    
    // 加入一个画布(网格线背景)
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    
    // 水平网格线 100份 -> 10份
    var step = 10,
        y = 0;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#aaa';
    
    for (var i=0; i<step+1; i++) {
        y = (h / step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    
    // 垂直网格线(根据项目个数分)
    var step_v = cfg.data.length + 1;
    var row_w = w / step_v;
    var text_w = row_w;
    
    for (var i=0; i<(step_v+1); i++) {
        x = row_w * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        
        if (cfg.data[i]) {
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css({
                'width': text_w / 2,
                'left': x / 2 + text_w / 4
            })
            
            component.append(text);
        }
    }
    
    ctx.stroke();
    
    // 加入一个画布(数据层)
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    /**
     * 绘制折现及对象的数据和阴影
     * @param  {float} per 0到1之间的数值, 会根据这个值绘制最终数据对应的中间状态
     * @return {DOM}     component元素
     */
    var draw = function(per) {
        // 清空画布
        ctx.clearRect(0, 0, w, h);
        
        // 绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff8878';
        var x = 0,
            y = 0;
        
        // 画点
        
        for (var i=0; i<cfg.data.length; i++) {
            x = row_w * (i + 1);
            y = h * (1 - cfg.data[i][1] * per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }
        
        // 连线
        // 移动画笔到第一个数据点位置
            
        ctx.moveTo(row_w, h * (1 - cfg.data[0][1] * per));
        
        for (var i=0; i<cfg.data.length; i++) {
            x = row_w * (i + 1);
            y = h * (1 - cfg.data[i][1] * per);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        // 绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255,136,120, 0.2)';
        ctx.fill();
        // 写数据
        ctx.textAlign = 'center';
        for (var i=0; i<cfg.data.length; i++) {
            x = row_w * (i + 1);
            y = h * (1 - cfg.data[i][1] * per);
            ctx.fillStyle = cfg.data[i][2] ? cfg.data[i][2] : '#595959';
            
            ctx.fillText(Math.round(cfg.data[i][1] * 100) + '%', x, y - 10);
        }
    }
    
    draw(0);
    
    component.on('onLoad', function() {
        // 折线图生长动画
        var s = 0;
        
        for (var i = 0; i<100; i++) {
            setTimeout(function() {
                s += 0.01;
                draw(s);
            }, i * 10 + 500);
        }
    });
    
    component.on('onLeave', function() {
        // 折线图退场动画
        var s = 1;
        
        for (var i = 0; i<100; i++) {
            setTimeout(function() {
                s -= 0.01;
                draw(s);
            }, i * 10);
        }
    });
    
    
    return component;
}