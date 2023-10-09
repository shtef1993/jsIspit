const input = document.querySelector("#searchBar");
const tbody = document.querySelector("tbody");
const table = document.querySelector("table");
const url = "https://api.tvmaze.com/search/shows?q=";
const loader = document.querySelector("#loader");
let timeout = null;

const search = () => {
  clearTimeout(timeout); //debounce
  timeout = setTimeout(function () {
    toggleLoader();
    setTimeout(() => {
      //throttle for load anim
      fetch(url + input.value)
        .then((res) => res.json())
        .then((data) => {
          renderData(data);
          toggleLoader();
        })
        .catch((error) => alert(`ERROR! ${error}`));
    }, 1000);
  }, 1000);
};

const renderData = function (data) {
  tbody.innerHTML = "";
  if (!data.length) {
    alert("No movies found.");
    input.value = "";
  } else {
    for (list of data) {
      const newRow = document.createElement("tr");
      const nameCell = document.createElement("td");
      const posterCell = document.createElement("td");
      const ratingCell = document.createElement("td");
      const genreCell = document.createElement("td");
      const descCell = document.createElement("td");
      const image = document.createElement("img");
      tbody.append(newRow);
      newRow.append(nameCell);
      newRow.append(posterCell);
      newRow.append(ratingCell);
      newRow.append(genreCell);
      newRow.append(descCell);
      posterCell.append(image);
      nameCell.innerText = list.show.name;
      image.setAttribute("src", list.show.image?.medium);

      ratingCell.innerText = Math.round(list.score * 100) / 10 + " / 10";
      genreCell.innerText = list.show.genres;
      descCell.innerHTML = list.show.summary;
    }
  }
};
const toggleLoader = function () {
  loader.classList.toggle("hidden");
  table.classList.toggle("hidden");
};
input.addEventListener("input", search);
