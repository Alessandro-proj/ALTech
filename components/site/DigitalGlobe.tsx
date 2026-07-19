"use client";

import { useEffect, useRef } from "react";
import {
  BackSide,
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  QuadraticBezierCurve3,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

const latLngToVector = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
};

export function DigitalGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 5.1;

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const globe = new Group();
    scene.add(globe);

    const shell = new Mesh(
      new SphereGeometry(1.72, 48, 32),
      new MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
      }),
    );
    globe.add(shell);

    const core = new Mesh(
      new SphereGeometry(1.58, 48, 32),
      new MeshBasicMaterial({
        color: 0x07111f,
        transparent: true,
        opacity: 0.38,
      }),
    );
    globe.add(core);

    const cities = [
      [-22.9, -43.2],
      [37.8, -122.4],
      [40.7, -74.0],
      [51.5, -0.1],
      [48.8, 2.3],
      [1.3, 103.8],
      [35.6, 139.7],
      [-33.8, 151.2],
      [52.5, 13.4],
      [19.4, -99.1],
    ];

    const pointMaterial = new MeshBasicMaterial({
      color: 0x60c6ff,
      transparent: true,
      opacity: 0.92,
    });

    cities.forEach(([lat, lng]) => {
      const point = new Mesh(new SphereGeometry(0.024, 12, 12), pointMaterial);
      point.position.copy(latLngToVector(lat, lng, 1.78));
      globe.add(point);
    });

    const lineMaterial = new LineBasicMaterial({
      color: 0x2f7cff,
      transparent: true,
      opacity: 0.48,
    });

    for (let index = 0; index < cities.length; index += 1) {
      const from = cities[index];
      const to = cities[(index + 3) % cities.length];
      const start = latLngToVector(from[0], from[1], 1.79);
      const end = latLngToVector(to[0], to[1], 1.79);
      const middle = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.25);
      const curve = new QuadraticBezierCurve3(start, middle, end);
      const geometry = new BufferGeometry().setFromPoints(curve.getPoints(36));
      globe.add(new Line(geometry, lineMaterial));
    }

    const aura = new Mesh(
      new SphereGeometry(1.92, 48, 32),
      new MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.04,
        side: BackSide,
      }),
    );
    globe.add(aura);

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const size = Math.max(240, Math.min(rect.width, rect.height || rect.width));
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    let raf = 0;
    const animate = () => {
      globe.rotation.y += 0.0026;
      globe.rotation.x = Math.sin(performance.now() * 0.0003) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      renderer.dispose();
      shell.geometry.dispose();
      core.geometry.dispose();
      aura.geometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="digital-globe" aria-hidden="true" />;
}
