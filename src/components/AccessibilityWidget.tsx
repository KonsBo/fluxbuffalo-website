import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons'
import './AccessibilityWidget.css'

type Language = 'en' | 'el'

type Labels = {
  en: string
  el: string
}

type Option = {
  id: string
  icon: string
  label: Labels
  levels?: number
  classPrefix?: string
  className?: string
}

type AccessibilityWidgetProps = {
  language: Language
}

const textOptions: Option[] = [
  {
    id: 'text-size',
    icon: 'Tᵀ',
    label: { en: 'Text size', el: 'Μέγεθος κειμένου' },
    levels: 4,
    classPrefix: 'a11y-text-size',
  },
  {
    id: 'line-height',
    icon: '↕',
    label: { en: 'Line height', el: 'Ύψος γραμμής' },
    levels: 3,
    classPrefix: 'a11y-line-height',
  },
  {
    id: 'text-align',
    icon: '☰',
    label: { en: 'Text alignment', el: 'Στοίχιση κειμένου' },
    levels: 2,
    classPrefix: 'a11y-text-align',
  },
  {
    id: 'readable-font',
    icon: 'Aa',
    label: { en: 'Readable font', el: 'Ευανάγνωστη γραμματοσειρά' },
    className: 'a11y-readable-font',
  },
]

const visualOptions: Option[] = [
  {
    id: 'contrast',
    icon: '◐',
    label: { en: 'High contrast', el: 'Υψηλή αντίθεση' },
    levels: 3,
    classPrefix: 'a11y-contrast',
  },
  {
    id: 'grayscale',
    icon: '◐',
    label: { en: 'Grayscale', el: 'Κλίμακα του γκρι' },
    className: 'a11y-grayscale',
  },
  {
    id: 'hide-images',
    icon: '▧',
    label: { en: 'Hide images', el: 'Απόκρυψη εικόνων' },
    className: 'a11y-hide-images',
  },
  {
    id: 'pause-motion',
    icon: 'Ⅱ',
    label: { en: 'Pause motion', el: 'Παύση κινήσεων' },
    className: 'a11y-pause-motion',
  },
]

const orientationOptions: Option[] = [
  {
    id: 'highlight-links',
    icon: '↗',
    label: { en: 'Highlight links', el: 'Επισήμανση συνδέσμων' },
    className: 'a11y-highlight-links',
  },
  {
    id: 'reading-mask',
    icon: '▤',
    label: { en: 'Reading mask', el: 'Μάσκα ανάγνωσης' },
  },
  {
    id: 'focus-outline',
    icon: '⛶',
    label: { en: 'Focus outline', el: 'Περίγραμμα εστίασης' },
    className: 'a11y-focus-outline',
  },
  {
    id: 'page-structure',
    icon: '▦',
    label: { en: 'Page structure', el: 'Δομή σελίδας' },
  },
]

