$(document).ready(function () {
  const envelope = $('#envelope');
  const openBtn = $("#openBtn");
  const resetBtn = $("#resetBtn");

  let currentPage = 1;
  const totalPages = 23;
  let isOpen = false;
  let autoSlide = null;
  let typingTimeout = null;

  // ----- Typing Effect -----
  function typeText(element, text, callback) {
      let index = 0;
      element.html("");

      function type() {
          if (index < text.length) {
              element.html(text.substring(0, index + 1));
              index++;
              typingTimeout = setTimeout(type, 40); // tốc độ gõ
          } else {
              callback && callback();
          }
      }
      type();
  }

  function showPageWithTyping(pageId) {
      const page = $("#" + pageId);
      $(".lyric-page").removeClass("active");

      const text = page.find("p").text();
      page.addClass("active");

      const p = page.find("p");
      typeText(p, text);
  }

  function nextLyric() {
      currentPage = currentPage < totalPages ? currentPage + 1 : 1;
      showPageWithTyping("page" + currentPage);
  }

  function startAutoSlide() {
      autoSlide = setInterval(() => {
          if (isOpen) nextLyric();
      }, 3000);
  }

  function stopAutoSlide() {
      clearInterval(autoSlide);
  }

  envelope.on('click', function () {
      if (isOpen) nextLyric();
  });

  openBtn.on('click', function () {
      envelope.removeClass("close").addClass("open");
      isOpen = true;
      openBtn.hide();
      resetBtn.show();

      showPageWithTyping("page1");

      startAutoSlide();
  });

  resetBtn.on('click', function () {
      envelope.removeClass("open").addClass("close");
      isOpen = false;
      stopAutoSlide();

      setTimeout(function () {
          currentPage = 1;
          $(".lyric-page").removeClass("active");
          $("#page1").addClass("active");

          resetBtn.hide();
          openBtn.show();
      }, 600);
  });
});

// ===== MUSIC =====
const openBtn2 = document.getElementById("openBtn");
const resetBtn2 = document.getElementById("resetBtn");
const envelope2 = document.getElementById("envelope");
const audio = document.getElementById("sound");
let hasPlayed = false;

function playAudioOnce() {
    audio.currentTime = 21;
    if (!hasPlayed) {
        audio.play();
        hasPlayed = true;
    }
}

openBtn2.addEventListener("click", playAudioOnce);

// ===== STARS =====
const starField = document.querySelector('.star-field');
for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 2 + Math.random() * 3;

    star.style.left = x + 'vw';
    star.style.top = y + 'vh';
    star.style.animationDelay = delay + 's';
    star.style.animationDuration = duration + 's';

    starField.appendChild(star);
}

// ===== SNOW =====
function createSnowflake() {
    const snow = document.createElement("div");
    snow.classList.add("snowflake");
    snow.textContent = "❄";
    snow.style.left = Math.random() * 100 + "vw";
    snow.style.animationDuration = 5 + Math.random() * 5 + "s"; 
    snow.style.fontSize = (10 + Math.random() * 15) + "px";

    document.body.appendChild(snow);

    setTimeout(() => snow.remove(), 10000);
}
setInterval(createSnowflake, 150);
