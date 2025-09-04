const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => display(json.data));
};

const display = (lesson) => {
  // console.log(lesson);
  const levels = document.getElementById("level-container");
  levels.innerHTML = "";
  for (const item of lesson) {
    // console.log(item);
    const cardLevel = document.createElement("div");
    cardLevel.innerHTML = `
          
          <button class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i>lesson-${item.level_no}</button>
      `;
    levels.append(cardLevel);
  }
};

loadLessons();
