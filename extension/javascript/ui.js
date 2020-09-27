/*
  Infinite Tab - Brandyn Scott
  Based on Awesome New Tab Page by
  Awesome HQ, LLC & Michael Hart
  http://antp.co http://awesomehq.com
*/

/* START :: Windows */

  $(document).ready(function($) {
    $(".ui-2.container").center();

    $(window).bind('resize scroll', function() {
      $(".ui-2.container").center();
    });
  });

  $(document).on("click", ".close, .ui-2.x", closeButton);

  function closeButton(exclude) {

    if ( exclude && typeof(exclude) === "string" ) {
      $("body > .ui-2, .ui-2#apps, .ui-2#widgets, #recently-closed-tabs-menu")
        .not(exclude)
        .hide();
    } else {
      $("body > .ui-2, .ui-2#apps, .ui-2#widgets, #recently-closed-tabs-menu").hide();
    }

    window.location.hash = "";
    hscroll = true;
  }

let optionsInit = false;
$(document).on("click", "#config-button, .ui-2.config", function(){
    if ( !optionsInit ) {
      $(window).trigger("antp-config-first-open");
      optionsInit = true;
    }

    closeButton(".ui-2#config");
    $(".ui-2#config").toggle();
    requiredColorPicker();
    required('/extension/javascript/import-export.js?nocache=12');
  });

  $(document).on("click", "#app-drawer-button", function() {
    closeButton(".ui-2#apps");
    $(".ui-2#apps").toggle();
  });

  $(document).on("click", "#widget-drawer-button", function() {
    closeButton(".ui-2#widgets");
    $(".ui-2#widgets").toggle();
  });

  $(document).on("mouseleave", "#recently-closed-tabs-menu", function() {
    $(this).css("display", "none");
  });

  $(document).on("click", "#recently-closed-tabs", function() {
    closeButton("#recently-closed-tabs-menu");
    $("#recently-closed-tabs-menu").toggle();
  });

  var aboutInit = false;
  $(document).on("click", "#logo-button,.ui-2.logo", function() {
    closeButton(".ui-2#about");
    $(".ui-2#about").toggle();

    if ( !aboutInit ) {
      aboutInit = true;

      (function() {
        const twitterScriptTag = document.createElement('script');
        twitterScriptTag.type = 'text/javascript';
        twitterScriptTag.async = true;
        twitterScriptTag.src = 'https://platform.twitter.com/widgets.js';
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(twitterScriptTag, s);
      })();

      $("#fb-root iframe").attr("src", "https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FAwesomeNewTabPage&amp;width=300&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=80");

      (function() {
        const s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://chrome.google.com/webstore/widget/developer/scripts/widget.js';
        t.parentNode.insertBefore(s, t);
      })();
    }
  });

  $(document).on("click", ".ui-2 .drawer-app-uninstall", function(e) {
    let to_delete = $(this).parent();
    let to_delete_name = $(to_delete).find(".drawer-app-name").html();

    function uninstall(callbackReturned) {
      if ( callbackReturned === false )
        return;
      chrome.management.uninstall($(to_delete).attr("id"));
    }

    qTipConfirm(chrome.i18n.getMessage("ui_uninstall_title"), chrome.i18n.getMessage("ui_confirm_uninstall", to_delete_name), chrome.i18n.getMessage("ui_button_ok"), chrome.i18n.getMessage("ui_button_cancel"), uninstall);

    return false;
  });

  /* END :: Windows */

