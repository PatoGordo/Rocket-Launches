const Home = Vue.component('Home', {
  data: function () {
    return {
  		title: "Rocket Launches - Home",
			nextLaunch: [],
			firstArticle: [],
			errorMessage: '',
			errorMessageVisibility: false,
			localeNow: 0,
			isMetric: null
    }
  },
	methods:{
		
	},
	created(){
		document.querySelector('#modal').style.display = 'flex'
		axios.get('https://rocket-launches-api.vercel.app/api/launches')
		.then(res => {
			this.nextLaunch = res.data.result.slice(0,1)
			axios.get('https://rocket-launches-api.vercel.app/api/news')
			.then(res => {
				this.firstArticle = res.data.slice(0,1)
				document.querySelector('#modal').style.display = 'none'
			})
		})
		
		if(localStorage.getItem('measures') == 'metric'){
			this.isMetric = true
		}else{
			this.isMetric = false
		}
		
		document.title = this.title
	},
  template: `
	<div class="component home">
		<div class="container">
			<h2>Next Launch</h2>
			<div class="card" v-for="next in nextLaunch">
				<h2 class="card-title"><strong>{{next.name}}</strong></h2>
				<p class="card-date">{{Utils.unixConverter(next.sort_date)}}</p>
				<p class="card-description">{{next.launch_description}}</p>
				<p class="card-others first"><strong>Vehicle:</strong> {{next.vehicle.name}}</p>
				<p class="card-others"><strong>Local:</strong> {{next.pad.location.name}}, {{next.pad.location.country}}</p>
				<p class="card-others"><strong>Weather</strong> <br>Condition: {{next.weather_condition != null ? next.weather_condition : 'null' }}, <br>Temperature: {{isMetric ? Utils.toMetricTemp(next.weather_temp) + '°C' : next.weather_temp + '°F'}}, <br>Wind: {{isMetric ? Utils.toMetricSpeed(next.weather_wind_mph) + 'Km/h' : next.weather_wind_mph + 'Mph'}}.</p>
			</div>
			<h2>Breaking News</h2>
			<div class="card" v-for="article in firstArticle">
				<h2 class="card-title"><strong>{{article.title}}</strong></h2>
				<p class="card-date">{{Utils.iSOtoUTC(article.publishedAt)}}</p>
				<p class="card-description">{{article.summary}}</p>
				<p class="card-others first"><a :href="article.url"><strong>See more in {{article.newsSite}}</a></strong></p>
			</div>
		</div>
	</div>`
})