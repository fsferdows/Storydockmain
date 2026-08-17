/**
 * StoryDock — Core Application Engine & State Manager
 * Production-ready modular blogging and authentication architecture
 */

// Global Toast Notification System
window.showToast = function(message, type = "info") {
    let toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toastContainer";
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    
    let icon = "fa-info-circle";
    if (type === "success") icon = "fa-circle-check";
    if (type === "error") icon = "fa-circle-exclamation";
    if (type === "warning") icon = "fa-triangle-exclamation";

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add("fade-out");
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
};

// ==========================================================================
// Authentication & User Profile System
// ==========================================================================

const DEMO_USERS_DB = [
    {
        id: "usr_ferds",
        email: "ferds@storydock.io",
        password: "password123",
        name: "FS FERDOWS",
        handle: "@fsferdows",
        role: "Lead System Architect & Project Director",
        bio: "Directing distributed system topologies, state-machine resilience, zero-trust cloud infrastructure, and core architectural patterns for StoryDock.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250",
        location: "Dhaka, Bangladesh",
        website: "https://ferdows.dev",
        twitter: "fsferdows",
        linkedin: "fs-ferdows",
        github: "fsferdows"
    },
    {
        id: "usr_mehedi",
        email: "mehedi@storydock.io",
        password: "password123",
        name: "Mehedi Hasan",
        handle: "@mehedihasan",
        role: "Full-Stack Engineer & Core Infrastructure Specialist",
        bio: "Specializing in high-throughput Node.js microservices, resilient client-side storage synchronizers, and Markdown AST parsing engines.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250",
        location: "Dhaka, Bangladesh",
        website: "https://mehedihasan.dev",
        twitter: "mehedi_dev",
        linkedin: "mehedi-hasan-eng",
        github: "mehedihasan"
    },
    {
        id: "usr_taz",
        email: "taz@storydock.io",
        password: "password123",
        name: "TAZ",
        handle: "@taz_creator",
        role: "UI/UX Creative Technologist & Interaction Designer",
        bio: "Obsessed with mathematical optical hierarchy, fluid GSAP-inspired micro-interactions, dark/light design systems, and tactile ergonomics.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250",
        location: "Chittagong, Bangladesh",
        website: "https://tazdesign.io",
        twitter: "taz_ux",
        linkedin: "taz-creative",
        github: "tazcreator"
    },
    {
        id: "usr_jannat",
        email: "jannat@storydock.io",
        password: "password123",
        name: "Jannat",
        handle: "@jannat_qa",
        role: "Frontend Specialist & Quality Assurance Engineer",
        bio: "Championing accessible WCAG AA interfaces, cross-viewport responsive fluidity, Web Speech audio integration, and rigorous end-to-end QA.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250",
        location: "Sylhet, Bangladesh",
        website: "https://jannat.io",
        twitter: "jannat_dev",
        linkedin: "jannat-frontend",
        github: "jannatqa"
    },
    {
        id: "usr_alex",
        email: "alex@storydock.io",
        password: "password123",
        name: "Alex Morgan",
        handle: "@alexmorgan",
        role: "Principal Web Architect & Writer",
        bio: "Exploring high-throughput distributed systems, functional architecture, resilient cloud primitives, and mindful engineering practices.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250",
        location: "San Francisco, CA",
        website: "https://alexmorgan.dev",
        twitter: "alexmorgan",
        linkedin: "alex-morgan-tech",
        github: "alexmorgan"
    },
    {
        id: "usr_maya",
        email: "maya@storydock.io",
        password: "password123",
        name: "Maya Lin",
        handle: "@mayalin",
        role: "AI Researcher & Senior Editor",
        bio: "Specializing in Large Language Models, agentic reasoning loops, and neural interpretability. Writing about the future of cognitive computing.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250",
        location: "Seattle, WA",
        website: "https://mayalin.ai",
        twitter: "mayalin_ai",
        linkedin: "mayalin-research",
        github: "mayalin"
    },
    {
        id: "usr_jordan",
        email: "jordan@storydock.io",
        password: "password123",
        name: "Jordan Vance",
        handle: "@jordanvance",
        role: "Staff Cryptographer & Tech Essayist",
        bio: "Decentralized consensus mechanisms, zero-knowledge proofs, and sovereign identity primitives. Dedicated to open-source cryptographic transparency.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250",
        location: "Austin, TX",
        website: "https://jordanvance.io",
        twitter: "jordanvance",
        linkedin: "jordan-vance-crypto",
        github: "jvance"
    }
];

function getUsersDB() {
    try {
        const stored = localStorage.getItem("storydock_users_db");
        if (!stored) return DEMO_USERS_DB;
        let parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length === 0) return DEMO_USERS_DB;
        // Merge missing demo accounts
        let modified = false;
        DEMO_USERS_DB.forEach(demoU => {
            if (!parsed.some(u => u.id === demoU.id || u.email.toLowerCase() === demoU.email.toLowerCase())) {
                parsed.push(demoU);
                modified = true;
            }
        });
        if (modified) saveUsersDB(parsed);
        return parsed;
    } catch(e) {
        return DEMO_USERS_DB;
    }
}

function saveUsersDB(users) {
    localStorage.setItem("storydock_users_db", JSON.stringify(users));
}

// Ensure default users exist
if (!localStorage.getItem("storydock_users_db")) {
    saveUsersDB(DEMO_USERS_DB);
}

function getCurrentUser() {
    try {
        if (localStorage.getItem("storydock_is_logged_out") === "true") {
            return null;
        }
        const userStr = localStorage.getItem("storydock_auth_user");
        if (userStr) {
            const parsed = JSON.parse(userStr);
            if (parsed && parsed.email) return parsed;
        }
        // Default initial demo session with Alex Morgan for fresh visits
        const defaultUser = getUsersDB()[4] || getUsersDB()[0];
        localStorage.setItem("storydock_auth_user", JSON.stringify(defaultUser));
        return defaultUser;
    } catch(e) {
        return null;
    }
}

function setCurrentUser(user) {
    if (!user) {
        localStorage.removeItem("storydock_auth_user");
        localStorage.setItem("storydock_is_logged_out", "true");
    } else {
        localStorage.removeItem("storydock_is_logged_out");
        localStorage.setItem("storydock_auth_user", JSON.stringify(user));
        // Keep user in DB updated
        const db = getUsersDB();
        const idx = db.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
        if (idx !== -1) {
            db[idx] = { ...db[idx], ...user };
        } else {
            db.push(user);
        }
        saveUsersDB(db);
    }
    renderAuthNav();
}

function getUserProfile() {
    return getCurrentUser();
}

function saveUserProfile(profile) {
    const current = getCurrentUser();
    if (!current) {
        window.showToast("Please sign in to update your profile.", "warning");
        openAuthModal("login");
        return null;
    }
    const updated = { ...current, ...profile };
    setCurrentUser(updated);
    window.showToast("Profile updated successfully!", "success");
    return updated;
}

function resetUserProfile() {
    const defaultUser = DEMO_USERS_DB[4] || DEMO_USERS_DB[0];
    setCurrentUser(defaultUser);
    window.showToast("Profile reset to demo defaults.", "info");
    return defaultUser;
}

window.getCurrentUser = getCurrentUser;
window.setCurrentUser = setCurrentUser;
window.getUserProfile = getUserProfile;
window.saveUserProfile = saveUserProfile;
window.resetUserProfile = resetUserProfile;
window.getUsersDB = getUsersDB;

// Authentication Actions
window.loginUser = function(email, password) {
    const db = getUsersDB();
    const found = db.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
        window.showToast("No account found with this email address.", "error");
        return false;
    }
    if (found.password && found.password !== password) {
        window.showToast("Incorrect password. Please try again.", "error");
        return false;
    }
    localStorage.removeItem("storydock_is_logged_out");
    setCurrentUser(found);
    window.showToast(`Welcome back, ${found.name}!`, "success");
    closeAuthModal();
    setTimeout(() => {
        if (window.location.pathname.includes("profile.html") && typeof window.renderProfilePage === "function") {
            window.renderProfilePage();
        } else {
            window.location.reload();
        }
    }, 300);
    return true;
};

