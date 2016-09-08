/**
 * Created by h.sarani on 8/23/2016.
 */

var voice_dir;
var dir_txt;
/**
 * Created by h.sarani on 8/23/2016.
 */
var video = function(){
    voice_dir = "C" + $('.select_course').val() + "-U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    var video_json = JSON.parse($('.get_json').val());
    var drag = {
        modelText: video_json[0].content.modelText,
        minWordCount: video_json[0].minWordCount,
        maxWordCount: video_json[0].maxWordCount,
        references: video_json[0].references
    };


    var voice_html = "";
    var download_v = "";
    if(match.references.aud){
        voice_html = '<div class="writing_aud" style="text-align: center">' +
            '<audio controls="" class="no-bar huge">' +
            '<source src="/data/C'+c_folder+'/writing/'+(dir_txt + parseInt(Math.random() * 100000000))+'/1.mp3" type="audio/mp3" />' +
            '</audio></div>';

        download_v = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&url=' + match.references.aud.url + '&name=1.mp3&dir='+(dir_txt + parseInt(Math.random() * 100000000))+'" target="download_mp3">' +
            '<input type="submit" value="download voice" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>';
    }

    var answers_html = '<div class="data-child">' +
        '<span class="txt">max word</span><input value="'+ drag.maxWordCount +'"/>' +
        '<span class="txt">min word</span><input value="'+ drag.minWordCount +'"/>' +
        '</div>';
    var match_code = '<p>'+ drag.references.title + drag.references.desc + drag.references.standardInstruction +'</p>' +
        drag.modelText;

    var trans = dir_txt + (drag.references.title + drag.references.desc + drag.references.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p><br/>';
    $('.data').remove();
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">$string[\''+trans+'\']=\''+drag.references.title + drag.references.desc + drag.references.standardInstruction+'\'</textarea>' +
        '<br/>'+ download_v + '<br/>'+ answers_html + '<br/>' + match_code+' <textarea>' + p + voice_html + match_code + '</textarea><br/></div>');

};
$(window).load(function(){
    $('.submit').click(function(){
        video();
    });
});