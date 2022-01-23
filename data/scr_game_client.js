var client_center_ = true;
function client_loop() 
{
	client_step_supported();
	requestAnimationFrame(client_loop,window);
};

function client_start()	
{
	snowboarding_console_load = true;
	snowboarding_state = snowboarding_loading;
	snowboarding_user_player = new user("Guest", 0, 0);

	snowboarding_menu.init();
	snowboarding_arcade.init();
	snowboarding_loading.init();
	input_track_key(k_w);
	input_track_key(k_a);
	input_track_key(k_s);
	input_track_key(k_d);

	input_track_key(k_left);
	input_track_key(k_right);
	input_track_key(k_up);
	input_track_key(k_down);
	input_track_key(k_enter);
	input_track_key(k_shift);
	input_track_key(k_e);
	input_track_key(k_r);
	
	if (requestAnimationFrame !== null)
		{
		requestAnimationFrame(client_loop,window);
		}
		else
		{
		setInterval(client_step_unsupported,60);
		alert("Your browser doesn't support 'requestAnimationFrame', highscores have been disabled.");
		}
}
function client_()	
{
	//if (snowboarding_is_mobile.any())
	//	window.scrollTo(snowboarding_input_canvas.style.left,10);
				//snowboarding_client_context.clearRect ( snowboarding_client_x , snowboarding_client_y , snowboarding_client_width , snowboarding_client_height );
				//snowboarding_input_context.clearRect ( snowboarding_client_x , snowboarding_client_y , snowboarding_client_width , snowboarding_client_height );
				//snowboarding_buffer_context.clearRect ( snowboarding_client_x , snowboarding_client_y , snowboarding_client_width , snowboarding_client_height );

	if (client_center_)
	{
		client_center(snowboarding_buffer_canvas);
		client_center(snowboarding_client_canvas);
		client_center_ = false;
	}
	if (snowboarding_state.update())
		snowboarding_state.draw();
	
	
		client_debug();
	snowboarding_client_context.drawImage(snowboarding_buffer_canvas, 0, 0);

}
function client_step_unsupported()	
{
	if (snowboarding_client_run)
	{
		input_update();
		if (client_fps())
			client_();
	}
}
function client_step_supported()	
{
	if (snowboarding_client_run)
	{
		input_update();
		client_fps();
		client_();
	}
}
function client_center(dest)	
{
	var x,y;

	if (self.innerHeight) // All except Internet Explorer.
	{
		x = self.innerWidth;
		y = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight)
		// Explorer 6 Strict Mode
	{
		x = document.documentElement.clientWidth;
		y = document.documentElement.clientHeight;
	}
	else if (document.body) // Other Browers.
	{
		x = document.body.clientWidth;
		y = document.body.clientHeight;
	}

	var x = Math.round((x*0.5)-(snowboarding_client_width*0.5));
	if (snowboarding_is_mobile.any()) { x = 0; }
	snowboarding_input_canvas.style.left = x+"px";
	snowboarding_buffer_canvas.style.left = x+"px";
	snowboarding_client_canvas.style.left = x+"px";
	dest.width = snowboarding_client_width*snowboarding_client_xscale;
	dest.height = snowboarding_client_height;
	delete scx,x,y;
}

function client_debug()		
{
	if (snowboarding_debug)
	{
		snowboarding_buffer_context.fillStyle = "#0000FF";
		visual_font("10pt sans-serif");
		visual_text_align("right");
		var debug = snowboarding_input_tip+"   ||   fps "+ Math.round(snowboarding_client_fps) + "  " + snowboarding_client_build;
		var debug_width = text_width(debug);
		visual_colour("#000000");
		visual_opacity(0.96);
			rectangle_draw_filled(snowboarding_client_width-debug_width-13,snowboarding_client_height-20,debug_width+6,20)
		visual_opacity(1);
		visual_colour("#aaaaFF");
			text_draw(debug, snowboarding_client_width-10, snowboarding_client_height-3);
		visual_text_align("left");
	}
}
function client_fps()	
{
	var ret = false;
	var client_time_now = new Date();
	var client_time_diff = client_time_now.getTime() - snowboarding_client_fps_date.getTime();

	delta_speed = snowboarding_client_fps_target / snowboarding_client_fps;
	if (client_time_diff >= snowboarding_client_fps_secondframe)
		{
			snowboarding_client_fps = 1000 / client_time_diff;
			snowboarding_client_fps_date = client_time_now;
			snowboarding_client_fps_count += 0.2;
			if (snowboarding_client_fps_count >= 1)
			{
				snowboarding_console_lineblink();
				snowboarding_client_fps_count = 0;
			}
			ret = true;
		}
	snowboarding_client_fps_date = client_time_now;
	delete client_time_now, client_time_diff; 
	return ret;
}