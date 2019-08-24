import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  height: 400px;
`;

mapboxgl.accessToken =
  'pk.eyJ1IjoicHN1bGxpdmFuNiIsImEiOiJLckJWdW9RIn0.eO3wQQyUjIbT7pvPcEa6vw';

const Map = ({ locations }) => {
  const container = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      minZoom: 4,
      zoom: 6,
      center: [-80.7653421, 35.2378821] // long, lat
    });

    locations.map(location => {
      console.log('location.fields.location', location.fields.location);
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.style = {
        width: '10px',
        height: '10px',
        background: 'red'
      };

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(Object.values(location.fields.location))
        .addTo(map);
    });
  }, [locations]);

  return <Container ref={container} />;
};

export default Map;
