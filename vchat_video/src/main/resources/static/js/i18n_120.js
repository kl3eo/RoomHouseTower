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

var loado_ = new Map([
   ['en', '..loading..'],
   ['ru', '..загрузка..'],
   ['es', '..cargando..'],
   ['fr', '..chargement..'],
   ['cn', '..loading..'],
   ['pt', '..carregando..'],
]);
  
var heads1 = new Map([
   ['en', 'Enter Rumhaus'],
   ['ru', 'Войти в румхаус'],
   ['es', 'Entrar Rumhaus'],
   ['fr', 'Entrer Rumhaus'],
   ['cn', '進入 Rumhaus'],
   ['pt', 'Entrar Rumhaus'],
]);

var about = new Map([
   ['en', 'about R-H'],
   ['ru', 'о R-H'],
   ['es', 'sobre R-H'],
   ['fr', 'à propos'],
   ['cn', '關於'],
   ['pt', 'sobre R-H'],
]);

var help = new Map([
   ['en', 'help'],
   ['ru', 'помощь'],
   ['es', 'ayuda'],
   ['fr', 'aide'],
   ['cn', '幫助'],
   ['pt', 'ajuda'],
]);

var warner = new Map([
   ['en', 'RE-CONNECTING ..'],
   ['ru', 'соединение ..'],
   ['es', 'RECONECTANDO ..'],
   ['fr', 'RECONNEXION ..'],
   ['cn', 'RE-CONNECTING ..'],
   ['pt', 'RECONECTANDO ..'],
]);

var badger_ = new Map([
   ['en', 'ENTER AS'],
   ['ru', 'ВОЙТИ КАК'],
   ['es', 'ENTRAR COMO'],
   ['fr', 'ENTRER COMME'],
   ['cn', 'ENTER AS'],
   ['pt', 'ENTER AS'],
]);

var learner_ = new Map([
   ['en', 'learn'],
   ['ru', 'узнать'],
   ['es', 'learn'],
   ['fr', 'learn'],
   ['cn', 'learn'],
   ['pt', 'learn'],
]);

var morer_ = new Map([
   ['en', 'more'],
   ['ru', 'правила'],
   ['es', 'more'],
   ['fr', 'more'],
   ['cn', 'more'],
   ['pt', 'more'],
]);

var about_content = new Map([
   ['en', '<div class="centered modal_text">Room-House is a free media network. You can setup your own Room-House node on your home computer to meet with friends, colleagues or clients in a private room: use this <a href="https://github.com/kl3eo/room-house/blob/main/xTER_VB_install.txt" target=new>how to</a> for a start; or choose an existing R-H from this <a href="https://room-house.com" target=new>big list</a>. You can write us on our <a href="https://twitter.com/RoomHouseOffic1" target=new>twitter</a>.</div>'],
  ['ru','<div class="centered modal_text">Room-House это свободная медиа сеть. Вы можете установить узел Room-House у себя на компьютере: см. <a href="https://github.com/kl3eo/room-house/blob/main/xTER_Room-House_Rus_v2_1_1.pdf" target=new>как</a> и используйте его для встреч с друзьями, коллегами, клиентами, и т.д. Вы можете написать нам в <a href="https://twitter.com/RoomHouseOffic1" target=new>Твиттер</a>.</div>'], 
   ['es', '<div class="centered modal_text">¿Que Debes? - registrarse como el GURU <a href=https://validate.guru target=new>aqui</a>. <br> ¿Que Puedes? - a. Mostrar su propio seleccion de videos. <br> b. Bloquear a los que molestan al publico. <br> c. Tener su propio voto del dia.<br>d. Y otras preferencias del GURU.</div>'],
   ['fr', '<div class="centered modal_text">Room-House est un réseau média libre. Configurez votre propre Room-House sur votre ordinateur connecté à Internet: lire <a href="https://github.com/kl3eo/room-house/blob/main/xTER_VB_install.txt" target=new>comment</a> et utilisez-le pour rencontrer des amis,  collègues, clients, etc, ou choisissez un R-H de celui-ci <a href="https://room-house.com" target=new>liste</a>. Vous avez la chance de nous trouver sur notre <a href="https://twitter.com/RoomHouseOffic1" target=new>twitter</a>.</div>'],
   ['cn', '<div class="centered modal_text">R-H 是一個免費的媒體網絡。您可以在家用電腦上設置自己的 Room-House 節點，以私密方式與朋友、同事或客戶會面: 讀 <a href="https://github.com/kl3eo/room-house/blob/main/xTER_VB_install.txt" target=new>這</a> 並用於會見朋友、同事、客戶等，或從中選擇一個工作 R-H <a href="https://room-house.com" target=new>列表t</a>. 您有幸在我們的推特上找到我們 <a href="https://twitter.com/RoomHouseOffic1" target=new>twitter</a>.</div>'],
   ['pt', '<div class="centered modal_text">Room-House é uma rede de mídia libre. Você pode configurar sua própria Room-House em seu laptop conectado à Internet: <a href="https://github.com/kl3eo/room-house/blob/main/xTER_VB_install.txt" target=new>leia</a> para encontrar amigos, colegas, clientes, etc, ou escolha um R-H funcional desta <a href="https://room-house.com" target=new>lista</a>. Você tem a sorte de nos encontrar em nosso <a href="https://twitter.com/RoomHouseOffic1" target=new>twitter</a>.</div>'],
]);

