/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
#   Copyright (c) 2021-25 Alex Shevlakov alex@motivation.ru
#   All Rights Reserved.

#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; version 3 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
*/

var fullscreen = false; var ios_fullscreen = false; var cinemaEnabled = false;

let already_been_there = false;
let first_time = true;

const doSwitchOneMode = (el, acc_host, sum_host) => {if (false) console.log(el);
	let sp_setter_url_cur = sp_setter_url+'/#/binder/to/:'+acc_host+'/amount/:'+sum_host;
	request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data => { 
	   if (!data.length) {

		fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl?par=session', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
			let sess = respo; 
			// console.log('respo here is', sess);
			if (sess.length) {
			  let sp_setter = isIOSFirefox() ? '<iframe id="sp_setter" name="sp_setter" src="' + sp_setter_url_cur + '/?session=' + sess +'" scrolling="yes" style="border:0;min-height:400px;background:transparent;text-align:center;margin:-20px auto 0 -20px; width:320px;"></iframe>' : '<iframe id="sp_setter" name="sp_setter" src="' + sp_setter_url_cur + '/?session=' + sess +'" scrolling="yes" style="border:0;min-height:430px;background:transparent;text-align:center;margin:-20px auto 0 -20px; width:320px;"></iframe>';
			  
			  sp_setter += '<div id="sp_setter_dummy" style="font-size:18px;position:relative;text-align:center;width:70%;margin:44% auto;display:none;background:#def;">PLEASE WAIT .. LOADING WALLET..</div>'
			  
			  let h = tablet ? '42vh' : small_device ? '64vh' : 420;
			  let fs = small_device ? 24 : 18;
		//no jquery	 
			  mod6 = new mBox.Modal({content: sp_setter, setStyles: {content: {padding: '25px', lineHeight: 24, margin: '0 auto', fontSize: fs, color: '#222', height: h, maxHeight: '450px'}}, width:280, id:'m6', height: h, zIndex: 31005, position: 'relative', title: 'SkyRHC wallet', attach: 'newacc'}); document.id('newacc').click();
			  if (document.id('sp_setter') && first_time) {

			    document.id('sp_setter').style.display = 'none';document.id('sp_setter_dummy').style.display = 'block';// hack ash: do not disturb iframe while it's connecting
			    setTimeout(function() {document.id('sp_setter').style.display='block';document.id('sp_setter_dummy').style.display = 'none';/*console.log('back from dumb!')*/}, 3000);
			    first_time = false;
			  }
			  
			  let topo = (window.innerHeight-540)/2 - 30; topo = topo + 'px'; if (!small_device) document.id('m6').style.top=topo;	//trim it, sir

			} else {
				if (already_been_there) return;
			}
		}).catch(err => console.log(err));
	   } else {

		if (!switched) { switched = true; rejoin(); } else {if(!playSomeMusic && !shareSomeScreen){fullscreen=true; chat_shown=1;document.id("logger").click();let re=/video-/gi;let a=el.id.replace(re,"");let v=document.id("video-"+a);if(v && !v.fullscreenElement && !check_iOS()){v.requestFullscreen()}(function(){document.id("room-header").style.display="none";if (normal_mode) document.id("room-backer").style.display="block";if (!small_device) {document.id("room").style.minWidth = "480px";document.id("room").style.marginLeft = "0px";}if(Object.keys(participants).length){for(var key in participants){if(participants[key].name!=a){participants[key].dispose();delete participants[key]}}}}).delay(500)}else{if(playSomeMusic){flashText("PLAYING VIDEO! STOP?")}else{flashText("SHARING SCREEN! STOP?")}}}
	   }
	});	
};

const PARTICIPANT_MAIN_CLASS = small_device ? 'participant main_i' : 'participant main';
const PARTICIPANT_CLASS = 'participant';
const PARTICIPANT_SOLO = 'participant solo'
const PARTICIPANT_DUO = 'participant duo'
const PARTICIPANT_TRIO = 'participant trio'
const PARTICIPANT_CUATRO = 'participant cuatro'
const PARTICIPANT_CINCO = 'participant cinco'

