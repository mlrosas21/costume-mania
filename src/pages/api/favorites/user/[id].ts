import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    console.log(id)
    const url = `${process.env.PRODUCT_API_URL}/fav/user/${id}`;
    console.log(url)
    const response = await fetch(url);
    console.log(response)
    let data;
    if (response.ok) {
      data = await response.json();
    } else {
      data = [];
    }

    console.log(data)

    return res.status(200).json(data);
  } else if (req.method === "POST") {
    return res.status(200).json("asda");
  } else {
    return res.status(400).json({ message: "Método no permitido" });
  }
}
