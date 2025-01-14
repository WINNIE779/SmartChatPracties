document.addEventListener("DOMContentLoaded", () => {
  // 监听页面的内容加载
  const toggleButton = document.getElementById("toggle");

  const routes = document.querySelector(".routes");

  const pics = document.querySelectorAll(".pic");

  // menu和close的切换
  toggleButton.addEventListener("click", () => {
    const menu = toggleButton.querySelector(".menu");

    const close = toggleButton.querySelector(".close");

    const isRoutesVisible = routes.style.display === "flex";

    routes.style.display = isRoutesVisible ? "none" : "flex";

    menu.style.display = isRoutesVisible ? "block" : "none";

    close.style.display = isRoutesVisible ? "none" : "block";
  });

  routes.addEventListener("click", (event) => {
    const route = event.target;

    if (route.classList.contains("route")) {
      event.preventDefault();

      pics.forEach((pic) => {
        if (pic.id === route.id) {
          pic.classList.add("active");
        } else {
          pic.classList.remove("active");
        }
      });
    }
  });
});
