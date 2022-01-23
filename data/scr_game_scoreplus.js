var scoreplusArray = new Array;
var scoreplusDelay = 0;
var scoreplusDelayTime = 30;
function obj_scoreplus(x,y,type)	
{
		this.image = image_load("gameplay/imageGamePlus10");
		this.x;
		this.y;
		this.offx;
		this.offy;
		this.create = function(x,y)	
			{
			if (type==5)
				this.image = image_load("gameplay/imageGamePlus5");
			if (type==1)
				this.image = image_load("gameplay/warn_0");
			this.x = x;
			this.y = y;
			this.offx = this.image.width;
			this.offy = this.image.height/2;
			this.alpha = 1;
			}
		this.draw = function()	
			{
			visual_opacity(this.alpha);
			image_draw_onmap(this.image,this.x,this.y-this.offy);
			visual_opacity(1);
			}
		this.update = function()	
			{
			this.y*=0.9999;
			this.alpha*=0.9;
			}
		this.set = function(x,y)
			{
			this.x = Math.round(x);
			this.y = Math.round(y);
			this.alpha = 1;
			}
	this.init = this.create(x,y);
}