import NatoMarker from "./natoMarker";

export default class Map {

    constructor(center) {
        this.center = center;
        this.polyLayer = new SMap.Layer.Geometry();
        this.markerLayer = new SMap.Layer.Marker();
        this.lines = [];
        this.markers = [];
    }

    render(element) {
        this.element = element;
        if (!this.map) {
            element.innerHTML = "";
            this.map = new SMap(element, this.center, 13);
            this.map.addDefaultLayer(SMap.DEF_BASE).enable();
            this.map.addDefaultControls();
            this.map.addLayer(this.polyLayer);
            this.map.addLayer(this.markerLayer);
            this.polyLayer.enable();
            this.markerLayer.enable();
            element.addEventListener("click", this.handleClick.bind(this));
            document.addEventListener("keyup", e => {
                if (e.key === "Shift") {
                    this.point = null;
                }
            })
        }

        if (localStorage.getItem("markers") || localStorage.getItem("lines")) {
            const markers = JSON.parse(localStorage.getItem("markers"));
            const lines = JSON.parse(localStorage.getItem("lines"));
            this.restoreState({markers, lines});
        }
    }

    drawLine(posStart, posEnd, options) {
        const points = [posStart, posEnd];
        const line = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, points, options);
        this.polyLayer.addGeometry(line);
        this.lines.push({points, options});
        this.saveState();
    }

    drawMarker(coords, options) {
        const {size, side, type} = options;

        let marker = null;
        if (type === "point") {
            marker = new SMap.Marker(coords, false);
        } else {
            const natoMarker = new NatoMarker()
                .withSize(size)
                .withSide(side)
                .withType(type)
                .build();
            marker = new SMap.Marker(coords, false, {url: natoMarker});
        }

        this.markerLayer.addMarker(marker);
        this.markers.push({coords, options});
        this.saveState();
    }

    handleClick(e) {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        e.stopPropagation();

        const tool = this.controls.getOptions().tool;
        if (tool === "line") {
            this.handleDrawLine(e);
        } else if (tool === "marker") {
            this.handleDrawMarker(e);
        }
    }

    handleDrawLine(e) {
        const coords = SMap.Coords.fromEvent(e, this.map);
        if (!this.point) {
            this.point = coords;
        } else {
            const options = this.controls.getOptions();
            this.drawLine(this.point, coords, {...options, opacity: 1, outlineOpacity: 0});
            if (e.shiftKey) {
                this.point = coords;
            } else {
                this.point = null;
            }
        }
    }

    handleDrawMarker(e) {
        const options = this.controls.getOptions().marker;
        const coords = SMap.Coords.fromEvent(e, this.map);
        this.drawMarker(coords, options);
    }

    saveState() {
        localStorage.setItem("markers", JSON.stringify(this.markers));
        localStorage.setItem("lines", JSON.stringify(this.lines));
    }

    getState() {
        return {lines: this.lines, markers: this.markers};
    }

    restoreState(data) {
        this.handleClearState(); // clear current state before restoration

        // load lines
        if(data.lines) {
            data.lines.forEach(line => {
                const start = SMap.Coords.fromWGS84(line.points[0].x, line.points[0].y)
                const end = SMap.Coords.fromWGS84(line.points[1].x, line.points[1].y)
                this.drawLine(start, end, line.options)
            });
        }

        // load markers
        if (data.markers) {
            data.markers.forEach(marker => {
                const coords = SMap.Coords.fromWGS84(marker.coords.x, marker.coords.y)
                this.drawMarker(coords, marker.options)
            });
        }
    }

    handleClearState() {
        // delete all markers and lines from map and local storage
        this.polyLayer.removeAll();
        this.markerLayer.removeAll();
        this.lines = [];
        this.markers = [];
        this.point = null;
        localStorage.removeItem("markers");
        localStorage.removeItem("lines");
        this.render(this.element);
    }

    setControls(controls) {
        this.controls = controls;
    }
}