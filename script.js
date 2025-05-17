// ローディングアニメーション
document.addEventListener("DOMContentLoaded", function () {
  // ページリロード時に一番上にスクロール - スクロール位置の復元を無効化
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  // 強制的にスクロール位置をリセット
  window.scrollTo(0, 0);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  // メインビジュアルの画像切り替え
  const heroBgs = document.querySelectorAll(".hero-bg");
  let currentBgIndex = 0;

  // 3秒ごとに背景画像を切り替える
  setInterval(() => {
    // 現在の画像を非アクティブに
    heroBgs[currentBgIndex].classList.remove("active");

    // 次の画像のインデックスを計算
    currentBgIndex = (currentBgIndex + 1) % heroBgs.length;

    // 次の画像をアクティブに
    heroBgs[currentBgIndex].classList.add("active");
  }, 5000);

  // 最初はヒーローセクションのフェードインを遅延させる
  const heroElements = document.querySelectorAll(
    ".hero .en-title, .hero .ja-title, .hero .sub-copy, .hero .cta-buttons"
  );
  heroElements.forEach(function (el) {
    // フェードエフェクトは残すが、IntersectionObserverには検出されないようにクラスを変更
    if (el.classList.contains("fade")) {
      el.classList.remove("fade");
      el.classList.add("fade-delayed");
    }
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
  });

  // コンセプトセクションのフェードイン要素を初期化
  initConceptAnimation();

  // ページが完全に読み込まれるのを待つ
  window.addEventListener("load", function () {
    // 完全に読み込まれた時点でも強制的に最上部にスクロール
    window.scrollTo(0, 0);

    // アニメーションが完了するまで少し待つ
    setTimeout(function () {
      const loadingOverlay = document.getElementById("loading-overlay");
      if (loadingOverlay) {
        // CSSのtransitionを使ってフェードアウト
        loadingOverlay.style.transition = "opacity 0.5s ease";
        loadingOverlay.style.opacity = "0";

        // 完全に非表示にする
        setTimeout(function () {
          loadingOverlay.style.display = "none";

          // ヒーローセクションのテキストを順番にフェードイン
          heroElements.forEach(function (el, index) {
            setTimeout(function () {
              el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, index * 200); // 要素ごとに200msずつ遅延
          });
        }, 500);
      }
    }, 4100); // アニメーション完了後（4.1秒後）に実行
  });
});

// コンセプトセクションの左右フェードインアニメーションを初期化する関数
function initConceptAnimation() {
  // スクロール監視用IntersectionObserverの設定
  const conceptObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("コンセプト要素が画面に入りました:", entry.target);

          // 左側のテキスト要素がフェードイン
          if (entry.target.classList.contains("fade-left")) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }

          // 右側のテキスト要素がフェードイン
          if (entry.target.classList.contains("fade-right")) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 400);
          }

          // 一度表示したら監視を解除
          conceptObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // 20%見えたらアニメーション開始
      rootMargin: "-50px", // 少し早めに検出
    }
  );

  // 監視対象の要素を登録
  const leftElements = document.querySelectorAll(
    ".concept-text-wrapper.fade-left"
  );
  const rightElements = document.querySelectorAll(
    ".concept-text-wrapper.fade-right"
  );

  leftElements.forEach((element) => {
    console.log("左側テキスト要素を監視します");
    conceptObserver.observe(element);
  });

  rightElements.forEach((element) => {
    console.log("右側テキスト要素を監視します");
    conceptObserver.observe(element);
  });
}

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(anchor.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// スクロール時フェードイン
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
});
document.querySelectorAll(".fade").forEach((el) => io.observe(el));

// 左右からのフェードインアニメーション（一般的な要素用）
const fadeLeftRight = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // アニメーションの遅延を少し付ける
        setTimeout(
          () => {
            entry.target.classList.add("show");
          },
          entry.target.classList.contains("fade-left") ? 0 : 300
        ); // 右側は少し遅延
        fadeLeftRight.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2, // 要素の20%が表示されたらアニメーション開始
  }
);

// 左右からフェードインする要素を監視（コンセプトセクション、プロジェクトセクションの要素も含む）
document
  .querySelectorAll(".fade-left, .fade-right")
  .forEach((el) => fadeLeftRight.observe(el));

// スクロール進行バー
const bar = document.querySelector("#scrollBar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const per = h.scrollTop / (h.scrollHeight - h.clientHeight);
  bar.style.transform = `scaleX(${per})`;
});

