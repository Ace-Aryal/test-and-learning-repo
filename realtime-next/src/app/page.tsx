import { redis } from "../../lib/db";

export default async function Home() {
  // await redis.set("greeting", "Hello Dipesh");
  return <div className="text-xl">Working with tailwind</div>;
}
