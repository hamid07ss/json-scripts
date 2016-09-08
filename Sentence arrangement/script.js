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
        sequences: video_json[0].content.sequences,
        references: video_json[0].references
    };
    var answers_html = "";
    for(var q = 0;q < drag.sequences.length;q++){
        answers_html += '<div class="data-child">' +
            '<span class="txt">'+(q + 1)+'</span><input style="width: 350px" value="'+ $('<div></div>').html(drag.sequences[q].item).text().trim() +'"/>' +
            '</div>';
    }

    var download_v = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&url=' + drag.references.aud.url + '&name=1.mp3&dir='+voice_dir+'" target="download_mp3">' +
        '<input type="submit" value="download voice" onclick="$(this).css(\'background\', \'#52d252\')">' +
        '</form>';

    var audio = '<audio class="no-bar huge pause-others" controls=""><source src="/data/C'+c_folder+'/sentencearrangement/'+voice_dir+'/1.mp3" type="audio/mp3"></audio>';
    var match_code = '<div class="que_container"><div class="aud_container">' + audio + '</div><div class="list_content">{{list}}</div></div>';

    var trans = dir_txt + (drag.references.title + drag.references.desc + drag.references.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn>[[1]]</p><br/>';
    $('.data').remove();
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">$string[\''+trans+'\']=\''+drag.references.title + drag.references.desc + drag.references.standardInstruction+'\'</textarea>' +
        '<br/>'+ download_v +'<br/>'+ answers_html + '<br/>' + match_code+' <textarea>' + p + match_code + '</textarea><br/></div>');

};
$(window).ready(function(){
    $('.submit').click(function(){
        video();
    });
});