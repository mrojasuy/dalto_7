(function() {
	'use strict';

	var config = window.ModoDaltonicoConfig || {};
	var STORAGE_KEY_ACTIVE = 'md_active';
	var STORAGE_KEY_TYPE   = 'md_contrast_type';

	function injectSvgFilters() {
		if (document.getElementById('md-svg-filters')) {
			return;
		}
		var svgNs = 'http://www.w3.org/2000/svg';
		var svg = document.createElementNS(svgNs, 'svg');
		svg.setAttribute('id', 'md-svg-filters');
		svg.setAttribute('aria-hidden', 'true');
		svg.style.position = 'absolute';
		svg.style.width = '0';
		svg.style.height = '0';
		svg.style.overflow = 'hidden';

		var filters = {
			'md-filter-protanopia': [
				0.567, 0.433, 0,     0, 0,
				0.558, 0.442, 0,     0, 0,
				0,     0.242, 0.758, 0, 0,
				0,     0,     0,     1, 0
			],
			'md-filter-deuteranopia': [
				0.625, 0.375, 0,   0, 0,
				0.7,   0.3,   0,   0, 0,
				0,     0.3,   0.7, 0, 0,
				0,     0,     0,   1, 0
			],
			'md-filter-tritanopia': [
				0.95, 0.05,  0,     0, 0,
				0,    0.433, 0.567, 0, 0,
				0,    0.475, 0.525, 0, 0,
				0,    0,     0,     1, 0
			]
		};

		var defs = document.createElementNS(svgNs, 'defs');

		Object.keys(filters).forEach(function(id) {
			var filter = document.createElementNS(svgNs, 'filter');
			filter.setAttribute('id', id);
			filter.setAttribute('color-interpolation-filters', 'linearRGB');

			var matrix = document.createElementNS(svgNs, 'feColorMatrix');
			matrix.setAttribute('type', 'matrix');
			matrix.setAttribute('values', filters[id].join(' '));

			filter.appendChild(matrix);
			defs.appendChild(filter);
		});

		svg.appendChild(defs);
		document.body.appendChild(svg);
	}

	function getStoredActive() {
		try {
			var val = localStorage.getItem(STORAGE_KEY_ACTIVE);
			if (val === null) {
				return null;
			}
			return val === '1';
		} catch (e) {
			return null;
		}
	}

	function setStoredActive(active) {
		try {
			localStorage.setItem(STORAGE_KEY_ACTIVE, active ? '1' : '0');
		} catch (e) {
			// storage unavailable
		}
	}

	function getStoredType() {
		try {
			var val = localStorage.getItem(STORAGE_KEY_TYPE);
			if (val && ['protanopia', 'deuteranopia', 'tritanopia'].indexOf(val) !== -1) {
				return val;
			}
			return null;
		} catch (e) {
			return null;
		}
	}

	function setStoredType(type) {
		try {
			localStorage.setItem(STORAGE_KEY_TYPE, type);
		} catch (e) {
			// storage unavailable
		}
	}

	function removeFilterClasses() {
		var html = document.documentElement;
		html.classList.remove('md-protanopia', 'md-deuteranopia', 'md-tritanopia');
	}

	function applyFilter(type) {
		removeFilterClasses();
		if (type && ['protanopia', 'deuteranopia', 'tritanopia'].indexOf(type) !== -1) {
			document.documentElement.classList.add('md-' + type);
		}
	}

	function updateUI(btn, badge, selectWrapper, active, type) {
		btn.setAttribute('aria-pressed', active ? 'true' : 'false');
		btn.title = active ? (config.activeLabel || 'Active') : (config.inactiveLabel || 'Inactive');

		var toggleContainer = btn.closest('.md-toggle');
		if (toggleContainer) {
			toggleContainer.setAttribute('data-active', active ? 'true' : 'false');
		}

		if (active) {
			badge.classList.add('md-badge--visible');
			badge.textContent = (config.strings && config.strings.indicador_activo)
				? config.strings.indicador_activo
				: 'Mode active';
			applyFilter(type);
		} else {
			badge.classList.remove('md-badge--visible');
			removeFilterClasses();
		}
	}

	function init() {
		injectSvgFilters();

		var storedActive = getStoredActive();
		var isActive = (storedActive !== null) ? storedActive : !!config.initialActive;

		var storedType = getStoredType();
		var currentType = storedType || config.contrastType || 'protanopia';

		if (storedActive === null) {
			setStoredActive(isActive);
		}
		if (!storedType) {
			setStoredType(currentType);
		}

		var container = document.createElement('div');
		container.className = 'md-toggle';
		container.setAttribute('data-active', isActive ? 'true' : 'false');

		var btn = document.createElement('button');
		btn.className = 'md-toggle__btn';
		btn.type = 'button';
		btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
		btn.setAttribute('aria-label', (config.strings && config.strings.activar) ? config.strings.activar : 'Toggle colorblind mode');
		btn.innerHTML = '&#128065;';
		btn.title = isActive ? (config.activeLabel || 'Active') : (config.inactiveLabel || 'Inactive');

		var selectWrapper = document.createElement('div');
		selectWrapper.className = 'md-toggle__select-wrapper';

		var select = document.createElement('select');
		select.className = 'md-toggle__select';
		select.setAttribute('aria-label', 'Contrast type');

		var types = ['protanopia', 'deuteranopia', 'tritanopia'];
		types.forEach(function(t) {
			var opt = document.createElement('option');
			opt.value = t;
			opt.textContent = (config.strings && config.strings[t]) ? config.strings[t] : t;
			if (t === currentType) {
				opt.selected = true;
			}
			select.appendChild(opt);
		});

		selectWrapper.appendChild(select);

		container.appendChild(selectWrapper);
		container.appendChild(btn);

		var badge = document.createElement('div');
		badge.className = 'md-badge';

		document.body.appendChild(container);
		document.body.appendChild(badge);

		updateUI(btn, badge, selectWrapper, isActive, currentType);

		btn.addEventListener('click', function() {
			isActive = !isActive;
			setStoredActive(isActive);
			updateUI(btn, badge, selectWrapper, isActive, currentType);
		});

		select.addEventListener('change', function() {
			currentType = select.value;
			setStoredType(currentType);
			if (isActive) {
				applyFilter(currentType);
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
