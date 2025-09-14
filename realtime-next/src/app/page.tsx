import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/dashboard/add");
  return null;
}
