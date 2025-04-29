"use strict";

{
  if ($(".js-filter").length > 0) {
    $(".js-filter").each(function () {
      const searchArea = $(this);
      const searchLinks = searchArea.find(".js-filter_links");
      const searchLink = searchArea.find(".js-filter_link");
      const searchSelect = searchLinks.find("select");
      const searchInput = searchLinks.find("input");
      const listItem = searchArea.find(".js-filter_item");

      let itemNum = searchArea.data("itemNum");

      searchArea.addClass("is-init");
      hideItem();

      // checkbox選択時の処理
      searchLinks.find("label").click(function () {
        const input = $(this).find("input");
        const name = input.attr("name");
        const val = input.val();

        // selectと同期
        searchSelect.each(function () {
          if ($(this).attr("name") === name) {
            $(this)
              .find("option")
              .each(function () {
                if ($(this).val() === val) {
                  $(this).prop("selected", true);
                }
              });
          }
        });
      });

      // select切替時の処理
      searchLinks.find("select").on("change", function () {
        const name = $(this).attr("name");
        const val = $(this).val();

        // checkboxと同期
        searchInput.each(function () {
          if ($(this).attr("name") === name && $(this).val() === val) {
            $(this).prop("checked", true);
          }
        });
      });

      // 切替時イベント
      searchLink.on("change", function () {
        searchFilter();
      });

      // ブラウザバック対応
      if ($.cookie('filterValue')){
        const getSession = JSON.parse($.cookie("filterValue"));

        $(window).on("pageshow", function () {
          if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
            if (getSession) {
              listItem.removeClass("is-hide");
              listItem.removeClass("is-hide2");

              for (let i = 0; i < getSession.length; i++) {
                const name = getSession[i].name;
                const searchData = getSession[i].value;

                if (searchData.length === 0 || searchData[0] === "") {
                  continue;
                }

                for (let j = 0; j < listItem.length; j++) {
                  const itemData = String(listItem.eq(j).data(name));

                  if (searchData.indexOf(itemData) === -1) {
                    listItem.eq(j).addClass("is-hide");
                  }
                }

                searchInput.each(function () {
                  if ($(this).attr("name") === name) {
                    for (let i = 0; i < searchData.length; i++) {
                      if (searchData[i] === $(this).val()) {
                        $(this).prop("checked", true);
                      }
                    }
                  }
                });
                searchSelect.each(function () {
                  if ($(this).attr("name") === name) {
                    for (let i = 0; i < searchData.length; i++) {
                      $(this)
                        .find("option")
                        .each(function () {
                          if (searchData[i] === $(this).val()) {
                            $(this).prop("selected", true);
                          }
                        });
                    }
                  }
                });
              }

              hideItem();
            }
          }
        });
      }

      // リストの絞り込み
      function searchFilter() {
        listItem.removeClass("is-hide");
        listItem.removeClass("is-hide2");

        const sessionObjs = [];

        for (let i = 0; i < searchLinks.length; i++) {
          const name = searchLinks.eq(i).find(".js-filter_link").attr("name");
          const searchData = getSelected(name);

          sessionObjs.push({
            name: name,
            value: searchData,
          });

          if (searchData.length === 0 || searchData[0] === "") {
            continue;
          }

          for (let j = 0; j < listItem.length; j++) {
            const itemData = String(listItem.eq(j).data(name));

            if (searchData.indexOf(itemData) === -1) {
              listItem.eq(j).addClass("is-hide");
            }
          }
        }

        hideItem();

        const sessionValue = Array.from(
          new Map(sessionObjs.map((sessionObj) => [sessionObj.name, sessionObj])).values()
        );
        $.cookie("filterValue", JSON.stringify(sessionValue), { path: "" });
      }

      // 表示件数の制限
      function hideItem() {
        let dateFlg = false;
        let selecter = ".js-filter_link:checked, .js-filter_link option:selected";

        if (searchArea.find(".js-filter_link[name='date']").length > 0) {
          dateFlg = true;
          selecter =
            ".js-filter_link[name='date']:checked, .js-filter_link[name='date'] option:selected";
        }

        searchArea.find(selecter).each(function () {
          if (dateFlg) {
            if ($(this).val() === "") {
              hideItemFunc();
            }
          } else {
            hideItemFunc();
          }
        });

        function hideItemFunc() {
          searchArea.find(".js-filter_item:not(.is-hide)").each(function (i) {
            if (itemNum && i >= itemNum) {
              $(this).addClass("is-hide2");
            }
          });
        }
      }

      // 選択された値を配列に追加
      function getSelected(name) {
        const searchData = [];

        searchArea.find("[name=" + name + "]:checked").each(function () {
          searchData.push($(this).val());
        });

        searchArea.find("[name=" + name + "] option:selected").each(function () {
          searchData.push($(this).val());
        });

        return Array.from(new Set(searchData));
      }
    });
  }

  // 「その他」チェック時に入力フォームを表示
  if ($(".js-chk-trigger").length > 0) {
    const trigger = $(".js-chk-trigger");
    const target = $(".js-chk-target");

    target.hide();

    trigger.each(function () {
      if ($(this).prop("checked")) {
        chkShow(this);
      }

      $(this).on("click", function () {
        chkShow(this);
      });
    });

    function chkShow(elm) {
      for (let i = 0; i < target.length; i++) {
        if (target.eq(i).data("chkShow") === $(elm).data("chkShow")) {
          if ($(elm).prop("checked")) {
            target.show();
            break;
          } else {
            target.hide();
            break;
          }
        }
      }
    }
  }
}
