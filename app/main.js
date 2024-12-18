import DataManager from "./core/DataManager.js";
import ApplicantForm from "./components/ApplicantForm.js";
import ApplicantList from "./components/ApplicantList.js";
import SearchFilter from "./components/SearchFilter.js";

document.addEventListener("DOMContentLoaded", () => {
  const dataManager = new DataManager("applicants");

  const applicantList = new ApplicantList(dataManager);

  const applicantForm = new ApplicantForm(dataManager, () => {
    applicantList.updateList();
  });

  const searchFilter = new SearchFilter(dataManager, applicantList);

  applicantList.updateList();
});
