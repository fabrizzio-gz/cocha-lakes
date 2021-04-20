const windowY = document.documentElement.clientHeight;

const lightblue = "#00dbfc";
const orange = "#ff7a00";
const grey = "#3b4749";
const lightgrey = "#f9fafa";
const invisible = "rgba(0,0,0,0)";
const white = "#fff";

/*
 * Helper functions
 */

const wrapper = () => {
  const elements = new Map();

  const show = (id) => {
    if (!elements.has(id)) elements.set(id, document.getElementById(id));
    elements.get(id).classList.remove("hidden");
    elements.get(id).style.opacity = 1;
  };

  const hide = (id) => {
    if (!elements.has(id)) elements.set(id, document.getElementById(id));
    elements.get(id).classList.add("hidden");
  };

  return { hide, show };
};

const { hide, show } = wrapper();

const setChildrenOpacityZero = (elementId) => {
  const children = document.getElementById(elementId).children;
  for (let i = 0; i < children.length; i++) children[i].style.opacity = 0;
};

const showCaptions = (captionIdList) => {
  captionIdList.forEach((captionId) => {
    getCaption(captionId).show();
  });
  Caption.updateAllPositions();
};

const prepCercadoMap = () => {
  /* set scale and transformX, Y separately */
  hide("cocha-map-container");
  Caption.hideAllCaptions();
  setChildrenOpacityZero("cercado-svg-lagunas");
  setChildrenOpacityZero("cercado-svg-puentes");
  setChildrenOpacityZero("cercado-svg-rios");
  setChildrenOpacityZero("cercado-svg-avenidas");
  setChildrenOpacityZero("cercado-svg-edificios");
  show("cercado-map-container");
  show("cercado-svg-inner-elements");
};

const getCaption = Caption.getCaption;

/*
 * Animations
 */

const introAnim = anime({
  targets: "#cocha-svg",
  scale: 1.05,
  delay: 250,
  direction: "alternate",
  loop: true,
  easing: "linear",
  autoplay: true,
});

const sec0Prep = () => {
  Caption.hideAllCaptions();
  hide("cercado-map-container");
  show("cocha-map-container");
  anime.set("#cocha-map-container", {
    translateX: 0,
    translateY: 0,
    scale: 1,
  });
  hide("cocha-svg-cercado");
  anime.set("#cocha-svg-cocha", { fill: lightblue });
};

const sec0Anim = {
  play: () => {},
  restart: () => {},
};

const sec1Prep = () => {
  sec0Prep();
};

const sec1Anim = {
  play: () => {},
  restart: () => {},
  seek: () => {},
};

const sec2Prep = () => {
  sec0Prep();
  show("cocha-svg-cercado");
  anime.set("#cocha-svg-cercado", {
    fill: lightblue,
  });
  Caption.updateAllPositions();
};

const sec2Anim = anime({
  targets: "#cocha-svg-cocha",
  fill: white,
  complete: () => {
    getCaption("caption-cercado").show();
  },
  easing: "linear",
  autoplay: false,
});

const sec3Prep = () => {
  sec2Prep();
  anime.set("#cocha-svg-cocha", { fill: white });
  Caption.updateAllPositions();
  getCaption("caption-cercado").show();
};

const sec3Anim = anime({
  targets: "#cocha-svg-cercado",
  fill: [lightblue, grey],
  easing: "linear",
  autoplay: false,
  duration: 2000,
});

const sec4Prep = () => {
  sec3Prep();
  anime.set("#cocha-svg-cercado", { fill: grey });

  document.getElementById("cercado-svg").style.transform =
    "translate( max( -14vw, -14vh ), min( 5.8vw, 5.8vh ) )" + " scale( 0.08 )";
  show("cercado-map-container");
  hide("cercado-svg-inner-elements");
  Caption.hideAllCaptions();
};

const sec4Anim = anime({
  targets: ["#cercado-svg", "#cocha-map-container"],
  begin: () => hide("cocha-svg-cercado"),
  translateX: (el, i) => {
    if (i == 1) return [0, 0];
    // https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return [Math.round(Math.max(vw * -0.14, vh * -0.14)), 0];
  },
  translateY: (el, i) => {
    if (i == 1) return [0, 0];
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return [Math.round(Math.min(vw, vh) * 0.058), 0];
  },
  scale: (el, i) => {
    if (i == 1) return [1, 12];
    return [0.08, 1];
  },
  opacity: (el, i) => {
    if (i == 1) return [1, 0];
    return [1, 1];
  },
  easing: "easeInQuart",
  autoplay: false,
  duration: 2000,
});

