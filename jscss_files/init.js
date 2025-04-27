/**
 * @fileOverview init.js
 */

(function(global, $, undefined) {
  'use strict';
  //--------------------------------------------------------------------------
  // Module
  //--------------------------------------------------------------------------
  /**
   * @typedef {Function} cntAccordion
   * @desc __アコーディオンの設定__
   *
   * jquery.cnt.accordion.jsの読み込み必須（{@link $.fn.customAccordion}）
   *
   * easingの値の設定次第では、jquery.easing.jsの読み込みが必要
   */
  function cntAccordion() {
    var $accordionArea = $('[data-js-accordion]');
    var $accordionTrigger = $accordionArea.find('[data-js-accordion-trigger]');

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($accordionTrigger.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      $accordionTrigger.customAccordion({
        toggleContent: function() {
          return $(this).next('[data-js-accordion-content]');
        },
        duration: 'normal',
        easing: 'swing',
        triggerClass: {
          opened: 'c-accordion-open',
          closed: 'c-accordion-close'
        },
        defaultStatus: '',
        accessibilityFlag: true
      });
    }
  }

  /**
   * @typedef {Function} cntTabChange
   * @desc __タブ切り替えの設定__
   *
   * jquery.cnt.tabchange.jsの読み込み必須（{@link $.fn.tabChange}）
   */
  function cntTabChange() {
    var $tabWrapper = $('[data-js-tab]');

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($tabWrapper.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      $tabWrapper.tabChange({
        tabTrigger: function() {
          return $(this).find('[data-js-tab-trigger]');
        },
        tabContent: function() {
          return $(this).find('[data-js-tab-content]');
        },
        triggerActiveClass: 'is-active',
        contentActiveClass: 'is-open',
        accessibilityFlag: true
      });
    }
  }

  /**
   * @typedef {Function} cntSameHeight
   * @desc __高さ揃えの設定__
   *
   * jquery.cnt.sameHeight.jsの読み込み必須（{@link $.fn.sameHeight}）
   */
  function cntSameHeight() {
    var $sameHeightWrapper = $('[data-js-sameheight]');

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($sameHeightWrapper.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      $sameHeightWrapper.each(function() {
        var $sameHeightItems = $(this).find('[data-js-sameheight-item]');
        $sameHeightItems.sameHeight({
          columnChangeFlag: true,
          sameHeightWrapper: function() {
            return $(this).closest('[data-js-sameheight]');
          }
        });
      });
    }
  }

  /**
   * @typedef {Function} cntViChanger
   * @desc __VIエリアの設定__
   *
   * jquery.cnt.vichanger.jsの読み込み必須（{@link $.fn.vichanger}）
   *
   * easingの値の設定次第では、jquery.easing.jsの読み込みが必要
   */
  function cntViChanger() {
    var $viArea = $('[data-js-vi]');

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($viArea.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      $viArea.each(function() {
        var $this = $(this);
        var viChangeType = $this.attr('data-js-vi');
        viChangeType = viChangeType === 'fade' ? 'fade' : 'slide';

        $this.vichanger({
          mainViewAreaSelector: function() {
            return $(this).find('[data-js-vi_body]');
          },
          mainWrapperSelector: function() {
            return $(this).find('[data-js-vi_main]');
          },
          naviWrapperSelector: function() {
            return $(this).find('[data-js-vi_nav]');
          },
          prevBtnSelector: function() {
            return $(this).find('[data-js-vi_prev]');
          },
          nextBtnSelector: function() {
            return $(this).find('[data-js-vi_next]');
          },
          pauseBtnSelector: function() {
            return $(this).find('[data-js-vi_pause]');
          },
          changeType: viChangeType,
          //（'01': クロスフェード、'02': カレントを非表示にしてからフェードイン、
          //  '03': カレントの上にかぶせてフェードイン、'04': カレントがフェードアウトしてからフェードイン）
          fadeTye: '03',
          naviActiveClassName: 'c-carousel_dot-active',
          mainActiveClassName: 'is-active',
          pauseActiveClassName: 'c-carousel_pause-active',
          duration: 400,
          easing: 'swing',
          // easing: 'easeOutExpo',
          auto: 5000,
          swipeFlag: true,
          liquidLayoutFlag: true,
          accessibilityFlag: true
        });
      });
    }
  }

  /**
   * @typedef {Function} cntLocalScroll
   * @desc __ローカルスクロールの設定__
   *
   * jquery.cnt.localscroll.jsの読み込み必須（{@link $.fn.localSmoothScroll}）
   *
   * easingの値の設定次第では、jquery.easing.jsの読み込みが必要
   */
  function cntLocalScroll() {
    var $scrollTriggerWrapper = $('[data-js-localscroll]');

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($scrollTriggerWrapper.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      $scrollTriggerWrapper.find('a[href^="#"]').localSmoothScroll();
    }
  }

  /**
   * @typedef {Function} cntModal
   * @desc __モーダルの設定__
   *
   * jquery.cnt.simplemodal.jsの読み込み必須（{@link $.fn.simpleModal}）
   *
   * easingの値の設定次第では、jquery.easing.jsの読み込みが必要
   */
  function cntModal() {
    var $modalTrigger = $('[data-js-modal-open]');

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($modalTrigger.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      $modalTrigger.simpleModal({
        closeSelectorName: '[data-js-modal-close]',
        duration: 'normal',
        easing: 'swing',
        bgFadeFlag: true,
        fixedContentFlag: true,
        modalWindowMarginTopMin: 0,
        ajaxContentFlag: false,
        accessibilityFlag: true,
        beforeShowContent: function() {
          //タイミングによっては位置がズレるので、手動呼び出しでポジション補正
          $.simpleModalTopPos(0, true);
        },
        pcOnly: true
      });
    }
  }

  /**
   * @typedef {Function} cntOutside
   * @desc __通知エリアの設定__
   *
   * jquery.cnt.outside.jsの読み込み必須（{@link $.fn.outside}）
   *
   * easingの値の設定次第では、jquery.easing.jsの読み込みが必要
   */
  function cntOutside() {
    var $outside = $('[data-js-outside]');

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($outside.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      $outside.outside({
        closeSelectorName: '[data-js-outside-close]',
        accessibilityFlag: true
      });
    }
  }

  /**
   * @typedef {Function} gHeaderNav
   * @desc __グローバルヘッダーナビゲーションの設定__
   *
   * headernav.jsの読み込み必須（{@link GlobalHeaderNav}）
   */
  function gHeaderNav() {
    var $header = $('[data-js-header]');
    var headerClass;

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($header.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      headerClass = new global.cnt.view.GlobalHeaderNav($header);
    }
  }

  /**
   * @typedef {Function} prjGHeaderNav
   * @desc __グローバルヘッダーナビゲーションの設定__
   *
   * headernav.jsの読み込み必須（{@link GlobalHeaderNav}）
   */
  function prjGHeaderNav() {
    var $header = $('[data-js-header]');
    var headerClass;

    //-------------------------------------------------
    // Constructor
    //-------------------------------------------------
    (function() {
      if ($header.length > 0) {
        _init();
      }
    })();

    //-------------------------------------------------
    // Private Methods
    //-------------------------------------------------
    /**
     * _init()：初期化
     * @private
     */
    function _init() {
      headerClass = new global.cnt.prj.GlobalHeaderNav($header);
    }
  }

  /**
   * @typedef {Function} prjPagetop
   * @desc __ページトップボタンの設定__
   *
   * pagetop.jsの読み込み必須（{@link pagetop}）
   */
  function prjPagetop() {
    var $pagetopBtn = $('[data-js-pagetop]');
    if ($pagetopBtn.length > 0) {
      global.cnt.prj.pagetop($pagetopBtn);
    }
  }

  /**
   * @typedef {Function} prjHeaderFixedWhitespace
   * @desc __ヘッダーの追尾付与__
   *
   * headerFixedWhitespace.jsの読み込み必須（{@link headerFixedWhitespace}）
   */
  function prjHeaderFixedWhitespace() {
    var $header = $('[data-js-header]');
    if ($header.length > 0) {
      global.cnt.prj.headerFixedWhitespace($header);
    }
  }

  /**
   * @typedef {Function} prjMasonry
   * @desc __ページトップボタンの設定__
   *
   * masonry.jsの読み込み必須（{@link masonry}）
   */
  function prjMasonry() {
    var $masonry = $('[data-js-masonry]');
    if ($masonry.length > 0) {
      global.cnt.prj.masonry($masonry);
    }
  }

  /**
   * @typedef {Function} prjAccordionVer2
   * @desc __ページトップボタンの設定__
   *
   * accordionVer2.jsの読み込み必須（{@link accordionVer2}）
   */
  function prjAccordionVer2() {
    var $accordionVer2 = $('[data-js-accordionVer2]');
    if ($accordionVer2.length > 0) {
      global.cnt.prj.accordionVer2($accordionVer2);
    }
  }

  /**
   * @typedef {Function} clampText
   * @desc __clampText__
   */
  function clampText() {
    var $clampArr = $('[data-js-clamp]');
    $.each($clampArr, function(index, value) {
      $clamp(value, {clamp: 3});
    });
  }


  /**
   * @typedef {Function} luminousSetting
   * @desc __luminousSetting__
   */
  function luminousSetting() {
    var $luminous = $('[data-js-luminous]');
    if ($luminous < 1) return false;
    // luminousを複数使うかもなので
    // これがないと別コンテンツのスライドもつながる
    $.each($luminous, function(index, value) {
      var $luminousTrigger = $(value).find('[data-js-luminous-image]');
      if ($luminousTrigger < 1) return false;
  
      var galleryOpts = {
        arrowNavigation: true,
      };
      var option = {
        sourceAttribute: "data-js-luminous-image",
      };
      new LuminousGallery($luminousTrigger, galleryOpts, option);
    });
  }

  /**
   * @typedef {Function} prjFormMessageError
   * @desc __フォームでエラー文があるかチェックする__
   */
  function prjFormMessageError() {
    var $formMessageError = $('[data-js-formMessageError]');
    if ($formMessageError.length > 0) {
      var $errorMessageWrap = $formMessageError.parent();
      var $errorInput = $errorMessageWrap.find('input, select, textarea');
      var addClass = 'is-error';
      $errorInput.addClass(addClass);
    }
  }

  /**
   * @typedef {Function} prjModal2
   * @desc __worksのモーダル処理__
   */
  function prjWorksModal() {
    var $worksModal = $('[data-js-worksModal]');
    var isClass = 'is-active';
    var hoverFlg = false;
    if ($worksModal.length == 0) return false;
    $worksModal.on('click', function() {
      var $this = $(this);
      var targetId = $this.data('js-worksmodal');
      var $target = $('#' + targetId);
      hoverFlg = false;
      if ($target.is(':animated')) return false;
      if ($this.hasClass(isClass)) { 
        $this.removeClass(isClass);
        $target.fadeOut();
      } else {
        var ua = navigator.userAgent;
        // スマホかどうか(true:スマホ false:pc)
        var spFlg = false;
        if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) spFlg = true;
        var thisParent = $this.parent();
        var thisParentW = thisParent.outerWidth();
        var targetW = $target.outerWidth();
        var styleTop = (spFlg) ? 0 : thisParent.position().top - $target.outerHeight();
        var styleLeft = (spFlg) ? 0 : $this.position().left - targetW * 0.5;
        var styleRight = 0;
        $worksModal.removeClass(isClass);
        $('.p-worksModal').hide();
        $this.addClass(isClass);
        $target.fadeIn();
        $target.css('top', styleTop);
        // 事例概要がない場合のレイアウトのとき
        if (targetW < thisParentW) {
          if (thisParentW < styleLeft + targetW * 0.5) {
            styleLeft = 'auto';
            styleRight = 0;
          } else {
            styleRight = '';
          }
          $target.css({
            'left': styleLeft,
            'right': styleRight
          });
        }
        if (spFlg) {
          $target.css({
            'left': 0,
            'top': 0
          });
        }
        // スマホはスクロール処理不要なので、return
        if (spFlg) return false;
        var pos = $target.offset().top;
        var scrollTop = $(window).scrollTop();
        // ターゲットが画面内に収まっていたらrerun
        if (scrollTop < pos) return false;
        // 収まっていなければターゲットの位置にスクロールさせる
        var headerH = $('header').outerHeight();
        var scroll = pos - headerH;
        $('body,html').stop(true).animate({ scrollTop: scroll }, 500, 'swing');
      }
      return false;
    });
    $('[data-js-worksModal-close], .p-worksModal').on('click', function() {
      _modalClose();
    });
    $('.p-worksModal_inner').mouseenter(function () {
      hoverFlg = true;
    })
    $('.c-details').mouseleave(function() {
      _modalClose();
    });
    function _modalClose() {
      if (!hoverFlg) return false;
      if ($('body').is(':animated')) return false;
      $worksModal.removeClass(isClass);
      $('.p-worksModal').fadeOut();
    }
  }

  /**
   * @typedef {Function} prjSticky
   * @desc __アニメーションでテキスト・画像を表示__
   *
   * sticky.jsの読み込み必須（{@link sticky}）
   */
  function prjSticky() {
    var $sticky = $('[data-js-sticky]');
    $.each($sticky, function(index, value) {
      global.cnt.prj.sticky($(value));
    });
  }

  function prjParallax() {
    var $parallax = $('[data-js-parallax]');
    $.each($parallax, function(index, value) {
      global.cnt.prj.parallax($(value));
    });
  }

  /**
   * @typedef {Function} prjDefaultTab
   * @desc __liblaryページに使う__
   */
  function prjDefaultTab() {
    var $tab = $('[data-js-tab]');
    var isActive = 'is-active';
    if ($tab.length == 0) return false;
    var hash = location.hash;
    if (hash) {
      $tab.find(hash).addClass(isActive);
    } else {
      $tab.find('[data-js-tab-trigger]').first().addClass(isActive);
    }
  }

  /**
   * @typedef {Function} prjTopHero
   * @desc __topページのgif__
   */
  function prjTopHero() {
    var $topHero = $('[data-js-topHero]');
    if ($topHero.length == 0) return false;
    var heroIntro = $topHero.children('.p-topHero_imgIntro');
    var heroMain = $topHero.children('.p-topHero_imgMain');
    var timeOut = 1400;
    // すでにtopページにアクセスしているか判定
    var topGifSession = window.sessionStorage.getItem(['top_gif']);
    if (topGifSession) timeOut = 0;
    else window.sessionStorage.setItem(['top_gif'],['true']);
    setTimeout(function() {
      $(heroIntro).hide();
      $(heroMain).show();
    }, timeOut);
  }

  /**
   * @typedef {Function} prjObserver
   * @desc __fontplus.loadを実行する__
   *
   */
  function prjObserver() {
    var globalText = '';
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // 要素の追加があった場合のみ通るようにする
        if (mutation.type != "characterData" && mutation.addedNodes.length == 0) return;
        // 文字の重複を削除する
        var addText = uniqueText(mutation.target.textContent);
        // 読み込み済みと重複チェック
        var text = uniqueText(globalText, addText);
        if (!text) return;
        // 追加分のフォントを読み込む
        fontLoad(text);
        // 読み込んだフォントを更新
        globalText += text;
      });
    });
    
    $(window).on('load', function() {
      var $target = $('.observerTarget');
      var config = {
          characterData: true,
          childList: true,
          subtree: true,
      };
      $.each($target, function(index, val) {
        try {
          observer.observe(val, config);
        } catch(error) {
          console.log(error);
        }
      });
    });

    // 重複チェック
    function uniqueText(_text, _text2) {
      // 配列にしてfilterを使う
      var arr = _text.split('');
      var arr2, tmp;
      if (_text2) {
        arr2 = _text2.split('');
        tmp = $.merge(arr, arr2);
      } else {
        tmp = arr;
      }
      tmp = tmp.filter(function(val, index, self) {
        if (_text2) {
          // 重複していない文字を出力する
          return self.indexOf(val) === self.lastIndexOf(val);
        } else {
          // 重複している文字は削除
          return self.indexOf(val) === index;
        }
      });
      // 文字列に戻して返す
      tmp = tmp.join('');
      return tmp;
    }

    // fontplusのload処理
    function fontLoad(_text) {
      var config = [
        { 'fontname': 'DINNextLTPro-Regular', 'nickname': 'loadName1', 'text': _text },
        { 'fontname': 'FP-こぶりなゴシック StdN W3', 'nickname': 'loadName2', 'text': _text }
      ];
      var twcomplete = function (res) { console.log(res); };
      var loadName;
      FONTPLUS.load([config], twcomplete, 'loadName');
    }

  }

  /**
   * @typedef {Function} prjColorAnime
   * @desc __アニメーションでテキスト・画像を表示__
   *
   * colorAnime.jsの読み込み必須（{@link colorAnime}）
   */
  function prjColorAnime() {
    // アニメーションを付ける要素
    var targetArray = [
      '[data-js-colorAnime]',
      '.c-map > iframe',
      '.c-heroImg > img',
      '.c-heroBox_image',
      '.c-link-type1',
      '.c-card-type3',
      '.c-card-type4',
      '.p-ir_graphImg > img',
      '.p-community_linkListImage',
      '.p-searchResult_itemImg img',
      '.p-sustainable_cardListImage img',
      '.p-solution_overlapImg img'
    ];
    // ランダムで選ばれる色のリスト
    var colors = [
      '#e57045',
      '#f6cd13',
      '#72ae54',
      '#4a98c8',
      '#d1a05e'
    ];
    var animeSpeed = 300;
    var tmp = targetArray.join(',');
    var $colorAnime = $(tmp);
    $colorAnime.colorAnime(animeSpeed, colors);
  }

  /**
   * @typedef {Function} prjGDPR
   * @desc __GDPR__
   *
   */
  function prjGDPR() {
    var $gdpr = $('.c-gdprPopup');
    if ($gdpr.length == 0) return false;
    var $agree = $('.c-gdprPopup_agree');
    $agree.on('click', function() {
      $gdpr.slideToggle();
    });
  }

  /**
   * @typedef {Function} prjPopuplink
   * @desc __Popuplink__
   *
   */
  function prjPopuplink() {
    var $popuplink = $('[data-js-popuplink]');
    if ($popuplink.length == 0) return false;
    $popuplink.on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      var data = $this.data("jsPopuplink");
      var thisPageUrl = location.href;
      var thisPageTitle = document.title;
      var headData = document.head.children;
      var headDataLength = headData.length;
      var thisPageDescription;
      var thisPageImage;
      var linkUrl;
      var params;
      var newWindow;
      var windowUrl;
      var windowName;
      var windowFeatures= 'width=820,height=600,top=0,left=0,scrollbars=yes,status=no,toolbar=no,location=no,menubar=no,resizable=no';
      if (!data) return;
      if (data == 'weibo') {
        linkUrl = 'http://service.weibo.com/share/share.php';
        params = {
          url: thisPageUrl,
          title: thisPageTitle
        };
        windowName = 'weibo';
      } else if (data == 'qq') {
        linkUrl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
        for (var i = 0; i < headDataLength; i++) {
          var propertyVal = headData[i].getAttribute('property');
          if(propertyVal !== null) {
            if(propertyVal.indexOf('og:description') != -1) {
              thisPageDescription = headData[i].content;
            }
            if(propertyVal.indexOf('og:image') != -1) {
              thisPageImage = headData[i].content;
            }
          }
        }
        params = {
          url: thisPageUrl,
          title: thisPageTitle,
          summary: thisPageDescription,
          pics: thisPageImage
        };
        windowName = 'qq';
      }
      windowUrl = linkUrl + '?' + $.param(params);
      newWindow = window.open(windowUrl, windowName, windowFeatures);
      newWindow.focus();
    });
  }

  /**
   * @typedef {Function} prjJumpAnchor
   * @desc __JumpAnchor__
   *
   */
  function prjJumpAnchor() {
    var hash = location.hash;
    if (!hash) return false;
    $('body, html').stop().scrollTop(0);
    setTimeout(function() {
      var target = $(hash);
      if (target.length == 0) return false;
      var position = target.offset().top - $('header').outerHeight();
      $('body,html').stop().animate({scrollTop:position}, 500);
    }, 100);
  }

  //===================================== document ready
  $(function() {
    //アコーディオン
    cntAccordion();
    //タブ切り替え
    cntTabChange();
    //高さ揃え
    cntSameHeight();
    //VIエリア
    cntViChanger();
    //ローカルスクロール
    cntLocalScroll();
    //モーダル
    cntModal();
    //通知エリア
    cntOutside();
    //グローバルヘッダーナビゲーション
    gHeaderNav();
    //プロジェクト用
    objectFitImages();
    luminousSetting();
    clampText();
    prjTopHero();
    prjPagetop();
    prjHeaderFixedWhitespace();
    prjMasonry();
    prjAccordionVer2();
    prjColorAnime();
    prjFormMessageError();
    prjWorksModal();
    prjSticky();
    prjParallax();
    prjDefaultTab();
    prjGDPR();
    prjPopuplink();
    prjJumpAnchor();
    // prjObserver();
    // prjloadFont();
  });
})(typeof window !== 'undefined' ? window : this, jQuery);
