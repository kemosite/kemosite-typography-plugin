/*
Plugin Name: kemosite-typography-plugin
Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Github Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Author: Kevin Montgomery
Author URI: https://github.com/kemosite/
Description: This plug-in establishes a reasonable typographic baseorphan_control_element for all devices. Version matches last tested Wordpress.
Requires at least: 5.4
Version: 5.4.1.2
Requires PHP: 7.3
License: GNU General Public License v2 or later
License URI: LICENSE
Text Domain: kemosite-wordpress-theme
*/

var typography_obj = new function() {	
	
	/* [Parameters] */
	this.parameters = {

		// Determine which parameters are actually needed based on calculation functions.

		/* [Foveal vision - In degrees, for 4-5 letters. Usually 1-2 degrees.] */
		foveal_vision_min: 1,
		foveal_vision_avg: "",
		foveal_vision_max: 2,

		/* [Field of view settings - About 30-35 degree fov monitor viewing.] */
		screen_field_of_view_min: 30,
		screen_field_of_view_avg: "",
		screen_field_of_view_max: 35,

		/* [Screen field of view ratio] */
		screen_field_of_view_ratio_min: "",
		screen_field_of_view_ratio_avg: "",
		screen_field_of_view_ratio_max: "",

		/* [Foveal vision values] */
		screen_foveal_vision_pixels_min: "",
		screen_foveal_vision_pixels_avg: "",
		screen_foveal_vision_pixels_max: "",
		reading_foveal_vision_inches_min: 0.277,
		reading_foveal_vision_inches_avg: 0.416,
		reading_foveal_vision_inches_max: 0.555,
		reading_foveal_vision_pixels_min: "",
		reading_foveal_vision_pixels_avg: "",
		reading_foveal_vision_pixels_max: "",
		final_foveal_vision_pixels_min: "",
		final_foveal_vision_pixels_avg: "",
		final_foveal_vision_pixels_max: "",

		/* [Letter diameter pixels] */
		letter_diameter_pixels_min: "",
		letter_diameter_pixels_avg: "",
		letter_diameter_pixels_max: "",

		/* [Font height ratio placeholders] */
		font_height_ratio: "",
		golden_ratio: 1.618

	};

	/* [User Configuration Detection] */
	this.user_configuration = {

		/* [Capture screen resolution, use average for diameter] */
		screen_width: screen.width,
		screen_height: screen.height,
		screen_min: "",
		// screen_min_hypotenuse: "",
		characters_width: "",

		/* [Establish parameters for users font size] */
		font_height_pixels: "",
		ex_height_pixels: ""

	};

	/* [Outputs] */
	this.outputs = {

		/* [Values that will be used in the resulting CSS] */
		font_height_pixels_100: "",
		font_height_pixels_200: "",
		font_height_pixels_300: "",
		font_height_pixels_400: "",
		font_height_pixels_500: "",
		font_height_pixels_600: "",
		font_height_pixels_700: "",
		font_height_pixels_800: "",
		font_height_pixels_900: "",
		font_height_em_100: "",
		font_height_em_200: "",
		font_height_em_300: "",
		font_height_em_400: "",
		font_height_em_500: "",
		font_height_em_600: "",
		font_height_em_700: "",
		font_height_em_800: "",
		font_height_em_900: "",
		font_size_adjust: "",

	};

	/* [Initialize the object] */
	this.init = function() {

		/* [Create element to evaluate users properties] */
		var user_properties_obj = document.createElement("div");
		user_properties_obj.setAttribute("id", "user_properties_obj");
		user_properties_obj.setAttribute("style", "line-height: 100%; padding: 0; margin: 0; width: 1in;");
		// user_properties_obj.innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890&@.,?!’“”()";
		// user_properties_obj.innerHTML = "Typography";
		user_properties_obj.innerHTML = "Typhy";
		document.getElementsByTagName("body")[0].insertBefore(user_properties_obj, document.getElementsByTagName("body")[0].childNodes[0]);

	    /* [Calculate users font size] */
		typography_obj.user_configuration.font_height_pixels = Math.max(user_properties_obj.scrollHeight,user_properties_obj.offsetHeight,user_properties_obj.clientHeight);

	    /* [Calculate users screen resolution] */
		typography_obj.user_configuration.characters_width = Math.max(user_properties_obj.scrollWidth,user_properties_obj.offsetWidth,user_properties_obj.clientWidth);
	    
	    /* [Reduce element font size to calculate 1ex] */
	    user_properties_obj.setAttribute("style", "line-height: 100%; padding: 0; margin: 0; width: 1in; font-size: 1ex;");  
		typography_obj.user_configuration.ex_height_pixels = Math.max(user_properties_obj.scrollHeight, user_properties_obj.offsetHeight, user_properties_obj.clientHeight);

	    /* [Remove testing object] */
	    // console.log(user_properties_obj);
	    document.getElementsByTagName("body")[0].removeChild(user_properties_obj);

	    /* [User configuration calculations] */
		typography_obj.user_configuration.screen_min = Math.min(typography_obj.user_configuration.screen_width, typography_obj.user_configuration.screen_height);
		// typography_obj.user_configuration.screen_min_hypotenuse = Math.round(Math.sqrt(Math.pow(typography_obj.user_configuration.screen_width,2) + Math.pow(typography_obj.user_configuration.screen_height,2)));

	    /* [Parameter calculations] */

	    /**
	     * Don't forget, we need to compare LOWERCASE letters, not the entire font height.
	     **/
	    
	    /* [The x-height ratio of the default font being used] */
	    typography_obj.parameters.font_height_ratio = Math.round((typography_obj.user_configuration.ex_height_pixels / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;

	    /* [Average foveal vision and field of view calculations] */
	    typography_obj.parameters.foveal_vision_avg = Math.round(((typography_obj.parameters.foveal_vision_min + typography_obj.parameters.foveal_vision_max) / 2) * 1000) / 1000;
	    typography_obj.parameters.screen_field_of_view_avg = Math.round(((typography_obj.parameters.screen_field_of_view_min + typography_obj.parameters.screen_field_of_view_max) / 2) * 1000) / 1000;

	    /* [Calculate minimum, average, and maximum ratios of screen foveal vision to field of view] */
	    typography_obj.parameters.screen_field_of_view_ratio_min = Math.round((typography_obj.parameters.foveal_vision_min / typography_obj.parameters.screen_field_of_view_min) * 1000) / 1000;
	    typography_obj.parameters.screen_field_of_view_ratio_avg = Math.round((typography_obj.parameters.foveal_vision_avg / typography_obj.parameters.screen_field_of_view_avg) * 1000) / 1000;
	    typography_obj.parameters.screen_field_of_view_ratio_max = Math.round((typography_obj.parameters.foveal_vision_max / typography_obj.parameters.screen_field_of_view_max) * 1000) / 1000;
	    
	    /* [Foveal diameter in pixels, for 4-5 letters] */
	    typography_obj.parameters.screen_foveal_vision_pixels_min = Math.round(typography_obj.user_configuration.screen_min * typography_obj.parameters.screen_field_of_view_ratio_min);
	    typography_obj.parameters.screen_foveal_vision_pixels_avg = Math.round(typography_obj.user_configuration.screen_min * typography_obj.parameters.screen_field_of_view_ratio_avg);
	    typography_obj.parameters.screen_foveal_vision_pixels_max = Math.round(typography_obj.user_configuration.screen_min * typography_obj.parameters.screen_field_of_view_ratio_max);
	    typography_obj.parameters.reading_foveal_vision_pixels_min = Math.round(typography_obj.parameters.reading_foveal_vision_inches_min * typography_obj.user_configuration.characters_width);
	    typography_obj.parameters.reading_foveal_vision_pixels_avg = Math.round(typography_obj.parameters.reading_foveal_vision_inches_avg * typography_obj.user_configuration.characters_width);
	    typography_obj.parameters.reading_foveal_vision_pixels_max = Math.round(typography_obj.parameters.reading_foveal_vision_inches_max * typography_obj.user_configuration.characters_width);
	    typography_obj.parameters.final_foveal_vision_pixels_min = Math.max(typography_obj.parameters.screen_foveal_vision_pixels_min, typography_obj.parameters.reading_foveal_vision_pixels_min);
	    typography_obj.parameters.final_foveal_vision_pixels_avg = Math.max(typography_obj.parameters.screen_foveal_vision_pixels_avg, typography_obj.parameters.reading_foveal_vision_pixels_avg);
	    typography_obj.parameters.final_foveal_vision_pixels_max = Math.max(typography_obj.parameters.screen_foveal_vision_pixels_max, typography_obj.parameters.reading_foveal_vision_pixels_max);

	    /* [Minimum, average, and maximum diameters of 1 UPPERCASE letter] */
	    typography_obj.parameters.letter_diameter_pixels_min = Math.round((typography_obj.parameters.final_foveal_vision_pixels_min / 4.5) / typography_obj.parameters.font_height_ratio);
	    typography_obj.parameters.letter_diameter_pixels_avg = Math.round((typography_obj.parameters.final_foveal_vision_pixels_avg / 4.5) / typography_obj.parameters.font_height_ratio);
	    typography_obj.parameters.letter_diameter_pixels_max = Math.round((typography_obj.parameters.final_foveal_vision_pixels_max / 4.5) / typography_obj.parameters.font_height_ratio);

	    var letter_diameter_pixels_array = [];
	    var i = 0;
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_min / 4) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_avg / 4) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_max / 4) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_min / 4.5) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_avg / 4.5) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_max / 4.5) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_min / 5) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_avg / 5) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array[i++] = Math.round((typography_obj.parameters.final_foveal_vision_pixels_max / 5) / typography_obj.parameters.font_height_ratio);
	    letter_diameter_pixels_array.sort();

	    /** 
	     * [Outputs calculations] 
	     **/

	    /* [Font height pixels] */
	    typography_obj.outputs.font_height_pixels_100 = Math.max(letter_diameter_pixels_array[0], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_200 = Math.max(typography_obj.outputs.font_height_pixels_100 + 1, letter_diameter_pixels_array[1], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_300 = Math.max(typography_obj.outputs.font_height_pixels_200 + 1, letter_diameter_pixels_array[2], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_400 = Math.max(typography_obj.outputs.font_height_pixels_300 + 1, letter_diameter_pixels_array[3], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_500 = Math.max(typography_obj.outputs.font_height_pixels_400 + 1, letter_diameter_pixels_array[4], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_600 = Math.max(typography_obj.outputs.font_height_pixels_500 + 1, letter_diameter_pixels_array[5], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_700 = Math.max(typography_obj.outputs.font_height_pixels_600 + 1, letter_diameter_pixels_array[6], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_800 = Math.max(typography_obj.outputs.font_height_pixels_700 + 1, letter_diameter_pixels_array[7], typography_obj.user_configuration.font_height_pixels);
	    typography_obj.outputs.font_height_pixels_900 = Math.max(typography_obj.outputs.font_height_pixels_800 + 1, letter_diameter_pixels_array[8], typography_obj.user_configuration.font_height_pixels);

	    /* [Calculate height using em measure.] */
	    typography_obj.outputs.font_height_em_100 = Math.round((typography_obj.outputs.font_height_pixels_100 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_200 = Math.round((typography_obj.outputs.font_height_pixels_200 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_300 = Math.round((typography_obj.outputs.font_height_pixels_300 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_400 = Math.round((typography_obj.outputs.font_height_pixels_400 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_500 = Math.round((typography_obj.outputs.font_height_pixels_500 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_600 = Math.round((typography_obj.outputs.font_height_pixels_600 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_700 = Math.round((typography_obj.outputs.font_height_pixels_700 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_800 = Math.round((typography_obj.outputs.font_height_pixels_800 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_900 = Math.round((typography_obj.outputs.font_height_pixels_900 / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;

	    /* [Font Size Adjust] */
	    typography_obj.outputs.font_size_adjust = typography_obj.parameters.font_height_ratio;

	    /*
	     * Apply style properties to "typography" class
	     * Locate all elements with applicable "typography" class and adjust them.
	     */

		/*
		typography_obj.activate_kemosite_typography();
	    typography_obj.orphans_control();
	    */

	};

	this.activate_kemosite_typography = function() {

		var typography_css = document.createElement('style');
		typography_css.setAttribute("type", "text/css");

		var typography_body_size = "body._100.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_100+"em; "+
		"} " +
		"body._200.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_200+"em; "+
		"} " +
		"body._300.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_300+"em; "+
		"} " +
		"body._400.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_400+"em; "+
		"} " +
		"body._500.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_500+"em; "+
		"} " +
		"body._600.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_600+"em; "+
		"} " +
		"body._700.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_700+"em; "+
		"} " +
		"body._800.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_800+"em; "+
		"} " +
		"body._900.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_900+"em; "+
		"} " +
		"body.activate_kemosite_typography { "+
			"font-size: "+typography_obj.outputs.font_height_em_500+"em; "+
		"} ";

		if (typography_css.styleSheet) {
			typography_css.styleSheet.cssText = typography_body_size; // + typography_copy_margins; // + typography_header_margins;
		} else {
			typography_css.appendChild(document.createTextNode(typography_body_size));
			// typography_css.appendChild(document.createTextNode(typography_copy_margins));
			// typography_css.appendChild(document.createTextNode(typography_header_margins));
		}

		document.getElementsByTagName("head")[0].appendChild(typography_css);

	};

	this.recursive_locate_text = function(node) {
		
		if (node.childNodes && node.childNodes.length > 0 && node.childNodes[0].nodeName !== "#text") {
			return typography_obj.recursive_locate_text(node.childNodes[0]);
		}

		else if (node.childNodes && node.childNodes.length > 0 && node.childNodes[0].nodeName == "#text") {
			// return node.childNodes[0].nodeValue;
			return node;
		} 

		// We've got nuthin'.
		else {
			return node;
		}		

	};

	this.orphans_control = function() {

	    /* [Locate elements for typesetter] */
	    var orphan_control_elements = document.querySelectorAll(
	     	"body.activate_kemosite_typography.orphan_control h1, "+
	     	"body.activate_kemosite_typography.orphan_control h2, "+
	     	"body.activate_kemosite_typography.orphan_control h3, "+
	     	"body.activate_kemosite_typography.orphan_control h4, "+
	     	"body.activate_kemosite_typography.orphan_control h5, "+
	     	"body.activate_kemosite_typography.orphan_control h6, "+
	     	"body.activate_kemosite_typography.orphan_control p," +
	     	"body.activate_kemosite_typography.orphan_control td," +
	     	"body.activate_kemosite_typography.orphan_control figcaption," +
	     	"body.activate_kemosite_typography.orphan_control li"
	     );

	    var punctuation = new Array("!", ".", ",", "?", ":", ";");

	    
	    for (var i = 0; i < orphan_control_elements.length; i++) {

	    	var orphan_control_element = typography_obj.recursive_locate_text(orphan_control_elements[i]);
	    	
	    	if (orphan_control_element.childNodes && orphan_control_element.childNodes.length == 1 && orphan_control_element.childNodes[0].nodeValue !== null && orphan_control_element.childNodes[0].nodeValue.includes(" ")) {

	    		var orphan_control_element_string = orphan_control_element.childNodes[0].nodeValue.toString();

				/* [Apply orphan control] */
		    	var word_array = orphan_control_element_string.split(" ");
		    	
		    	for (var ii = 0; ii < word_array.length - 2; ii++) { // Look at each word for punctuation

		    		var word = word_array[ii];
					var evaluate_punctuation = word.substring(word.length - 1, word.length);

		    		/*
		    		 * If punctuation is found, apply non-breaking spaces to the preceding and following words.
		    		 */
		    		
		    		if (ii > 0 && punctuation.indexOf(evaluate_punctuation) > 0) {
		    			var preceding_words =  new Array(word_array[ii - 1], word);
		    			var preceding_words_join = preceding_words.join("&nbsp;");
		    			word_array.splice(ii - 1, 2, preceding_words_join);
		    			ii--;

		    			var following_words =  new Array(word_array[ii + 1], word_array[ii + 2]);
		    			var following_words_join = following_words.join("&nbsp;");
		    			word_array.splice(ii + 1, 2, following_words_join);

		    		}
		    		
		    	}

		    	var last_words =  word_array.splice(-2);
		    	var last_words_join = last_words.join("&nbsp;");
				word_array.push(last_words_join);

				orphan_control_element_string = word_array.join(" ");
				orphan_control_element.innerHTML = orphan_control_element_string;

				orphan_control_element_string = "";
				word_array = "";

			}

		}
		

	};

};