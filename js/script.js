var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1200;
var _wrap;
var _navHei;
var _wid;

var _header;

$(function () {
  init();
});

function init() {
  create();
  addEvent();
}

function create() {
  _w = $(window);
  _wrap = $("#wrap");
  _wid = _w.width();

  _header = $("header");
  _navHei = _header.height();
}

function addEvent() {
  _w.on("resize", resizeEvent);
  resizeEvent();

  _w.on("scroll", scrollEvent);
  scrollEvent();

  pageMove(".page-move");

  $(".quiz-list li").on("click", quizEvent);

  termsClickEvent();

  // $("html").click(function (e) {
  //   if ($(e.target).parents(".popup-wrap").length < 1) {
  //     $(".popup").hide();
  //   }
  // });

  $(".btn-sns").on("click", snsEvent);
}

function scrollEvent() {
  var st = $(window).scrollTop();
  var sh = $(window).height() / 1.2;
  var section = $(".section");

  section.each(function (i) {
    if (st > section.eq(i).offset().top - sh) {
      $(this).addClass("active");
    }
    //  else {
    //     $(this).removeClass('active');
    // }
  });

  if (st > _navHei) {
    // _header.addClass("fixed");
    $(".fixed-bottom").css({ bottom: 0 });
  } else {
    //_header.removeClass("fixed");
    $(".fixed-bottom").css({ bottom: -200 });
  }
}

function resizeEvent() {
  _wid = _w.width();
  _navHei = _header.height();

  $(".responsive").each(function () {
    var $src = $(this).attr("src");
    var val = _wid > _breakpointDesktop ? $src.replace("mobile", "pc") : $src.replace("pc", "mobile");

    $(this).attr("src", val);
  });
}

function pageMove($selector, $position) {
  if ($position == undefined) $position = 0;

  var selector = $selector;
  $(selector).on("click", function (e) {
    e.preventDefault();

    var _top = $($(this).attr("href"));
    var $target = _top.offset().top;

    $("html,body").animate(
      {
        scrollTop: $target + $position,
      },
      500
    );
  });
}

function popupOpen($selector) {
  $($selector).show();

  if ($(window).height() <= $($selector).find(".popup-wrap").outerHeight()) {
    // 팝업이클때는
    var st = $(window).scrollTop() + 50;
    $($selector).addClass("wide").css({ top: st });
    $("body").append('<div class="popup-dim"></div>');
  } else {
    // 팝업이 작을때는
    $($selector).removeClass("wide");
    $($selector).css({ display: "flex" });
  }
}

function popupClose($selector) {
  //$('.slide-container').slick("unslick");
  $($selector).hide();

  if ($(".popup-dim").is(":visible")) {
    $(".popup-dim").remove();
  }
}


function termsClickEvent() {
	$(".form-privacy .btn-privacy").on("click", function(){
		$(':focus').blur();  

		if($(this).hasClass("open")){
			//$(this).text("내용보기");
			$(this).removeClass("open");
		}else{
			//$(this).text("내용닫기");
			$(this).addClass("open");
		}
		
		$(this).parents(".form-privacy").find(".form-scroll-box").slideToggle();
	});

}



function snsEvent() {
	$(".fixed-right").toggleClass("active");
}

function quizEvent(){
  $(".quiz-list").find("li").removeClass("active");
  $(this).addClass("active");
}
