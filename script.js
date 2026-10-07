/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   BASIC DATA
========================================= */

const defaultProjects = [
    {
        id: 1,
        name: "Personal Portfolio",
        category: "web",
        description:
            "A responsive personal portfolio website designed to showcase my skills, projects and professional experience.",
        tech: "HTML, CSS, JavaScript",
        live: "#",
        github: "#"
    },

    {
        id: 2,
        name: "Healthcare Chatbot",
        category: "web",
        description:
            "A digital healthcare assistant designed to provide useful information through an interactive chatbot interface.",
        tech: "JavaScript, API, AI",
        live: "#",
        github: "#"
    },

    {
        id: 3,
        name: "JavaScript Projects",
        category: "javascript",
        description:
            "A collection of practical JavaScript applications including calculators, counters and interactive projects.",
        tech: "HTML, CSS, JavaScript",
        live: "#",
        github: "#"
    }
];


const defaultBlogs = [
    {
        id: 1,
        title: "My Journey Learning JavaScript",
        category: "JavaScript",
        description:
            "JavaScript has helped me understand how websites become interactive. I have worked with variables, functions, conditions, loops, arrays, objects and DOM manipulation."
    },

    {
        id: 2,
        title: "Starting My React Journey",
        category: "React.js",
        description:
            "React allows developers to create reusable UI components. My next step is to build more practical applications using React, APIs and modern frontend development techniques."
    },

    {
        id: 3,
        title: "Why I Use Figma for Design",
        category: "UI/UX Design",
        description:
            "Figma makes it easier to plan layouts, colors, typography and user experiences before writing code."
    }
];


/* =========================================
   LOCAL STORAGE
========================================= */

function getProjects() {

    const saved = localStorage.getItem("cadeauProjects");

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        "cadeauProjects",
        JSON.stringify(defaultProjects)
    );

    return defaultProjects;
}


function saveProjects(projects) {

    localStorage.setItem(
        "cadeauProjects",
        JSON.stringify(projects)
    );
}


function getBlogs() {

    const saved = localStorage.getItem("cadeauBlogs");

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        "cadeauBlogs",
        JSON.stringify(defaultBlogs)
    );

    return defaultBlogs;
}


function saveBlogs(blogs) {

    localStorage.setItem(
        "cadeauBlogs",
        JSON.stringify(blogs)
    );
}


function getMessages() {

    const saved = localStorage.getItem("cadeauMessages");

    if (saved) {
        return JSON.parse(saved);
    }

    return [];
}


function saveMessages(messages) {

    localStorage.setItem(
        "cadeauMessages",
        JSON.stringify(messages)
    );
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   PROJECT FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {

            const category = card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();


        const messages = getMessages();

        const newMessage = {

            id: Date.now(),

            name,
            email,
            subject,
            message,

            date: new Date().toLocaleString()

        };


        messages.push(newMessage);

        saveMessages(messages);


        const status =
            document.getElementById("contactMessageStatus");

        status.textContent =
            "Thank you! Your message has been received.";

        contactForm.reset();

        updateDashboardStats();

    });

}


/* =========================================
   LOGIN MODAL
========================================= */

const loginModal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");

if (openLogin) {

    openLogin.addEventListener("click", () => {

        loginModal.classList.add("show");

    });

}


if (closeLogin) {

    closeLogin.addEventListener("click", () => {

        loginModal.classList.remove("show");

    });

}


/* =========================================
   LOGIN
========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const error =
            document.getElementById("loginError");


        /*
            DEMO LOGIN ONLY.

            Later replace this with Firebase Authentication.
        */

        if (
            email === "admin@example.com" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            error.textContent = "";

            loginModal.classList.remove("show");

            loginForm.reset();

            openAdminDashboard();

        } else {

            error.textContent =
                "Invalid email or password.";

        }

    });

}


/* =========================================
   ADMIN DASHBOARD
========================================= */

const adminDashboard =
    document.getElementById("adminDashboard");


function openAdminDashboard() {

    adminDashboard.classList.add("show");

    document.body.style.overflow = "hidden";

    renderAdminProjects();
    renderAdminBlogs();
    renderAdminMessages();
    renderAdminSkills();
    updateDashboardStats();

}


function closeAdminDashboard() {

    adminDashboard.classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================
   LOGOUT
========================================= */

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("adminLoggedIn");

        closeAdminDashboard();

    });

}


/* =========================================
   VIEW WEBSITE
========================================= */

const viewSiteBtn =
    document.getElementById("viewSiteBtn");

