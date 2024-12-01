import { LandingPageNavbar } from "../components/navbar"; // Ensure the Nav component path is correct
import HomePage from "../components/about-page";

export default function Home() {
  return (
    <>
      <main className="bg-white w-full flex flex-col py-10 px-10 xl:px-0 light">
        {/* Navigation Bar */}
        <LandingPageNavbar />

        {/* Home Page Content */}
        <HomePage />
      </main>
    </>
  );
}
