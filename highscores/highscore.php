<center>
<script>
	var sid=new Array, sname=new Array, sscore=new Array, stime=new Array, sa=new Array, sb=new Array;
	function addScore(id,name,score,time,a,b)
	{
	if(this)
	{
	console.log("addScore");
	this.sid.push(id);
	this.sname.push(name);
	this.sscore.push(score);
	this.stime.push(time);
	this.sa.push(a);
	this.sb.push(b);
	}
	}
</script>

<?php
function tpdb_open() {
	$server = mysql_connect("localhost","rspice","prA9rEC9uS7a") or die("ERROR - Could not connect to mySQL Server"); 
	mysql_select_db("rspice_snow") or die("ERROR - Could not select database");
}
function tpdb_close()	{
	mysql_close();
}
//SCORE UPLOADING vv
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
//UPLOADING ^^
//recieveScores - reads then values from the table
function recieveScores()
{
tpdb_open();
		//$tpdb_table = "arcade";
		$result = mysql_query("SELECT * FROM  arcade ORDER BY score DESC");
				//$result = mysql_query("SELECT * FROM  projects ORDER BY pjId DESC LIMIT 1");
		$count = mysql_num_rows($result);
		if ($count == 0)
			{
			} else 
			{
				while($row = mysql_fetch_array($result))
					{
					printScores($row['id'],$row['name'],$row['score'],$row['time'],$row['a'],$row['b']);
					}
			}
tpdb_close();
}
//printScore - Echo score uniformly
function printScores($id,$name,$score,$time,$a,$b)
{
	echo "<script language=javascript>addScore($id,'$name',$score,$time,$a,$b)</script>";
}
recieveScores();
?>

</center>