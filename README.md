# Ceren’in portfolio ekranı

Figma’daki `17:83` ana desktop ekranı, Next.js ve Tailwind CSS ile oluşturuldu.
19 orijinal görsel `public/images` klasöründedir. Fontlar yerel paketlerden yüklenir.
Popup ve animasyonlar bu aşamaya dahil değildir; ikonlar statiktir.

## Sayfayı açmak

Sunucu çalışırken tarayıcıda http://127.0.0.1:3000 adresini açın.

## Daha sonra yeniden çalıştırmak

Node.js ve pnpm kurulu bir bilgisayarda proje klasöründeki terminalde:

```sh
pnpm install
pnpm dev
```

Bu bilgisayarda ayrıca kurulum yapmadan, PowerShell terminalinde şu komutları kullanabilirsiniz:

```powershell
$env:PATH = 'C:\Users\isra3\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
& 'C:\Users\isra3\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd' dev
```

Terminali kapatırsanız sunucu durur. Durdurmak için Ctrl+C kullanabilirsiniz.

## Dosyalar

- `app/page.tsx`: ana sayfa
- `app/layout.tsx`: fontlar ve sayfa başlığı
- `app/globals.css`: ortak stiller ve orantılı ölçekleme
- `components/DesktopScreen.tsx`: arka plan, çerçeve ve ikonların konumları
- `components/DesktopIcon.tsx`: ikon ve etiketi
- `components/PortfolioCard.tsx`: kart, yazılar ve sticker’lar

Referans tuval 1440 × 1025 pikseldir. Küçük pencerelerde tüm tuval orantılı küçülür; ayrı bir mobil tasarım uygulanmaz.

Üretim kontrolü: `pnpm build`
