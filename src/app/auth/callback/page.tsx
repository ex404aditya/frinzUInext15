import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CallbackPage = async ({
  searchParams,
}: {
  searchParams: { topic?: string };
}) => {
  const user = await currentUser(); // Server-side method to get current user
  const topic = await searchParams?.topic; // Await the searchParams object

  if (user) {
    return redirect(topic ? `/dashboard?topic=${topic}` : "/dashboard");
  } else {
    return redirect("/auth/sign-in");
  }
};

export default CallbackPage;
