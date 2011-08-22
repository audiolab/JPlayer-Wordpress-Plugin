<?php


/**
 * @package Soundmap
 */
/*
Plugin Name: JPlayer
Plugin URI: http://www.soinumapa.net
Description: JPlayer for MP3 play.
Version: 1.0.0
Author: Xavier Balderas
Author URI: http://www.xavierbalderas.com  
License: GPLv2 or later
*/


function jplayer_init(){    
    wp_register_script('jquery-jplayer', WP_PLUGIN_URL . '/jplayer/js/jquery.jplayer.min.js', array('jquery'));
    wp_register_script('jplayer-playlist', WP_PLUGIN_URL . '/jplayer/js/jplayer.playlist.js', array('jquery'));
    wp_register_style('jquery-jplayer', WP_PLUGIN_URL . '/jplayer/css/jplayer.blue.monday.css');
    wp_register_script('jplayer', WP_PLUGIN_URL . '/jplayer/js/jplayer.js', array('jquery-jplayer', 'jplayer-playlist'));
}

function jplayer_enqueue_scripts(){
    wp_enqueue_script('jplayer');
    
    $params = array();
    $params['jquery_swf_path'] = WP_PLUGIN_URL . '/jplayer/js';
    
    wp_localize_script('jplayer','WP_jPlayer',$params);
}
function jplayer_print_styles(){
    wp_enqueue_style('jquery-jplayer');
}

add_action('init', 'jplayer_init');
add_action('wp_enqueue_scripts', 'jplayer_enqueue_scripts');
add_action('wp_print_styles', 'jplayer_print_styles');


function jplayer_insert($files, $id, $script = FALSE){
    
    $playList = FALSE;
    
    if (!is_array($files))
        return;
    
    $total_files = count($files);
    
    if (!$total_files)
        return;
    
    if($total_files>1)
        $playList = TRUE;
    
    $out = '';
    $out .='
            <div id="jquery_jplayer_' . $id . '" class="jp-jplayer"></div>
<div class="jp-audio">
  <div class="jp-type-single">
    <div id="jp_interface_' . $id . '" class="jp-interface">
      <ul class="jp-controls">
        <li><a href="#" class="jp-play" tabindex="1">play</a></li>
        <li><a href="#" class="jp-pause" tabindex="1">pause</a></li>
        <li><a href="#" class="jp-stop" tabindex="1">stop</a></li>
        <li><a href="#" class="jp-mute" tabindex="1">mute</a></li>
        <li><a href="#" class="jp-unmute" tabindex="1">unmute</a></li>';
        if ($playList){
        $out .='
        <li><a href="#" class="jp-previous" tabindex="1">previous</a></li>
	<li><a href="#" class="jp-next" tabindex="1">next</a></li>';            
        }
        $out .='
      </ul>
      <div class="jp-progress">
        <div class="jp-seek-bar">
          <div class="jp-play-bar"></div>
        </div>
      </div>
      <div class="jp-volume-bar">
        <div class="jp-volume-bar-value"></div>
      </div>
      <div class="jp-current-time"></div>
      <div class="jp-duration"></div>
    </div>';
    if ($playList){
        $out .='
             <div id="jp_playlist_' . $id . '" class="jp-playlist">
                  <ul>
                    <li>Title of media</li>
                  </ul>
            </div>';
    }
    $out .='
        </div>
    </div>';
    
    
    if ($script)
        $out .= _jplayer_generate_script($files, $playList, $id);
    
    
    return $out;    
}


function _jplayer_generate_script($files, $playlist, $id){
    $out = '';
    
    $out .= '
    <script type="text/javascript">';
    
    if ($playlist){
        $pl = '';
        $pl = 'var playList_' . $id . ' = [';
        foreach($files as $file){
            $pl .= '{mp3:"'. $file['fileURI'] .'", name:"'. $file['name'] . '"},';
        }
        $pl .= '];';
        
        $out .= $pl;
        $out .= '    
        load_jplayer("'. $id .'", playList_'. $id . ');    
    
        </script>    
    ';

    }else{
        $pl = 'var file_' . $id . ' = [';
        $pl .= '{mp3:"'. $files[0]['fileURI'] .'", name:"'. $files[0]['name'] . '"}';
        $pl .= '];';
        $out .= $pl;
        $out .= '    
        load_jplayer("'. $id .'", false , file_' . $id .');     
        </script>    
    ';
        
    }
    
    
    return $out;
}