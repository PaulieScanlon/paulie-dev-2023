import type { APIRoute } from "astro";

// NOTE: this used to go through the `octokit` umbrella package, but that eagerly
// loads `@octokit/auth-app` -> `jsonwebtoken` -> `buffer-equal-constant-time`,
// which throws at import time on Node 24+ (the `SlowBuffer` it reads was removed
// from Node). We only need a PAT request for public events, so a plain fetch
// avoids the whole broken chain and works in both Node (dev) and edge (prod).

export const GET: APIRoute = async () => {
  try {
    const token = import.meta.env.OCTOKIT_PERSONAL_ACCESS_TOKEN;

    const response = await fetch("https://api.github.com/users/PaulieScanlon/events/public?per_page=20", {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "paulie.dev",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
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
