import Head from "next/head";

export default function Home() {
  // const keywordsRoute = (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   let text = "";
  //   for (const message of messagesSelected) {
  //     if (typeof message.text === "string") {
  //       text += `${message.text}.`;
  //     }
  //   }

  //   axios
  //     .post("/api/keyword", {
  //       text: text,
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="px-32 py-16">
      <Head>
        <title>Telehistory V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-3xl">Telehistory V2</div>
    </div>
  );
}