function Participant(name, myname, mode, myrole) {
	
	this.name = name;
	this.mode = mode;
	
	let mic_muted = false;
	
	let this_is_guru = false;
	let i_am_guru = false;	
	
	if ( document.id('dummy_p')) document.id('dummy_p').style.display = 'none';
	if ( document.id('dummy2_p')) document.id('dummy2_p').style.display = 'none';
	
	var gi = new RegExp('GURU:','g');
	if (name.match(gi)) {guru_is_here = 1; this_is_guru = true;}
	if (myname.match(gi)) i_am_guru = true;
	
	var this_is_unmuted = false;
        var ai = new RegExp('^A:','g');
	
	let ct = 0;
	for ( var key in participants) {
		if (key.match(gi)) ct++;
	}
	if (ct > 0) guru_is_here = 1;
		
	if ( document.id(name) ) {var old_container = document.id(name); old_container.parentNode.removeChild(old_container);}
	
	var from_changing_slider = false;

	all_muted = getCookie('all_muted');
	if (all_muted === null || all_muted === 'null') all_muted = false;
 	
	var coo_muted = loadData(name+'_muted');
	
	if (coo_muted === null || coo_muted === 'null') coo_muted = all_muted;

	if (mode == 'm' || mode == 'c' || mode == 'p') coo_muted = true; // ?!
	
	var coo_volume = loadData(name+'_volume');

	if (coo_volume === null || coo_volume === 'null') coo_volume = this_is_unmuted ? 0.1 : this_is_guru ? 0.7 : 0.5;

	if (name != myname && mode != 'm') {
		saveData(name+'_muted', coo_muted, 1440);
		saveData(name+'_volume', coo_volume, 1440);
	}

	if ((all_muted === true || all_muted === 'true') && name == myname) i_am_muted = true;
	
	if (name == myname) saveData(myname+'_muted', i_am_muted, 1440);

	var container = document.createElement('div');
	
	container.className = PARTICIPANT_MAIN_CLASS;

	container.className = (pcounter == 0 && !small_device) ? PARTICIPANT_SOLO : container.className;
	container.className = (pcounter == 1 && !small_device) ? PARTICIPANT_DUO : container.className;
	container.className = (pcounter == 2 && !small_device) ? PARTICIPANT_TRIO : container.className;
	container.className = (pcounter == 3 && !small_device) ? PARTICIPANT_CUATRO : container.className;
	container.className = (pcounter == 4 && !small_device) ? PARTICIPANT_CINCO : container.className;
	
	container.style.display='none';
	container.style.pointerEvents='auto';
	container.style.opacity=0;
	
	i_am_guest = isPresentMainParticipant() & pcounter === 1 ? 1 : i_am_guest;

	if ( myrole != 1) i_am_guest = 1 ;
	if ( myrole == 1 & pcounter === 0 & guru_is_here ) i_am_guest = 0 ;
	
	(function(){ document.id('phones').fade(0); (function(){ document.id('phones').innerHTML = '';}).delay(100);}).delay(500);
	
	if (typeof(mod3) != 'undefined' && mod3 !== null) mod3.content.innerHTML = left_content.get(altlang[ctr]);
	if (typeof(mod4) != 'undefined' && mod4 !== null) mod4.content.innerHTML = right_content.get(altlang[ctr]);

	
	pcounter++; if (name != myname || myrole != 0) real_pcnt++;

	if (real_pcnt === 5) {
			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_CUATRO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CINCO;
			});
	}
	
	if (real_pcnt === 4) {
			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_TRIO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CUATRO;
			});
	}
		
	if (real_pcnt === 3) {
			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_DUO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_TRIO;
			});
	}

	if (real_pcnt === 2) {
			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_SOLO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_DUO;
			});
	}
		
	if (pcounter > room_limit) {hack = false;}

	if (pcounter > 5) switchContainerClass();

	(function() {container.className = (pcounter === 1 && !small_device) ? PARTICIPANT_SOLO : (pcounter === 2 && !small_device) ? PARTICIPANT_DUO : (pcounter === 3 && !small_device) ? PARTICIPANT_TRIO : (pcounter === 4 && !small_device) ? PARTICIPANT_CUATRO : (pcounter === 5 && !small_device) ? PARTICIPANT_CINCO : container.className;}).delay(500);
	
	if (document.id('pcounter')) { if (!real_pcnt) {(function(){document.id('pcounter').innerHTML = real_pcnt;}).delay(1000);} else {document.id('pcounter').innerHTML = real_pcnt;} }
	
	container.id = name;
	container.style.position='relative';
	//container.style.zIndex = '21';
	var span = document.createElement('span');
	var speaker = document.createElement('div');
	var slider = document.createElement('input');	
	var video = document.createElement('video');
	var loco = document.createElement('div');
	var onemode = document.createElement('div');
	var dropper = document.createElement('div');
	var rtcPeer;

	var canvas = document.createElement('canvas');

	var ctx = canvas.getContext('2d');

	document.id('participants').appendChild(container);

	container.appendChild(video);
	container.appendChild(span);
	container.appendChild(speaker);

	if (name == myname) container.onclick = toggleRoomHeader;
	container.ondblclick = rmPtcp;

	var ar = name.split("_");
	var rname = ar.slice(0, ar.length - 1).join("_");
	
	let rrname = rname.length > 11 ? rname.substr(0,11) + '..' : rname;

	if (ar[0] !== "DUMMY") span.appendChild(document.createTextNode(rrname));
	span.style.zIndex = '1002';
	span.style.cursor = 'pointer';
	span.id = 'span_' + name;
	
	span.onclick = back_to_audience;

	if (mode != 'm' || myname == name) {
		speaker.addEventListener('click', function(e) {e.preventDefault(); e.stopPropagation(); if (name != myname) toggleSlider(); else toggleMute();});
		speaker.style.cursor = 'pointer';
	}
	
	slider.addEventListener('change', function(e) {e.preventDefault(); e.stopPropagation(); changeVolume();});
	
	if (name != myname) video.addEventListener('click', function(e) {e.preventDefault(); e.stopPropagation(); let p = participants[name]; let g = p.getMode(); if (g != 'c') {if (small_device) {toggleBigScreen(e.target)} else { toggleFullScreen(e.target)}} else {switchOneMode(e.target)}});
	
