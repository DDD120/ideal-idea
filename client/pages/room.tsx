import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();
  return (
    <div>
      <h1>ROOM</h1>
      <p>{router.query.c}</p>
    </div>
  );
}
