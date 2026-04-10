// Hàm tạo sidebar chung
function renderSidebar(currentPage) {
    const sidebarHTML = `
        <div class="p-5 flex items-center border-b border-blue-700">
            <div class="bg-blue-600 p-2 rounded-lg">
                <i class="fas fa-taxi text-xl"></i>
            </div>
            <h1 class="text-xl font-bold ml-3">Home Screen Admin</h1>
        </div>
        
        <nav class="p-3">
            <ul class="space-y-1">
                <li>
                    <a href="index.html" class="${currentPage === 'dashboard' ? 'dashboard-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'dashboard-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-tachometer-alt mr-3"></i> Dashboard
                    </a>
                </li>
                <li>
                    <a href="sections.html" class="${currentPage === 'sections' ? 'sections-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'sections-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-th-large mr-3"></i> Home Sections
                    </a>
                </li>
                <li>
                    <a href="banners.html" class="${currentPage === 'banners' ? 'banners-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'banners-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-image mr-3"></i> Banner Management
                    </a>
                </li>
                <li>
                    <a href="services.html" class="${currentPage === 'services' ? 'services-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'services-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-concierge-bell mr-3"></i> Services Management
                    </a>
                </li>
                <li>
                    <a href="content.html" class="${currentPage === 'content' ? 'content-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'content-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-newspaper mr-3"></i> Content Management
                    </a>
                </li>
                <li>
                    <a href="bubble.html" class="${currentPage === 'bubble' ? 'bubble-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'bubble-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-circle mr-3"></i> Floating Bubble
                    </a>
                </li>
                <li>
                    <a href="config.html" class="${currentPage === 'config' ? 'config-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'config-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-cog mr-3"></i> App Config
                    </a>
                </li>
            </ul>
        </nav>
        
        <div class="absolute bottom-0 w-full p-4 border-t border-blue-700">
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <i class="fas fa-user"></i>
                </div>
                <div class="ml-3">
                    <p class="font-medium">Admin User</p>
                    <p class="text-sm text-blue-300">admin@rideapp.com</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('sidebar').innerHTML = sidebarHTML;
}

// Hàm hiển thị modal ở giữa màn hình
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Hiển thị modal
        modal.classList.remove('hidden');
        
        // Đảm bảo modal được căn giữa
        const modalDialog = modal.querySelector('.modal-center');
        if (modalDialog) {
            modalDialog.style.position = 'fixed';
            modalDialog.style.top = '50%';
            modalDialog.style.left = '50%';
            modalDialog.style.transform = 'translate(-50%, -50%)';
        }
    }
}

// Hàm ẩn modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}