let $ = require('jquery')

// Setup datatypes
function getDatatypes() {

	var result = {}

	// Instant
	result.instant = { outputTypes: {
		instant: {},
		dateTime: {},
		date: {},
		time: {},
		string: {}
	}};

	// Time
	result.time = { outputTypes: {
		instant: {},
		dateTime: {},
		date: {},
		time: {},
		string: {}
	}};

	// Date
	result.date = { outputTypes: {
		instant: {},
		dateTime: {},
		date: {},
		time: {},
		string: {}
	}};

	// Date Time
	result.dateTime = { outputTypes: {
		instant: {},
		dateTime: {},
		date: {},
		time: {},
		string: {}
	}};

	// Boolean
	result.boolean = { outputTypes: {
		boolean: {},
		string: {},
		integer: {},
		unsignedInt: {}
	}};

	// URI
	result.uri = { outputTypes: {
		uri: {},
		string: {}
	}};

	// OID
	result.oid = { outputTypes: {
		oid: {},
		string: {}
	}};

	// Code
	result.code = { outputTypes: {
		code: {},
		string: {},
		coding: {},
		codeableConcept: {}
	}};
	// ID
	result.id = { outputTypes: {
		id: {},
		string: {}
	}};
	// Markdown
	result.markdown = { outputTypes: {
		markdown: {},
		string: {}
	}};

	// Base 64 Binary
	result.base4Binary = { outputTypes: {
		base4Binary: {},
		string: {}
	}};

	// Integer
	result.integer = { outputTypes: {
		integer: {},
		string: {},
		positiveInt: {},
		unsignedInt: {},
		decimal: {}
	}};

	// Positive Integer
	result.positiveInt = { outputTypes: {
	positiveInt: {},
		integer: {},
		string: {},
		unsignedInt: {},
		decimal: {}
	}};

	// Unsigned Integer
	result.unsignedInt = { outputTypes: {
	unsignedInt: {},
		integer: {},
		string: {},
		positiveInt: {},
		decimal: {}
	}};

	// Decimal
	result.decimal = { outputTypes: {
		decimal: {},
		integer: {},
		string: {},
		positiveInt: {},
		unsignedInt: {}
	}};

	// String
	result.string = { outputTypes: {
		string: {},
		instant: { requiresFormat: true },
		time: { requiresFormat: true },
		date: { requiresFormat: true },
		dateTime: { requiresFormat: true },
		boolean: {},
		uri: {},
		oid: {},
		code: { requiresMappings: true },
		id: {},
		markdown: {},
		base4Binary: {},
		integer: {},
		positiveInt: {},
		unsignedInt: {},
		decimal: {},
		Coding: { requiresMappings: true },
		CodeableConcept: { requiresMappings: true },
	}};

	return result
}
let datatypes = getDatatypes()

function switchPanelView(targetPanel) {

	$('.pane').each(function( index ) {

		if (!$(this).hasClass("sidebar")) {

			if ($(this).hasClass(targetPanel)) {

				$(this).show()
			}
			else  {

				$(this).hide()
			}
		}
	});
}

function updateOutputDatatypeSelect(select) {

}

$( document ).ready(function() {

	// Setup handler for nav item click
	$('.nav-group-item').click(function() {

		// Make the selector active
		$(this).parent().children('.nav-group-item').removeClass("active");
		$(this).addClass('active')

		var targetPanel = $(this).attr('target')
		switchPanelView(targetPanel)
	});

	// Do function for default nav item
	$('.nav-group-item').each(function() {

		if ($(this).hasClass('active')) {

			var targetPanel = $(this).attr('target')
			switchPanelView(targetPanel)
		}
	});

	// Populate variable input datatype drop down
	$('#variable-input-datatype-select').each(function() {

		$(this).append("<option class=\"default\">Select Datatype</option>");
		for(var datatype in datatypes) {

			$(this).append("<option>" + datatype + "</option>");
		}

		// Hide mappings and format
		$('.variable-format-input').hide()
		$('.variable-mappings-input').hide()

		$(this).closest( "select" ).change(function() {

			$(this).find('option.default').remove()
			var selected = $(this).find('option:selected').text()

			$('#variable-output-datatype-select').each(function() {

				$(this).empty()

				var datatype = datatypes[selected]
				if (datatype) {

					for(var datatype in datatype.outputTypes) {

						$(this).append("<option>" + datatype + "</option>");
					}
				}
			});

			var datatype = datatypes[selected]

			// Show/Hide Format
			if (datatype.requiresFormat === true) {

				$('.variable-format-input').show()
			}
			else {

				$('.variable-format-input').hide()
			}

			// Show/Hide Mappings
			if (datatype.requiresMappings === true) {

				$('.variable-mappings-input').show()
			}
			else {

				$('.variable-mappings-input').hide()
			}
		});
	});
	$('#variable-output-datatype-select').each(function() {

		$(this).find('.variable-format-input').hide()
		$(this).find('.variable-format-input').hide()

		$(this).closest( "select" ).change(function() {

			$(this).find('option.default').remove()
			var selected = $(this).find('option:selected').text()


		});
	});
});
