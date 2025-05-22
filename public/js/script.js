$(document).ready(function(){
  AOS.init({
    easing: 'ease-in-out-sine',
		duration: 1000,
  });

  $(window).scroll(function(){
		var win_scroll = $(window).scrollTop();
		if(win_scroll > 100){
			$('.header').addClass('header_scroll');
		} else{
			$('.header').removeClass('header_scroll');
		}
	});

  $('.header .buger button').on('click' , function(){
    $('.header').toggleClass('is-open');
  });

  $('.header .pcNav .nation .current').on('click' , function(){
    $(this).next('.list').slideToggle();
  });

  function mint_pop(){
    $('#mint_pop .sec01 .nextBtn').click(function(){
      $('#mint_pop .sec01').hide();
      $('#mint_pop .sec02').show();
    });

    $('#mint_pop .close').click(function(){
      $('#mint_pop .sec01').show();
      $('#mint_pop .sec02').hide();
    });
  };mint_pop();

    
  function copy(){
    var clipboard = new ClipboardJS('#copy_text');
	
    clipboard.on('success', function(e) {
      console.info('Text:', e.text);
      alert("Copy to clipboard");
    });

  };copy();
    
  function copy2(){
    var clipboard = new ClipboardJS('#copy_text2');
	
    clipboard.on('success', function(e) {
      console.info('Text:', e.text);
      alert("Copy to clipboard");
    });

  };copy2();
    
  function copy3(){
    var clipboard = new ClipboardJS('#copy_text3');
	
    clipboard.on('success', function(e) {
      console.info('Text:', e.text);
      alert("Copy to clipboard");
    });

  };copy3();


  $('#mypage .tab li').on('click' , function(){
      $('#mypage .tab li').removeClass('on');
      $(this).addClass('on');

      var idx = $(this).index();
      var section = $('#mypage section');

      section.hide();
      section.eq(idx).show();
  });

  function main_sec01(){
    var btn = $('.main_container #sec01 .contents .selectNft .price_choice button');
    var img = $('.main_container #sec01 .contents .selectNft .nftImg');
  
    btn.on('click', function(){
      btn.removeClass('on');
      $(this).addClass('on');
  
      img.removeClass('nftImg_1 nftImg_2 nftImg_3'); // 기존 클래스 제거
  
      if($(this).hasClass('num1')){
        img.addClass('nftImg_1');
      } else if($(this).hasClass('num2')){
        img.addClass('nftImg_2');
      } else {
        img.addClass('nftImg_3');
      }
    });
  }
  main_sec01();
  

  function main_se03(){
    var swiper = new Swiper(".main_container #sec03 .mySwiper", {
      navigation: {
        nextEl: ".sec03-button-next",
        prevEl: ".sec03-button-prev",
      },
    });
  };main_se03()


  function popup(){
    $(document).on('click' , '.popup_wrap .close_one' , function(){
      $(this).parents('.popup_wrap').fadeOut();
    });
    $(document).on('click' , '#popup01 .close_day' , function(){
        $.cookie("popup01","popup01_close",{expires:1,path:"/"});
        $(this).parents('.popup_wrap').fadeOut();
    });
    if($.cookie("popup01") == undefined){
        $('#popup01').show();
    }
  };popup();
})