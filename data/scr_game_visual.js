function visual_text_align(align)
{
	snowboarding_buffer_context.textAlign = align;
}

function visual_text_baseline(align)
{
	snowboarding_buffer_context.textBaseline = align;
}

function visual_font(font)
{
	snowboarding_buffer_context.font = font;
}

function visual_color(colour)
{
	snowboarding_buffer_context.fillStyle = colour;
	snowboarding_buffer_context.strokeStyle = colour;
}

function visual_colour(colour)
{
	snowboarding_buffer_context.fillStyle = colour;
	snowboarding_buffer_context.strokeStyle = colour;
}

function visual_opacity(opacity)
{
	snowboarding_buffer_context.globalAlpha = opacity;
}

function line_draw_thick(x1, y1, x2, y2, thickness)
{
	snowboarding_buffer_context.beginPath();
	snowboarding_buffer_context.moveTo(x1, y1);
	snowboarding_buffer_context.lineTo(x2, y2);
	snowboarding_buffer_context.lineWidth = thickness;
	snowboarding_buffer_context.stroke();
}
function line_draw(x1,y1,x2,y2)
{
	snowboarding_buffer_context.beginPath();
    snowboarding_buffer_context.moveTo(x1,y1);
    snowboarding_buffer_context.lineTo(x2,y2);
    snowboarding_buffer_context.stroke();
}

function rect_draw_outline(x, y, width, height, thickness)
{
	snowboarding_buffer_context.beginPath();
	snowboarding_buffer_context.rect(x, y, width, height);
	snowboarding_buffer_context.lineWidth = thickness;
	snowboarding_buffer_context.stroke();
}

function rect_draw(x, y, width, height)
{
	snowboarding_buffer_context.beginPath();
	snowboarding_buffer_context.rect(x, y, width, height);
	snowboarding_buffer_context.fill();
}

function image_load(name)
{
	var image = new Image();
	image.src = "images/" + name + ".png";
	return image;
}

function image_draw(image, x, y)
{
	snowboarding_buffer_context.drawImage(image, x, y, image.width, image.height);
}

function image_draw_rotated(image,x,y,angle)
{
	snowboarding_buffer_context.translate(x,y);
		snowboarding_buffer_context.rotate(DegToRad(angle));
			snowboarding_buffer_context.drawImage(image, -image.width/2, -image.height/2, image.width, image.height);
		snowboarding_buffer_context.rotate(DegToRad(-angle));
	snowboarding_buffer_context.translate(-x,-y);
}

function image_draw_onmap(image, x, y)
{



try {
	snowboarding_buffer_context.drawImage(image, snowboarding_client_width_h+(x-snowboarding_map_viewx-snowboarding_client_width_h)*snowboarding_client_xscale*snowboarding_map_zoom, snowboarding_client_height_h+(y-snowboarding_map_viewy-snowboarding_client_height_h)*snowboarding_client_yscale*snowboarding_map_zoom, image.width*snowboarding_client_averagescale*snowboarding_map_zoom, image.height*snowboarding_client_averagescale*snowboarding_map_zoom);
	}catch(err) {}
}
function image_onmap_pos_x(x)
{
	var xs = snowboarding_client_width_h+(-snowboarding_map_viewx-snowboarding_client_width_h)*snowboarding_client_xscale*snowboarding_map_zoom;
	return xs;
}
function image_onmap_pos_y(y)
{
	var ys = snowboarding_client_height_h+(-snowboarding_map_viewy-snowboarding_client_height_h)*snowboarding_client_yscale*snowboarding_map_zoom;
	return ys;
}

function iox(x)
{
s = snowboarding_client_width_h+(x-snowboarding_map_viewx-snowboarding_client_width_h)*snowboarding_client_xscale*snowboarding_map_zoom;
return s;
}
function ioy(y)
{
s = snowboarding_client_height_h+(y-snowboarding_map_viewy-snowboarding_client_height_h)*snowboarding_client_yscale*snowboarding_map_zoom;
return s;
}


function DegToRad(d) 
{
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}



function image_draw_scaled(image, x, y, xs, ys)
{
	snowboarding_buffer_context.drawImage(image, x, y, image.width*xs, image.height*ys);
}

function image_draw_scaled_onmap(image, x, y, xs, ys)
{
	if (!image)
		return false;
	x = Math.round(x);
	y = Math.round(y);
	snowboarding_buffer_context.drawImage(image, snowboarding_client_width_h+(x-snowboarding_map_viewx-snowboarding_client_width_h)*snowboarding_client_xscale*snowboarding_map_zoom, snowboarding_client_height_h+(y-snowboarding_map_viewy-snowboarding_client_height_h)*snowboarding_client_yscale*snowboarding_map_zoom, image.width*snowboarding_client_averagescale*xs*snowboarding_map_zoom, image.height*snowboarding_client_averagescale*ys*snowboarding_map_zoom);
}

function text_draw(string, x, y)
{
	snowboarding_buffer_context.fillText(string, x, y);
}

function text_draw_onmap(string, x, y)
{
	snowboarding_buffer_context.fillText(string,snowboarding_client_width_h+(x-snowboarding_map_viewx-snowboarding_client_width_h)*snowboarding_client_xscale*snowboarding_map_zoom, snowboarding_client_height_h+(y-snowboarding_map_viewy-snowboarding_client_height_h)*snowboarding_client_yscale*snowboarding_map_zoom);
}



function text_metrics(string)
{
	return snowboarding_buffer_context.measureText(string);
}
function text_width(string)
{
	return snowboarding_buffer_context.measureText(string).width;
}

function line_draw(x1, y1, x2, y2, thickness)
{
	snowboarding_buffer_context.beginPath();
	snowboarding_buffer_context.moveTo(x1, y1);
	snowboarding_buffer_context.lineTo(x2, y2);
	snowboarding_buffer_context.lineWidth = thickness;
	snowboarding_buffer_context.stroke();
}

function rectangle_draw_outline(x, y, width, height, thickness)
{
	snowboarding_buffer_context.beginPath();
	snowboarding_buffer_context.rect(x, y, width, height);
	snowboarding_buffer_context.lineWidth = thickness;
	snowboarding_buffer_context.stroke();
}

function rectangle_draw_filled(x, y, width, height)
{
	snowboarding_buffer_context.beginPath();
	snowboarding_buffer_context.rect(x, y, width, height);
	snowboarding_buffer_context.fill();
}



/*
function image_is_loaded(name)
{
	if (snowboarding_client_img[name]) // Probably makes no real difference? It just checks if its not null (not necessarily whether the image was loaded).
		return true;
		else
		return false;
}
function image_get(name)
{
	// if (snowboarding_client_img[name]) // This is probably pointless, think about it.
	// Just stop the game if loading fails, although your load-testing seems flawed anyway.
	return snowboarding_client_img[name];
}*/