window.signupUser = function(userData) {
    const db = getUsersDB();
    const existing = db.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
        window.showToast("An account already exists with this email address.", "warning");
        return false;
    }
    const newUser = {
        id: `usr_${Date.now()}`,
        email: userData.email,
        password: userData.password,
        name: userData.name || "New Author",
        handle: `@${(userData.name || "author").toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        role: userData.role || "Contributing Writer",
        bio: userData.bio || "Passionate writer and reader on StoryDock.",
        avatar: userData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250",
        location: userData.location || "Global",
        website: userData.website || "",
        twitter: userData.twitter || "",
        linkedin: userData.linkedin || "",
        github: userData.github || ""
    };
    db.push(newUser);
    saveUsersDB(db);
    localStorage.removeItem("storydock_is_logged_out");
    setCurrentUser(newUser);
    window.showToast(`Welcome to StoryDock, ${newUser.name}!`, "success");
    closeAuthModal();
    setTimeout(() => { window.location.reload(); }, 300);
    return true;
};

window.logoutUser = function() {
    localStorage.removeItem("storydock_auth_user");
    localStorage.setItem("storydock_is_logged_out", "true");
    window.showToast("You have been signed out.", "info");
    renderAuthNav();
    setTimeout(() => {
        if (window.location.pathname.includes("profile.html") && typeof window.renderProfilePage === "function") {
            window.renderProfilePage();
        } else {
            window.location.reload();
        }
    }, 300);
};

window.quickSwitchAccount = function(userId) {
    const db = getUsersDB();
    const user = db.find(u => u.id === userId);
    if (user) {
        localStorage.removeItem("storydock_is_logged_out");
        setCurrentUser(user);
        window.showToast(`Switched account to ${user.name} (${user.role})`, "success");
        closeAuthModal();
        setTimeout(() => { 
            if (window.location.pathname.includes("profile.html") && typeof window.renderProfilePage === "function") {
                window.renderProfilePage();
            } else {
                window.location.reload();
            }
        }, 300);
    }
};

// Global Auth Modal Manager
window.openAuthModal = function(mode = "login") {
    let modal = document.getElementById("authModal");
    if (!modal) {
        createAuthModal();
        modal = document.getElementById("authModal");
    }
    switchAuthTab(mode);
    modal.classList.add("open");
};

window.closeAuthModal = function() {
    const modal = document.getElementById("authModal");
    if (modal) modal.classList.remove("open");
};

function switchAuthTab(mode) {
    const loginTab = document.getElementById("authTabLogin");
    const signupTab = document.getElementById("authTabSignup");
    const loginForm = document.getElementById("authLoginForm");
    const signupForm = document.getElementById("authSignupForm");

    if (!loginTab || !signupTab || !loginForm || !signupForm) return;

    if (mode === "login") {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupForm.style.display = "block";
        loginForm.style.display = "none";
    }
}

window.switchAuthTab = switchAuthTab;

function createAuthModal() {
    const div = document.createElement("div");
    div.id = "authModal";
    div.className = "auth-modal-backdrop";
    div.innerHTML = `
        <div class="auth-modal-dialog">
            <button class="auth-close-btn" onclick="closeAuthModal()" aria-label="Close dialog">&times;</button>
            <div class="auth-modal-header">
                <div class="auth-logo-badge">
                    <img src="assets/images/logo.svg" alt="StoryDock Logo">
                    <span>StoryDock Auth</span>
                </div>
                <h2>Join the Global Publishing Community</h2>
                <p>Sign in to publish stories, leave comments, clap for authors, and manage your portfolio.</p>
            </div>

            <!-- Quick Demo Accounts Switcher -->
            <div class="auth-demo-picker">
                <span class="demo-picker-label"><i class="fa-solid fa-bolt text-yellow"></i> One-Click Demo Sign-in:</span>
                <div class="demo-accounts-row">
                    <button type="button" class="demo-account-chip" onclick="quickSwitchAccount('usr_alex')">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" alt="Alex">
                        <span>Alex (Architect)</span>
                    </button>
                    <button type="button" class="demo-account-chip" onclick="quickSwitchAccount('usr_maya')">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60" alt="Maya">
                        <span>Maya (AI Editor)</span>
                    </button>
                    <button type="button" class="demo-account-chip" onclick="quickSwitchAccount('usr_jordan')">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60" alt="Jordan">
                        <span>Jordan (Crypto)</span>
                    </button>
                </div>
            </div>

            <div class="auth-tabs">
                <button type="button" id="authTabLogin" class="auth-tab-btn active" onclick="switchAuthTab('login')">
                    <i class="fa-solid fa-right-to-bracket"></i> Sign In
                </button>
                <button type="button" id="authTabSignup" class="auth-tab-btn" onclick="switchAuthTab('signup')">
                    <i class="fa-solid fa-user-plus"></i> Create Account
                </button>
            </div>

            <!-- Sign In Form -->
            <form id="authLoginForm" class="auth-form" onsubmit="event.preventDefault(); handleLoginForm();">
                <div class="form-group">
                    <label for="loginEmail">Email Address</label>
                    <input type="email" id="loginEmail" required placeholder="alex@storydock.io" value="alex@storydock.io">
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" required placeholder="••••••••" value="password123">
                </div>
                <button type="submit" class="auth-submit-btn">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In to StoryDock
                </button>
            </form>

            <!-- Sign Up Form -->
            <form id="authSignupForm" class="auth-form" style="display: none;" onsubmit="event.preventDefault(); handleSignupForm();">
                <div class="form-group">
                    <label for="signupName">Full Name</label>
                    <input type="text" id="signupName" required placeholder="Elena Rostova">
                </div>
                <div class="form-group">
                    <label for="signupEmail">Email Address</label>
                    <input type="email" id="signupEmail" required placeholder="elena@example.com">
                </div>
                <div class="form-group">
                    <label for="signupRole">Title / Role</label>
                    <input type="text" id="signupRole" placeholder="Staff Software Engineer & Writer">
                </div>
                <div class="form-group">
                    <label for="signupPassword">Password</label>
                    <input type="password" id="signupPassword" required placeholder="Minimum 6 characters">
                </div>
                <button type="submit" class="auth-submit-btn">
                    <i class="fa-solid fa-user-check"></i> Register Account
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(div);
    div.addEventListener("click", (e) => {
        if (e.target === div) closeAuthModal();
    });
}

function handleLoginForm() {
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();
    if (!email || !pass) {
        window.showToast("Please provide both email and password.", "warning");
        return;
    }
    window.loginUser(email, pass);
}

function handleSignupForm() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const role = document.getElementById("signupRole").value.trim();
    const pass = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !pass) {
        window.showToast("Please fill in all required fields.", "warning");
        return;
    }
    if (pass.length < 4) {
        window.showToast("Password must be at least 4 characters.", "warning");
        return;
    }

    window.signupUser({
        name,
        email,
        role: role || "Author & Contributor",
        password: pass,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250"
    });
}

