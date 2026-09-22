/* =========================================================
   EAH DIVING
   ========================================================= */


/* =========================================================
   NAVIGATION
   ========================================================= */

const pages =
  document.querySelectorAll(".page");

const navigationLinks =
  document.querySelectorAll("[data-page]");

const mobileMenu =
  document.getElementById("mobileMenu");

const navigation =
  document.getElementById("navigation");


function openPage(pageName) {

  pages.forEach(page => {
    page.classList.remove("active");
  });


  const target =
    document.getElementById(pageName);


  if (target) {

    target.classList.add("active");

  }


  if (
    window.location.hash
    !==
    "#" + pageName
  ) {

    history.replaceState(
      null,
      "",
      "#" + pageName
    );

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (navigation) {

    navigation.classList.remove("open");

  }

}


navigationLinks.forEach(link => {

  link.addEventListener(
    "click",
    function (event) {

      const page =
        this.dataset.page;


      if (!page) {
        return;
      }


      event.preventDefault();


      openPage(page);

    }
  );

});


document
  .querySelectorAll("[data-open]")
  .forEach(card => {

    card.addEventListener(
      "click",
      function () {

        const page =
          this.dataset.open;


        if (page) {

          openPage(page);

        }

      }
    );

  });


if (mobileMenu) {

  mobileMenu.addEventListener(
    "click",
    function () {

      navigation.classList.toggle("open");

    }
  );

}


function loadHashPage() {

  const hash =
    window.location.hash
      .replace("#", "");


  if (
    hash
    &&
    document.getElementById(hash)
  ) {

    openPage(hash);

  }

  else {

    openPage("accueil");

  }

}


window.addEventListener(
  "hashchange",
  loadHashPage
);


loadHashPage();


/* =========================================================
   MODAL
   ========================================================= */

const siteModal =
  document.getElementById("siteModal");

const modalContent =
  document.getElementById("modalContent");


function openModal(html) {

  if (
    !siteModal
    ||
    !modalContent
  ) {

    return;

  }


  modalContent.innerHTML =
    html;


  siteModal.classList.add("show");

  siteModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );

}


function closeModal() {

  if (!siteModal) {
    return;
  }


  siteModal.classList.remove("show");

  siteModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );

}


document.addEventListener(
  "click",
  function (event) {

    if (
      event.target.matches(
        "[data-close-modal]"
      )
    ) {

      closeModal();

    }

  }
);


document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   GRADING
   ========================================================= */

const gradingSheets = {

  D: {

    title:
      "Takeoff — Départ",

    image:
      "grading-takeoff.png",

    intro:
      `
      Le critère Takeoff analyse la façon
      dont la performance est initiée :
      trajectoire, impulsion, coordination,
      stabilité et préparation.
      `

  },


  T: {

    title:
      "Trick — Phase aérienne",

    image:
      "grading-trick.png",

    intro:
      `
      Le critère Trick analyse la qualité
      de la phase aérienne :
      rotations, lignes, position du corps,
      fluidité, ouverture et repères.
      `

  },


  E: {

    title:
      "Entry — Entrée à l'eau",

    image:
      "grading-entry.png",

    intro:
      `
      Le critère Entry analyse la phase
      terminale de la performance :
      angle, axe, alignement,
      position des bras et des jambes
      et qualité de l'entrée.
      `

  }

};


