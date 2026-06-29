// sort.js
// Owns sorting the repo list (by stars / name / last updated) and
// re-rendering it. Also bootstraps the app once every piece is loaded.

GitHubProfileFinder.prototype.sortRepos = function (sortBy) {
    const sorted = [...this.repos];

    if (sortBy === "stars") {
        sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    this.renderRepoList(sorted);
};

GitHubProfileFinder.prototype.renderRepoList = function (repos) {
    const repoList = document.getElementById("repo-list");
    repoList.innerHTML = this.buildRepoListHTML(repos); // defined in profile.js
};

// bootstrap the app
new GitHubProfileFinder();