if (viewSiteBtn) {

    viewSiteBtn.addEventListener("click", () => {

        closeAdminDashboard();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   ADMIN NAVIGATION
========================================= */

const adminNavItems =
    document.querySelectorAll(".admin-nav-item");

const adminSections =
    document.querySelectorAll(".admin-section");

const adminPageTitle =
    document.getElementById("adminPageTitle");


adminNavItems.forEach(item => {

    item.addEventListener("click", () => {

        const sectionName =
            item.dataset.adminSection;


        adminNavItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");


        adminSections.forEach(section => {
            section.classList.remove("active");
        });


        const selected =
            document.getElementById(
                `admin-${sectionName}`
            );


        if (selected) {

            selected.classList.add("active");

            adminPageTitle.textContent =
                sectionName.charAt(0).toUpperCase() +
                sectionName.slice(1);

        }

    });

});


/* =========================================
   ADMIN MOBILE MENU
========================================= */

const adminMenuBtn =
    document.getElementById("adminMenuBtn");

const adminSidebar =
    document.getElementById("adminSidebar");


if (adminMenuBtn) {

    adminMenuBtn.addEventListener("click", () => {

        adminSidebar.classList.toggle("show");

    });

}


/* =========================================
   QUICK ACTIONS
========================================= */

document.querySelectorAll(".quick-action")
    .forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.action;

            if (action === "add-project") {

                openProjectModal();

            } else {

                const target =
                    document.querySelector(
                        `[data-admin-section="${action}"]`
                    );

                if (target) {
                    target.click();
                }

            }

        });

    });


/* =========================================
   PROJECT MANAGEMENT
========================================= */

const projectModal =
    document.getElementById("projectModal");

const projectForm =
    document.getElementById("projectForm");

const addProjectBtn =
    document.getElementById("addProjectBtn");


function openProjectModal(project = null) {

    projectModal.classList.add("show");

    const title =
        document.getElementById("projectModalTitle");


    if (project) {

        title.textContent = "Edit Project";

        document.getElementById("projectId").value =
            project.id;

        document.getElementById("projectName").value =
            project.name;

        document.getElementById("projectCategory").value =
            project.category;

        document.getElementById("projectDescription").value =
            project.description;

        document.getElementById("projectTech").value =
            project.tech;

        document.getElementById("projectLive").value =
            project.live === "#" ? "" : project.live;

        document.getElementById("projectGithub").value =
            project.github === "#" ? "" : project.github;

    } else {

        title.textContent = "Add Project";

        projectForm.reset();

        document.getElementById("projectId").value = "";

    }

}


if (addProjectBtn) {

    addProjectBtn.addEventListener(
        "click",
        () => openProjectModal()
    );

}


projectForm.addEventListener("submit", event => {

    event.preventDefault();

    const projects = getProjects();

    const id =
        document.getElementById("projectId").value;


    const project = {

        id: id
            ? Number(id)
            : Date.now(),

        name:
            document.getElementById("projectName").value,

        category:
            document.getElementById("projectCategory").value,

        description:
            document.getElementById("projectDescription").value,

        tech:
            document.getElementById("projectTech").value,

        live:
            document.getElementById("projectLive").value || "#",

        github:
            document.getElementById("projectGithub").value || "#"

    };


    if (id) {

        const index =
            projects.findIndex(
                item => item.id === Number(id)
            );

        if (index !== -1) {
            projects[index] = project;
        }

    } else {

        projects.push(project);

    }


    saveProjects(projects);

    projectModal.classList.remove("show");

    renderAdminProjects();

    updateDashboardStats();

});


/* =========================================
   RENDER ADMIN PROJECTS
========================================= */

function renderAdminProjects() {

    const table =
        document.getElementById("adminProjectsTable");

    const projects = getProjects();

    table.innerHTML = "";


    projects.forEach(project => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${escapeHTML(project.name)}</strong>
            </td>

            <td>
                ${escapeHTML(project.category)}
            </td>

            <td>
                ${escapeHTML(project.tech)}
            </td>

            <td>

                <div class="table-actions">

                    <button
                        class="table-btn edit"
                        onclick="editProject(${project.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="table-btn delete"
                        onclick="deleteProject(${project.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;


        table.appendChild(row);

    });

}


/* =========================================
   EDIT PROJECT
========================================= */

window.editProject = function(id) {

    const project =
        getProjects().find(
            item => item.id === id
        );

    if (project) {
        openProjectModal(project);
    }

};


/* =========================================
   DELETE PROJECT
========================================= */

