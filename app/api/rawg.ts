import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = "48f28e1f743841cead5122123c468993";
  const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2019-09-01,2019-09-30&platforms=18,1,7`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}