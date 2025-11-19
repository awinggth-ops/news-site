// Muat berita dari localStorage saat halaman load
document.addEventListener('DOMContentLoaded', loadNews);

// Fungsi untuk memuat berita
function loadNews() {
    const news = JSON.parse(localStorage.getItem('news')) || [];
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    news.forEach(item => {
        const article = document.createElement('div');
        article.className = 'article';
        article.innerHTML = `
            <img src="${item.image}" alt="Gambar Berita">
            <h3>${item.title}</h3>
            <p>${item.content.substring(0, 100)}...</p>
        `;
        container.appendChild(article);
    });
}

// Modal untuk tambah berita
const modal = document.getElementById('news-modal');
const btn = document.getElementById('add-news-btn');
const close = document.querySelector('.close');

btn.onclick = () => modal.style.display = 'block';
close.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Preview gambar saat upload
document.getElementById('image').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('image-preview').src = e.target.result;
            document.getElementById('image-preview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Simpan berita baru
document.getElementById('news-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image-preview').src || '';

    const news = JSON.parse(localStorage.getItem('news')) || [];
    news.push({ title, content, image });
    localStorage.setItem('news', JSON.stringify(news));

    loadNews(); // Refresh tampilan
    modal.style.display = 'none';
    this.reset(); // Reset form
    document.getElementById('image-preview').style.display = 'none';
});