// Universal Navbar Auth Injection
function renderAuthNav() {
    const navActions = document.querySelector(".nav-actions");
    if (!navActions) return;

    let authPill = document.getElementById("navAuthPill");
    if (!authPill) {
        authPill = document.createElement("div");
        authPill.id = "navAuthPill";
        authPill.className = "nav-auth-pill-wrapper";
        // Insert right before the theme toggle button or at the start of actions
        const themeBtn = document.getElementById("themeBtn");
        if (themeBtn) {
            navActions.insertBefore(authPill, themeBtn);
        } else {
            navActions.prepend(authPill);
        }
    }

    const user = getCurrentUser();
    if (user && user.email) {
        authPill.innerHTML = `
            <div class="user-nav-dropdown">
                <button type="button" class="user-pill-btn" id="userPillBtn" onclick="toggleUserDropdown(event)">
                    <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" alt="${escapeAttr(user.name)}" class="user-nav-avatar">
                    <span class="user-nav-name">${escapeHTML(user.name.split(' ')[0])}</span>
                    <i class="fa-solid fa-chevron-down user-pill-chevron"></i>
                </button>
                <div class="user-menu-dropdown" id="userMenuDropdown">
                    <div class="dropdown-user-header">
                        <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" alt="${escapeAttr(user.name)}" class="dropdown-avatar-lg">
                        <div class="dropdown-user-info">
                            <strong>${escapeHTML(user.name)}</strong>
                            <span>${escapeHTML(user.handle || user.email)}</span>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="profile.html" class="dropdown-link"><i class="fa-solid fa-id-card"></i> View Author Profile</a>
                    <a href="create.html" class="dropdown-link"><i class="fa-solid fa-pen-nib"></i> Write New Story</a>
                    <a href="javascript:void(0)" onclick="openAnalyticsModal()" class="dropdown-link"><i class="fa-solid fa-chart-pie"></i> Platform Insights</a>
                    <a href="javascript:void(0)" onclick="openAuthModal('login')" class="dropdown-link"><i class="fa-solid fa-users"></i> Switch Demo Account</a>
                    <div class="dropdown-divider"></div>
                    <button type="button" class="dropdown-logout-btn" onclick="logoutUser()">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                    </button>
                </div>
            </div>
        `;
    } else {
        authPill.innerHTML = `
            <button type="button" class="nav-signin-btn" onclick="openAuthModal('login')">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                <span>Sign In</span>
            </button>
        `;
    }

    // Update floating mobile menu auth links
    const floatingMenu = document.getElementById("floatingMenu");
    if (floatingMenu) {
        let mobileAuthRow = document.getElementById("mobileAuthMenuRow");
        if (!mobileAuthRow) {
            mobileAuthRow = document.createElement("div");
            mobileAuthRow.id = "mobileAuthMenuRow";
            mobileAuthRow.style.marginTop = "12px";
            mobileAuthRow.style.paddingTop = "12px";
            mobileAuthRow.style.borderTop = "1px solid var(--border)";
            floatingMenu.appendChild(mobileAuthRow);
        }
        if (user && user.email) {
            mobileAuthRow.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; margin-bottom:8px; background:rgba(37,99,235,0.06); border-radius:10px;">
                    <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
                    <div style="font-size:12.5px; line-height:1.2;">
                        <strong style="color:var(--secondary);">${escapeHTML(user.name)}</strong>
                        <div style="color:var(--muted); font-size:11px;">Signed in</div>
                    </div>
                </div>
                <a href="javascript:void(0)" onclick="logoutUser(); closeMenu();" class="menu-link" style="color:#ef4444;"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</a>
            `;
        } else {
            mobileAuthRow.innerHTML = `
                <button type="button" onclick="openAuthModal('login'); closeMenu();" class="btn-primary" style="width:100%; padding:10px 14px; font-size:13.5px; justify-content:center; margin-bottom:8px;">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In to StoryDock
                </button>
                <button type="button" onclick="openAuthModal('signup'); closeMenu();" class="btn-secondary" style="width:100%; padding:9px 14px; font-size:13px; justify-content:center;">
                    <i class="fa-solid fa-user-plus"></i> Create Free Account
                </button>
            `;
        }
    }
}

window.toggleUserDropdown = function(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById("userMenuDropdown");
    if (dropdown) dropdown.classList.toggle("open");
};

document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("userMenuDropdown");
    const btn = document.getElementById("userPillBtn");
    if (dropdown && dropdown.classList.contains("open") && !dropdown.contains(e.target) && (!btn || !btn.contains(e.target))) {
        dropdown.classList.remove("open");
    }
});

// Auto-run on DOM ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAuthNav);
} else {
    renderAuthNav();
}

// Escape helpers for safe template string rendering
function escapeHTML(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
window.escapeHTML = escapeHTML;

function escapeAttr(str) {
    if (!str) return "";
    return String(str).replace(/'/g, "\\'").replace(/"/g, "&quot;");
}
window.escapeAttr = escapeAttr;

// Global Social Sharing Actions
window.shareStoryToTwitter = function(id, title) {
    const origin = window.location.origin;
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const url = `${origin}${path}view.html?id=${id}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title || "Check out this story on StoryDock")}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
};

