const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
  const checkName = await Category.findOne({ name: req.body.name });
  if (checkName != null) {
    try {
      const name = req.body.name;
      const category = new Category({ _id: uuidv4(), name: name });
      await category.save();
      res.status(201).json({ message: "Kayıt Başarılı" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "Bu isimde kategori zaten var!!!" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { id, name } = req.body;
    const category = await Category.findById({ _id: id });
    if (category == null) {
      res.status(404).json({ message: "Kategori Bulunamadı!!!" });
    } else {
      if (category.name == name) {
        res.status(403).json({ message: "Bu isimde kategori zaten var!!!" });
        const checkName = await Category.findOne({ name: name });
        if (checkName != null) {
          category.name = name;
          await category.save();
          res.json({ message: "Kategori Güncellendi" });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      res.status(404).json({ message: "Kategori Bulunamadı!!!" });
    } else {
      await category.remove();
      res.json({ message: "Kategori Silindi" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
