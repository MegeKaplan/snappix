


const createPage = (pageData) => {
    console.log("-> " + pageData.class + " page");
    const main = document.querySelector("main")
    main.innerHTML = ""
    var page = document.createElement("div")
    page.innerHTML = pageData.inner
    page.classList.add("page")
    page.classList.add(pageData.class)
    main.appendChild(page)
}



export { createPage }