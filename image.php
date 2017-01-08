<?php
include_once dirname(__FILE__)."/libraries/getid3/getid3.php";
// Initialize getID3 engine
$getID3 = new getID3;

// Analyze file and store returned data in $ThisFileInfo
$file = @$_GET['file'];
if($file != '')
{
$ThisFileInfo = $getID3->analyze($file);
if(isset($ThisFileInfo['comments']['picture'][0]['data']))
{
	header("Content-Type: image/jpeg");
	$source = imagecreatefromstring($ThisFileInfo['comments']['picture'][0]['data']);
	$width = imagesx($source);
	$height = imagesy($source);
	
	$percent = 240/$height;

	$newwidth = (int)($width * $percent);
	$newheight = (int)($height * $percent);
	
	if($newwidth > 240)
	{
		$percent = 240/$width;
	
		$newwidth = (int)($width * $percent);
		$newheight = (int)($height * $percent);
	}
	
	// Load
	$thumb = imagecreatetruecolor($newwidth, $newheight);
	
	// Resize
	imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
	
	// Output
	imagejpeg($thumb, null, 80);
}
else
{
	header("Content-Type: image/gif");
	$image = imagecreatefromstring(base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'));
	imagegif($image);
}
}
?>