const mapCocha = document.getElementById("cocha-svg");
const mapCercado = document.getElementById("cercado-svg");
const windowY = document.documentElement.clientHeight;
const titulo = document.getElementById("titulo");
const continuar = document.getElementById("continuar");
const mapIntro = document.getElementById("cocha-map-container");
const rioRocha = document.getElementById("rio-rocha");

const lightblue = "#00dbfc";
const orange = "#ff7a00";
const grey = "#3b4749";
const lightgrey = "#f9fafa";
const invisible = "rgba(0,0,0,0)";

const init = () => {
  const posTitle = titulo.getBoundingClientRect();
  const yTitle = posTitle.y;
  const heightTitle = posTitle.height;
  const posCont = continuar.getBoundingClientRect();
  const yCont = posCont.y;
  const heightCont = posCont.height;
  titulo.style.transform = "translate(-50%,0)";
  continuar.style.transform = "translate(-50%,0)";

  titulo.style.top = yTitle + "px";
  continuar.style.top = yCont + "px";

  // px
  const { top, height } = mapIntro.getBoundingClientRect();

  const mapIntroPos = window.scrollY + top + Math.round((height - windowY) / 2);

  return { yTitle, yCont, mapIntroPos };
};

const getSectionSizes = () => {
  const inicioSize = Math.round(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--inicio-size"
    ) * windowY
  );
  const sectionSize = Math.round(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--section-size"
    ) * windowY
  );

  return { inicioSize, sectionSize };
};

let currentSection = -1;

document.addEventListener("scroll", function (e) {
  const yPos = Math.round(window.scrollY);
  const positionMid = yPos + Math.round(windowY / 2);

  if (yPos == 0) introAnim.play();
  else introAnim.pause();

  const introScroll = () => {
    titulo.style.top = Math.round(((yTitle - yPos) / windowY) * 100) + "%";
    continuar.style.top = Math.round(((yCont + yPos) / windowY) * 100) + "%";
  };

  window.requestAnimationFrame(() => {
    if (yPos < windowY) introScroll();

    const callAnimation = (index, animation) => {
      if (currentSection != index) {
        animation.play();
        Caption.purge();
      }
      currentSection = index;
    };

    const section = Math.ceil((positionMid - inicioSize) / sectionSize);
    switch (section) {
      /*case 1:
        callAnimation(1, sec1Anim);
        break;*/
      case 2:
        callAnimation(2, sec2Anim);
        break;
      case 3:
        callAnimation(3, sec3Anim);
        break;
      case 5:
        callAnimation(5, sec5Anim);
        break;
      case 6:
        callAnimation(6, sec6Anim);
        break;
      case 7:
        callAnimation(7, conclusionAnim);
        break;
    }
  });
});

const introAnim = anime({
  targets: mapCocha,
  scale: 1.05,
  delay: 250,
  direction: "alternate",
  loop: true,
  easing: "linear",
  autoplay: true,
});

const sec2Anim = anime({
  targets: ["#cocha-svg-cocha", "#cocha-svg-cercado"],
  begin: (anim) => {
    mapCocha.classList.toggle("no-stroke");
  },

  fill: (el, i) => {
    if (i == 0) return invisible;
    return lightblue;
  },
  stroke: grey,
  strokeWidth: 1,
  easing: "linear",
  complete: (anim) => {
    const caption = new Caption("Cercado", "cocha-svg-caption");
    caption.div.style.transform = "translate(-30%,-180%)";
  },
  autoplay: false,
});

const sec3Anim = anime({
  targets: [mapCocha, mapCercado],

  begin: () => {
    anime.set("#cocha-svg-cercado", {
      stroke: invisible,
      fill: invisible,
    });
    anime.set("#cercado-svg-cercado", {
      strokeWidth: 1,
      stroke: grey,
      fill: lightblue,
    });
  },
  scale: 12,
  translateX: "10%",
  translateY: "0%",
  opacity: (el, i) => {
    return i;
  },
  easing: "easeInQuart",
  autoplay: false,
  duration: 2000,
});

const sec3AnimAlt = anime({
  targets: "#cercado path",
  fill: grey,
  opacity: 0.5,
  easing: "linear",
  autoplay: false,
});

const sec5Anim = anime
  .timeline({
    easing: "linear",
    autoplay: false,
  })
  .add({
    targets: mapCercado,
    scale: 30,
    duration: 1000,
  })
  .add({
    targets: "#lag-cuellar path",
    fill: lightblue,
    duration: 1000,
    complete: function (anim) {
      console.log(rioRocha);
      rioRocha.classList.remove("no-show-river");
    },
  })
  .add({
    targets: "#rio-rocha path",
    stroke: lightblue,
    strokeWidth: "1",
    easing: "linear",
  });

const sec6Anim = anime({
  targets: "#lag-cuellar path",
  fill: invisible,
  opacity: 0.5,
  easing: "linear",
  autoplay: false,
});

const conclusionAnim = anime({
  targets: [
    "#lag-cuellar path",
    "#lag-cona-cona path",
    "#lag-alalay path",
    "#lag-albarrancho path",
  ],
  fill: (el, i) => {
    if (i != 0) return lightblue;
    else return invisible;
  },
  duration: 1000,
  autoplay: false,
});

const { yTitle, yCont, mapIntroPos } = init();
const { inicioSize, sectionSize } = getSectionSizes();

class Caption {
  static list = [];

  constructor(text = "", captionId = "") {
    this.text = text;
    if (captionId) {
      const element = document.getElementById(captionId);
      const { x, y } = element.getBoundingClientRect();
      this.posX = x;
      this.posY = y;
    } else {
      this.posX = 0;
      this.posY = 0;
    }

    this.div = document.createElement("div");
    this.div.classList.add("caption");
    this.div.style.left = this.posX + "px";
    this.div.style.top = this.posY + "px";
    this.div.appendChild(document.createTextNode(text));
    this.add();
    Caption.list.push(this.div);
  }

  setPosition(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.div.style.left = this.posX + "px";
    this.div.style.top = this.posY + "px";
  }

  add() {
    document.body.appendChild(this.div);
  }

  static purge() {
    Caption.list.forEach((div) => div.remove());
    Caption.list = [];
  }
}
