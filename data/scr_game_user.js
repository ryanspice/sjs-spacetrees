function user(name, hat, dboard)
{
	this.name = name;
	this.hat = 0;
	this.dboard = 0;
	// this.achievements = new Array();
	// stuff like that...
}

function user_reset()
{
	snowboarding_user_player.name = "Guest"; // Max username characters = 16
	snowboarding_user_player.hat = 0;
	snowboarding_user_player.dboard = 0;
	foreach (board in snowboarding_boards)
	{
		board.lock = board.dlock;
	}
}

// function user_register
// function user_login
// function user_signout = user_reset