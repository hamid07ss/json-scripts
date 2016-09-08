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
        groups: video_json[0].content.groups,
        scoring: video_json[0].scoring.groups,
        answer: video_json[0].content.items,
        references: video_json[0].references
    };
    var voice_html;
    var download_v;
    if(drag.references.aud){
        var c_folder = $('.select_course').val();
        if (c_folder.length == 1) {
            c_folder = "0" + $('.select_course').val();
        }
        voice_html = '<div style="text-align: center"><audio controls="" class="no-bar huge">' +
            '<source src="/data/C'+c_folder+'/'+(voice_dir)+'/1.mp3" type="audio/mp3" />' +
            '</audio></div>';

        download_v = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&url=' + drag.references.aud.url + '&name=1.mp3&dir='+ voice_dir +'" target="download_mp3">' +
            '<input type="submit" value="download voice" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>';
    }

    var groups = "";
    var insert = "";
    for(var g = 0;g < drag.groups.length;g++){
        groups += '<div class="one_match_groups" style="padding: 5px 10px;display: inline-block"><label>'+ drag.groups[g].txt +'</label>' +
            '<br/>' +
            '<div class="one_match_groups" style="display: inline-block">[['+ (g + 1) +']]</div>' +
            '</div>';
    }
    var match_code = '<div class="match_groups" style="text-align: center;width: 100%;">' +
        groups +
        '<br/>' +
        insert +
        '</div>';

    var answers_html = "";
    var ans_gr = [];
    for(var a = 0;a < drag.scoring.length;a++) {
        var test = [];
        for(var i = 0;i < drag.scoring[a].items.length;i++) {
            test.push(drag.scoring[a].items[i]._id);
        }
        ans_gr.push(test);
    }
    for(var h = 0;h < drag.scoring.length;h++){
        answers_html += '<div class="data-child"><span class="txt">group '+ (h+1) +'</span>';
        for(var a = 0;a < drag.answer.length;a++){
            if(jQuery.inArray(drag.answer[a]._id, ans_gr[h]) !== -1){
                answers_html += '<input value="'+ drag.answer[a].txt +'">';
            }
        }
        answers_html += '</div>';
    }

    var trans = dir_txt + (drag.references.title + drag.references.desc + drag.references.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p>';
    $('.data').remove();
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">$string[\''+trans+'\']=\''+drag.references.title + drag.references.desc + drag.references.standardInstruction+'\'</textarea>' +
        '<br/>'+ download_v + answers_html + '<br/>' + match_code +' <textarea>' + p +voice_html+ match_code + '</textarea><br/></div>');

};
$(window).load(function(){
    $('.submit').click(function(){
        video();
    });
});