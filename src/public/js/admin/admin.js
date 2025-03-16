$(window).on("load", function () {
  setTimeout(() => {
    $("#preloader").fadeOut(0);
  }, 100);
});
$(document).ready(function () {
  $(`a[href="${window.location.pathname}"]`).addClass("active");
  $(`a[href="${window.location.pathname}"]`).css("pointerEvents", "none");
});

$(".back-to-tops").click(function () {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    800,
  );
  return false;
});

function formatMoney(money) {
  return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

let checkID = $("html").attr("data-change");
let i = 0;
if (checkID == 1) i = 1;
if (checkID == 2) i = 3;
if (checkID == 3) i = 5;
if (checkID == 4) i = 10;
const getTimeMSS = (countDownDate) => {
  if (i == 10) {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      return { minute: 0, seconds1: 0, seconds2: 0 };
    }

    const totalMinutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60),
    );
    const displayMinute = Math.ceil(totalMinutes % parseInt(0.3));

    const totalSeconds = Math.floor((distance % (1000 * 60)) / 1000);
    const seconds = totalSeconds % 30;
    const seconds1 = Math.floor(seconds / 10);
    const seconds2 = seconds % 10;

    return { minute: displayMinute, seconds1, seconds2 };
  } else {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var minute = Math.ceil(minutes % parseInt(i));
    var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
    var seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
    return { minute, seconds1, seconds2 };
  }
};
function cownDownTimer() {
  var countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
  setInterval(function () {
    const { minute, seconds1, seconds2 } = getTimeMSS(countDownDate);
    if (checkID != 1 && checkID != 4) {
      $(".time .time-sub:eq(1)").text(minute);
    }

    $(".time .time-sub:eq(2)").text(seconds1);

    $(".time .time-sub:eq(3)").text(seconds2);
  }, 1000);
}

cownDownTimer();