document
  .querySelectorAll(
    ".grading-card[data-sheet]"
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      function () {

        const key =
          this.dataset.sheet;


        const sheet =
          gradingSheets[key];


        if (!sheet) {
          return;
        }


        openModal(
          `
          <div class="modal-inner">

            <span class="overline">
              GRILLE EAH
            </span>

            <h2>
              ${sheet.title}
            </h2>


            <p>
              ${sheet.intro}
            </p>


            <div class="modal-note">

              <h3>
                Comment la note est-elle calculée ?
              </h3>

              <p>
                Chaque critère possède
                jusqu'à 5 items d'évaluation.
              </p>

              <p>
                Chaque item peut apporter
                jusqu'à 2 points.
              </p>

              <p>
                5 items totalement validés
                donnent donc
                <strong>10 / 10</strong>.
              </p>

            </div>


            <img
              src="${sheet.image}"
              alt="${sheet.title}"
              class="modal-image"
            >


            <div class="modal-note">

              <h3>
                Calcul du résultat global
              </h3>

              <p>
                Les trois notes
                D, T et E
                sont ensuite réunies.
              </p>

              <p>
                <strong>
                  Note globale =
                  (D + T + E) ÷ 3
                </strong>
              </p>

              <p>
                Exemple :
                D = 7,
                T = 8,
                E = 6.
              </p>

              <p>
                (7 + 8 + 6) ÷ 3 =
                <strong>7 / 10</strong>.
              </p>

              <p>
                Si la moyenne produit
                une décimale,
                elle peut être arrondie
                à l'entier le plus proche
                pour correspondre
                à l'échelle EAH de 0 à 10.
              </p>

            </div>

          </div>
          `
        );

      }
    );

  });


/* =========================================================
   POPULATION
   ========================================================= */

/*
  IMPORTANT :

  Les statistiques sont actuellement
  mises à 0 lorsqu'il n'y a pas encore
  de Grade Report enregistré.

  Tu pourras ensuite connecter ces données
  automatiquement à Google Sheets /
  Apps Script.
*/


const dives = [

  {
    code: "101A",

    name:
      "Plongeon avant tendu",

    discipline:
      "Plongeon olympique",

    group:
      "Avant",

    height:
      "Variable",

    description:
      "Plongeon avant réalisé en position tendue.",

    characteristics: [
      "Groupe : avant",
      "Position : tendue",
      "Rotation : avant",
      "Entrée : tête en premier",
      "Discipline : plongeon olympique"
    ],

    stats: []
  },


  {
    code: "201A",

    name:
      "Plongeon arrière tendu",

    discipline:
      "Plongeon olympique",

    group:
      "Arrière",

    height:
      "Variable",

    description:
      "Plongeon arrière réalisé en position tendue.",

    characteristics: [
      "Groupe : arrière",
      "Position : tendue",
      "Rotation : arrière",
      "Entrée : tête en premier",
      "Discipline : plongeon olympique"
    ],

    stats: []
  },


  {
    code: "301A",

    name:
      "Plongeon renversé tendu",

    discipline:
      "Plongeon olympique",

    group:
      "Renversé",

    height:
      "Variable",

    description:
      "Plongeon du groupe renversé en position tendue.",

    characteristics: [
      "Groupe : renversé",
      "Position : tendue",
      "Discipline : plongeon olympique"
    ],

    stats: []
  },


  {
    code: "401A",

    name:
      "Plongeon retourné tendu",

    discipline:
      "Plongeon olympique",

    group:
      "Retourné",

    height:
      "Variable",

    description:
      "Plongeon du groupe retourné en position tendue.",

    characteristics: [
      "Groupe : retourné",
      "Position : tendue",
      "Discipline : plongeon olympique"
    ],

    stats: []
  },


  {
    code: "DODS-01",

    name:
      "Døds classique",

    discipline:
      "Freestyle / Døds",

    group:
      "Døds",

    height:
      "Variable",

    description:
      "Døds classique évalué selon les conditions spécifiques du référentiel EAH.",

    characteristics: [
      "Discipline : Freestyle / Døds",
      "Groupe : Døds",
      "Entrée spécifique",
      "Tolérances adaptées à la discipline"
    ],

    stats: []
  },


  {
    code: "FREE-01",

    name:
      "Freestyle libre",

    discipline:
      "Freestyle / Døds",

    group:
      "Freestyle",

    height:
      "Variable",

    description:
      "Figure freestyle évaluée selon la technique annoncée.",

    characteristics: [
      "Discipline : Freestyle / Døds",
      "Groupe : Freestyle",
      "Technique annoncée prise en compte",
      "Tolérances spécifiques"
    ],

    stats: []
  },


  {
    code: "HD-01",

    name:
      "Rotation avant High Diving",

    discipline:
      "High Diving",

    group:
      "Avant",

    height:
      "10 m et plus",

    description:
      "Exemple de figure de rotation avant en High Diving.",

    characteristics: [
      "Discipline : High Diving",
      "Groupe : avant",
      "Hauteur : 10 m et plus",
      "Difficulté dépendante de la figure et de la hauteur"
    ],

    stats: []
  },


  {
    code: "ANGE-01",

    name:
      "Saut de l'ange",

    discipline:
      "Saut de l'ange",

    group:
      "Ange",

    height:
      "Variable",

    description:
      "Saut de l'ange évalué selon la trajectoire, la posture et l'entrée.",

    characteristics: [
      "Discipline : saut de l'ange",
      "Groupe : ange",
      "Posture contrôlée",
      "Angle d'entrée adapté au référentiel EAH"
    ],

    stats: []
  }

];