window.deleteProject = function(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this project?"
        );


    if (!confirmed) {
        return;
    }


    const projects =
        getProjects().filter(
            project => project.id !== id
        );


    saveProjects(projects);

    renderAdminProjects();

    updateDashboardStats();

};


/* =========================================
   BLOG MANAGEMENT
========================================= */

const blogModal =
    document.getElementById("blogModal");

const blogForm =
    document.getElementById("blogForm");

const addBlogBtn =
    document.getElementById("addBlogBtn");


function openBlogModal(blog = null) {

    blogModal.classList.add("show");


    if (blog) {

        document.querySelector(
            "#blogModal h2"
        ).textContent = "Edit Blog Article";


        document.getElementById("blogId").value =
            blog.id;

        document.getElementById("blogTitle").value =
            blog.title;

        document.getElementById("blogCategory").value =
            blog.category;

        document.getElementById("blogDescription").value =
            blog.description;

    } else {

        document.querySelector(
            "#blogModal h2"
        ).textContent = "Add Blog Article";

        blogForm.reset();

        document.getElementById("blogId").value = "";

    }

}


if (addBlogBtn) {

    addBlogBtn.addEventListener(
        "click",
        () => openBlogModal()
    );

}


blogForm.addEventListener("submit", event => {

    event.preventDefault();

    const blogs = getBlogs();

    const id =
        document.getElementById("blogId").value;


    const blog = {

        id: id
            ? Number(id)
            : Date.now(),

        title:
            document.getElementById("blogTitle").value,

        category:
            document.getElementById("blogCategory").value,

        description:
            document.getElementById("blogDescription").value

    };


    if (id) {

        const index =
            blogs.findIndex(
                item => item.id === Number(id)
            );

        if (index !== -1) {
            blogs[index] = blog;
        }

    } else {

        blogs.push(blog);

    }


    saveBlogs(blogs);

    blogModal.classList.remove("show");

    renderAdminBlogs();

    updateDashboardStats();

});


/* =========================================
   RENDER BLOGS
========================================= */

function renderAdminBlogs() {

    const table =
        document.getElementById("adminBlogsTable");

    const blogs = getBlogs();

    table.innerHTML = "";


    blogs.forEach(blog => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${escapeHTML(blog.title)}
                </strong>
            </td>

            <td>
                ${escapeHTML(blog.category)}
            </td>

            <td>

                <div class="table-actions">

                    <button
                        class="table-btn edit"
                        onclick="editBlog(${blog.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="table-btn delete"
                        onclick="deleteBlog(${blog.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;


        table.appendChild(row);

    });

}


window.editBlog = function(id) {

    const blog =
        getBlogs().find(
            item => item.id === id
        );

    if (blog) {
        openBlogModal(blog);
    }

};


window.deleteBlog = function(id) {

    if (
        !confirm(
            "Are you sure you want to delete this article?"
        )
    ) {
        return;
    }


    const blogs =
        getBlogs().filter(
            blog => blog.id !== id
        );


    saveBlogs(blogs);

    renderAdminBlogs();

    updateDashboardStats();

};


/* =========================================
   MESSAGES
========================================= */

function renderAdminMessages() {

    const table =
        document.getElementById("messagesTable");

    const messages =
        getMessages();


    table.innerHTML = "";


    if (messages.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="5"
                    style="text-align:center;color:#94a3b8">

                    No messages yet.

                </td>

            </tr>

        `;

        return;

    }


    messages.forEach(message => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(message.name)}
            </td>

            <td>
                ${escapeHTML(message.email)}
            </td>

            <td>
                ${escapeHTML(message.subject)}
            </td>

            <td>
                ${escapeHTML(
                    message.message.substring(0, 50)
                )}...
            </td>

            <td>

                <button
                    class="table-btn delete"
                    onclick="deleteMessage(${message.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


window.deleteMessage = function(id) {

    if (
        !confirm(
            "Delete this message?"
        )
    ) {
        return;
    }


    const messages =
        getMessages().filter(
            message => message.id !== id
        );


    saveMessages(messages);

    renderAdminMessages();

    updateDashboardStats();

};


/* =========================================
   SKILLS
========================================= */

let adminSkills =
    JSON.parse(
        localStorage.getItem("cadeauSkills") || "[]"
    );


if (adminSkills.length === 0) {

    adminSkills = [

        {
            name: "HTML5",
            level: 90
        },

        {
            name: "CSS3",
            level: 88
        },

        {
            name: "JavaScript",
            level: 82
        },

        {
            name: "React.js",
            level: 78
        },

        {
            name: "Node.js",
            level: 75
        },

        {
            name: "MongoDB",
            level: 72
        },

        {
            name: "Figma",
            level: 85
        },

        {
            name: "GitHub",
            level: 80
        }

    ];

    localStorage.setItem(
        "cadeauSkills",
        JSON.stringify(adminSkills)
    );

}


function renderAdminSkills() {

    const container =
        document.getElementById(
            "adminSkillsList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    adminSkills.forEach((skill, index) => {

        const item =
            document.createElement("div");

        item.className = "admin-skill";


        item.innerHTML = `

            <div class="admin-skill-top">

                <strong>
                    ${escapeHTML(skill.name)}
                </strong>

                <span>
                    ${skill.level}%
                </span>

            </div>

            <div class="progress">

                <span
                    style="width:${skill.level}%">
                </span>

            </div>

            <br>

            <button
                class="table-btn delete"
                onclick="deleteSkill(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        container.appendChild(item);

    });

}


