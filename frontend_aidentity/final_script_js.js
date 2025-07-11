/* (AI)DENTITY - Complete JavaScript Application */

console.log('=== (AI)DENTITY: Starting Application ===');

// PERSONA DATA
const PERSONA_DATA = {
	personas: {
		0: {
			name: "The Balanced Dependency Participant",
			description: "Focus on maintaining human autonomy while embracing AI benefits. Concerned about becoming too reliant on technology.",
			size: 3947,
			percentage: 6.6,
			color: "#7994b5",
			traits: ["Technology-conscious", "Autonomy-focused", "Balanced perspective"]
		},
		1: {
			name: "The Balanced Social Participant", 
			description: "Prioritize human connection and social impact of AI. Believe technology should strengthen, not replace, human relationships.",
			size: 35344,
			percentage: 59.4,
			color: "#93b778",
			traits: ["Community-minded", "Relationship-focused", "Optimistic"]
		},
		2: {
			name: "The Consistent Social Responder",
			description: "Emphasize social and economic implications of AI. Concerned about job displacement and community disruption.", 
			size: 13241,
			percentage: 22.2,
			color: "#d17c3f",
			traits: ["Economically-aware", "Pragmatic", "Future-planning"]
		},
		3: {
			name: "The Balanced Security Participant",
			description: "Prioritize safety, privacy, and security in AI development. Want strong protections and oversight.",
			size: 2023,
			percentage: 3.4,
			color: "#b63e36",
			traits: ["Security-focused", "Privacy-conscious", "Risk-aware"]
		},
		4: {
			name: "The Consistent Cultural Responder",
			description: "Focus on preserving cultural values and identity in an AI-driven world. Emphasize human heritage and tradition.",
			size: 4987,
			percentage: 8.4,
			color: "#be7249",
			traits: ["Value-preserving", "Culture-conscious", "Tradition-minded"]
		}
	}
};

// PERSONA AVATARS
const PERSONA_AVATARS = {
	0: `<svg viewBox="0 0 100 100" class="persona-avatar">
		<circle cx="50" cy="50" r="40" fill="#7994b5" opacity="0.2"/>
		<rect x="35" y="35" width="30" height="30" fill="#7994b5" opacity="0.8"/>
		<circle cx="50" cy="50" r="15" fill="#312c25"/>
		<path d="M40 40 L60 40 L60 45 L55 50 L45 50 L40 45 Z" fill="#f3dbba"/>
	</svg>`,
	1: `<svg viewBox="0 0 100 100" class="persona-avatar">
		<circle cx="50" cy="50" r="40" fill="#93b778" opacity="0.2"/>
		<circle cx="35" cy="35" r="8" fill="#93b778"/>
		<circle cx="65" cy="35" r="8" fill="#93b778"/>
		<circle cx="35" cy="65" r="8" fill="#93b778"/>
		<circle cx="65" cy="65" r="8" fill="#93b778"/>
		<circle cx="50" cy="50" r="12" fill="#312c25"/>
		<path d="M35 35 L50 50 L65 35 M35 65 L50 50 L65 65" stroke="#312c25" stroke-width="2" fill="none"/>
	</svg>`,
	2: `<svg viewBox="0 0 100 100" class="persona-avatar">
		<circle cx="50" cy="50" r="40" fill="#d17c3f" opacity="0.2"/>
		<polygon points="50,20 65,35 65,65 50,80 35,65 35,35" fill="#d17c3f" opacity="0.8"/>
		<circle cx="50" cy="50" r="12" fill="#312c25"/>
		<path d="M40 45 L60 45 M40 55 L60 55" stroke="#f3dbba" stroke-width="2"/>
	</svg>`,
	3: `<svg viewBox="0 0 100 100" class="persona-avatar">
		<circle cx="50" cy="50" r="40" fill="#b63e36" opacity="0.2"/>
		<path d="M50 15 L70 30 L70 70 L50 85 L30 70 L30 30 Z" fill="#b63e36" opacity="0.8"/>
		<circle cx="50" cy="50" r="10" fill="#312c25"/>
		<path d="M45 30 L55 30 L55 40 L45 40 Z M45 60 L55 60 L55 70 L45 70 Z" fill="#f3dbba"/>
	</svg>`,
	4: `<svg viewBox="0 0 100 100" class="persona-avatar">
		<circle cx="50" cy="50" r="40" fill="#be7249" opacity="0.2"/>
		<rect x="25" y="25" width="50" height="50" fill="#be7249" opacity="0.8" rx="5"/>
		<circle cx="50" cy="50" r="8" fill="#312c25"/>
		<path d="M35 35 L65 35 M35 45 L65 45 M35 55 L65 55 M35 65 L65 65" stroke="#f3dbba" stroke-width="1.5"/>
	</svg>`
};

