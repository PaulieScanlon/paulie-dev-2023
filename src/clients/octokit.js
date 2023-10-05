// https://github.com/octokit/octokit.js/#readme
import { Octokit } from 'octokit';

export const octokit = new Octokit({ auth: import.meta.env.OCTOKIT_PERSONAL_ACCESS_TOKEN });
