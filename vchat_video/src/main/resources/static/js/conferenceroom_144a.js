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

var ws = new WebSocket('wss://' + location.host + '/groupcall');
var participants = {};
var cinemaGoers = {};
var name;

var pcounter = 0;
var real_pcnt = 0;
var vcounter = 0;
var i_am_guest = 0;
var registered = 0;
var guru_is_here = 0;

var problems = 0;
var suspected = 0;
var altlang = ['en','ru','es','fr','cn','pt'];

var waiting_period = 633000;
var logo_added = 0;

var firstTime = true;
var he_votado = false;

var rect;

var g = {}
var playSomeMusic = false;
var playSomeMusic_muted = true;
var mediaSource;
var analyser;
var N = 0;
g.audioContext = new AudioContext();
g.ctx = new AudioContext();
g.video = {}
g.mixStream = {}
g.captureStreamVideoTrack = {}
g.captureStreamVideoTrack = {}

var only_once = 1;

var shareSomeScreen = false;

var already_being_played = false;
var savedSrc = null;
var recordedVideo = null;
var localStream = null;
//var remoteStream = null;

var now_playing = false;
var __playing = true;

var audio = null;

var audience_numberr = 0; //restored after erroneous commit; THAT should be used for sounding steps.mp3, and not vcounter - or you miss ~50% of new viewers, perhaps due to race --ash
var just_left = '';

var connection_is_good = 1;

var new_message = 0;

var i_am_viewer = true;
 
var i_am_dummy_guest = false; //check demo dummy from join_

var nump = 0; var numv = 0; var num_cinemas = 0;

  
var i_am_on_air = false;
var saved_top = '';
 
const ua = navigator.userAgent.toLowerCase();
const isAndroid = ua.indexOf("android") > -1;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const fps = 15;
const wi = 640;
const fps_hq = 24;
const wi_hq = 1280;

const sp_setter_url = "https://coins2.room-house.com";
const sp_container_url = "https://coins1.room-house.com";
const sm_url = "https://slotmachine.room-house.com";
//const poker_url = "https://room-house.com/poker/";
const poker_url = "https://poker.room-house.com";
const chess_url = "https://chess.room-house.com";
const air_url = "https://bot.skypirl.net";
const swap_url = "https://coins.room-house.com";

//const role  = 0; // debug

const small_device = ((check_iOS() || isAndroid) && screen.width <= 1024) || window != window.top ? true : false;
const tablet = small_device && screen.width >= 960 ? true : false;
const notebook = screen.height <= 800 ? true : false;

const controller = new AbortController();

const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
    const controller = new AbortController();
    const promise = fetch(url, { signal: controller.signal, ...options });
    if (signal) signal.addEventListener("abort", () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return promise.finally(() => clearTimeout(timeout));
};

function visChanger(e) {
	if (document.visibilityState === "visible") window.location.reload();
}

function visRejoiner(e) {
	if (document.visibilityState === "visible") rejoin();
}

window.onbeforeunload = function() {
	ws.close();
};

window.onload = function(){

   window.addEventListener("visibilitychange", visChanger);
		
   setInterval(function(){
       if ((registered && !now_playing)|| problems) {if (problems) rejoin();}

   }, 5000 + Math.random() * 10000);


   setInterval(function(){
       
       if (registered || problems) setTimeout(function() {check_connection()}, 1000); // give more time here to avoid early exits;

   }, 30000 + Math.random() * 10000);
   
   // idiotic check
   /*setInterval(function(){
       
       if (registered) check_fullscreen();

   }, 1000);*/
   
	let loneGuy = getCookie('loneGuy') || 0;
		
	if (loneGuy && typeof(loneGuy) !== 'undefined') {
	  setCookie('loneGuy', 0, 1440); //console.log('here lone guy is', loneGuy);
	  setTimeout(function() {
	    document.getElementsByTagName('iframe')[0].contentDocument.getElementsByTagName('input')[5].click();

	    let v = getCookie('playedFileName') || '';
	    if (v.length) {
	      let fis = document.id('room-header-file').files;
	      for (var i = 0; i < fis.length; i++) {
		if (fis[i].name === v) {
		  if (selectedFile) URL.revokeObjectURL(selectedFile);
		  selectedFile = URL.createObjectURL(fis[i]);
		  curSelInd = i;
		  curMovie = v;		
		  break;
		}
	      }
	    } else {
	      if (document.id('room-header-file').files && document.id('room-header-file').files[0]) selectedFile = URL.createObjectURL(document.id('room-header-file').files[0]);
	      
	    }
	    
	    setTimeout(function() {playSomeMusic = true; /*console.log('clicking cli6');*/ cli6()}, 2000);
	    setTimeout(function() { 
	      let cinemaGuy = getCookie('cinemaGuy') || 0;
	      console.log('here cinemaGuy is', cinemaGuy);
	      if (cinemaGuy && typeof(cinemaGuy) !== 'undefined') {
	        if (document.id('name') && document.id('name').value && document.id('one-'+document.id('name').value)) {
		  document.id('one-'+document.id('name').value).click();
	          console.log('clicked cinemaGuy');
	          setCookie('cinemaGuy', 0, 1440);
		}
	      }
	     }, 7000);    
	  }, 1000);
	}	      
      
	let lang = getCookie('lang');
	lang = (lang === null || lang === 'null') ? 0 : lang;
	lang = lang === '' ? 0 : lang;
	ctr = lang;

	change_lang(altlang[ctr]);
	
	if (!small_device && window == window.top) {
		elements = Array.prototype.slice.call(document.getElementsByClassName("pricee"));

		elements.forEach(function(item) {
			let buy = buy_.get(altlang[ctr]);
        		item.innerHTML = buy;
		});

        	elements = Array.prototype.slice.call(document.getElementsByClassName("gowee"));

        	elements.forEach(function(item) {
                	let go = go_.get(altlang[ctr]);
                	item.innerHTML = go;
        	});
		
		//let he = he_.get(altlang[ctr]);
		//document.id('helpcapo').innerHTML = he;
		
	}
	
	document.id('helplink').href = ctr == 1 ? 'https://github.com/kl3eo/room-house/blob/main/R-H_manual_RUS.pdf' : 'https://github.com/kl3eo/room-house/blob/main/R-H_manual_ENG.pdf';
	
	var vote = getCookie('vote');
	he_votado = (vote === null || vote === 'null') ? he_votado : vote;

}

ws.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);

	switch (parsedMessage.id) {
	case 'youLeft':
		rejoin();
		break;
	case 'pingConn':
		problems = 0; suspected = 0;
		sendMessage({id : 'replyPing'});
		break;
	case 'existingParticipants':
		check_connection();
		setTimeout(function() {onExistingParticipants(parsedMessage);}, 100);
		break;
	case 'existingViewers':
		onExistingViewers(parsedMessage);
		break;
	case 'newParticipantArrived':
		if (!fullscreen) onNewParticipant(parsedMessage);
		break;
	case 'newViewerArrived':
		onNewViewer(parsedMessage);
		break;
	case 'participantLeft':
		onParticipantLeft(parsedMessage);
		break;
	case 'receiveVideoAnswer':
		receiveVideoResponse(parsedMessage);
		break;
	case 'changeTab':
		changeTabLR(parsedMessage);
		break;
	case 'bongoKey':
		bongoKey(parsedMessage);
		break;
	case 'clearCoo':
		clearTimeoutAndLeave();
		break;
	case 'newDrop':
		newDrop(parsedMessage);
		break;
	case 'setGuru':
		setGuru(parsedMessage);
		break;
	case 'askGuru':
		askGuru(parsedMessage);
		break;
	case 'setCinema':
		setCinema(parsedMessage);
		break;
	case 'goodConnection':
		connection_is_good = 1;
		roomees_str = parsedMessage.roomees;
		// console.log('goo1', roomees_str);
		break;
	case 'roomConnection':
		nump = parsedMessage.nump; numv = parsedMessage.numv;  (function(){if (document.id('bstats')) document.id('bstats').fade(1);}).delay(1000);
		break;
	case 'newChatMessage':
		newChatMessage();
		break;
	case 'setAnno':
		setAnno(parsedMessage);
		break;
	case 'setMoviesList':
		setMoviesList(parsedMessage);
		break;
	case 'requestFilm':
		requestFilm(parsedMessage);
		break;
	case 'denyMovie':
		denyMovie(parsedMessage);
		break;
	case 'viewerLeft':
		just_left = parsedMessage.name;
		onViewerLeft(just_left);
		break;
	case 'iceCandidate':
		if (participants[parsedMessage.name]) participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
	           if (error) {
		      console.error("Error adding candidate: " + error);
		      return;
	          }
		}) 
		else
		if (cinemaGoers[parsedMessage.name]) cinemaGoers[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
	           if (error) {
		      console.error("Error adding candidate: " + error);
		      return;
	          }
		})		
	    break;
	default:
		console.error('Unrecognized message', parsedMessage);
	}
}

if (isAndroid) {
screen.orientation.onchange = function (){
    // logs 'portrait' or 'landscape'
    //console.log(screen.orientation.type.match(/\w+/)[0]);
    if (document.id('viewer_menu')) document.id('viewer_menu').setStyles({'opacity': 0,'zIndex': 0});
    let vis = i_am_viewer && vcounter === 1 && cine ? small_device ? 1 : 1 : 0;
    let zi = i_am_viewer && vcounter === 1 && cine  ? 10111 : 0;
    if (document.id('viewer_menu')) setTimeout(function() {window.innerWidth < window.innerHeight && document.id('viewer_menu').setStyles({'zIndex': zi}) && document.id('viewer_menu').fade(vis);}, 1000);
};
} else if (check_iOS()) {
    window.onorientationchange = function () {
      if (document.id('viewer_menu')) document.id('viewer_menu').setStyles({'opacity': 0,'zIndex': 0});
      let vis = i_am_viewer && vcounter === 1 && cine ? small_device ? 1 : 1 : 0;
      let zi = i_am_viewer && vcounter === 1 && cine  ? 10111 : 0;
      if (Math.abs(window.orientation) === 90) {
        // Landscape
      } else {
    	if (document.id('viewer_menu')) setTimeout(function() {document.id('viewer_menu').setStyles({'zIndex': zi});document.id('viewer_menu').fade(vis);}, 1000);
      }
    }
}

function rejoin(){
	already_being_played = false; // ?! to prevent local sound from played video
	leaveRoom(); if (i_am_viewer) leaveRoom(); register();
}

function check_locked(par) { // let guru/user keep connected on server resets, guest leave
	if ((vcounter == 0 || vcounter == '0') && (pcounter == 0 || pcounter == '0') && !cine) { console.log('locked!'); if (role == 0) (function() {if (par) clearAllCookies(); location.reload();}).delay(100)}
}

const check_connection = () => {

	// check_locked(1); // doing check server-side
	connection_is_good = 0;
	var message={id : 'checkConnection'}; 
	sendMessage(message);
	setTimeout(function() { if (!connection_is_good) { if (suspected) problems = 1; if (!problems) suspected = 1; already_clicked = false; if (playSomeMusic) {setCookie('fmode',22,14400); let myname = document.id('name').value; let myvideo = 'video-' + myname; if (document.id(myvideo)) {setCookie('cT_'+curMoviesList[0], document.id(myvideo).currentTime, 14400); /*console.log('saving cT as', document.id(myvideo).currentTime, 'for movie', curMoviesList[0]);*/}} aonly = 1; cammode = 0; playSomeMusic = 0; shareSomeScreen = 0; console.log('resetting connection'); document.id('phones').innerHTML = warning; document.id('room_selector_box').style.zIndex = -10000; (function() { document.id('phones').fade(1)}).delay(1000);} else {if (problems) {} else {if (pcounter == 0 && role != 0) {}}}}, 1200);
}

const check_fullscreen_strict = () => {
	request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data => {
	   if (fullscreen) {
		if ( !data.length || window.screenTop ||  window.screenY || (!(window.innerWidth == screen.width && window.innerHeight == screen.height) && isAndroid) ) {
			fullscreen = false; if (!data.length && cinemaEnabled) rejoin(); else fullscreen = true;
		}		
	   } else {
	   	if ((window.innerWidth == screen.width && window.innerHeight == screen.height) || (!window.screenTop && !window.screenY) || window.fullScreen )
			if (!data.length) rejoin();
	   }
	});
	
}

