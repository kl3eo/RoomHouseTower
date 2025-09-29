/*
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

var curIP = '';

var aonly = 1;

var mod1; var mod2; var mod5; var mod8;

var altlang = ['en','ru','es','fr','cn','pt'];

var cam1 = getCookie('d1');
var cam2 = getCookie('d2');
var scanned = getCookie('s1');

const soundEffect = new Audio();
soundEffect.autoplay = true;

var snd_clicked = false;
var dummies = false;

var oldColor = null;

var selectedFile = null;
var movieList_names = [];

var loado = ''; var warning = ''; var waiter = ''; var sorry = ''; var hola = ''; var caller = ''; var requ = ''; var creatu = ''; var badger = ''; var learner = ''; var morer = ''; var hea = ''; var now = ''; var today = ''; var roo = ''; var buy = ''; var helpcapo = '';
var chat_shown = 1;

var temporary = 0;

var cammode = 0; 

var stats_shown = 1;

var sp_shown = (window == window.top && (w[0].match(new RegExp('skypirl','g')) || w[0].match(new RegExp('club','g')) || w[0].match(new RegExp('milan','g')) )) ? 0 : 0;

var voting_shown = w[0] === "club" && small_device && !sp_shown ? 0 : 0;

var sound_on_played = w[0] === "club" || w[0].match(new RegExp('rgsu','g')) ? 1 : 0;

var scrolled = false;

var heard_info = getCookie('heard_info') || false;

var who_to = '';

var already_clicked = false;

var afterBinding = false;

var ch_int; var chr_int;

var curSelInd = 0;

var curMoviesList = []

var curMovie = ''

var switched = false;

var lori = small_device && window.innerWidth > window.innerHeight ? true : false;

function getIP(json) {
    curIP = json.ip;
	document.id('curip').value = curIP;
}

function ajax_chat() {
	//fetch('https://'+window.location.hostname+':'+port+'/log.html').then(response => response.text()).then((response) => {document.id('message_box').innerHTML = response; }).catch(err => console.log(err));
	fetch('https://'+window.location.hostname+port+'/log.html').then(response => response.text()).then((response) => {document.id('message_box').innerHTML = response; }).catch(err => console.log(err));
}

function ajax_room(name) {
	let banner = name == 'REDHALL' ? 'red_hall_span' : name == 'BLUEHALL' ? 'blue_hall_span' : name == 'GREENHALL' ? 'green_hall_span' :''; if (banner.length == 0) return;
	fetch('https://'+window.location.hostname+'/cgi/genc/get_room_data.pl?room='+name).then(response => response.text()).then((response) => {if (response.length) {document.id(banner).innerHTML = '"'+response+'"';} else {document.id(banner).innerHTML = '-'} }).catch(err => console.log(err));
}

function change_lang(l) {

	if (document.id('head1')) document.id('head1').innerHTML=heads1.get(l);
	if (document.id('abouter')) document.id('abouter').innerHTML=about.get(l);
	if (document.id('helper')) document.id('helper').innerHTML=help.get(l);
	if (document.id('leftlab')) document.id('leftlab').innerHTML=left_label.get(l);
	if (document.id('rightlab')) document.id('rightlab').innerHTML=right_label.get(l);
	if (document.id('dummy_p')) document.id('dummy_p').innerHTML=du_.get(l);
	if (document.id('dummy2_p')) document.id('dummy2_p').innerHTML=du2_.get(l);
	//if (document.id('locked_w')) document.id('locked_w').innerHTML=lo_.get(l);
		
	warning = warner.get(l);
	waiter = waiter_.get(l);
	sorry = sorry_.get(l);
	loado = loado_.get(l);

	caller = caller_.get(l);
	requ = requ_.get(l);
	creatu = creatu_.get(l);
	badger = badger_.get(l);
	learner = learner_.get(l);
	morer = morer_.get(l);
	hea = hea_.get(l);
	now = now_.get(l);
	today = today_.get(l);
	//helpcapo = he_.get(l);
	roo = roo_.get(l); roo = roo.match(new RegExp('room-house','g')) ? '' : roo;// hack --ash
	//buy = buy_.get(l);	
		
	if (typeof(mod1) != 'undefined' && mod1 !== null) mod1.content.innerHTML = about_content.get(l);
	if (typeof(mod2) != 'undefined' && mod2 !== null) mod2.content.innerHTML = help_content.get(l);

	if (typeof(mod3) != 'undefined' && mod3 !== null) mod3.content.innerHTML = left_content.get(l);
	if (typeof(mod4) != 'undefined' && mod4 !== null) mod4.content.innerHTML = right_content.get(l);
}

function checkWebRTC() {

        var isWebRTCSupported = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        window.RTCPeerConnection;

        if (window.navigator.userAgent.indexOf("Edge") > -1 || !isWebRTCSupported) {
            alert('Please use a different browser with WebRTC support!');
	    console.log('Bad WebRTC non-compatible bro');
	    return false;
	    
        }
		
	try {
		const pc = new RTCPeerConnection();
		const transceiver = pc.addTransceiver('audio');
		
	} catch (e) {
		console.log(e);
		alert('Please use a newer browser with full WebRTC support!');
	}
}

function toggleHeader(i) {

		let role = 1; //hack ash
		if (i == 1 && role == 1 && aonly)  {
			document.id('room-header').style.color = document.id('room-header').style.color == 'rgb(153, 204, 255)' ? oldColor : '#9cf';
			document.id('room-header-file').style.display = document.id('room-header-file').style.display == 'block' ? 'none' : 'block';
			playSomeMusic = playSomeMusic == true ? false : true;
			setCookie('player', playSomeMusic);
		}
		if (i == 2 && role == 1 && aonly)  {
			document.id('room-header-file').style.display='none';
			document.id('room-header').style.color = document.id('room-header').style.color == 'rgb(153, 255, 204)' ? oldColor : '#9fc';
			shareSomeScreen = shareSomeScreen == true ? false : true;
			setCookie('player', '');
		}			
}

function getFile() {

	let fi = document.id('room-header-file').files[curSelInd];
	if (selectedFile) URL.revokeObjectURL(selectedFile);
	selectedFile = URL.createObjectURL(fi);
}

function getList_names() {
	movieList_names = [];
	let fis = document.id('room-header-file').files;
	for (var i = 0; i < fis.length; i++) {
		movieList_names.push(fis[i].name);
	}
	//console.log('Got list of names', movieList_names);
	
	let str = JSON.stringify(movieList_names);
	//document.id('asender').value = str; // hack ash
	let tok = getCookie('authtoken') || '';
	let mes = {id : 'moviesList', listStr : str, token: tok, addr: document.id('name').value, curSel: curSelInd};
	//console.log('Send movies names as', mes);
	sendMessage(mes);
}

function clearAllCookies() {

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var coo_name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	while (coo_name.charAt(0)==' ') coo_name = coo_name.substring(1,coo_name.length);

        document.cookie = coo_name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None;Secure;";
    }
    
    if (typeof(Storage) != 'undefined') localStorage.clear();
}

function flashText(t, tt) {
	let ti = tt ? tt : 1000;
	document.id('phones').innerHTML = t; document.id('phones').fade(1); (function(){document.id('phones').fade(0);}).delay(ti);
}

function flashText_and_rejoin(t) {
	//SDP_END_POINT_ALREADY_NEGOTIATED does not allow to change media as in showMeAsParticipant() -- so in present we leave room and register again
	document.id('room-header').style.display = 'none';document.id('room-header').fade(0); document.id('phones').innerHTML = t; document.id('phones').fade(1); if (i_am_viewer || true) {leaveRoom(); register();} else {/*showMeAsParticipant();*/}
	(function(){document.id('phones').fade(0);}).delay(1000);
}

