const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint).then(response => response.json()).then(value => cities.push(...value));

window.onload = function() {

	const suggestions = document.querySelector(".suggestions");
	const search = document.querySelector(".search");

	search.addEventListener("change", displayMatches);
	search.addEventListener("keyup", displayMatches);


	function findMatches(wordToMatch, list){
		const regex = new RegExp(wordToMatch, "gi");
		return list.filter(place => place.city.match(regex) || place.state.match(regex));
	}

	function displayMatches(){
		
		const wordToMatch = this.value;
		const regex = new RegExp(wordToMatch, "gi");

		var matchesHtml = "";
		findMatches(wordToMatch, cities).forEach(place => {
			
			const hl = `<span class="hl">${wordToMatch}</span>`;
			var city = place.city.replace(regex, hl);
			var state = place.state.replace(regex, hl);
			matchesHtml += `<li><span>${city}, ${state}</span><span>${place.population}</span></li>`;

		});
		suggestions.innerHTML = matchesHtml;
	}

}