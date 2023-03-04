// Don't worry, this access token is restricted to only allow usage from the domain that it's deployed on.
// It cannot be taken and used to run up my account 😅
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2aW5sYW5lIiwiYSI6ImNsZXJrdDlwcjBmNXY0NW5sNW44aTQzNW8ifQ.nCItJdtqehnnUcXOrtcupQ'

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    zoom: 12,
    center: [-122.44442, 37.75493],
    customAttribution: 'Map by <a href="https://www.devinlane.com/" target="_blank">Devin Lane 🎸</a> <a href="https://github.com/DevinCLane/bicycle-parking" target="_blank">Source code here 💻</a>'
})

map.on('load', () => {
    map.addSource('bicycle-parking', {
        'type': 'geojson',
        'data': 'https://data.sfgov.org/resource/hn4j-6fx5.geojson'
    })
    map.addLayer({
        'id': 'bicycle-parking-layer',
        'source': 'bicycle-parking',
        'type': 'circle',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
        }
    })

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    })

    map.on('mouseenter', 'bicycle-parking-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();

        const {
            address,
            install_yr: installYear,
            location,
            placement,
            racks,
            spaces
        } = e.features[0].properties;

        popup
            .setLngLat(coordinates)
            .setHTML(
                "<h3>" + address + "</h3>"
                + "<table>"
                + "<tbody>"
                + "<tr><th>Location</th><td>" + location + "</td></tr>"
                + "<tr><th>Placement</th><td>" + placement + "</td></tr>"
                + "<tr><th>Racks</th><td>" + racks + "</td></tr>"
                + "<tr><th>Spaces</th><td>" + spaces + "</td></tr>"
                + "<tr><th>Install Year</th><td>" + installYear + "</td></tr>"
                + "</tbody>"
                + "</table>"
            )
            .addTo(map)
    })

    // change the cursor to a pointer when we hover over a bicycle rack
    map.on('mouseenter', 'bicycle-parking-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when we mouse away.
    map.on('mouseleave', 'bicycle-parking-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove()
    });
})

