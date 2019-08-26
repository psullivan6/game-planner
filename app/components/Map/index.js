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

const createPoint = coordinates => {
  const point = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates
    },
    properties: {
      id: String(new Date().getTime())
    }
  };

  geojson.features.push(point);
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

  map.on('click', 'points', function(e) {
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 14 });
  });

  locations.forEach(location => {
    createPoint(Object.values(location.fields.location));
  });

  map.getSource('geojson').setData(geojson);
  map.fitBounds(geojson.features.map(feature => feature.geometry.coordinates), {
    padding: 20
  });
};

const addLocation = map => {
  console.log('ADD LOCATION', map);
  createPoint(extraLocation);
  map.getSource('geojson').setData(geojson);
};

const Map = ({ locations }) => {
  let map;
  const container = useRef(null);

  useEffect(() => {
    map = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      minZoom: 4,
      maxZoom: 20,
      zoom: 6,
      center: [-80.7653421, 35.2378821] // long, lat
    });

    map.on('load', () => {
      setupDots({ locations, map });
    });
  }, [locations]);

  return (
    <div>
      <button onClick={() => addLocation(map)}>ADD LOCATION</button>
      <Container ref={container} />
    </div>
  );
};

export default Map;
