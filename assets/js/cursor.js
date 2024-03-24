// ## 마우스포인터
let cursor = document.getElementById('cursor');
let circle = document.querySelector('.cursor-circle');

let setCursorPosition = function (e) {
  let xPosition = e.clientX - cursor.clientWidth / 2 + 'px';
  let yPosition = e.clientY - cursor.clientHeight / 2 + 'px';
  cursor.style.transform = 'translate(' + xPosition + ',' + yPosition + ') ';

  return {
    x: xPosition,
    y: yPosition,
  };
};

// ## 마우스 trace
// SVG 요소와 polyline 요소 가져오기
var trace = document.getElementById('cursor__trace');
var path = document.getElementById('path');

// 궤적을 저장할 배열
var points = [];

// 궤적을 빠르게 사라지게 하는 타이머 ID
var clearTimer = null;

// 마우스 이동 이벤트 핸들러
function onMouseMove(event) {
  // 현재 시간과 좌표를 포인트 배열에 추가
  var now = performance.now();
  points.push([event.clientX, event.clientY, now]);

  // 최근 200ms의 궤적만 남기기
  var cutoffTime = now - 200;
  var i = 0;
  while (i < points.length && points[i][2] < cutoffTime) {
    i++;
  }
  points.splice(0, i);

  // 포인트 배열을 이용하여 polyline 요소의 points 속성 값 설정
  var pointStr = '';
  for (var i = 0; i < points.length; i++) {
    pointStr += points[i][0] + ',' + points[i][1] + ' ';
  }

  path.setAttribute('points', pointStr);

  // 궤적을 빠르게 사라지게 하는 타이머 설정
  if (clearTimer !== null) {
    clearInterval(clearTimer);
  }
  clearTimer = setInterval(function () {
    if (points.length == 0) {
      clearInterval(clearTimer);
      clearTimer = null;
      return;
    }
    var disappearTiming = 1000; // 빨리사라지기
    var t = (performance.now() - points[0][2]) / disappearTiming;
    if (t >= 1) {
      points.splice(0, 1);
      var pointStr = '';
      for (var i = 0; i < points.length; i++) {
        pointStr += points[i][0] + ',' + points[i][1] + ' ';
      }
      path.setAttribute('points', pointStr);
    } else {
      var cutoffIndex = Math.floor(points.length * t);
      points.splice(0, cutoffIndex);
      var pointStr = '';
      for (var i = 0; i < points.length; i++) {
        pointStr += points[i][0] + ',' + points[i][1] + ' ';
      }
      path.setAttribute('points', pointStr);
    }
  }, 30); //30ms 에 한번 그리기
}

document.addEventListener('mousemove', (e) => {
  onMouseMove(e); //trace
  setCursorPosition(e);
  //움직일때 포인터 조그맣게.
  // circle.style.transform = 'scale(0.5)';

  //안움직일때 포인터 원래사이즈.
  // var timeout;
  // if (timeout) clearTimeout(timeout);
  // timeout = setTimeout(mouseStop, 150);
});

//안움직일때 포인터 원래사이즈.
function mouseStop() {
  circle.style.transform = 'scale(1)';
}

// 마우스 오버/리브 시 이벤트
$('a, button')
  .mouseout(function (e) {
    cursor.classList.remove('hover');
    cursor.classList.remove('hover--logo');
  })
  .mouseover(function (e) {
    // if ($(this).hasClass('logo')) {
    //   cursor.classList.add('hover--logo');
    // }
    cursor.classList.add('hover');
  });
