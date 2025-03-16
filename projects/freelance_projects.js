const data = [
  { domain: 'Ecommerce', service: 'Web Developement', tech: ['PHP Codeigiter', 'Mysql', 'Javascript', 'Bootstrap', 'HTML'], image: 'images/projects/w2c/project_logo.png', link: 'w2c.html', title: 'W2C Wholesale & Retail Fish Seller & Ecommerce Venture' },
  { domain: "Restaurant", service: 'Web Developement & Photo Editing', tech: ['Javascript', 'Jquery', 'Bootstrap', 'HTML', 'CSS'], image: 'images/projects/malvani_tales/logo.jpg', link: 'malvani_tales_restaurant_portfolio.html', title: 'Malvani Tales Restaurant' },

];


function getTechList(tech) {
  return tech.map(element => `<span class="badge badge-info">${element}</span>`).join(' ');
}

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
            <div class="col-12 col-md-4 mb-4">
              <div class="card shadow-lg">
                  <img src="${item.image}" class="card-img-top border" alt="${item.title}">
                <div class="card-body">
                  <div class="title_section text-center">
                    <h5 class="pb-3">Domain : ${item.domain}</h5>
                    <h6 class="pb-3">Service : ${item.service}</h6>


                    <h5 class="card-title">${item.title}</h5>
                  </div>
                  <div class="tech_stack_section text-center">
                      
                      ${getTechList(item.tech)}
                  </div>
                  <div class="text-center">
                    <a href="${item.link}" class="btn btn-primary btn-sm ">View More</a>
                  </div>
                  
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

