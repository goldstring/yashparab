const menuData = [
    {
        "label": "Download Resume",
        "icon": '<i class="fa-solid fa-download text-white"></i>',
        "title": "Download Resume",
        "link": "resume/resume.pdf",
        "is_nested": false
    },
    {
        "label": "Home",
        "icon": '<i class="fa-solid fa-house"></i>',
        "title": "Home",
        "link": "index.html",
        "is_nested": false
    },
    {
        "label": "Educations",
        "icon": '<i class="fa-solid fa-user-graduate"></i>',
        "title": "Educations",
        "link": "education.html",
        "is_nested": false
    },
    {
        "label": "Skills",
        "icon": '<i class="fa-solid fa-rectangle-list"></i>',
        "title": "Skills",
        "link": "skills.html",
        "is_nested": false
    },
    {
        "label": "Experience",
        "icon": '<i class="fa-solid fa-user-tie"></i>',
        "title": "Experience",
        "link": "experience.html",
        "is_nested": false
    },
    // {
    //     "label": "Certificates",
    //     "icon": '<i class="fa-solid fa-certificate"></i>',
    //     "title": "Certificates",
    //     "link": "certificates.html",
    //     "is_nested": false
    // },
    // {
    //     "label": "Services",
    //     "icon": '<i class="fa-solid fa-user-gear"></i>',
    //     "title": "Services",
    //     "link": "service.html",
    //     "is_nested": false
    // },

    {
        "label": "Projects",
        "icon": '<i class="fa-solid fa-diagram-project"></i>',
        "title": "Projects",
        "id": "projects",
        "link": "javascript:void(0)",
        "is_nested": true,
        "root_node": true,
        "subMenu": [
            // {
            //     "label": "Industry Domain",
            //     "icon": '<i class="fa-solid fa-code"></i>',
            //     "title": "Mysql",
            //     "link": "card.html",
            //     "is_nested": false,
            // },
            {
                "label": "Machine Learning",
                "icon": '<i class="fa-solid fa-code"></i>',
                "title": "Machine Learning",
                "link": "machine_learning.html",
                "is_nested": false,
            }, {
                "label": "Deep Learning",
                "icon": '<i class="fa-solid fa-code"></i>',
                "title": "Deep Learning",
                "link": "deep_learning.html",
                "is_nested": false,
            },
            // {
            //     "label": "Kaggle Competition",
            //     "icon": '<i class="fa-solid fa-code"></i>',
            //     "title": "Kaggle Competition",
            //     "link": "kaggle_competition.html",
            //     "is_nested": false,
            // },
            {
                "label": "Web Projects",
                "icon": '<i class="fa-solid fa-code"></i>',
                "title": "Web Projects",
                "link": "javascript:void(0)",
                "id": "web_projects",
                "is_nested": true,
                "root_node": false,
                "subMenu": [
                    {
                        "label": "PHP",
                        "icon": '<i class="fa-solid fa-code"></i>',
                        "title": "PHP",
                        "link": "php.html"
                    },
                    {
                        "label": "Python",
                        "icon": '<i class="fa-solid fa-code"></i>',
                        "title": "Python",
                        "link": "python.html"
                    },
                    {
                        "label": "UI Templates",
                        "icon": '<i class="fa-solid fa-code"></i>',
                        "title": "UI Template",
                        "link": "ui_template.html"
                    }
                ]
            },
            {
                "label": "Data Analytics",
                "icon": '<i class="fa-solid fa-code"></i>',
                "title": "Data Analytics",
                "link": "javascript:void(0)",
                "id": "data_analytics",
                "is_nested": true,
                "root_node": false,
                "subMenu": [
                    {
                        "label": "PowerBI",
                        "icon": '<i class="fa-solid fa-code"></i>',
                        "title": "PowerBI",
                        "link": "powerbi.html"
                    },
                    // {
                    //     "label": "Excel",
                    //     "icon": '<i class="fa-solid fa-code"></i>',
                    //     "title": "Excel",
                    //     "link": "excel.html"
                    // },
                    // {
                    //     "label": "Python EDA",
                    //     "icon": '<i class="fa-solid fa-code"></i>',
                    //     "title": "Python Analytics",
                    //     "link": "python_eda.html"
                    // }
                ]
            },





        ]
    }
];


function subnested_wrapper(submenu, id, root_node) {

    var root_node_class = (root_node) ? 'data-parent="#sidebar-menu"' : '';

    let sidebarHTML = '';

    submenu.forEach(item => {

        if (!item.is_nested) {
            //Single Element
            sidebarHTML += `<a class="nav-link" href="${item.link}"><div class="nav-link-icon">`;
            sidebarHTML += `${item.icon}</div>`;
            sidebarHTML += `${item.label}`;
            sidebarHTML += '</a>';
        }
        else {
            //Nested Element
            sidebarHTML += `<a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#${item.id}" aria-expanded="true" aria-controls="${item.id}"><div class="nav-link-icon">${item.icon}</div>${item.label}<div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div></a>`;

            sidebarHTML += `<div class="collapse" id="${item.id}" data-bs-parent="#${item.id}" style=""><nav class="sidenav-menu-nested nav">`;
            sidebarHTML += subnested_wrapper(item.subMenu, item.id, item.root_node);
            sidebarHTML += '</nav></div>';

        }

    });

    return sidebarHTML;
}

function generateSidebar(menu) {
    let sidebarHTML = '<div class="nav accordion" id="accordionSidenav">';

    menu.forEach(item => {

        console.log(item.is_nested);

        if (!item.is_nested) {
            //Single Element

            sidebarHTML += `<a class="nav-link" href="${item.link}"><div class="nav-link-icon">`;
            sidebarHTML += `${item.icon}</div>`;
            sidebarHTML += `${item.label}`;
            sidebarHTML += '</a>';
        }
        else {
            //Nested Element


            sidebarHTML += `<a class="nav-link collapsed" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#${item.id}" aria-expanded="true" aria-controls="${item.id}"><div class="nav-link-icon">${item.icon}</div>${item.label}<div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div></a>`;

            sidebarHTML += `<div class="collapse" id="${item.id}" data-bs-parent="#${item.id}" style=""><nav class="sidenav-menu-nested nav">`;
            sidebarHTML += subnested_wrapper(item.subMenu, item.id, item.root_node);
            sidebarHTML += '</nav></div>';

        }

    });

    return sidebarHTML;
}


console.log(generateSidebar(menuData));
document.getElementById('menuBar').innerHTML = generateSidebar(menuData);




