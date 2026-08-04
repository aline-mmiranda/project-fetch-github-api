// =====================
//   LANGUAGE COLORS
// =====================
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  Go: "#00add8",
  Rust: "#dea584",
  PHP: "#4f5d95",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Shell: "#89e051",
  Dart: "#00b4ab",
  Lua: "#000080",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
};

// =====================
//   CONSTANTS
// =====================
const HISTORY_KEY = "gh_profile_history";
const MAX_HISTORY = 5;

// =====================
//   DOM ELEMENTS
// =====================
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchHistory = document.getElementById("searchHistory");
const resultSection = document.getElementById("resultSection");

// =====================
//   HISTORY
// =====================
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveToHistory(username) {
  const history = getHistory().filter(
    (u) => u.toLowerCase() !== username.toLowerCase()
  );
  history.unshift(username);
  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history.slice(0, MAX_HISTORY))
  );
  renderHistory();
}

function renderHistory() {
  const history = getHistory();

  if (history.length === 0) {
    searchHistory.innerHTML = "";
    return;
  }

  searchHistory.innerHTML = `
    <span class="history-label">Recentes:</span>
    ${history
      .map(
        (u) => `
      <button class="history-pill" data-username="${u}">${u}</button>
    `
      )
      .join("")}
  `;

  searchHistory.querySelectorAll(".history-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const username = pill.dataset.username;
      searchInput.value = username;
      search(username);
    });
  });
}

// =====================
//   SKELETON
// =====================
function renderSkeleton() {
  const skeletonRepo = `
    <div class="skeleton-repo-card">
      <div class="skeleton skeleton-line w-70"></div>
      <div class="skeleton skeleton-line w-90"></div>
      <div class="skeleton skeleton-line w-50"></div>
      <div class="skeleton skeleton-line w-30" style="height: 10px; margin-top: 0.875rem;"></div>
    </div>
  `;

  resultSection.innerHTML = `
    <div class="skeleton-card">
      <div class="skeleton skeleton-strip"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-avatar"></div>
        <div class="skeleton skeleton-line w-50"></div>
        <div class="skeleton skeleton-line w-30"></div>
        <div class="skeleton skeleton-line w-90"></div>
        <div class="skeleton skeleton-line w-70"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat">
            <div class="skeleton skeleton-stat-num"></div>
            <div class="skeleton skeleton-stat-label"></div>
          </div>
          <div class="skeleton-stat">
            <div class="skeleton skeleton-stat-num"></div>
            <div class="skeleton skeleton-stat-label"></div>
          </div>
          <div class="skeleton-stat">
            <div class="skeleton skeleton-stat-num"></div>
            <div class="skeleton skeleton-stat-label"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="skeleton-repos">
      ${Array(6).fill(skeletonRepo).join("")}
    </div>
  `;
}

// =====================
//   ERROR STATES
// =====================
const ERROR_MESSAGES = {
  "not-found": {
    icon: "🔍",
    title: "Usuário não encontrado",
    message: "Verifique o nome de usuário e tente novamente.",
  },
  network: {
    icon: "📡",
    title: "Erro de conexão",
    message:
      "Não foi possível conectar à API do GitHub. Verifique sua conexão.",
  },
  "rate-limit": {
    icon: "⏱️",
    title: "Limite de requisições atingido",
    message:
      "A API do GitHub tem um limite de uso. Tente novamente em alguns minutos.",
  },
};

function renderError(type = "not-found") {
  const { icon, title, message } =
    ERROR_MESSAGES[type] || ERROR_MESSAGES["not-found"];

  resultSection.innerHTML = `
    <div class="error-card">
      <span class="error-icon" aria-hidden="true">${icon}</span>
      <p class="error-title">${title}</p>
      <p class="error-message">${message}</p>
    </div>
  `;
}

// =====================
//   HELPERS
// =====================
function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
}

function getLangColor(lang) {
  return LANG_COLORS[lang] || "#8b949e";
}

function buildMetaItem(svgPath, text) {
  if (!text) return "";
  return `
    <span class="meta-item">
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="${svgPath}"/>
      </svg>
      ${text}
    </span>
  `;
}