const addSkillBtn =
    document.getElementById("addSkillBtn");


if (addSkillBtn) {

    addSkillBtn.addEventListener(
        "click",
        () => {

            const name =
                document.getElementById(
                    "newSkillName"
                ).value.trim();


            const level =
                Number(
                    document.getElementById(
                        "newSkillLevel"
                    ).value
                );


            if (!name || !level) {

                alert(
                    "Please enter the skill name and level."
                );

                return;

            }


            adminSkills.push({
                name,
                level
            });


            localStorage.setItem(
                "cadeauSkills",
                JSON.stringify(adminSkills)
            );


            document.getElementById(
                "newSkillName"
            ).value = "";


            document.getElementById(
                "newSkillLevel"
            ).value = "";


            renderAdminSkills();

        }
    );

}


window.deleteSkill = function(index) {

    adminSkills.splice(index, 1);

    localStorage.setItem(
        "cadeauSkills",
        JSON.stringify(adminSkills)
    );

    renderAdminSkills();

};


/* =========================================
   PROFILE
========================================= */

const saveProfileBtn =
    document.getElementById("saveProfileBtn");


if (saveProfileBtn) {

    saveProfileBtn.addEventListener(
        "click",
        () => {

            const profile = {

                name:
                    document.getElementById(
                        "profileName"
                    ).value,

                profession:
                    document.getElementById(
                        "profileProfession"
                    ).value,

                email:
                    document.getElementById(
                        "profileEmail"
                    ).value,

                location:
                    document.getElementById(
                        "profileLocation"
                    ).value,

                about:
                    document.getElementById(
                        "profileAbout"
                    ).value

            };


            localStorage.setItem(
                "cadeauProfile",
                JSON.stringify(profile)
            );


            document.getElementById(
                "profileSaveStatus"
            ).textContent =
                "Profile saved successfully.";

        }
    );

}


/* =========================================
   UPDATE DASHBOARD STATS
========================================= */

function updateDashboardStats() {

    const projects =
        getProjects();

    const blogs =
        getBlogs();

    const messages =
        getMessages();


    document.getElementById(
        "statProjects"
    ).textContent = projects.length;


    document.getElementById(
        "statBlogs"
    ).textContent = blogs.length;


    document.getElementById(
        "statMessages"
    ).textContent = messages.length;


    document.getElementById(
        "messageCount"
    ).textContent = messages.length;

}


/* =========================================
   CLOSE MODALS
========================================= */

document.querySelectorAll(
    "[data-close-modal]"
).forEach(button => {

    button.addEventListener("click", () => {

        const modalId =
            button.dataset.closeModal;

        document.getElementById(
            modalId
        ).classList.remove("show");

    });

});


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        });

    });


/* =========================================
   BLOG READ MORE
========================================= */

const articleModal =
    document.getElementById("articleModal");

const articleTitle =
    document.getElementById("articleTitle");

const articleContent =
    document.getElementById("articleContent");

const articleCategory =
    document.getElementById("articleCategory");


document.querySelectorAll(".read-more")
    .forEach(button => {

        button.addEventListener("click", () => {

            articleTitle.textContent =
                button.dataset.title;

            articleContent.textContent =
                button.dataset.content;

            articleCategory.textContent =
                "Article";

            articleModal.classList.add("show");

        });

    });


/* =========================================
   YEAR
========================================= */

document.getElementById(
    "currentYear"
).textContent =
    new Date().getFullYear();


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================
   INITIALIZE
========================================= */

renderAdminProjects();
renderAdminBlogs();
renderAdminMessages();
renderAdminSkills();
updateDashboardStats();