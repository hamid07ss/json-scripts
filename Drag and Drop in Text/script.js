/**
 * Created by h.sarani on 8/23/2016.
 */

var voice_dir;
var dir_txt;
var drag = function(){
    voice_dir = "C" + $('.select_course').val() + "-U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    var video_json = JSON.parse($('.get_json').val());
    var drag = {
        txt: video_json[0].content.items[0].txt,
        answer: video_json[0].scoring.items[0].gaps,
        des: video_json[0].references
    };
    var create_txt = $('<div>').html(drag.txt);
    var answers = $(create_txt).find('strike');
    var answers_html = "";
    for(var a = 0;a < answers.length;a++){
        $(create_txt).find(answers[a]).replaceWith('[['+(a + 1)+']]');
        answers_html += '<div class="data-child"><span class="txt">answer '+ (a + 1) +':</span><input value="'+ drag.answer[a].txt +'" /></div>';
    }

    var voice_html = "";
    var download_v = "";
    if(drag.des.aud){
        var c_folder = $('.select_course').val();
        if (c_folder.length == 1) {
            c_folder = "0" + $('.select_course').val();
        }
        voice_html = '<div style="text-align: center"><audio controls="" class="no-bar huge">' +
            '<source src="/data/C'+c_folder+'/'+(dir_txt + parseInt(Math.random() * 100000000))+'.mp3" type="audio/mp3" />' +
            '</audio></div>';

        download_v = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&url=' + drag.des.aud.url + '&name='+(dir_txt + parseInt(Math.random() * 100000000))+'.mp3" target="download_mp3">' +
            '<input type="submit" value="download voice" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>';
    }
    $('.data').remove();
    var trans = dir_txt + (drag.des.title + drag.des.desc + drag.des.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p>';
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">$string[\''+trans+'\']=\''+drag.des.title + drag.des.desc + drag.des.standardInstruction+'\'</textarea>' +
        '<br/>'+download_v + answers_html + '<br/><textarea>'+ p + voice_html + $(create_txt).html() + '</textarea></div>');
};
$(window).load(function(){
    $('.submit').click(function(){
        drag();
    });
});