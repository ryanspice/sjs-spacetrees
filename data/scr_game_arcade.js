/*
	Classic mode could have a classic_start(map) function. Its rather easy to customize the state system for individual states.
	Also, its easy to implement pausing. Just have a pause state.
	Give the pause state your current state (either arcade or classic), so it knows where to resume.
	Then when resuming, just enable that 'resume' state again. Unless you clear its information, it will remain untouched!
*/
var arcade_score = 0;
var arcade_pause = false;
var arcade_multiplier = 0;
var curplayer,scoreplus;

var arcade_fade = 0.1;

var client_quality = 100;
function arcade_refresh()
{
	this.transition = 0;
	this.tgo = 1;
	this.talpha = 1;
	arcade_pause = false;
	map_reset(this);
	mapobjectCap = 50;
	snowboarding_map_zoom = 0.9;
	arcade_score = 0;
	arcade_multiplier = 0;
	arcade_fade = 0.1;
	try {
		curplayer = new player(0,-100);
	}catch(err) {}
	//map_focus(curplayer.x,curplayer.y);
	this.x = 300;
	this.y = 300;
	this.spawnx = 0;
	this.roundNum = 0;
	this.hill_num = 0;
	this.ice_num = 0;
	this.map_state = 0; // 0 for regular, 1 for hill, 2 for ice;
	this.next_score = 200;
	
}
function arcade_init()
{
	this.start = arcade_refresh;
	curplayer = new player(0,-100);	
	warn = new obj_scoreplus(0,0,1);
	scoreplus10 = new obj_scoreplus(0,0);
	scoreplus5 = new obj_scoreplus(0,0,5);
	snowboarding_arcade.roundNum = 0;
	snowboarding_arcade.next_score = 200;
	arcade_multiplier = 0;
	this.map_state = 0;
	console.log("arcade_reset : "+snowboarding_arcade.next_score);
}

