(function () {

/** 
 * SKILL SECTION CODE START
*/
    var SKILLS = {
        1: {
            title: "Software Development",
            skills: [
                { name: "Python" },
                { name: "Laravel" },
                { name: "PHP" },
                { name: "CodeIgniter" },
                { name: "JavaScript" },
                { name: "TypeScript" },
                { name: "React" },
                { name: "jQuery" },
                { name: "MySQL" },
                { name: "Cron Jobs" },
                { name: "Bootstrap 5" },
                { name: "CSS3" },
                { name: "HTML5" },
                { name: "Postman" },
                { name: "API Development" },
                { name: "JSON" },
                { name: "Authentication & Authorization" },
                { name: "Testing" },
                { name: "Debugging" },
                { name: "System Design" },
                { name: "Problem Solving" },
                { name: "Core Java Basics" },
                { name: "Microsoft Excel" },
                { name: "Data Scraping" },
                { name: "Data Cleaning" },
                { name: "Agile Methodology" },
                { name: "MVC Architecture" },
                { name: "Responsive Design" },
                { name: "Git" },
            ]
        },
        2: {
            title: "Artificial Intelligence",
            skills: [
                { name: "Machine Learning" },
                { name: "Deep Learning" },
                { name: "TensorFlow" },
                { name: "Keras" },
                { name: "LLMs" },
                { name: "RAG" },
                { name: "LangChain" },
                { name: "LangGraph" },
                { name: "AI Agents" },
                { name: "Vector Databases" },
                { name: "Prompt Engineering" }
            ]
        },
        3: {
            title: "Also part of the stack",
            skills: [
                { name: "Kafka" },
                { name: "dbt" },
                { name: "Feature Stores (Feast)" },
                { name: "Grafana / Prometheus" },
                { name: "A/B Testing" },
                { name: "Drift & Bias Monitoring" },
                { name: "NumPy" },
                { name: "Pandas" },
                { name: "FastAPI" },
                { name: "ONNX" },
                { name: "Triton Inference Server" },
                { name: "LangChain" },
                { name: "Terraform" },
                { name: "Snowflake" },
                { name: "GitHub Actions" },
                { name: "OpenCV" },
                { name: "Go" },
                { name: "C++" },
                { name: "Cross-functional Scoping" },
                { name: "Technical Writing" },
                { name: "Mentoring" },
                { name: "Stakeholder Demos" }
            ]
        }
    };

    function getRandomSkillClass() {
        return "skill-pill p" + (Math.floor(Math.random() * 8) + 1);
    }

    function renderSkills() {
        var html = "";

        $.each(SKILLS, function (key, category) {
            html += `
                <div class="col-12 mb-4 mt-2">
                    <span class="panel-eyebrow text-center"><i class="bi bi-stars me-1"></i>${category.title}</span>
                    <div class="skill-pill-loose">
            `;

            $.each(category.skills, function (index, skill) {
                html += `
                    <span class="${getRandomSkillClass()}">${skill.name}</span>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        $(".skillsContainer").html(html);
    }

    renderSkills();
/** 
 * SKILL SECTION CODE END
*/


/** 
 * RESUME EDUCATION/EXPERIENCE SECTION CODE START
*/
    var RESUME = {
        education: [
            {
                date: "2022 — 2024",
                title: "Master of Computer Applications (MCA), Information Technology",
                org: "University of Mumbai, India",
                description: "Postgraduate degree in Information Technology with a focus on computer applications and software development.",
                tags: ["CGPI 8.01"]
            },
            {
                date: "2016 — 2019",
                title: "Bachelor of Science in Information Technology (BScIT)",
                org: "Shankar Narayan College of Arts & Commerce, University of Mumbai, India",
                description: "Undergraduate degree in Information Technology covering programming, databases, software development, and computer applications.",
                tags: ["CGPI 7.12"]
            },
            {
                date: "2014 — 2016",
                title: "Higher Secondary Certificate (HSC) - Science",
                org: "Abhinav Vidya Mandir College, Mumbai, India",
                description: "Higher Secondary education in the Science stream.",
                tags: ["Percentage 62.59%"]
            },
            {
                date: "2014",
                title: "Secondary School Certificate (SSC) - Science",
                org: "Abhinav Vidya Mandir School, Mumbai, India",
                description: "Secondary School Certificate education with a Science-focused curriculum.",
                tags: ["Percentage 79%"]
            }
        ],

        experience: [
            {
                date: "JUN:2026 — SEP:2026",
                title: "Freelance Project",
                org: "Avlovin & MarketingAle Client",
                description: "Developed an e-commerce platform for Avlovin and a digital marketing agency portfolio website for MarketingAle, including responsive UI, backend functionality, database integration, and deployment.",
                tags: ["PHP", "Laravel", "MySQL", "Bootstrap 5", "JavaScript", "jQuery", "E-commerce", "API Development", "Responsive Design", "Deployment"]
            },
            {
                date: "JUN:2025 — May:2026",
                title: "Senior PHP Backend Developer",
                org: "Payper Software",
                description: "Backend Developer with 1+ years of experience building APIs, CRM/ERP modules, gym and real estate platforms using PHP, Laravel, CodeIgniter, MySQL, integrations, deployment, and production support.",
                tags: ["Core PHP", "Laravel", "CodeIgniter", "MySQL", "SQL Server", "REST APIs", "Python", "Excel", "Cron Jobs", "API Integration", "RBAC", "System Design", "Deployment", "Data Cleaning", "Data Scraping", "Postman"]
            },
            {
                date: "FEB:2024 — JAN:2025",
                title: "Freelance Project",
                org: "World2Consumer Client",
                description: "Developed a W2C e-commerce project in CodeIgniter from scratch as a freelance full-stack developer.",
                tags: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "JavaScript", "jQuery", "AJAX", "REST API", "E-commerce"]            
            },
            {
                date: "Oct:2023 - DEC:2023",
                title: "Freelance Project",
                org: "MalvaniTales Client",
                description: "Restaurant HTML UI designed to showcase its online presence, menu, and contact details",
                tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "jQuery", "Responsive Design", "UI Design"]
            },
            {
                date: "JUL:2020 - Sep:2021",
                title: "Web Developer",
                org: "Ace360Degree",
                description: "Backend Developer with 1.5 years of experience building APIs, payment modules, ERP features, reports, and RBAC using PHP, CodeIgniter, MySQL, JavaScript, and REST APIs across multiple business domains.",
                tags: ["PHP", "CodeIgniter MVC", "Laravel", "MySQL", "Python", "System Design", "Problem Solving", "Front End (Bootstrap/JavaScript/jQuery)", "API"]
            }
        ]
    };

    function renderTimeline(items) {
        var html = "";

        $.each(items, function (index, item) {
            html += `
                <div class="timeline-item">
                    <span class="timeline-date">${item.date}</span>
                    <h4>${item.title}</h4>
                    <span class="timeline-org">${item.org}</span>
                    <p>${item.description}</p>
            `;

            if (item.tags && item.tags.length) {
                html += `<div class="timeline-tags">`;

                $.each(item.tags, function (tagIndex, tag) {
                    html += `<span>${tag}</span>`;
                });

                html += `</div>`;
            }

            html += `
                </div>
            `;
        });

        return html;
    }

    function renderResume() {
        $(".education_timeline_container").html(
            renderTimeline(RESUME.education)
        );

        $(".experience_timeline_container").html(
            renderTimeline(RESUME.experience)
        );
    }

    renderResume();


/** 
 * RESUME EDUCATION/EXPERIENCE SECTION CODE END
*/



/** 
 * CERTIFICATES SECTION CODE START
*/

   var CERTIFICATES = [
    {
        title: "SQL Beginner to Advanced For Data Professionals",
        issuer: "Codebasics",
        date: "Apr 2025",
        url: "https://codebasics.io/certificate/CB-50-293153",
        is_link_exist: true
    },
    {
        title: "Python: Beginner to Advanced For Data Professionals",
        issuer: "Codebasics",
        date: "Dec 2024",
        url: "https://codebasics.io/certificate/CB-48-293153",
        is_link_exist: true
    },
    {
        title: "Python Basics",
        issuer: "HackerRank",
        date: "Jan 2025",
        url: "https://www.hackerrank.com/certificates/iframe/13da87899f11",
        is_link_exist: true
    },
    {
        title: "Excel: Mother of Business Intelligence",
        issuer: "Codebasics",
        date: "Jul 2024",
        url: "https://codebasics.io/certificate/CB-51-293153",
        is_link_exist: true
    },
    {
        title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
        issuer: "Udemy",
        date: "Feb 2022",
        url: "#",
        is_link_exist: false
    }
];

function renderCertificates() {
    var html = "";

    $.each(CERTIFICATES, function(index, certificate) {

        var credentialLink = certificate.is_link_exist
            ? `
                <a href="${certificate.url}"
                   class="cert-link"
                   target="_blank"
                   rel="noopener noreferrer">
                    View credential
                    <i class="bi bi-box-arrow-up-right"></i>
                </a>
            `
            : "";

        html += `
            <div class="col-md-6 col-lg-4">
                <div class="cert-card">
                    <div class="cert-badge">
                        <i class="bi bi-patch-check-fill"></i>
                    </div>

                    <div class="cert-card-body">
                        <h4>${certificate.title}</h4>

                        <span class="cert-issuer">
                            ${certificate.issuer}
                        </span>

                        <div class="cert-meta">
                            <span class="cert-date">
                                Issued ${certificate.date}
                            </span>

                            ${credentialLink}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    $(".certificatesContainer").html(html);
}

    renderCertificates();

/** 
 * CERTIFICATES SECTION CODE END
*/



/** 
 * PROJECT SECTION CODE START
*/

    var PROJECTS = [
        {
            title: "Real-Time Fraud Detection Engine",
            category: "mlops",
            categoryName: "MLOps",
            subcategory: "monitoring",
            subcategoryName: "Monitoring",
            image: "https://placehold.co/640x480/0f2943/ffffff?text=Fraud+Detection",
            imageAlt: "Real-time fraud detection dashboard",
            description: "A streaming risk-scoring model serving 12M+ predictions a day with sub-40ms latency.",
            url: "project-detail.html"
        },
        {
            title: "Chest X-Ray Anomaly Segmentation",
            category: "computer-vision",
            categoryName: "Computer Vision",
            subcategory: "segmentation",
            subcategoryName: "Segmentation",
            image: "https://placehold.co/640x480/e87532/ffffff?text=X-Ray+Segmentation",
            imageAlt: "Chest X-ray anomaly segmentation",
            description: "A U-Net based segmentation model deployed across 40+ partner clinics for radiology triage.",
            url: "project-detail.html"
        },
        {
            title: "Retail Demand Forecasting Pipeline",
            category: "forecasting",
            categoryName: "Forecasting",
            subcategory: "demand-forecasting",
            subcategoryName: "Demand forecasting",
            image: "https://placehold.co/640x480/0f2943/ffffff?text=Demand+Forecasting",
            imageAlt: "Retail demand forecasting pipeline",
            description: "A multi-horizon forecasting system cutting stockouts by 23% across 1,200 SKUs.",
            url: "project-detail.html"
        },
        {
            title: "Support Ticket Triage Classifier",
            category: "nlp",
            categoryName: "NLP",
            subcategory: "text-classification",
            subcategoryName: "Text classification",
            image: "https://placehold.co/640x480/e87532/ffffff?text=Ticket+Triage",
            imageAlt: "Support ticket triage classifier",
            description: "A fine-tuned transformer that routes inbound tickets to the right team with 94% accuracy.",
            url: "project-detail.html"
        },
        {
            title: "Conversational Product Assistant",
            category: "nlp",
            categoryName: "NLP",
            subcategory: "generative-ai",
            subcategoryName: "Generative AI",
            image: "https://placehold.co/640x480/0f2943/ffffff?text=Product+Assistant",
            imageAlt: "Conversational product assistant",
            description: "A retrieval-augmented LLM assistant that answers product questions from live catalog data.",
            url: "project-detail.html"
        },
        {
            title: "Autonomous Shelf Object Detection",
            category: "computer-vision",
            categoryName: "Computer Vision",
            subcategory: "object-detection",
            subcategoryName: "Object detection",
            image: "https://placehold.co/640x480/e87532/ffffff?text=Shelf+Detection",
            imageAlt: "Autonomous shelf object detection",
            description: "An edge-deployed YOLO model that flags out-of-stock shelves from robot camera feeds.",
            url: "project-detail.html"
        },
        {
            title: "Personalized Video Recommender",
            category: "recommenders",
            categoryName: "Recommenders",
            subcategory: "collaborative-filtering",
            subcategoryName: "Collaborative filtering",
            image: "https://placehold.co/640x480/0f2943/ffffff?text=Video+Recommender",
            imageAlt: "Personalized video recommender",
            description: "A two-tower recommendation model lifting watch-time by 17% in production A/B tests.",
            url: "project-detail.html"
        },
        {
            title: "Automated Model Deployment Pipeline",
            category: "mlops",
            categoryName: "MLOps",
            subcategory: "ci-cd",
            subcategoryName: "CI / CD",
            image: "https://placehold.co/640x480/e87532/ffffff?text=CI%2FCD+Pipeline",
            imageAlt: "Automated model deployment pipeline",
            description: "A CI/CD pipeline that takes a validated model from registry to canary rollout in minutes.",
            url: "project-detail.html"
        }
    ];

    var activeCategory = "all";
    var activeSubcategory = "all";

    function getCategories() {
        var categories = {};

        $.each(PROJECTS, function (index, project) {
            if (!categories[project.category]) {
                categories[project.category] = {
                    name: project.categoryName,
                    count: 0
                };
            }

            categories[project.category].count++;
        });

        return categories;
    }

    function renderCategoryFilters() {
        var html = `
            <button type="button"
                    class="filter-btn js-cat-filter active"
                    data-cat="all">
                All projects <small>(${PROJECTS.length})</small>
            </button>
        `;

        var categories = getCategories();

        $.each(categories, function (category, data) {
            html += `
                <button type="button"
                        class="filter-btn js-cat-filter"
                        data-cat="${category}">
                    ${data.name}
                </button>
            `;
        });

        $(".js-cat-filter-group").html(html);
    }

    function renderSubcategoryFilters(category) {
    if (category === "all") {
        $(".js-sub-filter-group").hide().html("");
        return;
    }

    var subcategories = {};

    $.each(PROJECTS, function (index, project) {
        if (project.category === category) {
            subcategories[project.subcategory] = project.subcategoryName;
        }
    });

    var keys = Object.keys(subcategories);

    if (!keys.length) {
        $(".js-sub-filter-group").hide().html("");
        return;
    }

    var html = `
        <div class="filter-group sub">
            <button class="filter-btn active"
                    data-sub="all"
                    type="button">
                All subtopics
            </button>
    `;

    $.each(subcategories, function (subcategory, name) {
        html += `
            <button class="filter-btn"
                    data-sub="${subcategory}"
                    type="button">
                ${name}
            </button>
        `;
    });

    html += `</div>`;

    $(".js-sub-filter-group")
        .html(html)
        .show();
}

    function renderProjects() {
        var html = "";
        var visibleCount = 0;

        $.each(PROJECTS, function (index, project) {

            var categoryMatch =
                activeCategory === "all" ||
                project.category === activeCategory;

            var subcategoryMatch =
                activeSubcategory === "all" ||
                project.subcategory === activeSubcategory;

            if (!categoryMatch || !subcategoryMatch) {
                return;
            }

            visibleCount++;

            html += `
                <div class="col-md-6 col-lg-4 project-grid-item show"
                     data-category="${project.category}"
                     data-subcategory="${project.subcategory}">

                    <div class="project-card">

                        <div class="project-thumb">
                            <img src="${project.image}"
                                 alt="${project.imageAlt}">

                            <span class="project-cat-badge">
                                ${project.categoryName}
                            </span>
                        </div>

                        <div class="project-body">

                            <h4>
                                <a href="${project.url}">
                                    ${project.title}
                                </a>
                            </h4>

                            <p>${project.description}</p>

                            <div class="project-meta-row">

                                <span class="sub-tag">
                                    ${project.subcategoryName}
                                </span>

                                <a href="${project.url}"
                                   class="view-link">
                                    View details
                                    <i class="bi bi-arrow-right"></i>
                                </a>

                            </div>

                        </div>
                    </div>
                </div>
            `;
        });

        $("#projectGrid").html(html);

        if (visibleCount === 0) {
            $(".js-no-results").show();
        } else {
            $(".js-no-results").hide();
        }
    }

    function setCategory(category) {
        activeCategory = category;
        activeSubcategory = "all";

        $(".js-cat-filter").removeClass("active");
        $('.js-cat-filter[data-cat="' + category + '"]').addClass("active");

        renderSubcategoryFilters(category);
        renderProjects();
    }

    function setSubcategory(subcategory) {
        activeSubcategory = subcategory;

        $(".js-sub-filter-group .filter-btn").removeClass("active");
        $('.js-sub-filter-group .filter-btn[data-sub="' + subcategory + '"]')
            .addClass("active");

        renderProjects();
    }

    function bindEvents() {

        $(document).on("click", ".js-cat-filter", function () {
            setCategory($(this).data("cat"));
        });

        $(document).on("click", ".js-sub-filter-group .filter-btn", function () {
            setSubcategory($(this).data("sub"));
        });
    }

    function renderPortfolio() {
        renderCategoryFilters();
        renderSubcategoryFilters("all");
        renderProjects();
        bindEvents();
    }

    renderPortfolio();






/** 
 * PROJECT SECTION CODE END
*/









})();


