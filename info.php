<?php
include_once dirname(__FILE__)."/libraries/getid3/getid3.php";
// Initialize getID3 engine
$getID3 = new getID3;

// Analyze file and store returned data in $ThisFileInfo
$file = @$_GET['file'];
if($file != '')
{
$ThisFileInfo = $getID3->analyze($file);

if(isset($ThisFileInfo['tags']['id3v1']))
echo json_encode($ThisFileInfo['tags']['id3v1']);
else if(isset($ThisFileInfo['tags']['id3v2']))
echo json_encode($ThisFileInfo['tags']['id3v2']);
else if(isset($ThisFileInfo['tags']['id3v3']))
echo json_encode($ThisFileInfo['tags']['id3v3']);
else
echo "{}";
}
?>