<?php

function tpdb_open() {
	$server = mysql_connect("localhost","rspice","prA9rEC9uS7a") or die("ERROR - Could not connect to mySQL Server"); 
	mysql_select_db("rspice_snow") or die("ERROR - Could not select database");
}
function tpdb_close()	{
	mysql_close();
}
function sendScores($name, $score)
{
tpdb_open();
		$tpdb_table = "arcade";
		if ($result = mysql_query("INSERT INTO  arcade (name ,score) VALUES ('$name',  '$score')")) 
					{

					} 
					else 
					{
					}
tpdb_close();
}





	sendScores($_GET["name"],$_GET["score"]);
?>