/* =========================================================
   POPULATION ELEMENTS
   ========================================================= */

const searchDive =
  document.getElementById(
    "searchDive"
  );

const disciplineFilter =
  document.getElementById(
    "disciplineFilter"
  );

const groupFilter =
  document.getElementById(
    "groupFilter"
  );

const populationResults =
  document.getElementById(
    "populationResults"
  );


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   GROUP FILTER
   ========================================================= */

function populateGroupFilter() {

  if (!groupFilter) {
    return;
  }


  const groups =
    [
      ...new Set(
        dives.map(
          dive => dive.group
        )
      )
    ]
    .sort();


  groups.forEach(group => {

    const option =
      document.createElement(
        "option"
      );


    option.value =
      group;


    option.textContent =
      group;


    groupFilter.appendChild(
      option
    );

  });

}


populateGroupFilter();


/* =========================================================
   DIVE DETAILS
   ========================================================= */

function showDiveDetails(code) {

  const dive =
    dives.find(
      item =>
        item.code === code
    );


  if (!dive) {
    return;
  }


  const characteristicsHTML =
    dive.characteristics
      .map(
        item =>
          `
          <li>
            ${escapeHTML(item)}
          </li>
          `
      )
      .join("");


  let statsHTML;


  if (
    !dive.stats
    ||
    dive.stats.length === 0
  ) {

    statsHTML =
      `
      <tr>

        <td>
          —
        </td>

        <td>
          0
        </td>

        <td>
          Aucune donnée enregistrée
        </td>

      </tr>
      `;

  }

  else {

    statsHTML =
      dive.stats
        .map(
          stat =>
            `
            <tr>

              <td>
                ${escapeHTML(stat.height)}
              </td>

              <td>
                ${escapeHTML(stat.people)}
              </td>

              <td>
                ${escapeHTML(stat.score)}
              </td>

            </tr>
            `
        )
        .join("");

  }


  openModal(
    `
    <div class="modal-inner">

      <span class="overline">
        RÉFÉRENTIEL POPULATION
      </span>

      <h2>
        ${escapeHTML(dive.name)}
      </h2>


      <p>
        <strong>Code :</strong>
        ${escapeHTML(dive.code)}
      </p>


      <p>
        <strong>Discipline :</strong>
        ${escapeHTML(dive.discipline)}
      </p>


      <p>
        <strong>Groupe :</strong>
        ${escapeHTML(dive.group)}
      </p>


      <p>
        <strong>Hauteur :</strong>
        ${escapeHTML(dive.height)}
      </p>


      <p>
        ${escapeHTML(dive.description)}
      </p>


      <div class="modal-note">

        <h3>
          Caractéristiques
        </h3>

        <ul class="modal-list">

          ${characteristicsHTML}

        </ul>

      </div>


      <div class="modal-note">

        <h3>
          Population EAH
        </h3>

        <p>
          Nombre de personnes
          ayant obtenu un grading
          sur cette figure,
          réparties par hauteur.
        </p>


        <div class="stats-table-wrapper">

          <table class="stats-table">

            <thead>

              <tr>

                <th>
                  Hauteur
                </th>

                <th>
                  Personnes
                </th>

                <th>
                  Note / résultat
                </th>

              </tr>

            </thead>


            <tbody>

              ${statsHTML}

            </tbody>

          </table>

        </div>

      </div>


      <p class="small-note">
        Ces statistiques pourront être
        mises à jour automatiquement
        à partir des Grade Reports EAH.
      </p>

    </div>
    `
  );

}


