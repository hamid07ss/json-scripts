/**
 * Created by h.sarani on 8/23/2016.
 */
var voice_dir;
var dir_txt;
var video = function(){
    voice_dir = "C" + ($('.select_course').val().length == 1 ? "0" + $('.select_course').val() : $('.select_course').val()) + "-U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    var video_json = JSON.parse($('.get_json').val());
    var match = {
        scoring: video_json[0].scoring.phrases[0].items,
        phrases: video_json[0].content.phrases[0].items,
        references: video_json[0].references
    };

    var match_code = "";
    var c_folder = $('.select_course').val();
    if (c_folder.length == 1) {
        c_folder = "0" + $('.select_course').val();
    }

    var voice_html = "";
    var download_v = "";
    if(match.references.aud){
        voice_html = '<div class="textselectsingq_aud" style="text-align: center">' +
            '<audio controls="" class="no-bar huge">' +
            '<source src="/data/C'+c_folder+'/textselectsingq/'+(dir_txt + parseInt(Math.random() * 100000000))+'/1.mp3" type="audio/mp3" />' +
            '</audio></div>';

        download_v = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&url=' + match.references.aud.url + '&name=1.mp3&dir='+(dir_txt + parseInt(Math.random() * 100000000))+'" target="download_mp3">' +
            '<input type="submit" value="download voice" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>';
    }


    var codes = "";
    var answers_a = [];
    var answers_s = [];
    var is_ans = false;
    var is_printed = false;
    var ans_num = 0;
    var gr_num = 0;
    var ans_array = [];
    for(var c = 0;c < match.scoring.length;c++){
        ans_array.push(match.scoring[c]._id)
    }
    for(var t = 0;t < match.phrases.length;t++){
        if(match.phrases[t].txt == "("){
            is_ans = true;
        }
        if(!is_ans){
            codes += match.phrases[t].txt + " ";
        }
        if(!is_printed && is_ans){
            is_printed = true;
        }
        if(match.phrases[t].txt == ")"){
            is_ans = false;
            gr_num++;
            answers_s.push(gr_num);
            answers_a.push(answers_s);
            answers_s = [];
            is_printed = false;
        }
        if(is_ans && match.phrases[t].txt != "(" && match.phrases[t].txt != "/"){
            ans_num++;
            answers_s.push(match.phrases[t].txt);
            if(jQuery.inArray(match.phrases[t]._id, ans_array) !== -1){
                is_printed = true;
                codes += "[["+(ans_num)+"]] ";
            }
        }
    }

    for(var a = 0;a < answers_a.length;a++){
        match_code += "answer" + (a + 1) + '<div class="data-child">'
        for(var aa = 0;aa < answers_a[a].length;aa++){
            match_code += '<input value='+answers_a[a][aa]+' />'
        }
        match_code += '</div>'
    }

    $('.data').remove();
    var trans = dir_txt + (match.references.title + match.references.desc + match.references.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p><br/>';
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">$string[\''+trans+'\']=\''+match.references.title + match.references.desc + match.references.standardInstruction+'\'</textarea><br />' +
        match_code + download_v + '<br/><textarea>'+ p + voice_html + '<div class="question_cont">' + codes +'</div></textarea></div>');
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

$(window).load(function(){
    $('.submit').click(function(){
        video();
    });
});