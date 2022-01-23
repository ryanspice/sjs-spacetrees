function map_draw_background(image)
{
		if (!snowboarding_is_mobile.any())
		{
		var bx, by, by_first, iw, ih;
		
		iw = Math.round(image.width*snowboarding_client_averagescale*snowboarding_map_zoom);
		ih = Math.round(image.height*snowboarding_client_averagescale*snowboarding_map_zoom);
		by = Math.round((snowboarding_client_height_h+(-snowboarding_map_viewy-snowboarding_client_height_h)*snowboarding_client_yscale*snowboarding_map_zoom) % ih - ih);
		by_first = by;

		for (bx = Math.round((snowboarding_client_width_h+(-snowboarding_map_viewx-snowboarding_client_width_h)*snowboarding_client_xscale*snowboarding_map_zoom) % iw - iw); bx < snowboarding_client_width; bx += iw)
			for (by = by_first; by < snowboarding_client_height; by += ih)
				snowboarding_buffer_context.drawImage(image, bx, by, iw, ih);
		}
		else
		{
		visual_color("#FFFFFF");
		rectangle_draw_filled(0,0,client_width,client_height);
		}
}

function map_focus(x, y)
{
	snowboarding_map_viewx = x-snowboarding_client_width_h;
	snowboarding_map_viewy = y-snowboarding_client_height_h;
}

function map_reset(t)
{
	for(var i = 0; i < e_snow_max; i++)
	{
		 effect_snow_new();
	}
    t.effect_snow_1 = snowboarding_loading.img_effect_snow[0];
    t.effect_snow_2 = snowboarding_loading.img_effect_snow[1];
    t.effect_snow_3 = snowboarding_loading.img_effect_snow[2];
    t.effect_snow_4 = snowboarding_loading.img_effect_snow[3];
    t.effect_snow_5 = snowboarding_loading.img_effect_snow[4];
    t.effect_snow_6 = snowboarding_loading.img_effect_snow[5];
	t.i_snowground = snowboarding_loading.img_background[0];
	t.controlsSprite = snowboarding_loading.img_background[1];
	t.multiplierSprite = snowboarding_loading.img_hud[0];
    t.treeSprite = snowboarding_loading.img_hud[1];
	snowboarding_map_width = 1000; 
	snowboarding_map_height = 1000; 
	snowboarding_map_viewx = 0; 
	snowboarding_map_viewy = 0;

	warn = new obj_scoreplus(0,0,1);
	scoreplus10 = new obj_scoreplus(0,0);
	scoreplus5 = new obj_scoreplus(0,0,5);
	mapobject_clear();
}

function map_read()
{

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || null;  
  var map = "maps/beginners-run.xml";
  console.log("readmap");
  if (requestAnimationFrame==window.msRequestAnimationFrame) {
                    xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET",  map, false);  //Open the file using the GET routine
                    xmlhttp.send(null);  //Send request
                    xmlDoc = xmlhttp.responseXML;  //xmlDoc holds the document information now
                    } 
				else if (requestAnimationFrame==window.mozRequestAnimationFrame) {
                    xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET",  map, false);  //Open the file using the GET routine
                    xmlhttp.send(null);  //Send request
                    xmlDoc = xmlhttp.responseXML;  //xmlDoc holds the document information now
                    } 
				else {
                    xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET",  map, false);  //Open the file using the GET routine
                    xmlhttp.send(null);  //Send request
                    xmlDoc = xmlhttp.responseXML;  //xmlDoc holds the document information now
            }
	classic_map = xmlDoc;
	classic_map_w = xmlDoc.getElementsByTagName("Dimensions")[0].attributes.getNamedItem("Width").nodeValue;
	classic_map_h = xmlDoc.getElementsByTagName("Dimensions")[0].attributes.getNamedItem("Height").nodeValue;
	snowboarding_map_width = classic_map_w;
	snowboarding_map_height = classic_map_h;
	classic_map_n = "Beginners Run";
	classic_map_objects = new Array;
	classic_map_ox = new Array;
	classic_map_oy = new Array;
	classic_map_oy2 = new Array;
	classic_map_oi = new Array;
	function classic_object(id,x,y)	
	{
		this.id = id;
		this.x = x;
		this.y = y;
	}
	var i = 0;
	while (xmlDoc.getElementsByTagName("Object")[i])
	{
		var id, x, y;
		id = xmlDoc.getElementsByTagName("Object")[i].attributes.getNamedItem("id").nodeValue;
		x = xmlDoc.getElementsByTagName("Object")[i].attributes.getNamedItem("x").nodeValue;
		y = xmlDoc.getElementsByTagName("Object")[i].attributes.getNamedItem("y").nodeValue;
		var n = new classic_object(id,x,y);
		classic_map_objects.push(n);
		delete id, x, y, n;
		i++;
	}
	//mapobject_clear();
	for (var i = classic_map_objects.length-1; i>0;i--)
	{
		object_read(classic_map_objects[i].id,classic_map_objects[i].x,classic_map_objects[i].y,i);
		if (classic_map_objects[i].id==15) 
			{
			classic_sx = classic_map_objects[i].x;
			classic_sy = classic_map_objects[i].y;
			};
	}
return true;
}

