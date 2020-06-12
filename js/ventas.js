// JAVASCRIPT CODE OF SALES PAGE

// OBJETO VUE:
var salesApp = new Vue({
  el: "#sales",
  data: {
    cars: [],
    currency: "USD",
    exchangeRateUYU: 0,
    brands: [],
    brandSelected: "",
    models: [],
    modelSelected: "",
    years: [],
    yearSelected: "",
    statusSelected: "",
    filtering: false,
  },
  filters: {
    thousands: function (value) {
      return parseInt(value).toLocaleString("es-UY");
    },
  },
});

// LOAD OF YEARS:
for (var i = 2020; i >= 1900; i--) {
  salesApp.years.push(i);
}

/*  CHARGE BY EXCHANGE RATE*/

$.ajax({
  url: "https://ha.edu.uy/api/rates",
  success: function (data) {
    salesApp.exchangeRateUYU = data.uyu;
  },
});

/* LOAD OF BRANDS.*/

$.ajax({
  url: "https://ha.edu.uy/api/brands",
  success: function (data) {
    salesApp.brands = data;
  },
});

/* LOAD OF MODELS*/

$("#select-brand").on("change", function () {
  var url = "https://ha.edu.uy/api/models?brand=" + salesApp.brandSelected;

  $.ajax({
    url: url,
    success: function (data) {
      salesApp.models = data;
      salesApp.modelSelected = "";
    },
  });
});

/*CAR FILTER.*/

$("#btn-filter").on("click", function () {
  loadCars();
});

/*CHANGE CURRENCIES.*/

$("#btn-currency").on("click", function () {
  if (salesApp.currency == "USD") {
    salesApp.currency = "UYU";
  } else {
    salesApp.currency = "USD";
  }
});

/* LOAD OF CARS.*/

function loadCars() {
  salesApp.filtering = true;

  var year = salesApp.yearSelected; // Shortcut.
  var brand = salesApp.brandSelected; // Shortcut.
  var model = salesApp.modelSelected; // Shortcut.
  var status = salesApp.statusSelected; // Shortcut.

  $.ajax({
    url:
      "https://ha.edu.uy/api/cars?year=" +
      year +
      "&brand=" +
      brand +
      "&model=" +
      model +
      "&status=" +
      status,
    success: function (data) {
      salesApp.filtering = false;
      salesApp.cars = data;
      $(".alert-warning").removeClass("hidden");
    },
  });
}

// INITIAL LOAD OF CARS:
loadCars();
