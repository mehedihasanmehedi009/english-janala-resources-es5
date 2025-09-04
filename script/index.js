const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => display(json.data));
};
const loadLevelWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
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

    // {id: 88, level: 1, word: 'Toy', meaning: 'খেলনা', pronunciation: 'টয়'}
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
          
          <button onclick="loadLevelWord(${item.level_no})"  class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i>lesson-${item.level_no}</button>
      `;
    levels.append(cardLevel);
  }
};

loadLessons();
