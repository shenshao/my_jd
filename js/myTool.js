/*
这是一个 个人的小工具库
里面放置了很多封装好的函数 可以方便调用 提高开发效率
1 封装了个$函数 用来获取元素的方法 （可以获取id  可以获取标签名  还可以获取类名 解决兼容性问题）
	参数1： “#div"  “.div”  "div"  
	参数2： 某个父级 默认不传 是document

2 封装了一个获取样式的兼容性函数 
	getStyle()
	参数1: 某个元素   "div"
	参数2: 要获取什么属性 “width”

3 获取最终位置（某个元素距离浏览器最外层的距离）的函数
	getPos() 
	参数： 需要指定一个元素 最终会返回 这个元素距离浏览器最外层的总距离

4 封装了四个 获取元素节点的 方法 解决了兼容性问题  方便获取节点 提高开发效率
	first()
	last()
	上面两个方法 参数是某个父级

	prev()
	next()
	这两个方法 传入的是并列的兄弟节点
*/




// 我希望这一个函数 既能实现id获取  tagName获取元素
// id  标签名
// #div   div  .aa css选择器 
function $(selector, parent) {
    // parent是形参 没有接收值 undefined  你没有传值 就按默认来 document
    parent = parent || document;
    // 判断 到底你当前要干什么？ 获取id  获取标签名
    if (selector.charAt(0) === "#") { // "#box"
        // 说明你是要获取id
        return document.getElementById(selector.slice(1));
    } else if (selector.charAt(0) == ".") { // .div
        // 这里写类的获取的逻辑
        // 从整个文档下 获取所有的标签
        var allEles = parent.getElementsByTagName('*');
        // 建立一个数组  用来存储 所有的找到的带类 的元素
        var arrEles = [];
        // 遍历每一个标签
        for (var i = 0; i < allEles.length; i++) {
            // 找到每一个标签身上的类  ""   "aa cc box"  "aa"  "abc"
            // 将每一个类（是字符串）通过空格分割 转换成数组 ["aa", "cc", "box"] ["abc"]  [""]  ["aa"]
            var arrClassName = allEles[i].className.split(' ');

            // 循环这个数组
            for (var k = 0; k < arrClassName.length; k++) {
                // "aa"
                if (arrClassName[k] == selector.substring(1)) {
                    arrEles.push(allEles[i]);
                    // 如果找到  则没必要在这个标签身上继续往后找了
                    break;
                }
            }
        }
        return arrEles; // 这里 一定存的是符合条件的 元素

    } else {
        return parent.getElementsByTagName(selector);
    }


}

// 目的： document.getElementsByClassName();  谷歌火狐 IE9以及以上  IE 6 78 会报错
// 封装一个函数




// 这是一个获取样式的兼容性函数
function getStyle(ele, attr) {

    if (ele.currentStyle) { // IE 6789 10 

        return ele.currentStyle[attr];
    } else {
        return getComputedStyle(ele)[attr];

    }
}
// 这是一个获取最终位置（某个元素距离浏览器最外层的距离）的函数
function getPos(ele) {
    var left = 0;
    var top = 0;


    while (ele.offsetParent) { // body .offsetParent null
        left += ele.offsetLeft;
        // parseInt()  "100px"  "10.5元"==> 10  parseFloat()  10.5
        left += parseInt(getStyle(ele.offsetParent, "borderLeftWidth"));
        top += ele.offsetTop;
        top += parseInt(getStyle(ele.offsetParent, "borderTopWidth"));
        // 把当前这个元素的偏移父级 赋给ele
        ele = ele.offsetParent;
    }
    //  通过对象的形式 返回当前累加的结果
    return {
        l: left,
        t: top
    };
}



// DOM 获取第一个子节点的 兼容性函数
function first(ele) { // 标准浏览器  IE6 7 8

    var firstEle = ele.firstElementChild || ele.firstChild;
    // 父级元素中没有元素节点  此时 谷歌 走后面 直接获取的空白文本 
    // 父级元素中如果没有任何节点 此时 firstEle 空  
    if (firstEle && firstEle.nodeType == 1) {
        return firstEle;
    } else {
        return null;
    }
}


function last(ele) {

    var lastEle = ele.lastElementChild || ele.lastChild;

    if (lastEle && lastEle.nodeType == 1) {
        return lastEle;
    } else {
        return null;
    }

}

// 获取前一个兄弟
function prev(ele) {
    var prevEle = ele.previousElementSibling || ele.previousSibling;
    if (prevEle && prevEle.nodeType == 1) {
        return prevEle;
    } else {
        return null;
    }
}

function next(ele) {

    var nextEle = ele.nextElementSibling || ele.nextSibling;
    if (nextEle && nextEle.nodeType == 1) {
        return nextEle;
    } else {
        return null;
    }
}


// 封装了一个运动函数
function move(ele, rate, target, dir, callback) {

    // 获取当初的left位置
    var current = parseInt(getStyle(ele, dir)); //"50px" ===> 50
    rate = current < target ? rate : -rate;
    //清除一下页面中原有的定时器
    clearInterval(ele.timer); // null
    // 开启一个循环定时器 
    ele.timer = setInterval(function() {

        // 每次 速率10
        current += rate; // 15   rate速率正负号判断 
        // 这个判断 是专门用来处理 向右走的临界点  速率始终是正值   根据这个条件判断是往哪儿走
        // 这个判断 是专门用来处理 向左走的临界点  速率始终是负值
        if (current >= target && rate > 0 || current <= target && rate < 0) {
            current = target;
        }


        // 赋值给left 产生效果
        ele.style[dir] = current + 'px';
        // 当这个物体 到达目标了 则清除定时器
        if (current == target) {
            clearInterval(ele.timer); // timer 有一个当前的定时器数字编号 1
            // 进来if 说明你当前走完啦 继续运动后面的
            // 回调函数 把函数作为参数 传入到另一个函数内部
            if (typeof callback == 'function') { // undefined 
                callback();
            }



        }

    }, 30);

}

