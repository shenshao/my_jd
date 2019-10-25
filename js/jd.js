//商品信息栏目中间图片的轮播效果 
var index = 0;
var timer = null;
timer = setInterval(function () {
    index++;
    swiper();
}, 1500);
function swiper() {
    if (index > $('#lunbo-ul>li').length - 1) index = 0;
    if (index < 0) index = $('#lunbo-ul>li').length - 1;
    $('#lunbo-ul>li').fadeOut(1000).eq(index).fadeIn(1000);
    $('.lunbo-num span').removeClass('active').eq(index).addClass('active');
}
$('#lunbo-ul>li').mouseenter(function () {
    clearInterval(timer);
})
$('#lunbo-ul>li').mouseleave(function () {
    timer = setInterval(function () {
        index++;
        swiper();
    }, 1500);
})
$('.lt').click(function () {
    index--;
    swiper();
})
$('.gt').click(function () {
    index++;
    swiper();
})
//商品信息栏目的左侧边栏li切换div显示
$('.goods-left>ul>li').hover(function () {
    $('.div-none').eq($(this).index()).show().siblings('div').hide();
})
$('.goods-left>ul>li').mouseleave(function () {
    $('.div-none').hide();
})

//头部广告关闭按钮
$('.xx').click(function () {
    $('#guanggao-bg').hide();
})

//显示隐藏div企业采购
$('.jd-top-list #xianShi').hover(function () {
    $('.jd-top .caiGou').show();
}, function () {
    $('.jd-top .caiGou').hide();
});

//显示隐藏div客户服务
$('.jd-top-list #service').mouseenter(function () {
    $('.jd-top .fuWu').show();
});
$('.jd-top-list #service').mouseleave(function () {
    $('.jd-top .fuWu').hide();
});

//显示隐藏div网站导航
$('.jd-top-list #netNav').hover(function () {
    $('.jd-top .daoHang').show();
}, function () {
    $('.jd-top .daoHang').hide();
});

//京东金融下拉菜单效果
$('#jinRong').mouseenter(function () {
    $(this).children('div').stop().slideDown(1000);
})
$('#jinRong').mouseleave(function () {
    $(this).children('div').stop().slideUp(1000);
})

//京东秒杀商品栏目下的图片高亮显示效果
$('.miaosha-list>li').mouseenter(function () {
    $(this).fadeTo(200, 1).siblings().fadeTo(200, 0.2);
})
$('.miaosha-list').mouseleave(function () {
    $('.miaosha-list li').fadeTo(200, 1);
})

//城市的隐藏和显示效果
$('.city').hover(function () {
    $('.city-none').show();
}, function () {
    $('.city-none').hide();
});

//倒计时效果
function daoJiShi() {
    var date = new Date();
    var newDate = new Date('2019/10/25 00:00:00');
    var cha = Math.floor((newDate - date) / 1000);
    var hours = Math.floor(cha % 86400 / 3600) < 10 ? '0' + Math.floor(cha % 86400 / 3600) : Math.floor(cha % 86400 / 3600);//时
    var min = Math.floor(cha % 86400 % 3600 / 60) < 10 ? '0' + Math.floor(cha % 86400 % 3600 / 60) : Math.floor(cha % 86400 % 3600 / 60);//分
    var seconds = cha % 60 < 10 ? '0' + (cha % 60) : cha % 60;//秒
    $('#hours').text(hours);
    $('#min').text(min);
    $('#seconds').text(seconds);
}
setInterval(daoJiShi, 1000);

//验证登录用户名和密码是否规范


//时钟效果
var oT = document.getElementById("time");
var oH = document.getElementsByClassName('hour')[0];
var oM = document.getElementsByClassName('min')[0];
var oS = document.getElementsByClassName('sec')[0];
for (var i = 0; i < 60; i++) {
    var oSpan = document.createElement('span');
    if (i % 5) {
        oSpan.className = 'scale';
    } else {
        oSpan.className = 'big_scale';
        if (i == 0) {
            oSpan.innerHTML = "<em>" + 12 + "</em>";
        } else {
            oSpan.innerHTML = "<em>" + i / 5 + "</em>";
        }
        oSpan.children[0].style.transform = "rotate(" + -i * 6 + "deg)";
    }
    oT.appendChild(oSpan);
    oSpan.style.transform = "rotate(" + i * 6 + "deg)";
}
function move() {
    var date = new Date();
    oH.style.transform = "rotate(" + (date.getHours() + date.getMinutes() / 60) * 30 + "deg)";
    oM.style.transform = "rotate(" + (date.getMinutes() + date.getSeconds() / 60) * 6 + "deg)";
    oS.style.transform = "rotate(" + date.getSeconds() * 6 + "deg)";
}
setInterval(move, 1000);
move();

//时钟拖拽效果
var flag = false;
var _x, _y;
$('#time').mousedown(function (e) {
    flag = true;
    _x = e.pageX - parseInt($(this).css('left'));
    _y = e.pageY - parseInt($(this).css('top'));
})
$(document).mousemove(function (e) {
    if (flag) {
        var x = e.pageX - _x;
        var y = e.pageY - _y;
        $('#time').css({ 'left': x, 'top': y });
    }
}).mouseup(function () {
    flag = false;
})

//封装ajax对象
function ajax(method, url, data, cb) {
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // url += '?' + encodeURI(data) + '&' + (new Date().getTime());
    if (method === 'get' && data) {
        xhr.open(method, url += '?' + encodeURI(data) + '&' + (new Date().getTime()), true);
    } else {
        xhr.open(method, url, true);
    }
    if (method === 'post' && data) {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb(xhr.responseText);
            } else {
                alert('错误:' + xhr.responseText);
            }
        }
    }
}

//省市区三级联动
getDate($('#sheng'), {
    type: 1
}).then(function () {
    return getDate($('#city'), {
        type: 2,
        pnum: $('#sheng').val()
    })
}).then(function () {
    getDate($('#area'), {
        type: 3,
        pnum: $('#city').val()
    })
})
function getDate(ele, data) {
    return $get('../php/areas.php', data, function (data) {
        for (var i = 0; i < data.length; i++) {
            var $str = $('<opction' + data[i].aid + '>' + data[i].atitle + '</opction>');
            ele.append($str);
        }
    }, 'json')
}
$('#sheng').change(function () {
    getDate($('#city'), {
        type: 2,
        pnum: $(this).val()
    }).then(function () {
        getDate($('#area'), {
            type: 3,
            pnum: $('#city').val()
        })
    })
})
$('#city').change(function () {
    getDate($('#area'), {
        type: 3,
        pnum: $('#city').val()
    });
})








