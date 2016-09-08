/**
 * Created by h.sarani on 8/31/2016.
 */


var download_xml = function (qtype, data) {
    var dir_txt = "c" + $('.select_course').val() + "-u" + $('.select_unit').val() + "-l" + $('.select_lesson').val() + "-t" + $('.select_step').val() + "-q" + $('.select_question').val() + "-";
    var html_codes = $('.new_html').val();
    var row_data = $('.data').find('.data-child');
    var subquestion = '';
    var final_xml = '';
    if(qtype === "typingdragdrop"){
        var final_xml = '<?xml version="1.0" encoding="UTF-8"?>'+
            '<quiz>'+
            '<question type="leveleddescription">'+
            '<name>'+
            '<text>'+ dir_txt + 'leveldescription</text>'+
            '</name>'+
            '<questiontext format="html">'+
            '<text><![CDATA['+ html_codes +']]></text>'+
            '</questiontext>'+
            '<generalfeedback format="html">'+
            '<text></text>'+
            '</generalfeedback>'+
            '<defaultgrade>0.0000000</defaultgrade>'+
            '<penalty>0.0000000</penalty>'+
            '<hidden>0</hidden>'+
            '<shuffleanswers></shuffleanswers>'+
            '<correctfeedback format="unknown">'+
            '<text></text>'+
            '</correctfeedback>'+
            '<partiallycorrectfeedback format="unknown">'+
            '<text></text>'+
            '</partiallycorrectfeedback>'+
            '<incorrectfeedback format="unknown">'+
            '<text></text>'+
            '</incorrectfeedback>'+
            '</question>'+
            '</quiz>';
    }

    if(qtype === "matching"){
        var des = $('.final_html').val();
        var sub_ques = '';
        for(var m = 0;m < row_data.length;m++){
            sub_ques = $(row_data[m]).find('input');
            subquestion += '<subquestion format="html">' +
                '<text><![CDATA['+ $(sub_ques[0]).val() +']]></text>' +
                '<answer format="html">' +
                '<text><![CDATA['+ $(sub_ques[1]).val() +']]></text>' +
                '</answer>' +
                '</subquestion>';
        }
        final_xml = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<quiz>' +
            '<question type="matchtxttotxt">' +
            '<name>' +
            '<text>'+ dir_txt + data.question_type +'</text>' +
            '</name>' +
            '<questiontext format="html">' +
            '<text><![CDATA['+des+']]></text>' +
            '</questiontext>' +
            '<generalfeedback format="html">' +
            '<text></text>' +
            '</generalfeedback>' +
            '<defaultgrade>1.0000000</defaultgrade>' +
            '<penalty>0.3333333</penalty>' +
            '<hidden>0</hidden>' +
            '<correctfeedback format="html">' +
            '<text>Your answer is correct.</text>' +
            '</correctfeedback>' +
            '<partiallycorrectfeedback format="html">' +
            '<text>Your answer is partially correct.</text>' +
            '</partiallycorrectfeedback>' +
            '<incorrectfeedback format="html">' +
            '<text>Your answer is incorrect.</text>' +
            '</incorrectfeedback>' +
            '<shownumcorrect/>' +
            '<question_style>'+ data.question_style +'</question_style>'+
            '<question_no>'+ data.question_no +'</question_no>'+
            '<htmlpap format="html">' +
            '<text><![CDATA['+data.htmlpap+']]></text>' +
            '</htmlpap>' +
            subquestion +
            '</question>' +
            '</quiz>';
        qtype = data.question_type;
    }

    if(qtype === "putinorder"){
        var des = $('.final_html').val();
        var sub_ques = '';
        for(var m = 0;m < row_data.length;m++){
            sub_ques = $(row_data[m]).find('input');
            subquestion += '<subquestion format="html">' +
                '<text><![CDATA['+ $(sub_ques[0]).val() +']]></text>' +
                '<answer format="html">' +
                '<text><![CDATA['+ $(sub_ques[1]).val() +']]></text>' +
                '</answer>' +
                '</subquestion>';
        }
        final_xml = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<quiz>' +
            '<question type="matchtxttotxt">' +
            '<name>' +
            '<text>'+ dir_txt + data.question_type +'</text>' +
            '</name>' +
            '<questiontext format="html">' +
            '<text><![CDATA['+des+']]></text>' +
            '</questiontext>' +
            '<generalfeedback format="html">' +
            '<text></text>' +
            '</generalfeedback>' +
            '<defaultgrade>1.0000000</defaultgrade>' +
            '<penalty>0.3333333</penalty>' +
            '<hidden>0</hidden>' +
            '<correctfeedback format="html">' +
            '<text>Your answer is correct.</text>' +
            '</correctfeedback>' +
            '<partiallycorrectfeedback format="html">' +
            '<text>Your answer is partially correct.</text>' +
            '</partiallycorrectfeedback>' +
            '<incorrectfeedback format="html">' +
            '<text>Your answer is incorrect.</text>' +
            '</incorrectfeedback>' +
            '<shownumcorrect/>' +
            '<question_style>'+ data.question_style +'</question_style>'+
            '<question_no>'+ data.question_no +'</question_no>'+
            '<htmlpap format="html">' +
            '<text><![CDATA['+data.htmlpap+']]></text>' +
            '</htmlpap>' +
            subquestion +
            '</question>' +
            '</quiz>';
        qtype = data.question_type;
    }

    if(qtype === "textselectsingq"){
        var final_xml = '<?xml version="1.0" encoding="UTF-8"?>'+
            '<quiz>'+
            '<question type="leveleddescription">'+
            '<name>'+
            '<text>'+ dir_txt + 'leveldescription</text>'+
            '</name>'+
            '<questiontext format="html">'+
            '<text><![CDATA['+ html_codes +']]></text>'+
            '</questiontext>'+
            '<generalfeedback format="html">'+
            '<text></text>'+
            '</generalfeedback>'+
            '<defaultgrade>0.0000000</defaultgrade>'+
            '<penalty>0.0000000</penalty>'+
            '<hidden>0</hidden>'+
            '<shuffleanswers></shuffleanswers>'+
            '<correctfeedback format="unknown">'+
            '<text></text>'+
            '</correctfeedback>'+
            '<partiallycorrectfeedback format="unknown">'+
            '<text></text>'+
            '</partiallycorrectfeedback>'+
            '<incorrectfeedback format="unknown">'+
            '<text></text>'+
            '</incorrectfeedback>'+
            '</question>'+
            '</quiz>';
    }

    if(qtype === "videodesc"){
        for(var i = 0;i < row_data.length;i++){
            var inp = $(row_data[i]).find('input');
            subquestion += '<subquestion format="plain_text">'+
                '<text>' + $(inp[0]).val() + '</text>'+
                '<answer>'+
                '<text>' + $(inp[1]).val() + '</text>'+
                '</answer>'+
                '<filepath>'+
                '<text>' + $(inp[2]).val() + '</text>'+
                '</filepath>'+
                '</subquestion>';
        }
        final_xml = '<?xml version="1.0" encoding="UTF-8"?>'+
            '<quiz>'+
            '<question type="videodesc">'+
            '<name>'+
            '<text>'+ dir_txt + 'videodesc</text>'+
            '</name>'+
            '<questiontext format="html">'+
            '<text><![CDATA['+ html_codes +']]></text>'+
            '</questiontext>'+
            '<generalfeedback format="html">'+
            '<text></text>'+
            '</generalfeedback>'+
            '<defaultgrade>1.0000000</defaultgrade>'+
            '<penalty>0.3333333</penalty>'+
            '<hidden>0</hidden>'+
            '<shuffleanswers>1</shuffleanswers>'+
            '<correctfeedback format="html">'+
            '<text>Your answer is correct.</text>'+
        '</correctfeedback>'+
        '<partiallycorrectfeedback format="html">'+
            '<text>Your answer is partially correct.</text>'+
        '</partiallycorrectfeedback>'+
        '<incorrectfeedback format="html">'+
            '<text>Your answer is incorrect.</text>'+
        '</incorrectfeedback>'+
        '<shownumcorrect/>'+
                subquestion +
            '</question>'+
            '</quiz>';
    }

    download(final_xml, dir_txt + qtype +'.xml', "text/plain");
};
