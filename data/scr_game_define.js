var snowboarding_user_name = null; // Max username characters = 16
//var snowboarding_user_name = "0123454689ABCDEF";
//var snowboarding_user_name = "Stanford McGarvy";
var snowboarding_boards = new Array();

var snowboarding_input_canvas = document.getElementById('input');
var snowboarding_input_context = snowboarding_input_canvas.getContext('2d');
var snowboarding_input_tip = "[W,A,S,D]: Movement [Enter]: Menu [R]: restart";

var snowboarding_buffer_canvas = document.getElementById('buffer');
var snowboarding_buffer_context = snowboarding_buffer_canvas.getContext('2d');

var snowboarding_client_build_a = 0;
var snowboarding_client_build_b = 8;
var snowboarding_client_build_c = 1;
var snowboarding_client_build = "{BUILD:"+snowboarding_client_build_a+":"+snowboarding_client_build_b+":"+snowboarding_client_build_c+"}";

var snowboarding_client_canvas = document.getElementById('client');
var snowboarding_client_context = snowboarding_client_canvas.getContext('2d');

var snowboarding_client_run = true;
var snowboarding_client_initialized = false;
var snowboarding_client_fps = 0;
var snowboarding_client_fps_count = 0;
var snowboarding_client_fps_target = 30.00;
var snowboarding_client_fps_secondframe = 1000.0 / snowboarding_client_fps_target;
var snowboarding_client_fps_error = 'An error has occurred with the frame rate.';
var snowboarding_client_fps_date = new Date();

var delta_speed = 1;

var snowboarding_client_width = 800;
var snowboarding_client_height = snowboarding_client_width/16*9;
var snowboarding_client_width_h = snowboarding_client_width * 0.5;
var snowboarding_client_height_h = snowboarding_client_height * 0.5;
var client_width = snowboarding_client_width;
var client_height = snowboarding_client_height;
var snowboarding_client_xscale = 1; 
var snowboarding_client_yscale = 1;
var snowboarding_client_averagescale = 1;
var snowboarding_client_x = 0; 
var snowboarding_client_y = 0;
var snowboarding_client_settings = "high";

var snowboarding_ismobile = false;
var snowboarding_controls = 0;

var snowboarding_console_load = 0;
var snowboarding_console_status = false;
var snowboarding_console_count = 0;
var snowboarding_console_lineblink_ = false;
var snowboarding_console_lineblink = function()	{

}
var snowboarding_controls_show = true;
var snowboarding_controls_left = false;
var snowboarding_controls_mid = false;
var snowboarding_controls_right = false;



var snowboarding_debug = false;
var snowboarding_state = null;
//State Definitions
var snowboarding_menu;
var snowboarding_arcade;
var snowboarding_classic;
var snowboarding_loading;

var snowboarding_map_width = 1000; 
var snowboarding_map_height = 1000; 
var snowboarding_map_viewx = 0; 
var snowboarding_map_viewy = 0;
var snowboarding_map_spread = 3000;
var map_offset_y = 0;
var map_offset_zoom = 0;
var snowboarding_map_zoom = 1;

var snowboarding_arcade_minute;
var snowboarding_arcade_second;
var snowboarding_arcade_mili;
var snowboarding_arcade_time = new Date();
var snowboarding_arcade_time_start = snowboarding_arcade_time.getTime();
var snowboarding_arcade_time_end;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || null;  
window.requestAnimationFrame = requestAnimationFrame;  
var snowboarding_is_mobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (snowboarding_is_mobile.Android() || snowboarding_is_mobile.BlackBerry() || snowboarding_is_mobile.iOS() || snowboarding_is_mobile.Windows());
    }
};
var snowboarding_input_touch = snowboarding_is_mobile.Android() || snowboarding_is_mobile.iOS();
var snowboarding_input_mouse = !snowboarding_is_mobile.any() || snowboarding_is_mobile.BlackBerry();
var snowboarding_input_keyboard = !snowboarding_input_touch || snowboarding_is_mobile.BlackBerry();