import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Renderiza el formulario de creación
    async renderCreateForm(req, res) {
        try {
            // Buscamos usuarios para simular la asignación del autor en el formulario
            const users = await userRepository.findAll();
            res.render("create-post", { users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { userId } = req.body; // Tomado del select del formulario
            await postService.createPost(userId, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(`Error al crear post: ${error.message}`);
        }
    }

    // Renderiza el formulario de edición
    async renderEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.render("edit-post", { post });
        } catch (error) {
            res.status(404).send("Post no encontrado");
        }
    }

    async update(req, res) {
        try {
            await postService.updatePost(req.params.id, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(`Error al actualizar: ${error.message}`);
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(`Error al eliminar: ${error.message}`);
        }
    }
}

export default new PostController();