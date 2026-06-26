/**
 * ============================================
 * 个人简历网站 - 交互脚本
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initSkillBars();
    initBackToTop();
    initContactForm();
    initActiveNavLink();
});

// ============================================
// 打字机效果
// ============================================
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const roles = [
        '硬件工程师',
        '嵌入式开发',
        'STM32 / 单片机',
        'PCB Layout',
        '竞赛达人'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        // 打字完成
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // 停留时间
            isDeleting = true;
        }
        // 删除完成
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // 切换间隔
        }

        setTimeout(type, typeSpeed);
    }

    // 初始延迟后开始
    setTimeout(type, 800);
}

// ============================================
// 导航栏滚动效果
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        // 滚动超过50px时添加背景
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ============================================
// 移动端菜单
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) return;

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        navMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }

    function closeMenu() {
        menuOpen = false;
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    navToggle.addEventListener('click', () => {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // 点击遮罩层关闭
    overlay.addEventListener('click', closeMenu);

    // 点击菜单链接后关闭
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                closeMenu();
            }
        });
    });

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            closeMenu();
        }
    });
}

// ============================================
// 平滑滚动
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;

            // 排除纯 "#" 链接
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            e.preventDefault();

            const navbarHeight = 70; // 导航栏高度
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// 滚动显示动画 (AOS)
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    if (elements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px', // 元素进入视口60px后触发
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-visible');
                // 可选：加载后不再观察
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// 技能进度条动画
// ============================================
function initSkillBars() {
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.skill-progress');

    if (!skillSection || progressBars.length === 0) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                // 逐个延迟动画
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
}

// ============================================
// 回到顶部按钮
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    function toggleVisibility() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 当前导航激活状态
// ============================================
function initActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length === 0) return;

    const sections = [];
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const section = document.querySelector(href);
        if (section) {
            sections.push({ link, section });
        }
    });

    if (sections.length === 0) return;

    function updateActiveLink() {
        let currentSection = sections[0];

        sections.forEach(({ section }) => {
            const rect = section.getBoundingClientRect();
            // 当前section顶部接近视口顶部时激活
            if (rect.top <= 120) {
                currentSection = sections.find(s => s.section === section);
            }
        });

        // 移除所有active
        navLinks.forEach(link => link.classList.remove('active'));

        // 添加active到当前
        if (currentSection) {
            currentSection.link.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // 初始调用一次
    updateActiveLink();
}

// ============================================
// 联系表单处理
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 获取表单数据
        const formData = new FormData(form);
        const data = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            subject: formData.get('subject')?.trim(),
            message: formData.get('message')?.trim()
        };

        // 简单的前端验证
        if (!data.name || !data.email || !data.message) {
            showToast('请填写所有必填字段（姓名、邮箱、留言内容）', 'error');
            return;
        }

        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showToast('请输入有效的邮箱地址', 'error');
            return;
        }

        // 模拟发送（实际项目中替换为真实的API调用）
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showToast('🎉 感谢您的留言！我会尽快回复您。', 'success');
            form.reset();

            // 恢复按钮状态
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // 输入时实时去除错误状态
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });

        // 失去焦点时的基本验证提示
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = 'var(--accent)';
            } else {
                input.style.borderColor = '';
            }
        });
    });
}

// ============================================
// Toast 提示
// ============================================
function showToast(message, type = 'success') {
    // 移除已有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // 3秒后自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// ============================================
// 键盘导航快捷键
// ============================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K 聚焦搜索（可选扩展）
    // 目前保留，不做特殊处理，避免与浏览器快捷键冲突
});