<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.custom-scrollbar.js"></script>
<script type="text/javascript" src="js/wavesurfer.min.js"></script>
<script type="text/javascript" src="js/equalizer.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css" href="css/jquery.custom-scrollbar.css">


<title>Web Music Player</title>

<script type="text/javascript">
$(document).ready(function(e) {
    $('#playlist').customScrollbar({updateOnWindowResize:true});
});

</script>
</head>

<body>


<div id="demo">
<div class="section group">
	<div class="col span_1_of_3">
        <div id="equalizer">
            <!-- Here be equalizer sliders -->
        </div>
	</div>
	<div class="col span_1_of_3">
    	<div id="info-wrapper">
        <div id="info" data-style="ss-container">
        </div>
        </div>
	</div>
	<div class="col span_1_of_3">
    	<div id="picture-container">
        <div id="picture" style="background-repeat:no-repeat; background-position:center center;">
        </div>
        </div>
	</div>
</div>

    
    
    <div class="clear"></div>
    <div id="waveform">
        <div class="progress progress-striped active" id="progress-bar">
            <div class="progress-bar progress-bar-info"></div>
        </div>

        <!-- Here be the waveform -->
    </div>

    <div class="controls main-controls">
    	<span id="status"></span>
        <span id="volume-container">
        <input type="range" min="0" max="1" value="0.8" step="0.01" id="main-volume" title="Volume">
        </span>
        <button class="btn btn-primary" data-action="play" title="Play">
            <span class="btn-icon btn-icon-play"></span>
            <span class="btn-text">Play</span>
        </button>
        <button class="btn btn-primary" data-action="pause" title="Pause">
            <span class="btn-icon btn-icon-pause"></span>
            <span class="btn-text">Pause</span>
        </button>
        <button class="btn btn-primary" data-action="stop" title="Stop">
            <span class="btn-icon btn-icon-stop"></span>
            <span class="btn-text">Stop</span>
        </button>

    </div>
    
    <div id="playlist-wrapper">
    <div id="playlist" class="container" data-style="ss-container">
    <ul>
    <?php
	$dir = dirname(__FILE__)."/collection";
	if ($handle = opendir($dir)) 
	{
		$i = 1;
		while (false !== ($entry = readdir($handle))) {
	
			if ($entry != "." && $entry != "..") {
				?>
                <li><a href="#" class="music-item" data-action="play-item" data-id="<?php echo $i;?>" data-path="<?php echo "collection/$entry";?>"><?php echo basename("$entry");?></a></li>
                <?php
				$i++;
			}
		}
	
		closedir($handle);
	}
	?>
    </ul>
    
    </div>
    </div>
    
</div>
</body>
</html>
