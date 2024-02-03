import { component$, useVisibleTask$ } from '@builder.io/qwik';

import Globe from 'globe.gl';
import * as THREE from 'three';

import goeJson from '../utils/ne_110m_admin_0_countries.geojson.json';

interface Props {
  data: any;
  width?: number;
  height?: number;
}

const GlobeAllCities = component$<Props>(({ data, width = 390, height = 458 }) => {
  const points = data.map((data) => {
    const { latitude, longitude, total } = data;

    return {
      lat: latitude,
      lng: longitude,
      altitude: Math.min(0.8, Math.max(0.01, total / 50)),
      radius: 0.3,
      color: '#ff6090',
    };
  });

  useVisibleTask$(() => {
    const world = Globe({ animateIn: true, rendererConfig: { antialias: true, alpha: true } })
      .onGlobeReady(() => {})
      .pointOfView({
        lat: 19.054339351561637,
        lng: -50.421161072148465,
        altitude: 1.8,
      })
      .pointsMerge(true)
      .width(width)
      .height(height)
      .backgroundColor('rgba(255, 255, 255, 0)')
      .globeMaterial(
        new THREE.MeshPhongMaterial({
          color: '#120f30',
          opacity: 0.7,
          transparent: true,
        })
      )
      .customLayerData(
        [...Array(500).keys()].map(() => ({
          lat: (Math.random() - 0.5) * 180,
          lng: (Math.random() - 0.5) * 360,
          alt: Math.random() * 1.4 + 0.1,
        }))
      )
      .customThreeObject(() => {
        return new THREE.Mesh(
          new THREE.SphereGeometry(0.3),
          new THREE.MeshBasicMaterial({
            color: '#6f69a7',
            opacity: 0.9,
            transparent: true,
          })
        );
      })
      .customThreeObjectUpdate((obj, d) => {
        Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
      })
      .atmosphereColor('#655ea0')
      .hexPolygonsData(goeJson.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.4)
      .hexPolygonColor((geometry) => {
        return ['#2a2469', '#322a7a', '#3d338e', '#423b8f'][geometry.properties.abbrev_len % 4];
      })
      .showGraticules(true)
      .pointsData(points)
      .pointAltitude('altitude')
      .pointColor('color')(document.getElementById('globe'));

    const orbitControls = world.controls();
    orbitControls.autoRotate = true;
    orbitControls.enableZoom = false;

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        world.controls().autoRotate = true;
      } else {
        world.controls().autoRotate = false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
  });

  return (
    <div
      id='globe'
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    ></div>
  );
});

export default GlobeAllCities;
