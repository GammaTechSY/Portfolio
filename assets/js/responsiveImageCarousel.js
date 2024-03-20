const slider = document.querySelector(".slider");
const div01 = document.querySelector(".div01");
const prevButton = document.getElementById("btnPrevInCarousel");
const nextButton = document.getElementById("btnNextInCarousel");
let recentProjectsDiv = document.getElementById("Recent");

function activate(e) {
  const items = document.querySelectorAll(".item");
  function clickLink() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.onclick = (ev) => {
        if (ev.currentTarget.parentNode.children[2] === ev.currentTarget) {
          document.body.removeEventListener("keydown", keydownActivate, false);
          document.getElementById(ev.currentTarget.dataset.target).click();
          document.querySelector(".lb-prev").onclick = () => {
            document.querySelector(".lb-image").setAttribute("loading", "lazy");
          };
          document.querySelector(".lb-next").onclick = () => {
            document.querySelector(".lb-image").setAttribute("loading", "lazy");
          };
          document.addEventListener("keydown", lightBoxKeydownActivate, false);
        }
      };
    }
  }
  clickLink();
  const descriptions = div01.children;
  nextButton.onclick = () => {
    append(items, descriptions);
  };
  prevButton.onclick = () => {
    prepend(items, descriptions);
  };
}

const keydownActivate = (ev) => {
  const key = ev.key;
  const items = document.querySelectorAll(".item");
  const descriptions = div01.children;
  switch (key) {
    case "ArrowRight":
      append(items, descriptions);
      break;
    case "ArrowLeft":
      prepend(items, descriptions);
      break;
    default:
      break;
  }
};
const lightBoxKeydownActivate = (ev) => {
  const key = ev.key;
  switch (key) {
    case "ArrowRight":
    case "ArrowLeft":
      document.querySelector(".lb-image").setAttribute("loading", "lazy");
      break;
    default:
      break;
  }
};

const append = (items, descriptions) => {
  slider.append(items[0]);
  for (let i = 0; i < descriptions.length; i++) {
    descriptions[i].classList.add("hide");
  }
  document.body.addEventListener("keydown", keydownActivate, false);
  descriptions[1].classList.remove("hide");
  div01.append(descriptions[0]);
};

const prepend = (items, descriptions) => {
  slider.prepend(items[items.length - 1]);
  for (let i = 0; i < descriptions.length; i++) {
    descriptions[i].classList.add("hide");
  }
  document.body.addEventListener("keydown", keydownActivate, false);
  descriptions[descriptions.length - 1].classList.remove("hide");
  div01.prepend(descriptions[descriptions.length - 1]);
};

recentProjectsDiv.addEventListener("click", activate, false);
