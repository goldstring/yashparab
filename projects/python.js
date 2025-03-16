const data = [
  { image: 'images/projects/django_todo_app/todo_app_using_django_wallpaper.png', link: 'https://github.com/goldstring/TodoApp-Using-Django-Python-', title: 'Django Todo App' },
  { image: 'images/projects/bmi_calculator_stramlit/project_wallpaper.png', link: 'https://github.com/goldstring/BMI-CALCULATOR-USING-STREAMLIT-Python', title: 'BMI Calculator Using StreamLit' },

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
            <div class="card shadow-lg" style="border-radius:10px;">
                <img src="${item.image}" class="card-img-top border" alt="${item.title}">
              <div class="card-body text-center bg-light">
                
                  <h5 class="card-title">${item.title}</h5>
              </div>
              <div class="card-footer text-center bg-light" style="border-top:1px solid #ccc;">
                <a target="_blank" href="${item.link}" class="btn btn-primary btn-sm ">Read More</a>
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
  const maxVisiblePages = 1; // Number of pages shown before and after the current page

  // Previous Button
  pagination.innerHTML += `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
      </li>
  `;

  if (pageCount <= 7) {
    // Show all pages if total pages are small
    for (let i = 1; i <= pageCount; i++) {
      pagination.innerHTML += createPageItem(i);
    }
  } else {
    // Always show first page
    pagination.innerHTML += createPageItem(1);

    if (currentPage > maxVisiblePages + 2) {
      pagination.innerHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
    }

    // Show pages around the current page
    let startPage = Math.max(2, currentPage - maxVisiblePages);
    let endPage = Math.min(pageCount - 1, currentPage + maxVisiblePages);

    for (let i = startPage; i <= endPage; i++) {
      pagination.innerHTML += createPageItem(i);
    }

    if (currentPage < pageCount - maxVisiblePages - 1) {
      pagination.innerHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
    }

    // Always show last page
    pagination.innerHTML += createPageItem(pageCount);
  }

  // Next Button
  pagination.innerHTML += `
      <li class="page-item ${currentPage === pageCount ? 'disabled' : ''}">
          <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
      </li>
  `;
}

// Helper function to create a page item
function createPageItem(page) {
  return `
      <li class="page-item ${page === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" onclick="changePage(${page})">${page}</a>
      </li>
  `;
}
// Function to change the current page
function changePage(page) {
  currentPage = page;
  displayCards(page);
}

// Initial call to display cards
displayCards(currentPage);

