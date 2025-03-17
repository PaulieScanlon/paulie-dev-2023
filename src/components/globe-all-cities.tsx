import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import Loading from './loading';

interface Props {
  data: any;
  width?: number;
  height?: number;
  altitude?: number;
  isDashboard?: boolean;
}

const GlobeAllCities = component$<Props>(({ data, width = 390, height = 458, altitude = 1.8, isDashboard = true }) => {
  const isLoaded = useSignal(false);
  const shouldRenderGlobe = useSignal(true);

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

  useVisibleTask$(
    () => {
      // Only check for save data and screen size if NOT on dashboard
      if (!isDashboard) {
        const isSaveDataEnabled = (navigator as any)?.connection?.saveData || false;
        const isSmallScreen = !matchMedia('(min-width: 1024px)').matches;
        shouldRenderGlobe.value = !isSaveDataEnabled && !isSmallScreen;
      }
      // If on dashboard, always render the globe
    },
    { strategy: 'document-ready' }
  );

  useVisibleTask$(
    async () => {
      if (!shouldRenderGlobe.value) {
        isLoaded.value = true;
        return;
      }

      const globeElement = document.getElementById('globe');
      if (!globeElement) return;

      const geoJson = await import('../utils/ne_110m_admin_0_countries.geojson.json');
      const GlobeGL = await import('globe.gl');
      const THREE = await import('three');

      const Globe = GlobeGL.default;
      const world = new Globe(globeElement, {
        animateIn: true,
        rendererConfig: { antialias: true, alpha: true },
      })
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
        .atmosphereColor('#655ea0')
        .showGraticules(true)
        .hexPolygonsData(geoJson.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.4)
        .hexPolygonColor((geometry: { properties: { abbrev_len: number } }) => {
          return ['#2a2469', '#322a7a', '#3d338e', '#423b8f'][geometry.properties.abbrev_len % 4];
        })
        .pointsData(points)
        .pointAltitude('altitude')
        .pointColor('color')
        .pointsMerge(true)
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
        .customThreeObjectUpdate((obj, d: { lat: number; lng: number; alt: number }) => {
          Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
        })
        .onGlobeReady(() => {
          isLoaded.value = true;
        })
        .pointOfView({
          lat: 19.054339351561637,
          lng: -50.421161072148465,
          altitude: altitude,
        });

      const orbitControls = world.controls();
      orbitControls.autoRotate = true;
      orbitControls.enableZoom = false;

      const handleVisibility = () => {
        orbitControls.autoRotate = document.visibilityState === 'visible';
      };

      document.addEventListener('visibilitychange', handleVisibility);
      handleVisibility();

      return () => {
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    },
    { strategy: 'document-ready' }
  );

  return (
    <>
      {shouldRenderGlobe.value && !isLoaded.value && (
        <div class='absolute flex items-center justify-center h-full w-full'>
          <Loading />
        </div>
      )}
      <div
        id='globe'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: shouldRenderGlobe.value ? 'block' : 'none',
        }}
      ></div>
    </>
  );
});

export default GlobeAllCities;