function check_fullscreen() {
	request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data => {
	   if (fullscreen) {
		if ( !data.length || window.screenTop ||  window.screenY || (!(window.innerWidth == screen.width && window.innerHeight == screen.height) && isAndroid) ) {
			fullscreen = false; if (!data.length) rejoin(); else {fullscreen = true;}
		}		
	   }
	});
}

function signalGuru(e) {

	e.preventDefault();
	e.stopPropagation(); 
 
	var message={id : 'signalGuru'}; 
	sendMessage(message); 

}

function eventHandler(n) {

		var message={id :'keyDown', num: n}; 
		sendMessage(message);
		//console.log('key down!', n);
}

function leftHandler(e) {
	fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
		let role = respo || 0;
		e.preventDefault();
		e.stopPropagation(); 
		let n=parseInt(document.id('leftnum').innerHTML)+1; 
		document.id('leftnum').innerHTML = n.toString(); 
		var message={id :'plus', s: 'l', num: n}; 
		sendMessage(message); 
	
		if (role != 1) {
			setCookie('vote',1,144000);
			he_votado = true;
			//document.id('leftplus').removeEventListener('click', leftHandler);
                	//document.id('rightplus').removeEventListener('click', rightHandler);
		}
	}).catch(err => console.log(err));
}

function noHandler(e) { }
function rightHandler(e) {
	fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
		let role = respo || 0;
        	e.preventDefault();
        	e.stopPropagation(); 
        	let n=parseInt(document.id('rightnum').innerHTML)+1; 
        	document.id('rightnum').innerHTML = n.toString(); 
        	var message={id :'plus', s: 'r', num: n}; 
        	sendMessage(message); 
		he_votado = true;

		if (role != 1) {
			setCookie('vote',1,144000);
			he_votado = true;
			//document.id('leftplus').removeEventListener('click', leftHandler);
                	//document.id('rightplus').removeEventListener('click', rightHandler);
		}
	}).catch(err => console.log(err));
}


const register = () => {

	if (document.id('house')) document.id('house').style.visibility='hidden';
	if (document.id('room_name_id')) document.id('room_name_id').style.display='none';
	if (document.id('preroom')) document.id('preroom').style.visibility='hidden';
	var av = getCookie('av');
	if (av && guru_is_here) aonly = 0;
// console.log('av', av, 'guru', guru_is_here, 'aonly', aonly);
	
	let sem  = window.innerWidth > 1024 ? '7' : '';
	
	if (!aonly) { if (document.id('av_toggler')) document.id('av_toggler').className = "bigO av_toggler_f" } else { if (document.id('av_toggler')) document.id('av_toggler').className = "bigO av_toggler"; document.id('bcam').className="bigO bcam"; document.id('fcam').className="bigO fcam"; }
	
	if (ws.readyState === WebSocket.OPEN) { problems = 0; suspected = 0; }
	
	if (ws.readyState === WebSocket.CLOSED) {
		
		ws = new WebSocket('wss://' + location.host + '/groupcall');
		ws.onmessage = function(message) {
			var parsedMessage = JSON.parse(message.data);
			switch (parsedMessage.id) {
				case 'youLeft':
					rejoin();
					break;
				case 'pingConn':
					problems = 0; suspected = 0;
					sendMessage({id : 'replyPing'});
					break;
				case 'existingParticipants':
					check_connection();
					setTimeout(function() {onExistingParticipants(parsedMessage);}, 100);
					break;
				case 'existingViewers':
					onExistingViewers(parsedMessage);
					break;
				case 'newParticipantArrived':
					if (!fullscreen) onNewParticipant(parsedMessage);
					break;
				case 'newViewerArrived':
					onNewViewer(parsedMessage);
					break;
				case 'participantLeft':
					onParticipantLeft(parsedMessage);
					break;
				case 'receiveVideoAnswer':
					receiveVideoResponse(parsedMessage);
					break;
				case 'changeTab':
					changeTabLR(parsedMessage);
					break;
				case 'bongoKey':
					bongoKey(parsedMessage);
					break;
				case 'clearCoo':
					clearTimeoutAndLeave();
					break;
				case 'newDrop':
					newDrop(parsedMessage);
					break;
				case 'setGuru':
					setGuru(parsedMessage);
					break;					
				case 'askGuru':
					askGuru(parsedMessage);
					break;
				case 'setCinema':
					setCinema(parsedMessage);
					break;
				case 'goodConnection':
					connection_is_good = 1;
					roomees_str = parsedMessage.roomees;
					// console.log('goo2', roomees_str);
					break;
				case 'roomConnection':
					nump = parsedMessage.nump; numv = parsedMessage.numv; (function(){if (document.id('bstats')) document.id('bstats').fade(1);}).delay(2000);
					break;
				case 'newChatMessage':
					newChatMessage();
					break;
				case 'setAnno':
					setAnno(parsedMessage);
					break;
				case 'setMoviesList':
					setMoviesList(parsedMessage);
					break;
				case 'requestFilm':
					requestFilm(parsedMessage);
					break;
				case 'denyMovie':
					denyMovie(parsedMessage);
					break;
				case 'viewerLeft':
					just_left = parsedMessage.name;
					onViewerLeft(just_left);
					break;
				case 'iceCandidate':
					if (participants[parsedMessage.name]) participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
					   if (error) {
		      				console.error("Error adding candidate: " + error);
		      				return;
	          			   }
					}) 
					else
					if (cinemaGoers[parsedMessage.name]) cinemaGoers[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
					   if (error) {
					      console.error("Error adding candidate: " + error);
					      return;
	 			            }
					})
				break;
				default: console.error('Unrecognized message', parsedMessage);
			}
		} 
	} else {}
		
	name = document.id('name').value; let cookie_name = loadData('name');
	if (!name.length) name = cookie_name; 
	if (!name.length || name === 'null') {name=makeid(8); name = name+'_'+name; saveData('name', name, 1440);}
	
	var gi = new RegExp('GURU:','g');
	if (name.match(gi) && cine) {name=makeid(8); name = 'GURU:'+name+'_'+name; saveData('name', name, 1440);document.id('name').value=name}
	
	if (i_am_dummy_guest) { //it wouldn't help?!

		fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
 
			let role = respo || 0;
//console.log('registering as dummy guest, after fetch');
			register_body(role);
			i_am_dummy_guest = false; //only one time is enough?! 
		
		}).catch(err => console.log(err));
	} else { register_body(role);}

}

const register_body = (ro) => {
	
		var plr = getCookie('player');
		//var mo = getCookie('cinemaMode');
		
		let w = window.location.hostname.split('.'); 
		let room = document.id('roomName').value == '' ? w[0] : document.id('roomName').value;
		let house = w[0];
	
		let curip = document.id('curip').value;
		registered = 1;
		window.removeEventListener("visibilitychange", visChanger);
		if (small_device && window == window.top)  window.addEventListener("visibilitychange", visRejoiner);
			
		let sem  = window.innerWidth > 1024 ? '7' : '';
		if (temporary && ro == 0) role = 3;

		if (ro == -1) {soundEffect.src = "/sounds/lock.mp3"; setTimeout(function() {location.reload()}, 1200); console.log('Knock out2'); return false;}

		//define in case the onload retarded; doesn't help in iOS?
		let l = checkLang();		
		change_lang(altlang[l]);
			
		document.id('room-header').innerText = 'ROOM ' + room;

		document.id('join').style.display = 'none';

		document.id('room').style.display = 'block';
		
		document.id('preroom').innerHTML='&nbsp;';
		document.id('postroom').style.display = 'none';
		
		(function() {
			document.id('house').style.minHeight = '0px';
			document.id('house').style.background = 'transparent';
			document.id('house').style.display = 'block';
			document.id('house').style.visibility = 'visible';
		
		}).delay(1000);
		
		document.id('phones').style.display = 'block';
		document.id('phones').style.visibility = 'visible';
		document.id('cr').style.display = 'none';
		document.id('av_selector').style.display = 'block';
		document.id('poll').style.display = 'block';
		if (voting_shown) {document.id('leftnum').style.display = 'block'; document.id('rightnum').style.display = 'block';}
	
		let curr_all_muted = getCookie('all_muted') || false;
		let my_mic_muted = loadData(document.id('name').value+'_muted');

		document.id('all_muter').className = check_iOS() && my_mic_muted !== true && my_mic_muted !== 'true' ? "bigO my_mic_on_all_off" : (my_mic_muted === true || my_mic_muted === 'true') && !curr_all_muted && role ? "bigO my_mic_off" : curr_all_muted ? "bigO allmuter_off" : "bigO allmuter_on";
		
		
		document.id('all_muter').title = document.id('all_muter').className === "bigO my_mic_on_all_off" ? 'Turn on sound' : document.id('all_muter').className === "bigO allmuter_off" ? 'Turn on sound' : document.id('all_muter').className === "bigO my_mic_off" ? 'Turn on microphone' : 'Turn off sound'
	
		document.id('leftplus').style.display = 'block';
		document.id('rightplus').style.display = 'block';

        	if (( (ro == 1) || !he_votado) && firstTime) {

                	//document.id('leftplus').addEventListener('click', leftHandler);
                	//document.id('rightplus').addEventListener('click', rightHandler);
			addEventListener("keydown", (event) => {
  				//event.keyCode === 65 ? leftHandler(event) : event.keyCode === 76 ? rightHandler(event) : noHandler(event);
				let n = event.keyCode ? event.keyCode : 65;
				if (n === 66) { if (document.id('controls').style.display === 'none' && !small_device) document.id('message_wrap').style.marginTop = '48vh'; cli5(); }
				eventHandler(n);
			});
                	firstTime = false;
        	}

		document.id('fmode_selector').style.display = 'block';
		//if (document.id('newsub') && ro == 1) 
			document.id('newsub').style.display = 'block';
		

		if(document.id('rh_container')) document.id('rh_container').style.display = 'none';
		
		// brute force
		all_muted = getCookie('all_muted');
		
		if (all_muted === true || all_muted === 'true' || my_mic_muted === true || my_mic_muted === 'true') i_am_muted = true;
		

		let mode = (i_am_muted === true || i_am_muted === 'true') ? 'm' : aonly ? 'a' : 'v';
		
		//mode = plr && mo ? 'c' : plr ? 'p' : mode;
		mode = plr ? 'p' : mode;
		
		let tok = getCookie('authtoken') || '';
		
		if (ro == 0 && hack) role = 1;
	
	// NB: this is a very bad approach
	// if (document.id('house') && !small_device) {document.id('house').style.minWidth='1000px';}

// console.log('registering, mode is' ,mode, 'role is', role, 'name is', name);
		let formData = new FormData();
		formData.append('addr', curip);
		
		//fetch('https://'+window.location.hostname+':'+port+'/cgi/genc/checker.pl', {body: formData, method: 'post', credentials: 'include'}).then(respo => respo.text()).then((respo) => {
		fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {body: formData, method: 'post', credentials: 'include'}).then(respo => respo.text()).then((respo) => {
			let role = respo || 0;
		}).catch(err => console.log(err));
	
		request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data=>{
//console.log('reg: acc_id is', data);
		   let message = {
			id : 'joinRoom',
			name : name,
			mode : mode,
			room : room,
			house : house,
			curip: curip,
			acc_id: data,
			token: tok,
			role: role,
			currRoom: currRoom
		   }
	
		   sendMessage(message);		
		});
