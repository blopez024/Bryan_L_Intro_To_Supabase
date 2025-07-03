import './style.css';

async function loadPersons() {
  try {

    const resp = await fetch('http://localhost:8080/persons');
    const data = await resp.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadPersons();
});
