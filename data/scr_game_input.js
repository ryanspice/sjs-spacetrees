/*
See: http://msdn.microsoft.com/en-us/library/windows/desktop/dd375731%28v=vs.85%29.aspx
Convert codes from Hexadecimal to Decimal, then add constants like: kEnter = 13

(See the current constant list below comment section.)

Note: ASCII codes.
0 = 48
1 = 49
2 = 50
3 = 51
4 = 52
5 = 53
6 = 54
7 = 55
8 = 56
9 = 57

A = 65
B = 66
C = 67
D = 68
E = 69
F = 70
G = 71
H = 72
I = 73
J = 74
K = 75
L = 76
M = 77
N = 78
O = 79
P = 80
Q = 81
R = 82
S = 83
T = 84
U = 85
V = 86
W = 87
X = 88
Y = 89
Z = 90

Keysate usage example:
function init()
{
	// List all you want to track.
	input_track_key(k_up);
	input_track_key(k_down);
	input_track_key(k_enter);
}

// Check keystate like this:
if (keystate[k_enter].push)
// or
if (keystate[k_enter].pressed)
// or
if (keystate[k_enter].released)
*/

var k_left = 37, k_right = 39, k_up = 38, k_down = 40, k_enter = 13, k_shift = 16, k_e = 69 , k_r = 82;
var k_w = 87;
var k_a = 65;
var k_s = 83;
var k_d = 68;

function Trigger()
{
	this.push = false;
	this.previous = false; // Previous state of 'Push.'

	this.pressed = false;
	this.released = false;
}

var mouse_x = 0, mouse_y = 0;
var mousestate = new Trigger();
var keystate = new Array();
//var touch = new Array();

// IE friendly.
//var addEventListener = document.documentElement.addEventListener||document.documentElement.attachEvent;
//var removeEventListener = document.documentElement.removeEventListener||document.documentElement.detachEvent;
//...
//delete addEventListener;
//delete removeEventListener;

function input_track_key(code)
{
	keystate[code] = new Trigger();
}

function input_update()
{
	if (snowboarding_input_mouse)
	{
		if (mousestate.push != mousestate.previous)
		{
			mousestate.pressed = mousestate.push;
			mousestate.released = !mousestate.push;
		}
		else
		{
			mousestate.pressed = false;
			mousestate.released = false;
		}

		mousestate.previous = mousestate.push;
	}

	if (snowboarding_input_keyboard)
	{
		var i, key;
		for (i in keystate)
		{
			key = keystate[i];
			if (key.push != key.previous)
			{
				key.pressed = key.push;
				key.released = !key.push;
			}
			else
			{
				key.pressed = false;
				key.released = false;
			}

			key.previous = key.push;
		}

		delete i, key;
	}
}

function _input_onmousemove(evt)
{
	mouse_x = evt.clientX - snowboarding_input_canvas.offsetLeft;
	mouse_y = evt.clientY - snowboarding_input_canvas.offsetTop;
}

function _input_onmousedown(evt)
{
	mousestate.push = true;
}

function _input_onmouseup(evt)
{
	mousestate.push = false;
}

document.documentElement.onmousemove = _input_onmousemove;
document.documentElement.onmousedown = _input_onmousedown;
document.documentElement.onmouseup = _input_onmouseup;

function _input_onkeydown(evt)	
{
	if (keystate[evt.keyCode])
	{
		keystate[evt.keyCode].push = true;
	}
}

function _input_onkeyup(evt)
{
	if (keystate[evt.keyCode])
	{
		keystate[evt.keyCode].push = false;
	}
}

document.documentElement.onkeydown = _input_onkeydown;
document.documentElement.onkeyup = _input_onkeyup;