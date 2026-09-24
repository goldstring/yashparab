/* ==========================================================================
   projects.js — projects listing page (projects.html)
   Plain jQuery. The projects live in the array below, so there is no JSON file to
   fetch and nothing to break when the page is opened straight from disk (file://).
   To add a project: add an object to `projects`. Set isActive: false to hide one.
   ========================================================================== */
$(function () {

  /* ---------- 1. DATA ---------- */
  var projects = [
    {
      title: "Ace360Degree Project Work",
      category: "Company Project",
      subcategory: "Ace360Degree",
      summary: "Backend development work at Ace360Degree across multiple client projects, domains, and industries.",     
      image: "assets/images/projects/web_projects/ace360degree/logo.png",
      alt: "Ace360Degree Project Work",
      link: "ace360degree.html",
      isActive: true
    },
    {
      title: "Payper Software Project Work",
      category: "Company Project",
      subcategory: "PayperSoftware",
      summary: "Backend development work at PayperSoftware across multiple client projects, domains, and industries.",
      image: "assets/images/projects/web_projects/paypersoftware/logo.jpg",
      alt: "PayperSoftware Project Work",
      link: "paypersoftware.html",
      isActive: true
    },
    {
      title: "World2Consumer Pvt Ltd Ecommerce",
      category: "Freelance",
      subcategory: "Web Project",
      summary: "Developed a W2C e-commerce project in CodeIgniter from scratch as a freelance full-stack developer.",
      image: "https://raw.githubusercontent.com/goldstring/W2C-Wholesale-Retail-Fish-Seller-Ecommerce-Venture/main/images/project_logo.png",
      alt: "World2Consumer Project Logo",
      link: "https://github.com/goldstring/W2C-Wholesale-Retail-Fish-Seller-Ecommerce-Venture",
      isActive: true
    },
    {
      title: "MalvaniTales",
      category: "Freelance",
      subcategory: "Web Project",
      summary: "Restaurant HTML UI designed to showcase its online presence, menu, and contact details.",
      image: "https://raw.githubusercontent.com/goldstring/malvanitales/main/images/logo.jpg",
      alt: "MalvaniTales",
      link: "https://github.com/goldstring/malvanitales",
      isActive: true
    },
    {
      title: "MarketingAle Digital Marketing Agency",
      category: "Freelance",
      subcategory: "Web Project",
      summary: "Freelance digital marketing website built with Laravel, Bootstrap 5, MySQL and jQuery.",
      image: "https://raw.githubusercontent.com/goldstring/marketingale_project/main/logo.png",
      alt: "MarketingAle Digital Marketing Agency",
      link: "https://github.com/goldstring/marketingale_project",
      isActive: true
    },
    
  ];

  /* ---------- 2. SETTINGS ---------- */
  var PAGE_SIZE  = 9;                                                                    // cards per page
  var MIN_CHARS  = 3;                                                                    // search opens after this many characters
  var CATEGORIES = ['Company Project', 'Freelance', 'MLOps', 'Forecasting', 'Recommenders'];   // order of the filter chips
  function SEARCH_TEXT(p) { return p.title + ' ' + p.category + ' ' + p.subcategory; }   // what the search box looks at

  /* ---------- 3. PAGE TEXT ---------- */
  $('[data-list="crumb"]').text('Projects');
  $('[data-list="tag"]').text('Portfolio');
  $('[data-list="title"]').text('Systems I\u2019ve built and shipped to production.');
  $('[data-list="lead"]').text('Computer vision,Web Projects, NLP, forecasting and MLOps work. Filter by category, then narrow down by subtopic to find the projects most relevant to you.');
  $('[data-list="searchLabel"]').text('Search projects');
  $('#listSearchInput').attr('placeholder', 'Search projects by title or topic (3+ characters)');
  $('#listEmptyText').text('No projects match that filter combination yet.');

 

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function chip(key, label, count, isActive) {
    return '<button type="button" class="filter-btn' + (isActive ? ' active' : '') + '" data-key="' + esc(key) +
           '" aria-pressed="' + isActive + '">' + esc(label) + ' <small>' + count + '</small></button>';
  }
  function setActive($wrap, key) {
    $wrap.find('.filter-btn').each(function () {
      var on = $(this).attr('data-key') === key;
      $(this).toggleClass('active', on).attr('aria-pressed', on);
    });
  }

  /* ---------- 4. CARD ---------- */
  function cardHtml(p) {
    return '<div class="project-card">' +
      '<div class="project-thumb">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.alt) + '" loading="lazy">' +
        '<span class="project-cat-badge">' + esc(p.category) + '</span>' +
      '</div>' +
      '<div class="project-body">' +
        '<h4><a href="' + esc(p.link) + '">' + esc(p.title) + '</a></h4>' +
        '<p>' + esc(p.summary) + '</p>' +
        '<div class="project-meta-row">' +
          '<span class="sub-tag">' + esc(p.subcategory) + '</span>' +
          '<a target="_blank" rel="noopener noreferrer" href="' + esc(p.link) + '" class="view-link">View details <i class="bi bi-arrow-right"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- 5. FILTER CHIPS (category, then subtopic) ---------- */
  var visible = projects.filter(function (p) { return p.isActive; });
  var state = { cat: 'all', sub: 'all', page: 1 };

  var chips = chip('all', 'All projects', visible.length, true);
  CATEGORIES.forEach(function (c) {
    chips += chip(c, c, visible.filter(function (p) { return p.category === c; }).length, false);
  });
  $('#listCats').html(chips).on('click', '.filter-btn', function () {
    state.cat = $(this).attr('data-key');
    state.sub = 'all';
    state.page = 1;
    setActive($('#listCats'), state.cat);
    drawSubs();
    render();
  });

  // Second row of chips: the subtopics of the chosen category (hidden when there is only one)
  function drawSubs() {
    var inCat = visible.filter(function (p) { return p.category === state.cat; });
    var subs = [];
    inCat.forEach(function (p) { if (subs.indexOf(p.subcategory) === -1) subs.push(p.subcategory); });

    $('#listSubs').stop(true, true);
    if (state.cat === 'all' || subs.length < 2) { $('#listSubs').slideUp(150); return; }

    var html = chip('all', 'All subtopics', inCat.length, true);
    subs.forEach(function (s) {
      html += chip(s, s, inCat.filter(function (p) { return p.subcategory === s; }).length, false);
    });
    $('#listSubs .filter-group').html(html);
    $('#listSubs').slideDown(180);
  }

  $('#listSubs').on('click', '.filter-btn', function () {
    state.sub = $(this).attr('data-key');
    state.page = 1;
    setActive($('#listSubs'), state.sub);
    render();
  });

  /* ---------- 6. DRAW THE LIST ---------- */
  function render() {
    var list = visible.filter(function (p) {
      return (state.cat === 'all' || p.category === state.cat) &&
             (state.sub === 'all' || p.subcategory === state.sub);
    });
    var pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages);
    var from = (state.page - 1) * PAGE_SIZE;
    var slice = list.slice(from, from + PAGE_SIZE);

    $('#listGrid').html(slice.map(function (p) {
      return '<div class="col-md-6 col-lg-4 list-item">' + cardHtml(p) + '</div>';
    }).join(''));
    $('#listEmpty').toggleClass('show', list.length === 0);

    var noun = list.length === 1 ? 'project' : 'projects';
    $('#listCount').text(!list.length ? '' :
      pages === 1 ? list.length + ' ' + noun :
      'Showing ' + (from + 1) + '\u2013' + (from + slice.length) + ' of ' + list.length + ' ' + noun);

    drawPager(pages);
  }

  /* ---------- 7. PAGINATION ---------- */

  // Which page numbers to show:  1  2  3  ...  (last-2)  (last-1)  last
  // With 7 pages or fewer, every page is shown. If the current page is hidden in the
  // middle, it is shown too, so the active page never disappears.
  function pageNumbers(pages, current) {
    var show = [], i;
    if (pages <= 7) {
      for (i = 1; i <= pages; i++) show.push(i);
      return show;
    }
    show = [1, 2, 3, pages - 2, pages - 1, pages];
    if (current > 3 && current < pages - 2) show.push(current);
    show.sort(function (a, b) { return a - b; });

    var out = [];
    show.forEach(function (n, k) {
      if (k > 0 && n - show[k - 1] > 1) out.push('\u2026');      // gap in the numbers -> "..."
      out.push(n);
    });
    return out;
  }

  function drawPager(pages) {
    if (pages <= 1) { $('#listPager').empty().prop('hidden', true); return; }
    var p = state.page;
    var html = p > 1
      ? '<a href="#" class="pg-arrow" data-page="' + (p - 1) + '" aria-label="Previous page"><i class="bi bi-chevron-left"></i></a>'
      : '<span class="pg-arrow is-disabled" aria-hidden="true"><i class="bi bi-chevron-left"></i></span>';
    pageNumbers(pages, p).forEach(function (n) {
      if (n === '\u2026') {
        html += '<span class="pg-arrow pg-dots" aria-hidden="true">\u2026</span>';      // the "..." (borderless, like the arrows)
      } else if (n === p) {
        html += '<span class="active" aria-current="page">' + n + '</span>';
      } else {
        html += '<a href="#" data-page="' + n + '" aria-label="Page ' + n + '">' + n + '</a>';
      }
    });
    html += p < pages
      ? '<a href="#" class="pg-arrow" data-page="' + (p + 1) + '" aria-label="Next page"><i class="bi bi-chevron-right"></i></a>'
      : '<span class="pg-arrow is-disabled" aria-hidden="true"><i class="bi bi-chevron-right"></i></span>';
    $('#listPager').html(html).prop('hidden', false);
  }

  $('#listPager').on('click', 'a[data-page]', function (e) {
    e.preventDefault();
    state.page = parseInt($(this).attr('data-page'), 10);
    render();
    var top = $('.list-toolbar').offset().top - 110;              // bring the top of the list back into view
    if ($(window).scrollTop() > top) $('html, body').animate({ scrollTop: top }, 300);
  });


  /* ---------- 8. SEARCH BOX (opens after 3+ characters) ---------- */
  var $search  = $('#listSearch');
  var $input   = $('#listSearchInput');
  var $results = $('#listSearchList');
  var active   = -1;                        // highlighted result row

  function closeSearch() {
    $results.prop('hidden', true).empty();
    $input.attr('aria-expanded', 'false').removeAttr('aria-activedescendant');
    active = -1;
  }

  function openSearch() {
    var term = $.trim($input.val());
    if (term.length < MIN_CHARS) { closeSearch(); return; }

    var words = term.toLowerCase().split(/\s+/);
    var hits = visible.filter(function (p) {
      var text = SEARCH_TEXT(p).toLowerCase();
      return words.every(function (w) { return text.indexOf(w) !== -1; });
    });

    var html;
    if (!hits.length) {
      html = '<li role="presentation" class="list-search-empty"><i class="bi bi-search"></i>No results found for \u201c' + esc(term) + '\u201d</li>';
    } else {
      var re = new RegExp('(' + words.sort(function (a, b) { return b.length - a.length; }).map(escRe).join('|') + ')', 'i');
      html = hits.map(function (p, i) {
        var title = p.title.split(re).map(function (part, n) {
          return n % 2 ? '<mark>' + esc(part) + '</mark>' : esc(part);
        }).join('');
        return '<li role="presentation"><a class="list-search-result" id="listResult-' + i + '" role="option" aria-selected="false" href="' + esc(p.link) + '">' +
                 '<img src="' + esc(p.image) + '" alt="" width="64" height="44" loading="lazy">' +
                 '<span class="result-title">' + title + '</span>' +
                 '<span class="result-cat">' + esc(p.category) + '</span></a></li>';
      }).join('');
    }
    active = -1;
    $input.removeAttr('aria-activedescendant').attr('aria-expanded', 'true');
    $results.html(html).prop('hidden', false).scrollTop(0);
    $('#listSearchStatus').text(hits.length ? hits.length + ' results found' : 'No results found');
  }

  function highlightRow(i) {
    var $rows = $results.find('.list-search-result');
    if (!$rows.length) return;
    active = (i + $rows.length) % $rows.length;                    // wraps top <-> bottom
    $rows.removeClass('is-active').attr('aria-selected', 'false');
    var $row = $rows.eq(active).addClass('is-active').attr('aria-selected', 'true');
    $input.attr('aria-activedescendant', $row.attr('id'));
    var row = $row[0], box = $results[0];                          // keep the row inside the scroll area
    if (row.offsetTop < box.scrollTop) box.scrollTop = row.offsetTop;
    else if (row.offsetTop + row.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = row.offsetTop + row.offsetHeight - box.clientHeight;
  }

  $input.on('input', function () {
    $search.toggleClass('has-value', $input.val().length > 0);
    openSearch();
  });
  $input.on('focus', function () { if ($results.prop('hidden')) openSearch(); });
  $input.on('keydown', function (e) {
    var isOpen = !$results.prop('hidden');
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen) openSearch(); highlightRow(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (!isOpen) openSearch(); highlightRow(active < 0 ? -1 : active - 1); }
    else if (e.key === 'Enter' && isOpen && active >= 0) { e.preventDefault(); $results.find('.list-search-result').get(active).click(); }
    else if (e.key === 'Escape' && isOpen) { e.preventDefault(); closeSearch(); }
    else if (e.key === 'Tab') { closeSearch(); }
  });
  $results.on('mousemove', '.list-search-result', function () {
    var i = $results.find('.list-search-result').index(this);
    if (i !== active) highlightRow(i);
  });
  $('#listSearchClear').on('click', function () {
    $input.val('').focus();
    $search.removeClass('has-value');
    closeSearch();
  });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#listSearch').length) closeSearch();
  });

  render();
});