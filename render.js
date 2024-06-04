document.getElementById('addUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const result = await window.api.addUser(name, email);
        if (result.success) {
            console.log('Utilisateur ajouté avec succès, ID:', result.userId);
            clearForm();
        } else {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', result.message);
        }
    } catch (error) {
        console.error('Erreur lors de l\'appel IPC:', error);
    }
});

document.getElementById('getUsersButton').addEventListener('click', loadUsers);
document.getElementById('hideUsersButton').addEventListener('click', hideUsers);

async function loadUsers() {
    console.log('Chargement des utilisateurs...');

    try {
        const result = await window.api.getUsers();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        if (result.success) {
            result.users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                userList.appendChild(li);
            });
        } else {
            console.error('Erreur lors de la récupération des utilisateurs:', result.message);
        }
    } catch (error) {
        console.error('Erreur lors de l\'appel IPC:', error);
    }
}

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const name = document.getElementById('login-name').value;

    console.log('Login submitted:', { name, email});

    try {
        const result = await window.api.authenticateUser(name, email);
        if (result.success) {
            console.log('Connexion réussie pour l\'utilisateur:', result.user);
            showApp();
        } else {
            console.error('Erreur lors de la connexion:', result.message);
            alert('Invalid email or password');
        }
    } catch (error) {
        console.error('Erreur lors de l\'appel IPC:', error);
    }
});

function hideUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

function showApp() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
}