// トップに戻るボタン
const btn = document.querySelector("#toTop");
window.addEventListener("scroll", () => {
  btn.hidden = window.scrollY < 300;
});
btn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// Swiperカルーセル
document.addEventListener("DOMContentLoaded", function () {
  const conceptSwiper = new Swiper(".concept-swiper", {
    loop: true,
    effect: "fade",
    speed: 1000,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

// ナビゲーションバーのスクロール時背景変更
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.padding = "10px 0";
    navbar.style.backgroundColor = "#000";
  } else {
    navbar.style.padding = "20px 0";
    navbar.style.backgroundColor = "#000";
  }
});

// ヘッダー下のコンテンツの位置調整（固定ヘッダー対応）
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;
  document.body.style.paddingTop = headerHeight + "px";
});

// サービスカードのパララックス効果
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll("[data-depth]").forEach((layer) => {
    const depth = layer.getAttribute("data-depth");
    const moveX = (e.clientX * depth) / 100;
    const moveY = (e.clientY * depth) / 100;
    layer.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
  });
});

// サービスカードのホバーエフェクト
document.querySelectorAll(".service-card").forEach((card) => {
  // マウスが入った時の処理
  card.addEventListener("mouseenter", function () {
    // 他のカードを暗くする
    document.querySelectorAll(".service-card").forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.style.opacity = "0.7";
      }
    });
  });

  // マウスが出た時の処理
  card.addEventListener("mouseleave", function () {
    // 全てのカードを通常に戻す
    document.querySelectorAll(".service-card").forEach((otherCard) => {
      otherCard.style.opacity = "1";
    });
  });
});

// 円形プロセス図のアニメーション
document.addEventListener("DOMContentLoaded", function () {
  // 円形プロセスノードのアニメーション
  const processNodes = document.querySelectorAll(".process-node");

  // プロセスノードが順番に表示されるアニメーション
  processNodes.forEach((node, index) => {
    // 最初は全て非表示
    node.style.opacity = "0";
    node.style.transform = "translateY(20px)";

    // IntersectionObserverを使用してスクロール時に表示
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              node.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              node.style.opacity = "1";
              node.style.transform = "translateY(0)";
            }, 200 + index * 150); // 各ノードに遅延をつける

            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
  });

  // 接続線のアニメーション
  const processLine = document.querySelector(".process-line");
  if (processLine) {
    processLine.style.width = "0";
    // または縦向きの場合: processLine.style.height = "0";

    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              // 水平線のアニメーション
              if (window.innerWidth > 991) {
                processLine.style.transition = "width 1.5s ease";
                processLine.style.width = "90%";
              }
              // 垂直線のアニメーション（モバイル）
              else {
                processLine.style.transition = "height 1.5s ease";
                processLine.style.height = "90%";
              }
            }, 200);

            lineObserver.unobserve(processLine);
          }
        });
      },
      { threshold: 0.2 }
    );

    lineObserver.observe(processLine);
  }
});

// マウスホバーエフェクト
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.querySelector(".project-overlay").style.transform = "translateY(0)";
  });

  card.addEventListener("mouseleave", function () {
    this.querySelector(".project-overlay").style.transform = "translateY(100%)";
  });
});

// プロジェクトアイテムのアニメーション
document.addEventListener("DOMContentLoaded", function () {
  // プロジェクトセクションの視差効果
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    // ホバー効果のみ設定（フェードインはIntersectionObserverで対応）
    const image = item.querySelector(".project-image");
    const textContent = item.querySelector(".project-text-content");

    if (image && textContent) {
      item.addEventListener("mouseenter", function () {
        image.style.transition = "transform 0.6s ease-out";
        textContent.style.transition = "transform 0.4s ease-out";

        // ホバー時に少し上に移動する効果
        textContent.style.transform = "translateY(-10px)";
      });

      item.addEventListener("mouseleave", function () {
        textContent.style.transform = "translateY(0)";
      });
    }
  });
});

// 強みセクションのカードアニメーション
document.addEventListener("DOMContentLoaded", function () {
  const strengthCards = document.querySelectorAll(".strength-card");

  strengthCards.forEach((card) => {
    // ホバーエフェクト - アイコンのアニメーション
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".strength-icon svg");
      if (icon) {
        icon.style.transition = "transform 0.3s ease";
        icon.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".strength-icon svg");
      if (icon) {
        icon.style.transform = "scale(1)";
      }
    });
  });
});
