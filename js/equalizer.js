'use strict';
if (window.XMLHttpRequest) 
{
	var xhr = new XMLHttpRequest();
} 
else 
{
	var xhr = new ActiveXObject("Microsoft.XMLHTTP");
}		
String.prototype.capitalizeFirstLetter = function() {
    var sa = this.replace(/-/g,' ');
    var saa = sa.toLowerCase();
    var sb = saa.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    var sc = sb.replace(/\s+/g, ' ');
    return sc;
}

var wavesurfer = Object.create(WaveSurfer);
var eqObj = {};
var EQ = [
	{
		f: 32,
		type: 'lowshelf'
	}, {
		f: 64,
		type: 'peaking'
	}, {
		f: 125,
		type: 'peaking'
	}, {
		f: 250,
		type: 'peaking'
	}, {
		f: 500,
		type: 'peaking'
	}, {
		f: 1000,
		type: 'peaking'
	}, {
		f: 2000,
		type: 'peaking'
	}, {
		f: 4000,
		type: 'peaking'
	}, {
		f: 8000,
		type: 'peaking'
	}, {
		f: 16000,
		type: 'highshelf'
	}
];
var presetEQ1 = [
	{
		f: 32,
		type: 'lowshelf',
		value: 10
	}, {
		f: 64,
		type: 'peaking',
		value: 14
	}, {
		f: 125,
		type: 'peaking',
		value: 9
	}, {
		f: 250,
		type: 'peaking'
	}, {
		f: 500,
		type: 'peaking'
	}, {
		f: 1000,
		type: 'peaking'
	}, {
		f: 2000,
		type: 'peaking'
	}, {
		f: 4000,
		type: 'peaking'
	}, {
		f: 8000,
		type: 'peaking',
		value: 10
	}, {
		f: 16000,
		type: 'highshelf',
		value: 5
	}
];
var presetEQ2 = [
	{
		f: 32,
		type: 'lowshelf',
		value: -14
	}, {
		f: 64,
		type: 'peaking',
		value: -12
	}, {
		f: 125,
		type: 'peaking',
		value: -3
	}, {
		f: 250,
		type: 'peaking'
	}, {
		f: 500,
		type: 'peaking'
	}, {
		f: 1000,
		type: 'peaking'
	}, {
		f: 2000,
		type: 'peaking'
	}, {
		f: 4000,
		type: 'peaking'
	}, {
		f: 8000,
		type: 'peaking',
		value: 7
	}, {
		f: 16000,
		type: 'highshelf',
		value: 5
	}
];
var presetEQ3 = [
	{
		f: 32,
		type: 'lowshelf',
		value: 0
	}, {
		f: 64,
		type: 'peaking',
		value: 0
	}, {
		f: 125,
		type: 'peaking',
		value: 0
	}, {
		f: 250,
		type: 'peaking'
	}, {
		f: 500,
		type: 'peaking'
	}, {
		f: 1000,
		type: 'peaking'
	}, {
		f: 2000,
		type: 'peaking'
	}, {
		f: 4000,
		type: 'peaking',
		value: 8
	}, {
		f: 8000,
		type: 'peaking',
		value: 11
	}, {
		f: 16000,
		type: 'highshelf',
		value: 9
	}
];