const sec5Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: 0,
    scale: 1,
  });
};

const captionsSec5 = [
  "caption-recoleta",
  "caption-quillacollo",
  "caption-cuellar",
  "caption-rocha",
];

const showCaptionsSec5 = () => showCaptions(captionsSec5);

const sec5Anim = anime
  .timeline({
    targets: "#cercado-svg",
    translateX: [0, "-10%"],
    translateY: [0, 0],
    scale: [1, 2.5],
    duration: 1000,
    easing: "linear",
    autoplay: false,
  })
  .add({
    targets: [
      "#lag-cuellar",
      "#cercado-svg-rios path",
      "#p-recoleta, #p-quillacollo",
    ],
    opacity: [0, 1],
    complete: showCaptionsSec5,
  });

const sec6Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: "-10%",
    translateY: 0,
    scale: 2.5,
  });
  anime.set(
    ["#lag-cuellar", "#cercado-svg-rios path", "#p-recoleta, #p-quillacollo"],
    {
      opacity: 1,
    }
  );
  showCaptionsSec5();
};

const sec6Anim = anime({
  targets: ["#lag-cuellar"],
  opacity: [1, 0],
  easing: "easeInOutCubic",
  complete: () => getCaption("caption-cuellar").hide(),
  duration: 2500,
  autoplay: false,
});

const sec7Prep = () => {
  sec6Prep();
  Caption.hideAllCaptions();
  anime.set("#lag-cuellar", { opacity: 0 });
};

const captionsSec7 = [
  "caption-sarco",
  "caption-america",
  "caption-melchor-perez",
].concat(captionsSec5.filter((captionId) => captionId != "caption-cuellar"));

const showCaptionsSec7 = () => showCaptions(captionsSec7);

const sec7Anim = anime
  .timeline({
    targets: "#cercado-svg",
    translateX: ["-10%", 0],
    translateY: [0, "40%"],
    scale: [2.5, 4],
    easing: "easeInCubic",
    duration: 1500,
    autoplay: false,
  })
  .add({
    targets: ["#melchor-perez", "#america", "#lag-sarco"],
    complete: showCaptionsSec7,
    opacity: [0, 1],
  });

const sec8Prep = () => {
  sec7Prep();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: "40%",
    scale: 4,
  });
  anime.set(["#melchor-perez", "#america", "#lag-sarco"], {
    opacity: 1,
  });
  showCaptionsSec7();
};

const sec8Anim = anime({
  targets: "#lag-sarco",
  opacity: [1, 0],
  complete: () => getCaption("caption-sarco").hide(),
  duration: 2000,
  easing: "easeInCubic",
  autoplay: false,
});

const sec9Prep = () => {
  prepCercadoMap();
  anime.set("#cercado-svg", {
    translateX: 0,
    translateY: "40%",
    scale: 4,
  });
  anime.set(["#cercado-svg-rios path", "#p-recoleta, #p-quillacollo"], {
    opacity: 1,
  });
};

const captionsSec9 = [
  "caption-cuadras",
  "caption-heroinas",
  "caption-belzu",
  "caption-quillacollo",
  "caption-campus-umss",
];

const showCaptionsSec9 = () => showCaptions(captionsSec9);

const sec9Anim = anime
  .timeline({
    targets: "#cercado-svg",
    keyframes: [
      {
        translateX: [0, "-10%"],
        translateY: ["40%", 0],
        scale: [4, 2.5],
        duration: 1500,
      },
      {
        duration: 1000,
      },
      {
        translateX: ["-10%", "-30%"],
        translateY: [0, "15%"],
        scale: [2.5, 4],
        duration: 1500,
      },
    ],
    delay: 0,
    duration: 4000,
    easing: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: ["#lag-cuadras", "#heroinas", "#belzu", "#campus-umss"],
    complete: showCaptionsSec9,
    opacity: [0, 1],
    duratioon: 5000,
    easing: "easeInQuint",
  });

