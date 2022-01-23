
function menu_init()
{
	this.selectedMap = 0;
	this.selectedBoard = snowboarding_user_player.dboard;
	this.board_choice = new Image;
	this.transition = 0;
	this.tgo = 0;
	this.talpha = 0;
}

function menu_update()
{	
	// Handle keyboard input.
	if (snowboarding_input_keyboard)
	{
		var left = keystate[k_left].pressed || keystate[k_a].pressed;
		var right = keystate[k_right].pressed || keystate[k_d].pressed;
		var up = keystate[k_up].pressed || keystate[k_w].pressed;
		var down = keystate[k_down].pressed || keystate[k_s].pressed;
		var enter = keystate[k_enter].pressed;
		
		
		if (this.tgo)
			this.talpha+=0.05;
		if (this.talpha>1)
			this.transition = 1;
		if(this.transition==1)
			{
			snowboarding_arcade.start(snowboarding_menu.selectedBoard);
			snowboarding_arcade.enable();
			}
			
			
		if ((enter)||(mousestate.pressed))
		{
			if (!this.tgo)
				this.tgo=1;
			return false;
		}
	}
	return true;
}
function menu_draw()
{
	snowboarding_map_viewy++;
	map_draw_background(snowboarding_loading.img_bak_snow2);

	//image_draw(this.back, 0, 0);
	visual_color("#FFFFFF");
	visual_opacity(0.4);
	//rect_draw(140,170,310,150);
	//rect_draw(0,160,client_width,360);
	visual_opacity(1);


		visual_font("bold 21px sans-serif");
		
		// Arcade
		visual_opacity(0.5);

		visual_opacity(1);
		image_draw(snowboarding_menu.image_arcadeMode, client_width/2-snowboarding_menu.image_arcadeMode.width/2, client_height/2-snowboarding_menu.image_arcadeMode.height/2);
		
		visual_font("14px sans-serif");
		var welcome = "Welcome to the Space Trees",welcome2 = "";
		var notice = "- -",notice2 = "Refresh the page to update the score table.",notice3 = "You can also use the arrow keys or the mouse.";
		text_draw(welcome, client_width/2-text_width(welcome)/2, 125);
		visual_font("bold 14px sans-serif");
		text_draw(welcome2, client_width/2-text_width(welcome2)/2, 340);
		visual_font("italic 14px sans-serif");
		text_draw(notice, client_width/2-text_width(notice)/2, 355);
		text_draw(notice2, client_width/2-text_width(notice2)/2, 370);
		text_draw(notice3, client_width/2-text_width(notice3)/2, 385);
		//text_draw("Test your skills in an unpredictable struggle", client_width/2-text_width("Test your skills in an unpredictable struggle")/2, 355);
		//text_draw("against the odds of death. Challenge the", client_width/2-text_width("against the odds of death. Challenge the")/2, 370);
		//text_draw("triump of the best snowboarders world-abroad.", client_width/2-text_width("triump of the best snowboarders world-abroad.")/2, 385);

	visual_text_align("left");
	visual_text_baseline("bottom");
	visual_color("#FFFFFF");
	visual_font("bold 45px verdana");
	text_draw("Space Trees", 45, 60);
	visual_font("bold 12px verdana");
	text_draw("Straight to the Moon!", 65, 70);

	var text_x = 40+text_width("Space Trees");
	
	visual_opacity(this.talpha);
	visual_color("#000000");
	rect_draw(0,0,client_width,client_height);
	visual_opacity(1);
}

snowboarding_menu = new state(menu_init, menu_update, menu_draw);