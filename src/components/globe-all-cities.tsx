import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import Loading from './loading';

interface Props {
  data: any;
  width?: number;
  height?: number;
}

const GlobeAllCities = component$<Props>(({ data, width = 390, height = 458 }) => {
  const isLoaded = useSignal(false);

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

  useVisibleTask$(async () => {
    const goeJson = await import('../utils/ne_110m_admin_0_countries.geojson.json');

    const GlobeModule = await import('globe.gl');
    const Globe = GlobeModule.default;
    const THREE = await import('three');

    const world = Globe({ animateIn: true, rendererConfig: { antialias: true, alpha: true } })
      .onGlobeReady(() => {
        isLoaded.value = true;
      })
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
      .customThreeObjectUpdate((obj, d: any) => {
        Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
      })
      .atmosphereColor('#655ea0')
      .hexPolygonsData(goeJson.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.4)
      .hexPolygonColor((geometry: any) => {
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
      orbitControls.autoRotate = document.visibilityState === 'visible';
    };

    document.addEventListener('visibilitychange', handleVisibility);

    handleVisibility();
  });

  return (
    <>
      {isLoaded.value ? null : (
        <div class='absolute flex items-center justify-center h-full w-full'>
          <Loading />
        </div>
      )}
      <div
        id='globe'
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      ></div>
    </>
  );
});

export default GlobeAllCities;
