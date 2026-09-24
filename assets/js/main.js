/* ==========================================================================
   ML Engineer Portfolio — main.js (jQuery)
   ========================================================================== */
$(function () {

  /* ---------------- Navbar scroll state ---------------- */
  function handleNavScroll() {
    if ($(window).scrollTop() > 40) {
      $('#mainNav').addClass('is-scrolled');
    } else {
      $('#mainNav').removeClass('is-scrolled');
    }
  }
  handleNavScroll();
  $(window).on('scroll', handleNavScroll);

  /* ---------------- Back to top button ---------------- */
  function handleBackToTop() {
    if ($(window).scrollTop() > 500) {
      $('#backToTop').addClass('show');
    } else {
      $('#backToTop').removeClass('show');
    }
  }
  handleBackToTop();
  $(window).on('scroll', handleBackToTop);
  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  /* ---------------- Scrollspy active link (nav + offcanvas) ---------------- */
  var sections = $('.js-spy-section');
  function handleSpy() {
    var scrollPos = $(window).scrollTop() + 140;
    var currentId = null;
    sections.each(function () {
      if ($(this).offset().top <= scrollPos) {
        currentId = $(this).attr('id');
      }
    });
    if (currentId) {
      $('.nav-link[data-section]').removeClass('active');
      $('.nav-link[data-section="' + currentId + '"]').addClass('active');
    }
  }
  if (sections.length) {
    handleSpy();
    $(window).on('scroll', handleSpy);
  }

  /* Close offcanvas menu automatically when a nav link or dropdown item is clicked
     (but not when clicking the "More" toggle itself, which should just open the dropdown) */
  $('#mobileMenu .nav-link:not(.dropdown-toggle), #mobileMenu .dropdown-item').on('click', function () {
    var offcanvasEl = document.getElementById('mobileMenu');
    var instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    instance.hide();
  });

  /* ---------------- Animate skill bars when visible ---------------- */
  var skillBarsAnimated = false;
  function animateSkillBars() {
    var $skills = $('.js-skills-section');
    if (!$skills.length || skillBarsAnimated) return;
    var top = $skills.offset().top;
    if ($(window).scrollTop() + $(window).height() > top + 100) {
      $('.skill-bar-fill').each(function () {
        $(this).css('width', $(this).data('level') + '%');
      });
      skillBarsAnimated = true;
    }
  }
  animateSkillBars();
  $(window).on('scroll', animateSkillBars);

  /* ---------------- Hero neural network: endless, fast signal flow ----------------
     Signals are spawned continuously at the input layer and hop node-to-node along
     random edges until they reach the output layer. Several are always in flight. */
  (function initHeroNetwork() {
    var svg = document.getElementById('heroNet');
    if (!svg) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // keep it static

    var NS = 'http://www.w3.org/2000/svg';
    var ORANGE = '#e87532', NAVY = '#0f2943';
    var HOP_MIN = 380, HOP_VAR = 320;     // ms per connection (lower = faster)
    var SPAWN_MIN = 90, SPAWN_VAR = 130;  // ms between spawns (lower = more signals)
    var MAX_LIVE = 40;

    var layer = svg.querySelector('.net-signals');

    // Build the graph straight from the SVG so editing the markup edits the animation
    var nodes = [].map.call(svg.querySelectorAll('.net-node'), function (el) {
      return { el: el, x: +el.getAttribute('cx'), y: +el.getAttribute('cy'), r: +el.getAttribute('r'), hit: 0, out: [], inCount: 0 };
    });
    function nodeAt(x, y) {
      for (var i = 0; i < nodes.length; i++) if (nodes[i].x === x && nodes[i].y === y) return nodes[i];
    }
    [].forEach.call(svg.querySelectorAll('.net-edges line'), function (el) {
      var a = nodeAt(+el.getAttribute('x1'), +el.getAttribute('y1'));
      var b = nodeAt(+el.getAttribute('x2'), +el.getAttribute('y2'));
      if (!a || !b) return;
      a.out.push({ el: el, a: a, b: b, busy: 0 });
      b.inCount++;
    });
    var inputs = nodes.filter(function (n) { return n.inCount === 0 && n.out.length; });
    if (!inputs.length) return;

    var pool = [], live = [];

    function makeSignal() {
      var tail = document.createElementNS(NS, 'line');
      tail.setAttribute('stroke-width', '3');
      tail.setAttribute('stroke-linecap', 'round');
      tail.setAttribute('stroke-opacity', '.45');
      var head = document.createElementNS(NS, 'circle');
      head.setAttribute('r', '3.6');
      layer.appendChild(tail);
      layer.appendChild(head);
      return { tail: tail, head: head };
    }

    function hop(s) {
      var edge = s.node.out[Math.floor(Math.random() * s.node.out.length)];
      s.edge = edge;
      s.t = 0;
      s.dur = HOP_MIN + Math.random() * HOP_VAR;
      edge.busy++;
      edge.el.style.stroke = s.color;
      edge.el.style.strokeWidth = '2.2';
    }

    function spawn() {
      if (live.length >= MAX_LIVE) return;
      var s = pool.pop() || makeSignal();
      s.color = Math.random() < 0.7 ? ORANGE : NAVY;
      s.head.setAttribute('fill', s.color);
      s.tail.setAttribute('stroke', s.color);
      s.head.style.display = s.tail.style.display = '';
      s.node = inputs[Math.floor(Math.random() * inputs.length)];
      hop(s);
      live.push(s);
    }

    function releaseEdge(edge) {
      if (--edge.busy <= 0) {
        edge.busy = 0;
        edge.el.style.stroke = '';
        edge.el.style.strokeWidth = '';
      }
    }

    var rafId = null, last = 0, spawnIn = 0;

    function frame(now) {
      var dt = Math.min(now - last, 50); // clamp so a background tab doesn't cause a burst
      last = now;

      spawnIn -= dt;
      if (spawnIn <= 0) {
        spawn();
        if (Math.random() < 0.3) spawn();               // occasional double-fire
        spawnIn = SPAWN_MIN + Math.random() * SPAWN_VAR;
      }

      for (var i = live.length - 1; i >= 0; i--) {
        var s = live[i];
        s.t += dt / s.dur;
        if (s.t >= 1) {
          releaseEdge(s.edge);
          s.node = s.edge.b;
          s.node.hit = 1;                                // node "fires" when a signal lands
          if (s.node.out.length) {
            hop(s);
          } else {                                       // reached the output layer
            s.head.style.display = s.tail.style.display = 'none';
            live.splice(i, 1);
            pool.push(s);
            continue;
          }
        }
        var e = s.edge, t = s.t, tt = Math.max(0, t - 0.25);
        var dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
        s.head.setAttribute('cx', e.a.x + dx * t);
        s.head.setAttribute('cy', e.a.y + dy * t);
        s.tail.setAttribute('x1', e.a.x + dx * tt);
        s.tail.setAttribute('y1', e.a.y + dy * tt);
        s.tail.setAttribute('x2', e.a.x + dx * t);
        s.tail.setAttribute('y2', e.a.y + dy * t);
      }

      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        if (n.hit > 0) {
          n.hit = Math.max(0, n.hit - dt / 280);
          n.el.setAttribute('r', (n.r + 4 * n.hit).toFixed(2));
        }
      }
      rafId = requestAnimationFrame(frame);
    }

    function start() { if (rafId === null) { last = performance.now(); rafId = requestAnimationFrame(frame); } }
    function stop()  { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }

    // Wait for the node entrance animation, then run only while the hero is on screen
    setTimeout(function () {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          entries[0].isIntersecting ? start() : stop();
        }, { threshold: 0.05 }).observe(svg);
      } else {
        start();
      }
    }, 600);
  })();

  /* ---------------- Portfolio filters (category + subcategory) ---------------- */
  var $catButtons = $('.js-cat-filter');
  var $subGroup = $('.js-sub-filter-group');
  var $projectItems = $('.project-grid-item');
  var activeCat = 'all';
  var activeSub = 'all';

  function renderSubFilters(cat) {
    if (cat === 'all') {
      $subGroup.stop(true, true).slideUp(150);
      return;
    }
    var subcats = [];
    $projectItems.filter('[data-category="' + cat + '"]').each(function () {
      var s = $(this).data('subcategory');
      if (s && subcats.indexOf(s) === -1) subcats.push(s);
    });
    var $inner = $subGroup.find('.filter-group.sub');
    $inner.empty();
    $inner.append(
      $('<button/>', { class: 'filter-btn active', 'data-sub': 'all', type: 'button' }).text('All subtopics')
    );
    subcats.forEach(function (s) {
      var label = s.replace(/-/g, ' ');
      $inner.append(
        $('<button/>', { class: 'filter-btn', 'data-sub': s, type: 'button' }).text(label.charAt(0).toUpperCase() + label.slice(1))
      );
    });
    activeSub = 'all';
    if (subcats.length) {
      $subGroup.stop(true, true).slideDown(180);
    } else {
      $subGroup.stop(true, true).slideUp(150);
    }
  }

  function applyFilters() {
    var visibleCount = 0;
    $projectItems.each(function () {
      var $item = $(this);
      var matchCat = activeCat === 'all' || $item.data('category') === activeCat;
      var matchSub = activeSub === 'all' || $item.data('subcategory') === activeSub;
      if (matchCat && matchSub) {
        $item.addClass('show');
        visibleCount++;
      } else {
        $item.removeClass('show');
      }
    });
    $('.js-no-results').toggleClass('show', visibleCount === 0);
  }

  $catButtons.on('click', function () {
    $catButtons.removeClass('active');
    $(this).addClass('active');
    activeCat = $(this).data('cat');
    renderSubFilters(activeCat);
    applyFilters();
  });

  $subGroup.on('click', '.filter-btn', function () {
    $subGroup.find('.filter-btn').removeClass('active');
    $(this).addClass('active');
    activeSub = $(this).data('sub');
    applyFilters();
  });

  applyFilters();

  /* ---------------- Blog: topic chips (filter the card grid) ---------------- */
  var $blogCatBtns = $('.js-blog-cat-filter');
  var $blogItems = $('.blog-grid-item');
  var blogActiveCat = 'all';

  function applyBlogFilters() {
    var visibleCount = 0;
    $blogItems.each(function () {
      var match = blogActiveCat === 'all' || $(this).data('category') === blogActiveCat;
      $(this).toggle(match);
      if (match) visibleCount++;
    });
    $('.js-blog-no-results').toggle(visibleCount === 0);
  }

  if ($blogCatBtns.length) {
    applyBlogFilters();
    $blogCatBtns.on('click', function () {
      blogActiveCat = $(this).data('cat');
      $blogCatBtns.removeClass('active').attr('aria-pressed', 'false');
      $(this).addClass('active').attr('aria-pressed', 'true');
      applyBlogFilters();
    });
  }

  /* ---------------- Blog: search dropdown (data from blogs.json) ----------------
     - opens after 3+ characters, lists active posts whose title or category match
     - Up / Down move the highlight, Enter opens it, Esc closes
     - each result is a real <a href>, so clicking or pressing Enter goes to the article */
  var $blogSearch = $('#blogSearch');
  if ($blogSearch.length) {
    var MIN_CHARS = 3;
    var $bsInput = $('#blogSearchInput');
    var $bsList = $('#blogSearchList');
    var $bsClear = $('#blogSearchClear');
    var $bsStatus = $('#blogSearchStatus');
    var blogArticles = [];
    var blogLoad = 'loading';   // 'loading' | 'ready' | 'error'
    var bsActive = -1;

    $.getJSON('blogs.json')
      .done(function (data) {
        blogArticles = (Array.isArray(data) ? data : []).filter(function (a) { return a && a.isActive === true; });
        blogLoad = 'ready';
        if (bsTerm().length >= MIN_CHARS && $bsInput.is(':focus')) bsRender();
      })
      .fail(function () {
        blogLoad = 'error';
        console.warn('blogs.json could not be loaded. If you opened the page as a file://, serve the folder over http (e.g. VS Code Live Server).');
        if (bsTerm().length >= MIN_CHARS) bsRender();
      });

    function bsTerm() { return $.trim($bsInput.val()); }

    function esc(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }
    function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function tokens(term) { return term.toLowerCase().split(/\s+/).filter(Boolean); }

    function highlight(text, toks) {
      var re = new RegExp('(' + toks.slice().sort(function (a, b) { return b.length - a.length; }).map(escRe).join('|') + ')', 'i');
      return String(text).split(re).map(function (part, i) {
        return i % 2 ? '<mark>' + esc(part) + '</mark>' : esc(part);
      }).join('');
    }

    function bsClose() {
      $bsList.prop('hidden', true).empty();
      $bsInput.attr('aria-expanded', 'false').removeAttr('aria-activedescendant');
      bsActive = -1;
    }

    function bsRender() {
      var term = bsTerm();
      if (term.length < MIN_CHARS) { bsClose(); return; }

      var html = '', found = 0, message = '';
      if (blogLoad === 'loading') {
        html = '<li role="presentation" class="blog-search-empty">Loading articles…</li>';
      } else if (blogLoad === 'error') {
        message = 'Articles could not be loaded.';
        html = '<li role="presentation" class="blog-search-empty"><i class="bi bi-exclamation-circle"></i>' + message + '</li>';
      } else {
        var toks = tokens(term);
        var results = blogArticles.filter(function (a) {
          var hay = (a.title + ' ' + a.category).toLowerCase();
          return toks.every(function (t) { return hay.indexOf(t) !== -1; });
        });
        found = results.length;
        if (!found) {
          message = 'No results found';
          html = '<li role="presentation" class="blog-search-empty"><i class="bi bi-search"></i>No results found for “' + esc(term) + '”</li>';
        } else {
          message = found + (found === 1 ? ' result' : ' results') + ' found';
          html = results.map(function (a, i) {
            return '<li role="presentation">' +
              '<a class="blog-search-result" id="blogResult-' + i + '" role="option" aria-selected="false" href="' + esc(a.link) + '">' +
                '<img src="' + esc(a.image) + '" alt="" width="64" height="44" loading="lazy">' +
                '<span class="result-title">' + highlight(a.title, toks) + '</span>' +
                '<span class="result-cat">' + esc(a.category) + '</span>' +
              '</a></li>';
          }).join('');
        }
      }

      bsActive = -1;
      $bsInput.removeAttr('aria-activedescendant').attr('aria-expanded', 'true');
      $bsList.html(html).prop('hidden', false).scrollTop(0);
      $bsStatus.text(message);
    }

    function bsSetActive(index) {
      var $items = $bsList.find('.blog-search-result');
      if (!$items.length) return;
      bsActive = (index + $items.length) % $items.length;   // wraps top <-> bottom
      $items.removeClass('is-active').attr('aria-selected', 'false');
      var $cur = $items.eq(bsActive).addClass('is-active').attr('aria-selected', 'true');
      $bsInput.attr('aria-activedescendant', $cur.attr('id'));

      // keep the highlighted row inside the scrollable list without moving the page
      var el = $cur[0], list = $bsList[0];
      if (el.offsetTop < list.scrollTop) {
        list.scrollTop = el.offsetTop - 4;
      } else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight + 4;
      }
    }

    $bsInput.on('input', function () {
      $blogSearch.toggleClass('has-value', $bsInput.val().length > 0);
      bsRender();
    });

    $bsInput.on('focus', function () {
      if (bsTerm().length >= MIN_CHARS && $bsList.prop('hidden')) bsRender();
    });

    $bsInput.on('keydown', function (e) {
      var isOpen = !$bsList.prop('hidden');
      var count = $bsList.find('.blog-search-result').length;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) { bsRender(); bsSetActive(0); }
        else bsSetActive(bsActive + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) { bsRender(); bsSetActive(-1); }
        else bsSetActive(bsActive < 0 ? count - 1 : bsActive - 1);
      } else if (e.key === 'Enter') {
        if (isOpen && bsActive >= 0) {
          e.preventDefault();
          $bsList.find('.blog-search-result').get(bsActive).click();   // follows the <a href>
        }
      } else if (e.key === 'Escape') {
        if (isOpen) { e.preventDefault(); bsClose(); }
      } else if (e.key === 'Tab') {
        bsClose();
      }
    });

    // mouse hover moves the highlight too (mousemove, so keyboard scrolling doesn't fight the cursor)
    $bsList.on('mousemove', '.blog-search-result', function () {
      var idx = $bsList.find('.blog-search-result').index(this);
      if (idx !== bsActive) bsSetActive(idx);
    });

    $bsClear.on('click', function () {
      $bsInput.val('').focus();
      $blogSearch.removeClass('has-value');
      bsClose();
      $bsStatus.text('');
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest('#blogSearch').length) bsClose();
    });
  }

  /* ---------------- Blog article: table-of-contents scrollspy ---------------- */
  var $tocLinks = $('.toc-list a');
  if ($tocLinks.length) {
    var $tocTargets = $tocLinks.map(function () {
      var id = $(this).attr('href');
      return $(id).length ? id : null;
    }).get();

    function handleTocSpy() {
      var scrollPos = $(window).scrollTop() + 160;
      var currentId = null;
      $tocTargets.forEach(function (id) {
        if ($(id).offset().top <= scrollPos) currentId = id;
      });
      $tocLinks.removeClass('active');
      if (currentId) $tocLinks.filter('[href="' + currentId + '"]').addClass('active');
    }
    handleTocSpy();
    $(window).on('scroll', handleTocSpy);

    $tocLinks.on('click', function (e) {
      var target = $($(this).attr('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 110 }, 400);
      }
    });
  }

  /* ---------------- Blog article: copy-to-clipboard for code blocks ---------------- */
  $('.copy-btn').on('click', function () {
    var $btn = $(this);
    var targetId = $btn.data('target');
    var codeEl = document.getElementById(targetId);
    if (!codeEl) return;
    var text = codeEl.innerText;

    function showCopied() {
      var original = $btn.html();
      $btn.addClass('copied').html('<i class="bi bi-check2"></i> Copied');
      setTimeout(function () {
        $btn.removeClass('copied').html(original);
      }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied).catch(showCopied);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (err) {}
      document.body.removeChild(ta);
      showCopied();
    }
  });

  /* ---------------- Image lightbox popup ---------------- */
  var $lightbox = $('#lightboxOverlay');
  if (!$lightbox.length) {
    $('body').append(
      '<div class="lightbox-overlay" id="lightboxOverlay">' +
        '<button class="lightbox-close" aria-label="Close"><i class="bi bi-x-lg"></i></button>' +
        '<div class="lightbox-figure">' +
          '<img id="lightboxImg" src="" alt="">' +
          '<div class="lightbox-caption" id="lightboxCaption"></div>' +
        '</div>' +
      '</div>'
    );
    $lightbox = $('#lightboxOverlay');
  }

  $(document).on('click', '.blog-content img, .blog-cover img', function () {
    $(this).addClass('lightbox-trigger');
    $('#lightboxImg').attr('src', $(this).attr('src'));
    $('#lightboxCaption').text($(this).attr('alt') || '');
    $lightbox.addClass('show');
    $('body').css('overflow', 'hidden');
  });

  function closeLightbox() {
    $lightbox.removeClass('show');
    $('body').css('overflow', '');
  }
  $(document).on('click', '.lightbox-close, #lightboxOverlay', function (e) {
    if (e.target === this) closeLightbox();
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });


  /* ---------------- Project detail: sync thumbnail state with carousel ---------------- */
  var $detailCarousel = $('#detailCarousel');
  if ($detailCarousel.length) {
    $detailCarousel.on('slide.bs.carousel', function (e) {
      $('.detail-slider-thumbs img').removeClass('active').eq(e.to).addClass('active');
    });
    $('.detail-slider-thumbs img').on('click', function () {
      var idx = $(this).index();
      bootstrap.Carousel.getOrCreateInstance(document.getElementById('detailCarousel')).to(idx);
    });
  }

});