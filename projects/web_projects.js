const data = [
    { image: 'images/projects/amigo_academy/amigo_home.webp', link: 'amigo_academy.html', title: 'Amigo Academy ERP' },
    { image: 'images/projects/w2c/project_logo.png', link: 'w2c.html', title: 'W2C Wholesale & Retail Fish Seller & Ecommerce Venture' },
    { image: 'images/projects/sample_ecommerce_website_design/ecommerce_website_design_wallpaper.png', link: 'sample_ecommerce_website_design.html', title: 'Ecommerce Template' },

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
            <div class="card shadow-lg zoom">
              <img src="${item.image}" class="card-img-top border" alt="${item.title}">
              <div class="card-body text-center">
                <h5 class="card-title">${item.title}</h5>
                <a href="${item.link}" class="btn btn-primary">View More</a>
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

