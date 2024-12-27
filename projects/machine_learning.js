const data = [
  { problem: 'Classification', image: 'images/projects/car_purchase_decision/project_wallpaper.png', link: 'car_purchase_decision.html', title: 'Car Purchase Prediction' },
  { problem: 'Classification', image: 'images/projects/loan_status_approval_prediction/project_wallpaper.png', link: 'loan_status_approval_prediction.html', title: 'Loan Approval Prediction' },
  { problem: 'Regression', image: 'images/projects/calories_burned_prediction/wallpaper.png', link: 'calories_burned_prediction.html', title: 'Calories Burned Prediction' },
  { problem: 'Regression', image: 'images/projects/medical_insurance_cost_prediction/wallpaper.png', link: 'medical_insurance_cost_prediction.html', title: 'Medical Insurance Cost Prediction' },
  { problem: 'Regression', image: 'images/projects/rainfall_prediction/wallpaper.png', link: 'rainfall_prediction.html', title: 'Rainfall Prediction' },
  { problem: 'Clustering', image: 'images/projects/mall_customer_segmentation/wallpaper.png', link: 'mall_customer_segmentation.html', title: 'Mall Customer Segmentation Using K Means Clustering' },


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