// GLOBAL VARIABLES
let map = null;
let scroller = null;
let quizScores = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0};
let currentQuestion = 0;

// UTILITY FUNCTIONS
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

function isMobile() {
	return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// QUIZ FUNCTIONALITY
function initializeQuiz() {
	const quizButtons = document.querySelectorAll('.quiz-options button');
	
	quizButtons.forEach(button => {
		button.addEventListener('click', function() {
			const persona = parseInt(this.dataset.persona);
			const weight = parseInt(this.dataset.weight);
			quizScores[persona] += weight;
			
			// Add visual feedback
			this.style.background = PERSONA_DATA.personas[persona].color;
			this.style.color = '#fff';
			
			setTimeout(() => {
				nextQuestion();
			}, 800);
		});
	});
}

function nextQuestion() {
	const questions = document.querySelectorAll('.quiz-question');
	const currentQuestionEl = questions[currentQuestion];
	
	currentQuestionEl.classList.remove('active');
	currentQuestion++;
	
	if (currentQuestion < questions.length) {
		questions[currentQuestion].classList.add('active');
	} else {
		showQuizResults();
	}
}

function showQuizResults() {
	const questions = document.querySelectorAll('.quiz-question');
	questions.forEach(q => q.style.display = 'none');
	
	// Find winning persona
	let maxScore = 0;
	let winningPersona = 1;
	
	for (let persona in quizScores) {
		if (quizScores[persona] > maxScore) {
			maxScore = quizScores[persona];
			winningPersona = parseInt(persona);
		}
	}
	
	const resultsEl = document.getElementById('quizResults');
	const resultPersonaEl = document.getElementById('resultPersona');
	
	const persona = PERSONA_DATA.personas[winningPersona];
	
	resultPersonaEl.innerHTML = `
		<div style="border-left-color: ${persona.color}">
			<div class="persona-avatar-container" style="margin: 0 auto 1rem;">
				${PERSONA_AVATARS[winningPersona]}
			</div>
			<h4 style="color: ${persona.color}; margin-bottom: 1rem;">${persona.name}</h4>
			<p style="margin-bottom: 1rem;">${persona.description}</p>
			<div style="display: flex; justify-content: space-around; margin-top: 1rem;">
				<div><strong>${persona.size.toLocaleString()}</strong><br>people like you</div>
				<div><strong>${persona.percentage}%</strong><br>of participants</div>
			</div>
		</div>
	`;
	
	resultsEl.style.display = 'block';
	
	// Highlight this persona on map if available
	highlightPersonaOnMap(winningPersona);
}

function restartQuiz() {
	currentQuestion = 0;
	quizScores = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0};
	
	const questions = document.querySelectorAll('.quiz-question');
	questions.forEach((q, i) => {
		q.style.display = 'block';
		q.classList.remove('active');
		if (i === 0) q.classList.add('active');
	});
	
	// Reset button styles
	const buttons = document.querySelectorAll('.quiz-options button');
	buttons.forEach(btn => {
		btn.style.background = '';
		btn.style.color = '';
	});
	
	document.getElementById('quizResults').style.display = 'none';
}

// PERSONA GRID
function createPersonaGrid() {
	const grid = d3.select('#personaGrid');
	
	Object.entries(PERSONA_DATA.personas).forEach(([id, persona]) => {
		const card = grid.append('div')
			.attr('class', 'persona-card')
			.attr('data-persona', id)
			.style('border-left-color', persona.color);
		
		card.append('div')
			.attr('class', 'persona-avatar-container')
			.html(PERSONA_AVATARS[id]);
		
		card.append('div')
			.attr('class', 'persona-name')
			.text(persona.name);
		
		card.append('div')
			.attr('class', 'persona-size')
			.text(`${persona.size.toLocaleString()} people`);
		
		card.append('div')
			.attr('class', 'persona-percentage')
			.text(`${persona.percentage}% of participants`);
		
		card.append('div')
			.attr('class', 'persona-description')
			.text(persona.description);
		
		// Add traits
		const traitsContainer = card.append('div')
			.style('margin-top', '1rem')
			.style('display', 'flex')
			.style('flex-wrap', 'wrap')
			.style('gap', '0.5rem');
		
		persona.traits.forEach(trait => {
			traitsContainer.append('span')
				.style('background', persona.color)
				.style('color', '#fff')
				.style('padding', '0.25rem 0.5rem')
				.style('border-radius', '12px')
				.style('font-size', '0.8rem')
				.text(trait);
		});
		
		// Add interactivity
		card
			.on('mouseenter', () => highlightPersonaOnMap(id))
			.on('mouseleave', () => resetMapHighlight())
			.on('click', () => focusPersonaOnMap(id));
	});
}

