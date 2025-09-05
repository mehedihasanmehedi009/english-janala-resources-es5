const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => display(json.data));
};

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevel(data.data);
    });
};

const displayLevel = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
          
      <div class="text-center col-span-full">
       <img  class=" mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl text-gray-400 md:font-medium py-8">
           এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="md:text-[44px] font-bold">নেক্সট Lesson এ যান</h2>
      </div>
  
  `;
  }

  words.forEach((word) => {
    console.log(word);
    const cords = document.createElement("div");
    cords.innerHTML = `
           <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <h2 class="font-bangla text-1xl">${
          word.meaning ? word.meaning : "আর্থ পাওয়া যায়নি"
        }/${
      word.pronunciation ? word.pronunciation : "pronunciation  পাওয়া যায়নি"
    }"</h2>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#eaeced] hover:bg-red-300">
            <i class="fa-solid fa-circle-question"></i>
          </button>
          <button class="btn bg-[#ebeeef] hover:bg-red-300">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(cords);
  });
};

const display = (lesson) => {
  // console.log(lesson);
  const levels = document.getElementById("level-container");
  levels.innerHTML = "";
  for (const item of lesson) {
    console.log(item);
    const cardLevel = document.createElement("div");
    cardLevel.innerHTML = `
          
          <button id="lesson-btn-${item.level_no}"

           onclick="loadLevelWord(${item.level_no})"  class="lesson-btn  btn btn-outline btn-primary "
                  ><i class="fa-solid fa-book-open"></i>lesson-${item.level_no}</button>
      `;
    levels.append(cardLevel);
  }
};

loadLessons();
