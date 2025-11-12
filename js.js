const textarea = document.getElementById("textarea");
const btn = document.getElementById("btn");
const select = document.getElementById("select");

let ovozlar = [];

function loadVoices() {
  ovozlar = window.speechSynthesis.getVoices();

  if (ovozlar.length > 0) {
    select.innerHTML = "";
    ovozlar.forEach((ovoz, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${ovoz.lang} - ${ovoz.name}`;
      select.appendChild(option);
    });
  } else {
    select.innerHTML = "<option>Голоса не найдены!</option>";
  }
}

function waitVoices() {
  if (ovozlar.length === 0) loadVoices();
  if (ovozlar.length === 0) setTimeout(waitVoices, 500);
}

loadVoices();
waitVoices();

function speak() {
  const msg = new SpeechSynthesisUtterance();
  msg.text = textarea.value;

  let i = select.value;
  if (i) msg.voice = ovozlar[i];

  speechSynthesis.speak(msg);
}

btn.addEventListener("click", speak);
