{/* <nav class="side bottom">
        
    </nav> */}


const addNav = (userData) => {
    // Select body
    const body = document.querySelector("body")

    // Create Element
    var navEl = document.createElement("nav")
    navEl.innerHTML = `
    <div class="top">
        <a href="#" id="profileBtn"><img class="pp" src="${userData.profilePictureURL}" alt="profile picture"></a>
        <a href="#" id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></a>
        <a href="#" id="newPostBtn"><i class="fa-solid fa-plus"></i></a>
        <a href="#" id="discoverBtn"><i class="fa-regular fa-compass"></i></a>
        <a href="#" id="homeBtn"><i class="fa-solid fa-home"></i></a>
        <a href="#" class="messagesBtn pc"><i class="fa-solid fa-paper-plane"></i></a>
    </div>
    <div class="bottom pc">
        <a href="#" class="menuBtn"><i class="fa-solid fa-bars"></i></a>
    </div>
    `
    navEl.classList.add("side")
    navEl.classList.add("bottom")
    body.appendChild(navEl)
}


export { addNav }