function resizer(pctr) {

	/*if (pctr == 1 && !cine) {
		document.id('participants').style.width = '50vw';		
	} else {
		document.id('participants').style.width = '100vw';
	}*/
	  
	// this is fine except when desktop minimizes windows
	/*if (window.innerWidth > 1280) {
	  if (pctr == 1) {
		document.id('participants').style.marginRight = '0px';		
	  } else {
		document.id('participants').style.marginRight = '120px';
	  }
	}*/
	
	/*if (pctr == 4) {
		document.id('room').style.minWidth = '960px';
		document.id('room').style.marginLeft = notebook ? '-280px' :  '-50px';
	} else if (pctr == 3) {
		document.id('room').style.minWidth = '960px';
		document.id('room').style.marginLeft = '';
	} else if (pctr == 2) {
		document.id('room').style.minWidth = '960px';
		document.id('room').style.marginLeft = '';
	} else if (pctr == 1) {
		document.id('room').style.minWidth = '1024px';
		document.id('room').style.marginLeft = '';		
	} else if (pctr == 5) {
		document.id('room').style.minWidth = '1260px';
		document.id('room').style.marginLeft = notebook ? '-400px' : '-180px';
	} else if (pctr > 5) {
		document.id('room').style.minWidth = '1560px';
		document.id('room').style.marginLeft = notebook ? '-520px' : '-310px';
	}*/

}

