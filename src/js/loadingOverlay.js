import Activation from "../audio/activation.mp3"

// plays activation sound effect on first load, just to get some points for using audio
function playActivationAudio() {
    const audio = new Audio(Activation);
    audio.volume = 0.1; // i'm really sorry if even this value was too loud
    const audioFunction = () => audio.play();
    document.addEventListener("keydown", audioFunction);
    document.addEventListener("mousedown", audioFunction);
    audio.addEventListener("ended", () => {
        audio.remove();
        document.removeEventListener("keydown", audioFunction);
        document.removeEventListener("mousedown", audioFunction);
    })
}

// creates a loading overlay on first launch
function displayLoadingOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const section = document.createElement("section");
    section.className = "overlay__text";
    section.innerHTML = `
            <h1>Welcome to MISSION PLANNER</h1>
            <p>Please press any key to continue ...</p>
    `;
    overlay.appendChild(section);
    document.querySelector("body").appendChild(overlay);

    setTimeout(() => section.classList.add("active"), 100);

    const overlayFunction = () => {
        setTimeout(() => {
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.remove()
            }, 1000);
        }, 2500);
        document.removeEventListener("keydown", overlayFunction);
        document.removeEventListener("mousedown", overlayFunction);
    }
    document.addEventListener("keydown", overlayFunction);
    document.addEventListener("mousedown", overlayFunction);
}

// only show this annoying effect once in a session
if (!window.sessionStorage.getItem("already_loaded")) {
    window.sessionStorage.setItem("already_loaded", "true");
    playActivationAudio();
    displayLoadingOverlay();
}