function arcade_update()
{
	if (this.tgo)
		this.talpha-=0.05;
	if (this.talpha<0)
		this.tgo = 0,this.talpha=0;



	if (snowboarding_input_keyboard)
	{
		var left = keystate[k_left].push || keystate[k_a].push;
		var right = keystate[k_right].push || keystate[k_d].push;
		var up = keystate[k_up].push || keystate[k_w].push;
		var down = keystate[k_down].push || keystate[k_s].push;
		var enter = keystate[k_enter].pressed;
	}
	//Possible break this off into a pause menu object of sorts
	if ((enter))
	{
		if ((!curplayer.isdead)&&(!gamestartDelay))
		{
			if (arcade_pause==false) 
				arcade_pause = true;
				else
				arcade_pause = false;
		}
	}
	
	if ((curplayer.isdead)&&(arcade_fade==1))
		{		
		if (enter)
			{
			var pName = ajaxFunction(prompt("Enter your name to submit highscore:",""),Math.round(arcade_score/1000));
			HIGHSCORE_update();
			arcade_refresh();
			snowboarding_menu.enable();
			return false;
			}
		//if (down)
		//	{
		//	arcade_refresh();
		//	snowboarding_menu.enable();
		//	return false;
		//	}
		if ((left)||(right)||(up))
			{
			this.map_state = 0;
			arcade_refresh();
			arcade_init();
			}
		}
	
	if ((!curplayer.isdead)&&(!arcade_pause))
	{

		if (up)
			{
			//snowboarding_map_zoom += 0.05;
			}
		//	else
		//	{
		//	snowboarding_map_zoom -= 0.01;
		//	}
		if (snowboarding_map_zoom > 1.1) snowboarding_map_zoom = 1.1;
		if (snowboarding_map_zoom < 0.1) snowboarding_map_zoom = 0.1;
		if (snowboarding_map_zoom > 0.9) snowboarding_map_zoom -= 0.01;
		if (snowboarding_map_zoom < 0.9) snowboarding_map_zoom += 0.01;
		snowboarding_map_zoom = (Math.round(snowboarding_map_zoom*1000)/1000);
		mapobject_update();
		effect_trail_update();
		effect_trail_new(curplayer.x,curplayer.y,curplayer.angle)
		curplayer.update(left-right,up-down,enter,mousestate);

		if (!curplayer.up)
		{
			if (Math.round(arcade_score/1000)>this.next_score)
				{
				this.next_score = Math.round(arcade_score/1000) + 300 + Math.round(arcade_score/1000);
				this.hill_num=500;
				this.map_state = 1;
				}
			switch (this.map_state)
			{
			case 0:
				var x = 1;
				var s = 0;
				if (left)
					s=-200;
				if (right)
					s=200;
				mapobject_add_type("tree",s,0,x);
				mapobject_add_type("tree",s,0,x);
				mapobject_add_type("tree",s,0,x);
				
					
				if (Math.random()>0.6)
					mapobject_add_type("orb",0,0,x);
				if (Math.random()>0.85)
					mapobject_add_type("log",0,0,x);
				if (Math.random()>0.7)
					mapobject_add_type("speed",0,0,x);
			break;
			case 1:
				
			break;
			}
		}
		
		
		
		if (this.map_state==1){
var x = 1;
				
				//if (snowboarding_map_zoom > 1.1) snowboarding_map_zoom = 1.1;
				//if (snowboarding_map_zoom < 0.85) snowboarding_map_zoom = 0.85;
				//if (snowboarding_map_zoom > 0.9) snowboarding_map_zoom -= 0.01;
				//if (snowboarding_map_zoom < 0.9) snowboarding_map_zoom += 0.01;
				if (this.hill_num>400)
					{
						warn.set(curplayer.x-3,curplayer.y-53);
						this.spawnx = curplayer.x;
					}
				if ((this.hill_num<400)&&(this.hill_num>200))
					{
					snowboarding_map_zoom += 0.03;
					curplayer.boost = 6 + this.roundNum;	
					if (this.roundNum>1)
						{
						mapobject_add_type("tree",this.spawnx+250,curplayer.y+600);
						mapobject_add_type("tree",this.spawnx-250,curplayer.y+600);
						}
						for (var sp = 0; sp<=this.roundNum+1;sp++)
						{
							mapobject_add_type("tree",0,0,x);
						}
					}
				if ((this.hill_num<180)&&(this.hill_num>100))
					{
						mapobject_add_type("orb",curplayer.x-(100*left-right),curplayer.y+600);
						mapobject_add_type("orb",curplayer.x-(100*left-right),curplayer.y+600);
					}
				if (this.hill_num<=0)
					{
						this.roundNum++;
						curplayer.boost = this.roundNum;
						this.hill_num = 0;
						this.map_state = 0;
					}
				if (this.hill_num>0)
					{
						
						this.hill_num--;
					}
					else
					{
						this.map_state = 0;
					}
		
		}
		
		
		
		arcade_score+=((10*curplayer.speed)*delta_speed)*this.roundNum;
		mapobjectCap = 100;
		scoreplus10.update();
		scoreplus5.update();
		warn.update();
		map_offset_y *= 0.99;
		map_focus(curplayer.x,curplayer.y+100+map_offset_y);
	}
	if (snowboarding_client_fps<15)
		client_quality -= 1.5;
	client_quality++;
	return true;
}
function arcade_draw()
{
	visual_opacity(1);
	map_draw_background(snowboarding_loading.img_bak_snow);
	mapobject_draw(curplayer.x);
	if (client_quality>50)
		effect_trail_draw();	
	curplayer.draw();
	mapobject_tree_draw();
	scoreplus10.draw();
	scoreplus5.draw();
	warn.draw();
	if (gamestartDelay)
		image_draw(this.controlsSprite,client_width/2-this.controlsSprite.width/2,150);	
	//Bonus screen blue
	if (this.hill_num)
		{
		visual_font("italic 20px sans-serif");
		visual_colour("#000000");
		var tHill = "Avoid the trees for a bonus!";
		if ((this.hill_num>400)&&(this.map_state))
			text_draw(tHill,client_width/2-text_width(tHill)/2,client_height/2);
		visual_color("#0000AA");
		visual_opacity(0.1);
		if ((!this.hill_num==0))
			rect_draw(0,0,client_width,client_height);
		visual_opacity(1);
		}
	visual_font("bold 12px sans-serif");
	//If player is dead display score screen
	if (curplayer.isdead)
		{		
		
			arcade_fade*=1.05;
			if (arcade_fade>1) 
				arcade_fade = 1;
			visual_opacity(arcade_fade-0.1);
			visual_color("#000000");
			rect_draw(0,0,client_width,client_height);
			visual_opacity(arcade_fade);
			visual_color("#FFFFFF");
			var ax = (arcade_fade-0.1)*100;
			image_draw_scaled(snowboarding_loading.img_score[10],ax,ax,1,1);
			
			text_draw("Submit Score ( enter )",client_width/2-text_width("Submit Score ( enter )")/2,client_height/2);
			text_draw("Restart ( arrows )",client_width/2-text_width("Restart ( arrows )")/2,client_height/2+50);
			
			//Highscore Table
			visual_font("bold 12px sans-serif");
			visual_colour("#000000");
			visual_opacity(0.1);
			rectangle_draw_filled(0,50+ax,275,315);	
			visual_opacity(1);
			visual_colour("#FFFFFF");
			text_draw("Highscores",15+ax,50+ax);
			if (!sname)
				sname = new Array(),sscore = new Array();

			for(var sl=0;sl<12;sl++)
			{
				visual_opacity(0.1);
				visual_colour("#999999");
				rectangle_draw_filled(0,51+ax+(25*sl),275,13);
				visual_colour("#FFFFFF");
				visual_opacity(0.9);
				text_draw((sl+1)+". "+sname[sl],5+ax,65+ax+(25*sl));
				visual_opacity(0.8);
				text_draw(sscore[sl],55+ax,77+ax+(25*sl));
				visual_opacity(1);
			}
		
		}	
	//Flash red if hit
	if (curplayer.hit>0)
		{
		//console.log(curplayer.life);
			curplayer.hit--;
			visual_colour("#DD0000");
			visual_opacity(1.5-(curplayer.life/100));
			rectangle_draw_filled(0,0,client_width,client_height);
			visual_opacity(1);
		}
	//Paused
	if (arcade_pause)
		{
			visual_colour("#000000");
			visual_opacity(0.3);
			rectangle_draw_filled(0,0,client_width,client_height);	
			var pause = "Paused";
			text_draw(pause,client_width/2-text_width(pause)/2,client_height/2);
			visual_opacity(1);
		}
	//Score
	var sc =""+ Math.round(arcade_score/1000);
	var s = new Array;
	s[0] = sc.charAt(sc.length-1);
	s[1] = sc.charAt(sc.length-2);
	s[2] = sc.charAt(sc.length-3);
	s[3] = sc.charAt(sc.length-4);
	s[4] = sc.charAt(sc.length-5);
	s[5] = sc.charAt(sc.length-6);
	if (!s[1])
		s[1] = 0;
	if (!s[2])
		s[2] = 0;
	if (!s[3])
		s[3] = 0;
	if (!s[4])
		s[4] = 0;
	if (!s[5])
		s[5] = 0;
	if (!s[6])
		s[6] = 0;
	var ax = (arcade_fade-0.1)*100;
	image_draw_scaled(snowboarding_loading.img_score[s[0]],ax+90,	ax+20,1,1);
	image_draw_scaled(snowboarding_loading.img_score[s[1]],ax+75,	ax+20,1,1);
	image_draw_scaled(snowboarding_loading.img_score[s[2]],ax+60,	ax+20,1,1);
	image_draw_scaled(snowboarding_loading.img_score[s[3]],ax+45,	ax+20,1,1);
	image_draw_scaled(snowboarding_loading.img_score[s[4]],ax+30,	ax+20,1,1);
	image_draw_scaled(snowboarding_loading.img_score[s[5]],ax+15,	ax+20,1,1);
	//Orb Counter
	image_draw_scaled(snowboarding_loading.img_orb_3,client_width-100-ax,15+ax,0.5,0.5);
	image_draw_scaled(snowboarding_loading.img_orb_4,client_width-100-ax,15+ax,0.5,0.5);
	image_draw_scaled(snowboarding_loading.img_orb_1,client_width-100-ax,15+ax,0.5,0.5);
	text_draw("X  "+arcade_multiplier,client_width-75-ax,30+ax);
	//Round Counter
	image_draw_scaled(this.treeSprite,client_width-200-ax,15+ax,0.2,0.2);
	text_draw("X  "+Math.round(this.roundNum),client_width-165-ax,30+ax);
	//Transition Fade
	visual_opacity(this.talpha);
	visual_color("#000000");
	rect_draw(0,0,client_width,client_height);
}

snowboarding_arcade = new state(arcade_init, arcade_update, arcade_draw);
snowboarding_arcade.clear = arcade_refresh;