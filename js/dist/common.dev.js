"use strict";

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function $$$(tagName) {
  return document.createElement(tagName);
} //阻止touchstart 事件的默认行为


document.body.addEventListener('touchstart', function (e) {
  if (e.target.dataset["default"]) {
    //该元素要保留默认行为
    return;
  }

  if (e.cancelable) {
    e.preventDefault();
  }
}, {
  passive: false
});
document.body.addEventListener('touchmove', function (e) {
  if (e.target.dataset["default"]) {
    //该元素要保留默认行为
    return;
  }

  if (e.cancelable) {
    e.preventDefault();
  }
}, {
  passive: false
});

function showLoading() {
  var divModal = $('#divModal');

  if (divModal) {
    return;
  }

  divModal = $$$('div');
  divModal.id = "divModal";
  divModal.className = "g-modal";
  divModal.innerHTML = "<div class = \"g-loading\"><img src=\"./assets/loading.svg\" alt=\"\"></div>";
  document.body.appendChild(divModal);
}

function hideLoading() {
  if (divModal) {
    divModal.remove();
  }
}