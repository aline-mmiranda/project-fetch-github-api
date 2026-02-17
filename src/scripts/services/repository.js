import { baseUrl, repositoriesQuantity } from '../variables.js';

async function getRepos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}&sort=updated&order=desc`);
    return await response.json();
}

export { getRepos };