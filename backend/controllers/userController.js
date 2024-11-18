const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // First, delete related posts
    await prisma.post.deleteMany({
      where: {
        userId: parseInt(id),
      },
    });

    // Then delete the user
    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'User and related posts deleted successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
