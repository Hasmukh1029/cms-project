const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

router.post("/", auth, async (req, res) => {
  const cat = await prisma.category.create({
    data: { name: req.body.name }
  });
  res.json(cat);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Cannot delete category (maybe in use?)" });
  }
});


module.exports = router;