function toggleAllMuted() {

	let curr_all_muted = getCookie('all_muted') || false;
	let my_mic_muted = loadData(document.id('name').value+'_muted');
	
	if (!i_am_muted && document.id('all_muter').className == "bigO my_mic_on_all_off") {
		// not so ugly hack to unmute iphone webrtc streams
		document.id('all_muter').className = "bigO allmuter_on";
		document.id('all_muter').title = 'Turn off sound';
		setCookie('all_muted', false, 1440);
		if (Object.keys(participants).length) {	
			for (var key in participants) {
			  let video = document.id('video-' + participants[key].name);
			  let spea = document.id('speaker-' + participants[key].name);
			 
		   	  if (participants[key].name != document.id('name').value) {
								
				video.muted = false;
				video.volume = 1;
				spea.removeChild(spea.childNodes[0]);
				participants[key].mode !== 'm' && spea.appendChild(document.createTextNode('\uD83D\uDD0A'));//speaker icon
				participants[key].mode === 'm' && spea.appendChild(document.createTextNode('X'));//x icon
		   	  }
			}
		}
	} else if (!i_am_muted && document.id('all_muter').className == "bigO allmuter_on") {
		// not so ugly hack to unmute iphone webrtc streams
		document.id('all_muter').className = "bigO my_mic_on_all_off";
		document.id('all_muter').title = 'Turn on sound';
		// setCookie('all_muted', true, 1440);
		if (Object.keys(participants).length) {	
			for (var key in participants) {
			  let video = document.id('video-' + participants[key].name);
			  let spea = document.id('speaker-' + participants[key].name);
			 
		   	  if (participants[key].name != document.id('name').value) {
								
				video.muted = true;
				video.volume = 0;
				spea.removeChild(spea.childNodes[0]);
				participants[key].mode !== 'm' && spea.appendChild(document.createTextNode('\uD83D\uDD07'));//muted icon
				participants[key].mode === 'm' && spea.appendChild(document.createTextNode('X'));//x icon
		   	  }
			}
		}
	} else {
		
		let n = curr_all_muted ? false : true;
		let t = curr_all_muted ? 'UNMUTED' : 'MUTED ALL';
		if ((my_mic_muted === true || my_mic_muted === 'true') && !curr_all_muted) {saveData(document.id('name').value+'_muted', false, 1440); i_am_muted = false; t = 'MICROPHONE ON';} else {setCookie('all_muted', n, 1440);}
		
		if (n === false) {saveData(document.id('name').value+'_muted', false, 1440); i_am_muted = false;} //?! need this for brute force, unmute mic by toggle_mute 

		document.id('all_muter').title = curr_all_muted ? 'Turn on sound' : 'Turn off all sound';
		
		//remove all to reset them in Participant
		if (Object.keys(participants).length) {	
			for (var key in participants) {
		   	 if (participants[key].name != document.id('name').value) {
				let n = participants[key].name + '_muted';
			
				if (typeof(Storage) != 'undefined') {
					localStorage.removeItem(n);

				} else {
					document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None;Secure;";
				}
				
				var video = document.id('video-' + participants[key].name);
		   	 }
			}
		}

		flashText_and_rejoin(t);
	}
}

    
window.addEventListener("message", function(event) {

//console.log('eo:', event.origin, 'hn:', window.location.hostname, 'ed:', event.data, 'port:', port);
let da = event.data; // console.log ('da0 is', da[0]); 

  //if (event.origin != 'https://'+window.location.hostname+':1443' && event.origin != 'https://'+window.location.hostname+':'+port+'' && event.origin != sp_container_url && event.origin != sp_setter_url && event.origin != sm_url && event.origin != "https://room-house.com" && event.origin != chess_url && event.origin != poker_url && event.origin != air_url && event.origin != swap_url) {
if (typeof(da[0]) === 'undefined' || da[0] == "esms" || (event.origin != 'https://'+window.location.hostname+':18443' && event.origin != 'https://'+window.location.hostname+port && event.origin != sp_container_url && event.origin != sp_setter_url && event.origin != sm_url && event.origin != "https://room-house.com" && event.origin != chess_url && event.origin != poker_url && event.origin != air_url && event.origin != swap_url)) {
    return;
  }
 
  //if ((event.origin == 'https://'+window.location.hostname+':'+port+'') || (event.origin == 'https://'+window.location.hostname+':1443')) {
  if ((event.origin == 'https://'+window.location.hostname+port) || (event.origin == 'https://'+window.location.hostname+':18443')) {
// console.log('parsing1', da);
var obj = JSON.parse(da);
//replace URL on change of room name in iframe 
if (obj.replacer && obj.replacer.length) {
	var roo = window.location.hostname.split('.');
	var foo = document.location.href.split('#'); var zoo = foo[1] && foo[1].length ? foo[1] : roo[0];
	console.log('replaced', zoo, 'with', obj.replacer, 'in', document.location.href); 

	document.id('phones').style.display='none';
	document.id('container').style.display='none';
	//works different for tower name and apart name
	if (zoo == roo[0]) {
		document.location.href=document.location.href.replace(zoo,obj.replacer);
	} else {
		history.pushState({}, null, document.location.href.replace(zoo,obj.replacer));
		window.location.reload();
	}
}
 //doesn't help here?
	soundEffect.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

const sho = () => {

	(function() {if (document.id('red_banner')) {if (document.id('red_banner').style.display == 'none') {document.id('red_banner').style.display='block'; document.id('red_banner').fade(1);} else { document.id('red_banner').fade(0); (function() { document.id('red_banner').style.display = 'none';}).delay(500);}}}).delay(100);
	(function() {if (document.id('green_banner')) {if (document.id('green_banner').style.display == 'none') {document.id('green_banner').style.display='block'; document.id('green_banner').fade(1);} else { document.id('green_banner').fade(0); (function() { document.id('green_banner').style.display = 'none';}).delay(500);}}}).delay(100);
	(function() {if (document.id('blue_banner')) {if (document.id('blue_banner').style.display == 'none') {document.id('blue_banner').style.display='block'; document.id('blue_banner').fade(1);} else { document.id('blue_banner').fade(0); (function() { document.id('blue_banner').style.display = 'none';}).delay(500);}}}).delay(100); 
	
	setTimeout(function() {ajax_room('BLUEHALL');ajax_room('GREENHALL');ajax_room('REDHALL');}, 1000);
	chr_int = setInterval(function() { if (document.id('ph_b') && document.id('ph_b').style.visibility == 'visible' && homee == w[0]) {ajax_room('BLUEHALL');ajax_room('GREENHALL');ajax_room('REDHALL');}}, 30000);
}

const ed = () => { //code to run on receive message from join_ frame
 
 if (document.id('cont')) document.id('cont').fade(0);
 if (document.id('badge')) document.id('badge').fade(0);
 if (document.id('learn_more')) document.id('learn_more').fade(0);
 if (document.id('socs')) document.id('socs').fade(0);
 if (document.id('hea')) document.id('hea').fade(0);
 if (document.id('bstats')) document.id('bstats').fade(0);

 
 //document.id('phones').fade(0);
 if (!normal_mode) {

	//if (small_device && window != window.top) {
	if (small_device) {
		document.id('stats').style.visibility = 'hidden';
		document.id('stats_p').style.visibility = 'hidden';
		document.id('stats_v').style.visibility = 'hidden';
		document.id('stats_ng').style.visibility = 'hidden';
		document.id('air').style.visibility = 'hidden';
		document.id('helpdoc').style.visibility = 'hidden';
		document.id('tex').style.visibility = 'hidden';
		document.id('chess').style.visibility = 'hidden';
		document.id('want').style.visibility = 'hidden';
		document.id('logger').style.display = 'none';		
	}
	
	if (!small_device) document.id('controls').style.display = 'none';
	if (small_device) document.id('controls').style.visibility = 'hidden';
	if (small_device) document.id('bg_switch').style.display = 'none';
	
	document.id('streamer').style.display = 'none';
	
	document.id('house').style.display = 'block'; document.id('house').style.visibility='visible';
	
	if (small_device && document.id('second_logger')) (function() {document.id('second_logger').style.visibility = 'hidden';document.id('second_logger').style.display = 'block';}).delay(2000);
	
	let bgr = homee == 'REDHALL' ? 'red' : homee == 'BLUEHALL' ? 'blue' : homee == 'GREENHALL' ? 'green' : 'empty';

	document.id('city').style.background = bgr != 'empty' ?  'url(/img/' + bgr + '_screen.jpg) center center no-repeat' : null;
 	(function(){document.id('phones').fade(0);}).delay(100);
	 
	 let hv = homee == 'REDHALL' ? small_device ? 24 : 30 : homee == 'BLUEHALL' ? small_device ? 24 : 27 : homee == 'GREENHALL' ? small_device ? 24 : 33 : 33;//need to calculate somehow
	 document.id('participants').style.top = '-'+hv+'vh';
	 
	 document.id('house').style.textAlign = 'center';
	 
 } else {
	document.id('main_container').style.marginTop = '-60px';
	let bgr = homee == 'REDHALL' ? 'red' : homee == 'BLUEHALL' ? 'blue' : homee == 'GREENHALL' ? 'green' : 'empty';
	document.id('city').style.background = bgr != 'empty' && !small_device ?  'url(/img/' + bgr + '_screen.jpg) center center no-repeat' : null;	(function(){document.id('phones').fade(0);}).delay(500);
	
 }
 
 if (document.id('dbao')) document.id('dbao').style.display = 'none';
 
 //var obj = JSON.parse(event.data);
 // from_join_v
 if (obj.name && obj.name.length) {
  document.id('name').value = obj.name;
  saveData('name', obj.name, 1440);
   
  document.id('roomName').value = roomee.length ? roomee : obj.room;
  document.id('houseName').value = w[0];

  role = obj.role;
  
  //because checker.pl returns empty when no credentials set in http_only coo
  if (role.length != 0) {if (role == 0) i_am_dummy_guest = true;}
  else {role = 0;};//this is a guest, too, but not dummy
  
  if (obj.curip)  {
        document.id('curip').value = obj.curip;
        curIP = document.id('curip').value;
	//console.log('curIP', curIP);
  }
  
  //dummy_guest set, check it when you register!
//console.log('before register1: room', room, 'val', document.id('roomName').value);
  register();

/*
  if(role == 0 && small_device) {(function() {let titles = ['nato','torp','neft','shavlo','dzuba','zenit','tska']; const rnd = (min,max) => { return Math.floor(Math.random() * (max - min + 1) + min) }; if (w[0] === "club" && !heard_info) {heard_info = true; setCookie('heard_info', true, 144000); if (sound_on_played && false) {soundEffect.volume=0.5; soundEffect.src = '/sounds/'+titles[rnd(0,titles.length-1)]+'.mp3';} if (!heard_info) (function() { if (sound_on_played) {soundEffect.volume=0.4; soundEffect.src = '/sounds/sound_on2.mp3';}}).delay(10000);}}).delay(3000);}
*/
/*
  if(role == 0 && !heard_info && !small_device) {(function() { heard_info = true; setCookie('heard_info', true, 144000); if (sound_on_played) {soundEffect.volume=0.4; soundEffect.src = '/sounds/sound_on2.mp3';}}).delay(5000);}
*/

  if (role == 0 && hack) role = 1;

  if (role == 0) {

	document.id('bell').addEventListener('click', signalGuru);

	window.addEvent('domready', function() {
	mod3 = new mBox.Modal({
		content: left_content.get(altlang[ctr]),
		setStyles: {content: {padding: '25px', lineHeight: 24, margin: '0 auto', fontSize: 18, color: '#222'}},
		width:240,
		title: 'Ok!',
		attach: 'leftpluss'
	});

	mod4 = new mBox.Modal({
		content: right_content.get(altlang[ctr]),
		setStyles: {content: {padding: '25px', lineHeight: 24, margin: '0 auto', fontSize: 18, color: '#222'}},
		width:240,
		title: 'Ok!',
		attach: 'rightpluss'
	});
	
	});  
  } else {

	if (role == 1) {
		document.id('logger').addEventListener('dblclick', function(e) {
			e.preventDefault();
e.stopPropagation();
			var yon = window.confirm('Make everyone leave?');
			if (yon) {let tok = getCookie('authtoken') || ''; let mes={id : 'makeLeave', name : 'all', token : tok}; sendMessage(mes);}
		});
	}
  }
  
  //document.id('room-header').addEventListener('click', function(e) {e.preventDefault();e.stopPropagation(); if (shareSomeStream) {document.id('room-header').style.display='none'; grun()} else {toggleHeader(1)}});
  document.id('room-header').addEventListener('click', function(e) {e.preventDefault();e.stopPropagation(); toggleHeader(1);});
  document.id('room-header').addEventListener('dblclick', function(e) {e.preventDefault();e.stopPropagation(); toggleHeader(2);});

   
  if (role != -1  && sp_shown) {
  	request('https://'+window.location.hostname+'/cgi/genc/get_acc_id.pl').then(data => {
//console.log('1: acc_id is', data);
		setTimeout(function() { if (document.id('removerA')) {document.id('removerA').innerHTML = 'Error: Service unavailable'; (function() { document.id('removerA').fade(0)}).delay(1000);}}, 10000);
		
		(function() { if (document.id('sp_balance')) { document.id('sp_balance').style.display='block'; document.id('sp_balance').src = sp_container_url + '/?acc=' + data;
		}}).delay(1000);
		
		ch_int = setInterval(function() { if (document.id('sp_balance')) { document.id('sp_balance').style.display='block'; document.id('sp_balance').src = sp_container_url + '/?acc=' + data;} }, 300000);	  
	});
  }
  
  document.id('logger').click();
   
  (function(){document.id('message_wrap').style.display='block';}).delay(1000);
  
  (function(){document.id('chatter').style.display='block';document.id('antichatter').style.display='block';document.id('audience').style.display='block';}).delay(1000);
  (function(){
		document.id('phones').style.paddingTop = small_device ? '39vh' : '45vh';
		
  }).delay(1000);
  
  if (voting_shown || sp_shown) {(function(){document.id('room-header').style.marginTop = small_device ? '4vw' : '8vw'; document.id('room-backer').style.marginTop = small_device ? '14vw' : '8vw'; 
  document.id('room-header').style.marginBottom = small_device ? '0px' : '20px'; document.id('room-backer').style.marginBottom = small_device ? '20px' : '40px'; 
  if (voting_shown) {document.id('subcontrols').style.display='block'; document.id('subcontrols').fade(1);}}).delay(1000);} else  {document.id('room-header').style.marginTop = small_device ?  '0vw' : '8vw';}
	
  stats_p.setAttribute('title', now + ' presenters');
  stats_v.setAttribute('title', now + ' guests');
  stats_ng.setAttribute('title', today);

 } //obj.name

 document.id('phones').onclick = '';document.id('phones').style.cursor = 'none';
 
 //if (cine && role == 1) {} else { document.id('container').fade(1);} // ok with 3D
 if (cine) {} else { document.id('container').fade(1);} // ok with 3D if not cine
}; //ed()

let na = getCookie('name'); if (na != null && na != 'null') {
 	
	if (document.id('loading_span')) document.id('loading_span').fade(0);
	ed();
//console.log('pcounter is', pcounter, 'role is', role, 'limit is', room_limit);
	if (role == 0) {
		let l = checkLang(); 
		let click_menu = du_.get(altlang[l]);
		flashText(click_menu, 3000);
	}
	if (small_device) window.scrollTo({ top: 0, behavior: 'smooth' });
	
} else { //demo mode		
	normal_mode = false; let mgn = small_device ? 135 : 90; sp_shown = 0;
	document.id('main_container').style.marginTop = small_device ? document.id('main_container').style.marginTop : '16vh';
	setCookie('new_cache', true, 14400);
	
	let mes={id : 'checkRoom', room : homee, tok : ''}; sendMessage(mes);
	 if (document.id('loading_span')) document.id('loading_span').fade(0);

document.id('join').style.visibility='hidden'; document.id('langs').style.visibility='hidden'; document.id('house').style.visibility='hidden';
(function() {document.id('phones').style.cursor = 'pointer';document.id('phones').style.paddingTop = '0vh'; document.id('phones').style.display='block'; document.id('phones').fade(1);  document.id('phones').onclick = function() { if (w[0] == homee) {/*console.log('equal, sho!');*/ sho();} else {/*console.log('not equal, ed!');*/ ed();}}; if (document.id('loading_span')) document.id('loading_span').style.display='none'; if (!cine) {let l = checkLang();document.id('ph_b').style.background = '#112'; document.id('ph_b').innerHTML = '<div id="locked_w" style="margin-top:20%;">'+lo_.get(altlang[l])+'</div>';(function(){document.id('locked_w').fade(0); (function(){location.reload();}).delay(500)}).delay(2000);} if (document.id('ph_b')) document.id('ph_b').style.visibility='visible'; console.log('here we are! role is', role);}).delay(500);
}

// fix area above video for three.js canvas clicks
//if (!small_device) {
	document.id('preco').style.height = '0px';
	document.id('main_container').style.height = '0px';
	document.id('room').style.height = '0px';
	document.id('room-header_box').style.height = '0px';
	document.id('room').style.marginTop = '-57vh';
//}
	
} else if (event.origin == sm_url) {
//console.log('parsing2', event.data);
	var obj = JSON.parse(event.data);
	if (obj.action == 'close_iframe' && document.id('sm_niche')) {

		document.id('sm_niche').fade(0);
		document.id('sm_niche').style.zIndex='-10100';
		document.id('sm_niche').style.display='none';
		document.id('sm_niche').src='';
	}
} else if (event.origin == "https://room-house.com" || event.origin == poker_url) {
//console.log('parsing3', event.data);
	var obj = JSON.parse(event.data);
	if (obj.action == 'close_iframe' && document.id('poker_niche')) {

		document.id('poker_niche').fade(0);
		document.id('poker_niche').style.zIndex='-10100';
		document.id('poker_niche').style.display='none';
		document.id('poker_niche').src='';
	}
} else if (event.origin == chess_url) {
//console.log('parsing4', event.data);
	var obj = JSON.parse(event.data);
	if (obj.action == 'close_iframe' && document.id('chess_niche')) {

		document.id('chess_niche').fade(0);
		document.id('chess_niche').style.zIndex='-10100';
		document.id('chess_niche').style.display='none';
		document.id('chess_niche').src='';
	}
} else if (event.origin == air_url) {
//console.log('parsing5', event.data);
	var obj = JSON.parse(event.data);
	if (obj.action == 'close_iframe' && document.id('air_niche')) {

		document.id('air_niche').fade(0);
		document.id('air_niche').style.zIndex='-10100';
		document.id('air_niche').style.display='none';
		document.id('air_niche').src='';
	}
} else if (event.origin == swap_url) {
//console.log('parsing6', event.data);
	var obj = JSON.parse(event.data);
	if (obj.action == 'close_iframe' && document.id('swap_niche')) {

		document.id('swap_niche').fade(0);
		document.id('swap_niche').style.zIndex='-10100';
		document.id('swap_niche').style.display='none';
		document.id('swap_niche').src='';
	}		
} else if (event.origin == sp_setter_url) {
//console.log('parsing7', event.data);
	var obj = JSON.parse(event.data);
	if (obj.action == 'Bound') {
		//if (obj.to == '5ENzTTUL3zvnMP8usRo3ZcGmMhkaHsvFUP6PMedLV9EWtLFx' && obj.sum == '10000000000') {
			//setCookie('acc', obj.from, 144000); 
			//acc_id = obj.from;
			
			//mod6.close();
			
			(function(){if (document.id('m6')) {document.id('m6').style.display='none';document.id('m6').dispose(); [...document.querySelectorAll("[style*='z-index: 31004']")].forEach(e=>e.dispose())}}).delay(1000);

			document.id('sp_balance').src = sp_container_url + '/?acc=' + obj.from;
			clearInterval(ch_int);
			ch_int = setInterval(function() {if (document.id('sp_balance')) { document.id('sp_balance').style.display='block'; document.id('sp_balance').src = sp_container_url + '/?acc=' + obj.from;}}, 300000);
			afterBinding = true;
			
			//document.id('phones').innerHTML = 'OK TO RE-ENTER'; document.id('phones').fade(1); (function(){location.reload();}).delay(2000);
			//(function(){
			let vv = document.querySelector('video'); setTimeout(function() {vv.click()}, 500);
			//}).delay(1000);
		   
			//let head = document.getElementsByTagName('head')[0], scr = document.createElement('script'); 
			//scr.appendChild(document.createTextNode(obj.payload)); head.appendChild(scr);
		//}
	} else {
		console.log('Undefined action received from wallet!');
	}
	
} else {
// console.log('parsing8', event.data);
  var obj = JSON.parse(event.data);

  if (obj.action == 'saveCookie') {
	
	doSwitchOneMode(document.id('newacc'),'5ENzTTUL3zvnMP8usRo3ZcGmMhkaHsvFUP6PMedLV9EWtLFx',0.5); //sorba

  } else if (obj.action == 'openWallet') {
  
  	window.open('https://wallet.room-house.com', '_blank');

  } else if (obj.action == 'load') {
  
	if (document.id('removerA')) document.id('removerA').remove();
	if (document.id('sp_container') && sp_shown) 

	{
		var morphStart = function(){
            		this.start({
               			'marginTop': -24,
            		});
		}
         
         	window.addEvent('domready', function() {
            		var morphElement = document.id('controls');
            		var morphObject = new Fx.Morph(morphElement, {
               			fps: 15
            		});
            
            		document.id('slidein').addEvent('click', morphStart.bind(morphObject));
         	});
				
		document.id('sp_container').style.display = 'block';
		document.id('slidein').click();
	}
	
	if (document.id('demo_info')) document.id('demo_info').style.display = 'block';
	 
  } else if (obj.action == 'err') {
  	if (document.id('removerA')) document.id('removerA').remove();
	
	(function() { if (document.id('sp_container') && sp_shown) document.id('sp_container').style.display = 'none'; document.id('poll_container').style.display = 'none';}).delay(1000);
  } else if (obj.action == 'success') {
  
	if (document.id('removerB')) document.id('removerB').remove();
  	if ( document.id('sp_container') && sp_shown && document.id('sp_container').style.display == 'block' ) {
		const sp_circles = document.querySelectorAll('.accos');
		sp_circles.forEach(circle => {
 
			circle.style.visibility = 'visible';
		});
	}
	
  }
}  
  return false;
});

