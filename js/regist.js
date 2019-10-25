// 在这个文件写 首页的具体功能

// 功能1:注册用户名的验证
// url: 'api/index.php'
// 请求方式: get
// 请求参数： 
// m: index  进入对应的index模块
// a: verifyUserName
// username: 要验证的用户名


// 1 获取username文本框
var regUserName = $('#username1');
// 2 获取注册的密码
var regPass = $('#password');

// 3 获取登陆按钮
var btnLogin = $('#btnLogin')


// 打开页面 就要 判断一下当前是否存在cookie 如果有 意味着 有用户登陆 应该保持登陆状态
updateAfterEvent();

// 打开页面  获取留言列表
// 地址url: "api/index.php",
// 请求方式 get
// 参数  data :
// m:index 
// a:getList  
// page:当前第1页  1  2 。。。。  
// n: 每页多少条留言 2 条   

// 设置一个变量 page 用来实现分批请求
var iPage = 1;

getList();



function getList() {

    ajax({
        url: "api/index.php",
        dataType: "json",
        data: {
            m: "index",
            a: "getList",
            page: iPage,
            n: "2" // 每次 只展示两条留言  // 10条留言
        },
        callback: function(data) {
            console.log(data);
            // 往左右的列表当中去渲染
            if (!data.code) {


                // 有留言 code:0
                // 渲染
                var msgs = data.data.list;
                var str = '';
                for (var i = 0; i < msgs.length; i++) {
                    str += `<dl class="well">
                                <dt>
                                    <strong>${msgs[i].username}</strong> 说 :
                                </dt>
                                <dd class='text'>${ msgs[i].content }</dd>
                                <dd class="t" cid="${msgs[i].cid}">
                                    <a href="javascript:;" class="support">顶(<span>${msgs[i].support}</span>)</a> |
                                    <a href="javascript:;" class="oppose">踩(<span>${msgs[i].oppose}</span>)</a>
                                </dd>
                            </dl>`

                }
                // 第一批 应该直接设置进去 第二批数据 在不去除前面的留言 追加进去新的留言
                $('#list').innerHTML += str;

                // 判断当前的请求的第几页 page 是否等于最后一页 
                if (iPage == data.data.pages) {
                    // 如果当前请求的这一页 是最后一页 则隐藏加载更多
                    $('#showMore').style.display = 'none';
                } else {
                    // 否则显示
                    $('#showMore').style.display = 'block';
                }

            } else if (data.code == 1) {
                $('#list').innerHTML = '<p>大家快来抢沙发吧～</p>'
                $('#showMore').style.display = 'none';
            } else if (data.code == 2) {
                // 没有数据了
                // 显示更多按钮消失
                $('#showMore').style.display = 'none';
            }

        }
    })

}

// 单击 加载更多 让 数据 请求后面的 批数  第二批 第三批
$('#showMore').onclick = function() {
    iPage++;
    getList();
}

// 当文本框焦点失去以后 触发事件  焦点事件
regUserName.onblur = function() {

    // 发起ajax请求 请求后端返回数据
    ajax({
        url: 'api/index.php',
        // data: "m=index&a=verifyUserName&username=" + this.value,
        data: {
            m: "index",
            a: "verifyUserName",
            username: this.value
        },
        dataType: 'json',
        callback: function(data) {
            console.log(data, typeof data);

            if (data.code) {
                $('#verifyUserNameMsg').style.color = 'red';
            } else {
                // 可以注册
                $('#verifyUserNameMsg').style.color = 'green';
            }
            $('#verifyUserNameMsg').innerHTML = data.message

        }
    })
}

// 注册验证

// url: 'api/index.php',
// 请求方式： post
// 请求参数： 
// m:index
// a:reg  接口
// username: 要注册的用户名
// password: 要注册的密码
/**
 * {
 *   m:index,
 *   a:reg,
 *   username:
 * }
 * 
 * 
 * 
 * 
 */

// 单击注册按钮 进行请求验证
$('#btnReg').onclick = function() {

    ajax({
        url: 'api/index.php',
        method: 'post',
        // data: 'm=index&a=reg&username=' + regUserName.value + "&password=" + regPass.value,
        data: {
            m: "index",
            a: "reg",
            username: regUserName.value,
            password: regPass.value
        },
        dataType: 'json',
        callback: function(data) {
            console.log(data, typeof data);
            alert(data.message);
        }
    })
}

// 登陆验证：
// url: 'api/index.php',
// 请求方式 post
// data: 
//   m:index   a:login   username: 登陆的用户名  password:登陆的密码

