const askBtn = document.getElementById('askBtn');
const question = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');
const proposalText = document.getElementById('proposalText');

console.log("Meri Banogi Kya 💖?");
console.log("Meri Rahogi Kya 💖?");
console.log("Puchhe Dil Mera Tumse Yahi💖!");
console.log("Ab Toh Aadat Lagi Hai Teri💖?");

// Music setup
const startMusic = new Audio('Start.mp3');
const yesMusic = new Audio('yess.mp3');
const sadMusic = new Audio('no.mp3');

[startMusic, yesMusic, sadMusic].forEach(audio => {
    audio.volume = 0.3;
});

const secondChanceMessages = [
    "piliiiiiizzzzzzzzzzzzzzzzzzzzz? 💔",
    "Think again, piliiiiiizzzzzzzzzzzzzzzzzzzzzzz? 🌻",
    "I really like you 🥺",
    "Give me a chance to make you smile 💫",
    "I promise to bring you chocolates 🍫",
    "Let’s create memories together 📸",
    "I will make you laugh every day 😂",
    "You deserve all the love 🌹",
    "I won't give up easily 😌",
    "piliiiiiizzzzzzzzzzzzzzzzzzzzzzz say yes this time 💖",
    "Nasamajh larki 😌🌸",
    "Your smile means everything 💛",
    "Say yes and make my day brighter ☀️",
    "You and I, best team ever? 👫",
    "I will bring coffee and care 🫶",
    "Your yes will be the best gift 🎁",
    "Your yes will make me the happiest 🌈",
    "One yes, and I’ll bring you ice cream 🍦",
    "I promise to always support you 🤝",
    "Say yes, let’s start our story together 📖",
    "Waiting for you, like coffee waits for morning ☕💕"
];

let attempt = 0;
const actionHistory = [];

askBtn.addEventListener('click', () => {
    askBtn.classList.add('hidden');
    question.classList.remove('hidden');
    actionHistory.push('started');

    yesMusic.pause();
    yesMusic.currentTime = 0;
    sadMusic.pause();
    sadMusic.currentTime = 0;
    startMusic.play();

});

yesBtn.addEventListener('click', () => {
    question.classList.add('hidden');
    response.classList.remove('hidden');
    response.textContent = "Yay! You made my day 💖";
     actionHistory.push('yes');
    confetti();
   


    startMusic.pause();
    startMusic.currentTime = 0;
    sadMusic.pause();
    sadMusic.currentTime = 0;
    yesMusic.play();

});

noBtn.addEventListener('click', () => {
    actionHistory.push('no');

    if (attempt >= secondChanceMessages.length) {
        startMusic.pause();
        startMusic.currentTime = 0;
        yesMusic.pause();
        yesMusic.currentTime = 0;
        sadMusic.play();

        document.body.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
                <img src="https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif" alt="Crying Cute Gif" style="width: 90%; max-width: 400px; border-radius: 20px; margin-bottom: 20px;">
                <h1 style="color:red; text-align:center; font-size:1.2em;">💔 Heart.exe has stopped working due to excessive rejection. 💔</h1>
            </div>
        `;
        console.log("Action History:", actionHistory);
        sendGameSummary();
    } else {
        const msg = secondChanceMessages[attempt % secondChanceMessages.length];
        proposalText.textContent = msg;
        attempt++;
    }
});

function confetti() {
    sendGameSummary();
    const possibleEmojis = ["💖", "🌸", "💕", "💗", "❤️", "✨", "🥰", "😍", "💞", "💝"];

    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = possibleEmojis[Math.floor(Math.random() * possibleEmojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.top = "-5vh";
        emoji.style.fontSize = Math.random() * 20 + 20 + "px";
        emoji.style.opacity = Math.random() * 0.8 + 0.2;
        emoji.style.animation = `fall ${Math.random() * 3 + 4}s linear forwards`;
        emoji.style.pointerEvents = 'none';
        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 7000);
    }
}

function sendGameSummary() {
    const historyString = actionHistory.join(", ");
    const secondMessagesString = secondChanceMessages.join(", ");

    const summaryMessage =
`❤️ Crush Proposal Game Summary ❤️

Action History:
${historyString}

--------------------------------

Second Chance Messages:
${secondMessagesString}

-------------------------------------------------------

Sent automatically from your website.`;

    emailjs.send("service_4ssqd0a", "template_04jpqfo", {
        title: "Crush Proposal Game Data",
        message: summaryMessage,
    }).then(() => {
    }, (error) => {
    });
}
