function state(init, update, draw)
{
	this.init = init;
	this.update = update;
	this.draw = draw;
	this.clear = null; // To reset variables etc.

	this.enable = function enable()
	{
		snowboarding_state = this;
		console.log(this);
	}
}

/* To use:
	Declaring states (e.g.)
var arcade = new state(arcade_init, arcade_update, arcade_draw);

	Calling the state (i.e.)

state.init();

	or

snowboarding_state.update();
snowboarding_state.draw();

	or

state.clear();

	Defining data values (in init function)
this.data = value;

	Note: Please use init and clear explicitly. They should be managed.
*/