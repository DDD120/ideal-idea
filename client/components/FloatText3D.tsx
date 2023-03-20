import { Float, Text3D } from "@react-three/drei";
import maplestory from "@/assets/Maplestory_Bold.json";
import { Vector3 } from "@react-three/fiber";

interface Props {
  position: Vector3 | undefined;
  children: React.ReactNode;
}

export default function FloatText3D({ position, children }: Props) {
  return (
    <Float position={position}>
      <Text3D font={maplestory as string}>
        {children}
        <meshPhysicalMaterial />
      </Text3D>
    </Float>
  );
}