var help_content = new Map([
   ['en', '<div class="centered modal_text">Please, read the <a href=https://room-house.com/Manual.html target=new>manual</a>!<br>a. Exit Chat? - Reload Window, Ctrl-R <br>b. Drop Video? - Double-click on Video\'s "name". <br>c. Mute/Unmute? - click on speaker icons.<br>d. Expand Video? - Ctrl+, use Picture in Picture, or swipe to zoom. Click on Video to possible full screen.<br>e. Any problems? - <span style="color:#009;text-decoration:underline;" onclick="var yon = window.confirm(\'OK?\');if (yon) {clearAllCookies();location.reload();};">Clear Cookies</span>.</div>'],
   ['ru', '<div class="centered modal_text">a. Выйти? - последняя кнопка в меню. <br>b. Убрать Video? - Кликнуть на "X" справа вверху квадрата. <br>c. Убрать звук от видео или микрофона: клик по иконке "звук" справа от имени.<br>d. Увеличить Video? - клик на видео, Ctrl+, Picture in Picture, swipe.<br>e. Проблемы? - <span style="color:#009;text-decoration:underline;" onclick="var yon = window.confirm(\'OK?\');if (yon) {clearAllCookies();location.reload();};">Clear Cookies</span>.</div>'],
   ['es', '<div class="centered modal_text">Please, read the <a href=https://room-house.com/Manual.html target=new>manual</a>!<br>a. ¿Salir del chat? - recargar, Ctrl-R <br> b. Soltar un video? - clic en "nombre" abajo del video. <br> c. Silenciar un video/su microphono - clic en el icono bajo derecho. <br> d. ¿Expandir un video? - use Picture in Picture, o deslice para acercar.<br>e. Algun problema irresistible? - <span style="color:#009;text-decoration:underline;" onclick="var yon = window.confirm(\'OK?\');if (yon) {clearAllCookies();location.reload();};">Clear Cookies</span>.</div>'],
   ['fr', '<div class="centered modal_text">Please, read the <a href=https://room-house.com/Manual.html target=new>manual</a>!<br>a. Quitter le chat ? - Rechargez, Ctrl-R <br>b. Déposer la vidéo ? - Cliquez sur "name". <br>c. Désactiver le son ? - clique sur la Speaker.<br>d. Agrandir la vidéo ? - Picture in Picture, ou faites glisser pour effectuer un zoom.<br>e. Quelques problemes? - <span style="color:#009;text-decoration:underline;" onclick="var yon = window.confirm(\'OK?\');if (yon) {clearAllCookies();location.reload();};">Clear Cookies</span>.</div>'],
   ['cn', '<div class="centered modal_text">Please, read the <a href=https://room-house.com/Manual.html target=new>manual</a>!<br>一個。退出聊天？ - 關閉窗口，Ctrl-R <br>b。殺死壞視頻？ - 單擊名稱旁邊的“”，或雙擊/點擊視頻。 <br>c.靜音/取消靜音？ - 單擊/點擊視頻。<br>d. 展開視頻？ - 在桌面上，使用畫中畫，在移動瀏覽器上 - 滑動以放大或縮小。<br>e.任何問題？- <span style="color:#009;text-decoration:underline;" onclick="var yon = window.confirm(\'OK?\');if (yon) {clearAllCookies();location.reload();};">Clear Cookies</span>.</div>'],
   ['pt', '<div class="centered modal_text">Please, read the <a href=https://room-house.com/Manual.html target=new>manual</a>!<br>a. Sair? - Recarregar Ctrl-R <br> b. Soltar um vídeo? - Clique no "name" ou cliqu duas vezes no vídeo. <br> c. Desativar o som? - clique no Speaker. <br> d. Expanda o vídeo? - use Picture in Picture, ou deslize para aumentar o zoom.<br>e. Algum problem? - <span style="color:#009;text-decoration:underline;" onclick="var yon = window.confirm(\'OK?\');if (yon) {clearAllCookies();location.reload();};">Clear Cookies</span>.</div>'],
]);

