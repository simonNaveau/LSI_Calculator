
	//Author: NAVEAU Simon, simon.navo@gmail.com
	////////////////////////////////////////////If you have a value to change it's here//////////////////////////////////////////
	//Course price
	var lesson_price= new Array(); //Lesson price list for summer
	lesson_price["None"]=0;
	lesson_price["EC"]=1245;
	lesson_price["ECP"]=1545;
	lesson_price["AD"]=1500;
	lesson_price["ADSI"]=900;
	lesson_price["ADI"]=1200;
	lesson_price["ADIP"]=1800;
	lesson_price["OG"]=995;
	lesson_price["CG"]=2400;
	lesson_price["CGSI"]=1440;
	lesson_price["CGI"]=1920;
	lesson_price["CGIP"]=2880;
	lesson_price["PGFD"]=2270;
	lesson_price["PGIP"]=1840;
	lesson_price["PGG"]=1860;

	//Accommodation price
	var accommo_price_summer= new Array(); //accommodation price list for summer
	accommo_price_summer["None"]=0;
	accommo_price_summer["Homestay"]=250;
	accommo_price_summer["Full-En"]=175;
	accommo_price_summer["Superior"]=165;

	var accommo_price_non_summer= new Array(); //accommodation price list for non summer
	accommo_price_non_summer["None"]=0;
	accommo_price_non_summer["Homestay"]=250;
	accommo_price_non_summer["Full-En"]=165;
	accommo_price_non_summer["Superior"]=155;

	//Taxi transfert price 
	var taxi_transfert_arrival= new Array(); //Lesson price list for summer
	taxi_transfert_arrival["None"]=0;
	taxi_transfert_arrival["HG"]=135;
	taxi_transfert_arrival["SE"]=70;
	taxi_transfert_arrival["L"]=160;
	taxi_transfert_arrival["S"]=180;
	
	var taxi_transfert_departure= new Array(); //Lesson price list for summer
	taxi_transfert_departure["None"]=0;
	taxi_transfert_departure["HG"]=85;
	taxi_transfert_departure["SE"]=60;
	taxi_transfert_departure["L"]=160;
	taxi_transfert_departure["S"]=180;

	var taxi_transfert_both= new Array(); //Lesson price list for summer
	taxi_transfert_both["None"]=0;
	taxi_transfert_both["HG"]=210;
	taxi_transfert_both["SE"]=120;
	taxi_transfert_both["L"]=300;
	taxi_transfert_both["S"]=350;

	var theForm = document.forms["mainForm"];
	setCalendar();
	var startDate = 0;
	var endDate = 0;
	var summerStartDate = new Date("2019-06-10T00:00:00Z") //Change this to set a new starting date for summer price 
	var summerEndDate = new Date("2019-08-30T00:00:00Z") //Change this to set a new ending date for summer price 
	summerStartDate.setHours(00,00,00)
	summerEndDate.setHours(00,00,00)

	var normalWeeksNumber = 0;
	var summerWeeksNumber = 0;
	var lessonsPrice = 0;
	var normalAccommodationPrice = 0;
	var summerAccommodationPrice = 0;

	var optionPrice = 0;
	var totalToPrint = 0;
	var lunchOption = 0;
	var ExtraHour = 0;
	var wkOption = 0;

