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
        }
    }
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    handleScroll();
});

const featureRevealElements = document.querySelectorAll(
    '.ecosystem-section .text-center, .ecosystem-section .module-group, .ecosystem-section .app-carousel-section'
);

featureRevealElements.forEach((element) => {
    element.classList.add('feature-reveal');
    element.querySelectorAll('.app-card').forEach((card, index) => {
        card.style.setProperty('--reveal-delay', `${100 + index * 85}ms`);
    });
});

let featureScrollDirection = 'down';
let previousFeatureScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    featureScrollDirection = currentScrollY >= previousFeatureScrollY ? 'down' : 'up';
    previousFeatureScrollY = currentScrollY;
}, { passive: true });

const featureRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.toggle('reveal-from-top', featureScrollDirection === 'up');
            entry.target.classList.add('feature-visible');
            return;
        }

        entry.target.classList.remove('feature-visible');
    });
}, {
    threshold: 0.16,
    rootMargin: '0px 0px -60px'
});

featureRevealElements.forEach((element) => featureRevealObserver.observe(element));

const tutorialRevealElements = document.querySelectorAll(
    '.tutorials-section .tutorials-heading, .tutorials-section .tutorial-card'
);

tutorialRevealElements.forEach((element, index) => {
    element.classList.add('tutorial-reveal');
    element.style.setProperty('--tutorial-delay', `${Math.min(index * 110, 330)}ms`);
});

const tutorialRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('tutorial-visible', entry.isIntersecting);
    });
}, {
    threshold: 0.14,
    rootMargin: '0px 0px -50px'
});

tutorialRevealElements.forEach((element) => tutorialRevealObserver.observe(element));

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

const appCards = document.querySelectorAll('.app-card');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const appModal = document.getElementById('app-detail-modal');
const modalClose = document.getElementById('app-modal-close');
const modalTitle = document.getElementById('app-modal-title');
const modalIcon = document.getElementById('app-modal-icon');
const modalSummary = document.getElementById('app-modal-summary');
const featureList = document.getElementById('app-feature-list');
const suitableList = document.getElementById('app-suitable-list');
const workflowList = document.getElementById('app-workflow-list');
const galleryMain = document.getElementById('app-gallery-main');
const galleryThumbs = document.getElementById('app-gallery-thumbs');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
const appSwitchPrev = document.getElementById('app-switch-prev');
const appSwitchNext = document.getElementById('app-switch-next');
const appSwitchPrevLabel = document.getElementById('app-switch-prev-label');
const appSwitchNextLabel = document.getElementById('app-switch-next-label');
const appCarouselViewport = document.getElementById('app-carousel-viewport');
const appCarouselPrev = document.getElementById('app-carousel-prev');
const appCarouselNext = document.getElementById('app-carousel-next');

