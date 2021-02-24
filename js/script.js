// set variables
const movieHall = document.querySelector(".hall");
const seats = movieHall.querySelectorAll(".block:not(.bg-secondary)");
const option = document.getElementById("movie-option");
const formGroup = document.querySelector(".form-group");
const numberSeats = document.querySelector(".number-seats");
const priceSeats = document.querySelector(".price-seats");

const movieRates = {
	avengers: 10,
	blackPanther: 8,
	batmanVsSuperman: 15,
};

// set event listener
document.addEventListener("DOMContentLoaded", updateUI);
seats.forEach((seat) => seat.addEventListener("click", bookSeat));
option.addEventListener("change", countSeats);

// book a seat
function bookSeat(e) {
	const element = e.target;
	const movie = option.value;
	const smallTag = formGroup.querySelector("small");

	if (movie !== "options") {
		if (smallTag) {
			smallTag.remove();
		}
		element.classList.toggle("bg-warning");

		const selectedSeats = document.querySelectorAll(".hall .block.bg-warning");

		// converting nodelist to array using Array.from and [...]
		const indexOfSeats = Array.from(selectedSeats).map((seat) => [...seats].indexOf(seat));

		localStorage.setItem("movieIndexes", JSON.stringify(indexOfSeats));
		localStorage.setItem("selectedMovie", JSON.stringify(option.selectedIndex));

		countSeats();
	} else {
		let notification = `<small class="form-text text-danger">Please Select Movie from options!</small>`;

		if (smallTag === null) formGroup.insertAdjacentHTML("beforeend", notification);
	}
}

// count seats & price
function countSeats() {
	let price;
	let movieCount = 0;
	const movie = option.value;

	localStorage.setItem("selectedMovie", JSON.stringify(option.selectedIndex));

	seats.forEach((seat) => {
		if (seat.classList.contains("bg-warning")) {
			movieCount++;
		}
	});

	if (movie !== "options") {
		price = movieRates[movie] * movieCount;

		numberSeats.textContent = movieCount;
		priceSeats.textContent = `$${price}`;
	}
}

// update UI on load
function updateUI() {
	const indexOfSeats = JSON.parse(localStorage.getItem("movieIndexes"));
	const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

	if (indexOfSeats.length > 0) {
		indexOfSeats.forEach((seat) => {
			// arr = [1,2,3] => arr[0] => 1
			[...seats][seat].classList.add("bg-warning");
			option.selectedIndex = selectedMovie;
			countSeats();
		});
	}
}
