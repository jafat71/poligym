import { SocialPost } from "@/types/interfaces/entities/post";
import { mapApiPostToPost } from "@/types/mappers";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.EXPO_PUBLIC_POSTS_DATABASE_URL}`);

// Crear un nuevo post
export async function createPostInDatabase(post: SocialPost) {
    try {
        const response = await sql`
      INSERT INTO posts (
        dificultad, duracion, fecha, imagen_comentario, mensaje, oculto, publico, rutina, user_id, likes
      ) VALUES (
        ${post.dificultad}, ${post.duracion}, ${post.fecha}, ${post.imagen_comentario}, 
        ${post.mensaje}, ${post.oculto}, ${post.publico}, ${post.rutina}, ${post.user_id}, 0
      )
      RETURNING *;
    `;
        return { data: response, status: 201 };
    } catch (error) {
        console.error("Error creating post:", error);
        return { error: "Error creating post", status: 500 };
    }
}

// Leer todos los posts
export async function getAllPostsFromDatabase() {
    try {
        const posts = await sql`SELECT * FROM posts ORDER BY fecha DESC;`;
        return { data: posts, status: 200 };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { error: "Error fetching posts", status: 500 };
    }
}

export async function getAllPostFromUser(userId: string) {
    try {
        const posts = await sql`SELECT * FROM posts WHERE user_id = ${userId};`;
        return { data: posts, status: 200 };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { error: "Error fetching posts", status: 500 };
    }
}   

// Actualizar likes o estado de un post
export async function updatePostInDatabase(
    postId: number,
    updates: { likes?: number; oculto?: boolean; publico?: boolean }
) {
    try {
        const response = await sql`
      UPDATE posts
      SET 
        likes = COALESCE(${updates.likes}, likes),
        oculto = COALESCE(${updates.oculto}, oculto),
        publico = COALESCE(${updates.publico}, publico)
      WHERE id = ${postId}
      RETURNING *;
    `;
        if (response.length === 0) {
            return { error: "Post not found", status: 404 };
        }
        return { data: response[0], status: 200 };
    } catch (error) {
        console.error("Error updating post:", error);
        return { error: "Error updating post", status: 500 };
    }
}