window.addEvent('domready', function() {

	mod1 = new mBox.Modal({
		content: about_content.get(altlang[ctr]),
		setStyles: {content: {padding: '25px', lineHeight: 28, margin: '0 auto', fontSize: 24}},
		width:300,
		title: 'About R-H',
		attach: 'abouter'
	});
	
	mod2 = new mBox.Modal({
		content: help_content.get(altlang[ctr]),
		setStyles: {content: {padding: '25px', lineHeight: 28, margin: '0 auto', fontSize: 24}},
		width:300,
		title: 'Help',
		attach: 'helper'
	});

	mod5 = new mBox.Modal({
		content: central_content.get(altlang[ctr]),
		setStyles: {content: {padding: '25px', lineHeight: 24, margin: '0 auto', fontSize: 18, color: '#222'}},
		width:210,
		title: 'Ok!',
		attach: 'chatter'
	});

	mod7 = new mBox.Modal({
		content: anno_adder_content.get(altlang[ctr]),
		setStyles: {content: {padding: '25px', lineHeight: 24, margin: '0 auto', fontSize: 18, color: '#222'}},
		width:210,
		title: 'Set Annotation',
		attach: 'anno_adder'
	});

	mod8 = new mBox.Modal({
		content: stream_adder_content.get(altlang[ctr]),
		setStyles: {content: {padding: '25px', lineHeight: 24, margin: '0 auto', fontSize: 18, color: '#222'}},
		width:210,
		title: 'Stream M3U8',
		attach: 'stream_adder'
	});
							
	(function(){document.id('wrapper').fade(1);}).delay(200);
	(function(){document.id('preroom').fade(1);}).delay(100);
	
	oldColor = document.id('room-header') ? document.id('room-header').style.color : '';
	
	setInterval(function() { if (document.id('message_box') && document.id('message_wrap') && document.id('message_wrap').style.display == 'block' && chat_shown ) {ajax_chat()} }, 3000);

});

