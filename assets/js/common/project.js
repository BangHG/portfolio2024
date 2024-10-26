// 특정 날짜부터 오늘까지의 날짜 수를 계산
function daysSince(startDate) {
  const today = new Date();
  const start = new Date(startDate);
  const diffTime = Math.abs(today - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// 두 날짜 사이의 일 수를 반환
function daysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// 비율 계산
function calculatePercentage(startDate, endDate) {
  const totalDays = daysBetween(startDate, endDate);
  const daysPassed = daysSince(startDate);
  const percentage = (daysPassed / totalDays) * 100;
  return percentage.toFixed(2);
}

const startDate = '2016-06-01';
const endDate = '2021-10-01';
const totalDays = daysBetween(startDate, new Date());
const prevDays = daysBetween(startDate, endDate);

// console.log(`[A] 2016/6/1 ~ 오늘: ${totalDays}
// [B] 2016/6/1 ~ 2021/10/1 : ${prevDays}`);
// console.log('[B/A]:', (prevDays / totalDays) * 100 + '%');

$('.project-list--02 .project-list__intro .progress .prev').css('width', (prevDays / totalDays) * 100 + '%');
$('.project-list--01 .project-list__intro .progress .ing').css('width', (prevDays / totalDays) * 100 + '%');

$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();

  $('.project-list__intro').each(function () {
    var introOffsetTop = $(this).offset().top;

    if (scrollTop >= introOffsetTop) {
      $(this).find('.ing').addClass('que');
    }
  });
});

//햇수 구하기
const today = new Date();
const startDay = new Date(startDate);
const yearsDifference = today.getFullYear() - startDay.getFullYear();

// 시작 날짜가 지나지 않았으면 1년을 빼야 함
if (
    today.getMonth() < startDay.getMonth() ||
    (today.getMonth() === startDay.getMonth() && today.getDate() < startDay.getDate())
) {
    yearsDifference--;
}

$('#date').html(yearsDifference + '년')


function redirectToDevicePage(mobileUrl, webUrl) {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const redirectUrl = isMobile ? mobileUrl : webUrl;
    window.open(redirectUrl, '_blank');
}