/* =========================================================
   POPULATION DISPLAY
   ========================================================= */

function displayPopulation() {

  if (
    !searchDive
    ||
    !disciplineFilter
    ||
    !groupFilter
    ||
    !populationResults
  ) {

    return;

  }


  const search =
    searchDive.value
      .toLowerCase()
      .trim();


  const discipline =
    disciplineFilter.value;


  const selectedGroup =
    groupFilter.value;


  const filtered =
    dives.filter(dive => {

      const searchable =
        (
          dive.code
          + " "
          + dive.name
          + " "
          + dive.discipline
          + " "
          + dive.group
        )
        .toLowerCase();


      const matchesSearch =
        !search
        ||
        searchable.includes(
          search
        );


      const matchesDiscipline =
        !discipline
        ||
        dive.discipline
        ===
        discipline;


      const matchesGroup =
        !selectedGroup
        ||
        dive.group
        ===
        selectedGroup;


      return (
        matchesSearch
        &&
        matchesDiscipline
        &&
        matchesGroup
      );

    });


  if (
    filtered.length === 0
  ) {

    populationResults.innerHTML =
      `
      <div class="empty-result">
        Aucun plongeon trouvé
        avec ces critères.
      </div>
      `;


    return;

  }


  populationResults.innerHTML =
    filtered
      .map(
        dive =>
          `
          <article
            class="population-result"
          >

            <div
              class="population-code"
            >
              ${escapeHTML(dive.code)}
            </div>


            <div>

              <button
                class="dive-link"
                type="button"
                data-dive-code="${escapeHTML(dive.code)}"
              >
                ${escapeHTML(dive.name)}
              </button>

              <br>

              <span>
                ${escapeHTML(dive.discipline)}
              </span>

            </div>


            <div>

              <span>
                Groupe / hauteur
              </span>

              <br>

              ${escapeHTML(dive.group)}

              ·

              ${escapeHTML(dive.height)}

            </div>

          </article>
          `
      )
      .join("");


  document
    .querySelectorAll(
      ".dive-link"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          showDiveDetails(
            this.dataset.diveCode
          );

        }
      );

    });

}


if (searchDive) {

  searchDive.addEventListener(
    "input",
    displayPopulation
  );

}


if (disciplineFilter) {

  disciplineFilter.addEventListener(
    "change",
    displayPopulation
  );

}


if (groupFilter) {

  groupFilter.addEventListener(
    "change",
    displayPopulation
  );

}


displayPopulation();


/* =========================================================
   FORMULAIRE
   ========================================================= */

const gradingForm =
  document.getElementById(
    "gradingForm"
  );

const formMessage =
  document.getElementById(
    "formMessage"
  );


if (
  gradingForm
  &&
  formMessage
) {

  gradingForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      formMessage.innerHTML =
        `
        Le formulaire du site fonctionne
        visuellement.

        <br><br>

        L'étape suivante consiste
        à le connecter à ton
        Google Apps Script
        pour enregistrer réellement
        les demandes de grading.
        `;

    }
  );

}
