import Post from "../models/Post.js";

class PostRepository {
    async create(post) {
        return await Post.create(post);
    }

    async findAll() {
        return await Post.find().populate("user");
    }

    async findById(id) {
        return await Post.findById(id).populate("user");
    }

    async findByUser(userId) {
        return await Post.find({ user: userId }).populate("user");
    }

    async update(postId, postData) {
        // Añadimos la fecha de actualización automática al editar
        postData.updatedAt = Date.now();
        return await Post.findByIdAndUpdate(postId, postData, { new: true, runValidators: true });
    }

    async delete(postId) {
        return await Post.findByIdAndDelete(postId);
    }
}

export default new PostRepository();