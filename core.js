// core.js
// Owns the class skeleton: DOM references, constructor, and the
// event listeners that kick off a search.

class GitHubProfileFinder {
    constructor() {
        this.searchBtn = document.getElementById("searchBtn");
        this.searchInput = document.getElementById("searchInput");
        this.skeleton = document.getElementById("skeleton");
        this.profileContainer = document.getElementById("profileContainer");
        this.repos = [];

        this.addEvents();
    }

    addEvents() {
        this.searchBtn.addEventListener("click", () => {
            let userName = this.searchInput.value.trim();

            if (userName.length === 0) {
                alert("Please enter a valid username");
                return;
            }

            this.getProfile(userName); // defined in search.js
            this.searchInput.value = "";
        });

        this.searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.searchBtn.click();
            }
        });
    }
}