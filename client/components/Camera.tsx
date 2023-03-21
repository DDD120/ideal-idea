import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Camera() {
  const {
    viewport: { aspect },
  } = useThree();

  return (
    <PerspectiveCamera
      makeDefault
      manual
      position={[0, 0, 10]}
      aspect={aspect}
      fov={aspect < 1 ? 80 : 50}
      onUpdate={(c) => c.updateProjectionMatrix()}
    />
  );
}
