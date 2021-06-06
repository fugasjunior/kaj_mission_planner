export default class FileUploadPopup {
    constructor() {}

    display (uploadHandler) {
        this.overlay = document.createElement("div");
        this.overlay.className = "popup__overlay";
        this.overlay.innerHTML = `
            <section class="popup__content">
                <h1>Restore state</h1>
                <label for="restore-state-file">Upload file:</label>
                <input id="restore-state-file" type="file" />
            </section>
        `;

        document.body.appendChild(this.overlay);
        document.getElementById("restore-state-file").addEventListener("change", uploadHandler);
    }

    hide () {
        this.overlay.style.opacity = 0;
        setTimeout(() => this.overlay.remove(), 500);
    }
}