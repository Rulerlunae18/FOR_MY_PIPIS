const DATA = {
  PAST: {
    SIMPLE: {
      name: "Past Simple",
      formula: "V²",
      example: "Bjorn and Dima walked in the forest yesterday.",
      translation: "Вчера Бьйорн и Дима гуляли в лесу.",
      description: "A finished action that happened in the past."
    },
    CONTINUOUS: {
      name: "Past Continuous",
      formula: "was / were + V-ing",
      example: "Bjorn and Dima were walking when it started to rain.",
      translation: "Бьйорн и Дима гуляли, когда начался дождь.",
      description: "An action that was in progress at a particular moment in the past."
    },
    PERFECT: {
      name: "Past Perfect",
      formula: "had + V³",
      example: "Bjorn and Dima had already walked before I woke up.",
      translation: "Бьйорн и Дима уже погуляли до того, как я проснулась.",
      description: "An action completed before another event in the past."
    },
    "PERFECT CONTINUOUS": {
      name: "Past Perfect Continuous",
      formula: "had been + V-ing",
      example: "Bjorn and Dima had been walking for an hour when I called them.",
      translation: "Бьйорн и Дима гуляли уже час, когда я им позвонила.",
      description: "An ongoing action that continued for a period before a past moment."
    }
  },

  PRESENT: {
    SIMPLE: {
      name: "Present Simple",
      formula: "V / V-s",
      example: "Bjorn and Dima walk every day.",
      translation: "Бьйорн и Дима гуляют каждый день.",
      description: "A fact, habit, or something that is generally true."
    },
    CONTINUOUS: {
      name: "Present Continuous",
      formula: "am / is / are + V-ing",
      example: "Bjorn and Dima are walking right now.",
      translation: "Бьйорн и Дима гуляют прямо сейчас.",
      description: "An action happening now or around the present moment."
    },
    PERFECT: {
      name: "Present Perfect",
      formula: "have / has + V³",
      example: "Bjorn and Dima have already walked today.",
      translation: "Бьйорн и Дима уже погуляли сегодня.",
      description: "A past action whose result or experience matters now."
    },
    "PERFECT CONTINUOUS": {
      name: "Present Perfect Continuous",
      formula: "have / has been + V-ing",
      example: "Bjorn and Dima have been walking for two hours.",
      translation: "Бьйорн и Дима гуляют уже два часа.",
      description: "An action that started earlier and has continued up to now."
    }
  },

  FUTURE: {
    SIMPLE: {
      name: "Future Simple",
      formula: "will + V",
      example: "Bjorn and Dima will walk tomorrow.",
      translation: "Бьйорн и Дима пойдут гулять завтра.",
      description: "A future action, prediction, promise, or decision."
    },
    CONTINUOUS: {
      name: "Future Continuous",
      formula: "will be + V-ing",
      example: "Bjorn and Dima will be walking at eight.",
      translation: "В восемь Бьйорн и Дима будут гулять.",
      description: "An action that will be in progress at a particular future moment."
    },
    PERFECT: {
      name: "Future Perfect",
      formula: "will have + V³",
      example: "Bjorn and Dima will have walked by the evening.",
      translation: "К вечеру Бьйорн и Дима уже погуляют.",
      description: "An action that will be completed before a point in the future."
    },
    "PERFECT CONTINUOUS": {
      name: "Future Perfect Continuous",
      formula: "will have been + V-ing",
      example: "By midnight, Bjorn and Dima will have been walking for twelve hours.",
      translation: "К полуночи Бьйорн и Дима будут гулять уже двенадцать часов.",
      description: "An action that will have continued for a duration up to a future point."
    }
  }
};

const times = ["PAST", "PRESENT", "FUTURE"];
const aspects = ["SIMPLE", "CONTINUOUS", "PERFECT", "PERFECT CONTINUOUS"];

let currentTime = "PRESENT";
let currentAspect = "SIMPLE";

const timeButtons = [...document.querySelectorAll(".time-node")];
const aspectButtons = [...document.querySelectorAll(".aspect")];
const stationMarker = document.getElementById("stationMarker");
const selectionLabel = document.getElementById("selectionLabel");
const counter = document.getElementById("counter");
const category = document.getElementById("category");
const tenseName = document.getElementById("tenseName");
const formula = document.getElementById("formula");
const example = document.getElementById("example");
const translation = document.getElementById("translation");
const description = document.getElementById("description");
const infoContent = document.querySelector(".info-content");

const flatOrder = [];
times.forEach(time => {
  aspects.forEach(aspect => flatOrder.push([time, aspect]));
});

function currentIndex() {
  return flatOrder.findIndex(([time, aspect]) =>
    time === currentTime && aspect === currentAspect
  );
}

function positionMarker() {
  const timeX = {
    PAST: 10,
    PRESENT: 50,
    FUTURE: 90
  }[currentTime];

  stationMarker.style.left = `${timeX}%`;
  stationMarker.style.top = `25%`; // Исправлена опечатка

  const glowWidth = Math.max(5, timeX - 10);
  document.getElementById("lineGlow").style.width = `${glowWidth}%`;
}

function updateButtons() {
  timeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.time === currentTime);
  });

  aspectButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.aspect === currentAspect);
  });
}

function render(animate = true) {
  const item = DATA[currentTime][currentAspect];
  const index = currentIndex();

  if (animate) {
    infoContent.classList.remove("changing");
    void infoContent.offsetWidth;
    infoContent.classList.add("changing");
  }

  selectionLabel.textContent = `${currentTime} · ${currentAspect}`;
  counter.textContent = `${String(index + 1).padStart(2, "0")} / 12`;
  category.textContent = `${currentTime} · ${currentAspect}`;
  tenseName.textContent = item.name;
  formula.textContent = item.formula;
  example.textContent = item.example;
  translation.textContent = item.translation;
  description.textContent = item.description;

  updateButtons();
  positionMarker();
}

function choose(time, aspect) {
  currentTime = time;
  currentAspect = aspect;
  render();
}

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    choose(button.dataset.time, currentAspect);
  });
});

aspectButtons.forEach(button => {
  button.addEventListener("click", () => {
    choose(currentTime, button.dataset.aspect);
  });
});

function move(delta) {
  const next = (currentIndex() + delta + flatOrder.length) % flatOrder.length;
  [currentTime, currentAspect] = flatOrder[next];
  render();
}

document.getElementById("prev").addEventListener("click", () => move(-1));
document.getElementById("next").addEventListener("click", () => move(1));

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
});

render(false);
