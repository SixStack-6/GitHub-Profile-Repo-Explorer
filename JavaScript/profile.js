// profile.js
// Owns rendering the profile card and the repo list markup.
// Adds renderProfile() and buildRepoListHTML() onto the prototype.

GitHubProfileFinder.prototype.renderProfile = function (data, repos) {
    this.profileContainer.innerHTML = `
        <div class="profile-card">
            <img src="${data.avatar_url}" class="profile-avatar" alt="Avatar">

            <h2 class="profile-name">${data.name || data.login}</h2>

            <p class="profile-bio">${data.bio || "No bio available"}</p>

            <div class="profile-info">
                <p><i class="fa-solid fa-location-dot"></i> ${data.location || "Unknown"}</p>
                <p><i class="fa-solid fa-building"></i> ${data.company || "Not specified"}</p>
                <p><i class="fa-solid fa-calendar"></i> ${new Date(data.created_at).getFullYear()}</p>
            </div>

            <div class="stats-container">
                <div class="stat-item">
                    <p class="stat-number">${data.followers}</p>
                    <p class="stat-label">Followers</p>
                </div>
                <div class="stat-item">
                    <p class="stat-number">${data.following}</p>
                    <p class="stat-label">Following</p>
                </div>
                <div class="stat-item">
                    <p class="stat-number">${data.public_repos}</p>
                    <p class="stat-label">Repos</p>
                </div>
                <div class="stat-item">
                    <p class="stat-number">${data.public_gists}</p>
                    <p class="stat-label">Gists</p>
                </div>
            </div>

            ${
                data.blog
                    ? `<a href="${data.blog}" target="_blank" class="btn btn-purple">Visit Website</a>`
                    : ""
            }

            <a href="${data.html_url}" target="_blank" class="btn btn-green">
                Visit GitHub Profile
            </a>

            <h2 style="margin-top:20px;">Repositories</h2>

            <select id="sortRepos">
                <option value="stars">Sort by Stars</option>
                <option value="name">Sort by Name</option>
                <option value="updated">Sort by Last Updated</option>
            </select>

            <div class="repo-list" id="repo-list">
                ${this.buildRepoListHTML(repos)}
            </div>
        </div>
    `;

    document.getElementById("sortRepos").addEventListener("change", (e) => {
        this.sortRepos(e.target.value); // defined in sort.js
    });
};

GitHubProfileFinder.prototype.buildRepoListHTML = function (repos) {
    if (!repos.length) {
        return "<p>No repositories found.</p>";
    }

    return repos
        .map(
            (repo) => `
            <div class="repo-item">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <p>⭐ ${repo.stargazers_count} | ${repo.language || "N/A"}</p>
            </div>
        `
        )
        .join("");
};