/*
console.log('here token', tok,'val',document.id('asender').value,'name',document.id('name').value)
*/
 		if (problems) {
			document.id('phones').style.paddingTop = small_device ? '39vh' : '45vh'; document.id('phones').style.lineHeight = '36px'; document.id('phones').innerHTML = warning;
			(function() { document.id('phones').fade(1)}).delay(500);
		}

  		if(stats_shown) { (function(){document.id('stats').style.display='block'; document.id('stats').fade(1);}).delay(1000);}		
		
		if (!small_device && document.id('helpdoc')) (function() {let l = checkLang(); /*if (!small_device) document.id('helpdoc').style.marginRight = "4.8vw";*/

		if (small_device) {document.id('helpdoc').style.paddingTop = "0.4vh"; document.id('helpdoc').style.paddingRight = "2vw";}
		
		if (!small_device && window != window.top) {document.id('helpdoc').style.marginRight = "2vw";} document.id('helpdoc').fade(1);}).delay(500);
		if (small_device && window != window.top) {document.id('message_wrap').style.marginLeft = "-10px";document.id('message_wrap').style.width = "330px";document.id('antichatter').style.marginLeft = "290px";}
		
		document.body.style.overflowY = 'auto';
				
		(function() {dummies = true;}).delay(3000);
		
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		
		// IMPORTANT: get SDP_ALREADY_NEGOTIATED for camera auto re-activation, so leave it only for players?!

		if (role == 1 && !already_clicked && problems) {
			already_clicked = true; let ca = getCookie('fmode'); let av = getCookie('av'); 
			(function() {
				if (ca == 0 && av) {console.log('clicking 2!');cli2();} 
				if (ca == 1 && av) {console.log('clicking 3!');cli3();} 
				if (ca == 22) { playSomeMusic=true; getFile(); cli6(); 
					if (document.id('asender').value.length) { //hack ash : this value is set only manually?
						let  a = document.id('asender').value.replace(/'/g, ''); let tok = getCookie('authtoken');let counter = 0;
						const inter = setInterval(function() {
							counter++; sendMessage({id : 'setAnno', anno:a, addr: document.id('name').value, token: tok});
							/*console.log('here token', tok,'val',document.id('asender').value,'name',document.id('name').value, 'counter', counter);*/ 
							if (document.id('anno_' + document.id('name').value) || counter > 5) {
								clearInterval(inter);
								let myvideo = 'video-' + document.id('name').value;
								if (document.id(myvideo)) {
									document.id(myvideo).pause();__playing = false;
								}
							}
						}, 3000);
					}
				} 
				console.log('auto re-connect, ca is', ca, 'av is', av);
			}).delay(200);
		}
		
		setTimeout(function() {check_locked(1)}, 5000); // give more time here to avoid slow server push to exit 
}

function checkLang() {
	let l = getCookie('lang');
	l = (l === null || l === 'null') ? w[0].match(new RegExp('rgsu','g')) ? 1 : 0 : l === '' ? 0 : l;
	
	return l;
}

const onNewViewer = (request) => {

	if (request.currRoom && currRoom != request.currRoom) return false; // do not connect those coming to a room other than mine current

	
	let myname = document.id('name').value; let myvideo = 'video-' + myname;	
	if ((now_playing && cinemaEnabled && playSomeMusic && request.accid.length) || (now_playing && !cinemaEnabled && playSomeMusic)) (function() {if (document.id(myvideo)) document.id(myvideo).play();__playing = true;}).delay(1000);

	if (request.ng) {if (document.id('num_guests')) document.id('num_guests').innerHTML = request.ng;}
	room_limit = (typeof request.rl !== 'undefined') ? request.rl : room_limit;

		let na = request.name.split('_');
		let short_name = na[0];
		let suf = na[na.length-1];
	
		let f = request.name;
		let t = request.curip;
		let vi = 'video-' + f;
	
		if (document.id('_au_'+suf)) document.id('_au_'+suf).dispose();
		
		let medal = !temporary ? '<span id=_o_'+suf+' style="display:none;cursor:pointer;font-size:36px;border-radius:20px;" onclick="if (this.style.background === \'#9cf\') {set_guru(3,\'' + f + '\');this.style.background=\'transparent\';this.onclick=function(){set_guru(2,f);this.style.background=\'#9cf\';}} else {set_guru(2,\'' + f + '\');this.style.background=\'#9cf\';this.onclick=function(){set_guru(3,\'' + f + '\');this.style.background=\'transparent\';}}">O</span> ' : '';

		let audi = document.id('audience_boxx').innerHTML == 'Audience is empty :(' ? '' : document.id('audience_boxx').innerHTML;	
		audi = '<div id=_au_'+suf +'>' + medal + '<span id=au_' + suf + ' style="color:#9cf;cursor:pointer;" onclick="set_guru(1,\'' + f + '\');">'+short_name + '</span>, ' + t + ' <span style="cursor:pointer;"  onclick="drop_guest(\'' + f + '\')" >X</span></div>' + audi;
		document.id('audience_boxx').innerHTML = audi;
		
		let theati = document.id('audience_boxx').innerHTML == 'Audience is empty :(' ? '' : document.id('theater_rows_boxx').innerHTML;
		
		if (myname != request.name) {

		   let left_random = 60 + Math.floor(Math.random() * 400);
		   let top_random = 60 + (-1) * Math.floor(Math.random() *30);

		   let x = document.id('video-' + f) && document.id('video-' + f).muted == true ? 'X' : '';
		
		   theati = theati + '<div id=_th_'+suf +' style="position:absolute;left:'+left_random+'px;top:'+top_random+'px;width:60px;height:60px;border-radius:30px;background:#012;padding-top:45px;cursor:pointer;z-index:2000;" onclick="if (document.id(\'' + vi + '\')) { document.id(\'' + vi + '\').muted=(document.id(\'' + vi + '\') && document.id(\'' + vi + '\').muted == true) ? false : true; document.id(\'sndm_' + f + '\').innerText=(document.id(\'' + vi + '\') && document.id(\'' + vi + '\').muted == true) ? \'X\' : \'\';}"><div id="sndm_'+f+'" class="snd_meters" style="z-index:10112;font-size:16px;color:#fed;">' + x + '</div><span id=th_' + suf + ' style="color:#9cf;cursor:pointer;">'+t+'</span></div>';
		}

		if (document.id('theater_rows_boxx') && cine && !normal_mode && i_am_viewer) (function() {document.id('theater_rows_boxx').innerHTML = theati;}).delay(2000);
		
		let ar_split = audi.split('_au_');
		let cur = ar_split.length - 1;
		
		//let mu = loadData(request.name+'_muted');
		if (myname != request.name && i_am_viewer && cine) receiveCGAudio(request.name, 'a');
				
		document.id('audience_numbers').innerHTML = cur;
		let col = cur > 0 ? '#369' : '#ccc';
		document.id('audience_numbers').setStyles({'color': col});
		
		vcounter = cur; if (document.id('vcounter')) document.id('vcounter').innerHTML = vcounter;
		
		let vis = i_am_viewer && vcounter === 1 && cine ? small_device ? 1 : 1 : 0;
		let zi = i_am_viewer && vcounter === 1 && cine  ? 10111 : 0;
		if (document.id('viewer_menu') && !lori) setTimeout(function() {document.id('viewer_menu').setStyles({'zIndex': zi});document.id('viewer_menu').fade(vis);}, 1000);
				
		if (just_left != f && document.id('name').value != f && document.id('name').value != just_left) { if (cine) {soundEffect.src = "/sounds/coin.mp3";} else {soundEffect.src = "/sounds/steps.mp3";}}
}

const onNewParticipant = (request) => {

  if (request.currRoom && currRoom != request.currRoom) return false; // do not connect those coming to a room other than mine current
  
  if (request.ng) {if (document.id('num_guests')) document.id('num_guests').innerHTML = request.ng;}
	
	let myrole = role;
	
	let myname = document.id('name').value;
	let myvideo = 'video-' + myname;	
	if (now_playing) (function() {document.id(myvideo).play();__playing = true;}).delay(3000);

	var theCookies = document.cookie.split(';');
    	var really_new = 1;
	var video_hidden = 0;
	
	room_limit = (typeof request.rl !== 'undefined') ? request.rl : room_limit;
		
    	for (var i = 1 ; i <= theCookies.length; i++) {

		if ( theCookies[i-1].match(request.name+'_hidden') ) 
		{ 

				video_hidden = 1;
				really_new = 0;
				break;
		}
			
		if (!video_hidden) {
           		var ls_muted = localStorage.getItem(request.name+'_muted');
			if ( theCookies[i-1].match(request.name+'_muted') || (ls_muted !== null && ls_muted !== 'null') ) 
			{ 

				really_new = 0; 
				break;
			}
		}

    	}

	if (really_new) soundEffect.src = "/sounds/coin.mp3";
	
	let my_mic_muted = loadData(document.id('name').value+'_muted');
	document.id('all_muter').className = check_iOS() && my_mic_muted !== true && my_mic_muted !== 'true' ? "bigO my_mic_on_all_off"	: document.id('all_muter').className;

	if (!video_hidden) {

		//preparing logics in advance
		let pctr = pcounter + 1;
		if (pctr > room_limit - 1 && i_am_viewer) {if (document.id('bell')) document.id('bell').style.display = 'block'; if (document.id('av_toggler')) document.id('av_toggler').style.display='none';}

		if (!small_device && window == window.top) resizer(pctr);
		
		if (small_device || tablet) {
		 // new guy
		 document.id('participants').style.marginTop = '-68vh';
		 if (small_device && pcounter === 0) document.id('participants').style.height = window == window.top ? '50vh' : '63vh';
		 if (small_device && pcounter === 1) document.id('participants').style.height = window == window.top ? '110vh' : tablet ? '140vh' : '128vh';
		 if (small_device && pcounter === 2) document.id('participants').style.height = window == window.top ? '160vh' : '190vh';
		 if (small_device && pcounter === 3) document.id('participants').style.height = window == window.top ? '220vh' : '250vh';
		 if (small_device && pcounter > 3) document.id('participants').style.height = window == window.top ? '275vh' : '300vh';

		 // take care when only 1 participant in audio mode, small device
		 /*if (small_device && pcounter === 0) {
			if (Object.keys(participants) && Object.keys(participants).length === 1) {	
				for (var key in participants) {
					if (participants[key].mode === 'a') {
						document.id('participants').style.height = '35vh';
						document.id('participants').style.marginTop = '-45vh';					
					}
				}
			}		 	
		 }*/
		}
		
// console.log('name:', request.name, 'mode:', request.mode, 'myrole:', myrole);
	   	
		receiveVideo(request.name, request.mode, myrole);
		
		(function() {if (document.id(request.name)) {document.id(request.name).style.display='block'; document.id(request.name).fade(1);}}).delay(500); //need this animation because the new video appears under the row, so we hide it
		
		//set new sound according to all_muter
		let noSound = document.id('all_muter').className === "bigO my_mic_on_all_off" || document.id('all_muter').className === "bigO allmuter_off"
		let vid = document.id('video-' + request.name);

		vid.muted = noSound;
		if (cine) vid.muted = true; // serpom po mandarinam
		
		// should check muted mic here, too
		if (request.mode === 'm') vid.muted = true;
		
		let spea = document.id('speaker-' + request.name);
		spea.removeChild(spea.childNodes[0]);
		request.mode !== 'm' && (noSound || cine) && spea.appendChild(document.createTextNode('\uD83D\uDD07'));//muted icon
		request.mode !== 'm' && !noSound && !cine && spea.appendChild(document.createTextNode('\uD83D\uDD0A'));//speaker icon
		request.mode === 'm' && spea.appendChild(document.createTextNode('X'));//x icon

				
		if (request.curip.length && document.id('loco_'+request.name) && !ValidateIPaddress(request.curip)) {
			document.id('loco_'+request.name).innerHTML = request.curip;
			document.id('loco_'+request.name).style.display='block';
			document.id('loco_'+request.name).fade(1);			
		}
// console.log('cine:', cine, 'role', role);
		if (cine && role != 1) {
			(function() {document.id('loco_' + request.name).fade(0);document.id('span_' + request.name).fade(0);}).delay(2000);
		}
		
		if (document.id('acco_'+request.name) && ValidateAccountId(request.acc_id) ) {
			document.id('acco_'+request.name).style.display='block';
			let na = request.name.split('_');
			let ac = request.acc_id;
			document.id('acco_'+ request.name).fade(1);
			document.id('acco_' + request.name).onclick = function(e) {
				e.preventDefault(); e.stopPropagation(); copy(ac); flashText('copied '+ na[0]);
				request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data => {
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
				});				
			}
			if (document.id('sp_container' && sp_shown) && document.id('sp_container').style.display != 'block') document.id('acco_'+request.name).style.visibility='hidden';			
		}

	}
		let vis = i_am_viewer && vcounter === 1 && cine && (request.mode == 'p' || request.mode == 'c')? small_device ? 1 : 1 : 0;
		let zi = i_am_viewer && vcounter === 1 && cine  ? 10111 : 0;
		if (document.id('viewer_menu') && !lori) setTimeout(function() {document.id('viewer_menu').setStyles({'zIndex': zi});document.id('viewer_menu').fade(vis);}, 1000);
}

