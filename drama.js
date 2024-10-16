/*$(window).on('load', function () {
    $('#preloader').fadeOut();
    if($('.story-p').outerHeight() > '114')
    {
        $('.story-p').css('max-height', '114px');
        $('.story-more').show();
    }
    
    if($('.story-p2').outerHeight() > '60')
    {
        $('.story-p2').css('max-height', '60px');
        $('.story-more2').show();
    }
});
*/
jQuery(document).ready(function ($) {
  "use strict";
  var wind = $(window);
  var offset = 200;
  var duration = 500;
  $(window).scroll(function () { if ($(this).scrollTop() > offset) { $('.back-to-top').fadeIn(400); } else { $('.back-to-top').fadeOut(400); } });
  $('.back-to-top').on('click', function (event) { event.preventDefault(); $('html, body').animate({ scrollTop: 0 }, 600); return false; });
  jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() == 0) {
      $('.header').removeClass('pinned');
    }
  });
  jQuery('.header a.push-menu-btn').on('click', function (e) {
    e.preventDefault();
    var mask = '<div class="mask-overlay">';
    jQuery('body').toggleClass('menu-opened');
    jQuery(mask).hide().appendTo('body').fadeIn('fast');
    jQuery('.mask-overlay, .close-menu, .push-menu .push-menu-btn').on('click', function () {
      jQuery('body').removeClass('menu-opened');
      jQuery('.mask-overlay').remove();
    });
  });
  $('.push-menu-btn-opened').on('click', function () {
    jQuery(this).toggleClass('push-menu-btn-opened');
    jQuery('body').removeClass('menu-opened');
    jQuery('.mask-overlay').remove();
  });
  $('body').on('click', '.thebox-window .close, .thebox-overlay', function (e) {
    jQuery('.thebox-modal').fadeOut(200);
    $('body').removeClass('overflow-y');
    return false;
  });




  $(document).on('click', '.model-user-login', function () {
    $('body').addClass('overflow-y');
    jQuery('.thebox-modal').fadeOut(200);
    jQuery('.login_modal .thebox-modal').fadeIn(200);
    return false;
  });

  $(document).on('click', '.model-user-forgot', function () {
    $('body').addClass('overflow-y');
    jQuery('.thebox-modal').fadeOut(200);
    jQuery('.forgot_modal .thebox-modal').fadeIn(200);
    return false;
  });

  $(document).on('click', '.model-user-registered', function () {
    $('body').addClass('overflow-y');
    jQuery('.thebox-modal').fadeOut(200);
    jQuery('.registration_modal .thebox-modal').fadeIn(200);
    return false;
  });



  $(".embed-player-tabs li.getplay").click(function () {
    $(".embed-player-tabs li.getplay").removeClass("active");
    $(this).addClass("active");
    var esrc = $(this).data("url");
    $("#iframe_player").attr("src", esrc);
  });




  $(".customselect").each(function () {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template += '<span class="customselect-trigger">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function () {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="customselect-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });

  $(".custom-option:first-of-type").hover(function () {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  });

  $(".customselect-trigger").on("click", function () {
    $('html').one('click', function () {
      $(".customselect").removeClass("opened");
    });
    $(this).parents(".customselect").toggleClass("opened");
    event.stopPropagation();
  });

  $(".custom-option").on("click", function () {
    $(this).parents(".customselect-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".customselect").removeClass("opened");
    $(this).parents(".customselect").find(".customselect-trigger").text($(this).text());
  });

  $(document).on("click", "#clickfakeplayer", function () {
    var url = $(this).data("url");
    var loding = $(this).data("loding");
    $('#embed-iframe-player').html('<iframe id="iframe_player" scrolling="no" frameborder="0" src="' + url + '" class="lazy" allowfullscreen=""></iframe><div class="loader"><img src="' + loding + '" /></div>');
    $(".postserv9erlist li:first-child").click();
  });



  $('.button-notification-close').on('click', function (e) {
    e.preventDefault();
    var key = $(this).data('key');
    $.ajax({
      type: "POST",url: ajaxurl,data: {'key':key,'action':'notificationclose_ajax'},cache: false,
      success: function() {
        $('#'+key).fadeOut();
        return false;
      },
    });
    return false;
  });

  //
});

!function (h) { h.fn.idTabs = function () { for (var e = {}, t = 0; t < arguments.length; ++t) { var s = arguments[t]; switch (s.constructor) { case Object: h.extend(e, s); break; case Boolean: e.change = s; break; case Number: e.start = s; break; case Function: e.click = s; break; case String: "." == s.charAt(0) ? e.selected = s : "!" == s.charAt(0) ? e.event = s : e.start = s } } return "function" == typeof e.return && (e.change = e.return), this.each(function () { h.idTabs(this, e) }) }, h.idTabs = function (n, e) { var t = h.metadata ? h(n).metadata() : {}, r = h.extend({}, h.idTabs.settings, t, e); "." == r.selected.charAt(0) && (r.selected = r.selected.substr(1)), "!" == r.event.charAt(0) && (r.event = r.event.substr(1)), null == r.start && (r.start = -1); var s = function () { if (h(this).is("." + r.selected)) return r.change; var e = "#" + this.href.split("#")[1], t = [], s = []; if (h("a", n).each(function () { this.href.match(/#/) && (t.push(this), s.push("#" + this.href.split("#")[1])) }), r.click && !r.click.apply(this, [e, s, n, r])) return r.change; for (i in t) h(t[i]).removeClass(r.selected); for (i in s) h(s[i]).hide(); return h(this).addClass(r.selected), h(e).show(), r.change }, a = h("a[href*='#']", n).unbind(r.event, s).bind(r.event, s); a.each(function () { h("#" + this.href.split("#")[1]).hide() }); var c = !1; return (c = a.filter("." + r.selected)).length || "number" == typeof r.start && (c = a.eq(r.start)).length || "string" == typeof r.start && (c = a.filter("[href*='#" + r.start + "']")).length, c && (c.removeClass(r.selected), c.trigger(r.event)), r }, h.idTabs.settings = { start: 0, change: !1, click: null, selected: ".selected", event: "!click" }, h.idTabs.version = "2.2", h(function () { h(".idTabs").idTabs() }) }(jQuery);
    if($('.story-p').outerHeight() > '114')
    {
        $('.story-p').css('max-height', '114px');
        $('.story-more').show();
    }
    
    if($('.story-p2').outerHeight() > '60')
    {
        $('.story-p2').css('max-height', '60px');
        $('.story-more2').show();
    }
});
*/
jQuery(document).ready(function ($) {
  "use strict";
  var wind = $(window);
  var offset = 200;
  var duration = 500;
  $(window).scroll(function () { if ($(this).scrollTop() > offset) { $('.back-to-top').fadeIn(400); } else { $('.back-to-top').fadeOut(400); } });
  $('.back-to-top').on('click', function (event) { event.preventDefault(); $('html, body').animate({ scrollTop: 0 }, 600); return false; });
  jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() == 0) {
      $('.header').removeClass('pinned');
    }
  });
  jQuery('.header a.push-menu-btn').on('click', function (e) {
    e.preventDefault();
    var mask = '<div class="mask-overlay">';
    jQuery('body').toggleClass('menu-opened');
    jQuery(mask).hide().appendTo('body').fadeIn('fast');
    jQuery('.mask-overlay, .close-menu, .push-menu .push-menu-btn').on('click', function () {
      jQuery('body').removeClass('menu-opened');
      jQuery('.mask-overlay').remove();
    });
  });
  $('.push-menu-btn-opened').on('click', function () {
    jQuery(this).toggleClass('push-menu-btn-opened');
    jQuery('body').removeClass('menu-opened');
    jQuery('.mask-overlay').remove();
  });
  $('body').on('click', '.thebox-window .close, .thebox-overlay', function (e) {
    jQuery('.thebox-modal').fadeOut(200);
    $('body').removeClass('overflow-y');
    return false;
  });




  $(document).on('click', '.model-user-login', function () {
    $('body').addClass('overflow-y');
    jQuery('.thebox-modal').fadeOut(200);
    jQuery('.login_modal .thebox-modal').fadeIn(200);
    return false;
  });

  $(document).on('click', '.model-user-forgot', function () {
    $('body').addClass('overflow-y');
    jQuery('.thebox-modal').fadeOut(200);
    jQuery('.forgot_modal .thebox-modal').fadeIn(200);
    return false;
  });

  $(document).on('click', '.model-user-registered', function () {
    $('body').addClass('overflow-y');
    jQuery('.thebox-modal').fadeOut(200);
    jQuery('.registration_modal .thebox-modal').fadeIn(200);
    return false;
  });



  $(".embed-player-tabs li.getplay").click(function () {
    $(".embed-player-tabs li.getplay").removeClass("active");
    $(this).addClass("active");
    var esrc = $(this).data("url");
    $("#iframe_player").attr("src", esrc);
  });




  $(".customselect").each(function () {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template += '<span class="customselect-trigger">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function () {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="customselect-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });

  $(".custom-option:first-of-type").hover(function () {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  });

  $(".customselect-trigger").on("click", function () {
    $('html').one('click', function () {
      $(".customselect").removeClass("opened");
    });
    $(this).parents(".customselect").toggleClass("opened");
    event.stopPropagation();
  });

  $(".custom-option").on("click", function () {
    $(this).parents(".customselect-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".customselect").removeClass("opened");
    $(this).parents(".customselect").find(".customselect-trigger").text($(this).text());
  });

  $(document).on("click", "#clickfakeplayer", function () {
    var url = $(this).data("url");
    var loding = $(this).data("loding");
    $('#embed-iframe-player').html('<iframe id="iframe_player" scrolling="no" frameborder="0" src="' + url + '" class="lazy" allowfullscreen=""></iframe><div class="loader"><img src="' + loding + '" /></div>');
    $(".postserv9erlist li:first-child").click();
  });



  $('.button-notification-close').on('click', function (e) {
    e.preventDefault();
    var key = $(this).data('key');
    $.ajax({
      type: "POST",url: ajaxurl,data: {'key':key,'action':'notificationclose_ajax'},cache: false,
      success: function() {
        $('#'+key).fadeOut();
        return false;
      },
    });
    return false;
  });

  //
});

!function (h) { h.fn.idTabs = function () { for (var e = {}, t = 0; t < arguments.length; ++t) { var s = arguments[t]; switch (s.constructor) { case Object: h.extend(e, s); break; case Boolean: e.change = s; break; case Number: e.start = s; break; case Function: e.click = s; break; case String: "." == s.charAt(0) ? e.selected = s : "!" == s.charAt(0) ? e.event = s : e.start = s } } return "function" == typeof e.return && (e.change = e.return), this.each(function () { h.idTabs(this, e) }) }, h.idTabs = function (n, e) { var t = h.metadata ? h(n).metadata() : {}, r = h.extend({}, h.idTabs.settings, t, e); "." == r.selected.charAt(0) && (r.selected = r.selected.substr(1)), "!" == r.event.charAt(0) && (r.event = r.event.substr(1)), null == r.start && (r.start = -1); var s = function () { if (h(this).is("." + r.selected)) return r.change; var e = "#" + this.href.split("#")[1], t = [], s = []; if (h("a", n).each(function () { this.href.match(/#/) && (t.push(this), s.push("#" + this.href.split("#")[1])) }), r.click && !r.click.apply(this, [e, s, n, r])) return r.change; for (i in t) h(t[i]).removeClass(r.selected); for (i in s) h(s[i]).hide(); return h(this).addClass(r.selected), h(e).show(), r.change }, a = h("a[href*='#']", n).unbind(r.event, s).bind(r.event, s); a.each(function () { h("#" + this.href.split("#")[1]).hide() }); var c = !1; return (c = a.filter("." + r.selected)).length || "number" == typeof r.start && (c = a.eq(r.start)).length || "string" == typeof r.start && (c = a.filter("[href*='#" + r.start + "']")).length, c && (c.removeClass(r.selected), c.trigger(r.event)), r }, h.idTabs.settings = { start: 0, change: !1, click: null, selected: ".selected", event: "!click" }, h.idTabs.version = "2.2", h(function () { h(".idTabs").idTabs() }) }(jQuery);