/// iOS
	if (check_iOS()) {

	   video.addEventListener('play', () => {
    		function step() {
      			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      			window.requestAnimationFrame(step);
    		}
    		window.requestAnimationFrame(step);
	   })
	}
///	
	onemode.onclick = function(e) {	e.preventDefault(); e.stopPropagation(); setCinema() }
	dropper.onclick = rmPtcp;

	speaker.className = 'speak';
	speaker.id = 'speaker-' + name;
	
	let onemode_color = mode == 'c' ? '#ff0' : '#369';
	onemode.style.fontWeight = mode == 'c' ? 'bold' : 'normal';
	let onemode_label = shareSomeStream ? 'STREAM' : mode == 'c' ? 'CINEMA!' : 'CINEMA?';
	
	onemode.className = 'onemode';
	onemode.id = 'one-' + name;
	onemode.style.zIndex=10002;
	onemode.style.opacity=0;
	onemode.style.fontSize = small_device ? '18px' : '14px';
	onemode.style.color = shareSomeStream ? '#ff0' : onemode_color;
	onemode.style.width = small_device ? '72px' : onemode.style.width;
	onemode.appendChild(document.createTextNode(onemode_label));

	if (this.mode != 'c' && myrole != 1) onemode.style.display = 'none'; //don't show own cinema or if flag not set
	if (myrole == 1 || this.mode == 'c') onemode.style.display = 'block'; //but gurus should see it anyway, to click it
	
	dropper.className = 'dropper';
	dropper.id = 'drop-' + name;
	dropper.appendChild(document.createTextNode('X'));
	dropper.style.fontSize = '16px';
		
	slider.style.position = 'absolute';
	slider.style.bottom = '5px';
	slider.style.left = '5px';
	
	slider.style.zIndex = 20112;
	
	video.id = 'video-' + name;
	video.autoplay = true;
	video.playsInline = true;
	video.controls = check_iPad() && isSafari ? false : false;
	video.volume = coo_volume;
	if (name != myname) video.style.cursor = 'pointer';

	if (ar[0] === "DUMMY") {
	
		let l = creatu_long_.get(altlang[ctr]);
		var dummee = document.createElement('div');	
		dummee.style.fontSize = '18px';
		dummee.style.color = '#c50';
		dummee.style.width = '50%';
		dummee.style.textAlign = 'center';
		dummee.appendChild(document.createTextNode(l));
		dummee.style.float='none';
		dummee.style.margin = '-21px auto 0 auto';
		dummee.style.cursor = 'pointer';
		//dummee.addEventListener('click',function(e){switchOneMode(e.target)});
		container.appendChild(dummee);
	}

	slider.type = 'range';
	slider.id = 'slider_' + name;
	slider.min = 0;
	slider.max = 1;
	slider.step = 0.1;
	slider.style.display='none';
	slider.style.width='90px';
	
	loco.className = 'locos';
	loco.id = 'loco_' + name;
	
	loco.style.fontSize = '14px';
	loco.style.color = '#9cf';

	var acco = document.createElement('div');
	acco.id = 'acco_' + name;
	acco.className = 'accos';
	container.appendChild(acco);
	
	container.appendChild(slider);
	container.appendChild(loco);
	
	container.appendChild(onemode);
	if (name != myname) {container.appendChild(dropper);}
	
	var anno = document.createElement('div');
	anno.className = 'annos';
	anno.id = 'anno_' + name;
	anno.style.fontSize = '16px';
	anno.style.paddingLeft = '10px';
	anno.style.paddingRight = '10px';
	anno.style.opacity = 0;
	anno.onclick = function(e) {toggleAnnoVisibility(e.target)};
	container.appendChild(anno);

	var lol = document.createElement('div');
	lol.className = 'lols';
	lol.id = 'lol_' + name;
	lol.style.fontSize = '14px';
	lol.onclick = toggleSignal;
	lol.style.position = 'absolute';
	lol.style.zIndex = '1001';
	container.appendChild(lol);

	var rew = document.createElement('div');
	rew.className = 'lols';
	rew.id = 'rew_' + name;
	rew.style.right = '120px';
	rew.style.fontSize = '14px';
	rew.onclick = rewind;
	rew.style.position = 'absolute';
	rew.style.zIndex = '1001';
	container.appendChild(rew);

	var sndMeter = document.createElement('div');
	sndMeter.className = 'snd_meters';
	sndMeter.id = 'sndm_' + name;
	container.appendChild(sndMeter);
				
	var adder = document.createElement('div');	
	adder.className = 'adders';
	adder.style.fontSize = '18px';
	adder.style.cursor = 'pointer';
	adder.style.background = name == myname ? '#369' : '#900';
	adder.id = 'adder_' + name;
	adder.appendChild(document.createTextNode('A'));
	adder.onclick = set_Anno;
	
	adder.style.display = myrole == 0 && myname == name ? 'none': 'block';
	//don't add to gurus except myself
	adder.style.display = (this_is_guru && name != myname) || ar[0] === "DUMMY" ? 'none' : adder.style.display;
	adder.style.right = name == myname ? '0px' : '24px';
	
	container.appendChild(adder);

		
	document.id(video.id).style.opacity = (i_am_muted === true || i_am_muted === 'true') && aonly && name == myname? 0 : 1;
	document.id(video.id).style.maxHeight = (i_am_muted === true || i_am_muted === 'true') && aonly && name == myname ? notebook ? '310px' : '365px': document.id(video.id).style.maxHeight;
	
	document.id(video.id).style.maxHeight = notebook ? '310px' : '365px';
	
	if ((all_muted === true || all_muted === 'true') || (coo_muted === true || coo_muted === 'true') || name == myname) video.muted = true;
	
	if (video.muted !== true){
		speaker.appendChild(document.createTextNode('\uD83D\uDD0A')); //speaker icon		
	} else {
		if (name != myname && mode != 'm') speaker.appendChild(document.createTextNode('\uD83D\uDD07')); //muted icon
		if (name != myname && mode == 'm') speaker.appendChild(document.createTextNode('X'));
		if (name == myname && (i_am_muted === true || i_am_muted === 'true') && !playSomeMusic) speaker.appendChild(document.createTextNode('X'));
		if (name == myname && playSomeMusic_muted === true && playSomeMusic) speaker.appendChild(document.createTextNode('\uD83D\uDD07')); //muted icon
		if (name == myname && playSomeMusic_muted === false && playSomeMusic) speaker.appendChild(document.createTextNode('\uD83D\uDD0A')); //speaker icon
		if (name == myname && (i_am_muted === false || i_am_muted === 'false') && !playSomeMusic) speaker.appendChild(document.createTextNode('\uD83C\uDFA4')); //microphone icon
	}
	
	speaker.style.fontSize = "42px";
	speaker.style.right = small_device && window.top != window ? "10px" : speaker.style.right;

	this.getVideoElement = function() {
		return video;
	}

	this.getCanvasElement = function() {
		return canvas;
	}
	
	this.activateMicIndic = function() {

	  if (name != myname && !playSomeMusic) {
		let ac = new AudioContext();
		console.log('newed ac1..');
		let soundMeter = new SoundMeter(ac);
					
		//let fps = 10;
		//let vidStream = video.mozCaptureStream ? video.mozCaptureStream(fps) : video.captureStream ? video.captureStream(fps) : null;
		
		let vidStream = this.rtcPeer.getRemoteStream(); let audio = vidStream.getAudioTracks()[0];
		//console.log('Mic activation: muted',audio.muted,'enabled',audio.enabled);
		
		//this is from https://www.webrtc-developers.com/how-to-know-if-my-microphone-works/
		const audioContext = new AudioContext();
		const analyzer = audioContext.createAnalyser();
		analyzer.fftSize = 512;
		analyzer.smoothingTimeConstant = 0.1;
		const sourceNode = audioContext.createMediaStreamSource(vidStream);
		sourceNode.connect(analyzer);
		
		if (vidStream.getAudioTracks()[0]) soundMeter.connectToSource(vidStream, function(e) {if (e) {console.log('error connectToSource',e); return;}
		let inte;
		if (document.id('sndm_'+name)) {inte = setInterval(() => {

  		const fftBins = new Float32Array(analyzer.frequencyBinCount); // Number of values manipulated for each sample
  		analyzer.getFloatFrequencyData(fftBins);

  		const audioPeakDB = Math.max(...fftBins);

    		// Compute a wave (0...)
  		const frequencyRangeData = new Uint8Array(analyzer.frequencyBinCount);
  		analyzer.getByteFrequencyData(frequencyRangeData);
  		const sum = frequencyRangeData.reduce((p, c) => p + c, 0);

  		const audioMeter = Math.sqrt(sum / frequencyRangeData.length);
		  
		  if (document.id('sndm_'+name)) {/*console.log('.. received',soundMeter.instant.toFixed(3));*/document.id('sndm_'+name).style.background = soundMeter.instant.toFixed(3) > 0.001 ? '#090' : 'transparent'; if (audioMeter === 0 && audioPeakDB < -200 && !mic_muted) { mic_muted = true; let speaker = document.id('speaker-'+name); speaker.removeChild(speaker.childNodes[0]);speaker.appendChild(document.createTextNode('X'));speaker.style.pointerEvents='none';} if (audioMeter > 0 && mic_muted) { mic_muted = false; let speaker = document.id('speaker-'+name); speaker.removeChild(speaker.childNodes[0]);if (!video.muted) speaker.appendChild(document.createTextNode('\uD83D\uDD0A'));if (video.muted) speaker.appendChild(document.createTextNode('\uD83D\uDD07'));speaker.style.pointerEvents='auto';}} else {clearInterval(inte)}
		  
		}, 200);}
		
		});
	  }	
	}	

	function toggleRoomHeader() {

			if(!small_device) {document.id('room-header').style.display = document.id('room-header').style.display === 'none' ? 'block' : 'none'; let a = document.id('room-header').style.display === 'none' ? 0 : 1; document.id('room-header').fade(a); document.id('room-header-file').style.display = document.id('room-header').style.display === 'none' ? 'none' : document.id('room-header-file').style.display;}
	}
	
	function set_Anno() {
				who_to = name;
				document.id('anno_adder').click();
				//console.log('clicked set_anno!');		
	}
	
	function setCinema() {
		//fetch('https://'+window.location.hostname+':'+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
		fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
			let role = respo;
			if (role == 1) {
				let p = participants[name]; let g = p.getMode();
				let m = g == 'c' ? 'v'  : 'c'; //toggle
				let mo =  g == 'c' ? false : true;
				let tok = getCookie('authtoken') || '';
				//setCookie('cinemaMode', mo);

				let message = {
					id : 'setCinema',
					name : name,
					mode : m,
					token: tok
				}		
				sendMessage(message);	
			}
	
		}).catch(err => console.log(err));		
	}
	
	function back_to_audience() {

		fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
			let role = respo;
			if (role == 1 && name !== myname) set_guru(0, name);
	
		}).catch(err => console.log(err));		
	}

	function toggleSignal() {
		let message = {
			id :'keyDown', num: 85, name: name //pause/play toggle
		}		
		sendMessage(message);
	}
	
	function toggleAnnoVisibility(el) {	
		el.style.opacity = el.style.opacity == 0.02 ? 1 : 0.02;	
	}
	
	function rewind() {
		let message = {
			id :'keyDown', num: 82, name: name //rewind 10sec
		}		
		sendMessage(message);
	}
		
	const switchOneMode = (el) => {
		document.id('house').style.display = 'block'; document.id('house').style.visibility='visible';
		request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data => {
			if (data.length) {
				doSwitchOneMode(el,'5ENzTTUL3zvnMP8usRo3ZcGmMhkaHsvFUP6PMedLV9EWtLFx',5); //sorba
			} else {
				if (!afterBinding) {

					setTimeout(function() {
						if (document.id('removerA')) {document.id('removerA').innerHTML = 'Error: Service unavailable';
						(function() {document.id('removerA').fade(0)}).delay(1000);}
					}, 10000);					
					(function() {
						if (document.id('sp_balance')){
								document.id('sp_balance').style.display='block';
								document.id('sp_balance').src=sp_container_url+'/?acc='+data;
						}
					}).delay(1000);
					document.id('sp_container').style.display = 'block'; sp_shown = 1; 
					ch_int = setInterval(function() { 
						if (document.id('sp_balance')) {
							document.id('sp_balance').style.display='block';
							document.id('sp_balance').src = sp_container_url + '/?acc=' + data;
						}
					}, 300000);
					document.body.scrollTop = document.documentElement.scrollTop = 0;  

				}

				if (afterBinding) rejoin(); 

			}
		});

	}
	
	function switchContainerClass() {

	      if (!small_device) {

		if (container.className === PARTICIPANT_CLASS) {
			var elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
			elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CLASS;
			});
                        
			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_SOLO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CLASS;
			});

			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_DUO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CLASS;
			});

			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_TRIO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CLASS;
			});

			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_CUATRO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CLASS;
			});

			elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_CINCO));
                        elements.forEach(function(item) {

				item.className = small_device ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CLASS;
			});
												
			container.className = PARTICIPANT_MAIN_CLASS;
		} else {
			container.className = PARTICIPANT_CLASS;
		}
				
	      }
	}
	
	function toggleFullScreen(el) {
		
		if (!el.fullscreenElement) {

			el.requestFullscreen();
			document.id('room_selector').fade(0);
			
	
		} else {
			if (el.exitFullscreen) {		
				//fullscreen = false; //uncomment for 'strict' chasing 
				el.exitFullscreen();
				document.id('room_selector').fade(1);
				
			}
		}

	}

	function toggleBigScreen(el) {

			if(!isAndroid && !ios_fullscreen) {
				document.id('house').style.visibility='hidden';
				document.id('controls').style.display='none';
				container.style.position='fixed';
				container.style.top='0px';
				container.style.left='0px';
				container.style.width= window.innerHeight > window.innerWidth ? '97vw' : '98vw';
				//document.id('second_logger').style.visibility='hidden';
				//screen.orientation.lock('landscape');
				// if (window.innerHeight > window.innerWidth) flashText('swipe screen');
				ios_fullscreen = true;
				document.id('room_selector').fade(0);
			}
			else if(!isAndroid && ios_fullscreen) {
				container.style.position='relative';
				container.style.width='96%';
				document.id('house').style.visibility='visible';
				document.id('controls').style.display='block';
				//document.id('second_logger').style.visibility='visible';
				//screen.orientation.unlock();
				ios_fullscreen = false;
				document.id('room_selector').fade(1);
			}
			else if (isAndroid) {
				if (container.className == PARTICIPANT_MAIN_CLASS) toggleFullScreen(el);
				if (container.className == PARTICIPANT_CLASS) switchContainerClass();
			}
	}
	
	function toggleBigScreen_new(el) {

			if(!ios_fullscreen) {
				document.id('house').style.visibility='hidden';
				document.id('controls').style.display='none';
				container.style.position='fixed';
				container.style.top='0px';
				container.style.left='0px';
				container.style.width= window.innerHeight > window.innerWidth ? '97vw' : '98vw';
				//document.id('second_logger').style.visibility='hidden';
				//screen.orientation.lock('landscape');
				// if (window.innerHeight > window.innerWidth) flashText('swipe screen');
				ios_fullscreen = true;
			}
			else if(ios_fullscreen) {
				container.style.position='relative';
				container.style.width='96%';
				document.id('house').style.visibility='visible';
				document.id('controls').style.display='block';
				//document.id('second_logger').style.visibility='visible';
				//screen.orientation.unlock();
				ios_fullscreen = false;
			}
	}
			
	function toggleSlider() {
		if (check_iOS()) from_changing_slider = false;
		else slider.style.display = slider.style.display == 'block' ? 'none' : 'block';

		toggleMute();
	}
	
	function changeVolume() {

		coo_volume=slider.value;
		saveData(name+'_volume', coo_volume, 1440);
		coo_muted  = coo_volume > 0 ? false : true;
		saveData(name+'_muted', coo_muted, 1440);
			
		video.volume = coo_volume;
		from_changing_slider = true;
		
		if ( (video.volume === 0 && !video.muted) || (video.volume && video.muted) ) toggleMute();
	}

	function check_iPad() {
  		var ua = navigator.userAgent;
  		if (/iPad/.test(ua) ){
    			return true;
  		}
  		return false;
	}
	
	function toggleMute() {
		if ( document.id('video-' + name) ) {	
		   var video = document.id('video-' + name);
		   if ( !from_changing_slider || (from_changing_slider && ((video.volume === 0 && !video.muted) || (video.volume > 0))) ) {
	
			if (name != myname) 
			{
				video.muted = video.volume === 0 ? true : !video.muted;
				slider.value =  video.volume;

				from_changing_slider = false;
				
				saveData(name+'_muted', video.muted, 1440);
				saveData(name+'_volume', video.volume, 1440);
			}

			if (name == myname && playSomeMusic)
			{
				playSomeMusic_muted = playSomeMusic_muted === true ? false : true;
			}
						
			speaker.removeChild(speaker.childNodes[0]);
			
			if (video.muted || (name == myname && playSomeMusic && playSomeMusic_muted === true )){
				if (name != myname || (name == myname && playSomeMusic))  {
					speaker.appendChild(document.createTextNode('\uD83D\uDD07'));//muted icon

					if (name == myname && playSomeMusic) analyser.disconnect();
				}
				if (name == myname && !playSomeMusic) {
					if (i_am_muted === true || i_am_muted === 'true') {
						saveData(myname+'_muted', false, 1440); i_am_muted = false; 
						setCookie('all_muted', false, 1440);// have to add this too

						localStream.getAudioTracks()[0].enabled = true;
						speaker.appendChild(document.createTextNode('\uD83C\uDFA4'));
					} 
					else {
						saveData(myname+'_muted', true, 1440); i_am_muted = true;

						localStream.getAudioTracks()[0].enabled = false;
						speaker.appendChild(document.createTextNode('X'));
					}
				}
				
			} else {
				speaker.appendChild(document.createTextNode('\uD83D\uDD0A'));//speaker icon
				
				if (name == myname && playSomeMusic) 
				{
					if (!g.audioContext) g.audioContext = new AudioContext();
					mediaSource = g.audioContext.createMediaElementSource(video);
					analyser = g.audioContext.createAnalyser();
					mediaSource.connect(analyser);

					analyser.connect(g.audioContext.destination);					
				}
			}
		   }
		}
	}

	
	function rmPtcp() {
	  if (!normal_mode) {let foo = document.location.href.split('#'); if (true_cine) {document.location.href = foo[0];} else {document.location.reload();}} else {
	    if (name != myname) {
	  	var yon = window.confirm('Drop '+rname+'?!');
		if (yon) {

			fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
				let role = respo;
				if (role == 1) {

					let tok = getCookie('authtoken') || '';
					
					let message = {
						id : 'dropGuest',
						name : name,
						token: tok
					}		
					sendMessage(message);	

				} else {

					for ( var key in participants) {
						if (participants[key].name === name) {
							participants[key].dispose();
							delete participants[key].rtcPeer;
							delete participants[key];
						}
					}					
				}
				
	  		}).catch(err => console.log(err));
			
			

		}	  
	    }
	  }
	}
	
	function isPresentMainParticipant() {
		return ( (document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length != 0 || (document.getElementsByClassName(PARTICIPANT_SOLO)).length != 0 || (document.getElementsByClassName(PARTICIPANT_DUO)).length != 0 || (document.getElementsByClassName(PARTICIPANT_TRIO)).length != 0 || (document.getElementsByClassName(PARTICIPANT_CUATRO)).length != 0 || (document.getElementsByClassName(PARTICIPANT_CINCO)).length != 0);
	}


	this.offerToReceiveVideo = function(error, offerSdp, wp){
		if (error) return console.error ("sdp offer error")

		var msg =  { id : "receiveVideoFrom",
				sender : name,
				sdpOffer : offerSdp
			};
		sendMessage(msg);
	}


	this.onIceCandidate = function (candidate, wp) {

		  var message = {
		    id: 'onIceCandidate',
		    candidate: candidate,
		    name: name
		  };
		  sendMessage(message);
	}

	Object.defineProperty(this, 'rtcPeer', { writable: true});

	this.dispose = function() {

		var gi = new RegExp('GURU:','g');
		let ct = 0;
		for ( var key in participants) {
			if (key.match(gi)) ct++;
		}
		
		if (name.match(gi) && ct == 1) {
			guru_is_here = 0;
			setTimeout(function() {
				if (!guru_is_here && false) {
					flashText(waiter);
				}
			}, 2000);
		}
		if (this.rtcPeer && typeof(this.rtcPeer != 'undefined') ) this.rtcPeer.dispose();
		if (container && container.parentNode) container.parentNode.removeChild(container);
		pcounter--; 

		if (pcounter <= room_limit && !i_am_viewer) {hack = true;}

		if (pcounter < 6) {
                        var elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_CLASS));
                        elements.forEach(function(item) {
                                item.className = small_device ? PARTICIPANT_MAIN_CLASS : pcounter === 1 ? PARTICIPANT_SOLO : pcounter === 2 ? PARTICIPANT_DUO : pcounter === 3 ? PARTICIPANT_TRIO : pcounter === 4 ? PARTICIPANT_CUATRO : pcounter === 5 ? PARTICIPANT_CINCO : item.className;
                        });

		}
		
		if (name != myname || myrole != 0) real_pcnt--;
		if (document.id('pcounter')) { if (!real_pcnt) {(function(){document.id('pcounter').innerHTML = real_pcnt;}).delay(1000);} else {document.id('pcounter').innerHTML = real_pcnt;} }
		
		if ( guru_is_here == 0 & pcounter) i_am_guest = 1;
		if ( guru_is_here == 1 & pcounter === 1) i_am_guest = 0;
		if ( ct > 1) {i_am_guest = 0 ; guru_is_here = 1;}
		
	}
	
	this.setMode = function(r) {
		this.mode = r;
	}
	
	this.getMode = function() {
		return this.mode;
	}
}

