$(function() {
        var audio = $('#audioTag').get(0);
        var timer = null;
        updateCache();
        //播放暂停控制
        $('#playPause').click(function(){

            //监听音频播放时间并更新进度条
            $('#audioTag').on('timeupdate',updateProgress);
            //监听播放完成事件
            $('#audioTag').on('ended',audioEnded);
            //改变暂停/播放icon
            if(audio.paused){
                audio.play();
                $(this).find('.icon-btn').removeClass('icon-play').addClass('icon-pause')
            } else{
                audio.pause();
                $(this).find('.icon-btn').removeClass('icon-pause').addClass('icon-play')
            }
        })    
        //audio.duration 获取音频的时长，单位为秒
        $('#audioTag').on("loadedmetadata",function () {
             $('#audioTime').html(transTime(this.duration));
        });
       
        var pgsWidth = $('.progress-box').width(); 
        var vpgsWidth = $('.volume-box').width()
        //点击进度条跳到指定点播放
        $('.progress-box').on('click',function (event) {
            clearTimeout(timer)
            if (!$(event.target).is($('.controls-dot')) ) {
                var rate = (event.offsetX)/pgsWidth;
                $('.play-progress').width(toPercent(rate))
                audio.currentTime = audio.duration * rate;
                updateProgress();
            } 
        });
        //播放轨道的拖拽
      $('.progress-box .controls-dot').on('mousedown', function(e) {
             var l = $('.progress-box').offset().left;
             var disX,rate;
          
             clearTimeout(timer);
             timer = setTimeout(function() {
                $(document).on('mousemove', function(e) {
                     disX = e.clientX - l;
                   if (disX > $('.progress-box').width() ) {
                      disX = $('.progress-box').width()
                    } else if (disX < 0){
                        disX = 0
                    }
                     rate = (disX)/pgsWidth;
                     $('.play-progress').width(toPercent(rate))
                     $('.played-time').html(transTime(rate*audio.duration));     
                     $('#audioTag').off('timeupdate');
                    return false;
                })
                $(document).on('mouseup', function(e) {    
              
                    audio.currentTime = rate*audio.duration;
                    $('#audioTag').on('timeupdate',updateProgress);
                    $(document).off('mousemove');
                    $(document).off('mouseup')
                    return false;
                })
                
            },200)
            return false;
      })
      //音量的拖拽
     $('.volume-box .controls-dot').on('mousedown', function() {
         var l = $('.volume-box').offset().left;
         var disX,rate;           
        clearTimeout(timer);
            timer  = setTimeout(function() {
            $(document).on('mousemove', function(e) {   
                 disX = e.pageX - l;
              if (disX > $('.volume-box').width() ) {
                 disX = $('.volume-box').width();
                 
               } else if (disX < 0){
                   disX = 0;
                   $('.volume-control .icon-btn').removeClass('icon-volume').addClass('icon-novolume');
               } else{
                  $('.volume-control .icon-btn').removeClass('icon-novolume').addClass('icon-volume');
               }
                 rate = (disX)/vpgsWidth;
                 audio.volume = rate
                 $('.volume-progress').width(toPercent(rate))
                return false;
            })
            $(document).on('mouseup',function(){
              $(document).off('mousemove');
              $(document).off('mouseup')
              return false;
            })
            
        },200)
        return false;
     })
    
  //调节音量条
    $('.volume-box').click(function(e){    
        clearTimeout(timer)
        if (!$(e.target).is($('.volume-box .controls-dot'))) {
            var rate = (e.offsetX)/vpgsWidth;
            $('.volume-progress').width(toPercent(rate))
            audio.volume=rate
        }
    })

    var oldVolume =audio.volume;

    $('.icon-volume-box').click(function(){
           $(this).find('.icon-btn').toggleClass('icon-novolume , icon-volume')
        if (audio.volume == 0 ) {
            audio.volume = oldVolume;
            $('.volume-progress').width(toPercent(audio.volume));
        }else{
            oldVolume　=  audio.volume 
             audio.volume = 0
            $('.volume-progress').width(toPercent(audio.volume))
        }
    })
 
})
//转换音频时长显示
function transTime(time) {
    var duration = parseInt(time);
    var minute = parseInt(duration/60);
    var sec = duration%60+'';
    var isM0 = ':';
    if(minute == 0){
        minute = '00';
    }else if(minute < 10 ){
        minute = '0'+minute;
    }
    if(sec.length == 1){
        sec = '0'+sec;
    }

    return minute+isM0+sec
}
//更新进度条
function updateProgress() {
    var audio =document.getElementsByTagName('audio')[0];
    var value = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
    $('.play-progress').css('width', value + '%');
    $('.played-time').html(transTime(audio.currentTime));
    $('.volume-progress').width(Math.round( audio.volume* 10000) / 100.00 + "%");        
}
//播放完成
function audioEnded() {
    var audio =document.getElementsByTagName('audio')[0];
    audio.currentTime=0;
    audio.pause();
    $('.play-pause>span').removeClass('icon-pause').addClass('icon-play');
}
//更新缓存进度
function updateCache() {

}
//转换百分比
function toPercent(a){
   return  Math.round( a* 10000) / 100.00 + "%"
}
function fnUp() {

}