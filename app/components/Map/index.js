import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  height: 400px;
`;

mapboxgl.accessToken =
  'pk.eyJ1IjoicHN1bGxpdmFuNiIsImEiOiJLckJWdW9RIn0.eO3wQQyUjIbT7pvPcEa6vw';

const Map = () => {
  const container = useRef(null);

  useEffect(() => {
    new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      minZoom: 4,
      zoom: 6,
      center: [-80.7653421, 35.2378821] // long, lat
    });
  }, []);

  return <Container ref={container} />;
};

export default Map;
