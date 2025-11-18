const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { title, content, status, categoryId } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      status: status || "draft",
      authorId: req.user.id,
      categoryId: categoryId ? Number(categoryId) : null
    }
  });

  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    include: { author: true, category: true }
  });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: true, category: true }
  });
  res.json(post);
});

router.put("/:id", auth, async (req, res) => {
  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(post);
});

router.delete("/:id", auth, async (req, res) => {
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

module.exports = router;
