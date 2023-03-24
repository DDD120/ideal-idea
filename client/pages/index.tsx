import { useRouter } from "next/router";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import Camera from "@/components/main/Camera";
import FloatText3D from "@/components/main/FloatText3D";
import { v4 as uuid } from "uuid";

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push(
      {
        pathname: "/room",
        query: { c: uuid() },
      },
      "/room"
    );
  };
  return (
    <main className="w-screen h-screen">
      <Canvas>
        <Camera />
        <Stars radius={100} count={500} fade={true} />
        <OrbitControls maxDistance={15} enableDamping={true} />
        <hemisphereLight groundColor="#ff4e8c" color="#34319c" />
        <ambientLight color="#ff4e8c" intensity={0.1} />
        <FloatText3D />
        <Html position={[0, -1, 0]} transform>
          <button onClick={handleStartClick}>시작하기</button>
        </Html>
      </Canvas>
    </main>
  );
}