btnLogin.onclick = function() {

    ajax({
        url: "api/index.php",
        method: "post",
        dataType: 'json',
        data: {
            m: "index",
            a: "login",
            username: $('#username2').value,
            password: $('#password2').value
        },
        callback: function(data) {
            console.log(data, typeof data);
            alert(data.message) // 提示一下用户登陆成功/ 登陆失败

            updateAfterEvent();

            /*  if (!data.code) {
                 // 还需要把注册框 已经登陆框 隐藏  让user的div出来
                 $('#reg').style.display = 'none';
                 $('#login').style.display = 'none';
                 $('#user').style.display = 'block';
                 // 应该让用户名放入 user框中的userinfo标签中
                 // 如果登陆成功  后端会设置一个cookie（cookie中存储的用户id和用户名）返回到前端 存储到浏览器当中
                 $('#userinfo').innerHTML = getCookie('username');
             } */

        }
    })

}

// 登出验证
// url： 'api/index.php'
// method: "get",
// data: m:index a:logout
$('#logout').onclick = function() {

    ajax({
        url: 'api/index.php',
        data: {
            m: "index",
            a: "logout"
        },
        callback: function(data) {
            //  弹出提示框
            alert(data.message);
            // 调用一些事件更新的那个 函数
            updateAfterEvent();
        }
    })
}

// 添加留言功能：
// 请求的url: "api/index.php",
// 请求方式： "post",
// 参数 data: m:index  a:send  content 文章数据 携带过去
// 返回格式json  
$('#btnPost').onclick = function() {
    // 发表留言的时候 发请求

    ajax({
        url: "api/index.php",
        method: 'post',
        data: {
            m: "index",
            a: "send",
            content: $('#content').value
        },
        callback: function(data) {
            // network 网络面板  --- 检测ajax请求过程
            alert(data.message);
            // 如果留言成功拉 则需要把 留言的数据渲染到左侧列表div中
            if (!data.code) {
                // 留言成功
                // 直接去刷新一下页面  让 前面的ajax自动获取所有的列表 进行渲染 
                // （这样的话 就会把我当前最新的留言也渲染 出来）
                // BOM 
                window.location.reload(); // 页面重新加载 刷新

            }
        }
    })


}

// 顶 和 踩的功能实现  我们计划用 事件委托/事件代理的方法来实现  利用的事件冒泡机制
// 给外层的父级元素 list div来代理点击事件
$('#list').onclick = function(e) {
    // 做一个事件对象兼容性处理
    e = e || event;
    // 找事件源 （触发该事件的源头）
    // 事件源 也 兼容一下
    var target = e.srcElement || e.target;
    console.log(target);

    if (target.nodeName == "A") { // a 标签 可能是 顶  也可能踩
        // 区分

        if (target.className == 'support') {
            console.log(target.parentNode.cid);
            console.log(target.parentNode.getAttribute('cid'));


            // 发起顶的请求
            ajax({
                url: "api/index.php",
                data: {
                    m: "index",
                    a: "doSupport",
                    // 刚才 给 顶和踩两个a标签的共同父级 加了个自定义属性cid 等于当前留言cid
                    cid: Number(target.parentNode.getAttribute('cid'))
                },
                callback: function(data) {
                    alert(data.message);
                }
            })

        } else if (target.className == 'oppose') {
            // 发起 踩的请求
            // 发起顶的请求
            ajax({
                url: "api/index.php",
                data: {
                    m: "index",
                    a: "doOppose",
                    // 刚才 给 顶和踩两个a标签的共同父级 加了个自定义属性cid 等于当前留言cid
                    cid: Number(target.parentNode.getAttribute('cid'))
                },
                callback: function(data) {
                    alert(data.message);
                }
            })
        }

        // 刷新页面 意味着 会调用 getList() 获取最新列表
        window.location.reload();
    }

}





function updateAfterEvent() {
    if (getCookie('uid')) {
        // 有用户id
        // 还需要把注册框 已经登陆框 隐藏  让user的div出来
        $('#reg').style.display = 'none';
        $('#login').style.display = 'none';
        $('#user').style.display = 'block';
        // 应该让用户名放入 user框中的userinfo标签中
        // 如果登陆成功  后端会设置一个cookie（cookie中存储的用户id和用户名）返回到前端 存储到浏览器当中
        $('#userinfo').innerHTML = getCookie('username');

    } else {
        $('#reg').style.display = 'block';
        $('#login').style.display = 'block';
        $('#user').style.display = 'none';
        // 应该让用户名放入 user框中的userinfo标签中
        // 如果登陆成功  后端会设置一个cookie（cookie中存储的用户id和用户名）返回到前端 存储到浏览器当中
        $('#userinfo').innerHTML = '';
    }

}