const createElement = (arr) => {
  const htmlElement = arr.map((num) => `<span class="btn">${num}</span>`);
  return htmlElement.join("");
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (statu) => {
  if (statu == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

function loadLessons() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => display(json.data));
}

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevel(data.data);
    });
};

const LoadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const num = await res.json();
  displays(num.data);
};
const displays = (words) => {
  // console.log(words);
  const ditailsContainer = document.getElementById("ditails-container");
  ditailsContainer.innerHTML = `
            <div class="">
            <h2 class="text-2xl font-bold">
              (${words.word}<i class="fa-solid fa-microphone-lines"></i> :${
    words.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${words.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${words.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2
            <div class="">${createElement(words.synonyms)}  </div>
          </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

// card section
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
    manageSpinner(false);
    return;
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
          <button onclick="LoadWordDetail(${
            word.id
          })" class="btn bg-[#eaeced] hover:bg-red-300">
            <i class="fa-solid fa-circle-question"></i>
          </button>
          <button onclick="pronounceWord('${
            word.word
          }')" class="btn bg-[#ebeeef] hover:bg-red-300">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(cords);
  });
  manageSpinner(false);
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

// searchValue

document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((mun) => {
      const allWords = mun.data;
      console.log(allWords);
      const filters = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLevel(filters);
    });
});