const sec10Prep = () => {
  anime.set(
    [
      "#caption-rocha",
      "#caption-recoleta",
      "#caption-quillacollo",
      "#lag-cona-cona",
      "#caption-cona-cona",
      "#lag-alalay",
      "#caption-alalay",
      "#lag-albarrancho",
      "#caption-albarrancho",
      "#caption-tamborada",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(
    [
      "#lag-cuadras",
      "#caption-cuadras",
      "#heroinas",
      "#caption-heroinas",
      "#belzu",
      "#caption-belzu",
      "#campus-umss",
      "#caption-campus-umss",
      "#caption-quillacollo",
    ],
    {
      opacity: 1,
    }
  );
  anime.set("#lag-cuadras", { fill: invisible });
  anime.set("#cercado-svg", {
    scale: 4,
    translateX: "-5%",
    translateY: "0%",
  });
  anime.set(["#heroinas", "#belzu"], { stroke: grey, strokeWidth: 0.75 });
  anime.set("#campus-umss", {
    stroke: grey,
    strokeWidth: 0.3,
    strokeDasharray: "1 1",
  });
  Caption.updateAllPositions();
};

const sec10Anim = anime({
  targets: ["#lag-cuadras", "#caption-cuadras"],
  opacity: [1, 0],
  easing: "easeInCubic",
  duration: 2000,
  autoplay: false,
});

const sec11Prep = () => {
  anime.set(
    [
      "#lag-sarco",
      "#caption-sarco",
      "#lag-cuadras",
      "#caption-cuadras",
      "#heroinas",
      "#caption-heroinas",
      "#belzu",
      "#caption-belzu",
      "#campus-umss",
      "#caption-campus-umss",
      "#caption-recoleta",
      "#caption-alalay",
      "#caption-cona-cona",
      "#caption-albarrancho",
      "#caption-quillacollo",
      "#caption-tamborada",
      "#caption-rocha",
    ],
    {
      opacity: 0,
    }
  );
  anime.set(["#cercado-svg", "#p-quillacollo", "#p-recoleta"], {
    opacity: 1,
    fill: grey,
  });
  anime.set(["#lag-cona-cona", "#lag-alalay", "#lag-albarrancho"], {
    fill: lightblue,
  });
};

const sec11Anim = anime
  .timeline({
    targets: "#cercado-svg",
    /*    complete: () => {
      Caption.updateAllPositions();
    },*/
    scale: [4, 2.5],
    translateX: ["-5%", "0%"],
    translateY: ["0%", "0%"],
    easing: "easeInCubic",
    duration: 2000,
    autoplay: false,
  })
  .add({
    targets: ["#lag-alalay"],
    complete: () => {
      Caption.updateAllPositions();
    },
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "#lag-albarrancho",
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "#lag-cona-cona",
    complete: () => {
      anime.set(
        [
          "#caption-alalay",
          "#caption-cona-cona",
          "#caption-albarrancho",
          "#caption-quillacollo",
          "#caption-tamborada",
          "#caption-recoleta",
          "#caption-rocha",
        ],
        { opacity: 1 }
      );
    },
    opacity: [0, 1],
    duration: 2000,
    ease: "easeInCubic",
    autoplay: false,
  });

const sec12Prep = () => {
  anime.set(["#cocha-svg", "#cocha-svg-cercado"], {
    opacity: 0,
  });
  anime.set("#cocha-svg-cocha", { fill: white });
  anime.set(["#lag-cona-cona", "#lag-alalay", "#lag-albarrancho"], {
    opacity: 1,
  });
  anime.set("#cercado-svg", {
    scale: 2.5,
    translateX: "0%",
    translateY: "0%",
  });
  Caption.updateAllPositions();
};

const sec12Anim = anime
  .timeline({
    targets: [
      "#cercado-svg",
      "#caption-alalay",
      "#caption-albarrancho",
      "#caption-rocha",
      "#caption-recoleta",
      "#caption-quillacollo",
      "#caption-cona-cona",
      "#caption-tamborada",
    ],
    opacity: [1, 0],
    duration: 2000,
    easing: "easeInCubic",
    autoplay: false,
  })
  .add({
    targets: "", //"#cocha-svg",
    duration: 2000,
    scale: [1, 0.08],
    translateX: ["10%", "0%"],
    opacity: 1,
    easing: "easeOutQuad",
    autoplay: false,
  });