var left_content = new Map([
   ['en', 'Yes, now please say "Messi!" LOUDLY in microphone to redouble your vote. Thank you for voting! You may also write some words: <input type=text id=lsender_left value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod3.close();} else {this.placeholder = \'???\';}}">'],
   ['ru', 'Да, теперь, пожалуйста, скажи "Месси!" ГРОМКО в микрофон, чтобы подтвердить свой голос. Спасибо! <input type=text id=lsender_left value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod3.close();} else {this.placeholder = \'???\';}}">'],
   ['es', 'Sí, ahora por favor di "¡Messi!" VOZ ALTA en el micrófono para redoblar su voto. Gracias por votar! Tambien puedes escribir algo: <input type=text id=lsender_left value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod3.close();} else {this.placeholder = \'???\';}}">'],
   ['fr', "Oui, maintenant, s'il vous plaît, dites 'Messi!' FORT dans le micro pour confirmer votre vote. Merci d'avoir voté! You may also write some words: <input type=text id=rsender value='' onkeydown='var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod3.close();} else {this.placeholder = \'???\';}}'>"],
   ['cn', 'Yes, now please say "Messi!" LOUDLY in microphone to redouble your vote. Thank you for voting! You may also write some words: <input type=text id=lsender_left value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod3.close();} else {this.placeholder = \'???\';}}">'],   
   ['pt', 'Sim, agora por favor diga "Messi!" ALTO no microfone para confirmar seu voto. Obrigado por votar! You may also write some words: <input type=text id=lsender_left value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod3.close();} else {this.placeholder = \'???\';}}">'],
]);

var right_content = new Map([
   ['en', 'Yes, now please say "Ronaldo!" LOUDLY in microphone to redouble your vote. Thank you for voting! You may also write some words: <input type=text id=rsender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod4.close();} else {this.placeholder = \'???\';}}">'],
   ['ru','Да, теперь, пожалуйста, скажи "Роналдо!" ГРОМКО в микрофон, чтобы подтвердить свой голос. Спасибо! <input type=text id=rsender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod4.close();} else {this.placeholder = \'???\';}}">'],   
   ['es', 'Sí, ahora por favor di "¡Ronaldo!" VOZ ALTA en el micrófono para redoblar su voto. Gracias por votar! Tambien puedes escribir algo: <input type=text id=rsender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod4.close();} else {this.placeholder = \'???\';}}">'],
   ['fr', "Oui, maintenant, s'il vous plaît, dites 'Ronaldo!' FORT dans le micro pour confirmer votre vote. Merci d'avoir voté! You may also write some words: <input type=text id=rsender value='' onkeydown='var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod4.close();} else {this.placeholder = \'???\';}}'>"],
   ['cn', 'Yes, now please say "Ronaldo!" LOUDLY in microphone to redouble your vote. Thank you for voting! You may also write some words: <input type=text id=rsender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod4.close();} else {this.placeholder = \'???\';}}">'],
   ['pt', 'Sim, agora por favor diga "Ronaldo!" ALTO no microfone para confirmar seu voto. Obrigado por votar! You may also write some words: <input type=text id=rsender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value});mod4.close();} else {this.placeholder = \'???\';}}">'],
]);