function receiveVideoResponse(result) {
	//console.log('receiving response for', result.name);
	if (participants[result.name]) {participants[result.name].rtcPeer.processAnswer (result.sdpAnswer, function (error) {
		if (error) return console.error (error);
	})
	//console.log('receiving response for participant', result.name);
	}
	else {
	if (cinemaGoers[result.name]) {cinemaGoers[result.name].rtcPeer.processAnswer (result.sdpAnswer, function (error) {
		if (error) return console.error (error);
	})
	}
	//console.log('receiving response for cinema goer', result.name);
	}	
}

function callResponse(message) {
	if (message.response != 'accepted') {
		console.info('Call not accepted by peer. Closing call');
		stop();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
			if (error) return console.error (error);
		});
	}
}

async function startCapture(displayMediaOptions) {
	
	let captureStream = null;

	try {
		captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
	} catch(err) {
		console.error("Error: " + err);
	}
		
	return captureStream;
}

const onExistingViewers = (msg) => {

   let myname = document.id('name').value;
   
   let audience = '';
   let theater_rows = '';

   let play_sound = myname == just_left ? false : true;
   
   if (msg.ng) {if (document.id('num_guests')) document.id('num_guests').innerHTML = msg.ng;}
   
   room_limit = (typeof msg.rl !== 'undefined') ? msg.rl : room_limit;
  
   if (msg.data) {
   	   var arr = msg.data.sort();
	   for (var i = 0; i < arr.length; i++) {
		var chu = arr[i].split('_|_');

		let f = chu[0];
		let t = chu[1];
		
		if (f == just_left) {
			just_left = '';
			play_sound = false;
		}
		
		let na = f.split('_');
		let short_name = na[0];
		let suf = na[na.length-1];
		
		if (f == myname) {

			play_sound = false;
			var lang = getCookie('lang');
			if (t.length && (lang === null || lang === 'null')) {
				let ar = /, AR$/.test(t);
				let br = /, BR$/.test(t);
				let ru = /, RU$/.test(t);
				
				if (ar) {ctr = 2} else {if (br) {ctr = 5} else {if (ru) {ctr = 1} else {}}}
				change_lang(altlang[ctr]);
			}
		} 
		
		let left_random = f != myname ? 60+ Math.floor(Math.random() * 400) : 10;
		let top_random = f != myname ? 60 + (-1) * Math.floor(Math.random() * 30) : 90;
		
		let rs = f != myname ? '60px': '60px';
		let br = f != myname ? '30px': '30px';
		let bg = f != myname ? '#012': '#012';

		if (i_am_viewer && myname != f && cine) {
		
			receiveCGAudio(f, 'a');



			let x = document.id('video-' + f) && document.id('video-' + f).muted == true && myname != f ? 'X' : '';
			x = document.id('video-' + f) && myname === f ? localStream.getAudioTracks()[0].enabled ? '' : 'X' : x;
			x = document.id('video-' + f) ? x : '';

			theater_rows = theater_rows + '<div id=_th_'+suf +' style="position:absolute; left:'+left_random+'px;top:'+top_random+'px;width:'+rs+';height:'+rs+';border-radius:'+br+';background:'+bg+';padding-top:45px;cursor:pointer;z-index:2001;" onclick="if (document.id(\'video-' + f + '\')) {document.id(\'video-' + f + '\').muted=document.id(\'video-' + f + '\').muted == true ? false : true; document.id(\'sndm_' + f + '\').innerText=document.id(\'video-' + f + '\').muted == true ? \'X\' : \'\';}"><div id="sndm_'+f+'" class="snd_meters" style="z-index:10112;font-size:16px;color:#fed">' + x + '</div><span id=th_' + suf + ' style="color:#9cf;cursor:pointer;">' + t + '</span></div>';
		}
		
		if (i_am_viewer && myname === f && !i_am_muted && cine) {
			//console.log('Here we activate local camera!')
			var cinemaGoer = new CinemaGoer(f, document.id('name').value, 'a' );
			cinemaGoers[f] = cinemaGoer;let vi =
	
			g.video = cinemaGoer.getVideoElement();
      
			var constraints = {
                		audio : true,
                		video: false
			};

			var options = {
				localVideo: g.video,
				mediaConstraints: constraints,
				onicecandidate: cinemaGoer.onIceCandidate.bind(cinemaGoer)
			}
	
			cinemaGoer.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
                  	   if(error) {
				var ff = new RegExp('closed','ig');
				if (error.toString().match(ff)) { } else {
			  		cinemaGoer.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                                        if(error) {
                                                return console.error(error);
                                        }

                                        	startVideo(g.video);
                                        	this.generateOffer (cinemaGoer.offerToReceiveVideo.bind(cinemaGoer));
						localStream = cinemaGoer.rtcPeer.getLocalStream();
                         		});
				}

				return false;
                  	   } else {
                  		startVideo(g.video);
                  		this.generateOffer (cinemaGoer.offerToReceiveVideo.bind(cinemaGoer));
				localStream = cinemaGoer.rtcPeer.getLocalStream();
				//console.log('local stream', localStream)

				x = document.id('video-' + f) && myname === f ? localStream.getAudioTracks()[0].enabled ? '' : 'X' : x;

				theater_rows = theater_rows + '<div id=_th_'+suf +' style="position:absolute; left:'+left_random+'px;top:'+top_random+'px;width:'+rs+';height:'+rs+';border-radius:'+br+';background:'+bg+';padding-top:45px;cursor:pointer;z-index:2001;" onclick="if (document.id(\'video-' + f + '\')) {localStream.getAudioTracks()[0].enabled = localStream.getAudioTracks()[0].enabled === true ? false : true; document.id(\'sndm_' + f + '\').innerText = localStream.getAudioTracks()[0].enabled === true ? \'\' : \'X\';}"><div id="sndm_'+f+'" class="snd_meters" style="z-index:10112;font-size:16px;color:#fed">' + x + '</div><span id=th_' + suf + ' style="color:#9cf;cursor:pointer;">' + t + '</span></div>';
		  	   }
         		});		
		}
		
		//setting volume
		// let vi = 'video-' + f;
		let coo_volume = loadData(f+'_volume');
		if (document.id('slider_' + f)) document.id('slider_' + f).value = coo_volume;
		if (document.id('video-' + f)) document.id('video-' + f).volume = coo_volume;
		
		if (document.id('_au_'+suf)) document.id('_au_'+suf).dispose();
		if (document.id('_th_'+suf)) document.id('_th_'+suf).dispose();
	
		let medal = !temporary ? '<span id=_o_'+suf+' style="display:none;cursor:pointer;font-size:36px;border-radius:20px;" onclick="if (this.style.background === \'#9cf\') {set_guru(3,\'' + f + '\');this.style.background=\'transparent\';this.onclick=function(){set_guru(2,f);this.style.background=\'#9cf\';}} else {set_guru(2,\'' + f + '\');this.style.background=\'#9cf\';this.onclick=function(){set_guru(3,\'' + f + '\');this.style.background=\'transparent\';}}">O</span> ' : '';
		audience = audience + '<div id=_au_'+suf +'>' + medal + '<span id=au_' + suf + ' style="color:#9cf;cursor:pointer;" onclick="set_guru(1,\'' + f + '\');">'+short_name + '</span>, ' + t + ' <span style="cursor:pointer;" onclick="drop_guest(\'' + f + '\')" >X</span></div>';

		
	   } //for
	   
	   if (arr.length == 0) {audience = 'Audience is empty :(';document.id('audience_numbers').setStyles({'color':'#ccc'});document.id('audience_numbers').innerHTML = '...'; audience_numberr = 0; vcounter = 0; if (document.id('vcounter')) (function(){document.id('vcounter').innerHTML = vcounter;}).delay(500);} else {document.id('audience_numbers').setStyles({'color':'#369'}); document.id('audience_numbers').innerHTML = arr.length;

		if (arr.length > audience_numberr && arr.length > 0 && play_sound) {
	   		soundEffect.src = "/sounds/steps.mp3";
		}
		audience_numberr = arr.length; vcounter = arr.length; if (document.id('vcounter')) document.id('vcounter').innerHTML = vcounter;
	   }
	   if (document.id('audience_boxx')) document.id('audience_boxx').innerHTML = audience;
	   if (document.id('theater_rows_boxx') && cine && !normal_mode && i_am_viewer) (function() {document.id('theater_rows_boxx').innerHTML = theater_rows;}).delay(2000); // wait localstream

   }

   let vis = i_am_viewer && vcounter === 1 && cine ? small_device ? 1 : 1 : 0;
   let zi = i_am_viewer && vcounter === 1 && cine  ? 10111 : 0;
   if (document.id('viewer_menu') && !lori) setTimeout(function() {document.id('viewer_menu').setStyles({'zIndex': zi});document.id('viewer_menu').fade(vis);}, 1000);
}

const set_guru = (par, who) => {
	fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
		let role = respo || 0;

		if (role == 1) {
			let tok = getCookie('authtoken') || '';
			let message = {
				id : 'setGuru',
				name : who,
				mode : par,
				token: tok
			}		
			sendMessage(message);

		} else {

			if (document.id('name').value == who ) {
				chat_shown = 1; document.id('logger').click(); document.id('audience').click(); rejoin();
			}
		}
	}).catch(err => console.log(err));
}