const appDetails = {
    accounting: {
        title: 'Kế toán',
        icon: 'account_balance',
        summary: 'Quản lý toàn bộ dòng tiền, chứng từ và báo cáo tài chính trên một hệ thống chính xác, minh bạch và cập nhật theo thời gian thực.',
        features: ['Theo dõi thu chi, công nợ và dòng tiền', 'Tự động hạch toán từ hóa đơn và giao dịch', 'Lập báo cáo tài chính, thuế và quản trị', 'Đối soát ngân hàng và quản lý đa chi nhánh'],
        suitable: ['Doanh nghiệp 20–500 nhân sự', 'Công ty có nhiều chi nhánh hoặc đơn vị', 'Đội ngũ tài chính cần quản lý tập trung'],
        workflow: ['Tiếp nhận giao dịch và chứng từ', 'Kiểm tra, phê duyệt tính hợp lệ', 'Hạch toán và đối soát số liệu', 'Khóa kỳ và lập báo cáo'],
        screens: ['Tổng quan tài chính', 'Sổ quỹ và ngân hàng', 'Công nợ phải thu', 'Báo cáo quản trị']
    },
    sign: {
        title: 'Ký tên điện tử',
        icon: 'draw',
        summary: 'Gửi, ký và quản lý tài liệu điện tử nhanh chóng, giúp quy trình phê duyệt diễn ra liền mạch mà không cần in ấn.',
        features: ['Tạo luồng ký theo thứ tự hoặc đồng thời', 'Theo dõi trạng thái ký theo thời gian thực', 'Nhắc ký tự động và lưu lịch sử thao tác', 'Lưu trữ tài liệu đã ký an toàn'],
        suitable: ['Doanh nghiệp xử lý nhiều hợp đồng', 'Đội ngũ làm việc từ xa hoặc nhiều địa điểm', 'Phòng pháp chế và hành chính cần duyệt nhanh'],
        workflow: ['Tạo và tải tài liệu', 'Thiết lập người ký và thứ tự ký', 'Gửi yêu cầu và theo dõi tiến độ', 'Hoàn tất, xác thực và lưu trữ'],
        screens: ['Danh sách tài liệu', 'Thiết lập người ký', 'Ký tài liệu', 'Lịch sử phê duyệt']
    },
    crm: {
        title: 'CRM',
        icon: 'hub',
        summary: 'Tập trung dữ liệu khách hàng và toàn bộ hành trình bán hàng để đội ngũ chăm sóc đúng lúc, tăng tỷ lệ chuyển đổi.',
        features: ['Quản lý khách hàng và lịch sử tương tác', 'Theo dõi cơ hội trên pipeline trực quan', 'Tự động phân bổ và nhắc lịch chăm sóc', 'Phân tích hiệu suất nhân viên bán hàng'],
        suitable: ['Doanh nghiệp B2B hoặc bán hàng tư vấn', 'Đội sales từ 5 nhân sự trở lên', 'Công ty có nhiều nguồn khách hàng tiềm năng'],
        workflow: ['Thu thập và phân loại khách hàng', 'Phân bổ cho nhân viên phụ trách', 'Tư vấn, chăm sóc và cập nhật cơ hội', 'Chốt giao dịch và đánh giá chuyển đổi'],
        screens: ['Pipeline cơ hội', 'Hồ sơ khách hàng', 'Lịch chăm sóc', 'Báo cáo chuyển đổi']
    },
    pos: {
        title: 'POS bán hàng',
        icon: 'point_of_sale',
        summary: 'Bán hàng tại quầy nhanh, ổn định và đồng bộ tức thì với kho, khách hàng, khuyến mãi và doanh thu toàn hệ thống.',
        features: ['Tạo đơn và thanh toán đa phương thức', 'Quét mã vạch, áp dụng giá và khuyến mãi', 'Hoạt động ổn định ngay cả khi mất mạng', 'Đồng bộ tồn kho và doanh thu theo ca'],
        suitable: ['Cửa hàng bán lẻ và chuỗi cửa hàng', 'Nhà hàng, quán cà phê hoặc dịch vụ tại quầy', 'Doanh nghiệp cần quản lý doanh thu theo ca'],
        workflow: ['Mở ca và kiểm tra quầy', 'Chọn hàng, áp dụng ưu đãi', 'Thanh toán và xuất hóa đơn', 'Chốt ca, đối soát doanh thu'],
        screens: ['Màn hình bán hàng', 'Thanh toán đơn hàng', 'Quản lý ca', 'Doanh thu cửa hàng']
    },
    hr: {
        title: 'Quản trị nhân sự',
        icon: 'badge',
        summary: 'Số hóa hồ sơ nhân viên, chấm công, nghỉ phép và đánh giá để doanh nghiệp quản trị đội ngũ hiệu quả hơn.',
        features: ['Quản lý hồ sơ và hợp đồng nhân viên', 'Chấm công, ca làm và đơn nghỉ phép', 'Theo dõi tuyển dụng và quá trình hội nhập', 'Đánh giá hiệu suất và mục tiêu công việc'],
        suitable: ['Doanh nghiệp 20–1.000 nhân sự', 'Công ty có nhiều phòng ban hoặc ca làm việc', 'Đội HR cần chuẩn hóa quy trình nhân sự'],
        workflow: ['Tuyển dụng và tiếp nhận nhân sự', 'Quản lý hồ sơ, hợp đồng và ca làm', 'Chấm công, nghỉ phép và tính lương', 'Đánh giá, phát triển và điều chỉnh'],
        screens: ['Danh bạ nhân sự', 'Chấm công', 'Đơn nghỉ phép', 'Đánh giá hiệu suất']
    },
    inventory: {
        title: 'Quản lý tồn kho',
        icon: 'inventory_2',
        summary: 'Kiểm soát chính xác số lượng hàng hóa tại nhiều kho, theo dõi mọi dịch chuyển và chủ động kế hoạch nhập hàng.',
        features: ['Tồn kho thời gian thực theo vị trí', 'Nhập, xuất, chuyển và kiểm kê hàng hóa', 'Quản lý lô, serial và hạn sử dụng', 'Cảnh báo tồn tối thiểu và đề xuất bổ sung'],
        suitable: ['Doanh nghiệp phân phối và bán lẻ', 'Công ty vận hành nhiều kho hoặc chi nhánh', 'Ngành hàng cần quản lý lô và hạn sử dụng'],
        workflow: ['Lập yêu cầu nhập hoặc xuất kho', 'Kiểm tra và phê duyệt phiếu', 'Nhận, giao hoặc chuyển vị trí hàng', 'Đối chiếu tồn và kiểm kê định kỳ'],
        screens: ['Tổng quan tồn kho', 'Phiếu nhập xuất', 'Dịch chuyển hàng', 'Dự báo bổ sung']
    },
    manufacturing: {
        title: 'Quản lý sản xuất',
        icon: 'precision_manufacturing',
        summary: 'Lập kế hoạch, điều phối nguyên vật liệu và giám sát tiến độ sản xuất từ lệnh đầu tiên đến thành phẩm.',
        features: ['Quản lý định mức nguyên vật liệu', 'Lập và điều phối lệnh sản xuất', 'Theo dõi công đoạn, năng lực và tiến độ', 'Tính giá thành và kiểm soát chất lượng'],
        suitable: ['Nhà máy sản xuất theo đơn hoặc hàng loạt', 'Doanh nghiệp có nhiều công đoạn sản xuất', 'Đội vận hành cần kiểm soát nguyên vật liệu'],
        workflow: ['Lập kế hoạch và nhu cầu sản xuất', 'Cấp nguyên liệu, phát hành lệnh', 'Thực hiện công đoạn và kiểm tra chất lượng', 'Nhập thành phẩm và tính giá thành'],
        screens: ['Kế hoạch sản xuất', 'Lệnh sản xuất', 'Tiến độ công đoạn', 'Phân tích giá thành']
    },
    sales: {
        title: 'Quản lý bán hàng',
        icon: 'shopping_cart',
        summary: 'Quản lý báo giá, đơn hàng, giao hàng và hóa đơn trong một quy trình thống nhất, giảm thao tác và hạn chế sai sót.',
        features: ['Tạo báo giá và đơn hàng chuyên nghiệp', 'Quản lý bảng giá, chiết khấu và chính sách', 'Liên kết giao hàng, hóa đơn và công nợ', 'Theo dõi doanh số theo kênh và nhân viên'],
        suitable: ['Doanh nghiệp thương mại và phân phối', 'Công ty có nhiều kênh hoặc đội bán hàng', 'Đơn vị cần liên kết bán hàng với kho và kế toán'],
        workflow: ['Tiếp nhận nhu cầu và lập báo giá', 'Xác nhận đơn và kiểm tra tồn kho', 'Chuẩn bị, giao hàng và nghiệm thu', 'Xuất hóa đơn, thu tiền và theo dõi công nợ'],
        screens: ['Báo giá bán hàng', 'Danh sách đơn hàng', 'Tiến độ giao hàng', 'Phân tích doanh số']
    },
    ai: {
        title: 'AI trợ lý',
        icon: 'psychology',
        summary: 'Trợ lý thông minh hỗ trợ tra cứu dữ liệu, soạn nội dung, tóm tắt báo cáo và đề xuất hành động ngay trong công việc.',
        features: ['Hỏi đáp nhanh trên dữ liệu doanh nghiệp', 'Tóm tắt tài liệu và báo cáo dài', 'Soạn email, nội dung và phản hồi khách hàng', 'Gợi ý xu hướng, rủi ro và công việc ưu tiên'],
        suitable: ['Đội ngũ xử lý nhiều tài liệu và báo cáo', 'Nhân sự cần tra cứu dữ liệu nhanh', 'Doanh nghiệp muốn tự động hóa công việc lặp lại'],
        workflow: ['Người dùng gửi yêu cầu', 'AI truy xuất nguồn dữ liệu được phép', 'Phân tích và tạo kết quả đề xuất', 'Người dùng kiểm tra, chỉnh sửa và áp dụng'],
        screens: ['Trung tâm trợ lý AI', 'Phân tích dữ liệu', 'Soạn thảo nội dung', 'Gợi ý hành động']
    },
    documents: {
        title: 'Quản lý tài liệu',
        icon: 'description',
        summary: 'Lưu trữ tập trung, phân loại và cộng tác trên tài liệu doanh nghiệp với quyền truy cập rõ ràng và lịch sử đầy đủ.',
        features: ['Thư mục dùng chung và phân quyền chi tiết', 'Tìm kiếm nhanh theo nội dung và thuộc tính', 'Quản lý phiên bản và lịch sử thay đổi', 'Chia sẻ, bình luận và phê duyệt tài liệu'],
        suitable: ['Công ty có nhiều phòng ban', 'Đội ngũ cần cộng tác và chia sẻ tài liệu', 'Doanh nghiệp yêu cầu phân quyền và lưu vết'],
        workflow: ['Tạo hoặc tiếp nhận tài liệu', 'Phân loại, gắn thẻ và phân quyền', 'Cộng tác, chỉnh sửa và phê duyệt', 'Phát hành, lưu phiên bản và tra cứu'],
        screens: ['Kho tài liệu', 'Xem trước nội dung', 'Phân quyền chia sẻ', 'Lịch sử phiên bản']
    },
    projects: {
        title: 'Quản lý dự án',
        icon: 'assignment',
        summary: 'Lập kế hoạch, giao việc và theo dõi tiến độ dự án trực quan để đội ngũ phối hợp tốt và hoàn thành đúng hạn.',
        features: ['Quản lý công việc bằng Kanban, danh sách và lịch', 'Theo dõi mốc, tiến độ và người phụ trách', 'Ghi nhận thời gian và chi phí dự án', 'Trao đổi, đính kèm và nhắc hạn tập trung'],
        suitable: ['Đội dự án từ 5–100 thành viên', 'Công ty dịch vụ, tư vấn hoặc triển khai', 'Nhóm cần quản lý công việc và tiến độ tập trung'],
        workflow: ['Khởi tạo mục tiêu và kế hoạch dự án', 'Phân công nhiệm vụ và nguồn lực', 'Thực hiện, cập nhật và kiểm soát tiến độ', 'Nghiệm thu, tổng kết và lưu bài học'],
        screens: ['Bảng công việc', 'Tiến độ dự án', 'Lịch và mốc việc', 'Báo cáo nguồn lực']
    },
    website: {
        title: 'Trang web',
        icon: 'language',
        summary: 'Thiết kế và vận hành website doanh nghiệp hiện đại bằng trình kéo thả, đồng bộ sản phẩm, khách hàng và dữ liệu bán hàng.',
        features: ['Thiết kế trang bằng các khối kéo thả', 'Tối ưu hiển thị trên máy tính và di động', 'Quản lý nội dung, biểu mẫu và SEO', 'Kết nối thương mại điện tử và CRM'],
        suitable: ['Doanh nghiệp cần website giới thiệu chuyên nghiệp', 'Đơn vị bán hàng hoặc thu thập khách hàng trực tuyến', 'Đội marketing muốn tự quản lý nội dung'],
        workflow: ['Xác định mục tiêu và cấu trúc website', 'Thiết kế giao diện, nhập nội dung', 'Kiểm tra hiển thị, SEO và biểu mẫu', 'Xuất bản, đo lường và tối ưu'],
        screens: ['Trình dựng website', 'Quản lý nội dung', 'Cấu hình SEO', 'Phân tích truy cập']
    }
};

