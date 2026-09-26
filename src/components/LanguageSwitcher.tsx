import './LanguageSwitcher.css'

type Language = 'en' | 'el'

type LanguageSwitcherProps = {
  language: Language
  onToggle: () => void
}

function LanguageSwitcher({
  language,
  onToggle,
}: LanguageSwitcherProps) {
  const nextLanguageLabel = language === 'en' ? 'ΕΛ' : 'EN'
  const ariaLabel =
    language === 'en' ? 'Switch to Greek' : 'Αλλαγή σε Αγγλικά'

  return (
    <button
      className="language-switcher"
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {nextLanguageLabel}
    </button>
  )
}

export default LanguageSwitcher