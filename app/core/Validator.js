export default class Validator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }

  static validateApplicant(applicant) {
    const errors = [];

    if (!applicant.fullName || applicant.fullName.trim() === "") {
      errors.push("Пожалуйста, введите полное имя");
    }

    if (!this.validateEmail(applicant.email)) {
      errors.push("Некорректный адрес электронной почты");
    }

    if (!this.validatePhone(applicant.phone)) {
      errors.push("Номер телефона должен содержать 10-11 цифр");
    }

    if (!applicant.faculty) {
      errors.push("Пожалуйста, выберите факультет");
    }

    return errors;
  }
}