let activeGallery = [];
let activeGalleryIndex = 0;
let activeAppIndex = 0;
const appCardList = Array.from(document.querySelectorAll('.app-carousel-track .app-card'));
const galleryImages = ['./A1.png', './A2.png', './A3.png'];

const setGalleryImage = (index) => {
    if (!activeGallery.length) return;
    activeGalleryIndex = (index + activeGallery.length) % activeGallery.length;
    const image = activeGallery[activeGalleryIndex];
    galleryMain.src = image.src;
    galleryMain.alt = image.alt;
    galleryMain.classList.remove('is-changing');
    void galleryMain.offsetWidth;
    galleryMain.classList.add('is-changing');
    galleryThumbs.querySelectorAll('.app-gallery-thumb').forEach((thumb, thumbIndex) => {
        thumb.classList.toggle('is-active', thumbIndex === activeGalleryIndex);
        thumb.setAttribute('aria-current', thumbIndex === activeGalleryIndex ? 'true' : 'false');
    });
};

const openAppModal = (card) => {
    const detail = appDetails[card.dataset.app];
    if (!detail || !appModal) return;

    activeAppIndex = appCardList.findIndex((appCard) => appCard.dataset.app === card.dataset.app);
    const previousIndex = (activeAppIndex - 1 + appCardList.length) % appCardList.length;
    const nextIndex = (activeAppIndex + 1) % appCardList.length;
    const previousDetail = appDetails[appCardList[previousIndex].dataset.app];
    const nextDetail = appDetails[appCardList[nextIndex].dataset.app];
    modalTitle.textContent = detail.title;
    modalIcon.textContent = detail.icon;
    modalSummary.textContent = detail.summary;
    appSwitchPrevLabel.textContent = previousDetail.title;
    appSwitchNextLabel.textContent = nextDetail.title;
    appSwitchPrev.setAttribute('aria-label', `Chức năng trước: ${previousDetail.title}`);
    appSwitchNext.setAttribute('aria-label', `Chức năng tiếp theo: ${nextDetail.title}`);
    featureList.replaceChildren(...detail.features.map((feature) => {
        const item = document.createElement('li');
        item.textContent = feature;
        return item;
    }));
    suitableList.replaceChildren(...detail.suitable.map((audience) => {
        const item = document.createElement('li');
        item.textContent = audience;
        return item;
    }));
    workflowList.replaceChildren(...detail.workflow.map((step) => {
        const item = document.createElement('li');
        item.textContent = step;
        return item;
    }));
    activeGallery = galleryImages.map((src, index) => ({
        src,
        alt: `${detail.title} - hình ảnh giới thiệu ${index + 1}`
    }));
    galleryThumbs.replaceChildren(...activeGallery.map((image, index) => {
        const button = document.createElement('button');
        const thumbnail = document.createElement('img');
        button.className = 'app-gallery-thumb';
        button.type = 'button';
        button.setAttribute('aria-label', `Xem ảnh giới thiệu ${index + 1}`);
        thumbnail.src = image.src;
        thumbnail.alt = '';
        button.appendChild(thumbnail);
        button.addEventListener('click', () => setGalleryImage(index));
        return button;
    }));
    setGalleryImage(0);

    if (!appModal.open) appModal.showModal();
    document.body.classList.add('modal-open');
};