// MAP FUNCTIONALITY
function initializeMap() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2trOXV2MW9zMDExbTJvczFydTkxOTJvMiJ9.7qeHgJkUfxOaWEYtBGNU9w';
	
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/light-v10',
		center: [0, 20],
		zoom: 2,
		interactive: true // NOW INTERACTIVE!
	});
	
	map.on('load', () => {
		console.log('✓ Interactive map initialized');
		setupMapData();
		setupMapInteractions();
	});
}

function setupMapData() {
	// Create realistic global distribution
	const mapData = {
		type: 'FeatureCollection',
		features: [
			// North America - Balanced Social dominant
			{
				type: 'Feature',
				properties: {
					name: 'United States',
					persona: 1,
					color: '#93b778',
					description: 'Balanced Social Participants dominate (45%), with strong Economic concerns (25%)',
					participants: 8500
				},
				geometry: { type: 'Point', coordinates: [-98, 39] }
			},
			{
				type: 'Feature',
				properties: {
					name: 'Canada',
					persona: 0,
					color: '#7994b5',
					description: 'High Dependency awareness (35%), followed by Social focus (40%)',
					participants: 2100
				},
				geometry: { type: 'Point', coordinates: [-106, 56] }
			},
			// Europe - Mixed patterns
			{
				type: 'Feature',
				properties: {
					name: 'Germany',
					persona: 1,
					color: '#93b778',
					description: 'Strong Social focus (50%) with Cultural preservation concerns (20%)',
					participants: 3200
				},
				geometry: { type: 'Point', coordinates: [10, 51] }
			},
			{
				type: 'Feature',
				properties: {
					name: 'France',
					persona: 4,
					color: '#be7249',
					description: 'Cultural preservation is primary concern (40%), Social second (35%)',
					participants: 2800
				},
				geometry: { type: 'Point', coordinates: [2, 47] }
			},
			{
				type: 'Feature',
				properties: {
					name: 'United Kingdom',
					persona: 3,
					color: '#b63e36',
					description: 'Security and privacy concerns lead (45%), Social focus (30%)',
					participants: 2400
				},
				geometry: { type: 'Point', coordinates: [-2, 54] }
			},
			// Asia-Pacific - Economic and Cultural focus
			{
				type: 'Feature',
				properties: {
					name: 'Japan',
					persona: 1,
					color: '#93b778',
					description: 'Social harmony focus (45%) with Cultural preservation (25%)',
					participants: 3500
				},
				geometry: { type: 'Point', coordinates: [138, 36] }
			},
			{
				type: 'Feature',
				properties: {
					name: 'China',
					persona: 2,
					color: '#d17c3f',
					description: 'Economic implications primary (50%), Security concerns (30%)',
					participants: 4200
				},
				geometry: { type: 'Point', coordinates: [104, 36] }
			},
			{
				type: 'Feature',
				properties: {
					name: 'India',
					persona: 2,
					color: '#d17c3f',
					description: 'Economic opportunity focus (55%), Cultural considerations (25%)',
					participants: 3800
				},
				geometry: { type: 'Point', coordinates: [77, 20] }
			},
			{
				type: 'Feature',
				properties: {
					name: 'Australia',
					persona: 1,
					color: '#93b778',
					description: 'Social impact priority (50%), Security awareness (25%)',
					participants: 1900
				},
				geometry: { type: 'Point', coordinates: [134, -26] }
			}
		]
	};
	
	map.addSource('personas', {
		type: 'geojson',
		data: mapData
	});
	
	// Add circles for each region
	map.addLayer({
		id: 'persona-circles',
		type: 'circle',
		source: 'personas',
		paint: {
			'circle-radius': [
				'interpolate',
				['linear'],
				['zoom'],
				1, ['*', ['sqrt', ['get', 'participants']], 0.8],
				8, ['*', ['sqrt', ['get', 'participants']], 2]
			],
			'circle-color': ['get', 'color'],
			'circle-opacity': 0.7,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#fff'
		}
	});
	
	// Add labels
	map.addLayer({
		id: 'persona-labels',
		type: 'symbol',
		source: 'personas',
		layout: {
			'text-field': ['get', 'name'],
			'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
			'text-size': 12,
			'text-offset': [0, 2]
		},
		paint: {
			'text-color': '#312c25',
			'text-halo-color': '#fff',
			'text-halo-width': 2
		}
	});
}

