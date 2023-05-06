'use client';

import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

export default function CylinderScene() {
  return (
    <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 20] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cylinder />
    </Canvas>
  );
}

function Cylinder(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(
    (state, delta) => (
      (mesh.current.rotation.x += delta), (mesh.current.rotation.z += 2 * delta)
    )
  );
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <cylinderGeometry args={[1, 1, 5, 32]} />
      <meshStandardMaterial color={hovered || active ? '#d4a373' : '#ccd5ae'} />
    </mesh>
  );
}
