/**
 * Created by h.sarani on 8/23/2016.
 */

var voice_dir;
var dir_txt;
var c_folder;
/**
 * Created by h.sarani on 8/23/2016.
 */
var video = function(){
    voice_dir = "C" + $('.select_course').val() + "-U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    c_folder = $('.select_course').val();
    if (c_folder.length == 1) {
        c_folder = "0" + $('.select_course').val();
    }

    var video_json = JSON.parse($('.get_json').val());
    var drag = {
        txt: video_json[0].content.items[0].txt,
        sequences: video_json[0].content.items[0].txt,
        scoring: video_json[0].scoring.items[0].gaps,
        references: video_json[0].references
    };


    var create_txt = $('<div>').html(drag.txt);
    var question = $(create_txt).find('strike');
    var answers_html = "";
    for(var a = 0;a < question.length;a++){
        $(create_txt).find(question[a]).replaceWith('[['+(a + 1)+']]');
        answers_html += '<div class="data-child"><span class="txt">answer '+ (a + 1) +':</span><input value="'+ drag.scoring[a].txt +'" /></div>';
    }

    var audio = '';
    var download_mp3 = '';
    if(drag.references.aud){
        var download_mp3 = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&url=' + drag.references.aud.url + '&name=1.mp3&dir='+voice_dir+'" target="download_mp3">' +
            '<input type="submit" value="download voice" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>';
        audio = '<audio class="no-bar huge pause-others" controls=""><source src="/data/C'+c_folder+'/TypingGapFill/'+voice_dir+'/1.mp3" type="audio/mp3"></audio>';
    }

    var match_code = '<div class="aud_center">' + audio + '</div>';

    var tits = drag.references.title.split('**');
    var f_tit = '';
    var printed = false;
    for(var t = 0;t < tits.length;t++){
        if(t == tits.length - 1){
            f_tit += tits[t];
        }
        else if(printed){
            f_tit += tits[t] + '</strong>';
            printed = false;
        }
        else {
            f_tit += tits[t] + '<strong>';
            printed = true;
        }

    }

    var trans = dir_txt + (f_tit + drag.references.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p><br/>';
    $('.data').remove();
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">$string[\''+trans+'\']=\''+ f_tit + drag.references.standardInstruction+'\'</textarea>' +
        '<br/>'+ download_mp3 + '<br/>' + answers_html + '<br/>' + match_code+' <textarea>' + p + match_code + '<div class="typsentact_text">' + $(create_txt).html() + '</div></textarea><br/></div>');

};
$(window).ready(function(){
    $('.submit').click(function(){
        video();
    });
});