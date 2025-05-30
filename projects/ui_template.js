const data = [
    { is_official: true, image: 'images/projects/malvani_tales/logo.jpg', link: 'https://github.com/goldstring/malvanitales', title: 'Malvani Tales Restaurant Portfolio' },
    { is_official: false, image: 'images/projects/tic_tac_toe_using_reactjs/output.png', link: 'https://github.com/goldstring/tictactoe_using_reactjs', title: 'Tic Tac Toe Using React Js' },
    { is_official: false, image: 'images/projects/nexa_agency_website_template/banner.png', link: 'https://github.com/goldstring/Nexa-Agency-Website-Template', title: 'Nexa Agency Website Template' },

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

