import './Header.css'
import LanguageSwitcher from './LanguageSwitcher'

type Language = 'en' | 'el'

type HeaderProps = {
  language: Language
  onToggle: () => void
}

function Header({ language, onToggle }: HeaderProps) {
  const homeLabel =
    language === 'en'
      ? 'fluxBuffalo Studio — Back to top'
      : 'fluxBuffalo Studio — Επιστροφή στην κορυφή'

  const navigationLabel =
    language === 'en' ? 'Primary navigation' : 'Κύρια πλοήγηση'

  return (
    <header className="site-header">
      <a
        className="brand-logo-link"
        href="#top"
        aria-label={homeLabel}
      >
        <img
          className="brand-logo"
          src="/fluxbuffalo-mark.svg"
          alt="fluxBuffalo Studio"
        />
      </a>

      <nav className="site-nav" aria-label={navigationLabel}>
        <a href="#studio">Studio</a>

        <a href="#app">Mockspace</a>

        <a href="#contact">
          {language === 'en' ? 'Contact' : 'Επικοινωνία'}
        </a>
      </nav>

      <LanguageSwitcher language={language} onToggle={onToggle} />
    </header>
  )
}

export default Header