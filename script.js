const DATA = {
  PAST: {
    SIMPLE: {
      name: "Past Simple",
      formula: "V²",
      example: "Bjorn opened the door.",
      translation: "Бьйорн открыл дверь.",
      description: "A finished action that happened in the past.",
      scene: "A MOMENT AGO",
      pose: "past"
    },
    CONTINUOUS: {
      name: "Past Continuous",
      formula: "was / were + V-ing",
      example: "Bjorn was waiting for me.",
      translation: "Бьйорн ждал меня.",
      description: "An action that was in progress at a particular moment in the past.",
      scene: "WHILE I ARRIVED",
      pose: "waiting"
    },
    PERFECT: {
      name: "Past Perfect",
      formula: "had + V³",
      example: "Bjorn had left before I arrived.",
      translation: "Бьйорн ушёл до того, как я пришёл.",
      description: "An action completed before another event in the past.",
      scene: "ALREADY GONE",
      pose: "gone"
    },
    "PERFECT CONTINUOUS": {
      name: "Past Perfect Continuous",
      formula: "had been + V-ing",
      example: "Bjorn had been waiting for an hour when I arrived.",
      translation: "Бьйорн ждал уже час, когда я пришёл.",
      description: "An ongoing action that continued for a period before a past moment.",
      scene: "FOR ONE HOUR",
      pose: "tired"
    }
  },

  PRESENT: {
    SIMPLE: {
      name: "Present Simple",
      formula: "V / V-s",
      example: "Bjorn lives near the forest.",
      translation: "Бьйорн живёт возле леса.",
      description: "A fact, habit, or something that is generally true.",
      scene: "EVERY EVENING",
      pose: "normal"
    },
    CONTINUOUS: {
      name: "Present Continuous",
      formula: "am / is / are + V-ing",
      example: "Bjorn is waiting for me.",
      translation: "Бьйорн ждёт меня.",
      description: "An action happening now or around the present moment.",
      scene: "RIGHT NOW",
      pose: "waiting"
    },
    PERFECT: {
      name: "Present Perfect",
      formula: "have / has + V³",
      example: "Bjorn has already left.",
      translation: "Бьйорн уже ушёл.",
      description: "A past action whose result or experience matters now.",
      scene: "RESULT: EMPTY",
      pose: "gone"
    },
    "PERFECT CONTINUOUS": {
      name: "Present Perfect Continuous",
      formula: "have / has been + V-ing",
      example: "Bjorn has been waiting for two hours.",
      translation: "Бьйорн ждёт уже два часа.",
      description: "An action that started earlier and has continued up to now.",
      scene: "02:00 / STILL WAITING",
      pose: "tired"
    }
  },

  FUTURE: {
    SIMPLE: {
      name: "Future Simple",
      formula: "will + V",
      example: "Bjorn will come back tomorrow.",
      translation: "Бьйорн вернётся завтра.",
      description: "A future action, prediction, promise, or decision.",
      scene: "TOMORROW",
      pose: "future"
    },
    CONTINUOUS: {
      name: "Future Continuous",
      formula: "will be + V-ing",
      example: "Bjorn will be waiting for me at eight.",
      translation: "В восемь Бьйорн будет ждать меня.",
      description: "An action that will be in progress at a particular future moment.",
      scene: "AT 08:00",
      pose: "waiting"
    },
    PERFECT: {
      name: "Future Perfect",
      formula: "will have + V³",
      example: "Bjorn will have finished by tomorrow.",
      translation: "К завтрашнему дню Бьйорн уже закончит.",
      description: "An action that will be completed before a point in the future.",
      scene: "BY TOMORROW",
      pose: "future"
    },
    "PERFECT CONTINUOUS": {
      name: "Future Perfect Continuous",
      formula: "will have been + V-ing",
      example: "By midnight, Bjorn will have been working for twelve hours.",
      translation: "К полуночи Бьйорн будет работать уже двенадцать часов.",
      description: "An action that will have continued for a duration up to a future point.",
      scene: "12 HOURS LATER",
      pose: "tired"
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
const sceneCaption = document.getElementById("sceneCaption");
const bjorn = document.getElementById("bjorn");
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
  stationMarker.style.top = `$25%`;

  // The horizontal glow travels toward the selected time.
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

function updateScene(pose) {
  bjorn.className = "bjorn";
  bjorn.classList.add(`pose-${pose}`);
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
  sceneCaption.textContent = item.scene;

  updateButtons();
  positionMarker();
  updateScene(item.pose);
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
