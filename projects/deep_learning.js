const data = [
    { problem: 'classification', image: 'images/projects/mnist_deep_leanring_cnn/wallpaper.png', link: 'mnist_deep_leanring_cnn.html', title: 'MNIST Handwritten Digits CLASSIFICATION Using CNN' },
    { problem: 'classification', image: 'images/projects/rice_image_classification/wallpaper.png', link: 'rice_image_classification.html', title: 'Rice Images Classification Using CNN' },

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
              <div class="card shadow-lg zoom h-100">
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
