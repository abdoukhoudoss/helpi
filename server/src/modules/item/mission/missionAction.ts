import type { RequestHandler } from "express";
import { missions } from "../../../../data";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json(missions);
  } catch (err) {
    next(err);
  }
};

export default { browse };