function drop_guest(who) {

	fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
		let role = respo || 0;

		if (role == 1) {
			let tok = getCookie('authtoken') || '';
			let message = {
				id : 'dropGuest',
				name : who,
				token: tok
			}		
			sendMessage(message);
			vcounter--; if (document.id('vcounter')) document.id('vcounter').innerText = vcounter;
			if (vcounter === 0) {document.id('audience_numbers').setStyles({'color':'#ccc'});document.id('audience_numbers').innerHTML = '...'; document.id('audience_boxx').innerText = 'Audience is empty :(';}
			if (vcounter) document.id('audience_numbers').innerText = vcounter;

		} else {
			onViewerLeft(who);
		}

		let l = who.split('_');
		if (document.id('_au_'+l[1])) document.id('_au_'+l[1]).dispose(); //let it happen	
		
	}).catch(err => console.log(err));
}
/*
function isMicrophoneAllowed(){
    navigator.permissions.query({
        name: 'microphone'
    }).then(function(permissionStatus){
        return permissionStatus.state !== 'denied';
    });
}
*/	
const onExistingParticipants = (msg) => {
//sets up every video in the room I just joined

  let myname = document.id('name').value;
  let cRoom= ''; 

   
   if (role == 0 && hack) role = 1;

   if (msg.num_rooms) num_rooms = msg.num_rooms;
   if (msg.roomees) roomees_str = msg.roomees;
   // console.log('num_rooms', num_rooms);
   
   let room_sel = ''; var sym = 'A';
   roomees_str = roomees_str ? roomees_str : 'room1;room2;room3;room4;room5;room6';
   let roomees_arr = roomees_str ? roomees_str.split(';') : ();
   
   for (i = 1; i <= num_rooms; i++) {
   	sym = i == 2 ? 'B' : i == 3 ? 'C' : i == 4 ? 'D' : i == 5 ? 'E' : i == 6 ? 'F' : sym;
	// let addon = sym == currRoom ? '&nbsp;&nbsp;<span style="color:#fed;border:0px solid #fed; padding:3px">ROOM' + i + '</span>&nbsp;&nbsp;' : '&nbsp;&nbsp;<span style="color:#9cf;cursor:pointer; padding:3px" onclick="currRoom = \'' + sym + '\';/*console.log(\'sym\',currRoom);*/(function(){document.id(\'bg_switch\').click()}).delay(500);flashText_and_rejoin(\'SKIP TO ROOM \' + currRoom);">ROOM' + i + '</span>&nbsp;&nbsp;';
	let addon = sym == currRoom ? '&nbsp;&nbsp;<span style="color:#fed;border:0px solid #fed; padding:3px">' + roomees_arr[i-1] + '</span>&nbsp;&nbsp;' : '&nbsp;&nbsp;<span style="color:#9cf;cursor:pointer; padding:3px" onclick="currRoom = \'' + sym + '\'; cRoom = \'' + roomees_arr[i-1] + '\';/*console.log(\'sym\',currRoom);*/(function(){document.id(\'bg_switch\').click()}).delay(500);flashText_and_rejoin(\'SKIP TO \' + cRoom);">\"' + roomees_arr[i-1] + '\"</span>&nbsp;&nbsp;';
 
	room_sel = room_sel + addon;
   }
   if (num_rooms == 1) room_sel = '';
   if (num_rooms < 4) document.id('room_selector_box').style.left='-10px';
   if (num_rooms === 4) document.id('room_selector_box').style.left='-25px';
   if (num_rooms === 5) document.id('room_selector_box').style.left='-80px';
   if (num_rooms > 5) document.id('room_selector_box').style.left='-135px';

   /*if (num_rooms < 4) document.id('room_selector_box').style.left='-30px';
   if (num_rooms === 4) document.id('room_selector_box').style.left='-55px';
   if (num_rooms === 5) document.id('room_selector_box').style.left='-120px';
   if (num_rooms > 5) document.id('room_selector_box').style.left='-180px';
   */
   
   document.id('room_selector').innerHTML = room_sel;

   if (temporary && role == 0) role = 3;
	
   if (role == 1 || role == 2 || role == 3)  {

	let fmode = getCookie('fmode') ? 'environment' : 'user';
		
	i_am_viewer = false;	

//?! brute force
all_muted = getCookie('all_muted');
if (all_muted === true || all_muted === 'true') i_am_muted = true;

	let mode = (i_am_muted === true || i_am_muted === 'true') ? 'm' : aonly ? 'a' : 'v';
// console.log('Creating participant with name', name, 'myname', myname);	
	var participant = new Participant(name, myname, mode, role);
	participants[name] = participant;
	
	g.video = recordedVideo ?  recordedVideo : participant.getVideoElement();
// console.log('..and video is', g.video);
	
	var canvas = check_iOS() ? participant.getCanvasElement() : '';

	var constraints = {
                audio: true,
                video: {
                        maxWidth : wi_hq,
                        maxFrameRate : fps_hq,
                        minFrameRate : fps_hq,
			facingMode: fmode
                }
	};

	var constraints_vonly = {
                audio: false,
                video: {
			facingMode: fmode
               	}
	};
		
	var constraints_aonly = {
                audio: true,
               	video: false
	};

	var constraints_dumb = {
                audio: false,
               	video: false
	};
	
	if (aonly) constraints = constraints_aonly;

	var constraints_alt = (i_am_muted === true || i_am_muted === 'true' || role === 3) ? constraints_vonly : constraints_aonly; // hack ash
	
	constraints = (i_am_muted === true || i_am_muted === 'true') && aonly ? constraints_dumb : (i_am_muted === true || i_am_muted === 'true') ? constraints_vonly : constraints;
	constraints_alt = (i_am_muted === true || i_am_muted === 'true') && aonly ? constraints_dumb : (i_am_muted === true || i_am_muted === 'true') ? constraints_vonly : constraints_alt;


	var options = {
              	localVideo: g.video,
		mediaConstraints: constraints,
		onicecandidate: participant.onIceCandidate.bind(participant)
	}
	
	var options_alt = {
		localVideo: g.video,
		mediaConstraints: constraints_alt,
		onicecandidate: participant.onIceCandidate.bind(participant)
	}
	var options_aonly = {
		localVideo: g.video,
		mediaConstraints: constraints_aonly,
		onicecandidate: participant.onIceCandidate.bind(participant)
	}
				
	if(recordedVideo && savedSrc) {
		
		shareSomeStream = true;
		var cstrx = {
			audio: true,
			video:{
				maxWidth : wi,
				maxFrameRate : fps,
				minFrameRate : fps
			}
		};

		options = {
			videoStream: savedSrc,
			onicecandidate: participant.onIceCandidate.bind(participant),
			mediaConstraints : cstrx
		}
		option_alt = {
			videoStream: savedSrc,
			onicecandidate: participant.onIceCandidate.bind(participant),
			mediaConstraints :{audio: true, video: false}
		}
				
		participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
                  	 if(error) {
		  	var ff = new RegExp('closed','ig');
		  	if (error.toString().match(ff)) {
		  	} else {
				participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(option_alt,
					function (error) {
                                        	if(error) {
                                                	return console.error(error);
                                        	}
				
                                        	startVideo(g.video);
                                        	this.generateOffer (participant.offerToReceiveVideo.bind(participant));
						localStream = participant.rtcPeer.getLocalStream();
						
						if (small_device)  document.id(myname).style.float = 'none'; 				
						document.id('room-header-file').style.display='none';
					});
		  	}
		  	return false;
                  	 } else {
                  	  	startVideo(g.video);
				this.generateOffer (participant.offerToReceiveVideo.bind(participant));
				localStream = participant.rtcPeer.getLocalStream();
		
				if (small_device)  document.id(myname).style.float = 'none';
				document.id('room-header-file').style.display='none';
                  	 }
		  	 (function(){document.id('phones').fade(0);}).delay(1000);
		}); //rtcPeer

	} else if (shareSomeScreen) {
      
		shareSomeScreen = true;
		document.id('room-header').style.color = oldColor;
      
		startCapture({video: true}).then(stream => {
/* mix microphone
*/
		navigator.mediaDevices.getUserMedia({audio: true})
		.then(function(mediaStream) {
		var audioTrack = mediaStream.getAudioTracks()[0] ? mediaStream.getAudioTracks()[0] : null;
		if (audioTrack && i_am_muted !== true && i_am_muted !== 'true') stream.addTrack(audioTrack);

		g.video.srcObject = stream;

        	var options_sshare = {
			videoStream: stream,
			onicecandidate: participant.onIceCandidate.bind(participant),
			mediaConstraints : {
				audio: true,
				video:{
                        		maxWidth : wi_hq,
                        		maxFrameRate : fps_hq,
                        		minFrameRate : fps_hq
                		}	
			},
			sendSource : 'screen'
        	}
	
        	participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options_sshare, function(error) {
                  if(error) {
			var ff = new RegExp('closed','ig');
			if (error.toString().match(ff)) {
			} else {
                          participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options_alt,
                                function(error) {
                                        if(error) {
                                                return console.error(error);
                                        }

                                        startVideo(g.video);
                                        this.generateOffer (participant.offerToReceiveVideo.bind(participant));
					localStream = participant.rtcPeer.getLocalStream();
					
					if (small_device)  document.id(myname).style.float = 'none';
                          });
			}

			return false;
                  } else {
                  	startVideo(g.video);
                  	this.generateOffer (participant.offerToReceiveVideo.bind(participant));
			localStream = participant.rtcPeer.getLocalStream();
			
			if (small_device)  document.id(myname).style.float = 'none';
		  }

		  (function(){document.id('phones').fade(0);}).delay(1000);
        	});
		}).catch(function(err){console.log(err.name + ": " + err.message);}); //mediaStream
		}).catch(e => console.log(e)); //startCapture
   
	//} else if (playSomeMusic && (role == 1|| role == 2)) {
	} else if (playSomeMusic) {
		// with sound both in the stream and in the local video. 
		// initialize the audioContext
		
		if (playSomeMusic_muted === false) {
			if (!g.audioContext) g.audioContext = new AudioContext();
//console.log('audioContext init1');
			mediaSource = g.audioContext.createMediaElementSource(g.video);
			analyser = g.audioContext.createAnalyser();
			mediaSource.connect(analyser);
			analyser.connect(g.audioContext.destination);
		}		
  
		g.video.autoplay = true;
		g.video.playsInline = true;
		g.video.controls = true;
		g.video.crossOrigin = 'anonymous';
		g.video.volume = 1;
		g.video.loop = true;
		g.video.src = selectedFile ? selectedFile : null;
		g.video.muted = false;

		// get name of the file played - hack ash

		let cT = curMovie ? getCookie('cT_'+curMovie) : 0;
//console.log('Setting cT as', cT, 'for curMovie name ', curMovie);
		g.video.currentTime = cT > 0 ? cT : 0;
	
		g.video.addEventListener('canplay', (event) => {
		
		  now_playing = true;
		
		  if (!already_being_played) {

console.log('running', N++);
	  	
			already_being_played = true;
			let captureStream = null;
/* mix microphone
*/			
			navigator.mediaDevices.getUserMedia({audio: true})
			.then(function(mediaStream) {
			var audioTrack = mediaStream.getAudioTracks()[0] ? mediaStream.getAudioTracks()[0] : null;
			if (canvas.captureStream) {
			   	captureStream = canvas.captureStream(fps_hq);
				if (audioTrack && i_am_muted !== true && i_am_muted !== 'true') captureStream.addTrack(audioTrack);
			} else 
			if (g.video.captureStream) {
				captureStream = g.video.captureStream(fps_hq);
			} else if (g.video.mozCaptureStream) {
				captureStream = g.video.mozCaptureStream(fps_hq);
			} else {
				console.error('Stream capture is not supported');
			}
			
			//NB: mix audio from mic to that of the video, except when in cinema
			let audioStreamTrack = null;
			if (!cine) {
console.log('doing mic mix in normal mode');
			   if (!g.ctx) g.ctx = new AudioContext();
			   const dest = g.ctx.createMediaStreamDestination();
			   const audioIn_01 = audioTrack ? g.ctx.createMediaStreamSource(mediaStream) : null;
			   const audioIn_02 = captureStream.getAudioTracks()[0] ? g.ctx.createMediaStreamSource(captureStream) : null;
 
			   if (i_am_muted !== true && i_am_muted !== 'true' && audioIn_01) audioIn_01.connect(dest);
			   if (audioIn_02) audioIn_02.connect(dest);
			
			   audioStreamTrack = dest.stream.getAudioTracks()[0] ? dest.stream.getAudioTracks()[0] : null;
			}// not cine
			
			g.captureStreamVideoTrack = captureStream.getVideoTracks()[0] ? captureStream.getVideoTracks()[0] : null;
			g.captureStreamAudioTrack = captureStream.getAudioTracks()[0] ? captureStream.getAudioTracks()[0] : null;
			
			g.mixStream = new MediaStream();
			if (g.captureStreamVideoTrack) g.mixStream.addTrack(g.captureStreamVideoTrack);
			if (!cine && audioStreamTrack) g.mixStream.addTrack(audioStreamTrack);
			if (cine && g.captureStreamAudioTrack) g.mixStream.addTrack(g.captureStreamAudioTrack); 
			
			var cstrx = {
				audio: true,
				video:{
					maxWidth : wi_hq,
					maxFrameRate : fps_hq,
					minFrameRate : fps_hq
				}
			};

			options = {
				videoStream: g.mixStream,
				onicecandidate: participant.onIceCandidate.bind(participant),
				mediaConstraints : cstrx
			}
			option_alt = {
				videoStream: g.mixStream,
				onicecandidate: participant.onIceCandidate.bind(participant),
				mediaConstraints :{audio: true, video: false}
			}
		
			participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
                  	 if(error) {
			  	var ff = new RegExp('closed','ig');
			  	if (error.toString().match(ff)) {
			  	} else {
                            		participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(option_alt,
                          		   function (error) {
                                        	if(error) {
                                                	return console.error(error);
                                        	}
						
                                        	startVideo(g.video);
                                        	this.generateOffer (participant.offerToReceiveVideo.bind(participant));
						localStream = participant.rtcPeer.getLocalStream();
						
						if (small_device)  document.id(myname).style.float = 'none'; 					
						document.id('room-header-file').style.display='none';
                          		   }
			    		);
			  	}
			  	return false;
                  	 } else {
                  	  	//startVideo(video);
                  	  	g.video.play();

				if (playSomeMusic_muted === false) {
				    function getSoundData() {
				       var sample = new Float32Array(analyser.frequencyBinCount);
				       return analyser.getFloatFrequencyData(sample);  
				    }
				}
			  	
				this.generateOffer (participant.offerToReceiveVideo.bind(participant));
				localStream = participant.rtcPeer.getLocalStream();
			
				if (small_device)  document.id(myname).style.float = 'none';
					document.id('room-header-file').style.display='none';
                  	 }
		  	 (function(){document.id('phones').fade(0);}).delay(1000);
			 
			 // hack ash - to set caption with files names
			 if (!shareSomeStream) getList_names();
			
			}); //rtcPeer
		    }).catch(function(err){console.log(err.name + ": " + err.message);}); //mediaStream
	  	  } //already_being_played
		});//video.addEventListener 

	} else {

//console.log('setting myself in existingPart as aonly', aonly, 'i_am_muted', i_am_muted, 'options', options, 'options_alt', options_alt);

         	participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
                  if(error) {
			var ff = new RegExp('closed','ig');
			if (error.toString().match(ff)) {
			} else {
			  participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
                          function (error) {
                                        if(error) {
                                                return console.error(error);
                                        }

                                        startVideo(g.video);
                                        this.generateOffer (participant.offerToReceiveVideo.bind(participant));
					localStream = participant.rtcPeer.getLocalStream();
					
					if (small_device)  document.id(myname).style.float = 'none';
                          });
			}

			return false;
                  } else {
                  	startVideo(g.video);
                  	this.generateOffer (participant.offerToReceiveVideo.bind(participant));
			localStream = participant.rtcPeer.getLocalStream();
			
			i_am_on_air = true;
			
			if (small_device || tablet) {
				// myself
				document.id('participants').style.marginTop = isIOSFirefox() ? '-46vh' : '-55vh';
				
				if (pcounter === 1) document.id('participants').style.height = window == window.top ? '50vh' : '63vh';
				if (pcounter === 2) document.id('participants').style.height = window == window.top ? '110vh' : tablet ? '140vh' : '128vh';
				if (pcounter === 3) document.id('participants').style.height = window == window.top ? '160vh' : '190vh';
				if (pcounter === 4) document.id('participants').style.height = window == window.top ? '220vh' : '250vh';
				if (pcounter > 4) document.id('participants').style.height = window == window.top ? '275vh' : '300vh';
				
				document.id(myname).style.position = 'absolute';
				document.id(myname).style.bottom = '0vh';
				if (pcounter > 1) {
					document.id('participants').style.position = 'absolute';
					saved_top = document.id('participants').style.top;
					document.id('participants').style.top = '81vh';
				} else {
					document.id('participants').style.position = 'relative';
					document.id('participants').style.top = saved_top.length ? saved_top : document.id('participants').style.top ;
				}
			}
			
			if (!small_device && window == window.top) resizer(1);
		  }

		  (function(){document.id('phones').fade(0);}).delay(1000);
         	});

	}
	
	(function() {document.id(myname).style.display='block'; document.id(myname).fade(1);}).delay(500);//need this animation because the new video appears under the row, so we hide it
   }// if role

   if (msg.data) {
	   
	   cinemaEnabled = false; num_cinemas = 0;
	   let top_buf = 0;
	   for (var i = 0; i < msg.data.length; i++) {
		var chu = msg.data[i].split('_|_');

		let f = chu[0];
		let s = chu[1];
		let t = chu[2];
		let ac = chu[3];
		let a = chu[4];

//console.log('here f is', f, 's is', s, 'a', a);		
		let na = chu[0].split('_');
		
		if (s === 'c') {cinemaEnabled = true; num_cinemas += 1;}
		if (f != myname) {
			//prepare logics in advance
			let pctr = pcounter +1;
			if (pctr < room_limit && role == 0) {document.id('bell').style.display = 'none'; document.id('av_toggler').style.display='block';}
			if (pctr > room_limit - 1 && role == 0) {document.id('bell').style.display = 'block'; document.id('av_toggler').style.display='none';}

			if (!small_device) resizer(pctr);
		
			receiveVideo(f, s, role);
			let coo_volume = loadData(f+'_volume');
			
			if (document.id('slider_' + f)) document.id('slider_' + f).value = coo_volume;
			if (document.id('video-' + f)) document.id('video-' + f).volume = coo_volume;
			
			(function() {if (document.id(f)) {document.id(f).style.display='block'; document.id(f).fade(1);}}).delay(500);//need this animation because the new video appears under the row, so we hide it
			
			
		} else {
			var lang = getCookie('lang');
			if (t.length && (lang === null || lang === 'null')) {
				let ar = /, AR$/.test(t);
				let br = /, BR$/.test(t);
				let ru = /, RU$/.test(t);
				
				if (ar) {ctr = 2} else {if (br) {ctr = 5} else {if (ru) {ctr = 1} else {}}}
				change_lang(altlang[ctr]);
			}
		}
		
		if (t.length && document.id('loco_' + f) && !ValidateIPaddress(t)) {
			document.id('loco_' + f).innerHTML = t;
			document.id('loco_' + f).style.display='block';
			document.id('loco_' + f).fade(1);			
		}		

		if (cine) {
			(function() {if (document.id('loco_' + f)) document.id('loco_' + f).fade(0); if (document.id('span_' + f))document.id('span_' + f).fade(0);}).delay(2000);
		}
				
		if (document.id('acco_' + f) && ValidateAccountId(ac)) {
			document.id('acco_' + f).style.display='block';
			
			document.id('acco_' + f).fade(1);
			document.id('acco_' + f).onclick = function() {
				copy(ac); flashText('copied '+ na[0]);
				request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data => {
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
				});				
			}
			if (document.id('sp_container' && sp_shown) && document.id('sp_container').style.display != 'block') document.id('acco_' + f).style.visibility='hidden';			
		}	
		
		//if (document.id('anno_' + f) && ValidateAnno(a)) {
		if (document.id('anno_' + f)) {
			//console.log("For:", f, "anno:", a);
			let arra = a.split('@#%');
			if (arra.length == 2) {
				
				document.id('anno_' + f).innerHTML = "<select id='selector_" + f + "' onchange='handleFileSelectChange(this.options[this.selectedIndex].text)' onmouseover='toggleOpacity(this.parentNode)' onmouseout='toggleOpacity(this.parentNode)'></select>";
				let cs = arra[1] || 0;
				let arr = [];
				let buf = arra[0].substring(2,arra[0].length-2);
				//console.log('buf is', buf)
				arr = buf.split('","');
				curSelInd = cs
				let fi = arr[curSelInd];
				arr.splice(curSelInd,1);
				arr.unshift(fi);
				
				curMovie = arr[0];

				let optionList = document.id('selector_' + f).options;
				let lim = cinemaEnabled ? 1 : arr.length
				for (i=0; i < lim; i++) {
					//arr[i].replace(/["']/g,'');
					optionList.add(new Option(arr[i], i))
				}
		
			} else {
	  			if (document.id('anno_' + f)) {
					document.id('anno_' + f).innerHTML = a;
	  			}
			}
			
			if (a && a.length) {
				document.id('anno_' + f).style.display='block';			
				document.id('anno_' + f).fade(1);
			}
			
			if (s === 'c') setTimeout(function() {if (document.id('anno_' + f)) document.id('anno_' + f).fade(0.02);}, 2000);
			setTimeout(function() {if (document.id('one-' + f)) document.id('one-' + f).fade(0.5);}, 3000);
			document.id('room-header').fade(0);		
		}
		
		/*if (document.id('lol_' + f) && a.length && s === 'p' && window.top == window && !small_device) {
		
			document.id('lol_' + f).innerHTML = 'STOP/PLAY';
			document.id('lol_' + f).style.display='block';			
			document.id('lol_' + f).fade(1);
			document.id('rew_' + f).innerHTML = '<< -10s';
			document.id('rew_' + f).style.display='block';			
			document.id('rew_' + f).fade(1);
		}*/
		
		// disabled user controls for now --ash oct'23
	   } //for
	   if (small_device || tablet) {
			// other guys
			document.id('participants').style.marginTop = '-68vh';
			if (pcounter === 2) {document.id('participants').style.height = window == window.top ? '110vh' : tablet ? '140vh' : '128vh';}
			if (pcounter === 3) document.id('participants').style.height = window == window.top ? '160vh' : '190vh';
			if (pcounter === 4) document.id('participants').style.height = window == window.top ? '220vh' : '250vh';
			if (pcounter > 4) document.id('participants').style.height = window == window.top ? '275vh' : '300vh';
			
			// if (pcounter > 1 && i_am_on_air) document.id('controls').style.marginBottom = '-20vh'; // lift up the whole stack ?!
			// if (pcounter > 1 && i_am_on_air) document.id('participants').style.marginTop = '-78vh';
			
			// take care when only 1 participant in audio mode, small device
			
			/*if (small_device && pcounter === 1) {
				if (Object.keys(participants) && Object.keys(participants).length === 1) {	
					for (var key in participants) {
						if (participants[key].mode === 'a') {
							document.id('participants').style.height = '35vh';
							document.id('participants').style.marginTop = '-45vh';						
						}
					}
				}		 	
		 	}*/			

	   }
   } // msg.data
   
   request('https://'+window.location.hostname+port+'/cgi/genc/get_acc_id.pl').then(data => {
     if (role == 0 && cinemaEnabled && !data.length) {
	  if (document.id('sp_balance') && document.id('sp_container')){
	    setTimeout(function() {document.id('sp_container').style.display='block';},2000);
	    setTimeout(function() {document.id('sp_balance').style.display='block';document.id('sp_balance').src=sp_container_url+'/?acc=';},1000);
	  };
     } else {
     	document.id('sp_container').style.display = 'none';document.id('sp_balance').style.display='none';
     }
   });
   	     
