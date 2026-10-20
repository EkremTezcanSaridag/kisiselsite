# Ekrem Tezcan Sarıdağ - Portfolio Website

Bu proje, Ekrem Tezcan Sarıdağ için AI destekli yazılım geliştirme kursu kapsamında hazırlanmış modern, responsive ve dinamik bir portfolio web sitesidir.

## 🚀 Özellikler

### Tasarım
- **Modern Dark Theme**: Koyu tema ile göz yormayan tasarım
- **Gradient Aksan Renkleri**: Mor-mavi-pembe gradient geçişleri
- **Animasyonlu Hero Bölümü**: Etkileyici giriş sayfası
- **Scroll Reveal Animasyonları**: Sayfa kaydırıldıkça ortaya çıkan elementler
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Erişilebilir**: WCAG standartlarına uygun

### Bölümler
1. **Ana Sayfa (Hero)**: Animasyonlu gradient arka plan ve CTA butonları
2. **Hakkımda**: Özet bilgi ve istatistikler
3. **Eğitim**: Timeline formatında eğitim geçmişi
4. **Deneyim**: BAUM staj deneyimi detayları
5. **GitHub**: Depo bağlantıları (profil, YakitRadar, dijital-arsiv)
6. **Yetenekler**: Kategorize edilmiş teknik beceriler ve sertifikalar
7. **İletişim**: İletişim bilgileri ve sosyal medya linkleri

### Teknik Özellikler
- Vanilla JavaScript (framework'süz)
- Modern CSS (Grid, Flexbox, Custom Properties)
- Intersection Observer API ile performanslı animasyonlar
- Smooth scrolling
- Mobile-first yaklaşım
- SEO optimizasyonu

## 📦 Kurulum ve Yerel Çalıştırma

### Gereksinimler
Herhangi bir web tarayıcısı (Chrome, Firefox, Safari, Edge)

### Yerel Olarak Çalıştırma

1. Projeyi klonlayın:
```bash
git clone https://github.com/EkremTezcanSaridag/portfolio.git
cd portfolio
```

2. `index.html` dosyasını tarayıcınızda açın veya yerel bir sunucu başlatın:

**Python ile:**
```bash
python -m http.server 8000
```

**Node.js ile (http-server):**
```bash
npx http-server
```

**VS Code Live Server ile:**
- VS Code'da projeyi açın
- `index.html` dosyasına sağ tıklayın
- "Open with Live Server" seçeneğini seçin

3. Tarayıcınızda `http://localhost:8000` adresini açın

## 🌐 GitHub Pages Deployment

### Otomatik Deployment (GitHub Actions)

Bu proje, GitHub Actions ile otomatik deployment için yapılandırılmıştır.

1. **GitHub Repository Ayarları (repo sahibi bir kez yapmalı):**
   - Repository **Settings → Pages**
   - **Build and deployment → Source:** **GitHub Actions**
   - Cloud agent / `gh` token ile bu adım otomatik açılamazsa (403), ayarı repo sahibi elle yapar; ardından `main` push veya Actions’tan **Deploy to GitHub Pages** workflow’unu çalıştırın

2. **Deploy:**
   - `main` branch'ine push yaptığınızda otomatik olarak deploy edilir
   - `.github/workflows/deploy.yml` dosyası deployment sürecini yönetir

3. **Manuel Deploy:**
   - GitHub repository'nizde "Actions" sekmesine gidin
   - "Deploy to GitHub Pages" workflow'unu seçin
   - "Run workflow" butonuna tıklayın

### GitHub Pages URL
Siteniz şu adreste yayınlanacaktır:
```
https://[kullanıcı-adınız].github.io/[repo-adı]/
```

Örnek:
```
https://EkremTezcanSaridag.github.io/portfolio/
```

## 📁 Proje Yapısı

```
portfolio/
├── index.html              # Ana HTML dosyası
├── styles.css              # Tüm CSS stilleri
├── script.js               # JavaScript fonksiyonları
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment config
└── README.md               # Proje dokümantasyonu
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Arka Plan**: `#0a0e1a` (Birincil), `#131829` (İkincil)
- **Metin**: `#e8eaed` (Birincil), `#9ca3af` (İkincil)
- **Aksan**: `#6366f1` (Mavi), `#8b5cf6` (Mor), `#ec4899` (Pembe)
- **Gradient**: Mavi-Mor-Pembe geçişli

### Tipografi
- Font Family: Inter (Google Fonts)
- Responsive font sizing: `clamp()` fonksiyonu ile
- Font weights: 300-800 arası

### Animasyonlar
- Fade in up animasyonları
- Scroll reveal efektleri
- Hover transformasyonları
- Gradient animasyonları
- Parallax efektler

## 🔧 Özelleştirme

### İçerik Değişikliği
`index.html` dosyasını düzenleyerek içeriği güncelleyebilirsiniz:
- Kişisel bilgiler
- Eğitim geçmişi
- GitHub depoları
- Yetenekler
- İletişim bilgileri

### Stil Değişiklikleri
`styles.css` dosyasındaki CSS değişkenlerini düzenleyerek tasarımı özelleştirebilirsiniz:
```css
:root {
    --color-accent-primary: #6366f1;  /* Ana aksan rengi */
    --color-accent-secondary: #8b5cf6; /* İkincil aksan rengi */
    /* ... diğer değişkenler */
}
```

### Fonksiyonellik Ekleme
`script.js` dosyasını düzenleyerek yeni özellikler ekleyebilirsiniz.

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🌟 Performans

- Lightweight: ~100KB toplam boyut
- Pure CSS animasyonlar (GPU hızlandırmalı)
- Lazy loading ile optimize edilmiş görseller
- Debounced scroll events
- Intersection Observer API kullanımı

## 🔒 Güvenlik

- HTTPS üzerinden servis edilir (GitHub Pages)
- XSS koruması
- Güvenli external linkler (rel="noopener noreferrer")

## 📄 Lisans

Bu proje AI destekli yazılım geliştirme kursu için hazırlanmıştır.

## 👤 İletişim

- **Email**: ekremtezcansaridag1@gmail.com
- **GitHub**: [@EkremTezcanSaridag](https://github.com/EkremTezcanSaridag)
- **LinkedIn**: [ekrem-tezcan-saridag](https://linkedin.com/in/ekrem-tezcan-saridag)
- **Telefon**: 0541 405 60 39

## 🙏 Teşekkürler

Bu proje, Anadolu Üniversitesi AI destekli yazılım geliştirme kursu kapsamında geliştirilmiştir.

---

**2026 © Ekrem Tezcan Sarıdağ - Tüm hakları saklıdır.**
