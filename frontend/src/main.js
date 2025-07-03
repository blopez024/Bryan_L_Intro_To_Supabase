import './style.css';

async function loadPersons() {
  try {

    const resp = await fetch('http://localhost:8080/persons');
    const data = await resp.json();
    console.log(data);
    const personsGrid = createGrid(data);
    const app = document.getElementById("app");
    app.appendChild(personsGrid);

  } catch (err) {
    console.log(err);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadPersons();
});

function createGrid(data) {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'grid-container';

  // Create grid header
  const header = document.createElement('h1');
  header.textContent = 'Users';
  gridContainer.appendChild(header);

  // Create the grid
  const grid = document.createElement('div');
  grid.className = 'user-grid';

  // Create grid items for each person
  data.forEach(person => {
    const card = document.createElement('div');
    card.className = `user-card role-${person.role.toLowerCase()}`;

    // Create name element
    const name = document.createElement('h3');
    name.textContent = person.name;
    card.appendChild(name);

    // Create email element
    const email = document.createElement('p');
    email.className = 'user-email';
    email.textContent = person.email;
    card.appendChild(email);

    // Create role badge
    const role = document.createElement('span');
    role.className = 'user-role';
    role.textContent = person.role;
    card.appendChild(role);

    grid.appendChild(card);
  });

  gridContainer.appendChild(grid);
  return gridContainer;
}

