/**
  * [Typography]
  *
  * Description:
  + A JavaScipt object that defines ideal web typography defaults.
  * Version: 5.0
  * By: Kevin Montgomery

  * 
  * What's New?
  + - "Cottage Getaway" version.
  + - Added "small", "medium", and "large" settings for recommended smallest, average, and largest font sizes.
  + - Includes ideal device reading values, based on holding a printed item.
  */

var typography_obj = new function() {	
	
	/* [Parameters] */
	this.parameters = {

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
		screen_min_hypotenuse: "",
		screen_resolution: "",

		/* [Establish parameters for users font size] */
		font_height_pixels: "",
		ex_height_pixels: ""

	};

	/* [Outputs] */
	this.outputs = {

		/* [Values that will be used in the resulting CSS] */
		font_height_pixels_min: "",
		font_height_pixels_avg: "",
		font_height_pixels_max: "",
		font_height_em_min: "",
		font_height_em_avg: "",
		font_height_em_max: "",
		font_size_adjust: "",
		// ex_height_diameter_pixels_min: "",
		// ex_height_diameter_pixels_avg: "",
		// ex_height_diameter_pixels_max: "",
		// line_height_em_min: "",
		// line_height_em_avg: "",
		// line_height_em_max: "",
		// line_space_before_pixels_min: "",
		// line_space_before_pixels_avg: "",
		// line_space_before_pixels_max: "",
		// line_space_before_em_min: "",
		// line_space_before_em_avg: "",
		// line_space_before_em_max: "",
		// line_space_after_pixels_min: "",
		// line_space_after_pixels_avg: "",
		// line_space_after_pixels_max: "",
		// line_space_after_em_min: "",
		// line_space_after_em_avg: "",
		// line_space_after_em_max: "",
		line_length_em_min: "",
		line_length_em_avg: "",
		line_length_em_max: ""
		// line_length_pixels_min: "",
		// line_length_pixels_avg: "",
		// line_length_pixels_max: ""

	};

	/* [Initialize the object] */
	this.init = function() {

		/* [Create element to evaluate users properties] */
		var user_properties_obj = document.createElement("div");
			user_properties_obj.setAttribute("id", "user_properties_obj");
			user_properties_obj.setAttribute("style", "line-height: 100%, padding: 0, margin: 0; width: 1in;");
			user_properties_obj.innerHTML = "Typography";
			document.getElementsByTagName("body")[0].insertBefore(user_properties_obj, document.getElementsByTagName("body")[0].childNodes[0]);

	    /* [Calculate users font size] */
		typography_obj.user_configuration.font_height_pixels = Math.max(user_properties_obj.scrollHeight,user_properties_obj.offsetHeight,user_properties_obj.clientHeight);

	    /* [Calculate users screen resolution] */
		typography_obj.user_configuration.screen_resolution = Math.max(user_properties_obj.scrollWidth,user_properties_obj.offsetWidth,user_properties_obj.clientWidth);
	    
	    /* [Reduce element font size to calculate 1ex] */
	    user_properties_obj.setAttribute("style", "line-height: 100%, padding: 0, margin: 0; width: 1in; font-size: 1ex;");  
		typography_obj.user_configuration.ex_height_pixels = Math.max(user_properties_obj.scrollHeight, user_properties_obj.offsetHeight, user_properties_obj.clientHeight);

	    /* [Remove testing object] */
	    document.getElementsByTagName("body")[0].removeChild(user_properties_obj);

	    /* [User configuration calculations] */
		typography_obj.user_configuration.screen_min = Math.min(typography_obj.user_configuration.screen_width, typography_obj.user_configuration.screen_height);
		typography_obj.user_configuration.screen_min_hypotenuse = Math.round(Math.sqrt(Math.pow(typography_obj.user_configuration.screen_min,2) + Math.pow(typography_obj.user_configuration.screen_min,2)));

	    /* [Parameter calculations] */

	    /**
	     * Don't forget, we need to compare LOWERCASE letters, not the entire font height.
	     **/
	    
	    /* [The x-height ratio of the default font being used] */
	    typography_obj.parameters.font_height_ratio = Math.round((typography_obj.user_configuration.ex_height_pixels / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;

	    /* [Average foveal vision and field of view calculations] */
	    typography_obj.parameters.foveal_vision_avg = Math.round(((typography_obj.parameters.foveal_vision_min + typography_obj.parameters.foveal_vision_max) / 2) * 1000) / 1000;
	    typography_obj.parameters.screen_field_of_view_avg = Math.round(((typography_obj.parameters.screen_field_of_view_min + typography_obj.parameters.screen_field_of_view_max) / 2) * 1000) / 1000;

	    // typography_obj.parameters.field_of_view_ratio = typography_obj.parameters.foveal_vision / typography_obj.parameters.field_of_view; // Calculate ratio of foveal vision to field of view

	    /* [Calculate minimum, average, and maximum ratios of screen foveal vision to field of view] */
	    typography_obj.parameters.screen_field_of_view_ratio_min = Math.round((typography_obj.parameters.foveal_vision_min / typography_obj.parameters.screen_field_of_view_min) * 1000) / 1000;
	    typography_obj.parameters.screen_field_of_view_ratio_avg = Math.round((typography_obj.parameters.foveal_vision_avg / typography_obj.parameters.screen_field_of_view_avg) * 1000) / 1000;
	    typography_obj.parameters.screen_field_of_view_ratio_max = Math.round((typography_obj.parameters.foveal_vision_max / typography_obj.parameters.screen_field_of_view_max) * 1000) / 1000;
	    
	    /* [Foveal diameter in pixels, for 4-5 letters] */
	    typography_obj.parameters.screen_foveal_vision_pixels_min = Math.round(typography_obj.user_configuration.screen_min_hypotenuse * typography_obj.parameters.screen_field_of_view_ratio_min);
	    typography_obj.parameters.screen_foveal_vision_pixels_avg = Math.round(typography_obj.user_configuration.screen_min_hypotenuse * typography_obj.parameters.screen_field_of_view_ratio_avg);
	    typography_obj.parameters.screen_foveal_vision_pixels_max = Math.round(typography_obj.user_configuration.screen_min_hypotenuse * typography_obj.parameters.screen_field_of_view_ratio_max);
	    typography_obj.parameters.reading_foveal_vision_pixels_min = Math.round(typography_obj.parameters.reading_foveal_vision_inches_min * typography_obj.user_configuration.screen_resolution);
	    typography_obj.parameters.reading_foveal_vision_pixels_avg = Math.round(typography_obj.parameters.reading_foveal_vision_inches_avg * typography_obj.user_configuration.screen_resolution);
	    typography_obj.parameters.reading_foveal_vision_pixels_max = Math.round(typography_obj.parameters.reading_foveal_vision_inches_max * typography_obj.user_configuration.screen_resolution);
	    typography_obj.parameters.final_foveal_vision_pixels_min = Math.max(typography_obj.parameters.screen_foveal_vision_pixels_min, typography_obj.parameters.reading_foveal_vision_pixels_min);
	    typography_obj.parameters.final_foveal_vision_pixels_avg = Math.max(typography_obj.parameters.screen_foveal_vision_pixels_avg, typography_obj.parameters.reading_foveal_vision_pixels_avg);
	    typography_obj.parameters.final_foveal_vision_pixels_max = Math.max(typography_obj.parameters.screen_foveal_vision_pixels_max, typography_obj.parameters.reading_foveal_vision_pixels_max);
		// typography_obj.parameters.screen_foveal_vision_pixels_max = Math.round(typography_obj.parameters.foveal_vision_max_inches * typography_obj.user_configuration.screen_resolution); // Minimum foveal diameter in pixels, for 4-5 letters

	    /* [Minimum, average, and maximum diameters of 1 UPPERCASE letter] */
	    typography_obj.parameters.letter_diameter_pixels_min = Math.round((typography_obj.parameters.final_foveal_vision_pixels_min / 4.5) / typography_obj.parameters.font_height_ratio);
	    typography_obj.parameters.letter_diameter_pixels_avg = Math.round((typography_obj.parameters.final_foveal_vision_pixels_avg / 4.5) / typography_obj.parameters.font_height_ratio);
	    typography_obj.parameters.letter_diameter_pixels_max = Math.round((typography_obj.parameters.final_foveal_vision_pixels_max / 4.5) / typography_obj.parameters.font_height_ratio);

	    // typography_obj.parameters.letter_diameter_pixels = Math.round((typography_obj.parameters.foveal_vision_pixels / 4.5) / typography_obj.parameters.font_height_ratio); // Diameter of approximately 1 uppercase letter
	    // typography_obj.parameters.letter_diameter_pixels_min = Math.round((typography_obj.parameters.screen_foveal_vision_pixels_max / 4.5) / typography_obj.parameters.font_height_ratio); // Minimum diameter of approximately 1 uppercase letter

	    /** 
	     * [Outputs calculations] 
	     **/

	    /* [Font height pixels] */
	    typography_obj.outputs.font_height_pixels_min = Math.min(typography_obj.parameters.letter_diameter_pixels_min, typography_obj.user_configuration.font_height_pixels); // The smaller of the users setting, or the minimum setting.
	    typography_obj.outputs.font_height_pixels_avg = Math.max(typography_obj.parameters.letter_diameter_pixels_avg, typography_obj.user_configuration.font_height_pixels); // The larger of the users setting, or the average setting.
	    typography_obj.outputs.font_height_pixels_max = Math.max(typography_obj.parameters.letter_diameter_pixels_max, typography_obj.user_configuration.font_height_pixels); // The larger of the users setting, or the maximum setting.

	    /* [Calculate height using em measure.] */
	    typography_obj.outputs.font_height_em_min = Math.round((typography_obj.outputs.font_height_pixels_min / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_avg = Math.round((typography_obj.outputs.font_height_pixels_avg / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;
	    typography_obj.outputs.font_height_em_max = Math.round((typography_obj.outputs.font_height_pixels_max / typography_obj.user_configuration.font_height_pixels) * 1000) / 1000;

	    /* [Calculate x-height pixels of default font] */
	    // typography_obj.outputs.ex_height_diameter_pixels_min = Math.round(typography_obj.outputs.font_height_pixels_min * typography_obj.parameters.font_height_ratio);
	    // typography_obj.outputs.ex_height_diameter_pixels_avg = Math.round(typography_obj.outputs.font_height_pixels_avg * typography_obj.parameters.font_height_ratio);
	    // typography_obj.outputs.ex_height_diameter_pixels_max = Math.round(typography_obj.outputs.font_height_pixels_max * typography_obj.parameters.font_height_ratio);
	    
	    /*
	    typography_obj.outputs.line_height_pixels_min = Math.round(typography_obj.outputs.font_height_pixels_min + typography_obj.outputs.ex_height_diameter_pixels_min);
	    typography_obj.outputs.line_height_pixels_avg = Math.round(typography_obj.outputs.font_height_pixels_avg + typography_obj.outputs.ex_height_diameter_pixels_avg);
	    typography_obj.outputs.line_height_pixels_max = Math.round(typography_obj.outputs.font_height_pixels_max + typography_obj.outputs.ex_height_diameter_pixels_max);
		*/

		/*
		typography_obj.outputs.line_height_em_min = Math.round((typography_obj.outputs.line_height_pixels_min / typography_obj.outputs.font_height_pixels_min) * 1000) / 1000;
		typography_obj.outputs.line_height_em_avg = Math.round((typography_obj.outputs.line_height_pixels_avg / typography_obj.outputs.font_height_pixels_avg) * 1000) / 1000;
		typography_obj.outputs.line_height_em_max = Math.round((typography_obj.outputs.line_height_pixels_max / typography_obj.outputs.font_height_pixels_max) * 1000) / 1000;
	    */

	    /*
	    typography_obj.outputs.line_space_before_pixels_min =  typography_obj.outputs.ex_height_diameter_pixels_min;
	    typography_obj.outputs.line_space_before_pixels_avg =  typography_obj.outputs.ex_height_diameter_pixels_avg;
	    typography_obj.outputs.line_space_before_pixels_max =  typography_obj.outputs.ex_height_diameter_pixels_max;
		*/

	    /*
	    typography_obj.outputs.line_space_before_em_min = Math.round((typography_obj.outputs.line_space_before_pixels_min / typography_obj.outputs.font_height_pixels_min) * 1000) / 1000;
	    typography_obj.outputs.line_space_before_em_avg = Math.round((typography_obj.outputs.line_space_before_pixels_avg / typography_obj.outputs.font_height_pixels_avg) * 1000) / 1000;
	    typography_obj.outputs.line_space_before_em_max = Math.round((typography_obj.outputs.line_space_before_pixels_max / typography_obj.outputs.font_height_pixels_max) * 1000) / 1000;
		*/

	    /*
	    typography_obj.outputs.line_space_after_pixels_min =  typography_obj.outputs.ex_height_diameter_pixels_min;
	    typography_obj.outputs.line_space_after_pixels_avg =  typography_obj.outputs.ex_height_diameter_pixels_avg;
	    typography_obj.outputs.line_space_after_pixels_max =  typography_obj.outputs.ex_height_diameter_pixels_max;
		*/

	    /*
	    typography_obj.outputs.line_space_after_em_min = Math.round((typography_obj.outputs.line_space_after_pixels_min / typography_obj.outputs.font_height_pixels_min) * 1000) / 1000;
	    typography_obj.outputs.line_space_after_em_avg = Math.round((typography_obj.outputs.line_space_after_pixels_avg / typography_obj.outputs.font_height_pixels_avg) * 1000) / 1000;
	    typography_obj.outputs.line_space_after_em_max = Math.round((typography_obj.outputs.line_space_after_pixels_max / typography_obj.outputs.font_height_pixels_max) * 1000) / 1000;
		*/

	    /* [Calculate ideal line length, compare the 'alphabet-and-a-half rule' to the 'points-times-two' rule] */
	    /*
	    typography_obj.outputs.line_length_em_min = Math.max(39, typography_obj.outputs.font_height_pixels_min * 2);
	    typography_obj.outputs.line_length_em_avg = Math.max(39, typography_obj.outputs.font_height_pixels_avg * 2);
	    typography_obj.outputs.line_length_em_max = Math.max(39, typography_obj.outputs.font_height_pixels_max * 2);
	    */

	    /* [Font Size Adjust] */
	    typography_obj.outputs.font_size_adjust = typography_obj.parameters.font_height_ratio;

	    /*
	     * Apply style properties to "typography" class
	     * Locate all elements with applicable "typography" class and adjust them.
	     */

	    typography_obj.quotes_control();
	    typography_obj.orphans_control();
		typography_obj.lines_control();

	};

	this.lines_control = function() {

		var typography_css = document.createElement('style');
		typography_css.setAttribute("type", "text/css");

		var typography_body_size = "body.small.typography { "+
		"font-size: "+typography_obj.outputs.font_height_em_min+"em; "+
		"} " +
		"body.large.typography { "+
		"font-size: "+typography_obj.outputs.font_height_em_max+"em; "+
		"} " +
		"body.average.typography { "+
		"font-size: "+typography_obj.outputs.font_height_em_max+"em; "+
		"} " +
		"body.typography { "+
		"font-size: "+typography_obj.outputs.font_height_em_avg+"em; "+
		"} ";

		/*
		var typography_copy_margins = "html .small.typography.lines, "+
	     	"body.small.typography.lines blockquote, " +
	     	"body.small.typography.lines p, " +
	     	"body.small.typography.lines td, " +
	     	"body.small.typography.lines th, " +
	     	"body.small.typography.lines li " +
		"{ "+
		"max-width: "+typography_obj.outputs.line_length_em_min+"rem; "+
		"} " + 
		"html .large.typography.lines, "+
	     	"body.large.typography.lines blockquote, " +
	     	"body.large.typography.lines p, " +
	     	"body.large.typography.lines td, " +
	     	"body.large.typography.lines th, " +
	     	"body.large.typography.lines li " +
		"{ "+
		"max-width: "+typography_obj.outputs.line_length_em_max+"rem; "+
		"} " + 
		"html .typography.lines, "+
	     	"body.typography.lines blockquote, " +
	     	"body.typography.lines p, " +
	     	"body.typography.lines td, " +
	     	"body.typography.lines th, " +
	     	"body.typography.lines li " +
		"{ "+
		"line-height: 3ex; "+
		"max-width: "+typography_obj.outputs.line_length_em_avg+"em; "+
		// "min-width: 45ex; "+
		// "max-width: 75ex; "+
		"margin-top: 1ex; "+
		"margin-bottom: 1ex; "+
		// "margin-left: auto; "+
		// "margin-right: auto; "+
		"} ";

		var typography_header_margins = "body.small.typography.lines h1, "+
	     	"body.small.typography.lines h2, "+
	     	"body.small.typography.lines h3, "+
	     	"body.small.typography.lines h4, "+
	     	"body.small.typography.lines h5, "+
	     	"body.small.typography.lines h6, "+
		"{ "+
		"max-width: "+typography_obj.outputs.line_length_em_min+"rem; "+
		"margin: 1ex auto .25ex; "+
		"} " + 
		"body.large.typography.lines h1, "+
	     	"body.large.typography.lines h2, "+
	     	"body.large.typography.lines h3, "+
	     	"body.large.typography.lines h4, "+
	     	"body.large.typography.lines h5, "+
	     	"body.large.typography.lines h6, "+
		"{ "+
		"max-width: "+typography_obj.outputs.line_length_em_max+"rem; "+
		"margin: 1ex auto .25ex; "+
		"} " + 
		"body.average.typography.lines h1, "+
	     	"body.average.typography.lines h2, "+
	     	"body.average.typography.lines h3, "+
	     	"body.average.typography.lines h4, "+
	     	"body.average.typography.lines h5, "+
	     	"body.average.typography.lines h6, "+
		"{ "+
		"max-width: "+typography_obj.outputs.line_length_em_avg+"rem; "+
		"margin: 1ex auto .25ex; "+
		"} " + 
		"body.typography.lines h1, "+
	     	"body.typography.lines h2, "+
	     	"body.typography.lines h3, "+
	     	"body.typography.lines h4, "+
	     	"body.typography.lines h5, "+
	     	"body.typography.lines h6, "+
	     	"body.typography.lines ol, "+
	     	"body.typography.lines ul "+
		"{ "+
		"max-width: "+typography_obj.outputs.line_length_em_avg+"rem; "+
		"margin: 1ex auto .25ex; "+
		"} ";
		*/

		if (typography_css.styleSheet) {
			typography_css.styleSheet.cssText = typography_body_size; // + typography_copy_margins + typography_header_margins;
		} else {
			typography_css.appendChild(document.createTextNode(typography_body_size));
			// typography_css.appendChild(document.createTextNode(typography_copy_margins));
			// typography_css.appendChild(document.createTextNode(typography_header_margins));
		}

		document.getElementsByTagName("head")[0].appendChild(typography_css);

	};

	this.recursive_locate_text = function(node) {

		// console.log("Examine Node");
		// console.log(node);
		
		//If not text node but childNodes is populated, and a text type is found, use it
		if (node.childNodes && node.childNodes.length > 0 && node.childNodes[0].nodeName == "#text") {
			// console.log("Text Node Identified");
			// console.log(node.childNodes[0]);
			return node;
		} 

		// If no text type found, but more childNodes found, explore further
		else if (node.childNodes && node.childNodes.length > 0) {
			// console.log("No text nodes yet, but more to explore...");
			return typography_obj.recursive_locate_text(node.childNodes[0]);
		}

		// We've got nuthin'.
		else {
			return node;
		}
		

	};

	this.orphans_control = function() {

	    /* [Locate elements for typesetter] */
	    var typesetter_elements = document.querySelectorAll(
	     	"body.typography.orphans h1, "+
	     	"body.typography.orphans h2, "+
	     	"body.typography.orphans h3, "+
	     	"body.typography.orphans h4, "+
	     	"body.typography.orphans h5, "+
	     	"body.typography.orphans h6, "+
	     	"body.typography.orphans p," +
	     	"body.typography.orphans td," +
	     	"body.typography.orphans li"
	     );

	    var punctuation = new Array("!", ".", ",", "?", ":", ";");

	    for (var i = 0; i < typesetter_elements.length; i++) {

	    	var line = typography_obj.recursive_locate_text(typesetter_elements[i]);
	    	
	    	if (line.innerHTML !== null) {

	    		var line_string = line.innerHTML.toString();

				/* [Apply orphan control] */
		    	var word_array = line_string.split(" ");
		    	var word_count = word_array.length;
		    	
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

				line_string = word_array.join(" ");
				line.innerHTML = line_string;
								
			}

		}

	};

	this.quotes_control = function() {

	    /* [Locate elements for typesetter] */
	    var typesetter_elements = document.querySelectorAll("html .typography.quotes, "+
	     	"body.typography.quotes h1, "+
	     	"body.typography.quotes h2, "+
	     	"body.typography.quotes h3, "+
	     	"body.typography.quotes h4, "+
	     	"body.typography.quotes h5, "+
	     	"body.typography.quotes h6, "+
	     	"body.typography.quotes p," +
	     	"body.typography.quotes td," +
	     	"body.typography.quotes li");

	    var punctuation = new Array("!", ".", ",", "?", ":", ";"); // Need to scan for quotes placed before punctuation

	    for (var i = 0; i < typesetter_elements.length; i++) {

			/* [Apply orphan control] */
	    	var line = typography_obj.recursive_locate_text(typesetter_elements[i]);
	    	
	    	if (line.innerHTML !== null) {

	    		var line_string = line.innerHTML.toString();
		    	var word_array = line_string.split(" ");
		    	var word_count = word_array.length;
		    	var open_double_quote = false;
	    		var open_single_quote = false;

		    	for (var ii = 0; ii < word_array.length; ii++) { // Look at each word for punctuation
		    		
		    		var word = word_array[ii];

		    		var has_punctuation = "";
		    		var evaluate_punctuation = word.substring(word.length - 1, word.length);
		    		var evaluate_open_quotes = word.substring(0,1);

					// The process of evaluating opening and closing quotes needs to be re-evaluated.

					/* [If punctuation is found] */
		    		if (ii > 0 && punctuation.indexOf(evaluate_punctuation) > 0) {
		    			var evaluate_close_quotes = word.substring(word.length - 2, word.length - 1);
		    			has_punctuation = evaluate_punctuation;
		    		} else {
		    			var evaluate_close_quotes = word.substring(word.length - 1, word.length);
		    		}
		    		
					/* [Double Quotes] */
					if (evaluate_open_quotes == '"') { 
		    			open_double_quote = true;
		    			word = "&ldquo;" + word.substring(1, word.length);
		    			word_array[ii] = word;
		    		}

					if (evaluate_close_quotes == '"' && open_double_quote == true) {
						if (has_punctuation.length > 0) {
							word = word.substring(0, word.length - 2) + "&rdquo;" + has_punctuation;
						} else {
							word = word.substring(0, word.length - 1) + "&rdquo;";
						}
						word_array[ii] = word;
						open_double_quote = false;
					}

					/* [Single Quotes] */
					if (evaluate_open_quotes == "'") { 
		    			open_single_quote = true;
		    			word = "&lsquo;" + word.substring(1, word.length);
		    			word_array[ii] = word;
		    		}
					
					if (evaluate_close_quotes == "'" && open_single_quote == true) {
						if (has_punctuation.length > 0) {
							word = word.substring(0, word.length - 2) + "&rsquo;" + has_punctuation;
						} else {
							word = word.substring(0, word.length - 1) + "&rsquo;";
						}
						word_array[ii] = word;
						open_single_quote = false;
					}

					/* [Apostrophes] */
					var evaluate_apostrophes = word.substring(1, word.length - 1);
					if (evaluate_apostrophes.indexOf("'")) {
						word = word.replace("'","&rsquo;");
						word_array[ii] = word;
					}

	    		}

				line_string = word_array.join(" ");
				line.innerHTML = line_string;
				
			}

		}

	};

};