function setupMapInteractions() {
	// Hover effects
	map.on('mouseenter', 'persona-circles', (e) => {
		map.getCanvas().style.cursor = 'pointer';
		
		const feature = e.features[0];
		const tooltip = document.getElementById('tooltip');
		
		tooltip.innerHTML = `
			<strong>${feature.properties.name}</strong><br>
			<span style="color: ${feature.properties.color};">●</span> 
			${PERSONA_DATA.personas[feature.properties.persona].name}<br>
			<em>${feature.properties.description}</em><br>
			<strong>${feature.properties.participants.toLocaleString()}</strong> participants
		`;
		
		tooltip.style.visibility = 'visible';
		tooltip.style.left = e.point.x + 10 + 'px';
		tooltip.style.top = e.point.y - 10 + 'px';
	});
	
	map.on('mouseleave', 'persona-circles', () => {
		map.getCanvas().style.cursor = '';
		document.getElementById('tooltip').style.visibility = 'hidden';
	});
	
	// Click for detailed view
	map.on('click', 'persona-circles', (e) => {
		const feature = e.features[0];
		
		new mapboxgl.Popup({offset: 25})
			.setLngLat(e.lngLat)
			.setHTML(`
				<div style="padding: 1rem; min-width: 200px;">
					<h3 style="margin: 0 0 1rem 0; color: ${feature.properties.color};">
						${feature.properties.name}
					</h3>
					<p style="margin: 0 0 1rem 0; font-weight: bold;">
						Primary AI Persona: ${PERSONA_DATA.personas[feature.properties.persona].name}
					</p>
					<p style="margin: 0 0 1rem 0; font-size: 0.9rem;">
						${feature.properties.description}
					</p>
					<div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #666;">
						<span><strong>${feature.properties.participants.toLocaleString()}</strong> participants</span>
					</div>
				</div>
			`)
			.addTo(map);
	});
}

function highlightPersonaOnMap(personaId) {
	if (!map || !map.isStyleLoaded()) return;
	
	map.setFilter('persona-circles', ['==', ['get', 'persona'], parseInt(personaId)]);
	map.setFilter('persona-labels', ['==', ['get', 'persona'], parseInt(personaId)]);
}

function resetMapHighlight() {
	if (!map || !map.isStyleLoaded()) return;
	
	map.setFilter('persona-circles', null);
	map.setFilter('persona-labels', null);
}

function focusPersonaOnMap(personaId) {
	highlightPersonaOnMap(personaId);
	
	// Update chart title
	const persona = PERSONA_DATA.personas[personaId];
	d3.select('.chart-hed span')
		.style('color', persona.color)
		.text(`Exploring ${persona.name}`);
	
	d3.select('.chart-dek span')
		.text(`${persona.size.toLocaleString()} participants (${persona.percentage}%) worldwide`);
}

// COLOR LEGEND
function createColorLegend() {
	const legend = d3.select('#color-legend');
	
	legend.append('h4').text('AI Personas Worldwide');
	
	const legendItems = legend.append('div').attr('class', 'legend-items');
	
	Object.entries(PERSONA_DATA.personas).forEach(([id, persona]) => {
		const item = legendItems.append('div')
			.attr('class', 'legend-item')
			.on('click', () => focusPersonaOnMap(id))
			.on('mouseenter', () => highlightPersonaOnMap(id))
			.on('mouseleave', () => resetMapHighlight());
		
		item.append('div')
			.attr('class', 'legend-color-dot')
			.style('background-color', persona.color);
		
		item.append('span')
			.attr('class', 'legend-label')
			.text(`${persona.name.split(' ').slice(-2).join(' ')} (${persona.percentage}%)`);
	});
}

// SCROLLYTELLING
function initScrollytelling() {
	scroller = scrollama();
	
	scroller
		.setup({
			step: ".step",
			progress: true,
			offset: 0.5
		})
		.onStepEnter((response) => {
			const step = d3.select(response.element).attr("data-step");
			console.log('Entering step:', step);
			updateForStep(step);
		})
		.onStepProgress((response) => {
			// Smooth scroll effects
			const progress = response.progress;
			const chartTitle = d3.select(".chart-title");
			const offset = -(Math.round(progress * 30));
			chartTitle.style("transform", `translate3d(0,${offset}px,0)`);
		});
	
	// Resize handler
	window.addEventListener("resize", debounce(() => {
		scroller.resize();
		if (map) map.resize();
	}, 150));
}

