import { v2 as cloudinary } from "cloudinary";
import sanPhamModel from "../models/sanPhamModel.js";

const themSanPham = async (req, res) => {
    try {
        console.log("Received request:", req.body);
        const { ten, moTa1, moTa2, gia, phanLoai, bestseller } = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({ success: false, message: "Vui lòng upload hình ảnh" });
        }
        console.log("Image received:", image);

        let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
        const imageUrl = result.secure_url;
        console.log("Cloudinary image URL:", imageUrl);

        const productData = {
            ten,
            moTa1,
            moTa2,
            phanLoai,
            gia: Number(gia),
            bestseller: bestseller === "true" ? true : false,
            image: [imageUrl],
            date: Date.now()
        };

        const product = new sanPhamModel(productData);
        await product.save();

        res.json({ success: true, message: "Đã thêm sản phẩm" });
    } catch (error) {
        console.log("Error:", error);
        res.json({ success: false, message: error.message });
    }
};


const listSanPham = async (req, res) => {
    try {
        const products = await sanPhamModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const xoaSanPham = async (req, res) => {
    try {
        await sanPhamModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Đã xoá sản phẩm" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const sanPham = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await sanPhamModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateSanPham = async (req, res) => {
    try {
        console.log("Body nhận được:", req.body);
        console.log("File nhận được:", req.file);
        const { _id, ten, moTa1, moTa2, gia, phanLoai, bestseller, existingImages } = req.body;



        // Check if product exists
        const product = await sanPhamModel.findById(_id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Prepare update data
        const updateSanPham = {
            ten,
            moTa1,
            moTa2,
            phanLoai,
            gia: Number(gia),
            bestseller: bestseller === "true" ? true : false,
        };

        // Handle images
        let imagesUrl = JSON.parse(existingImages);

        // Process new images if any
        if (req.files) {
            const newImages = await Promise.all(
                req.files.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );

            // Combine existing and new images
            imagesUrl = [...imagesUrl, ...newImages];
        }

        updateSanPham.image = imagesUrl;

        // Update the product
        await sanPhamModel.findByIdAndUpdate(_id, updateSanPham);

        res.json({ success: true, message: "Product Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        console.log('Request method:', req.method);  // Kiểm tra method
        console.log('Request URL:', req.originalUrl);  // Kiểm tra URL
        console.log('Request body:', req.body);
    }
};


export { listSanPham, themSanPham, xoaSanPham, sanPham, updateSanPham }