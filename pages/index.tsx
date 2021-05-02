import Head from "next/head";
import dynamic from "next/dynamic";

export default function Home() {
  // Use client side rendering to avoid server-side mismatch
  const HeroBlueCircle = dynamic(
    () => import("../components/home/HeroBlueCircle"),
    { ssr: false }
  );
  const TelehistoryDefinition = dynamic(
    () => import("../components/home/TelehistoryDefinition"),
    { ssr: false }
  );
  const HomeGraphs = dynamic(() => import("../components/home/HomeGraphs"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>Telehistory V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Hero Blue Ellipse */}
      <div className="relative">
        <HeroBlueCircle />

        {/* Hero Navbar */}
        <div className="flex items-center justify-between fixed w-full p-4 z-10">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <div className="title-heavy text-white">Telehistory V2</div>
          </div>
        </div>
      </div>

      {/* Telehistory Definition */}
      <div className="flex-col md:flex">
        <TelehistoryDefinition />
        <HomeGraphs />
      </div>
    </>
  );
}
