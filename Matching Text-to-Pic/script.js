/**
 * Created by h.sarani on 8/23/2016.
 */
var voice_dir;
var dir_txt;
var data = {
    htmlpap: '',
    question_style: 1,
    question_type: 'matchtxttotxt-1',
    question_no: 0
};
var video = function(){
    voice_dir = "U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    var video_json = JSON.parse($('.get_json').val());
    var match = {
        texts: video_json[0].content.texts,
        pics: video_json[0].content.pics,
        references: video_json[0].references,
        filterOptions: video_json[0].filterOptions
    };
    if(match.filterOptions.questionNo){
        data.question_no = match.texts.length;
    }
    var match_code = "";
    var c_folder = $('.select_course').val();
    if (c_folder.length == 1) {
        c_folder = "0" + $('.select_course').val();
    }

    var download_v = ""

    for(var t = 0;t < match.texts.length;t++){

        if(match.pics[t]){
            match_code += '<div class="data-child">' +
            '<span class="txt">question:</span><input value="/data/C'+ c_folder +'/matchtxttotxt-1/'+ voice_dir +'/'+ (t + 1) +'.jpg" />'+
            '<span class="txt">answer:</span><input value="<p>'+match.texts[t].txt+'</p>" />'+
            '</div>';
            download_v += '<form method="POST" action="http://meng.dev/json-scripts/Matching Text-to-Pic/hamid.php?c_f=' + c_folder + '&url='+ match.pics[t].image.url +'&name='+ (t + 1) +'.jpg&dir='+(voice_dir)+'" target="download_mp3">' +
                '<input type="submit" value="download pic '+ (t + 1) +'" onclick="$(this).css(\'background\', \'#52d252\')">' +
                '</form></br>';
        }
        else {
            match_code += '<div class="data-child">' +
                '<span class="txt">question:</span><input value="empty" />'+
                '<span class="txt">answer:</span><input value="<p>'+match.texts[t].txt+'</p>" />'+
                '</div>';
        }
    }
    $('.data').remove();
    var trans = dir_txt + (match.references.title + match.references.desc + match.references.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p><br/>';
    var trn = '$string[\''+trans+'\']=\''+match.references.title + match.references.desc + match.references.standardInstruction+'\';';
    if(match.references.title == "" && match.references.desc == ""){
        p = '<p><trn>standardInstruction-matchtxttotxt-1</trn></p>';
        trn = '$string[\'standardInstruction-matchtxttotxt-1\']=\''+match.references.standardInstruction+'\';';
    }
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">'+ trn +'</textarea>' +
        '<br>'+download_v + "<br/> question text:" + p + match_code + '<br/><textarea class="final_html"><div class="txttopic_desc">'+p+'</div></textarea></div>');
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