const gifr = (ifrid) => {
	if (document.getElementsByTagName('iframe')[7] && document.getElementsByTagName('iframe')[7].name == 'ifrr') {
	 let ifr = document.getElementsByTagName('iframe')[7];
	 ifr.id = ifrid ? ifrid : 'ifr';
	 ifr.src='/testl.html';
	} else {
	 let ifr = document.createElement('iframe');
	 ifr.id = ifrid ? ifrid : 'ifr';
	 ifr.name = 'ifrr';
	 ifr.style.position = 'absolute';
	 ifr.style.left = 0;
	 ifr.style.top = 0;
	 ifr.style.width='320px';
	 ifr.style.height='240px';
	 ifr.src='/testl.html';
	 document.body.appendChild(ifr);
	}
}

const cli1 = () => {
if ( document.id('dummy_p') && dummies) document.id('dummy_p').style.display='none';
if ( document.id('dummy2_p') && dummies) document.id('dummy2_p').style.display='none';
if (!snd_clicked) {soundEffect.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'; snd_clicked=true;}
}

const cli2 = () => {let sem  = window.innerWidth > 1024 ? '7' : '';
//fetch('https://'+window.location.hostname+':'+port+'/cgi/genc/checker.pl'
fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {let role = respo; if (pcounter < room_limit) hack = true; if (role == 0 && hack) role = 1; if ((!cammode || cammode == 2) && (!playSomeMusic && !shareSomeScreen)) {if (role == 1 || role == 2 || temporary) {cammode = 1; setCookie('fmode',0,144000); setCookie('av', true, 144000); aonly = 0; document.id('av_toggler').className = "bigO av_toggler_f"; document.id('fcam').className = "bigO fcam_f"; document.id('bcam').className = "bigO bcam";
 flashText_and_rejoin('FRONT CAM!');} else {flashText(caller + '&nbsp;<img style="margin-top:-72px;" src=/icons/bell' + sem + '2.png>'); document.id('fcam').className = "bigO fcam";}} else {if (!playSomeMusic && !shareSomeScreen) {cammode = 0; document.id('fcam').className = "bigO fcam"; setCookie('av', false, 144000); aonly = 1;  flashText_and_rejoin('AUDIO-ONLY'); setCookie('player', '');} else {if (playSomeMusic) {flashText('PLAYING VIDEO! STOP?')} else {flashText('SHARING SCREEN! STOP?')}}}}).catch(err => console.log(err));
}
// DEMO: VIDEO OFF
const cli3 = () => {let sem  = window.innerWidth > 1024 ? '7' : '';
//fetch('https://'+window.location.hostname+':'+port+'/cgi/genc/checker.pl'
fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {let role = respo;  if (pcounter < room_limit || (pcounter == room_limit && !i_am_viewer)) hack = true; if (role == 0 && hack) role = 1; if ((!cammode || cammode == 1) && (!playSomeMusic && !shareSomeScreen)) {if (role == 1 || role == 2 || temporary) {cammode = 2; setCookie('fmode',1,144000); setCookie('av', true, 144000); aonly = 0; document.id('av_toggler').className = "bigO av_toggler_f"; document.id('fcam').className = "bigO fcam"; document.id('bcam').className = "bigO bcam_f"; flashText_and_rejoin('BACK CAM!');} else {flashText(caller + '&nbsp;<img style="margin-top:-72px;" src=/icons/bell' + sem + '2.png>'); document.id('bcam').className = "bigO bcam";}} else  {if (!playSomeMusic && !shareSomeScreen) {cammode = 0; document.id('bcam').className = "bigO bcam"; setCookie('av', false, 144000); aonly = 1; flashText_and_rejoin('AUDIO-ONLY');setCookie('player', '');} else {if (playSomeMusic) {flashText('PLAYING VIDEO! STOP?')} else {flashText('SHARING SCREEN! STOP?')}}}}).catch(err => console.log(err));
}

