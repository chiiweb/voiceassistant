// --- Speech Recognition Setup ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recog = new SpeechRecognition();
recog.lang = "en-US";
recog.interimResults = false;

// --- UI Elements ---
const micBtn = document.getElementById("micBtn");
const output = document.getElementById("output");

// --- Start/Stop Listening ---
micBtn.onmousedown = () => recog.start();
micBtn.onmouseup = () => recog.stop();

// --- When Speech is Recognized ---
recog.onresult = async (event) => {
  const text = event.results[0][0].transcript;
  output.innerHTML = `<p><b>You:</b> ${text}</p>`;

  const reply = await askAI(text);
  output.innerHTML += `<p><b>Assistant:</b> ${reply}</p>`;
  speak(reply);
};

// --- Send Text to AI Backend ---
async function askAI(prompt) {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  return data.reply;
}

// --- Text-to-Speech ---
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  speechSynthesis.speak(utter);
}