/* START :: Top Left Buttons */

  $("#top-buttons").center({vertical: true, horizontal: false});
  $(window).bind("resize", function() {
    $("#top-buttons").center({vertical: true, horizontal: false});
  });

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#hideLeftButtons").prop("checked", storage_data.settings.buttons);
      $(document).on("change", "#hideLeftButtons", moveLeftButtons);
    });
  });

  function moveLeftButtons(e) {
    storage.get("settings", function(storage_data) {
      if ( e ) {
        settings.set({"buttons": $("#hideLeftButtons").is(":checked")});
        storage_data.settings.buttons = $("#hideLeftButtons").is(":checked");
      }

      if ( !storage_data.settings.buttons && storage_data.settings.lock ) {
        $("#top-buttons > div").css("left", "-50px");
        $("#widget-holder,#grid-holder").css("left", "0px");
      }

      if ( storage_data.settings.buttons ) {
        $("#top-buttons > div").css("left", "0px");
        $("#widget-holder,#grid-holder").css("left", "32px");
      }
    });
  }

  $(document).ready(function($) {
    moveLeftButtons();
  });

  $(document).on({
    mouseenter: function() {
      storage.get("settings", function(storage_data) {
        if ( !storage_data.settings.buttons ) {
          $("#top-buttons > div").css("left", "0px");
          $("#widget-holder,#grid-holder").css("left", "32px");
        }
      });
    },
    mouseleave: function() {
      storage.get("settings", function(storage_data) {
        if ( !storage_data.settings.buttons && storage_data.settings.lock ) {
          $("#top-buttons > div").css("left", "-50px");
          $("#widget-holder,#grid-holder").css("left", "0px");
        }
      });
    }
  }, "#top-buttons");

  /* END :: Top Left Buttons */

/* START :: Configure */

  $(document).ready(function($) {
    if( window.location.hash ) {
      switch(window.location.hash) {
        case "#options":
          $("#config-button").trigger("click");
          break;
      }
    }

    if(localStorage.getItem("bg-img-css") === "url(/extension/images/default_bg.png) top center") {
      localStorage.setItem("bg-img-css", "url(/extension/images/default_bg.jpg) top center");
    }

    if(localStorage.getItem("bg-img-css") === null) {
      localStorage.setItem("bg-img-css", "url(/extension/images/default_bg.jpg) top center");
    }

    if(localStorage.getItem("bg-img-css") && localStorage.getItem("bg-img-css") !== "") {
      $("body").css("background", localStorage.getItem("bg-img-css") );
      $("#bg-img-css").val( localStorage.getItem("bg-img-css") );
    }
  });

  $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));

  $(document).ready(function($) {
    $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));
  });

  $(document).on("keyup change", "#bg-img-css", function() {
    $("body").css("background", "" );
    $("body").css("background", $(this).val() );
    $(".bg-color").css("background-color", '#' + (localStorage.getItem("color-bg") || "221f20") );

    if($(this).val() === "") {
      $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));
    }

    localStorage.setItem("bg-img-css", $(this).val() );
  });

  $(document).on("click", "#reset-button", function() {
    function reset(callbackReturned) {
      if (callbackReturned === false) {
        $.jGrowl("Whew! Crisis averted!", { header: "Reset Cancelled" });
        return;
      }

      deleteShortcuts();
      deleteRoot();
      localStorage.clear();
      storage.clear()

      setTimeout(function() {
        reload();
      }, 250);
    }

    qTipConfirm(chrome.i18n.getMessage("ui_config_reset"), chrome.i18n.getMessage("ui_confirm_reset"), chrome.i18n.getMessage("ui_button_ok"), chrome.i18n.getMessage("ui_button_cancel"), reset);
  });

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#grid_width").val(storage_data.settings.grid_width);
      $("#grid_height").val(storage_data.settings.grid_height);
      $(document).on("change keyup", "#grid_width, #grid_height", updateGridSize);
    });
  });

  function updateGridSize(e) {
    if ( e ) {
      let value = $(this).val();

      const toSet = {};
      if ( value === "" ) {
        toSet[$(this).attr("id")] = null;
        settings.set(toSet, function() {
          storage.get(["tiles", "settings"], placeGrid);
          $(window).trigger("antp-widgets");
        });
        return;
      }

      if ($(this).attr("id") === "grid_width") {
        value  = (value < 4) ? 4 : value;
        value  = (value > 50) ? 50 : value;
        $(this).val(value);
      }

      if ($(this).attr("id") === "grid_height") {
        value  = (value < 3) ? 3 : value;
        value  = (value > 25) ? 25 : value;
        $(this).val(value);
      }

      toSet[$(this).attr("id")] = $(this).val();
      settings.set(toSet, function() {
        storage.get(["tiles", "settings"], placeGrid);
        $(window).trigger("antp-widgets");
      });
    }
  }

  /* END :: Configure */

