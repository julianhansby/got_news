require('modules');

// import libraries
const axios = require('axios');
const jquery = require('jquery');

// EVENTS
jquery('.selectModel').on('change', function () {
	let getOptionVal = jquery(this).find(':selected').val();
	getData(getOptionVal);
});

// DATA SETTING AND API FETCHING
let getData = function(value){

	let topicKey = value;
	let apiURL = `https://newsapi.org/v2/top-headlines?sources=${topicKey}&apiKey=9e050bb833fe4690856581a1e3dfd272`;
	let articleData = [];
	jquery('.displayData').empty();
	jquery('.displayData').fadeOut('fast');
	jquery('.loading-text').show();
	jquery('.l-footer').hide();

	axios.get(apiURL)
		.then(function (resp) {
			console.log('Here comes the data');
			console.log(resp.data.articles);
			articleData = resp.data.articles;
			let getTop20 = articleData.slice(0,20);
			let htmlData = '';
			for(let i = 0; i <= getTop20.length - 1; i++){
				htmlData += '<div class="col-md-4">'+
								'<h2>'+getTop20[i].title+'</h2>'+
								'<p>'+getTop20[i].description+'</p>'+
								'<p>'+
									'<a class="btn btn-default" target="_blank" href="'+getTop20[i].url+'" role="button">'+
									'Read More'+
									'</a>'+
								'</p>'+
							'</div>';
			}
			jquery('.loading-text').hide();
			jquery('.l-footer').show();
			jquery('.displayData').prepend(htmlData);
			jquery('.displayData').fadeIn('fast');
		}).catch(function (error) {
			console.log(error);
	});
}

// init when page loads
jquery(function(){ getData('abc-news') });