function updateForStep(step) {
	if (!map || !map.isStyleLoaded()) return;
	
	const hedSpan = d3.select('.chart-hed span');
	const dekSpan = d3.select('.chart-dek span');
	
	switch(step) {
		case 'intro':
			hedSpan.style('color', '#333').text('Discover Your AI Personality');
			dekSpan.text('Take the quiz above to find your persona');
			resetMapHighlight();
			map.easeTo({center: [0, 20], zoom: 2, duration: 2000});
			break;
			
		case 'quiz':
			hedSpan.style('color', '#333').text('Find Your AI Persona');
			dekSpan.text('Answer honestly - there are no wrong answers');
			break;
			
		case 'personas-intro':
			hedSpan.style('color', '#333').text('5 Distinct AI Perspectives');
			dekSpan.text('Each persona represents a unique approach to AI');
			resetMapHighlight();
			map.easeTo({center: [0, 20], zoom: 2, duration: 2000});
			break;
			
		case 'process':
			hedSpan.style('color', '#333').text('Scientific Analysis Process');
			dekSpan.text('Machine learning revealed these natural clusters');
			break;
			
		case 'social-persona':
			const socialPersona = PERSONA_DATA.personas[1];
			hedSpan.style('color', socialPersona.color).text('Balanced Social Participants Lead');
			dekSpan.text('59.4% prioritize human connection in AI development');
			highlightPersonaOnMap(1);
			break;
			
		case 'global-variation':
			hedSpan.style('color', '#333').text('Cultural Patterns Emerge');
			dekSpan.text('Click any region to explore local perspectives');
			resetMapHighlight();
			map.easeTo({center: [0, 20], zoom: 2, duration: 2000});
			break;
			
		case 'economic-concerns':
			const economicPersona = PERSONA_DATA.personas[2];
			hedSpan.style('color', economicPersona.color).text('Economic Impact Focus');
			dekSpan.text('22.2% prioritize jobs and economic implications');
			highlightPersonaOnMap(2);
			break;
			
		case 'security-focus':
			const securityPersona = PERSONA_DATA.personas[3];
			hedSpan.style('color', securityPersona.color).text('Security & Privacy Priority');
			dekSpan.text('3.4% lead discussions on AI safety and surveillance');
			highlightPersonaOnMap(3);
			break;
			
		case 'cultural-preservation':
			const culturalPersona = PERSONA_DATA.personas[4];
			hedSpan.style('color', culturalPersona.color).text('Cultural Values Protection');
			dekSpan.text('8.4% focus on preserving identity and tradition');
			highlightPersonaOnMap(4);
			break;
			
		case 'technology-dependence':
			const dependencyPersona = PERSONA_DATA.personas[0];
			hedSpan.style('color', dependencyPersona.color).text('Human Autonomy Advocacy');
			dekSpan.text('6.6% emphasize maintaining human agency');
			highlightPersonaOnMap(0);
			break;
			
		case 'tell-stories':
			hedSpan.style('color', '#333').text('Stories Behind the Data');
			dekSpan.text('Each persona reflects real human experiences');
			resetMapHighlight();
			break;
			
		case 'exploration':
			hedSpan.style('color', '#333').text('Explore Regional Differences');
			dekSpan.text('Interactive map shows cultural AI patterns');
			resetMapHighlight();
			break;
			
		case 'conclusion':
			hedSpan.style('color', '#333').text('Building Inclusive AI Future');
			dekSpan.text('Understanding diversity creates better technology');
			resetMapHighlight();
			map.easeTo({center: [0, 20], zoom: 2, duration: 2000});
			break;
	}
}

// MAIN INITIALIZATION
function init() {
	console.log('=== Initializing (AI)DENTITY ===');
	
	// Remove loading screen
	setTimeout(() => {
		d3.select('#loadingScreen').style('opacity', '0');
		setTimeout(() => {
			d3.select('#loadingScreen').style('display', 'none');
		}, 500);
	}, 1000);
	
	// Initialize quiz
	initializeQuiz();
	console.log('✓ Quiz initialized');
	
	// Create persona grid
	createPersonaGrid();
	console.log('✓ Persona grid created');
	
	// Initialize interactive map
	initializeMap();
	
	// Create color legend
	createColorLegend();
	console.log('✓ Color legend created');
	
	// Initialize scrollytelling after delay
	setTimeout(() => {
		initScrollytelling();
		console.log('✓ Scrollytelling initialized');
	}, 2000);
	
	console.log('✓ (AI)DENTITY initialization complete');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
