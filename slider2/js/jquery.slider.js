$.fn.slider1 = function(){
  var box =   $(this);
  var $this = box;
  var slide = $this.find('.slide');
  var arraw = $this.find('.arraw')[0];
  var lis = $this.find('li');
  var json = [  //  包含了5张图片里面所有的样式
    {   //  1
      width: 400,
      top: 20,
      left: 100,
      opacity: 20,
      z: 2,
      id: 1
    },
    {  // 2
      width: 600,
      top: 70,
      left: 50,
      opacity: 60,
      z: 3,
      id: 2
    },
    {   // 3
      width: 800,
      top: 100,
      left: 200,
      opacity: 100,
      z: 4,
      id: 3
    },
    {  // 4
      width: 600,
      top: 70,
      left: 550,
      opacity: 60,
      z: 3,
      id: 4
    },
    {   //5
      width: 400,
      top: 20,
      left: 650,
      opacity: 20,
      z: 2,
      id: 5
    }
  ];
  box.on('mouseover', function () {
    clearInterval(timer);
    animate(arraw, {opacity: 100});
  });
  box.on('mouseout', function () {
    animate(arraw, {opacity: 0});
  });

  var next = $this.find(".next");
  var prev = $this.find(".prev");
  var timer = null;
  var flag = true;
  next.on('click', function () {
    clearInterval(timer);
    if (flag == true) {
      move(true);
      flag = false;
    }
  });
  next.on('mouseleave', function () {
    clearInterval(timer);
    run();
  });
  prev.on('click', function () {
    clearInterval(timer);
    if (flag == true) {
      move(false);
      flag = false;
    }
  });
  prev.on('mouseleave', function () {
    run();
  });

  move();
  run();

  function run() {
    clearInterval(timer);
    timer = setInterval(function () {
      if (flag == true) {
        flag = false;
        move(true);
      }
    }, 500);
  }

  function move(x) {
    if (x != undefined) {
      if (x) {
        json.push(json.shift());
      } else {
        json.unshift(json.pop());
      };
    };

    for (var i = 0; i < json.length; i++) {
      animate(lis[i], {
        width: json[i].width,
        top: json[i].top,
        left: json[i].left,
        opacity: json[i].opacity,
        zIndex: json[i].z
      }, function () {
        flag = true;
      })
    };
  }

  function animate(obj, json, callback) {
// 先停止定时器
    clearInterval(obj.timers);
    obj.timers = setInterval(function () {
      var stoped = true;
      for (var k in json) {
        var leader = 0;
        if (k == 'opacity') {
          leader = Math.round(getStyle(obj, k) * 100) || 100;
        } else {
          console.log(obj);
          leader = parseInt(getStyle(obj, k)) || 0;
        };
        var step = (json[k] - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        if (k == 'opacity') {
          obj.style[k] = leader / 100;
          obj.style['filter'] = 'alpha(opacity=' + leader + ')';
        } else if (k == 'zIndex') {
          obj.style['zIndex'] = json[k];
        } else {
          obj.style[k] = leader + "px";
        }
        if (leader != json[k]) {
          stoped = false;
        }
      };
      if (stoped) {
        clearInterval(obj.timers);
        callback && callback();
      };
    }, 50);
  };

  //获取属性值
  function getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return window.getComputedStyle(obj, null)[attr];
    };
  };
}