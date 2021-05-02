import Head from "next/head";
import dynamic from "next/dynamic";
import HeroNavbar from "../components/home/HeroNavbar";

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
      <div className="relative">
        <HeroBlueCircle />
        <HeroNavbar />
      </div>
      <div className="flex-col md:flex">
        <TelehistoryDefinition />
        <HomeGraphs />
      </div>
    </>
  );
}