const CINEMA_GOER_MAIN_CLASS = small_device ? 'cinema_goer main_i' : 'cinema_goer main';

function CinemaGoer(name, myname, mode) {
	
	this.name = name;
	this.mode = mode;
		
	if ( document.id(name) ) {var old_container = document.id(name); old_container.parentNode.removeChild(old_container);}
	
	var from_changing_slider = false;

	all_muted = getCookie('all_muted');
	if (all_muted === null || all_muted === 'null') all_muted = false;
 	
	var coo_muted = loadData(name+'_muted');

	if (coo_muted === null || coo_muted === 'null') coo_muted = all_muted;

	if (mode == 'm' || mode == 'c' || mode == 'p') coo_muted = true; // ?!
	
	var coo_volume = loadData(name+'_volume');

	if (coo_volume === null || coo_volume === 'null') coo_volume = 0.3; // set default volume on cinema goers

	if (name != myname && mode != 'm') {
		saveData(name+'_muted', coo_muted, 1440);
		saveData(name+'_volume', coo_volume, 1440);
	}

	if ((all_muted === true || all_muted === 'true') && name == myname) i_am_muted = true;
	
	if (name == myname) saveData(myname+'_muted', i_am_muted, 1440);

	var container = document.createElement('div');
	
	container.className = CINEMA_GOER_MAIN_CLASS;
	
	container.style.display='block';
	container.style.opacity=0;
	
	container.id = name;
	container.style.position='absolute';
	container.style.zIndex = 10112;

	container.style.bottom = '0px';

	var speaker = document.createElement('div');
	var slider = document.createElement('input');	
	var video = document.createElement('video');

	var rtcPeer;

	document.id('participants').appendChild(container);

	container.appendChild(video);
	container.appendChild(speaker);

	if (mode != 'm' || myname == name) {
		speaker.addEventListener('click', function(e) {e.preventDefault(); e.stopPropagation(); if (name != myname) toggleSlider(); else toggleMute();});
		speaker.style.cursor = 'pointer';
	}
	
	slider.addEventListener('change', function(e) {e.preventDefault(); e.stopPropagation(); changeVolume();});	

	speaker.className = 'speak';
	speaker.id = 'speaker-' + name;
	speaker.style.zIndex = 10112;
		
	slider.style.position = 'relative';
	slider.style.zIndex = 10112;
	
	video.id = 'video-' + name;
	video.autoplay = true;
	video.playsInline = true;
	video.controls = false;
	video.volume = coo_volume;
	if (name != myname) video.style.cursor = 'pointer';

	slider.type = 'range';
	slider.id = 'slider_' + name;
	slider.min = 0;
	slider.max = 1;
	slider.step = 0.1;
	slider.style.display='none';
	slider.style.width='90px';
		
	container.appendChild(slider);

	speaker.style.display = 'none';
	
	if ((all_muted === true || all_muted === 'true') || (coo_muted === true || coo_muted === 'true') || name == myname) video.muted = true;
	
	if (video.muted !== true){
		speaker.appendChild(document.createTextNode('\uD83D\uDD0A')); //speaker icon
		
	} else {
		if (name != myname && mode != 'm') speaker.appendChild(document.createTextNode('\uD83D\uDD07')); //muted icon
		if (name != myname && mode == 'm') speaker.appendChild(document.createTextNode('X'));
		if (name == myname && (i_am_muted === true || i_am_muted === 'true')) speaker.appendChild(document.createTextNode('X'));
		if (name == myname && (i_am_muted === false || i_am_muted === 'false')) speaker.appendChild(document.createTextNode('\uD83C\uDFA4')); //microphone icon
	}
	
	speaker.style.fontSize = "42px";
	speaker.style.right = small_device && window.top != window ? "10px" : speaker.style.right;

	this.getVideoElement = function() {
		return video;
	}
	
	this.activateMicIndic = function() {

	  if (name != myname) {
		let ac = new AudioContext();
		console.log('newed ac2..');
		let soundMeter = new SoundMeter(ac);

		let vidStream = this.rtcPeer.getRemoteStream(); let audio = vidStream.getAudioTracks()[0];
		
		if (vidStream.getAudioTracks()[0]) soundMeter.connectToSource(vidStream, function(e) {if (e) {console.log('error connectToSource',e); return;}
		let inte;
		if (document.id('sndm_'+name)) {inte = setInterval(() => {
		  if (document.id('sndm_'+name)) {/*console.log('.. received',soundMeter.instant.toFixed(3));*/document.id('sndm_'+name).style.background = soundMeter.instant.toFixed(3) > 0.001 ? '#090' : 'transparent'} else {clearInterval(inte)}
		  
		}, 200);}
		
		});
	  }	
	}	
		
	function toggleSlider() {
		if (check_iOS()) from_changing_slider = false;
		else slider.style.display = slider.style.display == 'block' ? 'none' : 'block';

		toggleMute();
	}
	
	function changeVolume() {

		coo_volume=slider.value;
		saveData(name+'_volume', coo_volume, 1440);
		coo_muted  = coo_volume > 0 ? false : true;
		saveData(name+'_muted', coo_muted, 1440);
			
		video.volume = coo_volume;
		from_changing_slider = true;
		
		if ( (video.volume === 0 && !video.muted) || (video.volume && video.muted) ) toggleMute();
	}
	
	function toggleMute() {
		if ( document.id('video-' + name) ) {	
		   var video = document.id('video-' + name);
		   if ( !from_changing_slider || (from_changing_slider && ((video.volume === 0 && !video.muted) || (video.volume > 0))) ) {
	
			if (name != myname) 
			{
				video.muted = video.volume === 0 ? true : !video.muted;
				slider.value =  video.volume;

				from_changing_slider = false;
				
				saveData(name+'_muted', video.muted, 1440);
				saveData(name+'_volume', video.volume, 1440);
			}
						
			speaker.removeChild(speaker.childNodes[0]);
			
			if (video.muted){
				if (name != myname)  {
					speaker.appendChild(document.createTextNode('\uD83D\uDD07'));//muted icon

				}
				if (name == myname) {
					if (i_am_muted === true || i_am_muted === 'true') {
						saveData(myname+'_muted', false, 1440); i_am_muted = false; 
						setCookie('all_muted', false, 1440);// have to add this too
						flashText_and_rejoin('microphone ON!');
					} 
					else {
						saveData(myname+'_muted', true, 1440); i_am_muted = true;
						flashText_and_rejoin('microphone OFF!');
					}
				}
				
			} else {
				speaker.appendChild(document.createTextNode('\uD83D\uDD0A'));//speaker icon
			}
		   }
		}
	}


	this.offerToReceiveVideo = function(error, offerSdp, wp){
		if (error) return console.error ("sdp offer error")

		var msg =  { id : "receiveVideoFrom",
				sender : name,
				sdpOffer : offerSdp
			};
		sendMessage(msg);
	}


	this.onIceCandidate = function (candidate, wp) {

		  var message = {
		    id: 'onIceCandidate',
		    candidate: candidate,
		    name: name
		  };
		  sendMessage(message);
	}

	Object.defineProperty(this, 'rtcPeer', { writable: true});

	this.dispose = function() {}
	
	this.setMode = function(r) {
		this.mode = r;
	}
	
	this.getMode = function() {
		return this.mode;
	}
}
