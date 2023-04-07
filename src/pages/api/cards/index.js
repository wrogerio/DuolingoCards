import { GetAll, SaveItem } from "@/controllers/CardController";

export default async (req, res) => {
  const { method } = req;
  const { unityid } = req.headers;

  switch (method) {
    case "GET":
      const resultGetAll = await GetAll(unityid);
      res.status(200).json(resultGetAll);
      break;
    case "POST":
      const resultPost = await SaveItem(req.body);
      res.status(200).json(resultPost);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};