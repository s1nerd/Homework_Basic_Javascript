// Define a class for Pendaftar
class Pendaftar {
  constructor(nama, umur, uangSangu) {
    this.nama = nama;
    this.umur = umur;
    this.uangSangu = uangSangu;
  }
}

// Array to store pendaftar objects
const pendaftarList = [];

// Function to open a tab
function openTab(tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

// Function to add pendaftar to the list
function addPendaftar(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const umur = parseInt(document.getElementById("umur").value);
  const uangSangu = parseInt(document.getElementById("uangSangu").value);

  if (
    nama.length < 10 ||
    umur < 25 ||
    uangSangu < 100000 ||
    uangSangu > 1000000
  ) {
    alert("Data tidak memenuhi kriteria!");
    return;
  }

  const pendaftar = new Pendaftar(nama, umur, uangSangu);
  pendaftarList.push(pendaftar);

  document.getElementById("nama").value = "";
  document.getElementById("umur").value = "";
  document.getElementById("uangSangu").value = "";

  updatePendaftarTable();
}

// Function to update the table with pendaftar data
function updatePendaftarTable() {
  const tableBody = document.getElementById("pendaftarData");
  tableBody.innerHTML = "";

  for (const pendaftar of pendaftarList) {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = pendaftar.nama;
    cell2.innerHTML = pendaftar.umur;
    cell3.innerHTML = pendaftar.uangSangu;
  }

  // Calculate and display the resume
  const averageUangSangu = calculateAverageUangSangu();
  const averageUmur = calculateAverageUmur();
  document.getElementById(
    "resume"
  ).textContent = `Rata-rata pendaftar memiliki uang sangu sebesar ${averageUangSangu} dengan rata-rata umur ${averageUmur}`;
}

// Function to calculate average uangSangu
function calculateAverageUangSangu() {
  if (pendaftarList.length === 0) {
    return 0;
  }

  let totalUangSangu = 0;
  for (const pendaftar of pendaftarList) {
    totalUangSangu += pendaftar.uangSangu;
  }

  return (totalUangSangu / pendaftarList.length).toFixed(2);
}

// Function to calculate average umur
function calculateAverageUmur() {
  if (pendaftarList.length === 0) {
    return 0;
  }

  let totalUmur = 0;
  for (const pendaftar of pendaftarList) {
    totalUmur += pendaftar.umur;
  }

  return (totalUmur / pendaftarList.length).toFixed(2);
}

// Add event listener to the form
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", addPendaftar);

// Default tab to open
openTab("Registrasi");
