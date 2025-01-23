export const Home = () => {
  const home = document.createElement("section");
  home.classList.add("home");

  const homeCircle = document.createElement("div");
  homeCircle.classList.add("home-circle");
  home.appendChild(homeCircle);

  const homeHero = document.createElement("div");
  homeHero.classList.add("home-hero");

  const h1 = document.createElement("h1");
  h1.textContent = "Plan, Design, Build";
  homeHero.appendChild(h1);

  const h2 = document.createElement("h2");
  h2.textContent = "I bring your Ideas to Life, with no boundaries";
  homeHero.appendChild(h2);

  home.appendChild(homeHero);

  return home;
};
