(function() {
    //当前显示页面索引
    let curPageIndex = 0;
    let pageContainer = $('.page-container');
    //设置页面容器的margin-top为合适的值

    function toPage() {
        pageContainer.style.transition = '500ms';
        pageContainer.style.marginTop = -curPageIndex * window.innerHeight + 'px'
    }
    toPage();

    pageContainer.ontouchstart = function(e) {
        var y = e.changedTouches[0].clientY; //手指按下时的纵坐标
        pageContainer.style.transition = 'none';
        // console.log(y);

        //按下后监听手指抬起
        pageContainer.ontouchmove = function(e) {
            var dis = e.changedTouches[0].clientY - y; //计算距离
            var mtop = -curPageIndex * window.innerHeight + dis;
            if (mtop > 0) {
                mtop = 0;
            } else if (mtop < -2 * window.innerHeight) {
                mtop = -2 * window.innerHeight;
            }
            pageContainer.style.marginTop = mtop + 'px'
        }
        pageContainer.ontouchend = function(e) {
            var dis = e.changedTouches[0].clientY - y; //计算距离
            if (Math.abs(dis) <= 50) {
                //手指移动的不多
                toPage() //回到当前的位置
            } else if (dis > 0 && curPageIndex > 0) {
                //向下移动 并且 目前不是第一页
                curPageIndex--;
                toPage()
            } else if (dis < 0 && curPageIndex < pageContainer.children.length - 1) {
                //向上移动 并且 目前不是最后一页
                curPageIndex++;
                toPage()
            }

            //手指抬起后 取消监听移动和抬起
            pageContainer.ontouchmove = null;
            pageContainer.ontouchend = null;
        }
    }
})();
(async function() {
    showLoading(); //加载中
    //1.获取数据
    var resp = await fetch(
        ` https://bless.yuanjin.tech/api/bless?id=${location.search.replace("?","")}`

    );

    resp = await resp.json();
    resp = resp.data;
    // resp.audioUrl = null
    console.log(resp);
    //2.根据远程数据，设置页面中的各种区域
    (function() {
        $('.page1 .g-btn').innerText = `来自${resp.author}的祝福`;
        $(".page2 .note pre").innerText = resp.content;
        // 第二页
        var pre = $(".page2 .note pre");
        pre.innerText = resp.content;
        // 看一下，内容部分是否有滚动条
        if (pre.clientHeight !== pre.scrollHeight) {
            // 有滚动条
            // 不能阻止默认行为
            pre.dataset.default = true;
            // 阻止事件冒泡
            pre.ontouchstart = function(e) {
                e.stopPropagation();
            };
        }
        if (resp.audioUrl) {
            //设置音频
            $("#soundAudio").src = resp.audioUrl
        } else {
            $(".page2 .playing").remove();
            $(".page2 .g-btn").remove();
            $(".page2 .note").style.top = "1rem"
        }
        //设置背景音乐的音频
        $("#bgMusicAudio").src = `./assets/media/${resp.bgMusicIndex}.mp3`
    })();
    //3.实现摇一摇
    (function() {
        /**
         * 启用摇一摇事件
         * 由于某些手机的限制，该方法必须在某个元素点击后调用
         **/
        async function regShakenEvent() {
            try {
                await utils.regShakenEvent(); // 启用摇一摇
            } catch (err) {
                /*
                 * 不支持devicemotion事件的手机
                 * 或
                 * 用户不允许监听设备运动
                 */
                alert("由于权限问题，无法使用摇一摇功能");
            }
        }
        $(".page3 .g-modal .g-btn").onclick = function() {
            regShakenEvent();
            $(".page3 .g-modal").remove()
        };
        window.addEventListener('shaken', function() {
            console.log('shaken');
        })
    })();

    hideLoading(); //关闭加载
})()