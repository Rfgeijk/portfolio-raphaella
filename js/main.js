/**
 * Portfolio Website - Raphaella van Eijk
 * Vanilla JavaScript: Navigation, Project Carousel, Fall-Away Project Selector, Gallery switcher, Lightbox modal, and Contact integrations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
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

  // 2. Generic Horizontal Project Carousel Logic (Used on Home and Projects Page)
  function initCarousel(trackId, prevBtnId, nextBtnId, dotsId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsId);

    if (!track) return;

    const cards = track.querySelectorAll('.project-carousel-card');
    if (!cards.length) return;

    // Create dots if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ga naar project ${idx + 1}`);
        dot.addEventListener('click', () => {
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
        dotsContainer.appendChild(dot);
      });
    }

    const updateControls = () => {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      
      if (prevBtn) prevBtn.disabled = scrollLeft <= 10;
      if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 10;

      // Update dots based on scroll position
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const trackGap = parseFloat(window.getComputedStyle(track).gap) || 20;
        const cardWidth = cards[0].offsetWidth + trackGap;
        const activeIndex = Math.min(Math.round(scrollLeft / cardWidth), cards.length - 1);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const trackGap = parseFloat(window.getComputedStyle(track).gap) || 20;
        const cardWidth = cards[0].offsetWidth + trackGap;
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const trackGap = parseFloat(window.getComputedStyle(track).gap) || 20;
        const cardWidth = cards[0].offsetWidth + trackGap;
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  }

  // Initialize carousel on Home and Project pages
  initCarousel('home-carousel-track', 'home-carousel-prev', 'home-carousel-next', 'home-carousel-dots');
  initCarousel('page-carousel-track', 'page-carousel-prev', 'page-carousel-next', 'page-carousel-dots');

  // 3. Project Selection & "Fall Away" Logic on project.html
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
  const stageHintText = document.querySelector('.stage-hint-text');

  // Multi-project content configurations
  const projectDataStore = {
    'aquaclean': {
      name: 'AquaClean',
      tagline: '"Cleans you from the inside out" — Media Design 2 & Identity Design Challenge',
      description: 'Een fris watermerk met een eigen visuele identiteit, 3D-verpakking en campagnebeeld door Raphaella van Eijk.',
      images: [
        {
          img: 'images/sketches_1.png',
          fullImg: 'images/sketches_1.png',
          title: 'Schetsboek Pagina 1: Ideation',
          hint: 'Brainstorm steriel & associaties (Clean-X, kat, proefbuisjes)'
        },
        {
          img: 'images/sketches_2.png',
          fullImg: 'images/sketches_2.png',
          title: 'Schetsboek Pagina 2: Vormonderzoek',
          hint: 'Vormonderzoek spuitkoppen & flessen'
        },
        {
          img: 'images/blikjesschets1.jpg',
          fullImg: 'images/blikjesschets1.jpg',
          title: 'Blikjesschetsen 1: Patronen',
          hint: 'Eerste schetsen van het blikje op papier'
        },
        {
          img: 'images/blikjesschets2.jpg',
          fullImg: 'images/blikjesschets2.jpg',
          title: 'Blikjesschetsen 2: Feedbackronde',
          hint: 'Feedbackronde met stickerkeuze medestudenten'
        },
        {
          img: 'images/posterschets1.jpg',
          fullImg: 'images/posterschets1.jpg',
          title: 'Posterschets: Splash Compositie',
          hint: 'Schets van de water splash en compositie'
        },
        {
          img: 'images/moodboardMediaDesign2.png',
          fullImg: 'images/moodboardMediaDesign2.png',
          title: 'Moodboard Media Design 2',
          hint: 'Kleur- en sfeeronderzoek Media Design 2'
        },
        {
          img: 'images/label.png',
          fullImg: 'images/label.png',
          title: 'Blik Label Uitrol',
          hint: '2D verpakkingslabel met CMD credits'
        },
        {
          img: 'images/can_trio.png',
          fullImg: 'images/can_trio.png',
          title: '3D Blikjes Trio Render',
          hint: 'Metallic finish en waterdruppels render'
        },
        {
          img: 'images/can_duo.png',
          fullImg: 'images/can_duo.png',
          title: '3D Blikjes Duo Render',
          hint: 'Close-up render met condensatiedruppels'
        },
        {
          img: 'images/poster.png',
          fullImg: 'images/poster.png',
          title: 'Campagneposter',
          hint: '"Cleans you from the inside out" typografie & compositie'
        },
        {
          img: 'images/posterMDmockup1.png',
          fullImg: 'images/posterMDmockup1.png',
          title: 'Poster Mockup 1',
          hint: 'Aan de muur ingelijste presentatie'
        },
        {
          img: 'images/posterMDmockup2.webp',
          fullImg: 'images/posterMDmockup2.webp',
          title: 'Poster Mockup 2',
          hint: 'Ruimtelijke context mockup'
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
      name: 'Animation: Catch Me If You Can',
      tagline: 'Visual Effects',
      description: 'Een korte animatie van een zelfgemaakte optiteling van de film Catch Me If You Can.',
      images: [
        {
          img: 'images/catchme7.png',
          fullImg: 'images/catchme7.png',
          title: 'Posterschets: Splash & Layout',
          hint: 'Eerste schetsen'
        },
        {
          img: 'images/catchme6.png',
          fullImg: 'images/catchme6.png',
          title: 'Campagneposter',
          hint: 'Eerste schetsen'
        },
        {
          img: 'images/catchme5.png',
          fullImg: 'images/catchme5.png',
          title: 'Poster Mockup 1',
          hint: 'Storyboard'
        },
        {
          img: 'images/catchme4.png',
          fullImg: 'images/catchme4.png',
          title: 'Poster Mockup 2',
          hint: 'Screenshot van de animatie in After Effects'
        },
        {
          img: 'images/catchme3.png',
          fullImg: 'images/catchme3.png',
          title: 'Poster Media Design Final',
          hint: 'Screenshot van de animatie in After Effects'
        },
        {
          img: 'images/catchme2.png',
          fullImg: 'images/catchme2.png',
          title: 'Poster Media Design Final',
          hint: 'Screenshot van de animatie in After Effects'
        },
        {
          img: 'images/catchme1.png',
          fullImg: 'images/catchme1.png',
          title: 'Poster Media Design Final',
          hint: 'Screenshot van de animatie in After Effects'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">De Opdracht</h3>
        <p>
          Voor het vak Media Design 2 kregen wij de opdracht om een korte animatie te maken van een film naar keuze. Ik koos voor de film "Catch Me If You Can" en besloot een optiteling te maken die de essentie van de film samenvat: een kat-en-muisspel tussen de hoofdpersonages. Het idee was om de camera over het bureau van FBI-agent Hanratty te laten bewegen, waarbij verschillende identiteiten en documenten worden onthuld over het karakter Frank Abagnale jr.
        </p>
        <br>
        <h3 class="notebook-heading">Conceptontwikkeling</h3>
        <p>
          In het begin maakte ik een aantal schetsen van onderdelen van de film, thema's die hierin voorkwamen en metaforen die ik hiervoor kon bedenken. Vervolgens heb ik enkele storyboards gemaakt gebaseerd op deze schetsen. Hierbij heb ik ook specifiek beschreven wat er gebeurt en hoe de camera moest bewegen. Als laatste heb ik het project uitgewerkt in Adobe After Effects, waarbij ik de camera over het bureau liet bewegen en de verschillende documenten en identiteiten liet verschijnen.
        </p>
        <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Vak</td>
              <td>Media Design 2</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>Animatie</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
            <tr>
              <td>Software</td>
              <td>Adobe After Effects</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'arcadebox': {
      name: 'Arcade Box',
      tagline: '',
      description: '',
      images: [
        {
          img: 'images/arcadebox_acryl_design.png',
          fullImg: 'images/arcadebox_acryl_design.png',
          title: 'Arcade Box Acryl Design',
          hint: 'Template voor lasersnijden en graveren acryl toplaag'
        },
        {
          img: 'images/arcadebox1.jpg',
          fullImg: 'images/arcadebox1.jpg',
          title: 'De box van binnen',
          hint: 'Uiteindelijke Arcade box met houten behuizing, acryl verf en Arduino Uno R4 Minima'
        },
        {
          img: 'images/arcadebox3.jpg',
          fullImg: 'images/arcadebox3.jpg',
          title: 'De box van buiten',
          hint: 'Uiteindelijke Arcade box met houten behuizing, acryl verf en Arduino Uno R4 Minima'
        },
        {
          img: 'images/arcadebox4.jpg',
          fullImg: 'images/arcadebox4.jpg',
          title: 'De box van buiten',
          hint: 'Uiteindelijke Arcade box met houten behuizing, acryl verf en Arduino Uno R4 Minima'
        },
        {
          img: 'images/arcadebox5.jpg',
          fullImg: 'images/arcadebox5.jpg',
          title: 'Totaalbeeld van de box',
          hint: 'Uiteindelijke Arcade box met houten behuizing, acryl verf en Arduino Uno R4 Minima'
        }
      ],
      notebookHtml: `
        <h3 class="notebook-heading">De opdracht</h3>
        <br>
        <p>Onze opdracht voor het vak Creative Tech 2 was om een arcade box te maken met een zelfgekozen thema. Ik koos voor een Zelda- en ganzen-thema, geïnspireerd door de game "The Legend of Zelda: Breath of the Wild" en het spel "Untitled Goose Game". Het doel was om een unieke functionele box te maken die laat zien wie jij bent als persoon en wat jouw interesses zijn.
        </p>
        <br>
        <p>Bij de ArcadeBox werkte ik vanuit een lasersnij-bestand in Illustrator (met Zelda- en ganzen elementen) en bouwde ik vervolgens de fysieke controller door middel van aangereikte tools en materialen zoals het hout en de lasersnijder. We moesten het Illustrator bestand gebruiken om de acryl toplaag te graveren en te snijden, en vervolgens de box in elkaar zetten. Het eindresultaat was een functionele arcade box met een uniek ontwerp dat mijn interesses weerspiegelde.
        </p>
        <br>
        <h3 class="notebook-heading">Project Specificaties</h3>
        <table class="notebook-meta-table">
          <tbody>
            <tr>
              <td>Onderdeel</td>
              <td>Creavite Technology 2</td>
            </tr>
            <tr>
              <td>Doel</td>
              <td>Eigen Arcade Box creëren die jezelf enjouw interesses weerspiegelt</td>
            </tr>
            <tr>
              <td>Ontwerper</td>
              <td>Raphaella van Eijk</td>
            </tr>
            <tr>
              <td>Tools</td>
              <td>Illustrator, lasersnijder, Acryl verf, Arduino Uno R4 Minima</td>
            </tr>
          </tbody>
        </table>
      `
    },
    'work-in-progress': {
      name: 'Schetsboek Exploraties',
      tagline: 'Analoge Schetsen • Ideation, Storyboarding & Prototypes',
      description: 'Een inkijkje in mijn schetsboeken: van snelle ideeën en storyboards tot fysieke prototypes.',
      images: [
        {
          img: 'images/visitekaartje.png',
          fullImg: 'images/visitekaartje.png',
          title: 'Schetsboek Pagina 1: Brainstorm',
          hint: 'Onderzoek naar steriel, Clean-X en proefbuisjes'
        },
      ],
      notebookHtml: `
        <h3 class="notebook-heading"></h3>
      `
    }
  };

  function setStageFeaturedImage(item) {
    if (!stageFeaturedImg || !item) return;
    stageFeaturedImg.style.opacity = '0';
    setTimeout(() => {
      stageFeaturedImg.src = item.img;
      stageFeaturedImg.setAttribute('data-full', item.fullImg || item.img);
      stageFeaturedImg.alt = item.title;
      if (stageHintText) {
        stageHintText.textContent = item.hint || item.title;
      }
      stageFeaturedImg.style.opacity = '1';
    }, 150);
  }

  function renderProjectGallery(projectInfo) {
    if (!thumbnailFanRow || !projectInfo.images || !projectInfo.images.length) return;

    thumbnailFanRow.innerHTML = '';
    projectInfo.images.forEach((item, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.setAttribute('data-index', idx);
      thumb.setAttribute('title', item.title);
      thumb.innerHTML = `<img src="${item.img}" alt="${item.title}">`;

      thumb.addEventListener('click', () => {
        setStageFeaturedImage(item);
        thumbnailFanRow.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });

      thumbnailFanRow.appendChild(thumb);
    });

    // Automatically feature the first image
    setStageFeaturedImage(projectInfo.images[0]);
  }

  function selectProject(projectId) {
    if (!projectDetailShowcase) return;

    // Highlight selected card in the carousel
    document.querySelectorAll('.project-carousel-card[data-project]').forEach(c => {
      const isSelected = c.getAttribute('data-project') === projectId;
      c.classList.toggle('selected-card', isSelected);
      c.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    const projectInfo = projectDataStore[projectId] || projectDataStore['aquaclean'];

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

    // Dynamic gallery update
    renderProjectGallery(projectInfo);

    // Smooth scroll so the user immediately sees the updated project and notebook
    setTimeout(() => {
      const scrollTarget = document.getElementById('selected-project-title') || document.querySelector('.selected-project-intro');
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 180);
  }

  function showAllProjects() {
    if (!projectCarouselWrapper || !projectDetailShowcase) return;

    // Restore all projects in carousel
    projectCarouselWrapper.classList.remove('collapsed');
    if (projectActiveHeader) projectActiveHeader.style.display = 'none';

    // Scroll back to carousel smoothly
    projectCarouselWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Attach click to all project cards or "select project" buttons
  const projectSelectBtns = document.querySelectorAll('[data-select-project]');
  projectSelectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-select-project');
      selectProject(projId);
    });
  });

  if (backToAllBtn) {
    backToAllBtn.addEventListener('click', () => {
      showAllProjects();
    });
  }

  document.querySelectorAll('.project-carousel-card[data-project]').forEach(card => {
    const openProject = () => {
      const projectId = card.getAttribute('data-project');
      const isProjectPage = !!document.getElementById('project-detail-showcase');
      if (isProjectPage) {
        selectProject(projectId);
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

  // Check URL params on project.html (e.g. ?project=aquaclean or ?view=all)
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

  // 4. Lightbox Modal for Zooming Images
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


  if (canvas) {
    const ctx = canvas.getContext('2d');
    const points = [];
    const trailDuration = 700;

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
      if (!last || Math.hypot(last.x - x, last.y - y) > 7) {
        points.push({ x, y, start: Date.now() });
        if (points.length > 80) {
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
          const alpha = Math.max(0.0, 0.92 - Math.max(agePrevious, ageCurrent));

          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(current.x, current.y);
          ctx.strokeStyle = `rgba(35, 35, 35, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
  }

});
