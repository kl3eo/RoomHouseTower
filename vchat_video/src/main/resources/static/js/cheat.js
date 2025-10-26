GURU:Lars_bduaefqecine


		let f = 'GURU:Lars_bduaefqecine';
		let s = 'c';
		let t = '';
		let ac = '';
		let a = '';
		

			//prepare logics in advance
			let pctr = pcounter +1;
			if (pctr < room_limit && role == 0) {document.id('bell').style.display = 'none'; document.id('av_toggler').style.display='block';}
			if (pctr > room_limit - 1 && role == 0) {document.id('bell').style.display = 'block'; document.id('av_toggler').style.display='none';}

			if (!small_device) resizer(pctr);
	    
			
			receiveVideo(f, s, role, false);
			let coo_volume = loadData(f+'_volume');
			
			document.id('slider_' + f).value = coo_volume;
			document.id('video-' + f).volume = coo_volume;
			
			(function() {document.id(f).style.display='block'; document.id(f).fade(1);}).delay(500);


		

