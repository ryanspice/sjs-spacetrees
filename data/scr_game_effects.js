var trailArray = new Array;
var trailPop = 0;
var createDelay = 2, trailDelay = 0;

function effect_trail(x,y,angle)	{
	this.x = x;
	this.y = y;
	this.offx;
	this.offy;
	this.self;
	this.angle = angle;
	this.image = new Image;
	//this.status = Math.floor(Math.random()*30);
	//this.speed;
	//this.life;
	this.create = function(x,y,angle)	{
		//this.self = sCon;
		//this.speed = sSpeed;
		//this.life = 80 + this.speed;
		this.x = x;
		this.y = y;
		this.alpha = 0.7;
		this.image = image_load("gameplay/imageGameSnowtrail");
		this.offx = -this.image.width/2;
		this.offy = -this.image.height/2;
		if (!angle==null)
			this.angle = angle;
			else
			this.angle = 0;
		this.angle = angle;
	}
	this.draw = function(angle)	{
		//this.angle = angle;
		this.x = Math.round(x);
		this.y = Math.round(y);
		visual_opacity(this.alpha);
		var mapsetx = Math.round(snowboarding_client_width_h+(this.x-snowboarding_map_viewx-snowboarding_client_width_h)*snowboarding_client_xscale*snowboarding_map_zoom);
		var mapsety = Math.round(snowboarding_client_height_h+(this.y-snowboarding_map_viewy-snowboarding_client_height_h)*snowboarding_client_yscale*snowboarding_map_zoom);
		snowboarding_buffer_context.translate(mapsetx,mapsety);
			snowboarding_buffer_context.rotate(DegToRad(this.angle));
				image_draw_scaled(this.image,this.offx,this.offy, snowboarding_client_xscale*snowboarding_map_zoom, snowboarding_client_yscale*snowboarding_map_zoom);
			snowboarding_buffer_context.rotate(DegToRad(-this.angle));
		snowboarding_buffer_context.translate(-mapsetx,-mapsety);
		visual_opacity(-this.alpha);
	}
	this.update = function()	{
				if (this.y<snowboarding_map_viewy)
				{
				trailArray.shift();
				//this.x = curplayer.x;
				//this.y = curplayer.y;
				//this.angle = curplayer.angle
					//this.create(curplayer.x,curplayer.y,curplayer.angle);
				}
	}
	this.init = this.create(x,y,angle);
}
function effect_trail_draw(angle)	{
	for(i=0; i<trailArray.length;i++)
		{
		trailArray[i].draw(angle);
		}
}
function effect_trail_update()	{
	for(i=0; i<trailArray.length;i++)
		{
		trailArray[i].update();
		}
}
function effect_trail_clear()	{
	trailArray = new Array();
}

function effect_trail_new(x,y,angle)	{
	if (trailArray.length<40)
		{
		var newTrail = new effect_trail(x,y,angle);
		trailArray.push(newTrail);
		delete newTrail;
		}
}

////AVALANCHE EFFECTS
e_avelanche = new Array;
e_avelanche_off_y = 0;
e_avelanche_go = -10;
e_ave_pos = 0;

var e_ave_start = 0;
var e_ave_off = -20;

