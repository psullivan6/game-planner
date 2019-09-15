import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  height: 400px;
`;

const geojson = {
  type: 'FeatureCollection',
  features: []
};

const extraLocation = [-119.821944, 39.527222];

mapboxgl.accessToken =
  'pk.eyJ1IjoicHN1bGxpdmFuNiIsImEiOiJLckJWdW9RIn0.eO3wQQyUjIbT7pvPcEa6vw';

const addPoint = ({ coordinates, id }) => {
  const point = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates
    },
    properties: {
      id
    }
  };

  geojson.features.push(point);
};

const addPoints = ({ locations, map }) => {
  const uniqueLocations = locations.filter(
    (location, index, self) =>
      index === self.findIndex(loc => loc.sys.id === location.sys.id)
  );

  // Reset the locations so as to not overwrite with the same data
  geojson.features = [];

  uniqueLocations.forEach(location => {
    addPoint({
      coordinates: Object.values(location.fields.location),
      id: location.sys.id
    });
  });

  map.getSource('geojson').setData(geojson);

  // A bounding box is a mechanism for describing a particular area of a map. It is typically
  // expressed as an array of coordinate pairs, with the first coordinate pair referring to the
  // southwestern corner of the box (the minimum longitude and latitude) and the second referring to
  // the northeastern corner of the box (the maximum longitude and latitude).
  if (geojson.features.length > 1) {
    const coordinates = geojson.features.map(feature => feature.geometry.coordinates);

    // Longitudes
    const longs = coordinates.map(coord => coord[0]);
    const lats = coordinates.map(coord => coord[1]);

    const swLong = Math.min(...longs);
    const swLat = Math.min(...lats);

    const nwLong = Math.max(...longs);
    const nwLat = Math.max(...lats);

    map.fitBounds(
      [[swLong, swLat], [nwLong, nwLat]],
      { padding: 20 }
    );

    return;
  }

  map.flyTo({ center: geojson.features[0].geometry.coordinates, zoom: 14 });
};

const setupDots = ({ locations, map }) => {
  map.addSource('geojson', {
    type: 'geojson',
    data: geojson
  });

  // Add styles to the map
  map.addLayer({
    id: 'points',
    type: 'circle',
    source: 'geojson',
    paint: {
      'circle-radius': 5,
      'circle-color': '#f00'
    },
    filter: ['in', '$type', 'Point']
  });

  map.on('click', 'points', e => {
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 14 });
  });

  if (locations.length > 0) {
    addPoints({ locations, map });
  }
};

const addLocation = map => {
  addPoint(extraLocation);
  map.getSource('geojson').setData(geojson);
};

const Map = ({ locations }) => {
  const map = useRef(); // precise mutation tracking, a `let` doesn't work
  const container = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      minZoom: 4,
      maxZoom: 20,
      zoom: 6,
      center: [-80.7653421, 35.2378821] // long, lat
    });

    map.current.on('load', () => {
      setupDots({ locations, map: map.current });
    });
  }, []);

  useEffect(() => {
    if (locations.length <= 0) {
      return;
    }

    addPoints({ locations, map: map.current });
  }, [locations]);

  return (
    <div>
      <button onClick={() => addLocation(map)}>ADD LOCATION</button>
      <Container ref={container} />
    </div>
  );
};

export default Map;
