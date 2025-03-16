import http from "https";
const options = {
  method: "POST",
  hostname:
    "live-casino-slots-evolution-jili-and-50-plus-provider.p.rapidapi.com",
  port: null,
  path: "/casino/get-game-url",
  headers: {
    "x-rapidapi-key": "3f86a2f8acmsh8e2976200fdf90bp1ff572jsn11fd141b701c",
    "x-rapidapi-host":
      "live-casino-slots-evolution-jili-and-50-plus-provider.p.rapidapi.com",
    "Content-Type": "application/json",
    "x-igtechcasino-apikey": "677126d265bb35832e54e6d3",
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(
  JSON.stringify({
    userId: "igtechgamingdemo",
    gameId: "13b2c803a7b8055fa64b5c00fbe26e38",
    lang: "en",
    money: 0,
    home_url: "https://igtechgaming.com/",
    platform: 1,
  }),
);
req.end();
