//Room.java
  private void viewRoom_old() throws IOException {
    
    final JsonArray viewersArray = new JsonArray();
    for (final UserSession viewer : this.getViewers()) {

        final JsonElement viewerNameCurip = new JsonPrimitive(viewer.getName() + "_|_" + viewer.getCurip());
        viewersArray.add(viewerNameCurip);

    }
    
    log.debug("ROOM {}: notifying all users that viewer {} is viewing the room", this.name, name);

    final List<String> unnotifiedParticipants = new ArrayList<>();
    
    final JsonObject existingViewersMsg = new JsonObject();
    existingViewersMsg.addProperty("id", "existingViewers");
    existingViewersMsg.add("data", viewersArray);
        
    for (final UserSession participant : participants.values()) {
      try {
        participant.sendMessage(existingViewersMsg);
      } catch (final IOException e) {
        unnotifiedParticipants.add(participant.getName());
      }
    }

    for (final UserSession viewer : viewers.values()) {
      try {
        viewer.sendMessage(existingViewersMsg);
      } catch (final IOException e) {
        unnotifiedParticipants.add(viewer.getName());
      }
    }
    
    if (!unnotifiedParticipants.isEmpty()) {
      log.debug("ROOM {}: The users {} could not be notified that {} is viewing the room", this.name,
          unnotifiedParticipants, name);
    }

  }

// i18n.js

var phones = new Map([
   ['en', '..more ROOMS! <a href="https://room-house.com" target=new>here</a>'],
   ['ru', '..больше КОМНАТ! <a href="https://room-house.com" target=new>тут</a>'],
   ['es', '..más HABITACIONES! <a href="https://room-house.com" target=new>aquí</a>'],
   ['fr', '..plus de CHAMBRES! <a href="https://room-house.com" target=new>ici</a>'],
   ['cn', '..更多房间! <a href="https://room-house.com" target=new>這裡</a>'],
   ['pt', '..mais QUARTOS! <a href="https://room-house.com" target=new>aqui</a>'],
]);

var for_por = new Map([
   ['en', 'for'],
   ['ru','за'],   
   ['es', 'por'],
   ['fr', 'pour'],
   ['cn', 'for'],
   ['pt', 'por'],
]);

var hola_ = new Map([
   ['en', 'Hello, guys!'],
   ['ru','Привет, ребята!'],   
   ['es', '¡Hola chicos!'],
   ['fr', 'Bonjour gars!'],
   ['cn', 'Hello, guys!'],
   ['pt', 'Ola pessoal!'],
]);

var new_account = new Map([
   ['en', 'Your account ID (copy/paste and hit Enter) <input type=text id=rsender style="width:210px;" value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length == 48 && this.value.substring(0,1) == \'5\') {setCookie(\'acc\',this.value,144000);mod6.close();$(\'sp_balance\').src=\'https://cube.room-house.com:8444/?acc=\'+this.value;leaveRoom();register();} else {this.value=\'\';this.placeholder = \'Please enter valid address\';}}"><br>Create <a href=\'https://wallet.room-house.com/#/accounts/0\' target=\'new\'>a new account</a>.'],
      ['es', 'Your account ID (copy/paste and hit Enter) <input type=text id=rsender style="width:210px;" value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length == 48 && this.value.substring(0,1) == \'5\') {setCookie(\'acc\',this.value,144000);mod6.close();$(\'sp_balance\').src=\'https://cube.room-house.com:8444/?acc=\'+this.value;leaveRoom();register();} else {this.value=\'\';this.placeholder = \'Please enter valid address\';}}"><br>Create <a href=\'https://wallet.room-house.com/#/accounts/0\' target=\'new\'>a new account</a>.'],
         ['pt', 'Your account ID (copy/paste and hit Enter) <input type=text id=rsender style="width:210px;" value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length == 48 && this.value.substring(0,1) == \'5\') {setCookie(\'acc\',this.value,144000);mod6.close();$(\'sp_balance\').src=\'https://cube.room-house.com:8444/?acc=\'+this.value;leaveRoom();register();} else {this.value=\'\';this.placeholder = \'Please enter valid address\';}}"><br>Create <a href=\'https://wallet.room-house.com/#/accounts/0\' target=\'new\'>a new account</a>.'],
	    ['fr', 'Your account ID (copy/paste and hit Enter) <input type=text id=rsender style="width:210px;" value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length == 48 && this.value.substring(0,1) == \'5\') {setCookie(\'acc\',this.value,144000);mod6.close();$(\'sp_balance\').src=\'https://cube.room-house.com:8444/?acc=\'+this.value;leaveRoom();register();} else {this.value=\'\';this.placeholder = \'Please enter valid address\';}}"><br>Create <a href=\'https://wallet.room-house.com/#/accounts/0\' target=\'new\'>a new account</a>.'],
	       ['cn', 'Your account ID (copy/paste and hit Enter) <input type=text id=rsender style="width:210px;" value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length == 48 && this.value.substring(0,1) == \'5\') {setCookie(\'acc\',this.value,144000);mod6.close();$(\'sp_balance\').src=\'https://cube.room-house.com:8444/?acc=\'+this.value;leaveRoom();register();} else {this.value=\'\';this.placeholder = \'Please enter valid address\';}}"><br>Create <a href=\'https://wallet.room-house.com/#/accounts/0\' target=\'new\'>a new account</a>.'],
	          ['ru', 'Your account ID (copy/paste and hit Enter) <input type=text id=rsender style="width:210px;" value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length == 48 && this.value.substring(0,1) == \'5\') {setCookie(\'acc\',this.value,144000);mod6.close();$(\'sp_balance\').src=\'https://cube.room-house.com:8444/?acc=\'+this.value;leaveRoom();register();} else {this.value=\'\';this.placeholder = \'Please enter valid address\';}}"><br>Create <a href=\'https://wallet.room-house.com/#/accounts/0\' target=\'new\'>a new account</a>.']
]);


