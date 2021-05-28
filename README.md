## Welcome to Telehistory V2.1!
1 year ago, I started learning React.js, and Telehistory was my first ever personal project made with just React and ChartJS. One year later, I decided to do a quick remake and restyle using some new tech and features: Next.js, TypeScript, Tailwind CSS, Nivo Graphs, and the Parallel Dots API.

<img width="1435" alt="Screen Shot 2021-05-21 at 1 20 38 AM" src="https://user-images.githubusercontent.com/62365251/119093018-c7ba1b00-b9d4-11eb-8b1d-3a7f3a9566c5.png">


## Getting Started

First, run the development server:

```bash
yarn dev
```

Create an `.env` file and add this:
```
PARALLEL_DOTS_API_KEY=<your api key>
ENV=<PROD or DEV>
```

Setting ENV to `PROD` will use the Parallel Dots to fetch live data. `DEV` will use the data located in `/mockData`.

Add in your own Telegram chat history data! Just export the chat as JSON and move it into `/mockData` and replace `result.json` with it. (It should also be named `result.json`)

Have fun exploring!

## Screenshots:
<img width="1435" alt="Screen Shot 2021-05-21 at 1 21 05 AM" src="https://user-images.githubusercontent.com/62365251/119093032-cdaffc00-b9d4-11eb-8318-6244c6f2e8fb.png">
<img width="1435" alt="Screen Shot 2021-05-21 at 1 21 27 AM" src="https://user-images.githubusercontent.com/62365251/119093041-d0aaec80-b9d4-11eb-9daf-dab5d020e63d.png">