window.shareStoryToLinkedIn = function(id, title) {
    const origin = window.location.origin;
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const url = `${origin}${path}view.html?id=${id}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
};

window.copyStoryLink = function(id) {
    const origin = window.location.origin;
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const url = `${origin}${path}view.html?id=${id}`;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            window.showToast("Story link copied to clipboard!", "success");
        }).catch(() => {
            promptCopyFallback(url);
        });
    } else {
        promptCopyFallback(url);
    }
};

function promptCopyFallback(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand("copy");
        window.showToast("Story link copied to clipboard!", "success");
    } catch(e) {
        window.showToast("Copy failed, please copy manually: " + text, "warning");
    }
    document.body.removeChild(tempInput);
}

// ==========================================================================
// 10 Comprehensive Production Seed Articles
// ==========================================================================

const defaultBlogs = [
    {
        id: 101,
        title: "Architecting Scalable Micro-Frontends with Modern Web Standards",
        author: "Alex Morgan",
        authorRole: "Principal Web Architect",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Technology",
        tags: ["Architecture", "JavaScript", "WebDev", "Performance"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
        imageCaption: "Micro-frontend topology and dynamic module federations across distributed cloud systems.",
        content: `### The Paradigm Shift in Modern Frontend Architecture

Modern enterprise web applications have outgrown monolithic frontend repositories. As engineering organizations scale to hundreds of developers across distributed squads, maintaining a single codebase becomes an operational bottleneck.

\`\`\`typescript
interface MicroFrontendConfig {
  name: string;
  entry: string;
  dependencies: Record<string, string>;
  sharedState: () => Observable<GlobalAppState>;
}
\`\`\`

#### Key Architectural Principles

1. **Autonomous Deployment Cycles**: Each micro-app must possess its own independent continuous deployment pipeline without cross-team locking.
2. **Framework Agnosticism**: Squads should be empowered to leverage the best tools for their specific domain without imposing global constraints.
3. **Resilient Shell Boundaries**: If an isolated micro-frontend encounters a runtime failure, the outer application frame isolates the fault and renders a graceful fallback interface.

> "True system modularity is not achieved by separating files, but by decoupling failure domains and operational velocity."

#### Performance Considerations

When assembling runtime dependencies dynamically, asset duplication can severely degrade client-side performance. Implementing shared module federations with caching headers mitigates memory spikes and bandwidth saturation across high-density client sessions.`,
        date: "16 Aug 2026",
        likes: 184,
        views: 2420
    },
    {
        id: 102,
        title: "The Cognitive Psychology of Intuitive User Interfaces",
        author: "Marcus Vance",
        authorRole: "Human Factors Researcher & UI Lead",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        category: "Lifestyle",
        tags: ["UXDesign", "Psychology", "CognitiveScience", "Product"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200",
        imageCaption: "Spatial hierarchy, optical balance, and cognitive chunking in minimalist interface design.",
        content: `### Mental Models and Cognitive Load in Digital Spaces

Every interaction with digital software forces the human prefrontal cortex to process optical, spatial, and semantic cues. When interface patterns conflict with established mental models, user frustration accelerates exponentially.

#### Miller's Law & Spatial Chunking

Human working memory can comfortably hold approximately **7 (± 2) items** simultaneously. In dense analytical dashboards, interface designers must apply hierarchical chunking to prevent cognitive fatigue.

* **Fitts's Law**: Target acquisition time is a mathematical function of the distance to and width of the target element.
* **Hick's Law**: Decision time increases logarithmically with the number and complexity of available choices.
* **Jakob's Law**: Users spend most of their time on other websites, meaning they inherently expect your site to follow conventional mental layouts.

> "A great user interface does not feel like software; it feels like an effortless extension of the user's intent."`,
        date: "14 Aug 2026",
        likes: 142,
        views: 1890
    },
    {
        id: 103,
        title: "Deep Dive into TypeScript 5.5 Inferred Type Predicates",
        author: "Alex Morgan",
        authorRole: "Core Compiler Contributor",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Programming",
        tags: ["TypeScript", "Compilers", "JavaScript", "CleanCode"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
        imageCaption: "Compiler AST transformations and type narrowing pipelines in TypeScript 5.5.",
        content: `### Eliminating Manual Type Guards with Compiler Intelligence

One of the most requested features in the TypeScript ecosystem was automatic inference of type predicates for filter methods. Prior to modern compiler enhancements, developers frequently had to author repetitive boilerplate type assertions.

\`\`\`typescript
// Automatically infers (x is string) without manual type predicates!
const rawValues: (string | null | undefined)[] = ["alpha", null, "beta", undefined, "gamma"];
const cleanStrings = rawValues.filter(x => x !== null && x !== undefined);

console.log(cleanStrings.map(s => s.toUpperCase()));
// Output: ["ALPHA", "BETA", "GAMMA"]
\`\`\`

#### Why This Matters for Production Robustness

1. **Reduces Human Error**: Manual type predicates could drift over time if an author inadvertently returned true on an unchecked property.
2. **Cleaner Functional Pipelines**: Declarative collection processing functions (\`Array.prototype.filter\`, \`flatMap\`, and \`reduce\`) now preserve exact narrowed types natively without casting.`,
        date: "12 Aug 2026",
        likes: 216,
        views: 3140
    },
    {
        id: 104,
        title: "Mindful Engineering: Sustainable Habits for Remote Developers",
        author: "Amina Al-Mansoor",
        authorRole: "Engineering Wellness Advocate",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        category: "Education",
        tags: ["Wellness", "Productivity", "RemoteWork", "Mindfulness"],
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200",
        imageCaption: "Mindful engineering sanctuary and focus protocols for asynchronous remote creators.",
        content: `### Navigating the Always-On Paradox of Modern Knowledge Work

Remote work offers unparalleled autonomy and geographical freedom, yet it poses distinct cognitive risks if boundaries between professional exertion and restorative solitude dissolve.

#### Practical Protocols for Deep Focus

* **Ultradian Rhythm Management**: Schedule work sessions in 90-minute concentrated intervals followed by 15 minutes of screen-free disengagement.
* **Context Switching Minimization**: Batch code reviews, asynchronous pull request discussions, and team syncs into designated calendar clusters.
* **Digital Sunset Protocol**: Terminate high-intensity screen exposure 60 minutes prior to sleep to promote natural circadian melatonin synthesis.

> "Rest is not the reward for finished work; it is the prerequisite for meaningful craftsmanship."`,
        date: "10 Aug 2026",
        likes: 98,
        views: 1240
    },
    {
        id: 105,
        title: "The Solo Nomad's Guide to Exploring the Japanese Alps",
        author: "Kaito Tanaka",
        authorRole: "Travel Documentarian",
        authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
        category: "Travel",
        tags: ["Travel", "Japan", "Adventure", "Photography"],
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
        imageCaption: "Panoramic autumn morning over the snow-dusted ridges of the Japanese Alps.",
        content: `### High Peaks, Ancient Onsens, and Sacred Cedars

From the historic post towns of the Nakasendo trail to the snow-crested ridges of Kamikochi, the Chubu region of Japan represents one of the world's most serene wilderness environments.

#### Essential Expedition Planning

1. **The Tateyama Kurobe Alpine Route**: Traversing the monumental 20-meter snow corridor in early spring via electric trolley buses and ropeways.
2. **Thermal Springs Etiquette**: Visiting century-old natural onsen baths nestled in cedar ravines requires respectful cultural compliance with quiet contemplative norms.
3. **Pack Lightweight**: Rugged alpine trails reward ultralight gear configurations and weatherproof layers.`,
        date: "08 Aug 2026",
        likes: 165,
        views: 2180
    },
    {
        id: 106,
        title: "Demystifying Large Language Models: From Attention Layers to Autonomous Agents",
        author: "Maya Lin",
        authorRole: "AI Researcher & Senior Editor",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        category: "Technology",
        tags: ["AI", "MachineLearning", "Transformers", "LLMs"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200",
        imageCaption: "Neural attention weights and multi-head token routing in modern foundational models.",
        content: `### The Mathematical Foundation of Self-Attention

Transformers revolutionized natural language processing by replacing recurrent sequence architectures with parallel self-attention mechanisms. At its core, the attention formula computes relevance scores across arbitrary token pairs:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

#### Autonomous Agent Loops & Tool Execution

Modern reasoning architectures extend foundational models into active problem solvers:

1. **Observation & Prompt Ingestion**: The agent perceives state changes and environment inputs.
2. **Chain-of-Thought Formulation**: Deconstructing ambiguous objectives into deterministic sub-goals.
3. **Tool Calling & Verification**: Invoking verified external APIs, evaluating outputs, and revising execution plans dynamically.`,
        date: "06 Aug 2026",
        likes: 245,
        views: 3890
    },
    {
        id: 107,
        title: "Zero-Knowledge Proofs and the Future of Sovereign Identity",
        author: "Jordan Vance",
        authorRole: "Staff Cryptographer & Tech Essayist",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        category: "Programming",
        tags: ["Cryptography", "Security", "Privacy", "Web3"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200",
        imageCaption: "Cryptographic circuit validation and succinct non-interactive arguments of knowledge (zk-SNARKs).",
        content: `### Proving Truth Without Revealing Secrets

Zero-Knowledge Proofs (ZKPs) allow a prover to mathematically demonstrate to a verifier that a statement is true, without divulging any supplemental information beyond the statement's validity.

#### Core Cryptographic Properties:

* **Completeness**: If the statement is true, an honest verifier will be convinced by an honest prover.
* **Soundness**: A dishonest prover cannot forge a valid proof for a false statement except with negligible probability.
* **Zero-Knowledge**: The verifier learns nothing other than the fact that the statement is true.

Applying zk-SNARKs to digital authentication empowers users to verify age, residency, or accreditation without leaking personal identifying records to centralized servers.`,
        date: "04 Aug 2026",
        likes: 178,
        views: 2310
    },
    {
        id: 108,
        title: "Biophilic Architecture: Reconnecting Urban Living with Living Nature",
        author: "Sophia Rodriguez",
        authorRole: "Sustainable Design Director",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Lifestyle",
        tags: ["Architecture", "Sustainability", "Design", "Urbanism"],
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200",
        imageCaption: "Vertical forest terraces, natural circadian lighting, and organic raw timber finishes.",
        content: `### Restoring Human Well-Being Through Living Spaces

As metropolitan density expands, our daily connection to organic ecosystems diminishes. Biophilic architecture integrates direct nature, indirect natural materials, and spatial conditions that nurture human psychological wellness.

#### 3 Essential Pillars of Biophilic Spaces:

1. **Direct Environmental Experience**: Incorporating daylight rhythms, natural airflow circulation, living botanical walls, and acoustic water elements.
2. **Indirect Natural Analogues**: Utilizing non-toxic organic materials, timber textures, clay plasters, and fractal geometric patterns.
3. **Spatial Sanctuary & Refuge**: Creating quiet alcoves with panoramic sightlines that induce feelings of safety and focused calm.`,
        date: "02 Aug 2026",
        likes: 134,
        views: 1740
    },
    {
        id: 109,
        title: "High-Performance CSS: Sub-pixel Rendering and Composite Layers",
        author: "Alex Morgan",
        authorRole: "Principal Web Architect",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Programming",
        tags: ["CSS", "Performance", "Frontend", "Browsers"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200",
        imageCaption: "GPU hardware acceleration layers and paint lifecycle optimization in modern browser engines.",
        content: `### Unlocking 120 FPS Fluidity in Modern Browsers

Rendering bottlenecks in web applications frequently trace back to unintended layout recalculations and main-thread paint operations. Understanding how browser compositor threads operate is vital for stutter-free user experiences.

\`\`\`css
/* Promote critical animated nodes to dedicated GPU compositor layers */
.smooth-card-transition {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
}
\`\`\`

#### The Golden Rules of Compositor Optimization:

* Animate ONLY \`transform\` and \`opacity\` properties whenever possible.
* Avoid querying layout properties (\`offsetHeight\`, \`getBoundingClientRect\`) inside high-frequency scroll or resize listeners.
* Implement \`contain: layout paint\` on complex repeating lists to prevent layout thrashing from propagating up the DOM tree.`,
        date: "30 Jul 2026",
        likes: 198,
        views: 2950
    },
    {
        id: 110,
        title: "The Art of Slow Journalism in an Era of Algorithmic Noise",
        author: "David Kim",
        authorRole: "Managing Editor & Essayist",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        category: "Education",
        tags: ["Journalism", "Media", "Philosophy", "Essays"],
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200",
        imageCaption: "Typeset manuscripts, contemplative long-form journalism, and editorial integrity.",
        content: `### Reclaiming Depth Over Velocity

In an internet economy incentivized by split-second clicks and viral sensationalism, slow journalism provides a necessary counterbalance. By prioritizing investigative depth, meticulous fact-checking, and narrative nuance, long-form publishing restores trust in human storytelling.

#### Why Slow Storytelling Matters:

1. **Context Over Breaking Alerts**: Real understanding requires historical framing rather than disjointed notifications.
2. **Ethical Verification**: Resisting the urge to publish prematurely guarantees rigor and respect for all parties.
3. **Enduring Value**: Thoughtful essays remain relevant for years, whereas clickbait degrades within hours.

> "We do not write to fill silence; we write to illuminate what deserves to be remembered."`,
        date: "28 Jul 2026",
        likes: 212,
        views: 3120
    },
    {
        id: 111,
        title: "Designing Resilient Distributed Event-Driven Architectures",
        author: "FS FERDOWS",
        authorRole: "Lead System Architect & Project Director",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Technology",
        tags: ["DistributedSystems", "Kafka", "EventDriven", "Architecture"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
        imageCaption: "Event streaming topologies, idempotency guarantees, and distributed state consensus.",
        content: `### Orchestrating Asynchronous Event Streams at Scale

In high-concurrency enterprise ecosystems, synchronous RPC communication introduces tight coupling, cascading latency, and single points of failure. Transitioning to event-driven architectures decouples producers from consumers and guarantees operational durability.

\`\`\`typescript
interface DomainEvent<T> {
  eventId: string;
  aggregateId: string;
  timestamp: number;
  version: number;
  payload: T;
  metadata: {
    correlationId: string;
    causationId: string;
    sourceService: string;
  };
}
\`\`\`

#### Key Tenets of Resilient Messaging

1. **Strict Idempotency**: Consumers must gracefully handle duplicate deliveries without state corruption using transactional outbox tables and deduplication keys.
2. **Backpressure & Partitioning**: Distributing partition keys uniformly prevents hot partitions and enables horizontal consumer group scaling.
3. **Dead Letter Queue (DLQ) Triage**: Malformed payloads or transient failures must be routed to isolated triage channels with automated backoff retry logic.

> "A system is not truly distributed until network partitions and packet drops are treated as first-class citizens of the design."`,
        date: "26 Jul 2026",
        likes: 284,
        views: 4120
    },
    {
        id: 112,
        title: "Building Fault-Tolerant High-Concurrency Node.js Microservices",
        author: "Mehedi Hasan",
        authorRole: "Full-Stack Engineer & Core Infrastructure Specialist",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        category: "Programming",
        tags: ["NodeJS", "Backend", "Microservices", "Performance"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
        imageCaption: "Event loop concurrency, non-blocking I/O scheduling, and clustered process management.",
        content: `### Maximizing Libuv Throughput and Eliminating Event Loop Starvation

Node.js delivers immense throughput through its single-threaded event loop paired with Libuv's thread pool. However, unoptimized CPU-bound operations can block the main thread and degrade overall request handling.

\`\`\`javascript
// Utilizing Worker Threads for CPU-intensive hashing and Markdown AST processing
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

if (isMainThread) {
  export function parseMarkdownInBackground(rawText) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('./parserWorker.js', import.meta.url), {
        workerData: { text: rawText }
      });
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
}
\`\`\`

#### Production Hardening Protocols:

* **Graceful Shutdown Lifecycles**: Intercept \`SIGTERM\` / \`SIGINT\` signals, terminate open keep-alive connections, and drain queued database transactions safely.
* **Circuit Breakers**: Implement sliding-window circuit breakers (such as Opossum) to isolate failing downstream APIs before exhausting socket pools.
* **Cluster Forking**: Spawn cluster workers matching CPU cores with zero-downtime rolling reload configurations.`,
        date: "24 Jul 2026",
        likes: 238,
        views: 3490
    },
    {
        id: 113,
        title: "Next-Level Motion Design: Micro-Interactions and Spatial Fluidity",
        author: "TAZ",
        authorRole: "UI/UX Creative Technologist & Interaction Designer",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        category: "Lifestyle",
        tags: ["UIUX", "MotionDesign", "Animation", "DesignSystems"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
        imageCaption: "Mathematical easing curves, physics-based springs, and tactile spatial feedback.",
        content: `### Motion as a Semantic Communication Layer

Animation in user interfaces is not merely aesthetic ornamentation; it is the visual language that guides cognitive focus, establishes spatial relationships, and provides tactile confirmation of intent.

#### The 3 Laws of Choreographed Motion:

1. **Proportional Duration**: Micro-interactions (hover, button press) should complete in **150ms–250ms**, while macro state transitions (modal entry, page routes) should range between **300ms–450ms**.
2. **Asymmetric Easing Curves**: Objects entering the viewport should decelerate smoothly (\`cubic-bezier(0.16, 1, 0.3, 1)\`), whereas exiting objects should accelerate out rapidly.
3. **Spatial Continuity**: Shared elements (such as expanding article cards) must maintain visual anchor points across coordinate spaces.

> "When motion is designed with mathematical rhythm, the interface ceases to feel digital and begins to feel physical."`,
        date: "22 Jul 2026",
        likes: 295,
        views: 4310
    },
    {
        id: 114,
        title: "Accessible Web Applications: WCAG AA Design Systems in Practice",
        author: "Jannat",
        authorRole: "Frontend Specialist & Quality Assurance Engineer",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        category: "Education",
        tags: ["Accessibility", "A11y", "WCAG", "FrontendQA"],
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200",
        imageCaption: "Screen reader tree inspection, keyboard navigation rings, and inclusive semantic markup.",
        content: `### Universal Inclusion by Architectural Default

Digital accessibility (a11y) is a fundamental human right. Building inclusive web applications requires designing for screen readers, keyboard-only power users, and varying visual perceptual abilities from day one.

\`\`\`html
<!-- Accessible Custom Disclosure Component -->
<button 
  type="button"
  aria-expanded="false" 
  aria-controls="filterMenu"
  class="accessible-btn"
  id="filterTrigger">
  <span>Filter Stories</span>
  <span class="sr-only">(Opens filter options)</span>
</button>
\`\`\`

#### Key Accessibility Checkpoints:

* **Contrast Ratios**: Maintain minimum 4.5:1 contrast for regular text and 3:1 for large headers against backgrounds across both light and dark themes.
* **Full Keyboard Operability**: Ensure interactive controls possess visible focus rings with \`:focus-visible\` and logical tab order sequences.
* **Live Regions**: Dispatch non-disruptive notifications to assistive technology using \`aria-live="polite"\` attributes.`,
        date: "20 Jul 2026",
        likes: 189,
        views: 2670
    },
    {
        id: 115,
        title: "Quantum Algorithms and the Era of Post-Quantum Cryptography",
        author: "Jordan Vance",
        authorRole: "Staff Cryptographer & Tech Essayist",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        category: "Technology",
        tags: ["Quantum", "Cryptography", "Security", "Algorithms"],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200",
        imageCaption: "Quantum superposition state vectors, Shor's algorithm factoring, and lattice-based cryptography.",
        content: `### Preparing Global Security Infrastructures for Q-Day

With rapid advancements in superconducting qubits and fault-tolerant quantum error correction, classical public-key cryptography (RSA and ECC) faces inevitable obsolescence due to Shor's factoring algorithm.

#### Lattice-Based Cryptographic Primitives:

* **ML-KEM (CRYSTALS-Kyber)**: Chosen by NIST as the global standard for quantum-resistant key encapsulation mechanisms.
* **ML-DSA (CRYSTALS-Dilithium)**: Providing ultra-secure digital signature validation based on the hardness of modular lattice problems.
* **Hybrid Key Exchanges**: Implementing TLS handshakes combining classical Elliptic Curve Diffie-Hellman with post-quantum lattice algorithms during transition periods.`,
        date: "18 Jul 2026",
        likes: 215,
        views: 3200
    },
    {
        id: 116,
        title: "Friluftsliv and Wilderness Solitude: The Scandinavian Philosophy of Living",
        author: "Elena Rostova",
        authorRole: "Cultural Anthropologist & Nature Essayist",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Travel",
        tags: ["Travel", "Philosophy", "Nordic", "Nature"],
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
        imageCaption: "Misty fjords, silent pine forests, and contemplative wilderness backpacking in Norway.",
        content: `### The Free Air Life: Finding Inner Clarity in Open Landscapes

*Friluftsliv*—literally translated as "free air life"—is a Norwegian cultural philosophy centered on embracing outdoor immersion without commercialized pressure or competitive sports goals.

#### Living in Harmony with Natural Cycles:

1. **Allemansrätten (Right to Roam)**: The public freedom to respectfully traverse and wild-camp across untamed natural lands.
2. **Silence as Restoration**: Stepping away from acoustic pollution allows the nervous system to recalibrate and recover from mental fatigue.
3. **Simple Living (Enkelhet)**: Preparing hot coffee over birch twigs and sleeping beneath the stars reminds us of what is truly essential.`,
        date: "16 Jul 2026",
        likes: 172,
        views: 2450
    },
    {
        id: 117,
        title: "Modern Browser Engine Evolution: WebAssembly SIMD and Threads",
        author: "Alex Morgan",
        authorRole: "Principal Web Architect",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Programming",
        tags: ["WebAssembly", "Wasm", "Performance", "Browsers"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200",
        imageCaption: "WebAssembly bytecode compilation pipelines and SIMD vectorization in modern JIT engines.",
        content: `### Bringing Near-Native Compute Speeds to the Open Web

WebAssembly (Wasm) has evolved beyond a sandboxed C++ runtime into a versatile execution target with 128-bit SIMD vector instructions, garbage collection support, and shared memory multi-threading.

\`\`\`wat
;; WebAssembly SIMD f32x4 vector multiplication
(module
  (func $vector_dot (param $a v128) (param $b v128) (result v128)
    local.get $a
    local.get $b
    f32x4.mul
  )
  (export "vector_dot" (func $vector_dot))
)
\`\`\`

#### High-Impact WebAssembly Applications:

* **In-Browser Machine Learning**: Running quantized neural networks with WebGPU and Wasm SIMD at 60 FPS.
* **Real-Time Audio DSP**: Processing multichannel audio pipelines with sub-5ms buffer latencies.
* **Client-Side Media Transcoding**: Video compression and image manipulation directly in web workers without server roundtrips.`,
        date: "14 Jul 2026",
        likes: 260,
        views: 3780
    },
    {
        id: 118,
        title: "Carbon-Aware Cloud Computing: Optimizing Green Workload Schedules",
        author: "Sophia Rodriguez",
        authorRole: "Sustainable Design Director",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        category: "Technology",
        tags: ["GreenTech", "Cloud", "Sustainability", "DevOps"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200",
        imageCaption: "Renewable solar/wind energy tracking and dynamic compute workload shifting.",
        content: `### Aligning Cloud Infrastructure with Renewable Energy Surpluses

Modern cloud data centers consume significant electrical energy. Carbon-aware computing strategies dynamically adjust compute workloads based on the carbon intensity of local electrical grids.

#### Core Carbon Optimization Strategies:

1. **Temporal Shifting**: Delaying non-urgent batch analytics, model training, and database indexing to hours when solar and wind production peak.
2. **Spatial Shifting**: Routing distributed serverless executions to geographic regions currently powered by renewable clean grids.
3. **Demand Shaping**: Throttling background processing when grid carbon emissions exceed established safety thresholds.`,
        date: "12 Jul 2026",
        likes: 194,
        views: 2890
    },
    {
        id: 119,
        title: "Neural Dynamics of Creative Insight: How the Brain Enters Deep Flow",
        author: "Maya Lin",
        authorRole: "AI Researcher & Senior Editor",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        category: "Education",
        tags: ["Neuroscience", "FlowState", "Creativity", "CognitiveScience"],
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200",
        imageCaption: "Default Mode Network deactivation and transient hypofrontality during creative flow.",
        content: `### The Neurochemistry of Peak Cognitive Performance

Flow is an optimal psychological state where one becomes completely absorbed in an activity. In flow, action and awareness merge, the inner critic dissolves, and creative problem solving surges.

#### The 4 Phases of the Flow Cycle:

* **Struggle Phase**: Loading the brain with domain data, mental models, and problem constraints (high beta waves and cortisol).
* **Release Phase**: Disengaging consciously through a walk or nature immersion to trigger subconscious diffuse mode synthesis.
* **Flow State**: Transient hypofrontality deactivates the dorsolateral prefrontal cortex, releasing dopamine, anandamide, and theta/alpha synchrony.
* **Recovery Phase**: Consolidating new synaptic connections through sleep and deep physical rest.`,
        date: "10 Jul 2026",
        likes: 276,
        views: 3950
    },
    {
        id: 120,
        title: "Spatial Computing Interfaces: Designing for Mixed Reality & WebXR",
        author: "David Kim",
        authorRole: "Managing Editor & Interaction Lead",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        category: "Technology",
        tags: ["SpatialComputing", "WebXR", "UIUX", "FutureTech"],
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=1200",
        imageCaption: "Volumetric UI planes, gaze tracking coordinates, and hand gesture interaction tokens.",
        content: `### Transcending 2D Viewports: The Spatial Interface Paradigm

As spatial headsets and mixed reality hardware become mainstream, designers must transition from flat 2D bounding boxes to volumetric layouts rendered in 3D physical spaces.

#### Fundamental Spatial Design Rules:

1. **Comfort Zones & Eye Level**: Position critical content within a 1.5m to 2.0m focal distance directly in the central 30-degree field of view to prevent neck strain.
2. **Direct vs. Indirect Hand Gestures**: Support both tactile direct pinch manipulations for close items and gaze-assisted pinch targeting for distant planes.
3. **Dynamic Lighting and Cast Shadows**: Spatial components must respond to real-world ambient lighting and cast realistic shadows on room surfaces to anchor depth.`,
        date: "08 Jul 2026",
        likes: 248,
        views: 3620
    }
];

// Initialize storage safely with automatic merge for new seed articles
function initializeBlogStorage() {
    try {
        const stored = localStorage.getItem("blogs");
        if (!stored) {
            localStorage.setItem("blogs", JSON.stringify(defaultBlogs));
            return;
        }
        let existing = JSON.parse(stored);
        if (!Array.isArray(existing) || existing.length === 0) {
            localStorage.setItem("blogs", JSON.stringify(defaultBlogs));
            return;
        }

        // Merge any missing seed articles while preserving user-created articles
        let modified = false;
        defaultBlogs.forEach(def => {
            const matchIndex = existing.findIndex(b => String(b.id) === String(def.id));
            if (matchIndex === -1) {
                existing.push(def);
                modified = true;
            } else {
                // Update image captions or author avatars if missing
                if (def.imageCaption && !existing[matchIndex].imageCaption) {
                    existing[matchIndex].imageCaption = def.imageCaption;
                    modified = true;
                }
                if (def.authorAvatar && !existing[matchIndex].authorAvatar) {
                    existing[matchIndex].authorAvatar = def.authorAvatar;
                    modified = true;
                }
            }
        });

        if (modified) {
            localStorage.setItem("blogs", JSON.stringify(existing));
        }
    } catch(e) {
        localStorage.setItem("blogs", JSON.stringify(defaultBlogs));
    }
}

initializeBlogStorage();

// Storage Helpers
function getBlogs() {
    try {
        return JSON.parse(localStorage.getItem("blogs")) || defaultBlogs;
    } catch(e) {
        return defaultBlogs;
    }
}

function saveBlogs(list) {
    localStorage.setItem("blogs", JSON.stringify(list));
}

function getBookmarks() {
    try {
        return JSON.parse(localStorage.getItem("storydock_bookmarks")) || [];
    } catch(e) {
        return [];
    }
}

function toggleBookmark(id) {
    let bookmarks = getBookmarks();
    const strId = String(id);
    let isBookmarked = false;
    if (bookmarks.includes(strId)) {
        bookmarks = bookmarks.filter(b => b !== strId);
        window.showToast("Removed from your Bookmarks", "info");
    } else {
        bookmarks.push(strId);
        isBookmarked = true;
        window.showToast("Saved to Bookmarks!", "success");
    }
    localStorage.setItem("storydock_bookmarks", JSON.stringify(bookmarks));
    
    // Trigger UI refresh if on feed or profile
    if (typeof window.filterAndDisplayBlogs === "function") {
        window.filterAndDisplayBlogs();
    }
    if (typeof window.renderProfilePage === "function") {
        window.renderProfilePage();
    }
    return isBookmarked;
}

window.toggleBookmark = toggleBookmark;

function calculateReadingTime(text) {
    if (!text) return "1 min read";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}
window.calculateReadingTime = calculateReadingTime;

// Global Markdown Renderer
function renderMarkdownText(text) {
    if (!text) return "";
    if (window.marked && typeof window.marked.parse === "function") {
        return window.marked.parse(text);
    }
    // Clean fallback with basic paragraph splitting
    return text.split("\n\n").map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
}
window.renderMarkdownText = renderMarkdownText;

// DOM Elements on Homepage
const blogContainer = document.getElementById("blogs");
const empty = document.getElementById("empty");
const searchInput = document.getElementById("searchInput");
const searchClearBtn = document.getElementById("searchClearBtn");
const searchResultsCount = document.getElementById("searchResultsCount");
const categoryButtons = document.querySelectorAll(".category-btn");
const sortSelect = document.getElementById("sortSelect");

let activeFilterMode = "All";
let searchQuery = "";
let currentSort = "newest";

function displayBlogs(data) {
    if (!blogContainer) return;

    blogContainer.innerHTML = "";

    if (!data || data.length === 0) {
        blogContainer.style.display = "none";
        if (empty) empty.style.display = "block";
        if (searchResultsCount) {
            searchResultsCount.textContent = "0 stories found";
            searchResultsCount.style.display = "inline-block";
        }
        return;
    }

    blogContainer.style.display = "grid";
    if (empty) empty.style.display = "none";

    const allBlogs = getBlogs();
    if (searchResultsCount) {
        if (searchQuery || activeFilterMode !== "All") {
            searchResultsCount.textContent = `Showing ${data.length} of ${allBlogs.length} stories`;
            searchResultsCount.style.display = "inline-block";
        } else {
            searchResultsCount.style.display = "none";
        }
    }

    const bookmarks = getBookmarks();
    const currentUser = getCurrentUser();

    data.forEach(blog => {
        const readingTime = calculateReadingTime(blog.content);
        const likes = blog.likes || parseInt(localStorage.getItem(`likes_${blog.id}`) || "0", 10);
        const isBookmarked = bookmarks.includes(String(blog.id));
        const tags = blog.tags && Array.isArray(blog.tags) ? blog.tags : [blog.category];
        const isAuthor = currentUser && (currentUser.name === blog.author || currentUser.email === blog.authorEmail);

        const card = document.createElement("div");
        card.className = "blog-card";
        card.id = `blog-card-${blog.id}`;

        const tagsHtml = tags.slice(0, 3).map(t => `<span class="blog-tag">#${t}</span>`).join(" ");
        const captionHtml = blog.imageCaption ? `
            <div class="blog-img-caption">
                <i class="fa-solid fa-camera"></i>
                <span>${escapeHTML(blog.imageCaption)}</span>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="blog-img">
                <img src="${blog.image}" alt="${escapeAttr(blog.title)}" loading="lazy">
                <span class="reading-time-tag"><i class="fa-regular fa-clock"></i> ${readingTime}</span>
                <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); toggleBookmark(${blog.id});" aria-label="Bookmark story" title="${isBookmarked ? 'Remove Bookmark' : 'Save Story'}">
                    <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
                </button>
            </div>
            ${captionHtml}
            <div class="blog-content">
                <div class="blog-info">
                    <div class="meta-author">
                        ${blog.authorAvatar ? `<img src="${blog.authorAvatar}" class="author-mini-avatar" alt="${blog.author}">` : '<i class="fa-solid fa-user-circle"></i>'}
                        <span>${escapeHTML(blog.author)}</span>
                    </div>
                    <span class="category-pill">${blog.category}</span>
                </div>

                <h3 class="blog-card-title"><a href="view.html?id=${blog.id}">${escapeHTML(blog.title)}</a></h3>

                <p class="blog-excerpt">${blog.content ? escapeHTML(blog.content.replace(/#|\*|`|>|\[.*?\]\(.*?\)/g, "").substring(0, 120)) : ""}...</p>

                <div class="blog-tags-row">
                    ${tagsHtml}
                </div>

                <div class="blog-stats">
                    <span class="stat-item" title="${likes} likes">
                        <i class="fa-solid fa-heart text-red"></i> ${likes}
                    </span>
                    <span class="stat-item" title="Estimated Reading Time">
                        <i class="fa-regular fa-clock"></i> ${readingTime}
                    </span>
                    <span class="stat-item">
                        <i class="fa-regular fa-calendar"></i> ${blog.date || "Recent"}
                    </span>
                </div>

                <!-- Card Social Sharing Group -->
                <div class="card-social-share-row">
                    <span class="card-share-label"><i class="fa-solid fa-share-nodes"></i> Share</span>
                    <div class="card-share-buttons">
                        <button type="button" class="card-share-btn share-twitter" onclick="event.preventDefault(); event.stopPropagation(); shareStoryToTwitter('${blog.id}', '${escapeAttr(blog.title)}');" title="Share on X (Twitter)">
                            <i class="fa-brands fa-x-twitter"></i>
                        </button>
                        <button type="button" class="card-share-btn share-linkedin" onclick="event.preventDefault(); event.stopPropagation(); shareStoryToLinkedIn('${blog.id}', '${escapeAttr(blog.title)}');" title="Share on LinkedIn">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </button>
                        <button type="button" class="card-share-btn share-copy" onclick="event.preventDefault(); event.stopPropagation(); copyStoryLink('${blog.id}');" title="Copy Link">
                            <i class="fa-solid fa-link"></i>
                        </button>
                    </div>
                </div>

                <div class="blog-actions">
                    <a href="view.html?id=${blog.id}" class="read-btn">
                        <i class="fa-solid fa-book-open"></i> Read Story
                    </a>
                    <a href="edit.html?id=${blog.id}" class="edit-btn" title="Edit story">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                    <button class="delete-btn" onclick="deleteBlog(${blog.id})" title="Delete story">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        blogContainer.appendChild(card);
    });

    // Update stats counter on homepage if exists
    updateHeroStats();
    updateCategoryBadges();
}

function updateCategoryBadges() {
    const all = getBlogs();
    const bookmarks = getBookmarks();
    const counts = {
        All: all.length,
        Technology: 0,
        Programming: 0,
        Lifestyle: 0,
        Travel: 0,
        Education: 0,
        Bookmarks: bookmarks.length,
        Trending: all.length
    };

    all.forEach(b => {
        if (b.category && counts[b.category] !== undefined) {
            counts[b.category]++;
        }
    });

    if (categoryButtons && categoryButtons.length > 0) {
        categoryButtons.forEach(btn => {
            const cat = btn.getAttribute("data-category") || btn.innerText.replace(/[🔥✨🔖\d()]/g, "").trim();
            const badge = btn.querySelector(".category-count-badge");
            const count = counts[cat] !== undefined ? counts[cat] : "";
            if (badge) {
                badge.textContent = count !== "" ? count : "";
            }
        });
    }
}

function updateHeroStats() {
    const totalStoriesEl = document.getElementById("statTotalStories");
    const totalWordsEl = document.getElementById("statTotalWords");
    const totalLikesEl = document.getElementById("statTotalLikes");

    const all = getBlogs();
    if (totalStoriesEl) totalStoriesEl.innerText = all.length;
    if (totalWordsEl) {
        const totalWords = all.reduce((acc, b) => acc + (b.content ? b.content.split(/\s+/).length : 0), 0);
        totalWordsEl.innerText = totalWords.toLocaleString();
    }
    if (totalLikesEl) {
        const totalLikes = all.reduce((acc, b) => acc + (b.likes || parseInt(localStorage.getItem(`likes_${b.id}`) || "0", 10)), 0);
        totalLikesEl.innerText = totalLikes.toLocaleString();
    }
}

function filterAndDisplayBlogs() {
    if (!blogContainer) return;
    
    let allBlogs = getBlogs();
    let filtered = [...allBlogs];
    const bookmarks = getBookmarks();

    // Search query filter
    if (searchQuery) {
        filtered = filtered.filter(b =>
            (b.title && b.title.toLowerCase().includes(searchQuery)) ||
            (b.author && b.author.toLowerCase().includes(searchQuery)) ||
            (b.category && b.category.toLowerCase().includes(searchQuery)) ||
            (b.tags && Array.isArray(b.tags) && b.tags.some(t => t.toLowerCase().includes(searchQuery))) ||
            (b.content && b.content.toLowerCase().includes(searchQuery))
        );
    }

    // Category / Custom mode
    if (activeFilterMode === "Bookmarks") {
        filtered = filtered.filter(b => bookmarks.includes(String(b.id)));
    } else if (activeFilterMode === "Trending") {
        filtered.sort((a, b) => {
            const likesA = a.likes || parseInt(localStorage.getItem(`likes_${a.id}`) || "0", 10);
            const likesB = b.likes || parseInt(localStorage.getItem(`likes_${b.id}`) || "0", 10);
            return likesB - likesA;
        });
    } else if (activeFilterMode === "Newest") {
        filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (activeFilterMode !== "All") {
        filtered = filtered.filter(b => b.category && b.category.toLowerCase() === activeFilterMode.toLowerCase());
    }

    // Custom Sort Select
    if (sortSelect) {
        currentSort = sortSelect.value;
        if (currentSort === "most-liked") {
            filtered.sort((a, b) => {
                const likesA = a.likes || parseInt(localStorage.getItem(`likes_${a.id}`) || "0", 10);
                const likesB = b.likes || parseInt(localStorage.getItem(`likes_${b.id}`) || "0", 10);
                return likesB - likesA;
            });
        } else if (currentSort === "quickest-read") {
            filtered.sort((a, b) => {
                const lenA = a.content ? a.content.length : 0;
                const lenB = b.content ? b.content.length : 0;
                return lenA - lenB;
            });
        } else if (currentSort === "longest-read") {
            filtered.sort((a, b) => {
                const lenA = a.content ? a.content.length : 0;
                const lenB = b.content ? b.content.length : 0;
                return lenB - lenA;
            });
        }
    }

    displayBlogs(filtered);
}

window.filterAndDisplayBlogs = filterAndDisplayBlogs;

window.deleteBlog = function deleteBlog(id) {
    if (!confirm("Are you sure you want to permanently delete this blog?")) return;

    let current = getBlogs().filter(blog => String(blog.id) !== String(id));
    saveBlogs(current);
    window.showToast("Story deleted successfully.", "warning");
    filterAndDisplayBlogs();
    if (typeof window.renderProfilePage === "function") {
        window.renderProfilePage();
    }
};

function deleteBlog(id) {
    window.deleteBlog(id);
}

// Initial feed rendering
if (blogContainer) {
    filterAndDisplayBlogs();
}

// Search Handler with Instant Clear
if (searchInput) {
    searchInput.addEventListener("input", function (e) {
        searchQuery = e.target.value.toLowerCase().trim();
        if (searchClearBtn) {
            searchClearBtn.style.display = searchQuery ? "flex" : "none";
        }
        filterAndDisplayBlogs();
    });

    if (searchClearBtn) {
        searchClearBtn.addEventListener("click", () => {
            searchInput.value = "";
            searchQuery = "";
            searchClearBtn.style.display = "none";
            filterAndDisplayBlogs();
            searchInput.focus();
        });
    }
}

if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        filterAndDisplayBlogs();
    });
}

// Category filter buttons
if (categoryButtons && categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const category = button.getAttribute("data-category") || button.innerText.replace(/[🔥✨🔖\d()]/g, "").trim();
            activeFilterMode = category;
            filterAndDisplayBlogs();
        });
    });
}