/* START :: Hide Scrollbar */

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#hide-scrollbar").prop("checked", storage_data.settings.scrollbar_bottom);
      $(document).on("change", "#hide-scrollbar", updateScrollBarVisibility);
    });
  });

  function updateScrollBarVisibility(e) {
    storage.get("settings", function(storage_data) {
      if ( e ) {
        settings.set({"scrollbar_bottom": $("#hide-scrollbar").is(":checked")});
        storage_data.settings.scrollbar_bottom = $("#hide-scrollbar").is(":checked");
      }

      if ( storage_data.settings.scrollbar_bottom ) {
        $("body").css("overflow-x", "");
      } else {
        $("body").css("overflow-x", "hidden");
      }
    });
  }
  updateScrollBarVisibility();

  /* END :: Hide Scrollbar */

/* START :: Hide RCTM */

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#hideRCTM").prop("checked", storage_data.settings.recently_closed);
      $(document).on("change", "#hideRCTM", updateRCTMVisibility);
    });
  });

  function updateRCTMVisibility(e) {
    storage.get("settings", function(storage_data) {
      if ( e ) {
        settings.set({"recently_closed": $("#hideRCTM").is(":checked")});
        storage_data.settings.recently_closed = $("#hideRCTM").is(":checked");
      }

      if ( storage_data.settings.recently_closed ) {
        $("#recently-closed-tabs").show();
      } else {
        $("#recently-closed-tabs").hide();
      }
    });
  }
  updateRCTMVisibility();

  /* END :: Hide RCTM */

function colorPickerLoaded() {
  // background color picker
  $("#colorselector-bg").ColorPicker({
    color: '#' + ( localStorage.getItem("color-bg") || "221f20") ,
    onShow: function (colpkr) {
      $(colpkr).fadeIn(500);
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      $(".bg-color").css('background-color', '#' + hex);
      localStorage.setItem("color-bg", hex);
    }
  });
}

// upon new app installed
function showAppsWindow () {
  $(".ui-2#apps").show();

  $(document).ready(function() {
    $(document.body).qtip({
      id: 'app-tip',
      content: {
        text: chrome.i18n.getMessage("ui_apps_tip_message"),
        title: {
          text: "<b>" + chrome.i18n.getMessage("ui_apps_tip_message_title") + "</b>",
          button: true
        }
      },
      position: {
        my: 'left center',
        at: 'right center',
        target: $('#app-drawer-button'),
        viewport: $(window)
      },
      show: {
        event: false,
        ready: true
      },
      hide: {
        event: 'unfocus'
      },
      style: {
        classes: 'qtip-light qtip-bootstrap qtip-shadow'
      }
    });

    $('#qtip-app-tip').triggerHandler(this.id);
  });
}

$(document).ready(function() {
  $('div[title]').qtip({
    style: {
      classes: 'qtip-light qtip-shadow qtip-bootstrap'
    }
  });
});

function qTipAlert(title, message, buttonText) {
  message = $('<span />', { text: message }),
    ok = $('<button />', { text: buttonText, 'class': 'bubble' }).css("width", "100%");

  dialogue( message.add(ok), title );
}

function qTipConfirm(title, message, buttonTextOk, buttonTextCancel, callback) {
  message = $('<span />', { text: message })
  let ok = $('<button />', {
      text: buttonTextOk,
      click: function() { callback(true); },
      class: 'bubble ilb'
    }).css({"width": "45%", "float": "left"})
  let cancel = $('<button />', {
      text: buttonTextCancel,
      click: function() { callback(false); },
      class: 'bubble ilb'
    }).css({"width": "45%", "float": "right"});

  dialogue( message.add(ok).add(cancel), title );
}

function dialogue(content, title) {
  $('<div />').qtip({
    content: {
      text: content,
      title: {
        text: "<b>" + title + "</b>",
        button: false
      }
    },
    position: {
      my: 'center',
      at: 'center',
      target: $(window)
    },
    show: {
      ready: true,
      modal: {
        on: true,
        blur: false
      }
    },
    hide: false,
    style: 'qtip-light qtip-rounded qtip-bootstrap qtip-dialogue',
    events: {
      render: function(event, api) {
        $('button', api.elements.content).click(function(){api.destroy();});
      }
    }
  });
}
