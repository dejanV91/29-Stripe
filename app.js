import sublinks from "./data.js";

const submenu = document.querySelectorAll(".submenus");
const centerSection = document.querySelector(".center-section");
const subElement = document.querySelector(".submenu");
const closeBtn = document.getElementById("close");
const menuBtn = document.querySelector("#menu");
const sidebar = document.querySelector(".sidebar");
const sidebarCenter = document.querySelector(".sidebar-center");

// sidebar
sidebarCenter.innerHTML = sublinks
    .map((item) => {
        const {page, links} = item;
        return `<article class="single-sidebar">
                    <h4 class="sidebar-title">${page}</h4>
                    <div class="list">
                    ${links.
                        map((single) => {
                            return ` <a href="${single.url}">
                                        <span class="material-symbols-outlined">${single.icon}</span>
                                        ${single.label}
                                    </a>`
                        }).join("")}
                    </div>
                </article>`
    }).join("");

// submenu elemnets
submenu.forEach((btn)=>{
    btn.addEventListener("mouseover", (e) => {
        const text = e.currentTarget.textContent;
        const temporBtn = e.currentTarget.getBoundingClientRect();
        const center = ((temporBtn.left + temporBtn.right)/2);
        const bottom = temporBtn.bottom;

        const tempPage = sublinks.find((link) => link.page === text);
        if(tempPage){
            const {page, links} = tempPage;
            subElement.classList.add("show");
            subElement.style.left = `${center}px`;
            subElement.style.top = `${bottom}px`;   
            
            let columns = "col-2";
            if (links.length === 3) {
                columns = "col-3";
            }
            if (links.length === 4) {
                columns = "col-4";
            }

            subElement.innerHTML = `<section>
                                        <!-- single -->
                                        <h3 class="title-submenu">
                                            ${text}
                                        </h3>
                                        <div class="links ${columns}">
                                        ${links
                                            .map((link) => {
                                                return ` <a href="${link.url}">
                                                            <span class="material-symbols-outlined">${link.icon}</span>
                                                            ${link.label}
                                                        </a>`
                                            }).join("")}
                                        </div>
                                        <!-- end single -->
                                    </section>`;
        }
    });
});

// EVENTS
centerSection.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("submenus")) {
        subElement.classList.remove("show");   
    }
});

menuBtn.addEventListener("click", () => {
    sidebar.classList.add("view");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("view");
});