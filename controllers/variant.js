const Variant = require("../models/variant");

const createVariant = async (req, res, next) => {
    try {
        const newVariant = new Variant(req.body);
        const result = await newVariant.save();
        if (result) {
            return res.status(200).json({
                success: true,
                message: "Variant Created",
                data: {
                    variant: result
                },
                error: null
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Failed to create variant",
                data: null,
                error: null
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createVariant,
}