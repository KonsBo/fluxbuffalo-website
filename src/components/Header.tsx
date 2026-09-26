import './Header.css'
import LanguageSwitcher from './LanguageSwitcher'

type Language = 'en' | 'el'

type HeaderProps = {
  language: Language
  onToggle: () => void
}

function Header({ language, onToggle }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand-logo-link" href="#main-content" aria-label="fluxBuffalo Studio — Home">
        <img
          className="brand-logo"
          src="/fluxbuffalo-mark.svg"
          alt="fluxBuffalo Studio"
        />
      </a>

      <nav className="site-nav" aria-label={language === 'en' ? 'Primary navigation' : 'Κύρια πλοήγηση'}>
        <a href="#studio">
          {language === 'en' ? 'Studio' : 'Studio'}
        </a>

        <a href="#app">
          {language === 'en' ? 'Mockspace' : 'Mockspace'}
        </a>

        <a href="#contact">
          {language === 'en' ? 'Contact' : 'Επικοινωνία'}
        </a>
      </nav>
      <LanguageSwitcher language={language} onToggle={onToggle} />
    </header>
  )
}

export default Header