const data = [
  { problem: 'classification', image: 'images/projects/titanic_diaster/project_wallpaper.png', link: 'titanic_disaster_machine_learning.html', title: 'Titanic Survival Prediction' },
  { problem: 'classification', image: 'images/projects/mushroom_kaggle/mushroom_kaggle.png', link: 'mushroom_kaggle.html', title: 'Binary Prediction of Poisonous Mushrooms  Playground Series - Season 4, Episode 8' },

];

// Pagination variables
const itemsPerPage = 8;
let currentPage = 1;

// Function to display cards
function displayCards(page) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = data.slice(start, end);

  paginatedItems.forEach(item => {
    cardContainer.innerHTML += `
        <div class="col-12 col-md-3 mb-4">
          <div class="card shadow-lg">
            <img src="${item.image}" class="card-img-top border" alt="${item.title}">
            <div class="card-body text-center">
              <h5 class="card-title">${item.title}</h5>
              <p class="mb-2"><span class="badge badge-info">${item.problem}</span></p>
              <a href="${item.link}" class="btn btn-primary p-1">View More</a>
            </div>
          </div>
        </div>
      `;
  });

  setupPagination();
}

// Function to set up pagination controls
function setupPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const pageCount = Math.ceil(data.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    pagination.innerHTML += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>
      `;
  }
}

// Function to change the current page
function changePage(page) {
  currentPage = page;
  displayCards(page);
}

// Initial call to display cards
displayCards(currentPage);

