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

export async function getPostById(postId: number) {
    try {
        const post = await sql`SELECT * FROM posts WHERE id = ${postId};`;
        return { data: post, status: 200 };
    } catch (error) {
        console.error("Error fetching post:", error);
        return { error: "Error fetching post", status: 500 };
    }
}

// Actualizar likes o estado de un post
export async function updateLikesPostInDatabase(
    postId: number,
    userId: string
) {
    try {
        const userJson = JSON.stringify(userId); 
        console.log("userJson", userJson)   
        const response = await sql`
      UPDATE posts
      SET 
        likes = CASE
          WHEN liked_by @> ${userJson}::jsonb THEN likes - 1
          ELSE likes + 1
        END,
        liked_by = CASE
          WHEN COALESCE(liked_by, '[]'::jsonb) @> ${userJson}::jsonb THEN (
            SELECT COALESCE(jsonb_agg(value), '[]'::jsonb)
            FROM jsonb_array_elements_text(COALESCE(liked_by, '[]'::jsonb)) AS value
            WHERE value != ${userId}
          )
          ELSE COALESCE(liked_by, '[]'::jsonb) || ${userJson}::jsonb
        END
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



export async function updatePublicVisibilityPostInDatabase(
    postId: number,
    visibility: boolean
) {
    try {
        const response = await sql`
            UPDATE posts SET publico = ${visibility} WHERE id = ${postId} RETURNING *;
        `;
        return { data: response[0], status: 200 };
    } catch (error) {
        console.error("Error updating post:", error);
        return { error: "Error updating post", status: 500 };
    }
}