// Analytics Modal & Export Tools
window.openAnalyticsModal = function() {
    let modal = document.getElementById("analyticsModal");
    if (!modal) {
        createAnalyticsModal();
        modal = document.getElementById("analyticsModal");
    }
    renderAnalyticsData();
    modal.classList.add("open");
};

window.closeAnalyticsModal = function() {
    const modal = document.getElementById("analyticsModal");
    if (modal) modal.classList.remove("open");
};

function createAnalyticsModal() {
    const div = document.createElement("div");
    div.id = "analyticsModal";
    div.className = "analytics-modal-backdrop";
    div.innerHTML = `
        <div class="analytics-modal-dialog">
            <div class="analytics-modal-header">
                <h2><i class="fa-solid fa-chart-pie"></i> StoryDock Analytics & Platform Insights</h2>
                <button class="analytics-close-btn" onclick="closeAnalyticsModal()" aria-label="Close dialog">&times;</button>
            </div>
            <div class="analytics-modal-body" id="analyticsModalBody">
                <!-- Injected via JavaScript -->
            </div>
            <div class="analytics-modal-footer">
                <button class="btn-secondary" onclick="exportDataJSON()"><i class="fa-solid fa-download"></i> Backup JSON</button>
                <button class="btn-primary" onclick="closeAnalyticsModal()">Done</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
    div.addEventListener("click", (e) => {
        if (e.target === div) closeAnalyticsModal();
    });
}

function renderAnalyticsData() {
    const container = document.getElementById("analyticsModalBody");
    if (!container) return;

    const all = getBlogs();
    const categories = {};
    let totalLikes = 0;
    let totalWords = 0;

    all.forEach(b => {
        categories[b.category] = (categories[b.category] || 0) + 1;
        totalLikes += (b.likes || parseInt(localStorage.getItem(`likes_${b.id}`) || "0", 10));
        totalWords += (b.content ? b.content.split(/\s+/).length : 0);
    });

    const categoryListHtml = Object.entries(categories).map(([cat, count]) => {
        const pct = Math.round((count / all.length) * 100);
        return `
            <div class="analytics-bar-item">
                <div class="analytics-bar-labels">
                    <span><strong>${cat}</strong> (${count} stories)</span>
                    <span>${pct}%</span>
                </div>
                <div class="analytics-bar-track">
                    <div class="analytics-bar-fill" style="width: ${pct}%;"></div>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <div class="analytics-metric-grid">
            <div class="analytics-metric-card">
                <i class="fa-solid fa-newspaper metric-icon text-blue"></i>
                <div class="metric-val">${all.length}</div>
                <div class="metric-label">Published Articles</div>
            </div>
            <div class="analytics-metric-card">
                <i class="fa-solid fa-heart metric-icon text-red"></i>
                <div class="metric-val">${totalLikes.toLocaleString()}</div>
                <div class="metric-label">Total Reader Claps</div>
            </div>
            <div class="analytics-metric-card">
                <i class="fa-solid fa-book-open metric-icon text-green"></i>
                <div class="metric-val">${totalWords.toLocaleString()}</div>
                <div class="metric-label">Total Words Written</div>
            </div>
            <div class="analytics-metric-card">
                <i class="fa-solid fa-clock metric-icon text-purple"></i>
                <div class="metric-val">~${Math.ceil(totalWords / 200)} min</div>
                <div class="metric-label">Collective Reading Time</div>
            </div>
        </div>

        <h3 class="analytics-section-title"><i class="fa-solid fa-chart-column"></i> Topic Distribution</h3>
        <div class="analytics-bars-container">
            ${categoryListHtml}
        </div>
    `;
}

window.exportDataJSON = function() {
    const data = {
        exportedAt: new Date().toISOString(),
        blogs: getBlogs(),
        bookmarks: getBookmarks(),
        subscribers: JSON.parse(localStorage.getItem("storydock_subscribers")) || []
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `storydock_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    window.showToast("Platform data exported successfully as JSON!", "success");
};

