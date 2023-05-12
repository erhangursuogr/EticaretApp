const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Category = require("../models/category");
const response = require("../services/response.service");

// kategorileri listeleme
router.get("/getall", async (req, res) => {
  response(res, async () => {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  });
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      res.status(404).json({ message: "Kategori Bulunamadı!!!" });
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  response(res, async () => {
    const { name } = req.body;
    const checkName = await Category.findOne({ name: name });
    if (checkName == null) {
      const category = new Category({
        _id: uuidv4(),
        name: name.trim().toUpperCase(),
      });
      await category.save();
      res.status(201).json({ message: "Kayıt Başarılı" });
    } else {
      res.status(400).json({ message: "Bu isimde kategori zaten var!!!" });
    }
  });
});

router.post("/update", async (req, res) => {
  response(res, async () => {
    const { _id, name } = req.body;
    const category = await Category.findById({ _id: _id });
    if (category.name != name) {
      const checkName = await Category.findOne({ name: name });
      if (checkName != null) {
        res.status(400).json({ message: "Bu isimde kategori zaten var!!!" });
      } else {
        category.name = name;
        await category.save();
        res.json({ message: "Kategori Güncellendi" });
      }
    } else {
      res.status(400).json({ message: "Bu isimde kategori zaten var!!!" });
    }
  });
});

router.post("/delete", async (req, res) => {
  response(res, async () => {
    await Category.findByIdAndRemove(req.body._id);
    res.json({ message: "Kategori kaydı başarıyla silindi!" });
  });
});

module.exports = router;
