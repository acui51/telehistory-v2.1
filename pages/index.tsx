import Head from "next/head";
import axios from "axios";
import transformData from "../helpers/lineGraph/transformData";
import DATA from "../mockData/result.json";
import { LineChart } from "../components";

const Card = () => {
  return <div className="w-3/6 h-96 rounded-md border-4">Card One</div>;
};

export default function Home() {
  const testRoute = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .get("/api/sentiment")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-32 py-16">
      <Head>
        <title>Telehistory V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-3xl">Telehistory V2</div>
      {/* <div className="flex flex-wrap justify-center items-center">
        <Card /> <Card /> <Card /> <Card />
      </div> */}
      <button onClick={(e) => testRoute(e)}>Sentiment</button>
      <div className="h-72">
        <LineChart data={transformData(DATA)} />
      </div>
    </div>
  );
}