// =====================
//   RENDER PROFILE
// =====================
function renderProfile(user, repos) {
  // GitHub Octicon paths
  const ICONS = {
    company:
      "M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25v12.5ZM15 14.25a.25.25 0 0 1-.25.25H12v-1.25a.75.75 0 0 0-.75-.75h-1.5v-8H15a.25.25 0 0 1 .25.25Z",
    location:
      "m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.19 6.5 6.5 0 0 1 0 9.19Zm-1.06-8.13v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z",
    link: "m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 2 2 0 0 0 2.83 0l2.5-2.5a2 2 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a2 2 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 2 2 0 0 0-2.83 0l-2.5 2.5a2 2 0 0 0 0 2.83Z",
  };

  const metaItems = [
    user.company
      ? buildMetaItem(ICONS.company, user.company.replace(/^@/, ""))
      : "",
    user.location ? buildMetaItem(ICONS.location, user.location) : "",
    user.blog
      ? buildMetaItem(ICONS.link, user.blog.replace(/^https?:\/\//, ""))
      : "",
  ]
    .filter(Boolean)
    .join("");

  const reposHTML = repos
    .map(
      (repo) => `
    <a
      href="${repo.html_url}"
      target="_blank"
      rel="noopener noreferrer"
      class="repo-card"
      aria-label="Repositório ${repo.name}"
    >
      <span class="repo-name">${repo.name}</span>
      <span class="repo-description">${repo.description || "Sem descrição"}</span>
      <div class="repo-meta">
        ${
          repo.language
            ? `
          <span class="repo-lang">
            <span class="lang-dot" style="background: ${getLangColor(repo.language)}" aria-hidden="true"></span>
            ${repo.language}
          </span>
        `
            : ""
        }
        ${
          repo.stargazers_count > 0
            ? `
          <span class="repo-stat" aria-label="${repo.stargazers_count} estrelas">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
            </svg>
            ${repo.stargazers_count}
          </span>
        `
            : ""
        }
        ${
          repo.forks_count > 0
            ? `
          <span class="repo-stat" aria-label="${repo.forks_count} forks">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
            </svg>
            ${repo.forks_count}
          </span>
        `
            : ""
        }
      </div>
    </a>
  `
    )
    .join("");

  resultSection.innerHTML = `
    <div class="profile-card">
      <div class="profile-strip" aria-hidden="true"></div>
      <div class="profile-body">
        <img
          class="profile-avatar"
          src="${user.avatar_url}&s=176"
          alt="Avatar de ${user.login}"
          width="88"
          height="88"
        />
        <h1 class="profile-name">${user.name || user.login}</h1>
        <p class="profile-login">@${user.login}</p>
        ${user.bio ? `<p class="profile-bio">${user.bio}</p>` : ""}
        ${metaItems ? `<div class="profile-meta">${metaItems}</div>` : ""}
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-number">${formatNumber(user.public_repos)}</span>
            <span class="stat-label">Repositórios</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${formatNumber(user.followers)}</span>
            <span class="stat-label">Seguidores</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${formatNumber(user.following)}</span>
            <span class="stat-label">Seguindo</span>
          </div>
        </div>
      </div>
    </div>

    ${
      repos.length > 0
        ? `
      <p class="repos-header">Repositórios recentes</p>
      <div class="repos-grid">${reposHTML}</div>
    `
        : ""
    }
  `;
}

// =====================
//   MAIN SEARCH
// =====================
async function search(username) {
  const trimmed = username.trim();
  if (!trimmed) return;

  renderSkeleton();

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${trimmed}`),
      fetch(
        `https://api.github.com/users/${trimmed}/repos?sort=updated&per_page=6`
      ),
    ]);

    if (userRes.status === 404) {
      renderError("not-found");
      return;
    }

    if (userRes.status === 403) {
      renderError("rate-limit");
      return;
    }

    if (!userRes.ok) {
      renderError("network");
      return;
    }

    const [user, repos] = await Promise.all([
      userRes.json(),
      reposRes.json(),
    ]);

    saveToHistory(trimmed);
    renderProfile(user, Array.isArray(repos) ? repos : []);
  } catch {
    renderError("network");
  }
}

// =====================
//   EVENT LISTENERS
// =====================
searchButton.addEventListener("click", () => search(searchInput.value));

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") search(searchInput.value);
});

// =====================
//   INIT
// =====================
renderHistory();
