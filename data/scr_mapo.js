var mapobjectArray = new Array;
var mapobjectDelay = 0;
var mapobjectDelayTime = 25;
var mapobjectCap = 30;
var mapobjectIdNext = 0;
var mapdrawnumber = 0;
function mapobject_update()	
{
	for(i=0; i<mapobjectArray.length;i++)
		{
			mapobjectArray[i].update();
		}
}
function mapobject_draw()	
{
	for(i=0; i<mapobjectArray.length;i++)
		{
		if((mapobjectArray[i].type!="tree")&&(mapobjectArray[i].type!="flag"))
			{
				mapobjectArray[i].draw();
			}
		}
}
function mapobject_tree_draw()
{
	for(i=0; i<mapobjectArray.length;i++)
		{
		if((mapobjectArray[i].type=="tree")||(mapobjectArray[i].type=="flag"))
			{
				mapobjectArray[i].draw();
			}
		}
}
function mapobject_delete(t)
{
	for(i=0; i<mapobjectArray.length;i++)
	{
		if (ioy(mapobjectArray[i].y) < 0)
		{
			mapobjectArray.splice(i,1);
		}
	}
}
function mapobject_clear()	
{
	mapobjectArray = new Array;
	mapobjectIdNext = 0;
}
function mapobject_add_type(type,x,y,z)
{
	if ((mapobjectDelay == 0)&&(mapobjectArray.length<mapobjectCap))
		{
			var newmapobject = new mapobject(type,x,y,z);
			mapobjectArray.push(newmapobject);
			mapobjectIdNext++;
			mapobjectDelay = mapobjectDelayTime;
			mapobject_sorts();
		} 
	else 
		{
			mapobjectDelay -= 1;
		}
	delete newmapobject;
}
function mapobject_add_tree(x,y)
{
	var newmapobject = new mapobject("tree",x,y,1);
	mapobjectArray.push(newmapobject);
	mapobjectIdNext++;
	mapobjectDelay = mapobjectDelayTime;
}
function mapobject_sorts()
{
}


