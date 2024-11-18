const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Get all posts with search and pagination
exports.getAllPosts = async (req, res) => {
  const { search, page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  
  const where = search
    ? { title: { contains: search, mode: 'insensitive' }, deleted: false }
    : { deleted: false };

  const posts = await prisma.post.findMany({
    where,
    skip: parseInt(skip),
    take: parseInt(limit),
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.post.count({ where });

  res.json({ posts, total });
};

exports.createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  const post = await prisma.post.create({
    data: { title, content, userId: parseInt(userId) }
  });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Post deleted' });
};

// Edit post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedPost = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content }
  });
  res.json(updatedPost);
};

// Soft delete post
exports.softDeletePost = async (req, res) => {
  const { id } = req.params;
  await prisma.post.update({
    where: { id: parseInt(id) },
    data: { deleted: true }
  });
  res.json({ message: 'Post deleted successfully' });
};