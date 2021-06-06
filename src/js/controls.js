import FileUploadPopup from "./fileUploadPopup";

export default class Controls {

    constructor() {
        this.colors = ["black", "blue", "red", "green", "purple", "yellow"];
        this.tools = ["line", "marker"];

        this.sides = ["friendly", "hostile"];
        this.types = ["point", "infantry", "armor", "fixedwing"];

        this.options = {
            tool: "line",
            color: "black",
            width: 3,
            marker: {
                size: 50,
                type: "point",
                side: "friendly"
            }
        };
    }

    render(element) {
        this.element = element;
        element.innerHTML = "";
        const toolsSection = document.createElement("section");
        toolsSection.className = "map-control__tools";
        const markersSection = document.createElement("section");
        markersSection.className = "map-control__markers";
        toolsSection.appendChild(this.getMapControlsElement());
        toolsSection.appendChild(this.getToolControlsElement());
        toolsSection.appendChild(this.getColorButtonsElement());
        markersSection.appendChild(this.getMarkerControlsElement());

        element.appendChild(toolsSection);
        element.appendChild(markersSection);
        this.addEventListeners();
    }

    getMapControlsElement() {
        const element = document.createElement("section");
        element.id = "map-controls-plan";
        element.innerHTML = this.getMapControlsHtml();
        return element;
    }

    getMapControlsHtml() {
        return `
            <h2>Mission plan</h2>
            <button class="map-control__btn map-control__btn-export" id="export-map">Export</button>
            <button class="map-control__btn map-control__btn-load" id="load-map">Load</button>
            <button class="map-control__btn map-control__btn-clear" id="clear-map">Clear</button>
        `;
    }

    getToolControlsElement() {
        const element = document.createElement("section");
        element.id = "map-controls-tools";
        element.innerHTML = this.getToolControlsHtml();
        return element;
    }

    getToolControlsHtml() {
        let html = `<h2>Tools</h2>`;
        this.tools.forEach(tool => html += `
            <button class="map-control__btn map-control__btn-tool"
                ${this.options.tool === tool ? "disabled" : ""}
                value="${tool}">
                ${tool}
            </button>
        `);
        html += `
            <section class="map-control__slider-section">
                <label for="map-control-width">Line width</label>
                <input type="range" min="2" max="15" value=${this.options.width} id="map-control-width"/>
            </section>
        `
        return html;
    }

    getColorButtonsElement() {
        const element = document.createElement("section");
        element.id = "map-controls-colors";
        element.innerHTML = this.getColorButtonsHtml();
        return element;
    }

    getColorButtonsHtml() {
        let html = `<h2>Colors</h2>`;
        this.colors.forEach(color => html += `
            <button class="map-control__btn map-control__btn-color map-control__btn-color--${color}"
                ${this.options.color === color ? "disabled" : ""}
                value="${color}">
                ${color}
            </button>
        `);
        return html;
    }

    getMarkerControlsElement() {
        const element = document.createElement("section");
        element.id = "map-controls-colors";
        element.innerHTML = this.getMarkerControlsHtml();
        return element;
    }

    getMarkerControlsHtml() {
        let html = `<h2>NATO marker</h2>`;
        const options = this.options.marker;
        html += `
            <section class='map-control-types'>
            <h3>Marker type</h3>    
            `
        this.types.forEach(type => html += `
            <button class="map-control__btn map-control__btn-marker-type "
                ${options.type === type ? "disabled" : ""}
                value="${type}">
                ${type}
            </button>
        `);
        html += "</section><h3>Faction</h3>";
        html += "<section class='map-control-sides'>"
        this.sides.forEach(side => html += `
            <button class="map-control__btn map-control__btn-marker-side"
                ${options.side === side ? "disabled" : ""}
                value="${side}">
                ${side}
            </button>
        `);
        html += `
            <section class="map-control__slider-section">
                <label for="map-control__marker-size">Size</label>
                <input type="range" min="20" max="100" value=${this.options.marker.size} id="map-control__marker-size"/>
            </section>
        `
        html += "</section>";
        return html;
    }

    addEventListeners() {
        document.getElementById("export-map").addEventListener("click", this.handleExportState.bind(this));
        document.getElementById("load-map").addEventListener("click", this.handleLoadState.bind(this));
        document.getElementById("clear-map").addEventListener("click", this.map.handleClearState.bind(this.map));

        document.querySelectorAll(".map-control__btn-tool").forEach(
            button => button.addEventListener("click", this.handleToolChange.bind(this))
        );
        document.querySelectorAll(".map-control__btn-color").forEach(
            button => button.addEventListener("click", this.handleColorChange.bind(this))
        );
        document.querySelectorAll(".map-control__btn-marker-type").forEach(
            button => button.addEventListener("click", this.handleTypeChange.bind(this))
        );
        document.querySelectorAll(".map-control__btn-marker-side").forEach(
            button => button.addEventListener("click", this.handleSideChange.bind(this))
        );
        document.getElementById("map-control-width")
            .addEventListener("change", this.handleWidthChange.bind(this));

        document.getElementById("map-control__marker-size")
            .addEventListener("change", this.handleMarkerSizeChange.bind(this));
    }

    handleToolChange(e) {
        e.preventDefault();
        this.options.tool = e.target.value;
        this.render(this.element);
    }

    handleColorChange(e) {
        e.preventDefault();
        this.options.color = e.target.value;
        this.render(this.element);
    }

    handleWidthChange(e) {
        e.preventDefault();
        this.options.width = e.target.value;
    }

    handleSideChange(e) {
        e.preventDefault();
        this.options.marker.side = e.target.value;
        this.render(this.element);
    }

    handleTypeChange(e) {
        e.preventDefault();
        this.options.marker.type = e.target.value;
        this.render(this.element);
    }

    handleMarkerSizeChange(e) {
        e.preventDefault();
        this.options.marker.size = e.target.value;
        console.log(this.options.marker)
    }

    handleExportState() {
        const encodedState = encodeURIComponent(JSON.stringify(this.map.getState()));
        const downloadElement = document.createElement("a");
        // add the encoded state to the link for download
        downloadElement.setAttribute("href", "data:text/plain;charset=utf-8," + encodedState);
        downloadElement.setAttribute("download", "mission_plan.json");
        downloadElement.style.display = "none";
        document.body.appendChild(downloadElement);
        downloadElement.click(); // download the file
        document.body.removeChild(downloadElement);
    }

    handleLoadState() {
        const popup = new FileUploadPopup();
        popup.display(e => {
            const file = e.target.files[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const data = JSON.parse(fileReader.result.toString());
                this.map.restoreState(data);
            }
            fileReader.readAsText(file);
            popup.hide();
        });
    }

    getOptions() {
        return this.options;
    }

    setMap(map) {
        this.map = map;
    }
}