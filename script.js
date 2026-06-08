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
const opacityRange = document.getElementById('opacityRange');
const opacityUp = document.getElementById('opacityUp');
const opacityDown = document.getElementById('opacityDown');
const opacityValue = document.getElementById('opacityValue');

const handleScroll = () => {
    const offset = window.scrollY;
    heroBgLayers.forEach((img) => {
        img.style.transform = `translateY(${offset * 0.18}px) scale(1.03)`;
    });
    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('scroll-visible');
        }
    });
};

let autoOpacity = 0;
let autoOpacityTimer;

const updateOpacity = (value) => {
    const v = Number(value);
    autoOpacity = v;
    const dayOpacity = Math.max(0, 1 - v * 2);
    const duskOpacity = v <= 0.5 ? v * 2 : Math.max(0, 2 - v * 2);
    const nightOpacity = Math.max(0, v * 2 - 1);

    if (dayLayer) dayLayer.style.opacity = dayOpacity;
    if (duskLayer) duskLayer.style.opacity = duskOpacity;
    if (nightLayer) nightLayer.style.opacity = nightOpacity;
    if (opacityValue) opacityValue.textContent = v.toFixed(2);
    if (opacityRange) opacityRange.value = v;
};

const startOpacityLoop = () => {
    if (autoOpacityTimer) clearInterval(autoOpacityTimer);
    autoOpacity = 0;
    updateOpacity(autoOpacity);
    autoOpacityTimer = setInterval(() => {
        autoOpacity = Number((autoOpacity + 0.09).toFixed(2));
        if (autoOpacity > 1) {
            autoOpacity = 0;
        }
        updateOpacity(autoOpacity);
    }, 1000);
};

if (opacityRange) {
    opacityRange.addEventListener('input', (e) => {
        updateOpacity(e.target.value);
    });
}

if (opacityUp) {
    opacityUp.addEventListener('click', () => {
        const current = Number(opacityRange?.value || 0);
        updateOpacity(Math.min(1, current + 0.01).toFixed(2));
    });
}

if (opacityDown) {
    opacityDown.addEventListener('click', () => {
        const current = Number(opacityRange?.value || 0);
        updateOpacity(Math.max(0, current - 0.01).toFixed(2));
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    startOpacityLoop();
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