// good stuff -- 08.09.22
//SDP_END_POINT_ALREADY_NEGOTIATED does not allow to change media in showMeAsParticipant() -- so in present we MUST leave room and register back
function showMeAsParticipant() {

	let participant;
	let myname = $('name').value;
	
	let fmode = getCookie('fmode') ? 'environment' : 'user';			
			
	let i_am_muted = loadData(myname+'_muted');
		
	let mode = aonly ? 'a' : 'v'; // maybe c if am guru?
	
	for (var key in participants) {
		   	 if (participants[key].name == myname) {participant = participants[key]; break;}
	}
		
	if (typeof participant === 'undefined') {console.log('undef', myname);return;}

//console.log('showAsParticipant:', participant.name, 'mode:', participant.mode);

	let video = participant.getVideoElement();
	let constraints = {
                audio: true,
                video: {
                        maxWidth : wi_hq,
                        maxFrameRate : fps_hq,
                        minFrameRate : fps_hq,
			facingMode: fmode
                }
	};

	let constraints_vonly = {
                audio: false,
                video: {
			facingMode: fmode
               	}
	};
		
	let constraints_aonly = {
                audio: true,
               	video: false
	};

	if (aonly) constraints = constraints_aonly;
	if (i_am_muted === true || i_am_muted === 'true') constraints =  constraints_vonly;

	let options = {
              	localVideo: video,
		mediaConstraints: constraints,
		onicecandidate: participant.onIceCandidate.bind(participant)
	}
	
	let constraints_alt = (i_am_muted === true || i_am_muted === 'true') ? constraints_vonly : constraints_aonly;
	
	let options_alt = {
		localVideo: video,
		mediaConstraints: constraints_alt,
		onicecandidate: participant.onIceCandidate.bind(participant)
	}

         participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
                  if(error) {
			var ff = new RegExp('closed','ig');
			if (error.toString().match(ff)) {
			} else {
                          participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options_alt,
                          function (error) {
                                        if(error) {
                                                return console.error(error);
                                        }

                                        startVideo(video);
                                        this.generateOffer (participant.offerToReceiveVideo.bind(participant));
					if (small_device)  $(myname).style.float = 'none';
                          });
			}

			return false;
                  } else {
                  	startVideo(video);
                  	this.generateOffer (participant.offerToReceiveVideo.bind(participant));
			if (small_device)  $(myname).style.float = 'none';
		  }

		  (function(){$('phones').fade(0);}).delay(1000);
         });
}
/*
<!-- script src="./js/conferenceroom_144a.js"></script>
<script src="./js/participant_139a.js"></script>
<script src="./js/i18n_120.js"></script>
<script src="./js/kure.js"></script>
<script src="./js/starter_a.js"></script -->
*/

/*
(function() {
    var call = Function.prototype.call;
   
    Function.prototype.call = function() {

       	console.log(this.name, arguments); // Here you can do whatever actions you want
	let h = arguments[0] && arguments[0][0] && (arguments[0][0] == 'resize' || arguments[0][0] == 'resized' || arguments[0][0] == 'hidden') && arguments[1] == 1 && typeof(arguments[2]) === 'undefined';
console.log('h', h);
       if (h === false || typeof(h) === 'undefined') {console.log('return apply'); return call.apply(this, arguments)} else {console.log('return null'); return;}
    };
}());
*/

// index.html
/*
	<!-- div id="want" style="display:none;opacity:0;background: transparent; width: 120px; margin-right:54px; float:right; font-size:24px;"><a href="https://room-house.com/sp_help/index.html" style="text-decoration:none;font-size:22px;" target=new>&#128176;&nbsp;<span style="font-weight:normal;color:#fed;font-size:22px;"></span></a></div -->
*/
