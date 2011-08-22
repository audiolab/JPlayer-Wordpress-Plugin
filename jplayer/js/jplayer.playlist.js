function displayPlayList(jp, inter, playList) {
    jQuery(".jp-playlist ul", inter).empty();
    jp.data('playItem', 0);
    for (i=0; i < playList.length; i++) {
            var listItem = (i == playList.length-1) ? "<li class='jplayer_playlist_item_last'>" : "<li>";
            listItem += "<a href='#' id='jplayer_playlist_item_"+i+"' tabindex='1'>"+ playList[i].name +"</a> (<a id='jplayer_playlist_get_mp3_"+i+"' href='" + playList[i].mp3 + "' tabindex='1'>download</a>)</li>";
            jQuery(".jp-playlist ul", inter).append(listItem);
            jQuery("#jplayer_playlist_item_"+i, inter).data( "index", i ).click( function() {
                    var index = jQuery(this).data("index");
                    if (jp.data('playItem') != index) {
                            playListChange( index, jp, playList);
                    } else {
                            jp.jPlayer("play");
                    }
                    jQuery(this).blur();
                    return false;
            });
            jQuery("#jplayer_playlist_get_mp3_"+i).data( "index", i ).click( function() {
                    var index = jQuery(this).data("index");
                    jQuery("#jplayer_playlist_item_"+index).trigger("click");
                    jQuery(this).blur();
                    return false;
            });
    }
}

function playListInit(autoplay, jp, playList) {
    if(autoplay) {
            playListChange(jp.data('playItem'), jp, playList );
    } else {
            playListConfig( jp.data('playItem'), jp , playList);
    }
}

function playListConfig( index, jp ,playList) {
    jQuery("#jplayer_playlist_item_"+jp.data('playItem')).removeClass("jplayer_playlist_current").parent().removeClass("jplayer_playlist_current");
    jQuery("#jplayer_playlist_item_"+index).addClass("jplayer_playlist_current").parent().addClass("jplayer_playlist_current");
    jp.data('playItem',index);
    jp.jPlayer("setMedia", {mp3: playList[jp.data('playItem')].mp3});
}

function playListChange( index, jp, playList ) {
    playListConfig( index , jp,playList);
    jp.jPlayer("play");
}

function playListNext(jp, playList) {
    var index = (jp.data('playItem') +1 < playList.length) ? jp.data('playItem')+1 : 0;
    playListChange( index, jp ,playList);
}

function playListPrev(jp, playList) {
    var index = (jp.data('playItem')-1 >= 0) ?jp.data('playItem')-1 : playList.length-1;
    playListChange( index , jp,playList);
}