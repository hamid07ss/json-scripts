var course = {
    les: 0,
    step: 0,
    ques: 0
};
$(window).ready(function(){
    $('.codes').bind('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        file = e.originalEvent.dataTransfer.files[0];
        fr = new FileReader(file);
        fr.onload = receivedText;
        fr.readAsText(file);
        var test = e.originalEvent.dataTransfer.files[0].name.split('-');
        course.les = parseInt(test[0].replace(/[^0-9]/g, ''));
        course.step = parseInt(test[1].replace(/[^0-9]/g, ''));
        course.ques = parseInt(test[2].replace(/[^0-9]/g, ''));
        if(course.les == 0 || course.les == 1){
            course.les++;
        }
        $('.select_lesson').val(course.les);
        $('.select_step').val(course.step);
        $('.select_question').val(course.ques);
    });

    window.addEventListener("dragover",function(e){
        e = e || event;
        e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
        e = e || event;
        e.preventDefault();
    },false);

    function receivedText() {
        $('.codes').val(fr.result);
    }
});