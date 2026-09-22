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


  const page =
    document.getElementById(pageName);


  if (page) {

    page.classList.add("active");

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
    function () {

      const page =
        this.dataset.page;


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


        location.hash =
          page;


        openPage(page);

      }
    );

  });



mobileMenu.addEventListener(
  "click",
  function () {

    navigation.classList.toggle("open");

  }
);



function loadHashPage() {

  const hash =
    location.hash.replace("#", "");


  if (hash) {

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



/* ======================================================
   POPULATION
====================================================== */


const dives = [

  {
    code: "101A",
    name: "Plongeon avant tendu",
    discipline: "Plongeon olympique",
    group: "Avant",
    height: "Variable"
  },

  {
    code: "201A",
    name: "Plongeon arrière tendu",
    discipline: "Plongeon olympique",
    group: "Arrière",
    height: "Variable"
  },

  {
    code: "301A",
    name: "Plongeon renversé tendu",
    discipline: "Plongeon olympique",
    group: "Renversé",
    height: "Variable"
  },

  {
    code: "401A",
    name: "Plongeon retourné tendu",
    discipline: "Plongeon olympique",
    group: "Retourné",
    height: "Variable"
  },

  {
    code: "DODS-01",
    name: "Døds classique",
    discipline: "Freestyle / Døds",
    group: "Døds",
    height: "Variable"
  },

  {
    code: "FREE-01",
    name: "Freestyle libre",
    discipline: "Freestyle / Døds",
    group: "Freestyle",
    height: "Variable"
  },

  {
    code: "HD-01",
    name: "Rotation avant High Diving",
    discipline: "High Diving",
    group: "Avant",
    height: "10 à 30 m"
  },

  {
    code: "ANGE-01",
    name: "Saut de l'ange",
    discipline: "Saut de l'ange",
    group: "Ange",
    height: "Variable"
  }

];



const searchDive =
  document.getElementById("searchDive");


const disciplineFilter =
  document.getElementById("disciplineFilter");


const populationResults =
  document.getElementById("populationResults");



function displayPopulation() {

  const search =
    searchDive.value
      .toLowerCase()
      .trim();


  const discipline =
    disciplineFilter.value;


  const results =
    dives.filter(dive => {

      const text =
        (
          dive.code +
          " " +
          dive.name +
          " " +
          dive.discipline +
          " " +
          dive.group
        )
        .toLowerCase();


      const searchMatch =
        !search ||
        text.includes(search);


      const disciplineMatch =
        !discipline ||
        dive.discipline === discipline;


      return (
        searchMatch &&
        disciplineMatch
      );

    });



  if (results.length === 0) {

    populationResults.innerHTML =
      `
      <div class="info-box">
        Aucun plongeon trouvé.
      </div>
      `;

    return;

  }



  populationResults.innerHTML =
    results.map(dive => {

      return `
        <article class="population-result">

          <strong>
            ${dive.code}
          </strong>

          <div>

            <strong>
              ${dive.name}
            </strong>

            <br>

            <span>
              ${dive.discipline}
            </span>

          </div>

          <div>

            <span>
              Groupe
            </span>

            <br>

            ${dive.group}

            ·

            ${dive.height}

          </div>

        </article>
      `;

    }).join("");

}



searchDive.addEventListener(
  "input",
  displayPopulation
);


disciplineFilter.addEventListener(
  "change",
  displayPopulation
);


displayPopulation();



/* ======================================================
   FORMULAIRE
====================================================== */


const gradingForm =
  document.getElementById("gradingForm");


const formMessage =
  document.getElementById("formMessage");



gradingForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    formMessage.innerHTML =
      `
      Le formulaire est prêt.
      Il reste maintenant à le connecter
      à ton Google Sheet / Apps Script
      pour recevoir réellement les demandes.
      `;

  }
);
