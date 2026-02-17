import { getUser } from './services/user.js';
import { getRepos } from './services/repository.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

document.querySelector('#btn-search').addEventListener('click', () => {
    const userName = document.querySelector('#input-search').value;
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
});

document.querySelector('#input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = e.key === 'Enter';

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return;
        getUserData(userName);
    }
});

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName);
    const reposResponse = await getRepos(userName);

    if (userResponse.message === "Not Found") {
        screen.notFoundUser();
        return;
    }

    user.setInfo(userResponse);
    user.setRepositories(reposResponse);

    screen.renderUser(user);
}