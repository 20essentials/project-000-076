console.groupCollapsed("Reference");
console.log(
  "Swipe icon",
  "https://media.lordicon.com/icons/wired/gradient/1444-swipe-left-right.svg"
);
console.groupEnd();

const DISTANCE_LIMIT = 70,
  d = document;
let deltaDistance = 0;
let isAnimate = false;

let dragStart = (event) => {
  if (isAnimate) return;
  const currentCard = event.target.closest(".card");
  if (!currentCard) return;
  const startX = event.pageX ?? event.touches[0].pageX;

  let dragMove = (event) => {
    let currentX = event.pageX ?? event.touches[0].pageX;
    deltaDistance = currentX - startX;
    if (deltaDistance === 0) return;
    isAnimate = true;
    let degree = deltaDistance / 10;
    currentCard.style.transform = `
      translateX(${deltaDistance}px) rotate(${degree}deg)
    `;
  };

  let dragEnd = (event) => {
    d.removeEventListener("mousemove", dragMove);
    d.removeEventListener("touchmove", dragMove);
    d.removeEventListener("mouseup", dragEnd);
    d.removeEventListener("touchend", dragEnd);

    let tookDecison = Math.abs(deltaDistance) > DISTANCE_LIMIT;
    if (tookDecison) {
      let goRight = deltaDistance > 0;
      currentCard.classList.add(goRight ? "go-right" : "go-left");
      currentCard.addEventListener("transitionend", () => {
        currentCard.remove();
      });
    } else {
      currentCard.classList.add("reset");
      currentCard.classList.remove("go-right", "go-left");
    }

    currentCard.removeAttribute("style");
    currentCard.classList.remove("reset");
    isAnimate = false;
    deltaDistance = 0;
  };

  d.addEventListener("mousemove", dragMove);
  d.addEventListener("touchmove", dragMove, { passive: true });
  d.addEventListener("mouseup", dragEnd);
  d.addEventListener("touchend", dragEnd, { passive: true });
};

d.addEventListener("mousedown", dragStart);
d.addEventListener("touchstart", dragStart, { passive: true });
