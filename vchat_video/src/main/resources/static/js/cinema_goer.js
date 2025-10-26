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

	if (coo_volume === null || coo_volume === 'null') coo_volume = 0.5;

	if (name != myname && mode != 'm') {
		saveData(name+'_muted', coo_muted, 1440);
		saveData(name+'_volume', coo_volume, 1440);
	}

	if ((all_muted === true || all_muted === 'true') && name == myname) i_am_muted = true;
	
	if (name == myname) saveData(myname+'_muted', i_am_muted, 1440);

	var container = document.createElement('div');
	
	container.className = CINEMA_GOER_MAIN_CLASS;
	
	container.style.display='none';
	container.style.opacity=0;
	
	container.id = name;
	container.style.position='relative';

	var speaker = document.createElement('div');
	var slider = document.createElement('input');	
	var video = document.createElement('video');

	var rtcPeer;

	document.id('participants').appendChild(container);

	container.appendChild(video);
	container.appendChild(speaker);

	if (mode != 'm' || myname == name) {
		speaker.addEventListener('click', function(e) {e.preventDefault(); e.stopPropagation(); if (name != myname) this.toggleSlider(); else this.toggleMute();});
		speaker.style.cursor = 'pointer';
	}
	
	slider.addEventListener('change', function(e) {e.preventDefault(); e.stopPropagation(); changeVolume();});	

	speaker.className = 'speak';
	speaker.id = 'speaker-' + name;
		
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
	
	var sndMeter = document.createElement('div');
	sndMeter.className = 'snd_meters';
	sndMeter.id = 'sndm_' + name;
	container.appendChild(sndMeter);
	
	document.id(video.id).style.display = 'none';
	
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
		let soundMeter = new SoundMeter(ac);
					
		let fps = 10;
		let vidStream = video.mozCaptureStream ? video.mozCaptureStream(fps) : video.captureStream ? video.captureStream(fps) : null;

		soundMeter.connectToSource(vidStream, function(e) {if (e) {/*alert(e);*/ return;}
		if (document.id('sndm_'+name)) setInterval(() => {
		  document.id('sndm_'+name).style.background = soundMeter.instant.toFixed(3) > 0.005 ? '#090' : 'transparent';
		}, 200);
		});
	  }	
	}	

		
	this.toggleSlider = function() {
		if (check_iOS()) from_changing_slider = false;
		else slider.style.display = slider.style.display == 'block' ? 'none' : 'block';

		this.toggleMute();
	}
	
	this.changeVolume = function() {

		coo_volume=slider.value;
		saveData(name+'_volume', coo_volume, 1440);
		coo_muted  = coo_volume > 0 ? false : true;
		saveData(name+'_muted', coo_muted, 1440);
			
		video.volume = coo_volume;
		from_changing_slider = true;
		
		if ( (video.volume === 0 && !video.muted) || (video.volume && video.muted) ) this.toggleMute();
	}
	
	this.toggleMute = function() {
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
			}}
						
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
