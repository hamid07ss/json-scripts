/**
 * Created by h.sarani on 8/23/2016.
 */
var voice_dir;
var dir_txt;
var video = function(){
    voice_dir = "C" + ($('.select_course').val().length == 1 ? "0" + $('.select_course').val() : $('.select_course').val()) + "-U" + $('.select_unit').val() + "-L" + $('.select_lesson').val() + "-T" + $('.select_step').val() + "-" + parseInt(Math.random() * 100000000);
    dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";

    var video_json = JSON.parse($('.get_json').val());
    var video = {
        url: video_json[0].content.video.url,
        poster: video_json[0].content.poster.url,
        words: video_json[0].content.words,
        tit_ref: video_json[0].references
    };
    var voices = "";
    var c_folder = $('.select_course').val();
    if (c_folder.length == 1) {
        c_folder = "0" + $('.select_course').val();
    }
    var video_code = '<video controls="" poster="\\data\\C'+ c_folder +'\\video\\'+ voice_dir +'\\poster.jpg">'+
        '<source src="/data/C'+c_folder+'/video/' + voice_dir + '/video.mp4" type="video/mp4"/>' +
        '<source src="/data/C'+c_folder+'/video/' + voice_dir + '/video.ogv" type="video/ogv"/>' +
        '</video>';
    var html_trn = "";
    for(var t = 0;t < video.words.length;t++){
        html_trn += '$string[\''+ dir_txt + video.words[t].txt.trim().replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30)+'\']=\''+video.words[t].txt.trim()+'\'' + ";\n",

        video.words[t].timeline = video.words[t].timeline.split(':');
        video.words[t].timeline = (parseInt(video.words[t].timeline[0]) * 60) + parseInt(video.words[t].timeline[1]);
        voices += '<div class="data-child"><span class="txt">text:</span><input value="'+dir_txt + video.words[t].txt.trim().replace(/[\t\n]+/g, ' ').replace(/ /g, '').substring(0, 30)+'" />'+
            '<span class="txt">time:</span><input value="'+ video.words[t].timeline +'" />'+
            '<span class="txt">file:</span><input value="/data/C'+c_folder+'/video/' + voice_dir + '/'+(t + 1)+'.mp3" />'+
            '<form method="POST" action="hamid.php?c_f=' + c_folder + '&dir=' + voice_dir + '&url=' + video.words[t].translation.audio.url + '&name='+(t + 1)+'.mp3" target="download_mp3">' +
            '<input onclick="$(this).css(\'background\', \'green\')" style="margin-left: 10px;" type="submit" value="download voice '+(t + 1)+'"/>' +
            '</form></div>';
    }
    var download_poster = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&dir=' + voice_dir + '&url=' + video.poster + '&name=poster.jpg" target="download_mp3">' +
        '<input onclick="$(this).css(\'background\', \'green\')" style="margin-left: 10px;" type="submit" value="download poster"/>' +
        '</form>';
    var download_video = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&dir=' + voice_dir + '&url=' + video.url + '/_jcr_content/renditions/s.mp4&name=video.mp4" target="download_mp3">' +
        '<input onclick="$(this).css(\'background\', \'green\')" style="margin-left: 10px;" type="submit" value="download video"/>' +
        '</form>';
    var download_video_f4v = '<form method="POST" action="hamid.php?c_f=' + c_folder + '&dir=' + voice_dir + '&url=' + video.url + '&name=video.f4v" target="download_mp3">' +
        '<input onclick="$(this).css(\'background\', \'green\')" style="margin-left: 10px;" type="submit" value="download video f4v"/>' +
        '</form>';
    $('.data').remove();


    // var str_trn = video.tit_ref.title + video.tit_ref.desc + video.tit_ref.standardInstruction;
    var str_trn = '';
    if($('<div>').html(video.tit_ref.desc).find('p') == ""){
        str_trn = video.tit_ref.desc;
    }else{
        str_trn = $(video.tit_ref.desc).text().trim();
    }

    var trans = dir_txt + (str_trn + video.tit_ref.title + video.tit_ref.standardInstruction).substring(0, 30).replace(/[**]+/g, '\'').replace(/[\t\n]+/g, ' ').replace(/ /g, '').replace(/(['"])/g, "\\$1");
    var p = '<p><trn>'+ trans +'</trn></p>';
    var trn = '$string[\''+trans+'\']=\''+video.tit_ref.title + video.tit_ref.desc + video.tit_ref.standardInstruction+'\';';
    if(video.tit_ref.title == "" && video.tit_ref.desc == ""){
        p = '<p><trn>standardInstruction-videodescription</trn></p>';
        trn = '$string[\'standardInstruction-videodescription\']=\''+video.tit_ref.standardInstruction+'\';';
    }
    $('.get').after('<div class="data">' +
        '<textarea style="height: 200px;">' + trn +"\n"+ html_trn + '</textarea>' +
        voices + download_poster + download_video + download_video_f4v + '<br/><textarea class="new_html">' + p + video_code + '</textarea></div>');
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