function mapobject(type,x,y,z)	
{
		this.firstx = x;
		this.classicy = y;
		this.b = 0;
		this.type = type;

		this.id;
		this.depth = null;
		this.scale = 1;
		this.alpha = 1;
		this.x = x;
		this.y = null;
		this.w;
		this.offx = -50;
		this.offy = 0;
		this.solid = true;
		this.distchk = 25;
		this.angle = 0;
		this.mapx = image_onmap_pos_x(this.x+this.offx);
		this.mapy = image_onmap_pos_y(this.y+this.offy);
		
		
		this.type = type;
		this.typei = Math.round(Math.random()*2);
		this.x = x;
		this.y = y;
		this.z = z;
		this.image;
		
		this.animate = false;
		this.ani = new Array;
		this.aniT = snowboarding_client_fps/5;
		this.aniCT = 0;
		this.aniC = 0;
		this.aniS = 0;
		
		
		if((this.type==17)||(this.type==18)||(this.type==19))
			this.type = "tree";
		if((this.type==4))
			this.type = "orb";
		if((this.type==7))
			this.type = "log";
		if((this.type==3))
			this.type = "ice";
		if((this.type==14))
			this.type = "speed";
			
		
		this.create = function()	
			{
			this.id = mapobjectIdNext;
			mapobjectIdNext++;
			if (this.z)
				this.x=Math.round(curplayer.x+(Math.random()*1200)-600),this.y=Math.round(curplayer.y+380+(Math.random()*600));
			switch (this.type)
			{
				case "ice":
				
				break;
				case "log":
					
					var r = Math.round(Math.random());
					if (r==1)
						{
						this.image = snowboarding_loading.img_ice_2;
						}
						else
						{
							this.image = snowboarding_loading.img_ice_1;
							for(var n = Math.round(Math.random(5)+1);n>0;n--)
							{
								mapobject_add_type("log",this.x+(n*25),this.y+this.image.height/4);
							}	
						}
					this.angle+=Math.random()*360;
				break;
				case "tree":
					if (this.typei)
						{
						switch(this.typei)
							{
							case 0:
								this.image = snowboarding_loading.img_tree_1;
								this.img_shadow = snowboarding_loading.img_tree_shadow1;
							break;
							case 1:
								this.image = snowboarding_loading.img_tree_2;
								this.img_shadow = snowboarding_loading.img_tree_shadow2;
							break;
							case 2:
								this.image = snowboarding_loading.img_tree_3;
								this.img_shadow = snowboarding_loading.img_tree_shadow3;
							break;
							}
						}
						else
						{
							this.image = snowboarding_loading.img_tree_1;
							this.img_shadow = snowboarding_loading.img_tree_shadow1;
						}
					this.offy -= 110;
					var r = Math.round(Math.random()*2)-1;
					if (r)
						{
							for(var n = Math.round(Math.random(2)+1);n>0;n--)
							{
								mapobject_add_type("tree",this.x+(n*25*r),this.y-this.image.height/4);
							}	
						}
				break;
				case "orb":
					this.scale = snowboarding_loading.img_orb_scale;
					this.image = snowboarding_loading.img_orb_3;
					this.image1 = snowboarding_loading.img_orb_4;
					this.image2 = snowboarding_loading.img_orb_1;
				break;
				case "speed":
					this.scale = snowboarding_loading.img_speed_scale;
					this.animate = true;
					this.ani[0] = snowboarding_loading.img_speed_1;
					this.ani[1] = snowboarding_loading.img_speed_2;
					this.ani[2] = snowboarding_loading.img_speed_3;
					this.ani[3] = snowboarding_loading.img_speed_4;
					this.aniS = this.ani.length;
				break;
				case "logd":
					this.scale = snowboarding_loading.img_log_scale;
					this.image = snowboarding_loading.img_log_1;
				break;
			}
			this.offx = 0;
			this.offy = 0;
			}
		this.update = function()	
			{	
				this.depth = -ioy(this.y);
				if(this.type=="orb")
					{
					this.angle+=10;
					}
				if(this.type=="log")
					{
					this.clearice();
					}
					
				//Animation Stuff
				if (this.animate)
				{
					this.aniT = Math.round(snowboarding_client_fps/4*delta_speed);
					if (this.aniCT>this.aniT)
						this.aniC++,this.aniCT=0;
						else
						this.aniCT++;
					if (this.aniC>this.aniS)
						this.aniC = 0;
				}	//End Animation Stuff
				this.mapx = image_onmap_pos_x(this.x);
				this.mapy = image_onmap_pos_y(this.y);
				
				
				if ((ioy(this.y)<0)&&(this.z))
				{
					mapobject_delete(this);
				}
			}
		this.draw = function()	
			{
			if (this.ani[this.aniC])
			{
				this.image = this.ani[this.aniC];
				image_draw_scaled_onmap(this.image,this.x-this.image.width/2,this.y-this.image.height/2+this.offy, this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
			}
			else
				{
				if (this.type=="tree")
					this.offy=-45;
				visual_opacity(this.alpha);
					if (this.angle==0)
						{
							if (this.image)
								image_draw_scaled_onmap(this.image,this.x-this.image.width/2,this.y-this.image.height/2+this.offy, this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
							if (this.image1)
								image_draw_scaled_onmap(this.image1,this.x-this.image1.width/2,this.y-this.image1.height/2+this.offy, this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
							if (this.image2)
								image_draw_scaled_onmap(this.image2,this.x-this.image2.width/2,this.y-this.image2.height/2+this.offy, this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
						}
						else
						{
						snowboarding_buffer_context.translate(iox(this.x),ioy(this.y));
							snowboarding_buffer_context.rotate(DegToRad(this.angle));
								if (this.image)
									image_draw_scaled(this.image,0-this.image.width/2,-this.image.height/2+this.offy, snowboarding_client_xscale*snowboarding_map_zoom, snowboarding_client_yscale*snowboarding_map_zoom);
								if (this.image1)
									image_draw_scaled(this.image1,0-this.image1.width/2,-this.image1.height/2+this.offy, this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
								if (this.image2)
									image_draw_scaled(this.image2,0-this.image2.width/2,-this.image2.height/2+this.offy, this.scale*snowboarding_client_xscale*snowboarding_map_zoom, this.scale*snowboarding_client_yscale*snowboarding_map_zoom);
							snowboarding_buffer_context.rotate(DegToRad(-this.angle));
						snowboarding_buffer_context.translate(-iox(this.x),-ioy(this.y));
						}
				}
			}
		this.drawshadow = function()
			{
				if (this.img_shadow)
					image_draw_scaled_onmap(this.img_shadow,20+this.x-this.img_shadow.width/2,this.y-(this.img_shadow.height/2)-50,this.scale,this.scale);
			}
		this.clearice = function()
		{
			var chk;
			var vx, vy, b, by;
			for(chk=0; chk<mapobjectArray.length;chk++)
			{
				if ((mapobjectArray[chk].y>this.y+280)||(mapobjectArray[chk].y<this.y-280)||(mapobjectArray[chk].x<this.x-280)&&(mapobjectArray[chk].x>this.x+280))
					continue;
				if (!mapobjectArray[chk].type)
					continue;
				if (!mapobjectArray[chk].type=="tree")
					continue;
				vx = mapobjectArray[chk].x;
				vy = mapobjectArray[chk].y;
				b = Math.pow(this.x - vx,2) + Math.pow(this.y - vy,2);
				if (b<16300)
					{
					if (mapobjectArray[chk].type=="tree")
						{
						mapobjectArray.splice(chk,1);
						}
					if (b>600)
						{
						mapobjectArray.splice(chk,1);
						}
					}
			}
			delete chk,vx,vy,b,by;
		}
	this.init = this.create();
}