function effect_avelanche_draw()	
{
	for(i=0; i<e_avelanche.length;i++)
		{
		e_avelanche[i].draw();
		}
}
function effect_avelanche_update()	
{
	for(i=0; i<e_avelanche.length;i++)
		{
		e_avelanche[i].update();
		}
}
function effect_avelanche_clear()
{
	e_avelanche = new Array();
}
function effect_avelanche_new()
{
	if (e_avelanche.length<15)
		{
		var newA = new effect_avelanche();
		e_avelanche.push(newA);
		delete(newA);
		}
}
function effect_avelanche()	
{
	this.images = new Array();
	e_ave_pos = curplayer.x +(-200+(curplayer.maxspeed-curplayer.speed)-curplayer.boost);
	e_ave_start = curplayer.x-200;
	this.create = function()	
	{
		this.x = curplayer.x - 500 + (Math.random()*snowboarding_client_width+100);
		this.start = 0;
		//this.y = curplayer.y +(-200+(curplayer.maxspeed-curplayer.speed)-curplayer.boost);
		this.y = e_ave_start;
		this.y += e_ave_off;
		this.offx;
		this.offy;
		this.angle = Math.round((Math.random()*15)-7);
		this.scale = 3+Math.round(Math.random()*4);
		this.speed = curplayer.speed;
		this.life = 300;
		this.images[0] = snowboarding_arcade.effect_snow_1;
		this.images[1] = snowboarding_arcade.effect_snow_2;
		this.images[2] = snowboarding_arcade.effect_snow_3;
		this.images[3] = snowboarding_arcade.effect_snow_4;
		this.images[4] = snowboarding_arcade.effect_snow_5;
		this.images[5] = snowboarding_arcade.effect_snow_6;
		this.image = this.images[Math.round(Math.random()*5)];
	}
	this.draw = function()	
	{

	//image_draw_scaled(this.image,this.x,this.y, this.scale*2,this.scale);
		snowboarding_buffer_context.translate(iox(this.x),ioy(this.y));
			snowboarding_buffer_context.rotate(DegToRad(this.angle));
				
				visual_opacity(0.1);
				visual_color("#aaaaaa");
				//rectangle_draw_filled(-this.image.width/2,75-this.image.height/2,this.image.width*this.scale*3,this.image.height);
				//image_draw_scaled(this.image1,0,0, this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
				visual_opacity(1);
				////image_draw_scaled(this.image,-this.image.width/2,0, this.scale*4,this.scale);
				//image_draw_scaled(this.image,-this.image.width/2,-125, this.scale*8,this.scale);
			snowboarding_buffer_context.rotate(DegToRad(-this.angle));
		snowboarding_buffer_context.translate(-iox(this.x),-ioy(this.y));
	visual_color("#000000");
	//rectangle_draw_filled(0,0,600,ioy(e_ave_start));
				
	}
	this.update = function()	
	{
	e_ave_start = curplayer.y - 200 - curplayer.speed;
//e_ave_start +=curplayer.speed;
				this.life-=25;
				if (this.life<=0)
				{
					this.create();
					//if (curplayer.up)
					//	e_avelanche_off_y+=e_avelanche_go;
					//	else
					//	e_avelanche_off_y *=0.999;
					//e_avelanche_go = 0;
				}
				else
				{
					//this.y+=5+(curplayer.maxspeed - curplayer.speed)-curplayer.boost;
				}
				e_ave_off+=0.1;
				if (this.y<this.pos+15)
					this.y+=5;
				if (this.y>this.pos-15)
					this.y-=5;
				//e_avelanche_off_y+=curplayer.speed;
				if (curplayer.up)
					{e_ave_off+=0.5;}
				if (curplayer.down)
					{e_ave_off-=0.5;}
				if (ioy(this.y)>ioy(curplayer.y-50))
					{
					//curplayer.isdead=true;
					}
	}
	this.init = this.create();
}











///////SNOWBOARD effects
e_snow = new Array;
e_snow_max = 5;
e_snow_off_y = 0;
e_snow_go = -10;
function effect_snow_draw()	
{
	for(i=0; i<e_snow.length;i++)
		{
		e_snow[i].draw();
		}
}
function effect_snow_update()	
{
	for(i=0; i<e_snow.length;i++)
		{
		e_snow[i].update();
		}
}
function effect_snow_clear()
{
	e_snow = new Array();
}
function effect_snow_new()
{
	if (e_snow.length<e_snow_max)
		{
		var newA = new effect_snow();
		e_snow.push(newA);
		delete(newA);
		}
}
function effect_snow()	
{
	this.images = new Array();
this.images[0] = snowboarding_arcade.effect_snow_1;
this.images[1] = snowboarding_arcade.effect_snow_2;
this.images[2] = snowboarding_arcade.effect_snow_3;
this.images[3] = snowboarding_arcade.effect_snow_4;
this.images[4] = snowboarding_arcade.effect_snow_5;
this.images[5] = snowboarding_arcade.effect_snow_6;
	this.h_dir = 0;
	this.create = function()	
	{
	var t = (Math.random()*25);		
		if (curplayer.angle>0)
			t = -t;
		if((curplayer.angle<10)&&(curplayer.angle>-10))
		 t = 1;
		this.x = curplayer.x;
		this.y = curplayer.y;
		this.x += t/2;
		this.y += t*t/50;
		this.offx;
		this.offy;
		
		
		this.angle = Math.random()*360;
		this.alpha = 1;
		this.scale = 1;
		this.speed = 1;
		this.life = 10+(Math.random()*5*curplayer.speed);
		this.image = this.images[Math.round(Math.random()*5)];
	}
	this.draw = function()	
	{
		visual_opacity(this.alpha);
		snowboarding_buffer_context.translate(iox(this.x),ioy(this.y));
			snowboarding_buffer_context.rotate(DegToRad(this.angle));
				image_draw_scaled(this.image,-this.image.width/2,-this.image.height/2, this.scale,this.scale);
			snowboarding_buffer_context.rotate(DegToRad(-this.angle));
		snowboarding_buffer_context.translate(-iox(this.x),-ioy(this.y));
		visual_opacity(1);
	}
	this.update = function()	
	{
	this.h_dir = curplayer.h_dir;
				this.life-=5;
				if (this.life<=0)
				{
					this.create();
				}
					this.y-=curplayer.speed/3;
					if (curplayer.up)
						this.alpha = 0;
					//this.alpha-=0.1;
	}
	this.init = this.create();
}