// Theme Toggle
const themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            window.showToast("Dark Mode enabled", "info");
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            window.showToast("Light Mode enabled", "info");
        }
    });
}

// Floating Menu Controls
const menuBtn = document.getElementById("menuBtn");
const floatingMenu = document.getElementById("floatingMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");

function closeMenu() {
    if (!floatingMenu) return;
    floatingMenu.classList.remove("open");
    if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "false");
        floatingMenu.setAttribute("aria-hidden", "true");
    }
}

if (menuBtn && floatingMenu) {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = floatingMenu.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", isOpen);
        floatingMenu.setAttribute("aria-hidden", !isOpen);
    });

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    floatingMenu.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
        if (floatingMenu.classList.contains("open") && !floatingMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}

// Sticky Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTopBtn");
if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Newsletter Subscription Form Handling
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMsg = document.getElementById("newsletterMsg");

if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        if (!email) return;

        let subscribers = JSON.parse(localStorage.getItem("storydock_subscribers")) || [];
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem("storydock_subscribers", JSON.stringify(subscribers));
        }

        newsletterEmail.value = "";
        window.showToast("🎉 Thank you for subscribing to StoryDock Daily!", "success");
        if (newsletterMsg) {
            newsletterMsg.textContent = "Thank you for subscribing! You'll receive our weekly curated stories.";
            newsletterMsg.className = "newsletter-feedback success";
            newsletterMsg.style.display = "block";
            setTimeout(() => {
                newsletterMsg.style.display = "none";
            }, 5000);
        }
    });
}

