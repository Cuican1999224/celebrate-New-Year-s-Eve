"use strict";

(function () {
  //当前显示页面索引
  var curPageIndex = 0;
  var pageContainer = $('.page-container'); //设置页面容器的margin-top为合适的值

  function toPage() {
    pageContainer.style.transition = '500ms';
    pageContainer.style.marginTop = -curPageIndex * window.innerHeight + 'px';
  }

  toPage();

  pageContainer.ontouchstart = function (e) {
    var y = e.changedTouches[0].clientY; //手指按下时的纵坐标

    pageContainer.style.transition = 'none'; // console.log(y);
    //按下后监听手指抬起

    pageContainer.ontouchmove = function (e) {
      var dis = e.changedTouches[0].clientY - y; //计算距离

      var mtop = -curPageIndex * window.innerHeight + dis;

      if (mtop > 0) {
        mtop = 0;
      } else if (mtop < -2 * window.innerHeight) {
        mtop = -2 * window.innerHeight;
      }

      pageContainer.style.marginTop = mtop + 'px';
    };

    pageContainer.ontouchend = function (e) {
      var dis = e.changedTouches[0].clientY - y; //计算距离

      if (Math.abs(dis) <= 50) {
        //手指移动的不多
        toPage(); //回到当前的位置
      } else if (dis > 0 && curPageIndex > 0) {
        //向下移动 并且 目前不是第一页
        curPageIndex--;
        toPage();
      } else if (dis < 0 && curPageIndex < pageContainer.children.length - 1) {
        //向上移动 并且 目前不是最后一页
        curPageIndex++;
        toPage();
      } //手指抬起后 取消监听移动和抬起


      pageContainer.ontouchmove = null;
      pageContainer.ontouchend = null;
    };
  };
})();

(function _callee() {
  var resp;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          showLoading(); //加载中
          //1.获取数据

          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(" https://bless.yuanjin.tech/api/bless?id=".concat(location.search.replace("?", ""))));

        case 3:
          resp = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(resp.json());

        case 6:
          resp = _context.sent;
          resp = resp.data;
          resp.audioUrl = null;
          console.log(resp); //2.根据远程数据，设置页面中的各种区域

          (function () {
            $('.page1 .g-btn').innerText = "\u6765\u81EA".concat(resp.author, "\u7684\u795D\u798F");
            $(".page2 .note pre").innerText = resp.content; // 第二页

            var pre = $(".page2 .note pre");
            pre.innerText = resp.content; // 看一下，内容部分是否有滚动条

            if (pre.clientHeight !== pre.scrollHeight) {
              // 有滚动条
              // 不能阻止默认行为
              pre.dataset["default"] = true; // 阻止事件冒泡

              pre.ontouchstart = function (e) {
                e.stopPropagation();
              };
            }

            if (resp.audioUrl) {//设置音频
            } else {
              $(".page2 .g-tape").remove();
              $(".page2 .g-btn").remove();
              $(".page2 .note").style.top = "1rem";
            }
          })();

          hideLoading(); //关闭加载

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
})();