document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const para = document.getElementById("para");

  let selected = [];

  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function loadImages() {
    container.innerHTML = "";
    para.textContent = "";
    selected = [];

    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";

    const duplicate =
      imageClasses[Math.floor(Math.random() * imageClasses.length)];

    const images = [...imageClasses, duplicate];
    shuffle(images);

    images.forEach((cls) => {
      const img = document.createElement("img");
      img.classList.add(cls);
      img.dataset.cls = cls;

      img.addEventListener("click", () => handleClick(img));
      container.appendChild(img);
    });
  }

  function handleClick(img) {
    if (selected.length === 2 || selected.includes(img)) return;

    img.classList.add("selected");
    selected.push(img);

    resetBtn.style.display = "inline-block";

    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }

  resetBtn.addEventListener("click", () => {
    loadImages();
  });

  verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";

    if (selected[0].dataset.cls === selected[1].dataset.cls) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  loadImages();
});