function initEQData(data)
{

	// Create filters
	var eqData = data || '';
	if(eqData == '') eqData = '{}';
	var eqObj2 = JSON.parse(eqData);
	
	var filters = EQ.map(function (band) {
		var filter = wavesurfer.backend.ac.createBiquadFilter();
		filter.type = band.type;
		
		var val = 0;
		if(typeof eqObj2[band.f] != 'undefined')
		val = eqObj2[band.f];
		else
		val = 5;			
		filter.gain.value = val;
		filter.Q.value = 1;
		filter.frequency.value = band.f;
		return filter;
	});

	// Connect filters to wavesurfer
	wavesurfer.backend.setFilters(filters);


	// For debugging
	wavesurfer.filters = filters;
}
function resetEQData()
{
	var filters = EQ.map(function (band) {
		var filter = wavesurfer.backend.ac.createBiquadFilter();
		filter.type = band.type;
		var val = 0;
		filter.gain.value = val;
		filter.Q.value = 1;
		filter.frequency.value = band.f;
		document.getElementById('eq'+band.f).value = val;
		return filter;
	});
	saveEQData();
	// Connect filters to wavesurfer
	wavesurfer.backend.setFilters(filters);


	// For debugging
	wavesurfer.filters = filters;
}
function presetEQData(data)
{
	var i, j, k, l;
	var eqObj2 = {};
	for(i in data)
	{
		j = data[i];
		k = j.f;
		l = j.value || 0;
		eqObj2[k] = l;
	}
	var inp = document.getElementsByClassName('eq-control');
	var i;
	for(i = 0; i < inp.length; i++)
	{
		var f = inp[i].getAttribute('data-frequency');
		inp[i].value = eqObj2[f];
		eqObj[f] = eqObj2[f];
	}
	var eqData = JSON.stringify(eqObj);
	window.localStorage.setItem('equalizerData', eqData);
	initEQData(eqData);
}
function initEQControl(data)
{
	var eqData = data || '';
	if(eqData == '') eqData = '{}';
	var eqObj2 = JSON.parse(eqData);
	var filters = EQ.map(function (band) {
		var filter = wavesurfer.backend.ac.createBiquadFilter();
		filter.type = band.type;
		
		var val = 0;
		if(typeof eqObj2[band.f] != 'undefined')
		val = eqObj2[band.f];
		else
		val = 0;			
		filter.gain.value = val;
		filter.Q.value = 1;
		filter.frequency.value = band.f;
		return filter;
	});
	// Bind filters to vertical range sliders
	var container = document.querySelector('#equalizer');
	container.innerHTML = '<div class="equalizer-title">Graphic Equalizer</div>';
	filters.forEach(function (filter) {
		var f = filter.frequency.value;
		if(f>=1000)
		{
			f = f/1000;
			f += 'k';
		}
		var inputWrapper = document.createElement('div');
		var inputLabel = document.createElement('div');
		var input = document.createElement('input');
		
		inputWrapper.setAttribute('class', 'input-wrapper');
		inputWrapper.style.display = 'inline-block';
		inputLabel.setAttribute('class', 'eq-label');
		inputLabel.innerHTML = f;
		wavesurfer.util.extend(input, {
			type: 'range',
			min: -40,
			max: 40,
			value: 0,
			title: filter.frequency.value
		});
		input.style.display = 'inline-block';
		input.setAttribute('orient', 'vertical');
		input.setAttribute('id', 'eq'+filter.frequency.value);
		input.setAttribute('class', 'eq-control');
		input.setAttribute('data-frequency', filter.frequency.value);
		input.value = filter.gain.value;
		wavesurfer.drawer.style(input, {
			'webkitAppearance': 'slider-vertical'
		});
		inputWrapper.appendChild(inputLabel);
		inputWrapper.appendChild(input);
		container.appendChild(inputWrapper);


		input.addEventListener('input', changeEQControl);
		input.addEventListener('change', changeEQControl);
	});
	
	var resetEQButton = document.createElement('button');
	resetEQButton.setAttribute('title', 'Normal');
	resetEQButton.setAttribute('class', 'btn btn-primary');
	resetEQButton.setAttribute('data-action', 'reset-eq');
	resetEQButton.innerHTML = '<span class="btn-icon btn-icon-reset-eq"></span> <span class="btn-text">Reset</span>';
	resetEQButton.addEventListener('click', resetEQData);
	
	var presetEQButton1 = document.createElement('button');
	presetEQButton1.setAttribute('title', 'Bass');
	presetEQButton1.setAttribute('class', 'btn btn-primary');
	presetEQButton1.setAttribute('data-action', 'preset-eq');
	presetEQButton1.innerHTML = '<span class="btn-icon btn-icon-preset-eq1"></span> <span class="btn-text">Preset</span>';
	presetEQButton1.addEventListener('click', function(){presetEQData(presetEQ1);});
	
	var presetEQButton2 = document.createElement('button');
	presetEQButton2.setAttribute('title', 'Vocal');
	presetEQButton2.setAttribute('class', 'btn btn-primary');
	presetEQButton2.setAttribute('data-action', 'preset-eq');
	presetEQButton2.innerHTML = '<span class="btn-icon btn-icon-preset-eq2"></span> <span class="btn-text">Preset</span>';
	presetEQButton2.addEventListener('click', function(){presetEQData(presetEQ2);});
	
	var presetEQButton3 = document.createElement('button');
	presetEQButton3.setAttribute('title', 'Treble');
	presetEQButton3.setAttribute('class', 'btn btn-primary');
	presetEQButton3.setAttribute('data-action', 'preset-eq');
	presetEQButton3.innerHTML = '<span class="btn-icon btn-icon-preset-eq3"></span> <span class="btn-text">Preset</span>';
	presetEQButton3.addEventListener('click', function(){presetEQData(presetEQ3);});
	
	
	var buttonEQWrapper = document.createElement('div');
	buttonEQWrapper.className = 'controls';
	
	buttonEQWrapper.appendChild(presetEQButton1);
	buttonEQWrapper.appendChild(document.createTextNode(" "));
	buttonEQWrapper.appendChild(presetEQButton2);
	buttonEQWrapper.appendChild(document.createTextNode(" "));
	buttonEQWrapper.appendChild(presetEQButton3);
	buttonEQWrapper.appendChild(document.createTextNode(" "));
	buttonEQWrapper.appendChild(resetEQButton);
	
	container.appendChild(buttonEQWrapper);
	
	var volData = getVolumeData();
	var volumeControl = document.getElementById('main-volume');
	volumeControl.value = volData;
	volumeControl.addEventListener('change', function(e){
		wavesurfer.setVolume(e.target.value);
		saveVolumeData(e.target.value);
	});
	volumeControl.addEventListener('keyup', function(e){
		wavesurfer.setVolume(e.target.value);
		saveVolumeData(e.target.value);
	});
	wavesurfer.setVolume(volumeControl.value);
}
function saveVolumeData(data)
{
	window.localStorage.setItem('volumeData', data);
}
function getVolumeData()
{
	return window.localStorage.getItem('volumeData') || '0.8';
}
function changeEQControl(){
	initEQData(saveEQData());
}
function saveEQData()
{
	var inp = document.getElementsByClassName('eq-control');
	var i;
	for(i = 0; i < inp.length; i++)
	{
		var f = inp[i].getAttribute('data-frequency');
		eqObj[f] = inp[i].value;
	}
	var eqData = JSON.stringify(eqObj);
	window.localStorage.setItem('equalizerData', eqData);
	return eqData;
}
function loadEQData()
{
	return window.localStorage.getItem('equalizerData') || '';
}
function markListItem(selector, id)
{
	$(selector).removeClass('music-item-selected');
	$(selector).filter('[data-id="'+id+'"]').addClass('music-item-selected');
}
function loadMusic(url)
{
	wavesurfer.load(url);
	document.getElementById('picture').style.backgroundImage = 'url(image.php?file='+encodeURIComponent(url)+')';
	xhr.open('GET', 'info.php?file='+encodeURIComponent(url));
	xhr.onload = function ()
	{
		if(xhr.status === 200)
		{
			var obj = JSON.parse(xhr.responseText);
			var key, val, i = 0;
			var html = '';
			html += '<table border="0" width="100%">';
			html += '<tr><td colspan="2" align="center">Music Information</td></tr>';
			for(key in obj)
			{
				val = obj[key];
				html += '<tr>';
				if(i == 0)
				{
					html += '<td width="35%">';
				}
				else
				{
					html += '<td>';
				}
				key = key.split("_").join(" ");
				html += key.capitalizeFirstLetter()+'</td>';
				html += '<td>'+val+'</td>';
				html += '</tr>';
			}
			html += '</table>';
			document.getElementById('info').innerHTML = html;
			$('#info').customScrollbar({updateOnWindowResize:true});
		} 
	};
	xhr.send(null);
	return false;
}

