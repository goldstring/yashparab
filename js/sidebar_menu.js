const menuData = [
    {
        "label": "Home",
        "icon": "mdi mdi-folder-outline",
        "title": "Home",
        "link": "index.html",
        "is_nested": false
    },
    {
        "label": "Educations",
        "icon": "mdi mdi-folder-outline",
        "title": "Educations",
        "link": "education.html",
        "is_nested": false
    },
    {
        "label": "Skills",
        "icon": "mdi mdi-folder-outline",
        "title": "Skills",
        "link": "skills.html",
        "is_nested": false
    },
    {
        "label": "Experience",
        "icon": "mdi mdi-folder-outline",
        "title": "Experience",
        "link": "experience.html",
        "is_nested": false
    },
    {
        "label": "Certificates",
        "icon": "mdi mdi-folder-outline",
        "title": "Certificates",
        "link": "certificates.html",
        "is_nested": false
    },
    {
        "label": "Services",
        "icon": "mdi mdi-folder-outline",
        "title": "Services",
        "link": "service.html",
        "is_nested": false
    },
    {
        "label": "Projects",
        "icon": "mdi mdi-folder-outline",
        "title": "Projects",
        "id": "projects",
        "link": "javascript:void(0)",
        "is_nested": true,
        "root_node": true,
        "subMenu": [
            {
                "label": "Python",
                "title": "Python",
                "link": "python.html",
                "is_nested": false,
            },
            {
                "label": "Web Projects",
                "title": "Web Projects",
                "link": "web_projects.html",
                "is_nested": false,
            },
            {
                "label": "Power BI",
                "title": "Power BI",
                "link": "power_bi.html",
                "is_nested": false,
            }, {
                "label": "Machine Learning",
                "title": "Machine Learning",
                "link": "machine_learning.html",
                "is_nested": false,
            }, {
                "label": "Deep Learning",
                "title": "Deep Learning",
                "link": "deep_learning.html",
                "is_nested": false,
            },
            {
                "label": "Kaggle Competition",
                "title": "Kaggle Competition",
                "link": "kaggle_competition.html",
                "is_nested": false,
            },
            // {
            //     "label": "Machine Learning",
            //     "title": "Machine Learning",
            //     "link": "javascript:void(0)",
            //     "id": "machine_learning",
            //     "is_nested": true,
            //     "root_node": false,
            //     "subMenu": [
            //         {
            //             "label": "Regression",
            //             "title": "Regression",
            //             "link": "button-default.html"
            //         },
            //         {
            //             "label": "Classification",
            //             "title": "Classification",
            //             "link": "button-dropdown.html"
            //         },
            //         {
            //             "label": "Clustering",
            //             "title": "Clustering",
            //             "link": "button-group.html"
            //         }
            //     ]
            // },
            {
                "label": "Mysql",
                "title": "Mysql",
                "link": "card.html",
                "is_nested": false,
            }
        ]
    }
];


function subnested_wrapper(submenu, id, root_node) {

    var root_node_class = (root_node) ? 'data-parent="#sidebar-menu"' : '';

    let sidebarHTML = `<ul class="collapse" id="${id}" ${root_node_class} style=""><div class="sub-menu">`;

    submenu.forEach(item => {

        if (!item.is_nested) {
            //Single Element
            sidebarHTML += `<li class="${item.subMenu ? 'has-sub' : ''}">`;
            sidebarHTML += `<a class="sidenav-item-link" href="${item.link}">`;
            sidebarHTML += `<span class="nav-text">${item.label}</span></a>`;
            sidebarHTML += '</li>';
        }
        else {
            //Nested Element
            sidebarHTML += `<li class="has-sub">`;
            sidebarHTML += `<a class="sidenav-item-link" href="${item.link}" data-toggle="collapse" data-target="#${item.id}" aria-expanded="true" aria-controls="${item.id}" refId="${item.id}">`;
            sidebarHTML += `<span class="nav-text">${item.label}</span><b class="caret"></b></a>`;
            sidebarHTML += subnested_wrapper(item.subMenu, item.id, item.root_node);
            sidebarHTML += '</li>';

        }

    });

    sidebarHTML += '</ul>';
    return sidebarHTML;
}

function generateSidebar(menu) {
    let sidebarHTML = '<ul class="nav sidebar-inner" id="sidebar-menu">';

    menu.forEach(item => {

        console.log(item.is_nested);

        if (!item.is_nested) {
            //Single Element
            sidebarHTML += `<li class="${item.subMenu ? 'has-sub' : ''}">`;
            sidebarHTML += `<a class="sidenav-item-link" href="${item.link}">`;
            sidebarHTML += `<i class="${item.icon}"></i>`;
            sidebarHTML += `<span class="nav-text">${item.label}</span></a>`;
            sidebarHTML += '</li>';
        }
        else {
            //Nested Element

            sidebarHTML += `<li class="has-sub" >`;
            sidebarHTML += `<a class="sidenav-item-link" href="${item.link}" refId="${item.id}" data-toggle="collapse" data-target="#${item.id}" aria-expanded="true" aria-controls="${item.id}" refId="${item.id}">`;
            sidebarHTML += `<i class="${item.icon}"></i>`;
            sidebarHTML += `<span class="nav-text">${item.label}</span><b class="caret"></b></a>`;
            sidebarHTML += subnested_wrapper(item.subMenu, item.id, item.root_node);
            sidebarHTML += '</li>';

        }

    });

    sidebarHTML += '</ul>';
    return sidebarHTML;
}



document.getElementById('menubar').innerHTML = generateSidebar(menuData);




