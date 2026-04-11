let result = document.getElementById("result");
let X = document.getElementById("title");
let Y = document.getElementById("message");
var audio = new Audio("sounds/happy_happy.mp3");
var eAudio = new Audio("sounds/fahh.mp3");

async function getImage() {
  let dogType = document.getElementById("dog").value;

  try {
    const res = await fetch("/getDogPics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dogBreed: dogType }),
    });

    const data = await res.json();
    if (!res.ok) {
      addError(data.error, data.status);
      return;
    } else {
      addSuccess();
    }
    let img = document.createElement("img");
    img.src = data.message;
    result.innerHTML = "";
    result.appendChild(img);
    setTimeout(() => {
      img.classList.add("show");
    }, 50);
  } catch (err) {
    result.innerHTML = "Network Error";
  }
}

function addError(error, status) {
  document.body.classList.remove("red-colour");
  document.body.classList.remove("gradient-bg");
  result.innerHTML = " ";

  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    eAudio.play();
    document.body.classList.add("red-colour");
    result.innerHTML = error;
    if (status === 409 || true) {
      const ref = `<a
          href="/breeds"
          target="_blank"
          style="font-size: 18px"
          id="breed-link"
          >Click Here to View Available Dog Breeds</a
        >`;
      result.innerHTML += ref;
    }
    result.classList.add("shake");
    setTimeout(() => {
      result.classList.remove("shake");
    }, 400);
    X.classList.remove("A1");
    X.classList.add("A2");
    Y.classList.remove("B1");
    Y.classList.add("B2");
  }, 100);
}
function addSuccess() {
  X.classList.remove("A2");
  X.classList.add("A1");
  Y.classList.remove("B2");
  Y.classList.add("B1");
  document.body.classList.remove("gradient-bg");
  result.innerHTML = "";
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    document.body.classList.add("gradient-bg");
    audio.onended = () => {
      document.body.classList.remove("gradient-bg");
      document.body.classList.remove("red-colour");
    };
  }, 100);
}
