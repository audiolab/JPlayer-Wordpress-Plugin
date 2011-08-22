
jQuery(document).ready(function($) {
    // $() will work as an alias for jQuery() inside of this function    
    
          
	
});


function load_jplayer (id, playList, file){
    
    if (!id){return false;}
    
    var pl = false;
    
    if (playList){pl=true;}
    
    var jselector='#jquery_jplayer_' + id;
    var jp = jQuery(jselector);
    var jp_interface = jp.next('.jp-audio');
    
    var jpPlayTime = jQuery(".jp-current-time", jp_interface);
    var jpTotalTime = jQuery(".jp-duration", jp_interface);
    
    jp.jPlayer({
            ready: function() {
                if(pl){
                    displayPlayList(jp, jp_interface, playList);
                    playListInit(true,jp,playList); // Parameter is a boolean for autoplay.
                }
                else{
                    jp.jPlayer("setMedia", {mp3: file[0].mp3});
                    jp.jPlayer("play");
		    jp_interface.append("(<span class='download-link'><a href='" + file[0].mp3 + "' tabindex='1'>download</a></span>)");
                }
            },
            oggSupport: false,
            swfPath: WP_jPlayer.jquery_swf_path,
            cssSelectorAncestor: '#jp_interface_' + id, 
	    nativeSuport:false,
            supplied:'mp3'
    })
    .jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
            jpPlayTime.text(jQuery.jPlayer.convertTime(playedTime));
            jpTotalTime.text(jQuery.jPlayer.convertTime(totalTime));
    })
    .jPlayer("onSoundComplete", function() {
            if (pl){playListNext(jp,playList);}
    });
    if (pl){
        jQuery(".jp-previous", jp_interface).click( function() {
            playListPrev(jp,playList);
            jQuery(this).blur();
            return false;
        });

        jQuery(".jp-next", jp_interface).click( function() {
                playListNext(jp,playList);
                jQuery(this).blur();
                return false;
        });        
    }
    
}