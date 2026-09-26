import './Footer.css'

type Language = 'en' | 'el'

type FooterProps = {
  language: Language
}

function Footer({ language }: FooterProps) {
  const copyright =
    language === 'en'
      ? '© 2026 fluxBuffalo Studio'
      : '© 2026 fluxBuffalo Studio'

  const posterLabel =
    language === 'en'
      ? 'Open the official programme poster in a new tab'
      : 'Άνοιγμα της επίσημης αφίσας του προγράμματος σε νέα καρτέλα'

  const bannerAlt =
    language === 'en'
      ? 'Official co-financing banner for the entrepreneurship support programme for unemployed people aged 30 to 59'
      : 'Επίσημο banner συγχρηματοδότησης για το πρόγραμμα στήριξης της επιχειρηματικότητας ανέργων ηλικίας 30 έως 59 ετών'

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>{copyright}</p>

        <a href="mailto:contact@fluxbuffalostudio.com"
          target="_blank"
  rel="noopener noreferrer"
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