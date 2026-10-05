import './Footer.css'

type Language = 'en' | 'el'

type FooterProps = {
  language: Language
}

function Footer({ language }: FooterProps) {
  const copyright = '© 2026 fluxBuffalo Studio'

  const emailLabel =
    language === 'en'
      ? 'Email fluxBuffalo Studio'
      : 'Αποστολή email στο fluxBuffalo Studio'

const posterLabel =
  language === 'en'
    ? 'Open programme poster (PDF, opens in a new tab)'
    : 'Άνοιγμα αφίσας προγράμματος (PDF, ανοίγει σε νέα καρτέλα)'

const bannerAlt =
  language === 'en'
    ? 'EU, ESPA 2021–2027 and DYPA co-financing banner'
    : 'Banner συγχρηματοδότησης ΕΕ, ΕΣΠΑ 2021–2027 και ΔΥΠΑ'
    
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>{copyright}</p>

        <a
          href="mailto:contact@fluxbuffalostudio.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={emailLabel}
        >
          contact@fluxbuffalostudio.com
        </a>
      </div>

      <a
        className="funding-banner"
        href="/poster.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={posterLabel}
      >
        <img src="/banner.jpg" alt={bannerAlt} />
      </a>
    </footer>
  )
}

export default Footer