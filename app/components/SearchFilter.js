export default class SearchFilter {
  constructor(dataManager, applicantList) {
    this.dataManager = dataManager;
    this.applicantList = applicantList;
    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.searchInput = document.getElementById("search-input");
    this.facultyFilter = document.getElementById("faculty-filter");
  }

  bindEvents() {
    this.searchInput.addEventListener("input", () => this.applyFilter());
    this.facultyFilter.addEventListener("change", () => this.applyFilter());
  }

  applyFilter() {
    const searchTerm = this.searchInput.value.trim();
    const facultyFilter = this.facultyFilter.value;

    const filteredApplicants = this.dataManager.filterItems(
      searchTerm,
      facultyFilter
    );
    this.applicantList.renderList(filteredApplicants);
  }
}