// Init & load audio file
document.addEventListener('DOMContentLoaded', function () 
{
    // Init
    wavesurfer.init({
        container: document.querySelector('#waveform'),
        waveColor: '#59B200',
        progressColor: '#EEEEEE'
    });

    // Equalizer
    wavesurfer.on('ready', function () {
		wavesurfer.play();
		duration = wavesurfer.getDuration();
    });

    // Log errors
    wavesurfer.on('error', function (msg) {
        console.log(msg);
    });
	
	wavesurfer.on('finish', function(){
		var nextID = 0;
		var curID = parseInt($('#playlist .music-item-selected').attr('data-id'));
		var playlistLen = $('#playlist ul>li').length;
		if(curID >= playlistLen)
		{
			nextID = 1;
		}
		else
		{
			nextID = curID+1;
		}
		var url = $('#playlist .music-item[data-id="'+nextID+'"]').attr('data-path');
		loadMusic(url);
		markListItem($('[data-action="play-item"]'), nextID);
	});

    // Progress bar
    (function () {
        var progressDiv = document.querySelector('#progress-bar');
        var progressBar = progressDiv.querySelector('.progress-bar');

        var showProgress = function (percent) {
            progressDiv.style.display = 'block';
            progressBar.style.width = percent + '%';
        };

        var hideProgress = function () {
            progressDiv.style.display = 'none';
        };

        wavesurfer.on('loading', showProgress);
        wavesurfer.on('ready', hideProgress);
        wavesurfer.on('destroy', hideProgress);
        wavesurfer.on('error', hideProgress);
    }());

	var eqData = loadEQData();
	initEQData(eqData);
	initEQControl(eqData);

});
var duration = 0;
var curPosition = 0;
var isPlaying = 0;
function updateStatus()
{
	isPlaying = wavesurfer.isPlaying();
	curPosition = wavesurfer.getCurrentTime();
	$('#status').text(((isPlaying)?'Playing':'')+' '+real_to_dms(curPosition/3600)+'/'+real_to_dms(duration/3600));
}
function real_to_dms (deg) {
   var d = Math.floor (deg);
   var minfloat = (deg-d)*60;
   var m = Math.floor(minfloat);
   var secfloat = (minfloat-m)*60;
   var s = Math.round(secfloat);
   // After rounding, the seconds might become 60. These two
   // if-tests are not necessary if no rounding is done.
   if (s==60) {
     m++;
     s=0;
   }
   if (m==60) 
   {
     d++;
     m=0;
   }
   if(m<10) m = '0'+m;
   if(s<10) s = '0'+s;
   return ("" + d + ":" + m + ":" + s);
}
window.onload = function()
{
	document.querySelector('[data-action="play"]').addEventListener('click', function(){wavesurfer.play();});
	document.querySelector('[data-action="pause"]').addEventListener('click', function(){wavesurfer.pause();});
	document.querySelector('[data-action="stop"]').addEventListener('click', function(){wavesurfer.stop();});
	$(document).on('click', '[data-action="play-item"]', function(e){
		loadMusic($(this).attr('data-path'));
		markListItem($('[data-action="play-item"]'), $(this).attr('data-id'));
		e.preventDefault();
	});
	setInterval(function(){
		updateStatus();
	}, 100);
}