const cli4 = () => {

if (!playSomeMusic && !shareSomeScreen) {toggleAllMuted();} else { i_am_muted = !i_am_muted}
}

const cli5 = () => {let sem  = window.innerWidth > 1024 ? '7' : ''; document.id('message_box').style.display = 'block'; document.id('audience_box').style.display = 'none';
new_message = 0; if (chat_shown) {document.id('message_wrap').fade(0); document.id('chatter').fade(0); document.id('audience').fade(0); document.id('antichatter').fade(0);chat_shown = 0; document.id('logger').className = "bigO logger";} else {
//if (!small_device) {let roomRect = document.id('room').getBoundingClientRect();let roomTop = parseInt(roomRect.top); document.id('message_wrap').style.top = voting_shown ? '0vh' : roomTop > 400 ? '6vh' : roomTop > 360 ? '4vh' : roomTop > 320 ? '2vh' : roomTop > 280 ? '0vh' : '0vh'; if (document.id('sp_container') && sp_shown) document.id('message_wrap').style.top = '0vh';}';
if (!small_device) document.id('message_wrap').style.top = '-5vh';
if (small_device || notebook) document.id('message_wrap').style.top = '-10vh'; 
document.id('chatter').style.display='block'; document.id('antichatter').style.display='block'; document.id('audience').style.display='block'; document.id('message_wrap').fade(1); document.id('chatter').fade(1); document.id('audience').fade(1); document.id('antichatter').fade(1); chat_shown = 1; document.id('logger').className = "bigO logger_f"; if (voting_shown) { (function(){document.id('subcontrols').style.display='block';
(function() {if (document.id('ball1')) (function() {document.id('ball1').fade(0);document.id('leftlab').fade(1);}).delay(2000);if (document.id('ball2')) (function() {document.id('ball2').fade(0);document.id('rightlab').fade(1);}).delay(2000);(function() {document.id('leftplus').innerHTML = '+';document.id('rightplus').innerHTML = '+';}).delay(2000);}).delay(2000);
document.id('subcontrols').fade(1);}).delay(500);}}
}

