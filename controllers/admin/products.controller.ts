import axios from "axios";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import Product from "../../models/products.model";
import Status from "../../models/status.model";
import { getProductCategoriesModel } from "../../models/product-categories.model";
import { getBranchModel } from "../../models/brands.model";
import streamUploadHelper from "../../helpers/streamUpload.helper";
import Assets from "../../models/assets.model";
import Attribute from "../../models/attributes.model";
import mongoose, { Mongoose } from "mongoose";

const create = async (req: Request, res: Response) => {
    const ProductCategories = await getProductCategoriesModel();
    const Branch = await getBranchModel();

    const status = await Status.findOne({}).select("product_categories branch");

    const categories = await ProductCategories.find({
        status: status.product_categories.ACTIVE.code,
        deleted: false,
    });

    const branchs = await Branch.find({
        status: status.branch.ACTIVE.code,
        deleted: false,
    });

    const attributes = await Attribute.find({});

    res.render("admin/pages/products/create.pug", {
        categories,
        branchs,
        attributes,
        PAGE_TITLE: res.locals.ADMIN_ROUTER.products.create.title,
        PAGE_DESCRIPTION: res.locals.ADMIN_ROUTER.products.create.description,
        PAGE_KEYWORD: res.locals.ADMIN_ROUTER.products.create.keyword,
    });
};

