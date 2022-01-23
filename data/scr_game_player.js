function character_board(name, skin, glide, handling, lock)
{
	this.name = name;
	this.skin = skin;
	this.glide = glide;
	this.handling = handling;
	this.dlock = lock; // default
	this.lock = lock;
}

function character_init_boards()
{
	//snowboarding_boards.push(new character_board("White", 	snowboarding_loading.img_board[0], 0.3, 0.3, false));
	//snowboarding_boards.push(new character_board("Light", 	snowboarding_loading.img_board[1], 0.5, 0.1, false));
	//snowboarding_boards.push(new character_board("Flame", 	snowboarding_loading.img_board[2], 0.1, 0.5, false));
	//snowboarding_boards.push(new character_board("Cheese", 	snowboarding_loading.img_board[3], 0.3, 0.6, true));
	//snowboarding_boards.push(new character_board("007", 	snowboarding_loading.img_board[4], 0.2, 0.7, true));
	//snowboarding_boards.push(new character_board("Jack", 	snowboarding_loading.img_board[5], 0.7, 0.5, true));
	//snowboarding_boards.push(new character_board("Pie", 	snowboarding_loading.img_board[6], 0.7, 0.9, true));
	//snowboarding_boards.push(new character_board("Blue", 	snowboarding_loading.img_board[7], 1, 1, true));
	//snowboarding_boards.push(new character_board("Insanity",snowboarding_loading.img_board[8]	, 0.5, 0.5, true));
}
var gamestartDelay = 75;