var central_content = new Map([
   ['en', 'WRITE TO CHAT: <input type=text id=lsender_central value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value.replace(/\'/g, \'\')});mod5.close();document.body.style.background = \'#112\';cli5();} else {this.placeholder = \'???\';}}">'],
   ['ru', 'WRITE TO CHAT: <input type=text id=lsender_central value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value.replace(/\'/g, \'\')});mod5.close();document.body.style.background = \'#112\';cli5();} else {this.placeholder = \'???\';}}">'],
   ['es', 'WRITE TO CHAT: <input type=text id=lsender_central value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value.replace(/\'/g, \'\')});mod5.close();document.body.style.background = \'#112\';cli5();} else {this.placeholder = \'???\';}}">'],
   ['fr', 'WRITE TO CHAT: <input type=text id=lsender_central value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value.replace(/\'/g, \'\')});mod5.close();document.body.style.background = \'#112\';cli5();} else {this.placeholder = \'???\';}}">'],
   ['cn', 'WRITE TO CHAT: <input type=text id=lsender_central value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value.replace(/\'/g, \'\')});mod5.close();document.body.style.background = \'#112\';cli5();} else {this.placeholder = \'???\';}}">'],   
   ['pt', 'WRITE TO CHAT: <input type=text id=lsender_central value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'writeToLog\', text:this.value.replace(/\'/g, \'\')});mod5.close();document.body.style.background = \'#112\'; cli5();} else {this.placeholder = \'???\';}}">'],
]);

var anno_adder_content = new Map([
   ['en', 'SET ANNOTATION: <input type=text id=asender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; let tok = getCookie(\'authtoken\') || \'\'; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'setAnno\', anno:this.value.replace(/\'/g, \'\'), addr: who_to, token: tok});mod7.close();} else {this.placeholder = \'???\';}}">'],
   ['ru', 'КОММЕНТАРИЙ: <input type=text id=asender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; let tok = getCookie(\'authtoken\') || \'\'; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'setAnno\', anno:this.value.replace(/\'/g, \'\'), addr: who_to, token: tok});mod7.close();} else {this.placeholder = \'???\';}}">'],
   ['es', 'SET ANNOTATION: <input type=text id=asender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; let tok = getCookie(\'authtoken\') || \'\'; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'setAnno\', anno:this.value.replace(/\'/g, \'\'), addr: who_to, token: tok});mod7.close();} else {this.placeholder = \'???\';}}">'],
   ['fr', 'SET ANNOTATION: <input type=text id=asender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; let tok = getCookie(\'authtoken\') || \'\'; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'setAnno\', anno:this.value.replace(/\'/g, \'\'), addr: who_to, token: tok});mod7.close();} else {this.placeholder = \'???\';}}">'],
   ['cn', 'SET ANNOTATION: <input type=text id=asender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; let tok = getCookie(\'authtoken\') || \'\'; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'setAnno\', anno:this.value.replace(/\'/g, \'\'), addr: who_to, token: tok});mod7.close();} else {this.placeholder = \'???\';}}">'],   
   ['pt', 'SET ANNOTATION: <input type=text id=asender value="" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; let tok = getCookie(\'authtoken\') || \'\'; if (Ucode == 13) {if (this.value.length) {sendMessage({id : \'setAnno\', anno:this.value.replace(/\'/g, \'\'), addr: who_to, token: tok});mod7.close();} else {this.placeholder = \'???\';}}">'],
]);

