import type { APIRoute } from "astro";
import { octokit } from "../../clients/octokit";

export const GET: APIRoute = async () => {
  try {
    const response = await octokit.request("GET /users/{username}/events/public", {
      username: "PaulieScanlon",
      per_page: 20
    });

    if (response.status !== 200) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300" // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("GitHub API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch GitHub events",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

export const config = {
  runtime: "edge"
};
