const pics = document.querySelectorAll(".pic");

let currentId = 1;

pics.forEach((pic) => {
  pic.addEventListener("click", () => {
    currentId = pic.id;

    pics.forEach((pic) => {
      if (pic.id === currentId) {
        pic.classList.add("active");
      } else {
        pic.classList.remove("active");
      }
    });
  });
});
