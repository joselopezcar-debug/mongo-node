import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");
        
        // Procesar hashtags si vienen separados por comas
        if (postData.hashtags && typeof postData.hashtags === 'string') {
            postData.hashtags = postData.hashtags.split(',').map(h => h.trim());
        }
        
        return await postRepository.create({ ...postData, user: user._id });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostById(id) {
        return await postRepository.findById(id);
    }

    async updatePost(postId, postData) {
        if (postData.hashtags && typeof postData.hashtags === 'string') {
            postData.hashtags = postData.hashtags.split(',').map(h => h.trim());
        }
        return await postRepository.update(postId, postData);
    }

    async deletePost(postId) {
        return await postRepository.delete(postId);
    }
}

export default new PostService();