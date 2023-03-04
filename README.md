# Bicycle Parking

https://user-images.githubusercontent.com/8145785/222561584-8521e840-2536-4cf2-b31d-0e97ebf59a1e.mov

[See the live project here](https://bicycleparking.netlify.app/)

A map that shows available bicycle parking in San Francisco.

## How it's made

**Tech Used**: HTML, CSS, JavaScript, Mapbox, GeoJSON

- I pull data on available bicycle parking from [DataSF](https://data.sfgov.org/Transportation/Bicycle-Parking/hn4j-6fx5)

- These data points are added to the map as circles

- When the user hovers over a data point, a pop up is shown with the relevant data about the bicycle parking location:

  - location
  - placement
  - number of racks
  - number of spaces
  - install year.

- We also change the cursor to a pointer when hovering over a data point.

## Lessons Learned:

- Mapbox allows you to create access tokens on a per-project basis, and restrict access to those tokens to specified URLs. I was building out an API proxy server to hold my API key safely, and then learned that I could simply keep the access token in my frontend code, but restrict the URL access to the URL of the project. Therefore, no one can use this access token unless the request is coming from the URL of this same project.

- Mapbox programming centers around defining a Map object, to which we pass the container, a Mapbox style, Zoom amount, and the center of the latitude/longitude.

- Importantly, Mapbox GL uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON. Putting these values in reverse will result in the map not loading.

## Wishlist Optimizations

- Adding style clusters: Mapbox allows you to create [clusters](https://docs.mapbox.com/mapbox-gl-js/example/cluster/), which allows you to create groups of data. This would be useful when the user is zoomed out and many data points are bunched together. The user action would be to click the cluster, and then see the smaller data points available at that level of zoom.

- Improved styles and design for the popups.

## Prior art

- This project is a reinterpretation of this [DataSF Dashboard](https://data.sfgov.org/Transportation/Map-of-Bicycle-Parking/4w2j-vv4u)
