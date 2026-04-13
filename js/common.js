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
                    <a href="builder.html" class="${currentPage === 'builder' ? 'builder-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'builder-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-paint-brush mr-3"></i> Home Screen Builder
                    </a>
                </li>
                <li>
                    <a href="sections.html" class="${currentPage === 'sections' ? 'sections-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'sections-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-th-large mr-3"></i> Home Sections (Legacy)
                    </a>
                </li>
                <li>
                    <a href="banners.html" class="${currentPage === 'banners' ? 'banners-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'banners-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-image mr-3"></i> Banner Management (Legacy)
                    </a>
                </li>
                <li>
                    <a href="services.html" class="${currentPage === 'services' ? 'services-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'services-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-concierge-bell mr-3"></i> Services Management (Legacy)
                    </a>
                </li>
                <li>
                    <a href="content.html" class="${currentPage === 'content' ? 'content-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'content-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-newspaper mr-3"></i> Content Management (Legacy)
                    </a>
                </li>
                <li>
                    <a href="bubble.html" class="${currentPage === 'bubble' ? 'bubble-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'bubble-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-circle mr-3"></i> Floating Bubble (Legacy)
                    </a>
                </li>
                <li>
                    <a href="config.html" class="${currentPage === 'config' ? 'config-link active flex items-center px-4 py-3 bg-blue-700 rounded-lg text-white' : 'config-link flex items-center px-4 py-3 hover:bg-blue-700 rounded-lg text-blue-100'}">
                        <i class="fas fa-cog mr-3"></i> App Config (Legacy)
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

// Multi-language Tab Component Generator
function createMultiLangTabs(fieldId, fieldLabel, fieldType = 'input', options = {}) {
    const viValue = options.vi || '';
    const enValue = options.en || '';
    const placeholder = options.placeholder || '';
    const required = options.required !== false; // default true
    const rows = options.rows || 4;
    
    const inputHtml = fieldType === 'textarea' 
        ? `<textarea id="${fieldId}-vi" rows="${rows}" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="${placeholder}">${viValue}</textarea>
           <textarea id="${fieldId}-en" rows="${rows}" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 hidden" placeholder="${placeholder}">${enValue}</textarea>`
        : `<input type="text" id="${fieldId}-vi" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="${placeholder}" value="${viValue}">
           <input type="text" id="${fieldId}-en" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 hidden" placeholder="${placeholder}" value="${enValue}">`;
    
    return `
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">${fieldLabel}</label>
            <div class="border rounded-lg overflow-hidden">
                <div class="flex border-b bg-gray-50">
                    <button type="button" class="lang-tab-btn flex-1 px-4 py-2 text-sm font-medium border-r bg-white text-blue-600 border-blue-200" data-field="${fieldId}" data-lang="vi">
                        <span class="mr-1">🇻🇳</span> Vietnamese
                    </button>
                    <button type="button" class="lang-tab-btn flex-1 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" data-field="${fieldId}" data-lang="en">
                        <span class="mr-1">🇺🇸</span> English
                    </button>
                </div>
                <div class="p-3 relative">
                    ${inputHtml}
                    <div class="mt-2 flex items-center justify-between">
                        <span class="text-xs text-gray-500">
                            ${required ? '⚠ Required' : 'Optional'}
                            ${fieldId.endsWith('-en') || !fieldId.includes('-vi') ? '' : '• English will fallback to Vietnamese if empty'}
                        </span>
                        <button type="button" class="copy-from-vi-btn text-xs text-blue-600 hover:text-blue-800 flex items-center" data-field="${fieldId}">
                            <i class="fas fa-copy mr-1"></i> Copy from Vietnamese
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize multi-language tabs event listeners
function initMultiLangTabs() {
    // Handle tab switching
    document.querySelectorAll('.lang-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const fieldId = this.dataset.field;
            const lang = this.dataset.lang;
            
            // Update tab styles
            const container = this.closest('.border.rounded-lg');
            container.querySelectorAll('.lang-tab-btn').forEach(b => {
                b.classList.remove('bg-white', 'text-blue-600', 'border-blue-200');
                b.classList.add('text-gray-600', 'hover:bg-gray-100');
            });
            this.classList.remove('text-gray-600', 'hover:bg-gray-100');
            this.classList.add('bg-white', 'text-blue-600', 'border-blue-200');
            
            // Show/hide inputs
            document.getElementById(`${fieldId}-vi`).classList.toggle('hidden', lang !== 'vi');
            document.getElementById(`${fieldId}-en`).classList.toggle('hidden', lang !== 'en');
        });
    });
    
    // Handle copy from Vietnamese
    document.querySelectorAll('.copy-from-vi-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const fieldId = this.dataset.field;
            const viInput = document.getElementById(`${fieldId}-vi`);
            const enInput = document.getElementById(`${fieldId}-en`);
            
            if (viInput && enInput) {
                enInput.value = viInput.value;
                
                // Visual feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 1500);
            }
        });
    });
}

// Get multi-language field values
function getMultiLangValues(fieldId) {
    const viInput = document.getElementById(`${fieldId}-vi`);
    const enInput = document.getElementById(`${fieldId}-en`);
    
    return {
        vi: viInput ? viInput.value.trim() : '',
        en: enInput ? enInput.value.trim() : ''
    };
}

// Validate multi-language field (Vietnamese required)
function validateMultiLangField(fieldId, fieldName) {
    const values = getMultiLangValues(fieldId);
    
    if (!values.vi) {
        alert(`${fieldName}: Vietnamese translation is required!`);
        if (document.getElementById(`${fieldId}-vi`)) {
            document.getElementById(`${fieldId}-vi`).focus();
        }
        return false;
    }
    return true;
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
        
        // Initialize multi-language tabs after showing modal
        setTimeout(() => initMultiLangTabs(), 100);
    }
}

// Hàm ẩn modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}