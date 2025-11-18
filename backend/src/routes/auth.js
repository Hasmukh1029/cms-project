const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) return res.status(400).json({ error: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashed }
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
