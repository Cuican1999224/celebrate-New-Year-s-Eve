var pageContainer = $('.page-container');

function toPage(index) {
    pageContainer.style.marginLeft = `-${7.5 * index}rem`;
}
toPage(0);


//第一页
var page1 = {
    doms: {
        // 第1页涉及的dom元素
        txtAuthor: $("#txtAuthor"), // 作者文本框
        txtContent: $("#txtContent"), // 祝福内容文本框
        btnNext: $("#page1Next"), // 下一步按钮
    },
    init: function() {
        var initHeight = window.innerHeight; // 初始高度
        pageContainer.style.height = initHeight + "px"; // 让高度不要变化
        var contentIsFocus = false; // 祝福语区域是否是聚焦状态
        this.doms.txtContent.onfocus = function() {
            contentIsFocus = true;
            resetMarginTop();
        };
        this.doms.txtContent.onblur = function() {
            contentIsFocus = false;
        };

        function resetMarginTop() {
            if (window.innerHeight < initHeight - 100 && contentIsFocus) {
                // 如果祝福内容聚焦，并且窗口变小
                pageContainer.style.marginTop = "-3rem";
            } else {
                pageContainer.style.marginTop = 0;
            }
        }
        // 监听窗口尺寸的变化
        window.addEventListener("resize", resetMarginTop);

        // 点击下一页的按钮事件
        this.doms.btnNext.onclick = function() {
            if (!page1.doms.txtAuthor.value.trim()) {
                alert("请输入作者");
                return;
            }
            if (!page1.doms.txtContent.innerText.trim()) {
                alert("请输入祝福内容");
                return;
            }
            toPage(1);
        };
    },
};

page1.init();