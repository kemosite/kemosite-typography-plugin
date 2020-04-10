<?php
// die when the file is called directly
if (!defined('WP_UNINSTALL_PLUGIN')): die; endif;

//define an array of options to remove.
$options[] = 'activate_kemosite_typography';
$options[] = 'adaptive_font_size';
$options[] = 'ideal_line_length_spacing';
$options[] = 'orphan_control';
$options[] = 'smart_quotes';

foreach($options as $option): 
    
    //call delete option and use the vairable inside the quotations
    delete_option($option_name);

endforeach;

?>