const cli6 = () => {let sem  = window.innerWidth > 1024 ? '7' : '';
//fetch('https://'+window.location.hostname+':'+port+'/cgi/genc/checker.pl'
fetch('https://'+window.location.hostname+port+'/cgi/genc/checker.pl', {credentials: 'include'}).then(respo => respo.text()).then((respo) => {let role = respo; if (pcounter < room_limit) hack = true; if (role == 0 && hack) role = 1; if (aonly) { already_being_played = 0; document.id('room-header').style.color = oldColor; document.id('room-header-file').style.display = 'none'; document.id('av_toggler').className = "bigO av_toggler_f"; if (role == 1 || role == 2 || temporary) {setCookie('av', true, 144000); aonly = 0; flashText_and_rejoin('VIDEO ON!'); } else {flashText(caller + '<img style="&nbsp;margin-top:-72px;" src=/icons/bell' + sem + '2.png>');  document.id('av_toggler').className = "bigO av_toggler";}} else {if (playSomeMusic) {if (shareSomeStream) { if (document.getElementsByTagName('iframe')[7] && document.getElementsByTagName('iframe')[7].name == 'ifrr') {document.getElementsByTagName('iframe')[7].dispose();}} else {let myname = document.id('name').value; let myvideo = 'video-' + myname; if (document.id(myvideo)) {setCookie('cT_'+curMoviesList[0], document.id(myvideo).currentTime, 14400);}}} else {/*setCookie('cT_'+curMoviesList[0], null, 0);*/} cammode = 0; playSomeMusic = false; shareSomeScreen = false; shareSomeStream = false;  g.audioContext = null; document.id('av_toggler').style.color='#777'; setCookie('av', false, 144000);  setCookie('fmode', null, 0); aonly = 1; flashText_and_rejoin('AUDIO-ONLY'); setCookie('player', '');}}).catch(err => console.log(err));
}

