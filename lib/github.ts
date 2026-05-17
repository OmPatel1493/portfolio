export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 }
    });
    
    if (!userResponse.ok) throw new Error("Failed to fetch user data");
    
    const userData = await userResponse.json();
    
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      next: { revalidate: 3600 }
    });
    
    if (!reposResponse.ok) throw new Error("Failed to fetch repos");
    
    const repos = await reposResponse.json();
    
    const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    
    const languageCounts: { [key: string]: number } = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });
    
    const totalRepos = Object.values(languageCounts).reduce((a: number, b: number) => a + b, 0);
    const topLanguages = Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalRepos) * 100)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
    
    return {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      topLanguages
    };
  } catch (error) {
    console.error("GitHub API error:", error);
    return {
      publicRepos: 0,
      followers: 0,
      following: 0,
      totalStars: 0,
      topLanguages: []
    };
  }
}