//  }).catch(err => console.log(err)); //fetch
} // onExistingP

function copy(that){
	var inp = document.createElement('input');
	document.body.appendChild(inp)
	inp.value = that;
	inp.select();
	document.execCommand('copy',false);
	inp.remove();
}


const grun = () => {
	recordedVideo = document.querySelector('video');
	if (recordedVideo.mozCaptureStream) {
		savedSrc = recordedVideo.mozCaptureStream(fps);
	} else if (recordedVideo.captureStream) {
		savedSrc = recordedVideo.captureStream(fps);
	} else {
		savedSrc = null;
	}
	recordedVideo.muted = false;
	rejoin();
}

const leaveRoom = () => {
	
	let myname = document.id('name').value;
	
	if (Object.keys(participants).length) {
		for ( var key in participants) {
				//console.log('dispose 3 in leave: real', real_pcnt, participants[key].name, key);
				participants[key].dispose();
				
				delete participants[key].rtcPeer;
				delete participants[key];
		}
	}
	if (Object.keys(cinemaGoers).length) {
		for ( var key in participants) {
				//console.log('dispose 3 in leave: real', real_pcnt, participants[key].name, key);
				cinemaGoers[key].dispose();
				
				delete cinemaGoers[key].rtcPeer;
				delete cinemaGoers[key];
		}
	}
	//delete g.ctx;
	delete g.mixStream;
	delete g.video;
	delete g.captureStreamVideoTrack;
	delete g.captureStreamAudioTrack;
	//delete g.audioContext;
	
	pcounter = 0;
	vcounter = 0;
	i_am_guest = 0;
	registered = 0;
	
	if (document.id('num_quests')) document.id('num_quests').innerHTML = 0;
	if (document.id('vcounter')) document.id('vcounter').innerHTML = vcounter;
	
	sendMessage({id : 'leaveRoom'});
	just_left = document.id('name').value;
}

const receiveVideo = (sender, mode, role) => {

// console.log('in receiveVideo1, mode', mode,'role', role, 'name', sender);
	
	var participant = new Participant(sender, document.id('name').value, mode, role);
	participants[sender] = participant;
	g.video = participant.getVideoElement();
      
	var constraints = {
                audio : true,
                video: false
	};

	var constraints_av = {
                audio : true,
		video:{
			maxWidth : wi_hq,
			maxFrameRate : fps_hq,
			minFrameRate : fps_hq
		}
		
	};
	
	var options = {
		remoteVideo: g.video,
		mediaConstraints: constraints_av,
		onicecandidate: participant.onIceCandidate.bind(participant)
	}

	var options_aonly = {
		remoteVideo: g.video,
		mediaConstraints: constraints,
		onicecandidate: participant.onIceCandidate.bind(participant)
	}
	
	options = mode === 'a' ? options_aonly : options;
// console.log('in receiveVideo2, options', options);
	
	participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
	function (error) {
		if(error) {
			return console.error(error);
		}

			startVideo(g.video);
			this.generateOffer (participant.offerToReceiveVideo.bind(participant));
			// remoteStream = participant.rtcPeer.getRemoteStream();console.log('Here remoteStream', remoteStream);
			
			if (small_device)  {
				document.id(sender).style.float = 'none';
				document.id(sender).className = PARTICIPANT_MAIN_CLASS; 
			}
			//if (!cine) participant.activateMicIndic();

	});

	if (!cine) (function() {participant.activateMicIndic()}).delay(3000);	
}