appCards.forEach((card) => {
    card.addEventListener('click', () => {
        if (card.classList.contains('is-dissolving')) return;

        if (reduceMotion.matches) {
            openAppModal(card);
            return;
        }

        const icon = card.querySelector('.app-icon');
        card.classList.add('is-dissolving');

        for (let index = 0; index < 20; index += 1) {
            const particle = document.createElement('span');
            const angle = (Math.PI * 2 * index) / 20 + (Math.random() - 0.5) * 0.35;
            const distance = 28 + Math.random() * 34;

            particle.className = 'icon-particle';
            particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
            particle.style.setProperty('--size', `${3 + Math.random() * 5}px`);
            particle.style.animationDelay = `${Math.random() * 80}ms`;
            icon.appendChild(particle);
        }

        window.setTimeout(() => {
            icon.querySelectorAll('.icon-particle').forEach((particle) => particle.remove());
            card.classList.remove('is-dissolving');
        }, 850);

        window.setTimeout(() => openAppModal(card), 280);
    });
});

const scrollAppCarousel = (direction) => {
    if (!appCarouselViewport) return;
    const distance = Math.max(280, appCarouselViewport.clientWidth * 0.72);
    appCarouselViewport.scrollBy({ left: distance * direction, behavior: 'smooth' });
};

appCarouselPrev?.addEventListener('click', () => scrollAppCarousel(-1));
appCarouselNext?.addEventListener('click', () => scrollAppCarousel(1));

const closeAppModal = () => {
    if (appModal?.open) appModal.close();
};

modalClose?.addEventListener('click', closeAppModal);
galleryPrev?.addEventListener('click', () => setGalleryImage(activeGalleryIndex - 1));
galleryNext?.addEventListener('click', () => setGalleryImage(activeGalleryIndex + 1));
appSwitchPrev?.addEventListener('click', () => {
    const previousIndex = (activeAppIndex - 1 + appCardList.length) % appCardList.length;
    openAppModal(appCardList[previousIndex]);
});
appSwitchNext?.addEventListener('click', () => {
    const nextIndex = (activeAppIndex + 1) % appCardList.length;
    openAppModal(appCardList[nextIndex]);
});

appModal?.addEventListener('click', (event) => {
    if (event.target === appModal) closeAppModal();
});

appModal?.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
});
