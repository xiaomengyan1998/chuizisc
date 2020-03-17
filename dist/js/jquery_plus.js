$.fn.extend({
    drag: function(){
        //this == $("div");
        //$($(this))
        // alert(this); //[object Object]
        this.mousedown(function(ev){
           
            var offsetX = ev.pageX - $(this).offset().left;
            var offsetY = ev.pageY - $(this).offset().top;
            var _this = this; //将当前按下的div记录一下
            $(document).mousemove(function(ev){
                $(_this).css({
                    left: ev.pageX - offsetX,
                    top: ev.pageY - offsetY
                })
            })
        })
        $(document).mouseup(function(){
            $(document).off("mousemove");
        })
        return this;
    }
})
$.fn.extend({
    tab: function(){
        //this = $("#div1");
        var aBtn = this.find("button");
        var aDivs = this.find("div");
        aBtn.click(function(){
            $(this).addClass("active").siblings("button").removeClass("active");
            aDivs.hide().eq($(this).index()).show();
        })
        return this;
    }
})