import { Float, Text3D } from "@react-three/drei";
import maplestory from "@/public/Maplestory_Bold.json";
import { Vector3 } from "@react-three/fiber";

interface Props {
  position: Vector3 | undefined;
  children: React.ReactNode;
}

function FloatChar({ position, children }: Props) {
  return (
    <Float position={position}>
      <Text3D font={maplestory as string}>
        {children}
        <meshPhysicalMaterial />
      </Text3D>
    </Float>
  );
}

export default function FloatText3D() {
  return (
    <>
      <FloatChar position={[-4, 0, 0]}>i</FloatChar>
      <FloatChar position={[-3.5, 0, 0]}>d</FloatChar>
      <FloatChar position={[-2.5, 0, 0]}>e</FloatChar>
      <FloatChar position={[-1.5, 0, 0]}>a</FloatChar>
      <FloatChar position={[-0.5, 0, 0]}>l</FloatChar>
      <FloatChar position={[1, 0, 0]}>i</FloatChar>
      <FloatChar position={[1.5, 0, 0]}>d</FloatChar>
      <FloatChar position={[2.5, 0, 0]}>e</FloatChar>
      <FloatChar position={[3.5, 0, 0]}>a</FloatChar>
    </>
  );
}