var stream_adder_content = new Map([
   ['en', 'ADD STREAM: <input type=text id=lsender_stream value="https://master.nhkworld.jp/nhkworld-tv/playlist/live.m3u8" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {mod8.close();gifrid=this.value;gifr(this.value)} else {this.placeholder = \'???\';}}">'],
   ['ru', 'ADD STREAM: <input type=text id=lsender_stream value="https://master.nhkworld.jp/nhkworld-tv/playlist/live.m3u8" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {mod8.close();gifrid=this.value;gifr(this.value)} else {this.placeholder = \'???\';}}">'],
   ['es', 'ADD STREAM: <input type=text id=lsender_stream value="https://master.nhkworld.jp/nhkworld-tv/playlist/live.m3u8" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {mod8.close();gifrid=this.value;gifr(this.value)} else {this.placeholder = \'???\';}}">'],
   ['fr', 'ADD STREAM: <input type=text id=lsender_stream value="https://master.nhkworld.jp/nhkworld-tv/playlist/live.m3u8" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {mod8.close();gifrid=this.value;gifr(this.value)} else {this.placeholder = \'???\';}}">'],
   ['cn', 'ADD STREAM: <input type=text id=lsender_stream value="https://master.nhkworld.jp/nhkworld-tv/playlist/live.m3u8" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {mod8.close();gifrid=this.value;gifr(this.value)} else {this.placeholder = \'???\';}}">'],
   ['pt', 'ADD STREAM: <input type=text id=lsender_stream value="https://master.nhkworld.jp/nhkworld-tv/playlist/live.m3u8" onkeydown="var Ucode=event.keyCode? event.keyCode : event.charCode; if (Ucode == 13) {if (this.value.length) {mod8.close();gifrid=this.value;gifr(this.value)} else {this.placeholder = \'???\';}}">'],
]);

var left_label = new Map([
   ['en', 'for MESSI:'],
   ['ru','за Месси:'],   
   ['es', 'por MESSI:'],
   ['fr', 'pour MESSI:'],
   ['cn', 'for MESSI:'],
   ['pt', 'por MESSI:'],
]);

var right_label = new Map([
   ['en', 'for RONALDO:'],
   ['ru','за Роналдо:'],   
   ['es', 'por RONALDO:'],
   ['fr', 'pour RONALDO:'],
   ['cn', 'for RONALDO:'],
   ['pt', 'por RONALDO:'],
]);

var sorry_ = new Map([
   ['en', 'Sorry'],
   ['ru', 'Извините, никого нет.'],
   ['es', 'Lo siento'],
   ['fr', 'Désolé'],
   ['cn', 'Sorry'],
   ['pt', 'Desculpe'],
]);

var waiter_ = new Map([
   ['en', '..waiting..'],
   ['ru','..ожидание..'],
   ['es', '..esperando..'],
   ['fr', '..en attente..'],
   ['cn', '..waiting..'],
   ['pt', '..esperando..'],
]);

var caller_ = new Map ([
   ['en', 'CALL GURU '],
   ['ru','НАЖМИТЕ '],
   ['es', 'CALL GURU '],
   ['fr', 'CALL GURU '],
   ['cn', 'CALL GURU '],
   ['pt', 'CALL GURU '],
]);

var requ_ = new Map ([
   ['en', 'is requesting'],
   ['ru','в ожидании'],
   ['es', 'is requesting'],
   ['fr', 'is requesting'],
   ['cn', 'is requesting'],
   ['pt', 'is requesting'],
]);

var creatu_ = new Map ([
   ['en', 'NEED A TICKET!'],
   ['ru', 'НУЖЕН TICKET!'],
   ['es', 'NEED A TICKET!'],
   ['fr', 'NEED A TICKET!'],
   ['cn', 'NEED A TICKET!'],
   ['pt', 'NEED A TICKET!'],
]);

var creatu_long_ = new Map ([
   ['en', 'NEED a TICKET TO CINEMA!'],
   ['ru', 'ДЛЯ ПРОСМОТРА НУЖЕН БИЛЕТ!'],
   ['es', 'NEED a TICKET TO CINEMA!'],
   ['fr', 'NEED a TICKET TO CINEMA!'],
   ['cn', 'NEED a TICKET TO CINEMA!'],
   ['pt', 'NEED a TICKET TO CINEMA!'],
]);

var hea_ = new Map ([
   ['en', 'VIDEOCHAT WITHOUT REGISTER'],
   ['ru', 'ВИДЕОЧАТ БЕЗ РЕГИСТРАЦИИ'],
   ['es', 'VIDEOCHAT WITHOUT REGISTER'],
   ['fr', 'VIDEOCHAT WITHOUT REGISTER'],
   ['cn', 'VIDEOCHAT WITHOUT REGISTER'],
   ['pt', 'VIDEOCHAT WITHOUT REGISTER'],
]);

var today_ = new Map ([
   ['en', 'today guests'],
   ['ru', 'сегодня следов'],
   ['es', 'hoy huespedes'],
   ['fr', 'hotes de jour'],
   ['cn', 'today guests'],
   ['pt', 'hoje hospedes'],
]);