const createPost = async (req: Request, res: Response) => {
    // const ProductCategories = await getProductCategoriesModel();
    // const Branch = await getBranchModel();

    req.body.categories = [];
    req.body.brands = [];
    req.body.images = [];
    req.body.tier_variations = JSON.parse(req.body.array_tier_variations);
    let {
        images,
        name,
        slug,
        array_categories,
        categories,
        brands,
        array_brands,
        array_image_preview_id,
        array_tier_variations,
        tier_variations,
        atribute_1_status,
        atribute_1,
        featured,
        description_short,
        description_content,
        number_of_attributes,
        array_post_tags,
        array_seo_information,
    } = req.body;
    brands = JSON.parse(array_brands);
    req.body.post_tags = JSON.parse(array_post_tags);
    req.body.seo_information = JSON.parse(array_seo_information);

    const ProductCategories = await getProductCategoriesModel();
    const Brands = await getBranchModel();
    // Thêm mới Danh mục sản phẩm
    {
        for (const item of JSON.parse(array_categories)) {
            if (item.new) {
                const newDocument = new ProductCategories({
                    name: item.id,
                });
                await newDocument.save();
                categories.push(new ObjectId(newDocument.id));
            } else {
                categories.push(new ObjectId(item.id));
            }
        }
    }
    // Hết Thêm mới Danh mục sản phẩm

    // Thêm mới thương hiệu
    {
        for (const item of JSON.parse(array_brands)) {
            if (item.new) {
                const newDocument = new Brands({
                    name: item.id,
                });
                await newDocument.save();
                brands.push(new ObjectId(newDocument.id));
            } else {
                brands.push(new ObjectId(item.id));
            }
        }
    }
    // Hết Thêm mới thương hiệu

    array_image_preview_id = JSON.parse(array_image_preview_id);
    if (parseInt(number_of_attributes) == 0) {
        for (const item of array_image_preview_id) {
            const assets = await Assets.findOne({
                preview_id: item.preview_id,
            }).select("preview_id");
            images.push({
                assets_id: new ObjectId(assets.id),
                position: item.position,
                // attribute_id: new ObjectId(assets.id),
                // attribute_value_id: new ObjectId(assets.id),
            });
        }
    } else if (parseInt(number_of_attributes) == 1) {
        atribute_1_status = JSON.parse(atribute_1_status);

        if (atribute_1_status.new == true) {
            let data = {
                name: atribute_1_status.id,
                array_value: [],
            };
            const newAttribute = new Attribute(data);
            await newAttribute.save();
            req.body.atribute_1 = new ObjectId(newAttribute.id);

            for (const it of tier_variations) {
                if (it.atribute_value_1_status.new == true) {
                    const newElemId = new ObjectId();
                    await Attribute.updateOne(
                        {
                            _id: newAttribute.id,
                        },
                        {
                            $push: {
                                array_value: {
                                    _id: newElemId,
                                    value: it.atribute_value_1_status.id,
                                    description: it.atribute_value_1_status.id,
                                },
                            },
                        },
                    );
                    it["atribute_value_1"] = newElemId;
                    for (const preview_id of array_image_preview_id) {
                        if (
                            preview_id.attribute_value_id ==
                            it.atribute_value_1_status.id
                        ) {
                            const assets = await Assets.findOne({
                                preview_id: preview_id.preview_id,
                            });
                            images.push({
                                attribute_1_value: new ObjectId(
                                    it["atribute_value_1"],
                                ),
                                // newElemId,
                                attribute_1_id: new ObjectId(newAttribute.id),
                                // atribute_1_status.id,
                                position: preview_id.position,
                                assets_id: new ObjectId(assets.id),
                            });
                        }
                    }
                }
            }
        } else {
            // req.body.atribute_1 = new ObjectId(atribute_1_status.id);

            req.body.atribute_1 = new ObjectId(atribute_1_status.id);
            for (const it of tier_variations) {
                if (it.atribute_value_1_status.new == true) {
                    const newElemId = new ObjectId();
                    await Attribute.updateOne(
                        {
                            _id: req.body.atribute_1,
                        },
                        {
                            $push: {
                                array_value: {
                                    _id: newElemId,
                                    value: it.atribute_value_1_status.id,
                                    description: it.atribute_value_1_status.id,
                                },
                            },
                        },
                    );
                    it["atribute_value_1"] = newElemId;
                    for (const preview_id of array_image_preview_id) {
                        if (
                            preview_id.attribute_value_id ==
                            it.atribute_value_1_status.id
                        ) {
                            const assets = await Assets.findOne({
                                preview_id: preview_id.preview_id,
                            });
                            images.push({
                                attribute_1_value: new ObjectId(
                                    it["atribute_value_1"],
                                ),
                                // newElemId,
                                attribute_1_id: new ObjectId(
                                    atribute_1_status.id,
                                ),
                                // atribute_1_status.id,
                                position: preview_id.position,
                                assets_id: new ObjectId(assets.id),
                            });
                        }
                    }
                } else {
                    it["atribute_value_1"] = new ObjectId(
                        it.atribute_value_1_status.id,
                    );
                    // data_image["attribute_1_value"] = new ObjectId(); // sửa lại đáng lẽ là it.atribute_value_1_status.id
                    for (const preview_id of array_image_preview_id) {
                        if (
                            preview_id.attribute_value_id ==
                            it.atribute_value_1_status.id
                        ) {
                            const assets = await Assets.findOne({
                                preview_id: preview_id.preview_id,
                            });
                            images.push({
                                attribute_1_value: new ObjectId(
                                    it.atribute_value_1_status.id,
                                ),
                                // it.atribute_value_1_status.id,
                                attribute_1_id: new ObjectId(
                                    atribute_1_status.id,
                                ),
                                // atribute_1_status.id,
                                position: preview_id.position,
                                assets_id: new ObjectId(assets.id),
                            });
                        }
                    }
                }
            }
        }
    } else if (parseInt(number_of_attributes) == 2) {
        let atribute_1_status = JSON.parse(req.body.atribute_1_status);
        let atribute_2_status = JSON.parse(req.body.atribute_2_status);

        if (atribute_1_status.new == true) {
            const new_attribute = new Attribute({
                name: atribute_1_status.id,
            });
            await new_attribute.save();
            req.body.atribute_1 = new ObjectId(new_attribute.id);
        } else {
            req.body.atribute_1 = new ObjectId(atribute_1_status.id);
        }
        if (atribute_2_status.new == true) {
            const new_attribute = new Attribute({
                name: atribute_2_status.id,
            });
            await new_attribute.save();
            req.body.atribute_2 = new ObjectId(new_attribute.id);
        } else {
            req.body.atribute_2 = new ObjectId(atribute_2_status.id);
        }
        let index = 0;
        var value_attribute_1: any;
        for (const it of tier_variations) {
            if (it.atribute_value_1_status.new) {
                if (
                    index %
                        parseInt(req.body["number_of_attribute_values_2"]) ==
                    0
                ) {
                    value_attribute_1 = new ObjectId();
                    await Attribute.updateOne(
                        {
                            _id: req.body.atribute_1,
                        },
                        {
                            $push: {
                                array_value: {
                                    _id: value_attribute_1,
                                    value: it.atribute_value_1_status.id,
                                    description: it.atribute_value_1_status.id,
                                },
                            },
                        },
                    );
                    it.atribute_value_1_status.new_id = value_attribute_1;
                }
            } else {
                value_attribute_1 = new ObjectId(it.atribute_value_1_status.id);
            }
            var value_attribute_2: any;
            if (it.atribute_value_2_status.new) {
                if (
                    index < parseInt(req.body["number_of_attribute_values_2"])
                ) {
                    let new_id = new ObjectId();
                    it.atribute_value_2_status.new_id = new_id;
                    await Attribute.updateOne(
                        {
                            _id: req.body.atribute_2,
                        },
                        {
                            $push: {
                                array_value: {
                                    _id: new_id,
                                    value: it.atribute_value_2_status.id,
                                    description: it.atribute_value_2_status.id,
                                },
                            },
                        },
                    );
                    value_attribute_2 = new_id;
                } else {
                    value_attribute_2 =
                        tier_variations[
                            index %
                                parseInt(
                                    req.body["number_of_attribute_values_2"],
                                )
                        ].atribute_value_2_status.new_id;
                }
            } else
                value_attribute_2 = new ObjectId(it.atribute_value_2_status.id);
            it["atribute_value_1"] = value_attribute_1;
            it["atribute_value_2"] = value_attribute_2;

            index++;
        }
    }
    // tier_variations = [...array_tier_variations];

    // Ảnh
    if (parseInt(number_of_attributes) == 2) {
        for (const preview_id of array_image_preview_id) {
            // console.log(preview_id);
            const assets = await Assets.findOne({
                preview_id: preview_id.preview_id,
            });
            const intem = req.body.tier_variations.find(
                (it: any) =>
                    it.atribute_value_1_status.id ===
                    preview_id.attribute_value_id,
            );
            let data = {
                attribute_1_id: req.body.atribute_1,
                position: preview_id.position,
                assets_id: new ObjectId(assets.id),
            };
            if (intem.atribute_value_1_status.new) {
                data["attribute_1_value"] =
                    intem.atribute_value_1_status.new_id;
            } else {
                data["attribute_1_value"] = intem.atribute_value_1_status.id;
            }
            images.push(data);
        }
    }

    // Hết Ảnh

    await Product.create(req.body);

    res.status(201).json({
        success: true,
    });
};

export const productsController = {
    create,
    createPost,
};
