// Simple animation for the growth chart bars on scroll
const bars = document.querySelectorAll('[id^="bar-"]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('h-0');
        }
    });
}, { threshold: 0.5 });

bars.forEach(bar => {
    const finalHeightMatch = bar.className.match(/h-\[(\d+)%\]/);
    if (finalHeightMatch) {
        const finalHeight = finalHeightMatch[0];
        bar.classList.replace(finalHeight, 'h-0');
        setTimeout(() => {
            bar.classList.replace('h-0', finalHeight);
        }, 500);
        observer.observe(bar);
    }
});

const revealElements = document.querySelectorAll('.scroll-reveal');
const heroBgLayers = document.querySelectorAll('.hero-bg-layer');
const dayLayer = document.querySelector('.hero-bg-layer.a7');
const duskLayer = document.querySelector('.hero-bg-layer.a8');
const nightLayer = document.querySelector('.hero-bg-layer.a6');
const sectionCloud = document.querySelector('.section-cloud');
const opacityRange = document.getElementById('opacityRange');
const opacityUp = document.getElementById('opacityUp');
const opacityDown = document.getElementById('opacityDown');
const opacityValue = document.getElementById('opacityValue');

const handleScroll = () => {
    const offset = window.scrollY;
    
    // Reveal các component khác khi scroll
    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('scroll-visible');
        }
    });

    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const heroHeight = heroSection.offsetHeight;
        // Khoảng cách đã cuộn qua bên trong heroSection
        const scrolledDistance = -rect.top;
        // Tổng quãng đường cuộn tối đa bên trong heroSection (300vh - 100vh = 200vh)
        const scrollableDistance = heroHeight - window.innerHeight;
        
        if (scrollableDistance > 0) {
            // Tỉ lệ cuộn từ 0.0 (đầu section) tới 1.0 (cuối section, bắt đầu trôi đi)
            const scrollRatio = Math.min(1, Math.max(0, scrolledDistance / scrollableDistance));

            // Tự động thu nhỏ/dịch chuyển nền parallax (giữ ảnh đứng yên, chỉ scale nhẹ nếu cần hoặc bỏ hẳn translateY)
            heroBgLayers.forEach((img) => {
                img.style.transform = `scale(1.03)`;
            });

            // Tính toán opacity:
            // - dayLayer (sáng - A1): từ 1 -> 0 ở khoảng 0% - 50% cuộn
            const dayOpacity = Math.max(0, 1 - scrollRatio * 2);
            // - duskLayer (chiều - A2): đạt đỉnh 1 tại 50% cuộn
            const duskOpacity = scrollRatio <= 0.5 ? scrollRatio * 2 : Math.max(0, 2 - scrollRatio * 2);
            // - nightLayer (đêm - A3): sáng dần từ 0 -> 1 từ 50% đến 100% cuộn
            const nightOpacity = Math.max(0, scrollRatio * 2 - 1);

            if (dayLayer) dayLayer.style.opacity = dayOpacity;
            if (duskLayer) duskLayer.style.opacity = duskOpacity;
            if (nightLayer) nightLayer.style.opacity = nightOpacity;

            // Xử lý hiển thị mây (sectionCloud) ở đầu Section 2 theo tiến độ scroll (từ 0.8 đến 1.0)
            if (sectionCloud) {
                if (scrollRatio >= 0.8) {
                    // Ánh xạ tuyến tính: scrollRatio từ 0.8 -> 1.0 tương đương với translateY từ 0% lên -60% (nhô ngược lên che chân banner)
                    const cloudProgress = (scrollRatio - 0.8) / 0.2; // 0.0 đến 1.0
                    const translateYVal = -(cloudProgress * 60); // 0% đến -60%
                    sectionCloud.style.transform = `translateY(${translateYVal}%)`;
                } else {
                    // Giữ mây ẩn hoàn toàn ở phía dưới (nằm trong section 2) nếu chưa scroll tới 80%
                    sectionCloud.style.transform = 'translateY(0)';
                }
            }
        }
    }
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    handleScroll();
});

const appDropdownBtn = document.getElementById('app-dropdown-btn');
const appDropdown = document.getElementById('app-dropdown');
const industryDropdownBtn = document.getElementById('industry-dropdown-btn');
const industryDropdown = document.getElementById('industry-dropdown');

if (appDropdownBtn && appDropdown) {
    appDropdownBtn.addEventListener('mouseenter', () => {
        appDropdown.classList.add('active');
    });
    
    appDropdown.addEventListener('mouseleave', () => {
        appDropdown.classList.remove('active');
    });

    appDropdownBtn.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!appDropdown.matches(':hover')) {
                appDropdown.classList.remove('active');
            }
        }, 100);
    });

    // Toggle dropdown on click for mobile
    appDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        appDropdown.classList.toggle('active');
        if (industryDropdown) industryDropdown.classList.remove('active');
    });
}

if (industryDropdownBtn && industryDropdown) {
    industryDropdownBtn.addEventListener('mouseenter', () => {
        industryDropdown.classList.add('active');
    });
    
    industryDropdown.addEventListener('mouseleave', () => {
        industryDropdown.classList.remove('active');
    });

    industryDropdownBtn.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!industryDropdown.matches(':hover')) {
                industryDropdown.classList.remove('active');
            }
        }, 100);
    });

    industryDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        industryDropdown.classList.toggle('active');
        if (appDropdown) appDropdown.classList.remove('active');
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    if (appDropdown) appDropdown.classList.remove('active');
    if (industryDropdown) industryDropdown.classList.remove('active');
});
