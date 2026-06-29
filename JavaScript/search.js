// search.js
// Owns the GitHub API fetch + error states (rate limit, not found, network error).
// Adds getProfile() onto GitHubProfileFinder's prototype.

GitHubProfileFinder.prototype.getProfile = async function (userName) {
    this.skeleton.style.display = "flex";
    this.profileContainer.innerHTML = "";

    try {
        const userRes = await fetch(`https://api.github.com/users/${userName}`);

        if (userRes.status === 403) {
            this.skeleton.style.display = "none";
            this.profileContainer.innerHTML = `
                <div class="error-box">
                    <p>⚠️ GitHub API rate limit exceeded.</p>
                    <p>Please try again in about an hour.</p>
                </div>
            `;
            return;
        }

        if (userRes.status === 404) {
            this.skeleton.style.display = "none";
            this.profileContainer.innerHTML = `
                <div class="error-box">
                    <p>User not found.</p>
                </div>
            `;
            return;
        }

        if (!userRes.ok) {
            throw new Error("Something went wrong fetching this user");
        }

        const data = await userRes.json();

        const repoRes = await fetch(`https://api.github.com/users/${userName}/repos`);
        const repos = await repoRes.json();

        // Sort repos by stars (highest first) by default
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        this.repos = repos;

        this.skeleton.style.display = "none";
        this.renderProfile(data, repos); // defined in profile.js
    } catch (error) {
        console.log(error);

        this.skeleton.style.display = "none";
        this.profileContainer.innerHTML = `
            <div class="error-box">
                <p>Something went wrong!</p>
            </div>
        `;
    }
};
