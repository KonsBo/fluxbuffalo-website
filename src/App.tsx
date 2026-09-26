import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AccessibilityWidget from './components/AccessibilityWidget'
import DriftScene from './components/DriftScene'
import LogoScene from './components/LogoScene'
import HeroScene from './components/HeroScene'
import RingScene from './components/RingScene'


type Language = 'en' | 'el'
function App() {
 const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    document.documentElement.lang = language
    document.title =
      language === 'en'
        ? 'fluxBuffalo Studio'
        : 'fluxBuffalo Studio — Δημιουργικό τεχνολογικό studio'
  }, [language])

  return (
    <>
          <a className="skip-link" href="#main-content">
        {language === 'en'
          ? 'Skip to main content'
          : 'Μετάβαση στο κύριο περιεχόμενο'}
      </a>
      <Header language={language} onToggle={() => setLanguage(language === 'en' ? 'el' : 'en')} />
      <main id="main-content">
        <section className="home-main">
<div className="hero" aria-labelledby="hero-title">

<p className="hero-eyebrow">
  flux<span className="hero-eyebrow-bold">Buffalo</span>{' '}
  Studio
</p>

<h1 id="hero-title">
  {language === 'en' ? (
    <>
      Creative technology
      <br />
      for the web,
      <br />
      interactive experiences
      <br />
      and digital art.
    </>
  ) : (
    <>
      Δημιουργική τεχνολογία
      <br />
      για το web,
      <br />
      διαδραστικές εμπειρίες
      <br />
      και ψηφιακή τέχνη.
    </>
  )}
</h1>

<p className="hero-intro">
  {language === 'en'
    ? 'fluxBuffalo Studio designs and develops websites, interactive experiences and 3D projects, combining code, visual design and artistic practice.'
    : 'Το fluxBuffalo Studio σχεδιάζει και αναπτύσσει ιστοσελίδες, διαδραστικές εμπειρίες και 3D έργα, συνδυάζοντας τεχνολογία και καλλιτεχνική δημιουργία.'}
</p>

  <div className="hero-actions">
    <a className="button button-primary" href="#contact">
      {language === 'en' ? 'Get in touch' : 'Επικοινωνία'}
    </a>
  </div>

        <DriftScene
    opacity={.45}
    pointCount={180}
    radius={2.4}
    connectDistance={1.5}
    driftSpeed={0.12}
    driftAmount={0.5}
  />
   <LogoScene opacity={2.2}
   lineColor="#157ea8"
  nodeColor= "#157ea8" ></LogoScene>
</div>        
</section>

<section
  id="studio"
  className="studio-section"
  aria-labelledby="studio-title"
>


  <HeroScene intensity="subtle" />
  <div className="studio-content">
    <p className="section-eyebrow">
      {language === 'en' ? 'The studio' : 'Το studio'}
    </p>

    <h2 id="studio-title">
      {language === 'en'
        ? 'Code, design and artistic practice.'
        : 'Τεχνολογία και καλλιτεχνική δημιουργία.'}
    </h2>

    <p className="studio-intro">
      {language === 'en'
        ? 'fluxBuffalo is an independent studio working across web development, interactive media and digital art. Its approach connects visual experimentation with thoughtful design and technical development.'
        : 'Το fluxBuffalo είναι ένα ανεξάρτητο studio με αντικείμενο το web, τα διαδραστικά μέσα και την ψηφιακή τέχνη. Η δουλειά του συνδυάζει τον οπτικό πειραματισμό με τον σχεδιασμό και την ανάπτυξη ψηφιακών εφαρμογών.'}
    </p>

    <div className="studio-does">
      <p className="section-eyebrow">
        {language === 'en' ? 'fluxBuffalo creates' : 'Το studio δημιουργεί'}
      </p>

      <div className="studio-does-grid">
        <article className="studio-does-item">
          <h3>{language === 'en' ? 'Web' : 'Web'}</h3>

          <p>
            {language === 'en'
              ? 'Portfolio and business websites, landing pages, web applications and improvements to existing sites.'
              : 'Ιστοσελίδες για επαγγελματίες και δημιουργούς, landing pages, διαδικτυακές εφαρμογές και ανασχεδιασμός υπαρχόντων websites.'}
          </p>
        </article>

        <article className="studio-does-item">
          <h3>
            {language === 'en'
              ? 'Interactive Experiences'
              : 'Διαδραστικές εμπειρίες'}
          </h3>

          <p>
            {language === 'en'
              ? 'Interactive websites, explorable 3D spaces and digital interfaces that invite people to participate.'
              : 'Διαδραστικά στοιχεία για το web, τρισδιάστατα περιβάλλοντα και ψηφιακές εμπειρίες με τη συμμετοχή του κοινού.'}
          </p>
        </article>

        <article className="studio-does-item">
          <h3>
            {language === 'en'
              ? 'Digital Art'
              : 'Ψηφιακή τέχνη'}
          </h3>

          <p>
            {language === 'en'
              ? '3D environments, audiovisual works and experimental digital projects.'
              : 'Τρισδιάστατα περιβάλλοντα, οπτικοακουστικά έργα και πειραματικές ψηφιακές συνθέσεις.'}
          </p>
        </article>
      </div>
    </div>
<div className="process-block">
  <h3>{language === 'en' ? 'From a first conversation to a finished project.' : 'Από την ιδέα στην υλοποίηση.'}</h3>
  <ol className="process-grid">
    <li><strong>{language === 'en' ? 'Brief' : 'Η ιδέα'}</strong><p>{language === 'en' ? 'Each collaboration starts with a conversation about the idea, its audience and its needs.' : 'Το studio διερευνά την ιδέα, το κοινό-στόχο και τις ανάγκες του έργου, ώστε να διαμορφώσει μια σαφή εικόνα για το τι πρέπει να επιτευχθεί.'}</p></li>
    <li><strong>{language === 'en' ? 'Direction' : 'Ο σχεδιασμός'}</strong><p>{language === 'en' ? 'The scope, creative direction and timeline are agreed before development begins.' : 'Ορίζεται το αντικείμενο, η δημιουργική κατεύθυνση και το χρονοδιάγραμμα πριν από την έναρξη της ανάπτυξης, διασφαλίζοντας ότι όλα τα βήματα είναι ξεκάθαρα και ευθυγραμμισμένα.'}</p></li>
    <li><strong>{language === 'en' ? 'Development' : 'Η υλοποίηση'}</strong><p>{language === 'en' ? 'The studio designs and develops the project, with regular feedback throughout the process.' : 'Το studio αναλαμβάνει τον σχεδιασμό και την ανάπτυξη, σε επικοινωνία με τον συνεργάτη σε κάθε στάδιο.'}</p></li>
  </ol>
</div>
  </div>
</section>

                <section
          id="app"
          className="app-section"
          aria-labelledby="app-title"
        >

          <RingScene opacity={0.7} />
          <div className="app-content">
<p className="section-eyebrow">{language === 'en' ? 'A product by fluxBuffalo Studio' : 'Ένα εργαλείο του fluxBuffalo Studio'}</p>

<h2 id="app-title">Mockspace.</h2>
<p className="section-status">{language === 'en' ? 'In development' : 'Υπό ανάπτυξη'}</p>

<p className="app-lead">
  {language === 'en'
    ? 'Spatial pre-visualization for projection-based installations.'
    : 'Χωρική προσομοίωση για εγκαταστάσεις προβολής.'}
</p>

<p className="app-intro">
  {language === 'en'
    ? 'Developed by fluxBuffalo Studio, Mockspace is a workspace for planning spaces, testing media and exploring projection concepts before production. It is currently in development.'
    : 'Η Mockspace αναπτύσσεται από το fluxBuffalo Studio ως εργαλείο σχεδιασμού εγκαταστάσεων προβολής. Στόχος της είναι η δοκιμή χώρων, οπτικού υλικού και ιδεών πριν από την υλοποίηση.'}
</p>

<a className="button button-secondary" href="mailto:contact@fluxbuffalostudio.com?subject=Mockspace">
  {language === 'en' ? 'Ask about Mockspace' : 'Επικοινωνία για τη Mockspace'}
</a>
          </div>
        </section>

                <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
<DriftScene
  opacity={.55}
  pointCount={120}
  radius={2.4}
  connectDistance={1.0}
  driftSpeed={0.12}
  driftAmount={0.3}
/>
<div className="contact-content">
<p className="section-eyebrow">
  {language === 'en' ? 'Contact' : 'Επικοινωνία'}
</p>

<h2 id="contact-title">
  {language === 'en'
    ? 'Projects & collaborations.'
    : 'Έργα και συνεργασίες.'}
</h2>
<p className="studio-intro">
  {language === 'en'
    ? 'For a website, an interactive experience or an artistic collaboration, contact fluxBuffalo Studio with a short description of the project and its intended timeline.'
    : 'Είτε πρόκειται για τη δημιουργία ιστοσελίδας, την ανάπτυξη μιας διαδραστικής εμπειρίας ή μια καλλιτεχνική συνεργασία, το fluxBuffalo Studio είναι έτοιμο να υλοποιήσει την ιδέα. Επικοινωνήστε με το fluxBuffalo Studio με μια σύντομη περιγραφή του έργου και το επιθυμητό χρονοδιάγραμμα.'}
</p>
<a
  className="button button-primary contact-email"
  href="mailto:contact@fluxbuffalostudio.com?subject=Project%20enquiry"
>
  contact@fluxbuffalostudio.com
</a>
</div>
        </section>
      </main>
        <AccessibilityWidget language={language} />
      <Footer language={language} />
    
    </>
  )
}

export default App