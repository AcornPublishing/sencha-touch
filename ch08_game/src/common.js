var common_url = 'http://goodsencha.iptime.org:8080/book/part8_game';

var local_img = "./img/";
var android_img = "./img/";
var iphone_img = "";

local_img = android_img;

var user_agent = navigator.userAgent.toLowerCase();
var mobile_phones = new Array( 'android', 'iphone', 'ipod', 'ipad');


for (var i = 0; i < mobile_phones.length; i++)
{
    if (user_agent.indexOf(mobile_phones[i]) != -1)
    {
       if(i ==0 )
       	local_img = android_img;
       else
       	local_img = iphone_img;
    }     
}
