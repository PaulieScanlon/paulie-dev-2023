import { useRef, memo } from 'react';
// https://github.com/vasturiano/react-globe.gl
import Globe from 'react-globe.gl';
import * as THREE from 'three';

import goeJson from '../utils/ne_110m_admin_0_countries.geojson.json';

const GlobeAllCities = memo(({ analytics }) => {
  const globeEl = useRef();

  const globeReady = () => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().enableZoom = false;

      globeEl.current.pointOfView({
        lat: 19.054339351561637,
        lng: -50.421161072148465,
        altitude: 1.8,
      });
    }
  };

  const points = analytics.map((data) => {
    const { latitude, longitude, total } = data;
    return {
      lat: latitude,
      lng: longitude,
      altitude: total / 50,
      radius: 0.3,
      color: '#ff6090',
    };
  });

  return (
    <Globe
      ref={globeEl}
      onGlobeReady={globeReady}
      width={380}
      height={420}
      rendererConfig={{ antialias: true, alpha: true }}
      animateIn={true}
      backgroundColor={'rgba(255, 255, 255, 0)'}
      globeMaterial={
        new THREE.MeshPhongMaterial({
          color: '#1f1b45',
          opacity: 0.7,
          transparent: true,
        })
      }
      customLayerData={[...Array(500).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        alt: Math.random() * 1.4 + 0.1,
      }))}
      customThreeObject={() =>
        new THREE.Mesh(
          new THREE.SphereGeometry(0.3),
          new THREE.MeshBasicMaterial({
            color: '#6f69a7',
            opacity: 0.9,
            transparent: true,
          })
        )
      }
      customThreeObjectUpdate={(obj, d) => {
        Object.assign(obj.position, globeEl.current?.getCoords(d.lat, d.lng, d.alt));
      }}
      atmosphereColor='#6760a0'
      hexPolygonsData={goeJson.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.4}
      hexPolygonColor={(geometry) => {
        return ['#332f5a', '#3e3871', '#3a3562', '#39365c'][geometry.properties.abbrev_len % 4];
      }}
      showGraticules={true}
      pointsData={points}
      pointAltitude='altitude'
      pointRadius='radius'
      pointColor='color'
    />
  );
});

export default GlobeAllCities;
