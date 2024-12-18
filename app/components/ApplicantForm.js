import Validator from "../core/Validator.js";

export default class ApplicantForm {
  constructor(dataManager, onSubmitCallback) {
    this.dataManager = dataManager;
    this.onSubmitCallback = onSubmitCallback;
    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.form = document.getElementById("applicant-form");
    this.fullNameInput = document.getElementById("fullname");
    this.emailInput = document.getElementById("email");
    this.phoneInput = document.getElementById("phone");
    this.facultySelect = document.getElementById("faculty");
  }

  bindEvents() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const applicantData = {
      fullName: this.fullNameInput.value.trim(),
      email: this.emailInput.value.trim(),
      phone: this.phoneInput.value.trim(),
      faculty: this.facultySelect.value,
    };

    const validationErrors = Validator.validateApplicant(applicantData);

    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    const newApplicant = this.dataManager.addItem(applicantData);
    this.onSubmitCallback();
    this.resetForm();
  }

  resetForm() {
    this.fullNameInput.value = "";
    this.emailInput.value = "";
    this.phoneInput.value = "";
    this.facultySelect.value = "";
  }
}