const receiveCGAudio = (sender, mode) => {
	
	var cinemaGoer = new CinemaGoer(sender, document.id('name').value, mode );
	cinemaGoers[sender] = cinemaGoer;
	
	g.video = cinemaGoer.getVideoElement();
      
	var constraints = {
                audio : true,
                video: false
	};

	var options = {
		remoteVideo: g.video,
		mediaConstraints: constraints,
		onicecandidate: cinemaGoer.onIceCandidate.bind(cinemaGoer)
	}
	
console.log('receiveCGAudio for', sender, 'options are', options);	

	cinemaGoer.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
	function (error) {
		if(error) {
			return console.error(error);
		}

			startVideo(g.video);
			this.generateOffer (cinemaGoer.offerToReceiveVideo.bind(cinemaGoer));
			
			//remoteStream = cinemaGoer.rtcPeer.getRemoteStream();
			//if (cine) cinemaGoer.activateMicIndic();
	});

	if (cine) (function() {cinemaGoer.activateMicIndic()}).delay(3000);
}

const newDrop = (request) => {
	let na = request.user.split('_');
	let short_name = na[0];
	let suf = na[na.length-1];
	
	if (document.id('_o_'+suf)) {document.id('_o_'+suf).style.background = 'transparent'; /*soundEffect.src = '/sounds/ron.mp3';*/}
}
const setGuru = (request) => {

		let sem  = window.innerWidth > 1024 ? '7' : '';

   
		if (request.mode == '2' && role != 1) {

			document.body.style.background = '#FFD580';
			soundEffect.src = "/sounds/buzz.mp3";
			soundEffect.src = "/sounds/please_receive_airdrop.mp3";
			flashText('push \"b\", then \"+\" and paste your Substrate address to \"WRITE TO CHAT\"', 5000);
			   	
		}
		if (request.mode == '3' && role != 1) {
		
			document.body.style.background = '#112';
			soundEffect.src = "/sounds/track01.mp3";
			   	
		}
		if (request.mode == '1' && role != 1) {

			setCookie('av', true, 144000); aonly = 0; // IMPORTANT: comment this out if need "audio-only" default for "made" guests
			
			checkDeviceSupport(console.log('checked devices'));
			
			setTimeout(function() {/*console.log('here mic is allowed?',isWebsiteHasMicrophonePermissions, 'cam video is allowed?', isWebsiteHasWebcamPermissions);*/ 
			if (isWebsiteHasMicrophonePermissions && isWebsiteHasWebcamPermissions) {} else soundEffect.src = "/sounds/please_allow_camera.mp3";}, 2000);		
			
			temporary = 1; chat_shown = 1; document.id('logger').click(); document.id('audience').click(); rejoin();
			document.id('av_toggler').style.display='block';
			document.id('bell').style.display='none';
	
		}
		if (request.mode == '0') {

			role = 0; temporary = 0; chat_shown = 1; document.id('logger').click(); document.id('audience').click(); 
			cammode = 0;  
			document.id('fcam').className = "bigO fcam"; document.id('bcam').className = "bigO bcam";
			setCookie('av', false, 144000); aonly = 1; 
			document.id('av_toggler').style.display='none';
			document.id('bell').style.display='block';
			document.id('room').style.marginTop = '37px';
			hack = false; //?!
			i_am_viewer = true;
			flashText_and_rejoin('AUDIO-ONLY');
		}
//	}).catch(err => console.log(err));
}

function askGuru(request) {

	let na = request.name.split('_');
	let short_name = na[0];
	let suf = na[na.length-1];
		
	if (document.id('_au_'+suf)) document.id('_au_'+suf).dispose();
	
		let medal = !temporary ? '<span id=_o_'+suf+' style="display:none;cursor:pointer;font-size:36px;border-radius:20px;" onclick="if (this.style.background === \'#9cf\') {set_guru(3,\'' + request.name + '\');this.style.background=\'transparent\';this.onclick=function(){set_guru(2,\'' + request.name+ '\');this.style.background=\'#9cf\';}} else {set_guru(2,\'' + request.name + '\');this.style.background=\'#9cf\';this.onclick=function(){set_guru(3,\'' + request.name + '\');this.style.background=\'transparent\';}}">O</span> ' : '';
	
	let audi = document.id('audience_boxx').innerHTML == 'Audience is empty :(' ? '' : document.id('audience_boxx').innerHTML;	
	audi = '<div id=_au_'+suf+'>' + medal + '<span id=au_' + suf + ' style="color:#9cf;cursor:pointer;font-size:16px;font-weight:bold;" onclick="set_guru(1,\'' + request.name + '\');">'+short_name + '</span> ' + requ +  ' <span style="cursor:pointer;" onclick="drop_guest(\'' +request.name + '\')" >X</span></div>' + audi;
	
	let ar_split = audi.split('_au_');
	let cur = ar_split.length - 1;
	
	document.id('audience_boxx').innerHTML = audi;
	document.id('au_'+suf).setStyles({'color':'#faa'});

	//fetch('https://'+window.location.hostname+':'+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
	//	let role = respo || 0;
		//if (role == 1 || request.name == document.id('name').value) {
			soundEffect.src = "/sounds/wood_" + window.location.hostname+port + ".mp3";
			chat_shown = 0; document.id('logger').click();
			document.id('message_box').style.display = 'none';
			document.id('audience_box').style.display = 'table';
		//}
	//}).catch(err => console.log(err));

}

const setCinema = (request) => {

	let myname = document.id('name').value;
	fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {
//console.log('here req is', request, 'myname', myname);
		let myrole = respo || 0;

		let m = request.mode;
		if (m == 'c' && request.name !== myname) { 
		  rejoin();
		  return;
		}
		let p = participants[request.name];
		if (p) {p.setMode(request.mode)} else {rejoin();return}; //?!
		
		let o = document.id('one-' + request.name);

		if (o) {
		   o.style.color = m == 'c' ? '#ff0' : '#369';
		   o.style.fontWeight = m == 'c' ? 'bold' : 'normal';
		   o.style.display = m == 'c' ? 'block' : myrole == 1 ? 'block' : 'none';
		   o.innerHTML = m == 'c' ? 'CINEMA!' : 'CINEMA?';
		}
		
		num_cinemas = m == 'c' ? num_cinemas + 1 : num_cinemas - 1;
		

		cinemaEnabled = m == 'c' ? true : num_cinemas ? cinemaEnabled : false;
//console.log('num_cinemas', num_cinemas, 'enabled', cinemaEnabled);

	}).catch(err => console.log(err));	
}

function newChatMessage() {

	new_message = 1;
	let intervalID = setInterval(function() { if (new_message) {document.id('logger').className = "bigO logger_g";} else {document.id('logger').className = chat_shown ? "bigO logger_f" : "bigO logger"; clearInterval(intervalID)}}, 1000);

	fetch('https://'+window.location.hostname+port+'/log.html').then(response => response.text()).then((response) => {document.id('message_box').innerHTML = response; }).catch(err => console.log(err));

		soundEffect.src = "/sounds/buzz.mp3";
}

function setAnno(request) {
//console.log("setting anno:", request.participant, "anno:",request.anno);
	let arra = request.anno.split('@#%');
	if (arra.length == 2) {
		
		document.id('anno_' + request.participant).innerHTML = "<select id='selector_" + request.participant + "' onchange='handleFileSelectChange(this.options[this.selectedIndex].text)' onmouseover='toggleOpacity(this.parentNode)' onmouseout='toggleOpacity(this.parentNode)'></select>";
		let cs = arra[1] || 0;
		let arr = [];
		let buf = arra[0].substring(2,arra[0].length-2);
		//console.log('buf is', buf)
		arr = buf.split('","');
		curSelInd = cs
		let fi = arra[curSelInd];
		arr.splice(curSelInd,1);
		arr.unshift(fi);
		
		curMovie = arr[0];
		let optionList = document.id('selector_' + request.participant).options;

		for (i=0; i < arr.length; i++) {
			//arr[i].replace(/["']/g,'');
			optionList.add(new Option(arr[i], i))
		}
		
	} else {
	  if (document.id('anno_' + request.participant)) {
		document.id('anno_' + request.participant).innerHTML = request.anno;
	  }
	}
	
	document.id('anno_' + request.participant).style.display='block';			
	document.id('anno_' + request.participant).fade(1); /*if (cine) setTimeout(function() {document.id('anno_' + request.participant).fade(0.02);}, 2000);*/
		 
	//setTimeout(function() {const boxes = document.querySelectorAll('.annos'); boxes.forEach(box => {box.style.opacity = 0.02;});}, 3000);
	document.id('room-header').fade(0);	
}

function handleFileSelectChange(v) {

	if (v === null || typeof(v) === 'undefined' || v.length === 0) return;
	let fis = document.id('room-header-file').files;
	for (var i = 0; i < fis.length; i++) {
		//console.log("here checking v is", v, "name is",fis[i].name);
		if (fis[i].name === v) {
			if (selectedFile) URL.revokeObjectURL(selectedFile);
			selectedFile = URL.createObjectURL(fis[i]);
			setCookie('cT_'+curMoviesList[0], document.id('video-'+document.id('name').value).currentTime, 14400);
//console.log('saving cT as', document.id('video-'+document.id('name').value).currentTime, 'for movie', curMoviesList[0]);
			curSelInd = i;
			curMovie = v;
//console.log('Saved curMovie as', v);			
			rejoin();
			break;
		}
	}
	if (fis.length == 0) {
		let mes = {id: 'requestMovie', name: v};
		sendMessage(mes);
	}
}

function toggleOpacity(el) {
	let a = el.style.opacity == 0.02 ? 1 : 0.02;
	el.fade(a);
}

function setMoviesList(request) {
//console.log("setting movies list:", request.participant, "ml:",request.ml, "curSelInd", curSelInd);
	if (document.id('anno_' + request.participant)) {
		
		document.id('anno_' + request.participant).innerHTML = "<select id='selector_" + request.participant + "' onchange='handleFileSelectChange(this.options[this.selectedIndex].text)' onmouseover='toggleOpacity(this.parentNode)' onmouseout='toggleOpacity(this.parentNode)'></select>";
		let arra = [];
		let buf = request.ml.substring(2,request.ml.length-2);
		//console.log('buf is', buf)
		arra = buf.split('","');
		
		curSelInd = request.cs
		let fi = arra[curSelInd];
		arra.splice(curSelInd,1);
		arra.unshift(fi);
		
		curMovie = arra[0]

		let optionList = document.id('selector_' + request.participant) ? document.id('selector_' + request.participant).options : [];
		curMoviesList = []
		for (i=0; i < arra.length; i++) {
			//arra[i].replace(/["']/g,'');
			optionList.add(new Option(arra[i], i))
			curMoviesList.push(arra[i]);
		}		
		
		document.id('anno_' + request.participant).style.display='block';			
		document.id('anno_' + request.participant).fade(1); 
		setTimeout(function() {if (document.id('anno_' + request.participant)) document.id('anno_' + request.participant).fade(0.02)}, 2000);
		document.id('room-header').fade(0);
		document.id('room-header-file').style.display='none';	 
	 	
	}
	
}

function requestFilm(request) {
	handleFileSelectChange(request.name);
}

function denyMovie(request) {
	if (cine) flashText('Currently ' + request.n + ' people watching!');
}

function changeTabLR(request) {

	if (request.side == 'l') {
		if (document.id('leftnum')) document.id('leftnum').innerHTML = request.num.toString();
		soundEffect.src = "/sounds/track04.mp3";
	}
	if (request.side == 'r') {
		if (document.id('rightnum')) document.id('rightnum').innerHTML = request.num.toString();
		soundEffect.src = "/sounds/track01.mp3";
	}
}

