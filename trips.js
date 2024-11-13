// Model
let tripsData = loadTripsFromLocalStorage();

function saveTripsToLocalStorage() {
 localStorage.setItem('trips', JSON.stringify(tripsData));
}

function loadTripsFromLocalStorage() {
 const trips = localStorage.getItem('trips');
 return trips ? JSON.parse(trips) : [];
}

// View
const tripList = document.getElementById('trip-list');
const tripTemplate = document.getElementById('trip-template').content;
const dateFilterInput = document.getElementById('date-filter');
const completedFilterCheckbox = document.getElementById('completed-filter');

function renderTrips(trips) {
 tripList.innerHTML = '';
 trips.forEach(trip => {
  const tripNode = tripTemplate.cloneNode(true);
  tripNode.querySelector('.destination').textContent = trip.destination;
  tripNode.querySelector('.date').textContent = trip.date;
  tripNode.querySelector('.notes').textContent = trip.notes;
  tripNode.querySelector('.status').textContent = trip.status;
  tripNode.querySelector('.edit').dataset.index = tripsData.indexOf(trip); 
  tripList.appendChild(tripNode);
 });
}

// Presenter
const tripForm = document.getElementById('trip-form');

function addTrip(event) {
 event.preventDefault();
 const destination = document.getElementById('trip-destination').value;
 const date = document.getElementById('trip-date').value;
 const notes = document.getElementById('trip-notes').value;
 const status = document.querySelector('input[name="trip-status"]:checked').value;

 tripsData.push({ destination, date, notes, status });
 saveTripsToLocalStorage(); 
 renderTrips(tripsData);
 tripForm.reset();
}

function deleteTrip(index) {
 tripsData.splice(index, 1);
 saveTripsToLocalStorage(); 
 renderTrips(tripsData);
}

function editTrip(index) {
 const trip = tripsData[index];
 document.getElementById('edit-destination').value = trip.destination;
 document.getElementById('edit-date').value = trip.date;
 document.getElementById('edit-notes').value = trip.notes;
 document.getElementById('edit-status').value = trip.status; 
 document.getElementById('edit-trip-form').dataset.index = index;
 document.getElementById('edit-trip-form').style.display = 'block';
}

function saveTrip(event) {
 event.preventDefault();
 const index = parseInt(document.getElementById('edit-trip-form').dataset.index, 10);
 const destination = document.getElementById('edit-destination').value;
 const date = document.getElementById('edit-date').value;
 const notes = document.getElementById('edit-notes').value;
 const status = document.getElementById('edit-status').value;

 tripsData[index] = { destination, date, notes, status };
 saveTripsToLocalStorage();
 renderTrips(tripsData);
 document.getElementById('edit-trip-form').style.display = 'none';
 document.getElementById('edit-trip-form').reset();
}

function filterTrips() {
 const filterDate = dateFilterInput.value;
 const showCompleted = completedFilterCheckbox.checked;
 let filteredTrips = tripsData;

 if (filterDate) {
  const filterDateObj = new Date(filterDate);
  filteredTrips = filteredTrips.filter(trip => {
   const tripDateObj = new Date(trip.date);
   return tripDateObj.getDate() === filterDateObj.getDate() &&
       tripDateObj.getMonth() === filterDateObj.getMonth() &&
       tripDateObj.getFullYear() === filterDateObj.getFullYear();
  });
 }

 if (showCompleted) {
  filteredTrips = filteredTrips.filter(trip => trip.status === 'Completed');
 }

 renderTrips(filteredTrips);
}

// Обработчики событий
tripForm.addEventListener('submit', addTrip);
tripList.addEventListener('click', event => {
 if (event.target.classList.contains('delete')) {
  const index = Array.from(tripList.children).indexOf(event.target.parentElement);
  deleteTrip(index);
 } else if (event.target.classList.contains('edit')) {
  const index = parseInt(event.target.dataset.index, 10);
  editTrip(index);
 }
});

document.getElementById('edit-trip-form').addEventListener('submit', saveTrip);
dateFilterInput.addEventListener('change', filterTrips);
completedFilterCheckbox.addEventListener('change', filterTrips);

// Инициализация
renderTrips(tripsData);