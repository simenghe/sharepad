// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

type Data = {
  name: string;
};
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

// Start the connection here.
(async () => {
  await client.connect();
  console.log("REDIS client connected.");
})();

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  if (!req.query || !req.query.id) {
    return res.status(400).json({ err: "No id for a room" });
  }
  const id = req.query.id.toString();
  const queryResult = await client.GET(id);

  if (queryResult) {
    const errMsg = `Room ${id} already exists!`;
    console.log(errMsg);
    return res.status(206).json({ msg: errMsg });
  }

  const set = await client.SETEX(id, 60, "occupied");

  console.log(queryResult);
  return res.status(200).json({ name: "cane" });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      case "GET": {
        return handleGet(req, res);
      }
      case "POST": {
        return res.status(200).json({ name: "JSON" });
      }
      default: {
        return res.status(405);
      }
    }
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ name: "error: " + err });
  }
}
