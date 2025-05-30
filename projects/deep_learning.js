const data = [
  { is_official: false, problem: 'classification', image: 'images/projects/mnist_deep_leanring_cnn/wallpaper.png', link: 'mnist_deep_leanring_cnn.html', title: 'MNIST Handwritten Digits CLASSIFICATION Using CNN' },
  { is_official: false, problem: 'classification', image: 'images/projects/rice_image_classification/wallpaper.png', link: 'rice_image_classification.html', title: 'Rice Images Classification Using CNN' },

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
          <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card shadow-lg projectCard">
                ${item.is_official ? `<div class='ribbon red'><span>Official</span></div>` : `<div class='ribbon blue'><span>Unofficial </span></div>`}
                <div class="card-header cardHeader">
                    <img class="card-img-top" src="${item.image}">
                </div>
                
                <div class="card-body">
                        <h5 class="card-title text-center">${item.title}</h5>
                        <h6 class="text-center text-danger text-uppercase">${item.problem}</h6>
                </div>
                <div class="card-footer">
                    <a target="_blank" href="${item.link}" class="btn btn-primary btn-sm w-100">Click To Read More</a>
                </div>
                
            
            </div>  


           </div>
        `;
  });

  setupPagination();
}

// Function to set up pagination controls
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

// Function to change the current page
function changePage(page) {
  currentPage = page;
  displayCards(page);
}

// Initial call to display cards
displayCards(currentPage);

