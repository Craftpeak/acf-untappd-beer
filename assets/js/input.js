(function($){


	/**
	*  initialize_field
	*
	*  This function will initialize the $field.
	*
	*  @date	30/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/

	function initialize_field( $field ) {
		// Set elements
		var input = jQuery('.beer-picker-input');
		var picker = jQuery('.cp-untappd-beer-picker').select2();

		// API Settings
		var api_settings = {
			api_base: 'https://api.untappd.com/v4',
			client_id: jQuery('.cp-untappd-beer-picker').data('untappd-client-id'),
			client_secret: jQuery('.cp-untappd-beer-picker').data('untappd-client-secret')
		};

		// Function to format the Beer Name
		function format_beer_name(beer_name, brewery_name) {
			return  brewery_name + ' | ' + beer_name;
		}

		// Initialize the select2 field...
		picker.select2({
			ajax: {
				url: api_settings.api_base + '/search/beer/',
				dataType: 'json',
				data: function(params) {
					var query = {
						q: params.term,
						client_id: api_settings.client_id,
						client_secret: api_settings.client_secret,
						limit: 5
					};

					return query;
				},
				processResults: function(data) {
					var beers = data.response.beers.items;

					// If we have beers, clean up our data for the template
					if (beers.length) {
						return {
							results: beers.map(function(beer) {
								return {
									id: beer.beer.bid,
									text: format_beer_name(beer.beer.beer_name, beer.brewery.brewery_name)
								}
							})
						}
					}
				},
				delay: 250
			},
			templateResult: beer_template,
			templateSelection: beer_template,
			placeholder: 'Search for a beer',
			minimumInputLength: 3,
			allowClear: true
		});

		// Provide the beer template
		function beer_template( beer ) {
			// Loading text
			if (beer.loading || !beer.id) {
				return beer.text;
			}

			return beer.text;
		}

		// When the picker is selected...
		picker.on('select2:select', function(event) {
			input.val(event.params.data.id);
		});

		// When the picker is unselected...
		picker.on('select2:unselect', function(event) {
			input.val("");
		});

		// When the picker is first loaded up, load in our beer if we can get it...
		if ( input.val() ) {
			var beer_id = input.val();
			var beer_name = '';

			jQuery.ajax({
        url: api_settings.api_base + '/beer/info/' + beer_id,
				type: 'get',
				data: {
        	client_id: api_settings.client_id,
        	client_secret: api_settings.client_secret
				},
				success: function(data) {
        	// If we got a response back
        	if (data.meta.code && data.meta.code !== 200) {
        		return false;
	        }

	        // Set the beer's name
	        beer_name = format_beer_name(data.response.beer.beer_name, data.response.beer.brewery.brewery_name);

	        if (beer_name) {
        		picker.append(new Option(beer_name, beer_id, true, true));
        		picker.trigger('change');
	        }
				}
			});
		}
	}


	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready & append (ACF5)
		*
		*  These two events are called when a field element is ready for initizliation.
		*  - ready: on page load similar to $(document).ready()
		*  - append: on new DOM elements appended via repeater field or other AJAX calls
		*
		*  @param	n/a
		*  @return	n/a
		*/

		acf.add_action('ready_field/type=untappd_beer', initialize_field);
		acf.add_action('append_field/type=untappd_beer', initialize_field);


	} else {

		/*
		*  acf/setup_fields (ACF4)
		*
		*  These single event is called when a field element is ready for initizliation.
		*
		*  @param	event		an event object. This can be ignored
		*  @param	element		An element which contains the new HTML
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){

			// find all relevant fields
			$(postbox).find('.field[data-field_type="untappd_beer"]').each(function(){

				// initialize
				initialize_field( $(this) );

			});

		});

	}

})(jQuery);
