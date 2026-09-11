export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  languages: string[];
}

const GITHUB_USERNAME = 'mnvvshu';

export async function fetchGitHubData(): Promise<GitHubData> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 },
    }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error('Failed to fetch GitHub data');
  }

  const user: GitHubUser = await userRes.json();
  const repos: GitHubRepo[] = await reposRes.json();

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  const languageSet = new Set<string>();
  repos.forEach((repo) => {
    if (repo.language) languageSet.add(repo.language);
  });

  return {
    user,
    repos: repos.filter((r) => r.name !== GITHUB_USERNAME),
    totalStars,
    languages: Array.from(languageSet),
  };
}