/////////////////////////////////////////////////////Computing part //////////////////////////////////////////////////////////
	function setCalendar(){
		var today = new Date();
		if(!(today.toString().substring(0,3) === "Mon")){
			today = getNextMonday(today)
		}
		var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			var formatDate = yyyy + '-' + mm + '-' + dd ;
			theForm.elements["startingDate"].min = formatDate //Disable choice of the date before
			today = getNextFriday(today)

			dd = String(today.getDate()).padStart(2, '0');
			mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			yyyy = today.getFullYear();
			formatDate = yyyy + '-' + mm + '-' + dd ;
			theForm.elements["endingDate"].min = formatDate //Disable choice of the date before
	}

	function computeTotal(){
		totalToPrint = 80+((summerWeeksNumber+normalWeeksNumber)*lessonsPrice)+(summerWeeksNumber*summerAccommodationPrice)+(normalWeeksNumber*normalAccommodationPrice)+optionPrice+((summerWeeksNumber+normalWeeksNumber)*lunchOption)+ExtraHour+wkOption;
	    document.getElementById('totalPrice').innerHTML = "Total: £"+totalToPrint; //Change the value printed in the view
	}
	
	function setLesson(){
		var selectedLesson = theForm.elements["lesson"];
		lessonsPrice = lesson_price[selectedLesson.value];
		if(theForm.elements["lesson"].value !== "None" ){
			document.getElementById("datesView").hidden = false
			if(normalWeeksNumber > 0 || summerWeeksNumber > 0){
				computeTotal()
				var price = (summerWeeksNumber+normalWeeksNumber)*lessonsPrice;
				document.getElementById('lessonReview').innerHTML = "- Course : £"+price;
				console.log("- Course: £"+price+" ("+(summerWeeksNumber+normalWeeksNumber)+" x £"+lessonsPrice+")")
			}
			else{
				document.getElementById('lessonReview').innerHTML = "";
			}
		} else {
			document.getElementById('lessonReview').innerHTML = "";


		}
		computeTotal();
	}

	function setTaxiExtra(){
		switch(theForm.elements["airport"].value) {
			case "HG":
			document.getElementById('arrival').disabled = false
			document.getElementById('arrivalLabel').innerHTML = "On arrival (£"+taxi_transfert_arrival[theForm.elements["airport"].value]+")";
			document.getElementById('departure').disabled = false
			document.getElementById('departureLabel').innerHTML = "On departure (£"+taxi_transfert_departure[theForm.elements["airport"].value]+")";
			document.getElementById('both').disabled = false
			document.getElementById('bothLabel').innerHTML = "On arrival and departure (£"+taxi_transfert_both[theForm.elements["airport"].value]+")";
			break;
			case "SE":
			document.getElementById('arrival').disabled = false
			document.getElementById('arrivalLabel').innerHTML = "On arrival (£"+taxi_transfert_arrival[theForm.elements["airport"].value]+")";
			document.getElementById('departure').disabled = false
			document.getElementById('departureLabel').innerHTML = "On departure (£"+taxi_transfert_departure[theForm.elements["airport"].value]+")";
			document.getElementById('both').disabled = false
			document.getElementById('bothLabel').innerHTML = "On arrival and departure (£"+taxi_transfert_both[theForm.elements["airport"].value]+")";
			break;
			case "S":
			document.getElementById('arrival').disabled = false
			document.getElementById('arrivalLabel').innerHTML = "On arrival (£"+taxi_transfert_arrival[theForm.elements["airport"].value]+")";
			document.getElementById('departure').disabled = false
			document.getElementById('departureLabel').innerHTML = "On departure (£"+taxi_transfert_departure[theForm.elements["airport"].value]+")";
			document.getElementById('both').disabled = false
			document.getElementById('bothLabel').innerHTML = "On arrival and departure (£"+taxi_transfert_both[theForm.elements["airport"].value]+")";
			break;
			case "L":
			document.getElementById('arrival').disabled = false
			document.getElementById('arrivalLabel').innerHTML = "On arrival (£"+taxi_transfert_arrival[theForm.elements["airport"].value]+")";
			document.getElementById('departure').disabled = false
			document.getElementById('departureLabel').innerHTML = "On departure (£"+taxi_transfert_departure[theForm.elements["airport"].value]+")";
			document.getElementById('both').disabled = false
			document.getElementById('bothLabel').innerHTML = "On arrival and departure (£"+taxi_transfert_both[theForm.elements["airport"].value]+")";
			break;
			default:
			optionPrice = 0
			document.getElementById('arrivalLabel').innerHTML = "On arrival";
			document.getElementById('departureLabel').innerHTML = "On departure";
			document.getElementById('bothLabel').innerHTML = "On arrival and departure";
			document.getElementById('extraReview').innerHTML = "";
			document.getElementById('arrival').disabled = true
			document.getElementById('departure').disabled = true
			document.getElementById('both').disabled = true
			document.getElementById('arrival').checked = false
			document.getElementById('departure').checked = false
			document.getElementById('both').checked = false
		}
		computeTaxiExtra()
	}

	function setupLunchOption(){
		if(theForm.elements["lunchOption"].checked){
			lunchOption = 100
			document.getElementById('lunchOptionReview').innerHTML = "- Trainer-accompanied lunch: £"+((summerWeeksNumber+normalWeeksNumber)*lunchOption);
		} else {
			lunchOption = 0
			document.getElementById('lunchOptionReview').innerHTML = "";
		}
		computeTotal()
	}

	function computeTaxiExtra(){
		if(theForm.elements["arrival"].checked){
			optionPrice = taxi_transfert_arrival[theForm.elements["airport"].value]
			document.getElementById('extraReview').innerHTML = "- Taxi: £"+optionPrice;
		}
		if(theForm.elements["departure"].checked){
			optionPrice = taxi_transfert_departure[theForm.elements["airport"].value]
			document.getElementById('extraReview').innerHTML = "- Taxi: £"+optionPrice;
		}
		if(theForm.elements["both"].checked){
			optionPrice = taxi_transfert_both[theForm.elements["airport"].value]
			document.getElementById('extraReview').innerHTML = "- Taxi: £"+optionPrice;
		}
		computeTotal()
	}

	function setAccommodation(){
		var selectedAcco = theForm.elements["accomodation"];
		summerAccommodationPrice = accommo_price_summer[selectedAcco.value];
		normalAccommodationPrice = accommo_price_non_summer[selectedAcco.value];
		if(theForm.elements["accomodation"].value !== "None"){
			document.getElementById("optionForm").hidden = false
			if(normalWeeksNumber > 0 || summerWeeksNumber > 0){
				var value = (summerWeeksNumber*summerAccommodationPrice)+(normalWeeksNumber*normalAccommodationPrice);
				document.getElementById('accomodationReview').innerHTML = "- Accommodation: £"+value;
				console.log("- Accommodation: £"+value+" ("+summerWeeksNumber+" x £"+summerAccommodationPrice+") + ("+normalWeeksNumber+" x £"+normalAccommodationPrice+")")
			} 
		}else{
			document.getElementById('accomodationReview').innerHTML = "";
		}
		computeTotal();
	}

	function setWeeks(){

		start = getPreviousMonday(startDate)
		end = getNextSaturday(endDate)

		if(start>=summerStartDate && end<=summerEndDate){
			summerWeeksNumber = weeksBetween(start, end)
		} else if(start>=summerStartDate && start<summerEndDate && end>=summerEndDate){
			summerWeeksNumber = weeksBetween(start, summerEndDate)
			normalWeeksNumber = weeksBetween(summerEndDate, end)
		} else if(start<=summerStartDate && end>summerStartDate && end<=summerEndDate){
			normalWeeksNumber = weeksBetween(start, summerStartDate)
			summerWeeksNumber = weeksBetween(summerStartDate, end)
		} else if(start<=summerStartDate && end<summerStartDate){
			normalWeeksNumber = weeksBetween(start, end)
			summerWeeksNumber = 0
		} else if(start>summerEndDate && end>summerEndDate){
			normalWeeksNumber = weeksBetween(start, end)
			summerWeeksNumber = 0
		} else if(start<summerStartDate && end>summerEndDate){
			normalWeeksNumber = weeksBetween(start, summerStartDate) + weeksBetween(end, summerEndDate)
			summerWeeksNumber = weeksBetween(summerStartDate, summerEndDate)
		}

		if(normalWeeksNumber > 0 || summerWeeksNumber > 0){
			setupLunchOption()
			computeTotal()
			document.getElementById('lunchOptionView').hidden = false;
			var price = (summerWeeksNumber+normalWeeksNumber)*lessonsPrice;
			document.getElementById('lessonReview').innerHTML = "- Course : £"+price;
			console.log("- Course: £"+price+" ("+(summerWeeksNumber+normalWeeksNumber)+" x £"+lessonsPrice+")")
			var value = (summerWeeksNumber*summerAccommodationPrice)+(normalWeeksNumber*normalAccommodationPrice);
			if(value > 0){
				document.getElementById('accomodationReview').innerHTML = "- Accommodation: £"+value;
				console.log("- Accommodation: £"+value+" ("+summerWeeksNumber+" x £"+summerAccommodationPrice+") + ("+normalWeeksNumber+" x £"+normalAccommodationPrice+")")
			} 
		}
		else{
			document.getElementById('lessonReview').innerHTML = "";
			document.getElementById('accomodationReview').innerHTML = "";
			document.getElementById('lunchOptionReview').innerHTML = "";
			lunchOption = 0;
			document.getElementById('lunchOptionView').checked = false;
			document.getElementById('lunchOptionView').hidden = true;
		}
		document.getElementById("accommodationView").hidden = false
	}

	function setStartDate(){
		startDate = theForm.elements["startingDate"].value
		var test = new Date(startDate)
		if(test.toString().substring(0,3) !== "Mon"){
			test = getPreviousMonday(test);
			startDate = dateTransform(test)
			theForm.elements["startingDate"].value = startDate
		}
		theForm.elements["endingDate"].min = startDate
		var res = startDate.split("-");
		var dateString = res[1]+"/"+res[2]+"/"+res[0]
		startDate = new Date(dateString);
		var check = new Date();
		check.setFullYear(check.getFullYear()+25);
		if(startDate > check){
			theForm.elements["startingDate"].value = "dd/mm/yyyy"
		} 
		var endMin = dateTransform(getNextFriday(startDate))
		theForm.elements["endingDate"].min = endMin

		if(endDate != 0){
			setWeeks()
		}
	}

	function setEndDate(){
		endDate = theForm.elements["endingDate"].value
		var test = new Date(endDate)
		if(test.toString().substring(0,3) === "Sat"){
			test = getPreviousFriday(test);
			endDate = dateTransform(test)
			theForm.elements["endingDate"].value = endDate
		}
		if(test.toString().substring(0,3) !== "Fri"){
			test = getNextFriday(test);
			endDate = dateTransform(test)
			theForm.elements["endingDate"].value = endDate
		}
		theForm.elements["startingDate"].max = endDate
		var res = endDate.split("-");
		var dateString = res[1]+"/"+res[2]+"/"+res[0]
		endDate = new Date(dateString);
		var check = new Date();
		check.setFullYear(check.getFullYear()+25);
		if(startDate > check){
			theForm.elements["endingDate"].value = "dd/mm/yyyy"
		} 
		var startMax = dateTransform(getPreviousMonday(endDate))
		theForm.elements["startingDate"].max = startMax

		if(startDate != 0){
			setWeeks()
		}
	}

	function getNextSaturday(d){
		var ret = new Date(d.toString())

		while(!(ret.toString().substring(0,3) === "Sat")){
			ret.setDate(ret.getDate()+1)
		}
		return ret
	}

	function getNextFriday(d){
		var ret = new Date(d.toString())

		while(!(ret.toString().substring(0,3) === "Fri")){
			ret.setDate(ret.getDate()+1)
		}
		return ret
	}

	function getPreviousFriday(d){
		var ret = new Date(d.toString())

		while(!(ret.toString().substring(0,3) === "Fri")){
			ret.setDate(ret.getDate()-1)
		}
		return ret
	}

	function getNextMonday(d){
		var ret = new Date(d.toString())

		while(!(ret.toString().substring(0,3) === "Mon")){
			ret.setDate(ret.getDate()+1)
		}
		return ret
	}

	function getPreviousMonday(d){
		var ret = new Date(d.toString())
		
		while(!(ret.toString().substring(0,3) === "Mon")){
			ret.setDate(ret.getDate()-1)
		}
		return ret
	}

	function dateTransform(d){
		var dd = String(d.getDate()).padStart(2, '0');
		var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = d.getFullYear();
		return (yyyy + '-' + mm + '-' + dd);
	}

	function weeksBetween(dt1, dt2){
		var diff =(dt2.getTime() - dt1.getTime()) / 1000;
		diff /= (60 * 60 * 24 * 7);
		return Math.abs(Math.round(diff));
	}