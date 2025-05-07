import { Request, Response } from "express";
import Attribute from "../../models/attributes.model";

const list = async (req: Request, res: Response) => {
     const { select } = req.query;
          const attributes = await Attribute.find({}).select(select as string);
    res.json({
        attributes,
    });
};

const detail = async (req: Request, res: Response) => {
    const { select_id } = req.params;
    const attributes = await Attribute.findOne({
        _id: select_id,
    })
    res.json({
        attributes,
    });
};

export const productsController = {
    list,
    detail,
};
