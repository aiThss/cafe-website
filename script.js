// --- HÀM XỬ LÝ DYNAMIC ---

// Hàm định dạng tiền tệ (VD: 25000 -> 25.000đ)
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Hàm Render Footer (Chân trang)
// Hàm Render Footer (Chân trang - Ảnh và Bản quyền)
function renderFooter() {
    const container = document.querySelector('.container');
    if (!container) return;

    // Kiểm tra xem đã có footer custom chưa
    if (document.querySelector('.custom-footer')) return;

    const footerHTML = `
        <footer class="custom-footer">
            <div class="footer-content">
                <p>Bản quyền thuộc về ❤️ 𝘢𝘪𝘛𝘩𝘴 &copy; 2026</p>
                <p>Design with ❤️ 𝘢𝘪𝘛𝘩𝘴</p>
            </div>
        </footer>
    `;

    // Thêm vào SAU container chính (để nằm cuối cùng)
    container.insertAdjacentHTML('afterend', footerHTML);

    // Render nút liên hệ
    if (!document.querySelector('.btn-lien-he')) {
        renderPhoneButton();
    }
}

// Hàm render (vẽ) menu ra màn hình

// Hàm render (vẽ) menu ra màn hình
function renderMenu() {
    const menuContainer = document.getElementById('menu-list');

    // Nếu không tìm thấy chỗ chứa menu thì dừng
    if (!menuContainer) return;

    // Xóa nội dung cũ và hiển thị loading 3 chấm
    menuContainer.innerHTML = `
        <div class="loading-msg">
            Đang tải món ngon về bản<span class="loading-dots"></span>
        </div>
    `;

    // Xác định URL API dựa trên môi trường (Local hay Production)
    const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    // Nếu chạy local, trỏ về backend local (port 5000). Nếu deploy, dùng relative path.
    const API_URL = isLocal ? 'http://localhost:5000/products' : '/products';

    console.log('Fetching menu from:', API_URL);

    // Link CDN dự phòng cho ảnh (Github Repo)
    const CDN_PREFIX = 'https://raw.githubusercontent.com/aiThss/cafe-website/main/cfe_img/coffee-img/';

    // Gọi API từ json-server
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            menuContainer.innerHTML = '';

            data.forEach(item => {
                // Xử lý ảnh: Ưu tiên ảnh local, nếu lỗi thì fallback (xử lý ở thẻ img)
                // Logic: Nếu ảnh là link full (http) -> dùng luôn.
                // Nếu là tên file -> ghép đường dẫn local.
                // Xử lý ảnh: Default nếu thiếu
                let imgSrc = item.image || 'cfe_img/coffee-img/logo-resize.png';

                if (imgSrc && !imgSrc.startsWith('http')) {
                    if (imgSrc.includes('cfe_img/')) {
                        imgSrc = imgSrc;
                    } else {
                        imgSrc = `cfe_img/coffee-img/${imgSrc}`;
                    }
                }

                const itemId = item._id || item.id;
                // Safe filename for CDN
                const safeImgName = (item.image || '').replace(/.*\//, '') || 'logo-resize.png';

                const html = `
                    <div class="menu-item" onclick="showProductDetail('${itemId}')">
                        <div class="menu-img-container">
                            <img src="${imgSrc}" 
                                 alt="${item.name}" 
                                 loading="lazy" 
                                 onerror="this.onerror=null; this.src='${CDN_PREFIX}${safeImgName}';">
                        </div>
                        <h3>${item.name}</h3>
                        <p class="desc-text">${item.description || ''}</p>
                        <p style="color: var(--mau-nhan); font-weight: bold; margin-top: 5px;">${formatCurrency(item.price)}</p>
                    </div>
                `;
                menuContainer.innerHTML += html;
            });
        })
        .catch(error => {
            console.error('Lỗi lấy dữ liệu:', error);
            menuContainer.innerHTML = `<p style="text-align:center; color:red;">Lỗi kết nối Server!</p>`;
        });
}

// Hàm xem chi tiết (đã fix lỗi undefined)
function showProductDetail(id) {
    if (!id || id === 'undefined') {
        alert('Không tìm thấy thông tin món (Mã lỗi: ID Null)');
        return;
    }

    const API_URL_DETAIL = window.location.hostname === 'localhost'
        ? `http://localhost:5000/products/${id}`
        : `/products/${id}`;

    fetch(API_URL_DETAIL)
        .then(response => {
            if (!response.ok) throw new Error('Món ăn không tồn tại hoặc đã bị xóa');
            return response.json();
        })
        .then(product => {
            alert(`Bạn chọn món: ${product.name}\nGiá: ${formatCurrency(product.price)}\n\n${product.description || ''}`);
        })
        .catch(error => {
            console.error(error);
            alert('Lỗi: ' + error.message);
        });
}

// --- KHỞI CHẠY ---
// --- KHỞI CHẠY ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cài đặt lại giao diện Sáng/Tối
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        // Kích hoạt tính năng Dark Mode
        setupDarkMode();

        // 2. Setup Navigation (SPA)
        setupNavigation();

        // 3. Render Menu ngay lập tức nếu đang ở trang có menu-list
        renderMenu();

        // 4. Render Footer
        renderFooter();

        // Thêm class loaded để hiện body
        document.body.classList.add('loaded');
    });