// 这是一个 抖动函数 可以实现物体的左右 或者 上下抖动
// 参数1: 抖动物体
// 参数2:  抖动属性  
// 参数3: 幅度
// 参数4 抖动速率
// 参数5: 回调函数
function shake(obj, attr, fudu, rate, callback) {

    if (obj.times) { // 控制住 如果当前还有定时器在运行 则不能开新的定时器
        return;
    }

    // 建立一个数组 用来存储一些晃动的值 
    var arr = [];
    for (var i = fudu; i > 0; i -= rate) {
        arr.push(i, -i);
    }
    arr.push(0);

    // 设置一个全局变量 计数器
    var num = 0;
    // 1 先获取这个盒子 当初在哪儿里  left:300px
    var current = parseInt(getStyle(obj, attr));
    console.log(current);

    // 开启一个定时器 
    obj.times = setInterval(function() {
        // 让运动物体基于原位置 进行 加 或者 减 实现位置变化
        obj.style[attr] = current + arr[num] + 'px';
        num++;
        if (num > arr.length - 1) {
            // 清除定时器
            clearInterval(obj.times); // 1 2
            // 同时把times 设置为null  以便于 前面判断定时器是否存在
            obj.times = null;
            // 添加回调函数 可以让当前物体 运动完毕之后 继续后续操作
            if (typeof callback == 'function') {
                callback();
            }
        }
    }, 30);

}


// 封装一个兼容性函数 处理 不同浏览器下的不同绑定方式
function bind(obj, evName, evFn) {
    // 谷歌 火狐 IE9以上 他们能够识别第一个
    if (obj.addEventListener) {
        obj.addEventListener(evName, evFn);
    } else if (obj.attachEvent) { // IE 6 7 8

        obj.eventHandler = function() {
            evFn.call(obj);
        }

        obj.attachEvent('on' + evName, obj.eventHandler);
    } else {
        // 如果是超级老的浏览器 以上都不支持 则 走最后这个
        obj["on" + evName] = evFn;
    }
}
// 封装一个兼容性函数 处理 解绑
function unbind(obj, evName, evFn) {

    if (obj.removeEventListener) {
        obj.removeEventListener(evName, evFn);
    } else if (obj.detachEvent) {
        obj.detachEvent('on' + evName, obj.eventHandler);
    } else {
        obj['on' + evName] = null;
    }
}

// 下面封装三个cookie操作方法
function getCookie(key) {

    var arr = decodeURI(document.cookie).split("; "); // ['userName=lisi', 'password=12345','id=58']
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("="); // userName=lisi'==> ["userName", "lisi"]
        if (arr2[0] == key) {
            return arr2[1];
        }
    }
}

function setCookie(key, value, t) {
    var mydate = new Date();
    mydate.setDate(mydate.getDate() + t);
    document.cookie = encodeURI(key + "=" + value) + ";expires=" + mydate;
}

function removeCookie(key) {
    setCookie(key, '', -1);
}


// $.ajax({
//      type:"post",
//      url: "aa.py",
//      data: "",
//      timeout: 3000, // 设置超时时间
//      dataType: "json",
//      success: function(data){
//          // 不同的处理
//      },
//      error: function(e){
//          console.log(e);

//      }
//     })

// 完整的ajax函数
function ajax(options) {


    // 内部设置一个默认配置 如果用户没有传对应参数 按照内部默认来
    var defaultOptions = {
        method: options.method || "get", // 如果没传 按 "get"
        url: options.url,
        data: objToString(options.data) || "", // 如果没传 则 按空字符串
        dataType: options.dataType || "json", // 针对目前情况 一般后端返回都是json字符串
        callback: options.callback || null,
        errorFn: options.errorFn || null
    }

    function objToString(data) { // {m:index,a:reg} ===> "m=index&a=reg"
        if (data) {
            var str = "";
            for (var k in data) {
                str += k + "=" + data[k] + "&"; // "m=index&a=reg&"
            }

            return str.slice(0, -1);
        }

    }

    // method : get /post  "get"  "post"
    // 为了防止后端人员 习惯 "GET" "POST" 判断出错
    defaultOptions.method = defaultOptions.method.toLowerCase();


    // 设置 一个变量 初始化为null 后期存ajax对象
    var xhr = null;
    // 创建ajax对象 使用try catch语句进行兼容处理
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = ActiveXObject('Microsoft.XMLHTTP');
    }
    if (defaultOptions.method == 'get') {
        // 这是get请求  需要处理 中文乱码问题 缓存问题
        defaultOptions.url += "?" + encodeURI(defaultOptions.data) + "&" + (new Date().getTime());
    }
    xhr.open(defaultOptions.method, defaultOptions.url, true);

    // 调用send方法 发送请求
    if (defaultOptions.method == 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(defaultOptions.data);
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (defaultOptions.dataType == 'json') {
                    // 说明返回的是json字符串 需要解析
                    var data = JSON.parse(xhr.responseText);
                } else if (defaultOptions.dataType == 'xml') {
                    var data = xhr.responseXML;
                } else if (defaultOptions.dataType == 'text') {
                    var data = xhr.responseText;
                }
                // 执行回调 并传入接收回来的数据
                if (typeof defaultOptions.callback == 'function') {
                    defaultOptions.callback(data)
                }
            } else {
                // alert('错了，错误信息是' + xhr.status);
                if (typeof defaultOptions.errorFn == 'function') {
                    defaultOptions.errorFn(xhr.status)
                }
            }
        }
    }


}