const cli7 = () => {let sem  = window.innerWidth > 1024 ? '7' : '';
document.id('message_wrap').fade(0);document.id('chatter').fade(0);document.id('audience').fade(0);document.id('antichatter').fade(0);chat_shown = 0; document.id('logger').className = "bigO logger";
}

const cli8 = () => { homee = document.id('roomName').value !== w[0] && homee === w[0] ? document.id('roomName').value : homee;
//fetch('https://'+window.location.hostname+':'+port+'/cgi/genc/checker.pl'
fetch('https://'+window.location.hostname+port+'/cgi/genc/get_guests.pl?room='+homee, {credentials: 'include'}).then(function(response){if (response.status !== 200){console.log('Status Code: ' + response.status); return;} response.json().then(function(data) { if (data != 0) { let audi = ''; const array = Object.keys(data).map(key => data[key]); array.forEach(item => { let s = item[0].split('_'); let short = s[0]; let d= item[3].split(' '); let ti = d[1].split(':'); let tim = ti[0]+':'+ti[1]; audi = audi + '<div><span>' + short + '</span>,&nbsp;<span>' + item[1] + '</span>,&nbsp;<span>' + item[2] + '</span>&nbsp;<span>' + tim + '</span></div>';}); audi = audi + '<div style="line-height:60px;">&nbsp;</div>'; document.id('logger').click(); chat_shown = 0; document.id('message_box').innerHTML = audi; document.id('message_box').fade(1);
}})}).catch(err => console.log(err));
}