function player(board)
{
	this.board_turning = 8;
	this.board_speed = 8;
	
	this.kill = false;
	this.x = 0;
	this.y = 0;
	
	this.hit = 0;
	this.life = 100;
	this.boost = 0;
	this.ice = 0;
	this.isdead = false;

	this.turning = this.board_turning;
	this.maxspeed = this.board_speed;
	this.accel = this.maxspeed/100;
	
	this.speed = this.board_speed;
	this.speed = 1;
	this.angle = 0;

	this.h_dir = 0;
	this.v_dir = 0;
	this.e_ = 0;
	
	this.update = function update(h_dir,v_dir,e_)
	{
		if (mousestate.push)
			{
			if (mouse_x>client_width/2)
				h_dir = -mousestate.push;
			if (mouse_x<client_width/2)
				h_dir = +mousestate.push;
			if (mouse_y<client_height/3)
				v_dir = +mousestate.push;
			if (mouse_y>client_height-50)
				v_dir = -mousestate.push;
			}			
		if (gamestartDelay>0) 
			h_dir = 0,v_dir = 0,gamestartDelay--;
		if (h_dir!=0)
			this.h_dir = h_dir;
		if (v_dir!=0)
			this.v_dir = v_dir;
		this.speed -=((h_dir*2) * 0.02)+((v_dir)*0.2);
		this.angle *=0.9;
		this.angle += (h_dir)*(this.speed+this.turning/10)/1.5;
		this.boost *= 0.99;
		this.accel = (this.maxspeed/100);
		this.speed +=this.accel;
		if ((v_dir==-1)&&(this.h_dir))
			{
			this.h_dir = -this.h_dir;
			this.angle-=(this.h_dir)*(this.speed+this.turning/10)/10;
			}
		this.speed *= delta_speed;
		if (this.speed < 0.5)
			this.speed = 0.5;
		if (this.speed>this.maxspeed)
			this.speed = this.maxspeed;
		if (v_dir==-1)			
			{
			if(this.boost<1)
				this.boost++;
			}
		if (v_dir==+1)
			{
			if ((this.ice)&&(this.angle!=0))
				scoreplus5.set(this.x,this.y-75),this.speed+=1,arcade_score+=5000;
			if (this.ice==false)
				this.x -= (this.h_dir);
			map_offset_y-=2;
			this.y += this.speed + this.boost * Math.cos(DegToRad(this.angle)) * delta_speed;
			this.angle+=this.h_dir*10;
			this.x -= (Math.sin(DegToRad(this.angle)) * this.turning * this.speed/10)* delta_speed*1.1;
			}
			else
			{
			this.y += this.speed + this.boost * Math.cos(DegToRad(this.angle)) * delta_speed;
			this.x -= (Math.sin(DegToRad(this.angle)) * this.turning * this.speed/10)* delta_speed;
			}
		map_offset_y -= (v_dir) * 1.5;
		this.ice = false;	
		this.checkTrees();
		this.isdead = Math.round((100-this.life)/100);
		if (this.kill)
			this.isdead = true;
	}
	this.draw = function draw()
	{
	this.board = snowboarding_loading.img_board[1];
	this.head = snowboarding_loading.img_player_head_default;
	this.body = snowboarding_loading.img_player_body;
	visual_opacity(1);
	this.scale = 0.7;
		snowboarding_buffer_context.translate(iox(this.x),ioy(this.y));
			snowboarding_buffer_context.rotate(DegToRad(this.angle));
				image_draw_scaled(this.board,this.scale*-this.board.width/2, this.scale*(15-this.board.height/2), this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
				image_draw_scaled(this.body,0-this.body.width/2,0-this.body.height/2, snowboarding_client_xscale*snowboarding_map_zoom, snowboarding_client_yscale*snowboarding_map_zoom);
			snowboarding_buffer_context.rotate(DegToRad(-this.angle));
			snowboarding_buffer_context.rotate(DegToRad(this.angle/3));
				image_draw_scaled(this.head,0-this.head.width/2,0-this.head.height/2, snowboarding_client_xscale*snowboarding_map_zoom, snowboarding_client_yscale*snowboarding_map_zoom);
			snowboarding_buffer_context.rotate(DegToRad(-this.angle/3));
		snowboarding_buffer_context.translate(-iox(this.x),-ioy(this.y));
	}
	this.checkTrees = function ()	
	{
		var chk;
		for(chk=0; chk<mapobjectArray.length;chk++)
		{
			if (!mapobjectArray[chk].type)
				continue;
			if ((mapobjectArray[chk].y>this.y+150)||(mapobjectArray[chk].y<this.y-150)||(mapobjectArray[chk].x<this.x-150)&&(mapobjectArray[chk].x>this.x+150))
				continue;
			var vx, vy, b, by;
			vx = mapobjectArray[chk].x;
			vy = mapobjectArray[chk].y;
			b = Math.pow(this.x - vx,2) + Math.pow(this.y - vy,2);
			//Large
			if (b<16384)
			{
				if (mapobjectArray[chk].type == "log")
				{
					this.ice = true;
					continue;
				}
				//Medium
				if (b<2025)
				{
					if (mapobjectArray[chk].type == "speed")
					{
						this.boost=5;
						scoreplus5.set(this.x,this.y);
						arcade_score+=5000;
						continue;
					}
					//Small
					if (b<1600)
					{
						if (mapobjectArray[chk].type == "tree")
						{
						scoreplus5.set(this.x,this.y);
						arcade_score+=5000;
						}
					}
					//Smaller
					if (b<576)
					{
						if (mapobjectArray[chk].type == "tree")
						{
							var t = 1;
							if (this.x<mapobjectArray[chk].x)
								t = -1;
							this.angle-=(Math.random()*this.speed*10)*t;
							if (this.speed>3) 
								{
									this.speed=this.speed/2;
									this.life-=1+this.speed;
									this.y-=this.speed * delta_speed;
								}
								else
								{
									this.y-=this.speed * delta_speed;
									this.life-=10;
								}
							this.hit = this.speed;
							delete t;
							continue;
						}
						if (mapobjectArray[chk].type == "orb")
						{
							arcade_score+=100000;
							mapobjectArray.splice(chk,1);
							scoreplus10.set(this.x,this.y);
							arcade_multiplier++;
							continue;
						}
					}//End Smaller
				}//End Medium
			}//End Large
			delete vx, vy, b, by;
		}
		delete chk;
	}
}