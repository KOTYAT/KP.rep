export default class ApplicantList {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.container = document.getElementById("applicants-container");
    this.totalCountSpan = document.getElementById("total-applicants");
  }

  renderList(applicants) {
    this.container.innerHTML = "";
    this.totalCountSpan.textContent = applicants.length;

    applicants.forEach((applicant) => {
      const applicantElement = this.createApplicantElement(applicant);
      this.container.appendChild(applicantElement);
    });
  }

  createApplicantElement(applicant) {
    const card = document.createElement("div");
    card.classList.add("applicant-card");
    card.innerHTML = `
            <div>
                <strong>${applicant.fullName}</strong><br>
                Email: ${applicant.email}<br>
                Телефон: ${applicant.phone}<br>
                Факультет: ${this.getFacultyName(applicant.faculty)}
            </div>
            <button class="delete-btn" data-id="${
              applicant.id
            }">Удалить</button>
        `;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      this.dataManager.removeItem(applicant.id);
      this.updateList();
    });

    return card;
  }

  getFacultyName(facultyCode) {
    const facultyNames = {
      IT: "Информационных технологий",
      ECONOMICS: "Экономический",
      MEDICINE: "Медицинский",
      HUMANITIES: "Гуманитарный",
    };
    return facultyNames[facultyCode] || facultyCode;
  }

  updateList() {
    const applicants = this.dataManager.getItems();
    this.renderList(applicants);
  }
}
