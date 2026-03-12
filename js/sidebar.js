const sidebarContainer = document.querySelector("#sidebar-container");
const mainContainer = document.querySelector("#main-container");
const minimizeButton = document.querySelector("#minimize-button");

// Function to update sidebar state
function setSidebarState(isMinimized) {
    if (isMinimized) {
        sidebarContainer.classList.add("minimized");
        mainContainer.classList.add("minimized");
        minimizeButton.style.transform = "rotate(180deg)";
    } else {
        sidebarContainer.classList.remove("minimized");
        mainContainer.classList.remove("minimized");
        minimizeButton.style.transform = "rotate(0deg)";
    }
    sessionStorage.setItem("sidebarMinimized", isMinimized);
}

// Initial state from sessionStorage
const initialState = sessionStorage.getItem("sidebarMinimized") === "true";
setSidebarState(initialState);

minimizeButton.addEventListener("click", () => {
    const isCurrentlyMinimized = sidebarContainer.classList.contains("minimized");
    setSidebarState(!isCurrentlyMinimized);
});





