const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Product = require("../models/product");
const upload = require("../services/file.service");
const response = require("../services/response.service");
const fs = require("fs");
let path = require("path");
const { log } = require("console");

// ürünleri listeleme
router.get("/getall", async (req, res) => {
  response(res, async () => {
    const products = Product.find().sort({ name: 1 });
    res.json(products);
  });
});

// ürün ekleme
router.post("/add", upload.array("images"), async (req, res) => {
  try {
    const product = new Product({
      _id: uuidv4(),
      name: req.body.name.trim().toUpperCase(),
      imageUrls: req.files[0].filename,
      stock: req.body.stock,
      price: req.body.price,
      isActive: req.body.isActive,
      categories: req.body.categories,
      createdDate: Date.now(),
    });
    const newProduct = await product.save();
    res.status(201).json({ message: "Ürün Eklendi", newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ürün silme
router.post("/delete", async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await Product.findById({ _id: _id });
    await Product.findByIdAndDelete({ _id: _id });

    filePath = path.join(__dirname, "..", "uploads");
    for (const image of product.imageUrls) {
      path = filePath + "/" + image;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path, (err) => {});
      }
    }    
    res.status(201).json({ message: "Ürün Silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Ürün Listesi Getir
router.post("/", async (req, res) => {
  response(res, async () => {
    const { pageNumber, pageSize, search } = req.body;
    let productCount = await Product.find({
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
      ],
    }).count();

    let products = await Product.find({
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
      ],
    })
      .sort({ name: 1 })
      .populate("categories")
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    let totalPageCount = Math.ceil(productCount / pageSize);
    let model = {
      datas: products,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalPageCount: totalPageCount,
      isFirstPage: pageNumber == 1 ? true : false,
      isLastPage: totalPageCount == pageNumber ? true : false,
    };
    res.status(201).json(model);
  });
});

//Ürünün Aktif/Pasif Durumunu Değiştir
router.post("/changeStatus", async (req, res) => {
  try {
    const { _id } = req.body;
    let product = await Product.findById(_id);
    product.isActive = !product.isActive;
    await Product.findByIdAndUpdate(_id, product);
    res.status(201).json({ message: "Ürünün durumu başarıyla değiştirildi" });
    //res.json({ message: "Ürünün durumu başarıyla değiştirildi!" });    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Ürünü Id'ye Göre Getir
router.post("/getById", async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    let product = await Product.findById(_id);
    res.json(product);
  });
});

//Ürünü Güncelleme
router.post("/update", upload.array("images"), async (req, res) => {
  response(res, async () => {
    const { _id, name, stock, price, categories } = req.body;

    let product = await Product.findById(_id);
    // for(const image of product.imageUrls){
    //     fs.unlink(image.path, ()=> {});
    // }

    let imageUrls;
    imageUrls = [...product.imageUrls, ...req.files];
    product = {
      name: name.toUpperCase(),
      stock: stock,
      price: price,
      imageUrls: imageUrls,
      categories: categories
    };
    await Product.findByIdAndUpdate(_id, product);
    res.json({ message: "Ürün kaydı başarıyla güncellendi!" });
  });
});

//Ürün Resmi Sil
router.post("/removeImageByProductIdAndIndex", async (req, res) => {
  response(res, async () => {
    const { _id, index } = req.body;
    let product = await Product.findById(_id);
    if (product.imageUrls.length == 1) {
      res.status(500).json({
        message:
          "Son ürün resmini silemezsiniz! En az 1 ürün resmi bulunmak zorundadır!",
      });
    } else {
      let image = product.imageUrls[index];
      product.imageUrls.splice(index, 1);
      await Product.findByIdAndUpdate(_id, product);
      fs.unlink(image.path, () => {});
      res.json({ message: "Resim başarıyla kaldırıldı!" });
    }
  });
});

//Ana sayfa için ürün listesini getir
router.post("/getAllForHomePage", async (req, res) => {
  response(res, async () => {
    const { pageNumber, pageSize, search, categoryId, priceFilter } = req.body;
    let products;
    if (priceFilter == "0") {
      products = await Product.find({
        isActive: true,
        categories: { $regex: categoryId, $options: "i" },
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
        ],
      })
        .sort({ name: 1 })
        .populate("categories");
    } else {
      products = await Product.find({
        isActive: true,
        categories: { $regex: categoryId, $options: "i" },
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
        ],
      })
        .sort({ price: priceFilter })
        .populate("categories");
    }
    res.json(products);
  });
});

module.exports = router;
