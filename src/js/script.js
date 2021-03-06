let windowY, inicioSize, sectionSize;

const getSizes = () => {
  const windowY = document.documentElement.clientHeight;
  const inicioSize = Math.round(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--inicio-size"
    ) * windowY
  );
  const sectionSize = Math.max(
    Math.round(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--section-size"
      ) * windowY
    ),
    getComputedStyle(document.documentElement).getPropertyValue(
      "--min-section-size"
    )
  );

  return { windowY, inicioSize, sectionSize };
};

const init = () => {
  sec0Prep();
  Caption.init();
  ({ windowY, inicioSize, sectionSize } = getSizes());
};

let currentSection = -1;

const scrollCallback = (e) => {
  const yPos = Math.round(window.scrollY);
  const positionMid = yPos + Math.round(windowY / 2);

  const callAnimation = (index, animation, prepFunction) => {
    if (currentSection != index) {
      anime.running.forEach((animation) => animation.pause());
      prepFunction();
      animation.restart();
      animation.play();
      currentSection = index;
    }
  };

  /* if (yPos == 0) introAnim.play();
  else introAnim.pause(); */

  window.requestAnimationFrame(() => {
    const section = Math.ceil((positionMid - inicioSize) / sectionSize);
    switch (section) {
      case 0:
        callAnimation(0, sec0Anim, sec0Prep);
        break;
      case 1:
        callAnimation(1, sec1Anim, sec1Prep);
        if (yPos >= inicioSize)
          document
            .querySelector("#cocha-map-container")
            .classList.remove("top");
        else
          document.querySelector("#cocha-map-container").classList.add("top");
        break;
      case 2:
        callAnimation(2, sec2Anim, sec2Prep);
        break;
      case 3:
        callAnimation(3, sec3Anim, sec3Prep);
        break;
      case 4:
        callAnimation(4, sec4Anim, sec4Prep);
        break;
      case 5:
        callAnimation(5, sec5Anim, sec5Prep);
        break;
      case 6:
        callAnimation(6, sec6Anim, sec6Prep);
        break;
      case 7:
        callAnimation(7, sec7Anim, sec7Prep);
        break;
      case 8:
        callAnimation(8, sec8Anim, sec8Prep);
        break;
      case 9:
        callAnimation(9, sec9Anim, sec9Prep);
        break;
      case 10:
        callAnimation(10, sec10Anim, sec10Prep);
        break;
      case 11:
        callAnimation(11, sec11Anim, sec11Prep);
        break;
      case 12:
        callAnimation(12, sec12Anim, sec12Prep);
        break;
      case 13:
        callAnimation(13, sec13Anim, sec13Prep);
        break;
    }
  });
};

/* https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

/* Window callbacks and event listeners */
window.onresize = () => {
  Caption.updateAllPositions();
  ({ windowY, inicioSize, sectionSize } = getSizes());
};

document.addEventListener("scroll", scrollCallback);

init();