// --- LOGIC DARK MODE ---
function setupDarkMode() {
    const btn = document.querySelector('.nut-che-do');
    if (!btn) return;

    // Icon Mặt trời (Cho Dark Mode - báo hiệu chuyển sang Sáng)
    const iconSun = `
        <svg class="icon-che-do" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
    `;

    // Icon Mặt trăng (Cho Light Mode - báo hiệu chuyển sang Tối)
    const iconMoon = `
        <svg class="icon-che-do" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;

    // Hàm cập nhật icon dựa trên trạng thái hiện tại
    const updateIcon = () => {
        const isDark = document.body.classList.contains('dark-mode');

        // Xóa icon cũ
        const oldIcon = btn.querySelector('svg');
        if (oldIcon) oldIcon.remove();

        // Chèn icon mới
        const newIconHTML = isDark ? iconSun : iconMoon;
        btn.insertAdjacentHTML('afterbegin', newIconHTML);

        // Cập nhật text Sáng/Tối
        let span = btn.querySelector('span');
        if (!span) {
            // Nếu chưa có span thì tạo mới
            span = document.createElement('span');
            btn.appendChild(span);
        }
        span.innerText = isDark ? 'Sáng' : 'Tối';
        // Đảm bảo hiển thị (vì có thể bị CSS ẩn)
        span.style.display = 'inline-block';
        span.style.marginLeft = '5px';
    };

    // Khởi tạo icon
    updateIcon();

    btn.addEventListener('click', () => {
        // Ngăn chặn spam click khi đang chạy animation
        if (btn.classList.contains('chuyen-dong')) return;

        // Bắt đầu hiệu ứng nảy
        btn.classList.add('chuyen-dong');

        // Đợi nút thu nhỏ (khoảng 30% của 500ms = 150ms) rồi mới đổi trạng thái
        setTimeout(() => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            updateIcon();
        }, 150);

        // Xóa class animation sau khi hoàn tất (500ms)
        setTimeout(() => {
            btn.classList.remove('chuyen-dong');
        }, 500);
    });
}

// Cache for page content
const pageCache = {};

function setupNavigation() {
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        // Chỉ xử lý link nội bộ
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;

        if (href.endsWith('.html') || href === '/' || href === '') {
            e.preventDefault();
            navigateTo(href);
        }
    });

    window.addEventListener('popstate', (event) => {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        loadPageContent(path, false);
    });
}

function navigateTo(url) {
    // Nếu bấm vào chính trang hiện tại thì không làm gì
    if (url === window.location.pathname.split('/').pop()) return;
    window.history.pushState({}, '', url);
    loadPageContent(url, true);
}

function loadPageContent(url, isNewNavigation) {
    const container = document.querySelector('.container');

    // Update Menu Active State
    document.querySelectorAll('.muc-menu').forEach(link => {
        link.classList.remove('dang-chon');
        const linkHref = link.getAttribute('href');
        if (linkHref === url || (url === '' && linkHref === 'index.html')) {
            link.classList.add('dang-chon');
        }
    });

    container.classList.add('fade-out');

    const updateDOM = (htmlText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const newContainer = doc.querySelector('.container');
        const newTitle = doc.querySelector('title');

        if (newContainer) {
            setTimeout(() => {
                // Thay thế nội dung
                container.innerHTML = newContainer.innerHTML;
                if (newTitle) document.title = newTitle.innerText;

                // QUAN TRỌNG: Gọi renderMenu SAU KHI nội dung đã được chèn vào DOM
                // Bất kể URL là gì, cứ thử gọi renderMenu. Nếu có #menu-list nó sẽ chạy, không thì thôi.
                // Cách này an toàn hơn check URL vì URL đôi khi không chuẩn.
                renderMenu();

                // Gọi render Footer lại vì container bị thay mới
                renderFooter();

                // Scroll lên đầu trang
                window.scrollTo(0, 0);

                container.classList.remove('fade-out');
                container.classList.add('fade-in');

                setTimeout(() => {
                    container.classList.remove('fade-in');
                }, 400);
            }, 200);
        }
    };

    if (pageCache[url]) {
        updateDOM(pageCache[url]);
    } else {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(html => {
                pageCache[url] = html;
                updateDOM(html);
            })
            .catch(err => {
                console.error('Lỗi tải trang:', err);
                container.innerHTML = '<h3>Có lỗi xảy ra. Vui lòng tải lại trang.</h3>';
                container.classList.remove('fade-out');
                container.classList.add('fade-in');
            });
    }
}

// Hàm Render Phone Button (Nút liên hệ)
function renderPhoneButton() {
    if (document.querySelector('.btn-lien-he')) return;

    // Chèn Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
    }

    // Tạo nút gọi
    const btnHTML = `
        <a href="info.html" class="btn-lien-he">
            <i class="fa-solid fa-phone"></i>
        </a>
    `;
    document.body.insertAdjacentHTML('beforeend', btnHTML);
}

// --- HIỆU ỨNG TEXT BỐC ĐẦU SMOOTH ---
document.addEventListener('DOMContentLoaded', () => {
    // Gọi hàm setup khi tải trang
    setupBocDauText();
    // Khởi tạo các hàm khác
    if (typeof setupDarkMode === 'function') setupDarkMode();
    if (typeof renderFooter === 'function') renderFooter();
});

function setupBocDauText() {
    const pTag = document.querySelector('.welcome-banner p');
    if (!pTag) return; // Không tìm thấy thì thôi

    const text = "Nơi tình yêu bốc đầu";
    // Xóa nội dung text cũ để thay bằng các span
    pTag.innerHTML = '';

    // Thêm class để áp dụng CSS flex
    pTag.classList.add('text-container');

    // Tốc độ xuất hiện từng chữ (0.1s)
    const delayStep = 0.1;

    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        // Ký tự khoảng trắng cần Non-breaking space để không bị dính
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'letter';
        // Delay tăng dần cho từng chữ
        span.style.animationDelay = `${index * delayStep}s`;
        pTag.appendChild(span);
    });
}
