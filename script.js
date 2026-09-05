// ===== 主题（暗色模式） =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function getStoredTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

applyTheme(getStoredTheme() ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) { /* 隐私模式等场景忽略 */ }
    });
}

// ===== 滚动进度条 =====
const scrollProgress = document.querySelector('.scroll-progress');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    // 计算滚动进度
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgress.style.transform = `scaleX(${progress / 100})`;

    // 导航栏滚动效果
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 组件切入动画（Apple 风格：上浮 + 缩放 + 模糊消散） =====
// 注：应站长要求，动画无条件播放，不再跟随系统的"减弱动态效果"设置
const revealTargets = document.querySelectorAll(
    '.container, .timeline-item, .github-contributions, .project-item, .member-card'
);

if (!('IntersectionObserver' in window)) {
    // 极旧浏览器兜底：直接显示
    revealTargets.forEach(el => el.classList.add('visible'));
} else {
    // 同一父容器内的元素依次错峰入场
    const groupIndex = new Map();
    revealTargets.forEach(el => {
        const parent = el.parentElement;
        const idx = groupIndex.get(parent) || 0;
        groupIndex.set(parent, idx + 1);
        el.style.setProperty('--reveal-delay', Math.min(idx, 7));
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 入场动画结束后移除动画类，恢复卡片自身的 0.3s 悬停过渡
                // （transitionend 会冒泡，必须过滤掉子元素的事件，避免入场被提前打断）
                entry.target.addEventListener('transitionend', function handler(e) {
                    if (e.target !== entry.target) return;
                    entry.target.removeEventListener('transitionend', handler);
                    entry.target.classList.remove('reveal', 'visible');
                    entry.target.style.removeProperty('--reveal-delay');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
}
