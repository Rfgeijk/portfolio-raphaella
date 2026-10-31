/**
 * Portfolio Website - Raphaella van Eijk
 * Vanilla JavaScript: Navigation, Tagline Rotator, Multi-Project Showcase, Dynamic Gallery, Lightbox, and Pencil Trail
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. HERO BIO TAGLINE ROTATOR (Fades in & out in the Hero section!)
  // You can easily change or add phrases below to showcase who you are as a designer!
  // Each set has 3 parts: [part 1, part 2, part 3]
  // ==========================================================================
  const designerTaglines = [
    ["Een beetje chaotisch,", "heel nieuwsgierig,", "altijd aan het maken."],
    ["Visuele storyteller,", "concept bedenker,", "detail georiënteerd."],
    ["Branding & verpakkingen,", "motion & 3D,", "fysiek & digitaal."],
    ["Gedreven door nieuwsgierigheid,", "speels & bold,", "maken van ervaringen."]
  ];

  function initHeroTaglineRotator() {
    const rotatingTagline = document.querySelector('.hero-rotating-tagline');
    if (!rotatingTagline) return;

    const phrases = rotatingTagline.querySelectorAll('.tagline-phrase');
    if (phrases.length < 3) return;

    let index = 0;
    const intervalTime = 4000; // Time in milliseconds between phrase transitions

    setInterval(() => {
      // Fade out each part with a gentle stagger
      phrases.forEach((phrase, i) => {
        setTimeout(() => {
          phrase.classList.add('fade-out');
        }, i * 110);
      });

      // Swap text and fade in
      setTimeout(() => {
        index = (index + 1) % designerTaglines.length;
        const nextSet = designerTaglines[index];

        phrases.forEach((phrase, i) => {
          phrase.textContent = nextSet[i] || '';
          setTimeout(() => {
            phrase.classList.remove('fade-out');
          }, i * 110);
        });
      }, 500);
    }, intervalTime);
  }

  initHeroTaglineRotator();

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const canvas = document.getElementById('pencil-trail-canvas');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // 3. Generic Horizontal Project Carousel Logic (Used on Home and Projects Page)
  function initCarousel(trackId, prevBtnId, nextBtnId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!track) return;

    const cards = track.querySelectorAll('.project-carousel-card');
    if (!cards.length) return;

    const updateControls = () => {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      
      if (prevBtn) prevBtn.disabled = scrollLeft <= 10;
      if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 10;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const trackGap = parseFloat(window.getComputedStyle(track).gap) || 16;
        const cardWidth = (cards[0]?.offsetWidth || 260) + trackGap;
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const trackGap = parseFloat(window.getComputedStyle(track).gap) || 16;
        const cardWidth = (cards[0]?.offsetWidth || 260) + trackGap;
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  }

  initCarousel('home-carousel-track', 'home-carousel-prev', 'home-carousel-next');
  initCarousel('page-carousel-track', 'page-carousel-prev', 'page-carousel-next');

  // 4. Project Selection & Dynamic Multi-Project Data Store
  const projectCarouselWrapper = document.getElementById('project-carousel-wrapper');
  const projectActiveHeader = document.getElementById('project-active-header');
  const activeProjectTitle = document.getElementById('active-project-title');
  const backToAllBtn = document.getElementById('back-to-all-projects');
  const projectDetailShowcase = document.getElementById('project-detail-showcase');
  const notebookProjectName = document.querySelector('.notebook-project-name');
  const notebookTagline = document.querySelector('.notebook-tagline');
  const selectedProjectTitle = document.getElementById('selected-project-title');
  const selectedProjectTagline = document.getElementById('selected-project-tagline');
  const selectedProjectDescription = document.getElementById('selected-project-description');
  const notebookTextFlow = document.querySelector('.notebook-text-flow');
  const thumbnailFanRow = document.querySelector('.thumbnail-fan-row');
  const stageFeaturedImg = document.getElementById('stage-featured-img');
  const stageDisplay = document.querySelector('.notebook-stage-display');
  const stageHintText = document.querySelector('.stage-hint-text');
  const stageZoomBadge = document.querySelector('.stage-zoom-badge');

  // Multi-project content configurations with ENDPRODUCTS as main photos!
  const projectDataStore = {
    'aquaclean': {
      name: 'AquaClean',
      tagline: '"Cleans you from the inside out" — Media Design 2 & Identity Design Challenge',
      description: 'Een fris watermerk met een eigen visuele identiteit, 3D-verpakking en campagnebeeld door Raphaella van Eijk.',
      images: [
        {
          img: 'images/can_trio.png',
          fullImg: 'images/can_trio.png',
          title: 'AquaClean 3D Blikjes Serie — Eindproduct',
          hint: 'Eindproduct: 3D can packaging render met waterdruppels en metallic finish'
        },
        {
          img: 'images/can_duo.png',
          fullImg: 'images/can_duo.png',
          title: 'AquaClean Duo Perspective — Eindproduct',
          hint: 'Eindproduct: Close-up render met condensatiedruppels'
        },
        {
          img: 'images/poster.png',
          fullImg: 'images/poster.png',
          title: 'Campagneposter — Eindproduct',
          hint: 'Eindproduct: "Cleans you from the inside out" typografie & watergolf'
        },
        {
          img: 'images/posterMDmockup1.png',
          fullImg: 'images/posterMDmockup1.png',
          title: 'Poster Mockup 1',
          hint: 'Mockup: Ingelijste presentatie aan de wand'
        },
        {
          img: 'images/posterMDmockup2.webp',
          fullImg: 'images/posterMDmockup2.webp',
          title: 'Poster Mockup 2',
          hint: 'Mockup: Ruimtelijke contextweergave'
        },
        {
          img: 'images/label.png',
          fullImg: 'images/label.png',
          title: 'Blik Label Uitrol',
          hint: 'Definitief 2D verpakkingslabel met CMD credits'
        },
        {
          img: 'images/blikjesFINAL.png',
          fullImg: 'images/blikjesFINAL.png',
          title: 'Blikjes Final Uitrol',
          hint: 'Definitief packaging overzicht'
        },
        {
          img: 'images/blikjesschets1.jpg',
          fullImg: 'images/blikjesschets1.jpg',
          title: 'Blikjesschetsen 1: Patronen',
          hint: 'Proces: Eerste schetsen van het blikje op papier'
        },
        {
          img: 'images/blikjesschets2.jpg',
          fullImg: 'images/blikjesschets2.jpg',
          title: 'Blikjesschetsen 2: Feedbackronde',
          hint: 'Proces: Feedbackronde met stickerkeuze medestudenten'
        },
        {
          img: 'images/posterschets1.jpg',
          fullImg: 'images/posterschets1.jpg',
          title: 'Posterschets: Splash Compositie',
          hint: 'Proces: Schets van de water splash en compositie'
        },
        {
          img: 'images/sketches_1.png',
          fullImg: 'images/sketches_1.png',
          title: 'Schetsboek Pagina 1: Ideation',
          hint: 'Proces: Brainstorm steriel & associaties (Clean-X, kat, proefbuisjes)'
        },
        {
          img: 'images/sketches_2.png',
          fullImg: 'images/sketches_2.png',
          title: 'Schetsboek Pagina 2: Vormonderzoek',
          hint: 'Proces: Vormonderzoek spuitkoppen & flessen'
        },
        {
          img: 'images/moodboardMediaDesign2.png',
          fullImg: 'images/moodboardMediaDesign2.png',
          title: 'Moodboard Media Design 2',
          hint: 'Onderzoek: Kleur- en sfeeronderzoek'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">De opdracht</h3>
        <p>
          Voor de school opdracht Identity Design 2026 moesten wij een ontwerp voor een blikje maken op basis van een kernwaarde die wij aangereken kregen. Ik had hiervoor de kernwaarde gekregen: "Steriel".
        </p>
        <br>
        <h3 class="notebook-heading">Het Schetsboek &amp; Ontwerpproces</h3>
        <p>
          Ik begon met schetsen rond de vraag wat steriel voor mij betekent. Op het eerste schetsvel onderzocht ik verschillende ruimtes en voorwerpen, zoals schoonmaakproducten en ziekenhuisbenodigdheden. Daarna koos ik ervoor om verder te werken met schoonmaakproducten, omdat schoonmaken essentieel is voor een steriele omgeving. Uit deze schetsen selecteerde ik elementen voor mijn verdere iteraties.
          <br><br>
          Vervolgens maakte ik een moodboard en verschillende eerste ontwerpen voor het blikje, te zien op afbeeldingen drie en vier. Medestudenten gaven met groene stickers aan welk ontwerp zij het beste bij mijn kernwaarde vonden. Het ontwerp met de bubbels kwam hier als favoriet uit. Dit werkte ik verder uit in Adobe Illustrator en verbeterde ik aan de hand van feedback van docenten en medestudenten.
        </p>
        <br>
        <p>
          Tegelijkertijd werkte ik aan de poster. Hiervoor maakte ik schetsen geïnspireerd op reclames van merken zoals Coca-Cola en Pepsi. Na feedback koos ik het rechter ontwerp, waarin het water uit het blikje spuit, en werkte dit digitaal verder uit.
        </p>
        <br>
        <p>
          Tot slot werkte ik het definitieve blikje en de poster uit, plaatste deze in mockups en maakte het bijbehorende brandbook.
        </p>
        <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Opdracht</td>
              <td>Identity Design Challenge 2026</td>
            </tr>
            <tr>
              <td>Instituut</td>
              <td>CMD Breda | Avans Hogeschool</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
            <tr>
              <td>Software &amp; Tools</td>
              <td>Photoshop, Illustrator, InDesign, 3D Render, Analoog Schetsboek</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'animation': {
      name: 'Optiteling Catch me if you can',
      tagline: 'Motion Design • Titelsequentie & Storyboard',
      description: 'Een animatieconcept gericht op een nieuwe optiteling voor de iconische film Catch Me If You Can.',
      images: [
        {
          img: 'images/catchme4.png',
          fullImg: 'images/catchme4.png',
          title: 'Dossier Bureau Compositie — Eindproduct',
          hint: 'Eindproduct: FBI-agent Hanratty bureau met de geopende Manila map'
        },
        {
          img: 'images/catchme1.png',
          fullImg: 'images/catchme1.png',
          title: 'Frank Abagnale Jr. Dossier — Eindproduct',
          hint: 'Eindproduct: Dossierpagina met personagegegevens en cast credits'
        },
        {
          img: 'images/catchme2.png',
          fullImg: 'images/catchme2.png',
          title: 'Huwelijksuitnodiging Scène — Eindproduct',
          hint: 'Eindproduct: Scène met de huwelijksuitnodiging en credits'
        },
        {
          img: 'images/catchme3.png',
          fullImg: 'images/catchme3.png',
          title: 'Amerika Kaart & Vluchten — Eindproduct',
          hint: 'Eindproduct: Kaart met vluchtroutes en casting credits'
        },
        {
          img: 'images/catchme5.png',
          fullImg: 'images/catchme5.png',
          title: 'Storyboard Manila Folder (Pagina 1/1)',
          hint: 'Proces: Analoog getekend shot-voor-shot animatiescript'
        },
        {
          img: 'images/catchme6.png',
          fullImg: 'images/catchme6.png',
          title: 'Airport Departures Bord Schets',
          hint: 'Proces: Schets van vertrektijden en vos-illustratie'
        },
        {
          img: 'images/catchme7.png',
          fullImg: 'images/catchme7.png',
          title: 'Pan Am, Dr. Frank & Cheque Schetsen',
          hint: 'Proces: Brainstorm van rekwisieten en identiteiten'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">De opdracht</h3>
        <p>
          Voor het vak Motion Design kregen wij de opdracht om een nieuwe titelsequentie te bedenken en animeren voor een bestaande speelfilm. Ik koos voor de film <em>Catch Me If You Can</em> (2002), geregisseerd door Steven Spielberg.
        </p>
        <br>
        <h3 class="notebook-heading">Het Concept &amp; Storyboarding</h3>
        <p>
          Mijn concept draait om het bureau van FBI-agent Carl Hanratty. Op zijn bureau ligt een klassieke beige 'Manila folder'. Zodra de camera inzoomt, slaat de map open en worden de verschillende valse identiteiten, vervalste cheques en vluchtroutes van meestervervalser Frank Abagnale Jr. zichtbaar.
          <br><br>
          In het handgetekende storyboard (te zien bij de schetsen) werkte ik shot-voor-shot uit hoe de camera over de pagina's beweegt en hoe de typografie van de cast en crew op natuurlijke wijze onderdeel wordt van het dossier.
        </p>
        <br>
        <h3 class="notebook-heading">Visuele Stijl &amp; Uitwerking</h3>
        <p>
          De illustratieve stijl combineert strakke vintage kantoorelementen met getextureerd papier, typemachinelettertypes en subtiele schaduwen om de sfeer van de jaren '60 voelbaar te maken.
        </p>
        <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Opdracht</td>
              <td>Film Title Sequence &amp; Motion Design</td>
            </tr>
            <tr>
              <td>Film</td>
              <td>Catch Me If You Can (Steven Spielberg)</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
            <tr>
              <td>Software &amp; Tools</td>
              <td>Adobe After Effects, Illustrator, Photoshop, Analoog Storyboard</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'arcadebox': {
      name: 'Arcade Box',
      tagline: 'Fysieke Interactie • Productontwerp & Laser-cut Acryl',
      description: 'Een handgemaakte, werkende arcade controller met een houten behuizing, lasergesneden acryl toplaag en een geprogrammeerde Arduino Uno R4.',
      images: [
        {
          img: 'images/arcadebox1.jpg',
          fullImg: 'images/arcadebox1.jpg',
          title: 'Arcade Box Controller — Eindproduct',
          hint: 'Eindproduct: Fysieke doos met acryl toplaag, joystick en arcadeknop'
        },
        {
          img: 'images/arcadebox3.jpg',
          fullImg: 'images/arcadebox3.jpg',
          title: 'Zijpaneel met Ganzen Illustraties — Eindproduct',
          hint: 'Eindproduct: Handgeschilderde ganzen met "HYAAA!" quote'
        },
        {
          img: 'images/arcadebox4.jpg',
          fullImg: 'images/arcadebox4.jpg',
          title: 'Binnenwerk: Arduino Uno R4 & Breadboard',
          hint: 'Techniek: Bedrading, weerstanden en microcontrollersysteem'
        },
        {
          img: 'images/arcadebox5.jpg',
          fullImg: 'images/arcadebox5.jpg',
          title: 'Onderzijde Acrylplaat & Mechaniek',
          hint: 'Techniek: Bevestiging van de joystick en rode arcadeknop'
        },
        {
          img: 'images/arcadebox2.jpg',
          fullImg: 'images/arcadebox2.jpg',
          title: 'Binnenwerk Overzicht',
          hint: 'Techniek: Compleet bedradingsschema in de houten behuizing'
        },
        {
          img: 'images/arcadebox_acryl_design.png',
          fullImg: 'images/arcadebox_acryl_design.png',
          title: 'Lasersnij-vectorontwerp Acrylplaat',
          hint: 'Ontwerp: Vectorlayout met Zelda Midna masker & ganzengravures'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">De opdracht</h3>
        <p>
          Binnen het domein van Physical Computing en Product Design kregen wij de opdracht om een tastbare, interactieve arcadebox te bouwen. Het doel was om hardware, fysiek materiaal en interactie naadloos samen te brengen in een werkend prototype.
        </p>
        <br>
        <h3 class="notebook-heading">Materiaalkeuze &amp; Vormgeving</h3>
        <p>
          De basis van de behuizing is opgebouwd uit stevig hout, afgewerkt met kleurrijke handgeschilderde elementen en humoristische ganzenillustraties. Voor de bovenplaat koos ik voor gematteerd acryl (plexiglas), waarin ik met een lasersnijder geometrische Zelda-elementen (het Midna-masker en Sheikah-oog) en boorgaten voor de joystick en drukknop heb gegraveerd.
        </p>
        <br>
        <h3 class="notebook-heading">Elektronica &amp; Code</h3>
        <p>
          In de behuizing bevindt zich een <strong>Arduino Uno R4 Minima</strong>, verbonden met een breadboard, schakelaars en weerstanden. De controller registreert de joystickrichtingen en knopacties en stuurt deze direct via USB door naar de computer als game-input.
        </p>
        <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Opdracht</td>
              <td>Arduino - Game Controller</td>
            </tr>
            <tr>
              <td>Hardware</td>
              <td>Arduino Uno R4 Minima, Microswitches, Breadboard, Joystick</td>
            </tr>
            <tr>
              <td>Materialen</td>
              <td>Lasergesneden gematteerd acryl, hout, acrylverf</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'aquaclean': {
      name: 'AquaClean',
      tagline: '"Cleans you from the inside out" — Media Design 2 & Identity Design Challenge',
      description: 'Een leuk spelletje gebaseerd op de klassieke Flappy Bird.',
      images: [
        {
          img: 'images/game1.png',
          fullImg: 'images/can_trio.png',
          title: 'AquaClean 3D Blikjes Serie — Eindproduct',
          hint: 'Eindproduct: 3D can packaging render met waterdruppels en metallic finish'
        },
        {
          img: 'images/Game2.png',
          fullImg: 'images/can_duo.png',
          title: 'AquaClean Duo Perspective — Eindproduct',
          hint: 'Eindproduct: Close-up render met condensatiedruppels'
        },
        {
          img: 'images/poster.png',
          fullImg: 'images/poster.png',
          title: 'Campagneposter — Eindproduct',
          hint: 'Eindproduct: "Cleans you from the inside out" typografie & watergolf'
        },
        {
          img: 'images/posterMDmockup1.png',
          fullImg: 'images/posterMDmockup1.png',
          title: 'Poster Mockup 1',
          hint: 'Mockup: Ingelijste presentatie aan de wand'
        },
        {
          img: 'images/posterMDmockup2.webp',
          fullImg: 'images/posterMDmockup2.webp',
          title: 'Poster Mockup 2',
          hint: 'Mockup: Ruimtelijke contextweergave'
        },
        {
          img: 'images/label.png',
          fullImg: 'images/label.png',
          title: 'Blik Label Uitrol',
          hint: 'Definitief 2D verpakkingslabel met CMD credits'
        },
        {
          img: 'images/blikjesFINAL.png',
          fullImg: 'images/blikjesFINAL.png',
          title: 'Blikjes Final Uitrol',
          hint: 'Definitief packaging overzicht'
        },
        {
          img: 'images/blikjesschets1.jpg',
          fullImg: 'images/blikjesschets1.jpg',
          title: 'Blikjesschetsen 1: Patronen',
          hint: 'Proces: Eerste schetsen van het blikje op papier'
        },
        {
          img: 'images/blikjesschets2.jpg',
          fullImg: 'images/blikjesschets2.jpg',
          title: 'Blikjesschetsen 2: Feedbackronde',
          hint: 'Proces: Feedbackronde met stickerkeuze medestudenten'
        },
        {
          img: 'images/posterschets1.jpg',
          fullImg: 'images/posterschets1.jpg',
          title: 'Posterschets: Splash Compositie',
          hint: 'Proces: Schets van de water splash en compositie'
        },
        {
          img: 'images/sketches_1.png',
          fullImg: 'images/sketches_1.png',
          title: 'Schetsboek Pagina 1: Ideation',
          hint: 'Proces: Brainstorm steriel & associaties (Clean-X, kat, proefbuisjes)'
        },
        {
          img: 'images/sketches_2.png',
          fullImg: 'images/sketches_2.png',
          title: 'Schetsboek Pagina 2: Vormonderzoek',
          hint: 'Proces: Vormonderzoek spuitkoppen & flessen'
        },
        {
          img: 'images/moodboardMediaDesign2.png',
          fullImg: 'images/moodboardMediaDesign2.png',
          title: 'Moodboard Media Design 2',
          hint: 'Onderzoek: Kleur- en sfeeronderzoek'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">De opdracht</h3>
        <p>
          Voor de school opdracht Identity Design 2026 moesten wij een ontwerp voor een blikje maken op basis van een kernwaarde die wij aangereken kregen. Ik had hiervoor de kernwaarde gekregen: "Steriel".
        </p>
        <br>
        <h3 class="notebook-heading">Het Schetsboek &amp; Ontwerpproces</h3>
        <p>
          Ik begon met schetsen rond de vraag wat steriel voor mij betekent. Op het eerste schetsvel onderzocht ik verschillende ruimtes en voorwerpen, zoals schoonmaakproducten en ziekenhuisbenodigdheden. Daarna koos ik ervoor om verder te werken met schoonmaakproducten, omdat schoonmaken essentieel is voor een steriele omgeving. Uit deze schetsen selecteerde ik elementen voor mijn verdere iteraties.
          <br><br>
          Vervolgens maakte ik een moodboard en verschillende eerste ontwerpen voor het blikje, te zien op afbeeldingen drie en vier. Medestudenten gaven met groene stickers aan welk ontwerp zij het beste bij mijn kernwaarde vonden. Het ontwerp met de bubbels kwam hier als favoriet uit. Dit werkte ik verder uit in Adobe Illustrator en verbeterde ik aan de hand van feedback van docenten en medestudenten.
        </p>
        <br>
        <p>
          Tegelijkertijd werkte ik aan de poster. Hiervoor maakte ik schetsen geïnspireerd op reclames van merken zoals Coca-Cola en Pepsi. Na feedback koos ik het rechter ontwerp, waarin het water uit het blikje spuit, en werkte dit digitaal verder uit.
        </p>
        <br>
        <p>
          Tot slot werkte ik het definitieve blikje en de poster uit, plaatste deze in mockups en maakte het bijbehorende brandbook.
        </p>
        <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Opdracht</td>
              <td>Identity Design Challenge 2026</td>
            </tr>
            <tr>
              <td>Instituut</td>
              <td>CMD Breda | Avans Hogeschool</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
            <tr>
              <td>Software &amp; Tools</td>
              <td>Photoshop, Illustrator, InDesign, 3D Render, Analoog Schetsboek</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'flappy-bird': {
      name: 'Unity Flappy Bird',
      tagline: 'Game Design • Unity',
      description: 'Een game in Unity, geïnspireerd door Flappy Bird.',
      images: [
        {
          type: 'video',
          src: 'images/Echteindversiefilmpjegoose.mp4',
          poster: 'images/Game1.png',
          title: 'Unity Flappy Bird — Gameplayvideo',
          hint: 'Bekijk de gameplayvideo'
        },
        {
          img: 'images/Game1.png',
          fullImg: 'images/Game1.png',
          title: 'Unity Flappy Bird — Screenshot 1',
          hint: 'Screenshot van de game'
        },
        {
          img: 'images/Game2.png',
          fullImg: 'images/Game2.png',
          title: 'Unity Flappy Bird — Screenshot 2',
          hint: 'Screenshot van de game'
        },
        {
          img: 'images/Game3.png',
          fullImg: 'images/Game3.png',
          title: 'Unity Flappy Bird — Screenshot 3',
          hint: 'Screenshot van de game'
        },
        {
          img: 'images/gamecharacter.png',
          fullImg: 'images/gamecharacter.png',
          title: 'Unity Flappy Bird — Gamepersonage',
          hint: 'Het gamepersonage'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">De opdracht</h3>
        <p>
          Voor Creative Technology 2 moest ik een game maken in Unity, geïnspireerd op Flappy Bird. 
          Bekijk de gameplayvideo en screenshots in de galerij hierboven.
          Voor dit project heb ik zelfstandig een game gemaakt in Unity, geïnspireerd op Flappy Bird. In de game speel je als een gans die op zoek is naar een zonnige plek om te overwinteren en daarvoor door een besneeuwd landschap moet vliegen.
          Ik heb deze game met een eenvoudige besturing gemaakt door middel van alleen de spatiebalk. Het doel van het spel is om zo lang mogelijk zonder dood te gaan de hoogste score te bemachtigen.
          <br><br>
          <h3 class="notebook-heading">Het karakter & assets</h3>
          Voor het hoofdpersonage heb ik een afbeelding als voorbeeld gebruikt en deze zelf nagemaakt in Adobe Illustrator. De achtergrond, obstakels en munten heb ik verzameld via gratis assetwebsites. Voor de geluidseffecten heb ik gebruikgemaakt van Freesound. 
        </p>
         <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Opdracht</td>
              <td>Unity-Game Dev</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
            <tr>
              <td>Disciplines</td>
              <td>Creative Technology 2, Grafisch Ontwerp</td>
            </tr>
            <tr>
              <td>Software</td>
              <td>Unity, Adobe Illustrator, Freesound, verschillende assetwebsites</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'mora-doe-het-zelf': {
      name: 'Mora doe het zelf',
      tagline: 'Concept • Visuele Verkenning & Experiment',
      description: 'Nieuwe projecten en conceptuele experimenten die momenteel vorm krijgen in het schetsboek en digitaal.',
      images: [
        {
          img: 'images/packaging-concept.jpg',
          fullImg: 'images/packaging-concept.jpg',
          title: 'Verpakkingsconcept',
          hint: 'Eerste visualisatie van het verpakkingsconcept'
        },
        {
          img: 'images/packaging-variant.jpg',
          fullImg: 'images/packaging-variant.jpg',
          title: 'Verpakkingsvariant',
          hint: 'Een alternatieve uitwerking van de verpakking'
        },
        {
          img: 'images/mora-concept.jpg',
          fullImg: 'images/mora-concept.jpg',
          title: 'Mora-verpakkingsconcept',
          hint: 'Verpakkingsconcept voor Mora'
        },
        {
          img: 'images/mora-variant-1.jpg',
          fullImg: 'images/mora-variant-1.jpg',
          title: 'Mora-variant 1',
          hint: 'Verpakkingsrichting voor Mora'
        },
        {
          img: 'images/mora-variant-2.jpg',
          fullImg: 'images/mora-variant-2.jpg',
          title: 'Mora-variant 2',
          hint: 'Tweede verpakkingsrichting voor Mora'
        },
        {
          img: 'images/redband-variant.jpg',
          fullImg: 'images/redband-variant.jpg',
          title: 'Red Band-variant',
          hint: 'Verpakkingsrichting voor Red Band'
        },
        {
          img: 'images/venco-variant.jpg',
          fullImg: 'images/venco-variant.jpg',
          title: 'Venco-variant',
          hint: 'Verpakkingsrichting voor Venco'
        },
        {
          img: 'images/moodboardC5product-gallery.jpg',
          fullImg: 'images/moodboardC5product-gallery.jpg',
          title: 'Productmoodboard',
          hint: 'Moodboard voor het productconcept'
        },
        {
          img: 'images/idea-development.jpg',
          fullImg: 'images/idea-development.jpg',
          title: 'Ideeontwikkeling',
          hint: 'Eerste conceptideeën'
        },
        {
          img: 'images/idea-sketches.jpg',
          fullImg: 'images/idea-sketches.jpg',
          title: 'Idee- en conceptschetsen',
          hint: 'Schetsen uit de conceptfase'
        },
        {
          img: 'images/storyboard1april1-gallery.jpg',
          fullImg: 'images/storyboard1april1-gallery.jpg',
          title: 'Storyboard 1',
          hint: 'Eerste storyboarduitwerking'
        },
        {
          img: 'images/storyboard-2.jpg',
          fullImg: 'images/storyboard-2.jpg',
          title: 'Storyboard 2',
          hint: 'Tweede storyboarduitwerking'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">Mora Doe het zelf</h3>
        <p>
          Voor de opdrachtgever FightClub kreeg ik de opdracht om een 1 aprilgrap te bedenken voor een van de drie merken, Mora, Red Band of Venco. Na onderzoek en verschillende ideeën te hebben bedacht, koos ik voor een doe-het-zelfpakket van Mora. Dit concept speelt met het gemak waar Mora om bekendstaat, door het bereiden van snacks juist moeilijker te maken.
        </p>
        <br>
        <h3 class="notebook-heading">Het Ontwerpproces</h3>
        <p>
          Ik ben begonnen met onderzoek naar de merken en eerdere 1 aprilgrappen. Vervolgens heb ik met Crazy 8 verschillende ideeën bedacht en acht concepten gepresenteerd aan de opdrachtgever. Uit de feedback kwam naar voren dat mijn ideeën voor Mora het sterkste waren. Vooral het doe-het-zelfpakket sprak aan, omdat dit concept inspeelt op het gemak waar Mora om bekendstaat, door het bereiden van snacks juist moeilijker te maken.

          Na de feedback heb ik onderzoek gedaan naar bestaande bakmixen en de huisstijl van Mora. Hiermee heb ik in Adobe Illustrator een digitaal verpakkingsontwerp gemaakt dat herkenbaar moest zijn als een product van Mora.

          Voor de bijbehorende reclamecampagne vond ik het lastig om te bepalen waarom mensen het product zouden willen kopen. Door feedback van medestudenten kwam ik op het idee om gezinnen als doelgroep te gebruiken, omdat samen koken en bakken goed bij dit concept passen.
          <br><br>
          Ik heb vervolgens twee verschillende storyboardconcepten geschetst en één daarvan verder uitgewerkt. De uiteindelijke campagne bestaat uit twee reclames. De eerste reclame zou een week voor 1 april verschijnen en het pakket als een echt product presenteren. De tweede reclame zou op 1 april verschijnen, met een ander einde waarin duidelijk wordt dat het om een grap gaat.

          Tijdens de eindpresentatie heb ik het concept, de verpakking en de campagne aan FightClub gepresenteerd. Hierop kreeg ik positieve feedback. De opdrachtgever vond het een leuk idee. Daarnaast heb ik voorgesteld om Nederlandse influencerfamilies die in het buitenland wonen bij de campagne te betrekken.
        </p>
        <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Opdracht</td>
              <td>Collectief 5</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
            <tr>
              <td>Disciplines</td>
              <td>Media Design 2, Branding, Grafisch Ontwerp, Illustratie</td>
            </tr>
            <tr>
              <td>Software</td>
              <td>Adobe Illustrator, Analoog storyboard, Photoshop, Analoge schetsen</td>
            </tr>
          </tbody>
        </table>
      `
    }
  };

  // Aliases for backwards compatibility (e.g. from older links or query params)
  projectDataStore['poster'] = projectDataStore['animation'];
  projectDataStore['sketches'] = projectDataStore['animation'];
  projectDataStore['moodboard'] = projectDataStore['arcadebox'];

  function setStageFeaturedImage(item) {
    if (!stageFeaturedImg || !item) return;
    const existingPlayer = stageDisplay?.querySelector('.stage-video-player');
    if (existingPlayer) existingPlayer.remove();

    if (item.type === 'video') {
      stageFeaturedImg.style.display = 'none';
      const videoPlayer = document.createElement('div');
      videoPlayer.className = 'stage-video-player';
      const video = document.createElement('video');
      video.className = 'stage-featured-video';
      video.src = item.src;
      video.poster = item.poster;
      video.playsInline = true;
      video.setAttribute('aria-label', item.title);
      const playbackLimitSeconds = 53;
      const videoControls = document.createElement('div');
      videoControls.className = 'stage-video-controls';

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'stage-video-play';
      playButton.textContent = 'Play';
      playButton.setAttribute('aria-label', 'Play video');

      const timeline = document.createElement('input');
      timeline.type = 'range';
      timeline.className = 'stage-video-timeline';
      timeline.min = '0';
      timeline.max = String(playbackLimitSeconds);
      timeline.step = '0.1';
      timeline.value = '0';
      timeline.setAttribute('aria-label', 'Video position');

      const timeDisplay = document.createElement('span');
      timeDisplay.className = 'stage-video-time';
      timeDisplay.textContent = `0:00 / 0:${playbackLimitSeconds}`;

      const formatTime = seconds => {
        const time = Math.floor(seconds);
        return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`;
      };
      const updateVideoControls = () => {
        const currentTime = Math.min(video.currentTime, playbackLimitSeconds);
        timeline.value = String(currentTime);
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(playbackLimitSeconds)}`;
        playButton.textContent = video.paused ? 'Play' : 'Pause';
        playButton.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
      };

      playButton.addEventListener('click', () => {
        if (video.paused) {
          if (video.currentTime >= playbackLimitSeconds) video.currentTime = 0;
          video.play().catch(error => {
            console.error('Unable to play project video:', error);
          });
        } else {
          video.pause();
        }
      });
      timeline.addEventListener('input', () => {
        video.currentTime = Math.min(Number(timeline.value), playbackLimitSeconds);
      });
      video.addEventListener('timeupdate', () => {
        if (video.currentTime >= playbackLimitSeconds) {
          video.currentTime = playbackLimitSeconds;
          video.pause();
        }
        updateVideoControls();
      });
      video.addEventListener('play', updateVideoControls);
      video.addEventListener('pause', updateVideoControls);
      video.addEventListener('seeked', updateVideoControls);
      videoControls.append(playButton, timeline, timeDisplay);
      videoPlayer.append(video, videoControls);
      stageDisplay?.appendChild(videoPlayer);
      updateVideoControls();
      if (stageZoomBadge) stageZoomBadge.style.display = 'none';
    } else {
      stageFeaturedImg.style.opacity = '0';
      stageFeaturedImg.style.display = '';
      setTimeout(() => {
        stageFeaturedImg.src = item.img;
        stageFeaturedImg.setAttribute('data-full', item.fullImg || item.img);
        stageFeaturedImg.alt = item.title;
        stageFeaturedImg.style.opacity = '1';
      }, 150);
      if (stageZoomBadge) stageZoomBadge.style.display = '';
    }

    if (stageHintText) {
      stageHintText.textContent = item.hint || item.title;
    }
  }

  function renderProjectGallery(projectInfo) {
    if (!thumbnailFanRow || !projectInfo.images || !projectInfo.images.length) return;

    thumbnailFanRow.innerHTML = '';
    projectInfo.images.forEach((item, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.setAttribute('data-index', idx);
      thumb.title = item.title;
      const thumbnail = document.createElement('img');
      thumbnail.src = item.type === 'video' ? item.poster : item.img;
      thumbnail.alt = item.title;
      thumb.appendChild(thumbnail);

      thumb.addEventListener('click', () => {
        setStageFeaturedImage(item);
        thumbnailFanRow.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });

      thumbnailFanRow.appendChild(thumb);
    });

    // Automatically feature the first image (which is the finished ENDPRODUCT!)
    setStageFeaturedImage(projectInfo.images[0]);
  }

  function selectProject(projectId, scrollToDetails = false) {
    if (!projectDetailShowcase) return;

    const normalizedId = projectDataStore[projectId] ? projectId : 'aquaclean';
    const projectInfo = projectDataStore[normalizedId];

    // Highlight selected card in the carousel track
    document.querySelectorAll('.project-carousel-card[data-project]').forEach(c => {
      const isSelected = c.getAttribute('data-project') === normalizedId;
      c.classList.toggle('selected-card', isSelected);
      c.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (activeProjectTitle) {
      activeProjectTitle.textContent = projectInfo.name;
    }

    if (notebookProjectName) {
      notebookProjectName.textContent = projectInfo.name;
    }

    if (notebookTagline) {
      notebookTagline.textContent = projectInfo.tagline;
    }

    if (selectedProjectTitle) {
      selectedProjectTitle.textContent = projectInfo.name;
    }

    if (selectedProjectTagline) {
      selectedProjectTagline.textContent = projectInfo.tagline;
    }

    if (selectedProjectDescription) {
      selectedProjectDescription.textContent = projectInfo.description;
    }

    // Dynamic notebook text update with smooth visual refresh transition
    if (notebookTextFlow && projectInfo.notebookHtml) {
      notebookTextFlow.style.opacity = '0.2';
      notebookTextFlow.style.transition = 'opacity 0.2s ease';
      setTimeout(() => {
        notebookTextFlow.innerHTML = projectInfo.notebookHtml;
        notebookTextFlow.style.opacity = '1';
      }, 150);
    }

    // Dynamic gallery update with ENDPRODUCT as the first image
    renderProjectGallery(projectInfo);

    if (scrollToDetails) {
      setTimeout(() => {
        const scrollTarget = document.getElementById('notebook-sheet') || document.querySelector('.notebook-sheet') || document.getElementById('project-detail-showcase');
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }

  function showAllProjects() {
    if (!projectCarouselWrapper || !projectDetailShowcase) return;
    projectCarouselWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Attach click to all project cards (the single, clean way to open a project)
  document.querySelectorAll('.project-carousel-card[data-project]').forEach(card => {
    const openProject = () => {
      const projectId = card.getAttribute('data-project');
      const isProjectPage = !!document.getElementById('project-detail-showcase');
      if (isProjectPage) {
        selectProject(projectId, true);
        try {
          window.history.replaceState({}, '', `project.html?project=${projectId}`);
        } catch (e) {}
      } else {
        window.location.href = `project.html?project=${projectId}`;
      }
    };

    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      openProject();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject();
      }
    });
  });

  // Check URL params on project.html (e.g. ?project=aquaclean or ?project=animation)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedProject = urlParams.get('project');
  if (requestedProject && projectDataStore[requestedProject]) {
    selectProject(requestedProject);
  } else if (thumbnailFanRow) {
    // Default initial project and gallery render on project page
    selectProject('aquaclean');
  }

  // Home Page Profile Picture Frame Interaction (Mobile Tap toggle)
  const heroProfileFrame = document.getElementById('hero-profile-frame');
  if (heroProfileFrame) {
    heroProfileFrame.addEventListener('click', (e) => {
      if (!e.target.closest('.behind-profile-card')) {
        heroProfileFrame.classList.toggle('popped');
      }
    });
  }

  // 5. Lightbox Modal for Zooming Images
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Delegated click handler for all zoomable images and behind-cards
  document.addEventListener('click', (e) => {
    const behindCard = e.target.closest('.behind-profile-card');
    if (behindCard) {
      const fullSrc = behindCard.getAttribute('data-full') || behindCard.querySelector('img')?.getAttribute('data-full') || behindCard.querySelector('img')?.src;
      const caption = behindCard.getAttribute('title') || behindCard.querySelector('img')?.alt || 'Schets';
      if (fullSrc) openLightbox(fullSrc, caption);
      return;
    }

    const zoomable = e.target.closest('.zoomable, #stage-featured-img');
    if (zoomable && !zoomable.closest('.behind-profile-card')) {
      const fullSrc = zoomable.getAttribute('data-full') || zoomable.src;
      const caption = zoomable.alt || zoomable.getAttribute('data-caption') || 'Project Weergave';
      if (fullSrc) openLightbox(fullSrc, caption);
    }
  });

  // 6. Contact Form Handler (E-mail and LinkedIn Dispatch)
  const contactForm = document.getElementById('portfolio-contact-form');
  const emailBtn = document.getElementById('send-email-btn');
  const linkedinBtn = document.getElementById('send-linkedin-btn');
  const toastMsg = document.getElementById('toast-notification');

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 4500);
  }

  function getFormData() {
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const subject = document.getElementById('contact-subject')?.value.trim() || 'Bericht via Portfolio';
    const message = document.getElementById('contact-message')?.value.trim() || '';
    return { name, email, subject, message };
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const { name, email, subject, message } = getFormData();

      if (!name || !message) {
        showToast('Vul alsjeblieft minimaal je naam en bericht in.');
        return;
      }

      const bodyText = `Hoi Raphaella,\n\n${message}\n\nVan: ${name}\nE-mail: ${email || 'Niet opgegeven'}`;
      const mailtoUrl = `mailto:rfgvaneijk@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      showToast('E-mailclient wordt geopend...');
      window.location.href = mailtoUrl;
    });
  }

  if (linkedinBtn) {
    linkedinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const { name, email, subject, message } = getFormData();

      if (!message) {
        showToast('Vul alsjeblieft eerst een bericht in.');
        return;
      }

      const fullText = `Hoi Raphaella, [${subject}] ${message} (Van: ${name || 'Bezoeker'}${email ? `, ${email}` : ''})`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText).then(() => {
          showToast('Bericht gekopieerd! Je LinkedIn pagina opent nu...');
          setTimeout(() => {
            window.open('https://www.linkedin.com/in/raphaella-van-eijk/', '_blank');
          }, 1000);
        }).catch(() => {
          showToast('LinkedIn pagina opent...');
          window.open('https://www.linkedin.com/in/raphaella-van-eijk/', '_blank');
        });
      } else {
        window.open('https://www.linkedin.com/in/raphaella-van-eijk/', '_blank');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (emailBtn) emailBtn.click();
    });
  }

  // 7. Pencil Trail Canvas (Short, subtle and non-distracting!)
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const points = [];
    const trailDuration = 200; // Shorter trail so it doesn't linger or distract!

    function resizeCanvas() {
      canvas.width = Math.round(window.innerWidth);
      canvas.height = Math.round(window.innerHeight);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const pencilCursor = document.getElementById('pencil-cursor');

    function movePencilCursor(event) {
      if (!pencilCursor) return;
      const x = event.clientX;
      const y = event.clientY;
      pencilCursor.style.left = `${x}px`;
      pencilCursor.style.top = `${y}px`;

      if (event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
        pencilCursor.style.transform = 'translate(-50%, -50%) rotate(-25deg) scale(1.08)';
      } else {
        pencilCursor.style.transform = 'translate(-50%, -50%) rotate(-35deg) scale(1)';
      }
    }

    function addPoint(x, y) {
      const last = points[points.length - 1];
      if (!last || Math.hypot(last.x - x, last.y - y) > 6) {
        points.push({ x, y, start: Date.now() });
        if (points.length > 15) { // Keeps the trail compact
          points.shift();
        }
      }
    }

    window.addEventListener('mousemove', (event) => {
      addPoint(event.clientX, event.clientY);
      movePencilCursor(event);
    });

    window.addEventListener('touchstart', () => {
      if (pencilCursor) pencilCursor.style.display = 'none';
    }, { passive: true });

    function animateTrail() {
      const now = Date.now();

      for (let i = points.length - 1; i >= 0; i--) {
        if (now - points[i].start >= trailDuration) {
          points.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const previous = points[i - 1];
          const current = points[i];
          const agePrevious = Math.min((now - previous.start) / trailDuration, 1);
          const ageCurrent = Math.min((now - current.start) / trailDuration, 1);
          const alpha = Math.max(0.0, 0.65 - Math.max(agePrevious, ageCurrent));

          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(current.x, current.y);
          ctx.strokeStyle = `rgba(35, 35, 35, ${alpha})`;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
  }

});