function AccessibilityWidget({ language }: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [levels, setLevels] = useState<Record<string, number>>({})
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})
  const [readingMask, setReadingMask] = useState(false)
  const [showStructure, setShowStructure] = useState(false)
  const [headingList, setHeadingList] = useState<
    { tag: string; text: string; id: string }[]
  >([])

  const triggerRef = useRef<HTMLButtonElement>(null)

  const copy =
    language === 'en'
      ? {
          title: 'Accessibility',
          open: 'Open accessibility tools',
          close: 'Close accessibility tools',
          text: 'Text',
          visual: 'Visual',
          orientation: 'Orientation',
          pageStructure: 'Page structure',
          noHeadings: 'No page headings found.',
          back: 'Back',
        }
      : {
          title: 'Προσβασιμότητα',
          open: 'Άνοιγμα εργαλείων προσβασιμότητας',
          close: 'Κλείσιμο εργαλείων προσβασιμότητας',
          text: 'Κείμενο',
          visual: 'Οπτική εμφάνιση',
          orientation: 'Προσανατολισμός',
          pageStructure: 'Δομή σελίδας',
          noHeadings: 'Δεν βρέθηκαν επικεφαλίδες στη σελίδα.',
          back: 'Πίσω',
        }

  function removeLevelClasses(prefix: string, max: number) {
    for (let level = 1; level <= max; level += 1) {
      document.body.classList.remove(`${prefix}-${level}`)
    }
  }

  function cycleLevel(option: Option) {
    if (!option.levels || !option.classPrefix) return

    const currentLevel = levels[option.id] ?? 0
    const nextLevel =
      currentLevel >= option.levels ? 0 : currentLevel + 1

    removeLevelClasses(option.classPrefix, option.levels)

    if (nextLevel > 0) {
      document.body.classList.add(`${option.classPrefix}-${nextLevel}`)
    }

    setLevels((current) => ({
      ...current,
      [option.id]: nextLevel,
    }))
  }

  function closePageStructure() {
    setShowStructure(false)

    setEnabled((current) => ({
      ...current,
      'page-structure': false,
    }))
  }

  function openPageStructure() {
    const headings = Array.from(
      document.querySelectorAll(
        'main h1, main h2, main h3, main h4, main h5, main h6',
      ),
    ).map((heading, index) => {
      const element = heading as HTMLElement

      if (!element.id) {
        element.id = `page-heading-${index + 1}`
      }

      return {
        tag: element.tagName,
        text: element.textContent?.trim() || '',
        id: element.id,
      }
    })

    setHeadingList(headings)
    setShowStructure(true)

    setEnabled((current) => ({
      ...current,
      'page-structure': true,
    }))
  }

  function toggleOption(option: Option) {
    if (option.id === 'reading-mask') {
      setReadingMask((current) => !current)
      return
    }

    if (option.id === 'page-structure') {
      openPageStructure()
      return
    }

    if (!option.className) return

    document.body.classList.toggle(option.className)

    setEnabled((current) => ({
      ...current,
      [option.id]: !current[option.id],
    }))
  }

  function handleOption(option: Option) {
    if (option.levels) {
      cycleLevel(option)
      return
    }

    toggleOption(option)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return

      if (showStructure) {
        closePageStructure()
        return
      }

      if (isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, showStructure])

  useEffect(() => {
    if (!readingMask) return

    function moveMask(event: MouseEvent) {
      document.documentElement.style.setProperty(
        '--a11y-mask-top',
        `${Math.max(0, event.clientY - 55)}px`,
      )
    }

    window.addEventListener('mousemove', moveMask)

    return () => {
      window.removeEventListener('mousemove', moveMask)
      document.documentElement.style.removeProperty('--a11y-mask-top')
    }
  }, [readingMask])

  function renderMeter(option: Option) {
    if (!option.levels) return null

    const currentLevel = levels[option.id] ?? 0

    return (
      <span className="a11y-level-meter" aria-hidden="true">
        {Array.from({ length: option.levels }, (_, index) => (
          <span
            key={index}
            className={index < currentLevel ? 'is-filled' : ''}
          />
        ))}
      </span>
    )
  }

  function renderOption(option: Option) {
    const currentLevel = levels[option.id] ?? 0

    const isActive =
      currentLevel > 0 ||
      enabled[option.id] === true ||
      (option.id === 'reading-mask' && readingMask)

    return (
      <button
        key={option.id}
        className={`accessibility-option${isActive ? ' is-active' : ''}`}
        type="button"
        onClick={() => handleOption(option)}
        aria-pressed={isActive}
      >
        <span className="a11y-option-icon" aria-hidden="true">
          {option.icon}
        </span>

        <span className="a11y-option-label">
          {option.label[language]}
        </span>

        {renderMeter(option)}
      </button>
    )
  }

  return (
    <>
      <div className="accessibility-widget" data-accessibility-widget>
        {isOpen && (
          <div
            id="accessibility-panel"
            className="accessibility-panel"
            data-accessibility-panel
            role="dialog"
            aria-modal="false"
            aria-labelledby="accessibility-title"
          >
            <div className="accessibility-panel-header">
              <div>
                <p className="accessibility-overline">fluxBuffalo Studio</p>
                <h2 id="accessibility-title">{copy.title}</h2>
              </div>

              <button
                className="accessibility-close"
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  triggerRef.current?.focus()
                }}
                aria-label={copy.close}
              >
                ×
              </button>
            </div>

            <section className="accessibility-group">
              <h3 className="accessibility-group-title">{copy.text}</h3>

              <div className="accessibility-options-grid">
                {textOptions.map(renderOption)}
              </div>
            </section>

            <section className="accessibility-group">
              <h3 className="accessibility-group-title">{copy.visual}</h3>

              <div className="accessibility-options-grid">
                {visualOptions.map(renderOption)}
              </div>
            </section>

            <section className="accessibility-group">
              <h3 className="accessibility-group-title">
                {copy.orientation}
              </h3>

              <div className="accessibility-options-grid">
                {orientationOptions.map(renderOption)}
              </div>
            </section>
          </div>
        )}

        <button
          ref={triggerRef}
          className="accessibility-trigger"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="accessibility-panel"
          aria-label={copy.open}
          title={copy.title}
        >
          <FontAwesomeIcon icon={faUniversalAccess} aria-hidden="true" />
        </button>
      </div>

      {readingMask && (
        <div className="reading-mask" aria-hidden="true" />
      )}

      {showStructure && (
        <div
          className="page-structure-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={copy.pageStructure}
        >
          <div className="page-structure-header">
            <button
              className="page-structure-back"
              type="button"
              onClick={closePageStructure}
              aria-label={copy.back}
            >
              ←
            </button>

            <h2>{copy.pageStructure}</h2>

            <button
              className="page-structure-close"
              type="button"
              onClick={closePageStructure}
              aria-label={copy.close}
            >
              ×
            </button>
          </div>

          <ul className="page-structure-list">
            {headingList.length === 0 ? (
              <li className="page-structure-empty">{copy.noHeadings}</li>
            ) : (
              headingList.map((heading) => (
                <li key={heading.id}>
                  <button
                    type="button"
                    onClick={() => {
                      closePageStructure()

                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      })
                    }}
                  >
                    <span>{heading.tag}</span>
                    {heading.text}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default AccessibilityWidget