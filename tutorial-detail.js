const articles = {
    dashboard: {
        tag: 'Cơ bản',
        tagClass: 'tutorial-tag-basic',
        title: 'Bắt đầu nhanh với Dashboard',
        summary: 'Thiết lập màn hình điều hành tập trung để theo dõi những chỉ số quan trọng nhất của doanh nghiệp.',
        duration: '5 phút đọc',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzkyuJojOt1urppL_QlR1Yp6pzt-zfZxRBs2Iq6dCnrbbn1Nl7LUIcfdbT4UC9N3rwKglcjdgzaoCUC3-yxXnxqEDvSeRyWEkrwdPZy2MRFC-naa5TctvNowF8_hymOdPjh_GS6KcRdy4uJTsMi-efqb1FRd_mdpGj_zaots2SaqL7LyvQRGogAW7Awlm_T2aVPwa8R20hjUHJNJOw7q52spzttKeRMWvlOm-Vm4j8T6AWOvy93EzP2AfiN6U0dWRXd4MlgKSPlNfX',
        sections: [
            ['1. Chọn chỉ số cần theo dõi', 'Bắt đầu với doanh thu, dòng tiền, đơn hàng và công việc quá hạn. Chỉ giữ lại các chỉ số phục vụ quyết định hằng ngày để Dashboard luôn rõ ràng.'],
            ['2. Sắp xếp bố cục', 'Kéo các thẻ quan trọng lên đầu, nhóm dữ liệu theo phòng ban và chọn khoảng thời gian mặc định phù hợp với vai trò của người sử dụng.'],
            ['3. Thiết lập cảnh báo', 'Đặt ngưỡng cảnh báo cho doanh thu, công nợ hoặc tồn kho. Hệ thống sẽ thông báo khi số liệu vượt khỏi phạm vi an toàn.']
        ],
        note: 'Mẹo: tạo một Dashboard riêng cho ban điều hành và một Dashboard tác nghiệp cho từng phòng ban.'
    },
    crm: {
        tag: 'Quản lý',
        tagClass: 'tutorial-tag-management',
        title: 'Tối ưu hóa quy trình CRM',
        summary: 'Chuẩn hóa hành trình khách hàng từ lúc tiếp nhận cơ hội đến khi chốt đơn và chăm sóc sau bán.',
        duration: '8 phút đọc',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjbm0yiCODXsXUEkncNStDX2oP-7rcEQbI1XEB8zvClJhICeFuqUEjxf-2qBhtJv2fIsREGh8zcL8rDa161W0EIMCop8lkiK8VjWNbVx7lkpvc11fVLyAlYEOjQCrcVKlobUGkmK8Fm7cVV6tmuf_GhPhFG91QYZSAcDSJWTskicjbeOhapeAXMu2YnpB7oC00CspDKFkXTFS56LjgZ_eh4iEJ91WLhosCtok00rbcR-edYuAZCOgOK1KlYcUcQQ9btJLssHpJEkDH',
        sections: [
            ['1. Xây dựng pipeline', 'Tạo các giai đoạn phản ánh đúng quy trình bán hàng: mới tiếp nhận, tư vấn, báo giá, đàm phán và hoàn tất.'],
            ['2. Tự động phân bổ khách hàng', 'Phân lead theo khu vực, sản phẩm hoặc năng lực nhân viên để rút ngắn thời gian phản hồi và tránh bỏ sót cơ hội.'],
            ['3. Đo lường chuyển đổi', 'Theo dõi tỷ lệ chuyển đổi, thời gian xử lý và nguyên nhân thất bại tại từng giai đoạn để liên tục cải thiện quy trình.']
        ],
        note: 'Mẹo: mọi cơ hội nên có người phụ trách, hành động tiếp theo và thời hạn cụ thể.'
    },
    'ai-report': {
        tag: 'Nâng cao',
        tagClass: 'tutorial-tag-advanced',
        title: 'Tích hợp AI vào báo cáo',
        summary: 'Khai thác AI để tóm tắt số liệu, phát hiện xu hướng và hỗ trợ ban điều hành đưa ra quyết định nhanh hơn.',
        duration: '10 phút đọc',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYm40wioNBCCT0r82F5_aDEjzhvq9bVsrnfxnRYmyEDBZiE3nYgRj4sYdeL-OFBwBW2qpKycaGUxUfm2GFoZC5wI5UZQB7AS3Bq57yivK2348hvp0VtuWFaH_3bi9VTCNSUUh9V4cJa2ujKjLtwJDzc9YJmf3WZjmZZEb7_EbbO-VER0ztIhJUsa0sO7cjEiWwQN39VOeUF-HjH4hm6-0TTp8-P5XZf3sLloUlbNEqbqYh8vU89m3qmhvluC33rEGZwrK0Pd0o4O3u',
        sections: [
            ['1. Chuẩn hóa nguồn dữ liệu', 'Đảm bảo dữ liệu bán hàng, tài chính và vận hành được cập nhật đầy đủ trước khi yêu cầu AI phân tích.'],
            ['2. Đặt câu hỏi rõ ràng', 'Xác định phạm vi thời gian, chỉ số và mục tiêu cần phân tích. Câu hỏi càng cụ thể thì kết quả càng hữu ích.'],
            ['3. Kiểm tra và áp dụng', 'Đối chiếu đề xuất của AI với dữ liệu gốc, bổ sung bối cảnh kinh doanh rồi chuyển kết quả thành kế hoạch hành động.']
        ],
        note: 'Lưu ý: AI hỗ trợ phân tích và đề xuất, quyết định cuối cùng vẫn cần người có chuyên môn kiểm tra.'
    }
};

const params = new URLSearchParams(window.location.search);
const article = articles[params.get('article')] || articles.dashboard;
const tag = document.getElementById('article-tag');
const title = document.getElementById('article-title');
const summary = document.getElementById('article-summary');
const duration = document.getElementById('article-duration');
const image = document.getElementById('article-image');
const content = document.getElementById('article-content');

document.title = `${article.title} | EnterpriseFlow`;
tag.textContent = article.tag;
tag.className = `tutorial-tag ${article.tagClass}`;
title.textContent = article.title;
summary.textContent = article.summary;
duration.textContent = article.duration;
image.src = article.image;
image.alt = article.title;

article.sections.forEach(([heading, paragraph]) => {
    const sectionTitle = document.createElement('h2');
    const sectionText = document.createElement('p');
    sectionTitle.textContent = heading;
    sectionText.textContent = paragraph;
    content.append(sectionTitle, sectionText);
});

const note = document.createElement('div');
note.className = 'tutorial-detail-note';
note.textContent = article.note;
content.appendChild(note);