function bongoKey(request) {

	let a = '';
	let myname = document.id('name').value;
	let myvideo = 'video-' + myname;
	
	//let video_controlable = request.name === myname || request.name === '' ? true : false;
	let video_controlable = true;
	
	/*if (request.num == '65') {
		soundEffect.src = "/sounds/track01.mp3";
		a = 'a';

	}*/
	
	if (request.num == '66') {
		soundEffect.src = "/sounds/track02.mp3";
		a = 'b';
		if (now_playing && video_controlable) {document.id(myvideo).currentTime = 0;document.id(myvideo).play();__playing = true;}
	}
	if (request.num == '67') {
		//soundEffect.src = "/sounds/track03.mp3";
		a = 'c';
		//if (now_playing && video_controlable) {document.id(myvideo).currentTime -= 300;document.id(myvideo).play();__playing = true;}
		if (now_playing && video_controlable) {document.id(myvideo).currentTime = 0;document.id(myvideo).play();__playing = true;}
	}
	if (request.num == '68') {
		//soundEffect.src = "/sounds/track04.mp3";
		a = 'd';
		if (now_playing && video_controlable) {document.id(myvideo).currentTime += 300;document.id(myvideo).play();__playing = true;}
	}
	/*if (request.num == '69') {
		soundEffect.src = "/sounds/track05.mp3";
		a = 'e';

	}*/
	if (request.num == '70') {
		//soundEffect.src = "/sounds/track06.mp3";
		a = 'f';
		if (now_playing && video_controlable) {document.id(myvideo).currentTime += 10;document.id(myvideo).play();__playing = true;}

	}
	/*if (request.num == '71') {
		soundEffect.src = "/sounds/track07.mp3";
		a = 'g';

	}
	if (request.num == '72') {
		soundEffect.src = "/sounds/track08.mp3";
		a = 'h';

	}
	if (request.num == '73') {
		soundEffect.src = "/sounds/track09.mp3";
		a = 'i';

	}
	if (request.num == '74') {
		soundEffect.src = "/sounds/track10.mp3";
		a = 'j';

	}
	if (request.num == '75') {
		soundEffect.src = "/sounds/track11.mp3";
		a = 'k';

	}
	if (request.num == '76') {
		soundEffect.src = "/sounds/track12.mp3";
		a = 'l';

	}
	if (request.num == '77') {
		soundEffect.src = "/sounds/track13.mp3";
		a = 'm';

	}	
	if (request.num == '78') {
		soundEffect.src = "/sounds/track14.mp3";
		a = 'n';

	}
	if (request.num == '79') {
		soundEffect.src = "/sounds/track15.mp3";
		a = 'o';

	}*/
	if (request.num == '80') {
		//soundEffect.src = "/sounds/track16.mp3";
		a = 'p';
		if (now_playing && video_controlable) {document.id(myvideo).play();__playing = true;}

	}
	/*if (request.num == '81') {
		soundEffect.src = "/sounds/track15.mp3";
		a = 'q';

	}*/
	if (request.num == '82') {
		//soundEffect.src = "/sounds/track14.mp3";
		a = 'r';
		if (now_playing && video_controlable) {document.id(myvideo).currentTime -= 10;document.id(myvideo).play();__playing = true;}

	}
	if (request.num == '83') {
		//soundEffect.src = "/sounds/track13.mp3";
		a = 's';
		if (now_playing && video_controlable) {document.id(myvideo).pause();__playing = false;}

	}
	if (request.num == '84') {
		//soundEffect.src = "/sounds/track12.mp3";
		
		// this is highly risky so don't
		/* a = 't';
		if (playSomeMusic && selectedFile && cine) {
		  setCookie('loneGuy', true, 1);
		  setCookie('playedFileName', curMoviesList[0]);
		  setCookie('cT_'+curMoviesList[0],document.id('video-'+document.id('name').value).currentTime, 14400);
		  if (document.id('one-'+document.id('name').value).style.color == "rgb(255, 255, 0)") setCookie('cinemaGuy', true, 10); //hack ash
		  location.reload();
		} */
	}
	if (request.num == '85') {
		//soundEffect.src = "/sounds/track11.mp3";
		a = 'u';
//console.log('here, np is', now_playing, 'vc is ', video_controlable, 'pl is', __playing);
		if (now_playing  && video_controlable && __playing) {document.id(myvideo).pause(); __playing = false;}
		else if (now_playing  && video_controlable && !__playing) {document.id(myvideo).play(); __playing = true;}

	}					
	if (document.id('leftbongo')) {document.id('leftbongo').innerHTML = a; document.id('leftbongo').fade(1); (function(){document.id('leftbongo').fade(0);}).delay(300);}
}

function clearTimeoutAndLeave() {

	if (role != 1) {eraseCookie('timeout_nc'); soundEffect.src = "/sounds/drop.mp3"; document.id('phones').innerHTML = 'Leaving room'; document.id('phones').fade(1); setTimeout(function() {location.reload()}, 1000);}

}

const onParticipantLeft = (request) => {

	var participant = participants[request.name];
	if (participant) {

		participants[request.name].dispose();
				
		delete participants[request.name].rtcPeer;
		delete participants[request.name];

		//console.log('dispose 1 in left: real', real_pcnt);
		if (pcounter < room_limit) {document.id('bell').style.display = 'none'; document.id('av_toggler').style.display='block';}

		delete g.video; //?!

		just_left = request.name;
        	if (!small_device && window == window.top) resizer(pcounter);			
	    	
		if (small_device || tablet) {
			// a guy left
			if (pcounter === 1) { document.id('participants').style.position = 'relative'; document.id('participants').style.top = saved_top; }
			document.id('participants').style.marginTop = pcounter === 1 ? isIOSFirefox() ?  '-46vh' : '-55vh' : isIOSFirefox() ? '-50vh' : '-59vh';
			if (pcounter === 1) document.id('participants').style.height = window == window.top ? '50vh' : '63vh';
			if (pcounter === 2) document.id('participants').style.height = window == window.top ? '110vh' : tablet ? '140vh' : '128vh';
			if (pcounter === 3) document.id('participants').style.height = window == window.top ? '160vh' : '190vh';
			if (pcounter === 4) document.id('participants').style.height = window == window.top ? '220vh' : '250vh';
			if (pcounter > 4) document.id('participants').style.height = window == window.top ? '275vh' : '300vh';

			// take care when only 1 participant in audio mode, small device
			/*if (small_device && pcounter === 1) {
			  if (Object.keys(participants) && Object.keys(participants).length === 1) {	
				for (var key in participants) {
					if (participants[key].mode === 'a') {
						document.id('participants').style.height = '35vh';
						document.id('participants').style.marginTop = '-45vh';					
					}
				}
			  }		 	
		 	}*/
					
		 // calculate the height of participants ?!
		 /*setTimeout(function() {
			let p_height = 0;
			if (Object.keys(participants).length) {	
				for (var key in participants) {

					let co = document.id(participants[key].name).getBoundingClientRect(); console.log ('co3 is', co);
			 		p_height += parseInt(co.height)
				}
			}
			console.log ('pheight3 is', p_height);
			let tot_height = parseInt((p_height / screen.height) *200); // padding
			let max_height = tot_height + 5;
			console.log ('tot_height3 is', tot_height);
			document.id('participants').style.height = tot_height + 'vh';
			// document.id('participants').style.maxHeight = max_height + 'vh';
		 }, 1000);*/
		}		
	} else {
		let temp = request.name.split('_');
		let du = 'DUMMY_'+temp[temp.length-1];
		participant = participants[du];
		if (participant) {
			participants[du].dispose();
			delete participants[du];
			console.log('dispose 2 in left: real', real_pcnt);
			if (pcounter < room_limit) {document.id('bell').style.display = 'none'; document.id('av_toggler').style.display='block';}

			just_left = request.name;
        		if (!small_device) resizer(pcounter);			
		} 
	}
	if (document.id('viewer_menu')) document.id('viewer_menu').setStyles({'opacity': 0,'zIndex': 0});
}
/*
Diez peliculas cortas anti-globalistas en hispaniol he incluido en la lista de GREENHALL - disfrutalo ahora 24 horas cada dia non-stop. Solo tenemos Room-House para peliculas non cenzurada http://cinema.room-house.com.
*/
const onViewerLeft = (n) => {
	
	var cinemaGoer = cinemaGoers[n];
	if (cinemaGoer) {

		cinemaGoers[n].dispose();
				
		delete cinemaGoers[n].rtcPeer;
		delete cinemaGoers[n];

		//delete g.video; //?!
	}
	
	let na = n.split('_');
	let suf = na[na.length-1];	
	if (document.id('_au_'+suf)) {
		document.id('_au_'+suf).dispose();
		let cur = document.id('audience_numbers').innerHTML == '...'  ?  0 : parseInt(document.id('audience_numbers').innerHTML)-1;
		vcounter = cur > 0 ? cur : 0;
		
		let myname = document.id('name').value; let myvideo = 'video-' + myname;	
		if (now_playing && vcounter === 0 && !shareSomeStream) (function() {if (document.id(myvideo)) document.id(myvideo).pause();__playing = false;}).delay(100);

		if (document.id('vcounter')) { if (!vcounter) {(function(){document.id('vcounter').innerHTML = vcounter;}).delay(1000);} else {document.id('vcounter').innerHTML = vcounter;} }
		cur = cur > 0 ? cur : '...';
		document.id('audience_numbers').innerHTML = cur;
		let col = cur > 0 ? '#369' : '#ccc';
		document.id('audience_numbers').setStyles({'color': col});
		document.id('audience_boxx').innerHTML = cur == '...' ? 'Audience is empty :(' : document.id('audience_boxx').innerHTML;
		chat_shown = 1; document.id('logger').click(); document.id('audience').click();
		
		let vis = i_am_viewer && vcounter === 1 && cine ? small_device ? 1 : 1 : 0;
		let zi = i_am_viewer && vcounter === 1 && cine  ? 10111 : 0;
		if (document.id('viewer_menu') && !lori) setTimeout(function() {document.id('viewer_menu').setStyles({'zIndex': zi});document.id('viewer_menu').fade(vis);}, 1000);
	}
	if (document.id('_th_'+suf)) {
		document.id('_th_'+suf).dispose();
	}
	if (document.id(n)) {
		document.id(n).dispose();
	}
}

const sendMessage = (message) => {
	var jsonMessage = JSON.stringify(message);
	if (!problems) ws.send(jsonMessage);
}

function startVideo(video)
{

  video.play().catch((err) => {
    if (err.name === 'NotAllowedError') {
      console.error("[start] Browser doesn't allow playing video: " + err);
    }
  });

}

function setCookie(name, value, mins) {
    var expires = "";
    if (mins) {
        var date = new Date();
        date.setTime(date.getTime() + (mins*60*1000));
        expires = ";expires=" + date.toUTCString() + ";SameSite=None;Secure;";
    }
    document.cookie = name + "=" + (value || "")  + expires + ";path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;SameSite=None;Secure;';
}

function deleteSomeCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var coo_name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	while (coo_name.charAt(0)==' ') coo_name = coo_name.substring(1,coo_name.length);

	var w = new RegExp('_muted','ig');
	var h = new RegExp('_hidden','ig');

        if ( coo_name.match(w) ||  coo_name.match(h) || !coo_name.length ) {document.cookie = coo_name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None;Secure;";}
    }
}

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}

function check_iOS() {
  var ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ){
    return true;
  }
  return false;
}

function isIOSFirefox() {
  return navigator.userAgent.match("FxiOS");
}

function is_mobAndro() {
  var ua = navigator.userAgent;
  if (/Android/.test(ua) && window.matchMedia("only screen and (max-width: 480px)").matches) {
    return true;
  }
  return false;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random()*charactersLength));
   }
   return result;
}

function saveData(name, value, mins) {
    if (typeof(Storage) != 'undefined') {
        localStorage.setItem(name, value);
    } else {
        setCookie(name, value, mins);
    }
}

function loadData(name) {
    var temp_value = '';

    if (typeof(Storage) != 'undefined') {
        temp_value = localStorage.getItem(name);
    } else {
        temp_value = getCookie(name);
    }

    return temp_value;
}

function ValidateIPaddress(ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return (true)
  }
  return (false)
}

function ValidateAccountId(account_id) {
  if (/^[a-z0-9]+$/i.test(account_id) && account_id.length == 48) {
    return (true)
  }
  return (false)
}

function ValidateAnno(anno) {

  if (anno.length < 160) {
  	anno.replace(/[<>]/g,''); return (true)
  }
  return (false)
}
