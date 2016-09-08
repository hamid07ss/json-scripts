/**
 * Created by h.sarani on 8/23/2016.
 */
var voice_dir;
var dir_txt;
var data = {
    htmlpap: '',
    question_style: 2,
    question_type: 'matchtxttotxt-2',
    question_no: 0
};
var video = function(){
    voice_dir = "U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    var video_json = JSON.parse($('.get_json').val());
    var match = {
        audios: video_json[0].content.audios,
        pics: video_json[0].content.pics,
        references: video_json[0].references,
        filterOptions: video_json[0].filterOptions
    };
    if(match.filterOptions.questionNo){
        data.question_no = match.pics.length;
    }
    var match_code = "";
    var c_folder = $('.select_course').val();
    if (c_folder.length == 1) {
        c_folder = "0" + $('.select_course').val();
    }

    var download_v = "";
    var download_p = "";

    for(var t = 0;t < match.pics.length;t++){
        if(match.audios[t]) {
            match_code += '<div class="data-child">' +
                '<span class="txt">question:</span><input value="/data/C' + c_folder + '/matchtxttotxt-2/' + voice_dir + '/' + (t + 1) + '.mp3" />' +
                '<span class="txt">answer:</span><input value="/data/C' + c_folder + '/matchtxttotxt-2/' + voice_dir + '/' + (t + 1) + '.jpg" />' +
                '</div>';
            download_p += '<form method="POST" action="http://meng.dev/json-scripts/Matching Pic-to-Audio/hamid.php?c_f=' + c_folder + '&url=' + match.pics[t].image.url + '&name=' + (t + 1) + '.jpg&dir=' + (voice_dir) + '" target="download_mp3">' +
                '<input type="submit" value="download pic ' + (t + 1) + '" onclick="$(this).css(\'background\', \'#52d252\')">' +
                '</form></br>';
            download_v += '<form method="POST" action="http://meng.dev/json-scripts/Matching Pic-to-Audio/hamid.php?c_f=' + c_folder + '&url=' + match.audios[t].audio.url + '&name=' + (t + 1) + '.mp3&dir=' + (voice_dir) + '" target="download_mp3">' +
                '<input type="submit" value="download voice ' + (t + 1) + '" onclick="$(this).css(\'background\', \'#52d252\')">' +
                '</form></br>';
        }
        else{
            match_code += '<div class="data-child">' +
                '<span class="txt">question:</span><input value="empty" />' +
                '<span class="txt">answer:</span><input value="/data/C' + c_folder + '/matchtxttotxt-2/' + voice_dir + '/' + (t + 1) + '.jpg" />' +
                '</div>';
            download_p += '<form method="POST" action="http://meng.dev/json-scripts/Matching Pic-to-Audio/hamid.php?c_f=' + c_folder + '&url=' + match.pics[t].image.url + '&name=' + (t + 1) + '.jpg&dir=' + (voice_dir) + '" target="download_mp3">' +
                '<input type="submit" value="download pic ' + (t + 1) + '" onclick="$(this).css(\'background\', \'#52d252\')">' +
                '</form></br>';
        }
    }
    $('.data').remove();
    var trans = dir_txt + (match.references.title + match.references.desc + match.references.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p><br/>';
    var trn = '$string[\''+trans+'\']=\''+match.references.title + match.references.desc + match.references.standardInstruction+'\';';
    if(match.references.title == "" && match.references.desc == ""){
        p = '<p><trn>standardInstruction-matchtxttotxt-2</trn></p>';
        trn = '$string[\'standardInstruction-matchtxttotxt-2\']=\''+match.references.standardInstruction+'\';';
    }
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">'+ trn +'</textarea>' +
        '<br>'+download_v + download_p+ "<br/> question text:" + p + match_code + '<br/><textarea class="final_html"><div class="txttopic_desc">'+p+'</div></textarea></div>');
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