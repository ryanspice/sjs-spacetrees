function loading_start()
{
}
function loading_init()
{
window.scrollTo(0,10);
	this.g_image = new Array; 
	this.start = loading_start;
	this.l_state = 0;
	this.l_count = false;
	this.s_count = 0;
	this.load = new Array;
	this.load_delay = 0;
	this.load_fade = 0.8;
	this.load_fade_dir = 1;
	this.loading_curret = "";
	this.load_cur = 1;
	this.error = false;
	this.tryagain = new Array;
	this.tryagainname = new Array;
	visual_font("italic 20px sans-serif");
}
function loading_update()
{	
	if (snowboarding_input_keyboard)
	{
		var enter = keystate[k_enter].pressed;
	}
	switch(this.l_state)
	{
		case 0:
			this.l_count = graphics_init(this);
			this.l_state = 1;
		break;
		case 1:
			this.load_fade+=0.001*this.load_fade_dir;
			if (this.load_fade>0.3)
				this.load_fade_dir = -1;
			if (this.load_fade<0)
				this.load_fade_dir = 1;
		break;
		case 2:
			
		break;
		case 3:
			if (enter)
				snowboarding_menu.enable();
		break;
	}
	return true;
}
function loading_draw()
{
	this.load_cur += snowboarding_loading.load_delay/snowboarding_loading.s_count;
	snowboarding_map_viewy++;
	map_draw_background(snowboarding_loading.img_bak_snow2);
	visual_opacity(0.5);
	image_draw(snowboarding_menu.image_arcadeMode, client_width/2-snowboarding_menu.image_arcadeMode.width/2, client_height/2-snowboarding_menu.image_arcadeMode.height/2);
	visual_opacity(1);
	visual_color("#FFFFFF");
	visual_font("bold 21px sans-serif");
	text_draw("LOADING", client_width/2-text_width("LOADING")/2, 325);
	visual_font("14px sans-serif");
	visual_text_align("left");
	visual_text_baseline("bottom");
	visual_color("#FFFFFF");
	visual_font("bold 45px verdana");
	text_draw("Space Trees", 45, 60);
	visual_font("bold 12px verdana");
	visual_color("#0000EE");
	//text_draw("Build18", 65, 70);
	var text_x = 40+text_width("Snowboarding");
}
snowboarding_loading = new state(loading_init, loading_update, loading_draw);
snowboarding_loading.clear = loading_init;
function graphics_init(t)
{
	t.img_ski = new Array;
	t.img_effect_snow = new Array;
	t.img_hud = new Array;
	t.img_orb_scale = 1;
	t.img_log_scale = 0.5;
	t.img_score = new Array;
	t.img_speed_scale = 1;
	t.img_background = new Array;
	t.img_tree_scale = 1;
	t.img_board = new Array;
	t.g_image[0] = t.img_ski[0] = image_load("gameplay/characters/skiier_1");
	t.g_image[1] = t.img_ski[1] = image_load("gameplay/characters/skiier_1");
	t.g_image[2] = t.img_ski[2] = image_load("gameplay/characters/skiier_2");
	t.g_image[3] = t.img_ski[3] = image_load("gameplay/characters/skiier_3");
	t.g_image[4] = t.img_ski[4] = image_load("gameplay/characters/skiier_4");
	t.g_image[5] = t.img_ski[5] = image_load("gameplay/characters/skiier_5");
	t.g_image[6] = t.img_ski[6] = image_load("gameplay/characters/skiier_6");
	t.g_image[7] = t.img_ski[7] = image_load("gameplay/characters/skiier_7");
	t.g_image[8] = t.img_ski[8] = image_load("gameplay/characters/skiier_8");
	t.g_image[9] = t.img_ski[9] = image_load("gameplay/characters/skiier_9");
	t.g_image[10] = t.img_board[0] = image_load("boards/board_white")	;
	t.g_image[11] = t.img_board[1] = image_load("boards/board_light")	;	
	t.g_image[12] = t.img_board[2] = image_load("boards/board_flame")	;	
	t.g_image[13] = t.img_board[3] = image_load("boards/board_cheese")	;	
	t.g_image[14] = t.img_board[4] = image_load("boards/board_suit")	;		
	t.g_image[15] = t.img_board[5] = image_load("boards/board_jack")	;	
	t.g_image[16] = t.img_board[6] = image_load("boards/board_pie")		;
	t.g_image[17] = t.img_board[7] = image_load("boards/board_default")	;
	t.g_image[18] = t.img_board[8] = image_load("boards/board_insanity");
	t.g_image[19] = snowboarding_menu.back = image_load("menu/imageMenuBack");
	t.g_image[20] = snowboarding_menu.image_lock = image_load("menu/imageMenuLock");
	t.g_image[21] = snowboarding_menu.image_star = image_load("menu/imageMenuStar");
	t.g_image[22] = snowboarding_menu.image_classicMode = image_load("menu/imageMenuClassic");
	t.g_image[23] = snowboarding_menu.image_arcadeMode = image_load("menu/menu_arcade");
	t.g_image[24] = snowboarding_menu.image_ghostMode = image_load("menu/imageMenuGhost");
	t.g_image[25] = snowboarding_menu.image_leftArrow = image_load("menu/imageMenuArrowLeft");
	t.g_image[26] = snowboarding_menu.image_rightArrow = image_load("menu/imageMenuArrowRight");
	t.g_image[27] = snowboarding_menu.image_glow = image_load("menu/imageMenuBoardGlow");
	t.g_image[28] = t.img_background[0] = t.g_image[0];
	t.g_image[29] = t.img_background[1] = image_load("menu/tutorial_controls");
	t.g_image[30] = t.img_effect_snow[0] = image_load("effects/effect_snow_1");
	t.g_image[31] = t.img_effect_snow[1] = image_load("effects/effect_snow_2");
	t.g_image[32] = t.img_effect_snow[2] = image_load("effects/effect_snow_3");
	t.g_image[33] = t.img_effect_snow[3] = image_load("effects/effect_snow_4");
	t.g_image[34] = t.img_effect_snow[4] = image_load("effects/effect_snow_5");
	t.g_image[35] = t.img_effect_snow[5] = image_load("effects/effect_snow_6");
	t.g_image[36] = t.img_hud[0] = image_load("gameplay/imgGameFlagPoints");
	t.g_image[37] = t.img_hud[1] = image_load("gameplay/tree_1");
	t.g_image[38] = t.img_player_head_default = image_load("gameplay/characters/main_1");
	t.g_image[39] = t.img_player_body = image_load("gameplay/characters/main_2");
	t.g_image[40] = t.img_player_board_default = image_load("boards/board_default");
	t.g_image[41] = t.img_tree_1 = image_load("gameplay/tree/tree_1");
	t.g_image[42] = t.img_tree_2 = image_load("gameplay/tree/tree_2");
	t.g_image[43] = t.img_tree_3 = image_load("gameplay/tree/tree_3");
	t.g_image[44] = t.img_tree_4 = image_load("gameplay/tree/tree_shadow2");
	t.g_image[45] = t.img_orb_1 = image_load("gameplay/orb_1");
	t.g_image[46] = t.img_orb_2 = image_load("gameplay/orb_2");
	t.g_image[47] = t.img_orb_3 = image_load("gameplay/orb_3");
	t.g_image[48] = t.img_orb_4 = image_load("gameplay/orb_4");
	t.g_image[49] = t.img_orb_5 = image_load("gameplay/orb_5");
	t.g_image[50] = t.img_orb_6 = image_load("gameplay/orb_6");
	t.g_image[51] = t.img_log_1 = image_load("gameplay/log_1");
	t.g_image[52] = t.img_log_3 = image_load("gameplay/log_3");
	t.g_image[53] = t.img_speed_1 = image_load("gameplay/speed_1");
	t.g_image[54] = t.img_ice_1 = image_load("backgrounds/ice_1");
	t.g_image[55] = t.img_ice_2 = image_load("backgrounds/ice_2");
	t.g_image[56] = t.img_ice_snow = t.g_image[0];
	t.g_image[57] = t.img_ice_display = t.g_image[0];
	t.g_image[58] = t.img_avalanche_1 = t.g_image[0];
	t.g_image[59] = t.img_score[0] = image_load("gameplay/score_0");
	t.g_image[60] = t.img_score[1] = image_load("gameplay/score_1");
	t.g_image[61] = t.img_score[2] = image_load("gameplay/score_2");
	t.g_image[62] = t.img_score[3] = image_load("gameplay/score_3");
	t.g_image[63] = t.img_score[4] = image_load("gameplay/score_4");
	t.g_image[64] = t.img_score[5] = image_load("gameplay/score_5");
	t.g_image[65] = t.img_score[6] = image_load("gameplay/score_6");
	t.g_image[66] = t.img_score[7] = image_load("gameplay/score_7");
	t.g_image[67] = t.img_score[8] = image_load("gameplay/score_8");
	t.g_image[68] = t.img_score[9] = image_load("gameplay/score_9");
	t.g_image[69] = t.img_score[10] = image_load("gameplay/score_label");
	
	t.g_image[70] = t.img_tree_shadow1 = image_load("gameplay/tree/tree_shadow1");
	t.g_image[71] = t.img_tree_shadow2 = image_load("gameplay/tree/tree_shadow2");
	t.g_image[72] = t.img_tree_shadow3 = image_load("gameplay/tree/tree_shadow3");
	
	t.g_image[73] = t.img_speed_1 = image_load("gameplay/speed/speed_1");
	t.g_image[74] = t.img_speed_2 = image_load("gameplay/speed/speed_2");
	t.g_image[75] = t.img_speed_3 = image_load("gameplay/speed/speed_3");
	t.g_image[76] = t.img_speed_4 = image_load("gameplay/speed/speed_4");
	
	t.g_image[21] = t.img_bak_snow = image_load("backgrounds/snow");
	t.g_image[77] = t.img_bak_snow2 = image_load("backgrounds/snow2");
	
	character_init_boards()
	var tss = setTimeout(function () {image_check();snowboarding_loading.l_state = 2;},1000)
	return true;
}

function image_load(name)
{
	var image = new Image();
	image.src = "images/" + name + ".png";
	snowboarding_loading.load_delay+=100;
	snowboarding_loading.s_count++;
	
	var t = setTimeout(function () {graphics_check(image,name);},1000+snowboarding_loading.load_delay)
	return image;
}
function image_check()
{	
	var ic=0, re = false;
	for (ic = 0; ic<snowboarding_loading.g_image.length;ic++)
	{
		if (!snowboarding_loading.g_image[ic].complete)
			{re = true;break;}
	}
	if (re)
		{
			image_re_check(1000);
		}
	else
		{
			snowboarding_menu.enable();
		}
	delete ic, re;
} 
function image_re_check(ti)
{
	var t = setTimeout(function () {image_check();},ti)
}
function graphics_check(image,name)
{
	if((!image.complete)&&(snowboarding_loading.load_delay))
		snowboarding_loading.error = true;
	snowboarding_loading.loading_current = name;
}