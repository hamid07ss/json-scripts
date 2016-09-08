/**
 * Created by h.sarani on 8/23/2016.
 */
var voice_dir;
var dir_txt;
var data = {
    htmlpap: '',
    question_style: 0,
    question_type: 'matchtxttotxt',
    question_no: 0
};
var video = function(){
    voice_dir = "U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    var video_json = JSON.parse($('.get_json').val());
    var match = {
        sources: video_json[0].content.sources,
        targets: video_json[0].content.targets,
        references: video_json[0].references,
        filterOptions: video_json[0].filterOptions
    };
    if(match.references.htmlPap){
        data.htmlpap = match.references.htmlPap.content;
    }
    if(match.filterOptions.questionNo){
        data.question_no = match.filterOptions.questionNo;
    }
    var match_code = "";
    var c_folder = $('.select_course').val();
    if (c_folder.length == 1) {
        c_folder = "0" + $('.select_course').val();
    }


    var voice_html = "";
    var download_v = "";
    if(match.references.aud){
        voice_html = '<div class="txttotxt_aud" style="text-align: center">' +
            '<audio controls="" class="no-bar huge">' +
                '<source src="/data/C'+c_folder+'/matchtxttotxt/'+(voice_dir)+'/1.mp3" type="audio/mp3" />' +
            '</audio></div>';

        download_v = '<form method="POST" action="http://meng.dev/json-scripts/Matching Text-to-Text/hamid.php?c_f=' + c_folder + '&url=' + match.references.aud.url + '&name=1.mp3&dir='+(voice_dir)+'" target="download_mp3">' +
            '<input type="submit" value="download voice" onclick="$(this).css(\'background\', \'#52d252\')">' +
            '</form>';
    }


    for(var t = 0;t < match.sources.length;t++){
        match_code += '<div class="data-child">' +
            '<span class="txt">question:</span><input value="<p>'+match.targets[t].txt+'</p>" />'+
            '<span class="txt">answer:</span><input value="<p>'+ match.sources[t].txt +'</p>" />'+
            '</div>';
    }
    $('.data').remove();
    var str_trn = '';
    if(match.references.title)
        str_trn += match.references.title;
    if(match.references.desc)
        str_trn += match.references.desc;
    if(match.references.standardInstruction)
        str_trn += match.references.standardInstruction;
    var trans = (str_trn).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p><br/>' + voice_html;
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">$string[\''+trans.toLowerCase()+'\']=\''+str_trn+'\';</textarea>' +
        '<br>'+download_v + "<br/> question text:" + p + match_code + '<br/><textarea class="final_html"><div class="txttotxt_desc">'+p+'</div></textarea></div>');
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

var down_xml = function(){
    download_xml('matching', data);
};

$(window).load(function(){
    $('.submit').click(function(){
        video();
    });
});