var now_ = new Map ([
   ['en', 'now'],
   ['ru', 'сейчас'],
   ['es', 'ahora'],
   ['fr', 'ici'],
   ['cn', 'now'],
   ['pt', 'agora'],
]);

var roo_ = new Map ([
   ['en', 'ROOM'],
   ['ru', 'КОМНАТА'],
   ['es', 'QUARTO'],
   ['fr', 'CHAMBRE'],
   ['cn', 'ROOM'],
   ['pt', 'QUARTO'],
]);

var buy_ = new Map ([
   ['en', '<a href="https://room-house.com/contact_en.html" style="color:#ff1493;">BUY IT!</a> for $75'],
   ['ru', '<a href="https://room-house.com/contact_ru.html" style="color:#ff1493;">КУПИТЬ!</a> за 4990 руб'],
   ['es', '<a href="https://room-house.com/contact_en.html" style="color:#ff1493;">BUY IT!</a> for 75 EURO'],
   ['fr', '<a href="https://room-house.com/contact_en.html" style="color:#ff1493;">BUY IT!</a> for 75 EURO'],
   ['cn', '<a href="https://room-house.com/contact_en.html" style="color:#ff1493;">BUY IT!</a> for 500CNY'],
   ['pt', '<a href="https://room-house.com/contact_en.html" style="color:#ff1493;">BUY IT!</a> for 75 EURO'],
]);

var go_ = new Map ([
   ['en', 'go to room '],
   ['ru', 'перейти в '],
   ['es', 'pasar a '],
   ['fr', 'aller a '],
   ['cn', 'go to room '],
   ['pt', 'pasar a '],
]);

var he_ = new Map ([
   ['en', 'HELP'],
   ['ru', 'ПОМОЩЬ'],
   ['es', 'AYUDA'],
   ['fr', 'HELP'],
   ['cn', 'HELP'],
   ['pt', 'AJUDA'],
]);

var lo_ = new Map ([
   ['en', 'This door is locked now.<br>Please use password to enter.'],
   ['ru', 'Эта дверь сейчас закрыта.<br>Пожалуйста, используйте ПАРОЛЬ для входа.'],
   ['es', 'La puerta esta cerrada ahora.<br>Usa su contrasena por favor.'],
   ['fr', 'La porte est fermee maintenent.<br>Utilise votre mot de passe.'],
   ['cn', 'This door is locked now.<br>Please use password to enter.'],
   ['pt', 'This door is locked now.<br>Please use password to enter.'],
]);

var du_ = new Map ([
   ['en', 'CLICK MENU TO ACTIVATE CAMERA!'],
   ['ru', 'КЛИКНИТЕ МЕНЮ ДЛЯ ВКЛЮЧЕНИЯ КАМЕРЫ!'],
   ['es', 'CLICK MENU TO ACTIVATE CAMERA!'],
   ['fr', 'CLICK MENU TO ACTIVATE CAMERA!'],
   ['cn', 'CLICK MENU TO ACTIVATE CAMERA!'],
   ['pt', 'CLICK MENU TO ACTIVATE CAMERA!'],
]);

var du2_ = new Map ([
   ['en', '..THEN CLICK &rarr;<br>TO ADD COMMENT!<div class="adders" style="opacity:0.7;font-size:18px;">A</div>'],
   ['ru', '..ПОТОМ НАЖМИТЕ &rarr;<br>на КРУЖОК "A"<br>И ДОБАВЬТЕ КОММЕНТ<div class="adders" style="opacity:0.7;font-size:18px;">A</div>'],
   ['es', '..THEN CLICK &rarr;<br>TO ADD COMMENT!<div class="adders" style="opacity:0.7;font-size:18px;">A</div>'],
   ['fr', '..THEN CLICK &rarr;<br>TO ADD COMMENT!<div class="adders" style="opacity:0.7;font-size:18px;">A</div>'],
   ['cn', '..THEN CLICK &rarr;<br>TO ADD COMMENT!<div class="adders" style="opacity:0.7;font-size:18px;">A</div>'],
   ['pt', '..THEN CLICK &rarr;<br>TO ADD COMMENT!<div class="adders" style="opacity:0.7;font-size:18px;">A</div>'],
]);
