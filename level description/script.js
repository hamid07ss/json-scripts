/**
 * Created by h.sarani on 8/23/2016.
 */
var html_trn = [];
var voice_dir;
var dir_txt;
var c_folder;
var hamid = function () {
    $('.for_back_trn').html('');
    $('.for_download_voice').html('');

    c_folder = $('.select_course').val();
    if (c_folder.length == 1) {
        c_folder = "0" + $('.select_course').val();
    }
    voice_dir = "U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";
    $('.changes').bind('click', function () {
        changes();
    });

    var Json_html = JSON.parse($('textarea.codes').val());
    var video = "";
    if (Json_html[0].content.grammarVideo.audioUrl) {
        var srt = "";
        for (var f = 0; f < Json_html[0].content.grammarVideo.scripts.length; f++) {
			var st_t = Json_html[0].content.grammarVideo.scripts[f].StartTime;
			var et_t = Json_html[0].content.grammarVideo.scripts[f].EndTime;
			var time1 = {
				st: "00:" + st_t.substr(0, 5) + "," + st_t.substr(6, 3),
				et: "00:" + et_t.substr(0, 5) + "," + et_t.substr(6, 3),
			}
            if (!(/\*\*/.test(Json_html[0].content.grammarVideo.scripts[f].text))) {
                srt += f + "\n" + time1.st + " --> " + time1.et + "\n" +
                    "<trn>" + dir_txt + Json_html[0].content.grammarVideo.scripts[f].text.trim().replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30) + "</trn>\n\n";

                var arr = {
                    txt_for: dir_txt + Json_html[0].content.grammarVideo.scripts[f].text.trim().replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30),
                    txt_trn: Json_html[0].content.grammarVideo.scripts[f].text.trim()
                };
                html_trn.push(arr);
            }
            else {
                srt += f + "\n" + time1.st + " --> " + time1.et + "\n" +
                    Json_html[0].content.grammarVideo.scripts[f].text.replace(/[**]+/g, '\'') + "\n\n";
            }

        }
        video = '<video class="video_level" width="320" height="240" controls="controls" preload="none">' +
            '<source src="/data/C'+c_folder+'/leveldesc/' + voice_dir + '/video.mp4" type="video/mp4"/>' +
            '<source src="/data/C'+c_folder+'/leveldesc/' + voice_dir + '/video.ogv" type="video/ogv"/>' +
            '<track kind="subtitles" src=".srt" srclang="en" />' +
            '<strtrack>' + "\n" + srt + "\n" + '</strtrack>'+
            '<audio class="for_video" src="/data/C'+c_folder+'/leveldesc/'+voice_dir+'/video.mp3"></audio></video>';

        $('.for_download_voice').append('<form method="POST" action="hamid.php?c_f=' + c_folder + '&dir=' + voice_dir + '&url=' + Json_html[0].content.grammarVideo.audioUrl.url + '&name=video.mp3" target="download_mp3">' +
            '<input type="submit" value="download voice for video" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>');
        $('.for_download_voice').append('<form method="POST" action="hamid.php?c_f=' + c_folder + '&dir=' + voice_dir + '&url=' + Json_html[0].content.grammarVideo.videoUrl.url + '/_jcr_content/renditions/s.mp4&name=video.mp4" target="download_mp3">' +
            '<input type="submit" value="download video" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>');
    }
    var final_j = "";
    for (var j = 0; j < Json_html[0].content.presentations.length; j++) {
        if (Json_html[0].content.presentations[j + 1]) {
            final_j += Json_html[0].content.presentations[j].text + "<br>#@#@<br>";
        }
        else {
            final_j += Json_html[0].content.presentations[j].text;
        }
    }

    if (video != "") {
        $('.headline').html(video + "<br>#@#@<br>" + final_j);
    }
    else {
        $('.headline').html(final_j);
    }

    var down_voice = 0;
    $('.headline td').each(function () {
        if (/.mp3/.test($(this).text().trim())) {
            down_voice++;
            var c_folder = $('.select_course').val();
            if (c_folder.length == 1) {
                c_folder = "0" + $('.select_course').val();
            }
            $('.for_download_voice').append('<form method="POST" action="hamid.php?c_f=' + c_folder + '&dir=' + voice_dir + '&url=' + $(this).text().trim() + '&name=' + down_voice + '.mp3" target="download_mp3">' +
                '<input type="submit" value="download voice ' + down_voice + '" onclick="$(this).css(\'background\', \'#52d252\')">' +
                '</form>');
        }

    });

    $('.headline *').removeAttr('style');
    $('.headline *').removeAttr('class');
    $('table').addClass('des_table');

    var voice = 0;
    var bool_row_ok = true;
    show_tds();
    $('.headline table').each(function () {
        $(this).find('tr').each(function () {
            var td = $(this).find('td');
//                 $(this).find('[data-src]').parents('td').addClass('table_des_td_voice').html('');
            for (var i = 0; i < td.length; i++) {
                if (/.mp3/.test($(td[i]).text().trim())) {
                    voice++;
                    $(td[i]).html('<audio controls="" class="no-bar small">'
                        + '<source src="/data/C'+c_folder+'/leveldesc/' + voice_dir + '/' + voice + '.mp3" type="audio/mp3"></audio>');
                }
                else {
                    $(td[i]).text($(td[i]).text().replace(/[**]+/g, '\''));
                }
            }
            if(td.length === 3 && $(td[2]).text().trim() !== ""){
                var txt = $(td[2]).text().toLowerCase();
                var final_txt = '<trn>' + dir_txt + txt.trim().replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30) + '</trn>';
                var arr = {
                    txt_for: dir_txt + txt.trim().replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30),
                    txt_trn: $(td[2]).html().trim()
                };
                html_trn.push(arr);
                $(td[2]).html(final_txt).addClass('table_des_td');
            }
        });
    });
    $('.headline strong').each(function () {
        var str = $(this);
        if ($(str).parents('table').length == 0 && $(str).parents('p').length == 0 && $(str).text().trim() != "") {
            var txt = $(this).text().toLowerCase();
            var final_txt = '<trn>' + dir_txt + txt.trim().replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30) + '</trn>';
            var arr = {
                txt_for: dir_txt + txt.trim().replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30),
                txt_trn: $(this).html().trim()
            };
            html_trn.push(arr);
            $(this).html(final_txt).addClass('table_des_td');
        }
    });

    $('.headline p').each(function () {
        var str = $(this);
        if ($(str).parents('table').length == 0 && $(str).text().trim() != "") {
            var txt = $(this).text().toLowerCase();
//                 var dir_txt = $('.hamid').val().toLowerCase();
            var final_txt = '<trn>' + dir_txt + txt.trim().replace(/[\t\n]+/g, ' ').replace(/[**]+/g, '\'').replace(/ /g, '').substring(0, 30) + '</trn>';
            var arr = {
                txt_for: dir_txt + txt.trim().replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30),
                txt_trn: $(this).html().trim().replace(/[**]+/g, '\'')
            };
            html_trn.push(arr);
            $(this).html(final_txt).addClass('table_des_td');
        }
    });

    $('.new_html').val($('.headline').html());

    var val_trn = '';

    for (var j = 0; j < html_trn.length; j++) {
        val_trn += '$string[\'' + html_trn[j].txt_for.toString().replace(/(['"])/g, "\\$1") + '\']=\'' + html_trn[j].txt_trn.toString().replace(/(['"])/g, "\\$1") + '\';' + "\n";
    }

    $('.for_back_trn').append('<div><textarea class="trn_red" ></textarea></div>');
    $('.trn_red').text(val_trn);

    console.log(html_trn);
    set_vid();
};


var down_all = function () {
    var forms = $('form');
    var downloaded = 0;
    var testtt = setInterval(function () {
        $(forms[downloaded]).find('input').click();
        downloaded++;
        if (downloaded >= forms.length) {
            clearInterval(testtt);
        }
    }, 1000);
};

var create_file = function () {
    var html_codes = $('.new_html').val();
    var final_xml = '<?xml version="1.0" encoding="UTF-8"?>'+
        '<quiz>'+
        '<question type="leveleddescription">'+
        '<name>'+
        '<text>'+ dir_txt + 'leveldescription</text>'+
        '</name>'+
        '<questiontext format="html">'+
        '<text><![CDATA['+ html_codes +']]></text>'+
        '</questiontext>'+
        '<generalfeedback format="html">'+
            '<text></text>'+
            '</generalfeedback>'+
            '<defaultgrade>0.0000000</defaultgrade>'+
            '<penalty>0.0000000</penalty>'+
            '<hidden>0</hidden>'+
            '<shuffleanswers></shuffleanswers>'+
            '<correctfeedback format="unknown">'+
            '<text></text>'+
            '</correctfeedback>'+
            '<partiallycorrectfeedback format="unknown">'+
            '<text></text>'+
            '</partiallycorrectfeedback>'+
            '<incorrectfeedback format="unknown">'+
            '<text></text>'+
            '</incorrectfeedback>'+
            '</question>'+
            '</quiz>';
    download(final_xml, dir_txt + 'leveldescription.xml', "text/plain");
};

var show_tds = function (e) {
    $('.headline td').each(function () {
        $(this).click(function () {
            $(this).toggleClass('td_trn');
        });
    });
};
var changes = function () {
    $('.headline').html($('.new_html').val());
    show_tds();
};
$(window).ready(function () {
    $('.submit').bind('click', function () {
        hamid();
    });

    $('.final').bind('click', function () {
        $('.headline td.td_trn').each(function () {
            var txt = $(this).text().toLowerCase();
            //var dir_txt = $('.hamid').val().toLowerCase();
            var final_txt = '<trn>' + dir_txt + txt.trim().replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30) + '</trn>';
            var arr = {
                txt_for: dir_txt + txt.trim().replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30),
                txt_trn: $(this).html().trim()
            };
            html_trn.push(arr);
            $(this).html(final_txt).addClass('table_des_td');
        });

        $('.new_html').val($('.headline').html());


        var val_trn = '';

        for (var j = 0; j < html_trn.length; j++) {
            val_trn += '$string[\'' + html_trn[j].txt_for.toString().replace(/(['"])/g, "\\$1") + '\']=\'' + html_trn[j].txt_trn.toString().replace(/(['"])/g, "\\$1") + '\';' + "\n";
        }
        $('.trn_red').text(val_trn);
    });
});
var clear_all = function () {
    html_trn = [];
};

var set_audio = function (video_play, audio_play) {
    video_play.addEventListener("pause", function () {
        setTimeout(function () {
            try {
                audio_play.pause();
            } catch (a) {
            }
        }, 50)
    });
    video_play.addEventListener("play", function () {
        setTimeout(function () {
            audio_play.play();
        }, 50)
    });
    video_play.addEventListener("ended", function () {
        audio_play.pause();
        setTimeout(function () {
            audio_play.setCurrentTime(0);
            audio_play.pause();
        }, 50)
    });
    video_play.addEventListener("seeked", function () {
        if (video_play.pluginType && "flash" == video_play.pluginType)
            setTimeout(function () {
                var a = video_play.currentTime;
                try {
                    audio_play.setCurrentTime(a);
                } catch (b) {
                }
                video_play.paused && audio_play.pause();
            }, 50);
        else {
            var a = video_play.currentTime;
            audio_play.setCurrentTime(a);
        }
    });
    video_play.addEventListener("volumechange", function () {
        var a = video_play.volume;
        audio_play.setVolume(a);
        video_play.muted && audio_play.setVolume(0);
    });
    //audio_play.addEventListener("ended", function () {
    //    video_play.played && audio_play.play();
    //});
};
var set_vid = function () {

    var audio_play;
    var video_play;
    $('video.video_level,video audio').mediaelementplayer({
        success: function (YourMediaElement) {
            if(YourMediaElement.tagName == "AUDIO"){
                audio_play = YourMediaElement;
            }
            else{
                video_play = YourMediaElement;
            }
            if (audio_play && video_play) {
                set_audio(video_play, audio_play)
            }
        },
        // start with English automatically turned on
        startLanguage: 'en',
        // if the <video width> is not specified, this is the default
        defaultVideoWidth: 480,
        // if the <video height> is not specified, this is the default
        defaultVideoHeight: 270,
        // if set, overrides <video width>
        videoWidth: -1,
        // if set, overrides <video height>
        videoHeight: -1,
        // width of audio player
        audioWidth: 400,
        // height of audio player
        audioHeight: 30,
        // initial volume when the player starts
        startVolume: 0.8,
        // useful for <audio> player loops
        loop: false,
        // enables Flash and Silverlight to resize to content size
        enableAutosize: true,
        // the order of controls you want on the control bar (and other plugins below)
        features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
        // Hide controls when playing and mouse is not over the video
        alwaysShowControls: false,
        // force iPad's native controls
        iPadUseNativeControls: false,
        // force iPhone's native controls
        iPhoneUseNativeControls: false,
        // force Android's native controls
        AndroidUseNativeControls: false,
        // forces the hour marker (##:00:00)
        alwaysShowHours: false,
        // show framecount in timecode (##:00:00:00)
        showTimecodeFrameCount: false,
        // used when showTimecodeFrameCount is set to true
        framesPerSecond: 25,
        // turns keyboard support on and off for this instance
        enableKeyboard: true,
        // when this player starts, it will pause other players
        pauseOtherPlayers: false,
        // array of keyboard commands
        keyActions: []

    });
};