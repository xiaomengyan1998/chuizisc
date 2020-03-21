window.onload = function(){
    var oSmall = document.getElementById("small");
    var oMark = document.getElementById("mark");

    var oBig = document.getElementById("big");
    var oBigImg = oBig.getElementsByTagName("img")[0];
// *************************
    // var oA1 = document.getElementById("ap");
    // var oAdp = document.getElementById("adp");
    // oA1.onclick=function(ev){
    //     ev.preventDefault();
    //     // alert("ak");
    //     oAdp.style.display="block";
    //    //延时器
    //     setTimeout(function(){
    //         oAdp.style.display="none";
    //     },6000)
    // }

//********************* */



    oSmall.onmouseenter = function(){
        oMark.style.display = 'block';
        oBig.style.display = 'block';
    }

    oSmall.onmouseleave = function(){
        oMark.style.display = 'none';
        oBig.style.display = 'none';
    }

    oSmall.onmousemove = function(ev){
        var e = ev || window.event;
        var l = e.clientX - oSmall.offsetLeft - 100;
        if(l <= 0){
            l = 0;
        }
        if(l >= 300){
            l = 300;
        }

        
        var t = e.clientY - oSmall.offsetTop - 100;
        if(t <= 0){
            t = 0;
        }
        if(t >= 400){
            t = 400;
        }
        oMark.style.left = l + 'px';
        oMark.style.top = t + 'px';

        //放大的图片要反向移动对应倍数的距离
        oBigImg.style.left = -2 * l + 'px';
        oBigImg.style.top = -2 * t + 'px';
    }
}