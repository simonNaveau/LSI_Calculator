
	//Author: NAVEAU Simon, simon.navo@gmail.com
	////////////////////////////////////////////If you have a value to change it's here//////////////////////////////////////////
	//Course price
	var lesson_price_summer= new Array(); //Lesson price list for summer
	lesson_price_summer["None"]=0;
	lesson_price_summer["GE"]=295;
	lesson_price_summer["IELTS"]=295;
	lesson_price_summer["B2"]=295;
	lesson_price_summer["C1"]=295;
	lesson_price_summer["C2"]=295;

	var lesson_price_non_summer= new Array(); //Lesson price list for non summer
	lesson_price_non_summer["None"]=0;
	lesson_price_non_summer["GE"]=270;
	lesson_price_non_summer["IELTS"]=270;
	lesson_price_non_summer["B2"]=270;
	lesson_price_non_summer["C1"]=270;
	lesson_price_non_summer["C2"]=270;

	//Accommodation price
	var accommo_price_summer= new Array(); //accommodation price list for summer
	accommo_price_summer["None"]=0;
	accommo_price_summer["Homestay"]=165;
	accommo_price_summer["Full-En"]=175;
	accommo_price_summer["Superior"]=165;

	var accommo_price_non_summer= new Array(); //accommodation price list for non summer
	accommo_price_non_summer["None"]=0;
	accommo_price_non_summer["Homestay"]=155;
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

	var exam_Fee = new Array();
	exam_Fee["B2"] = 155;
	exam_Fee["C1"] = 160;
	exam_Fee["C2"] = 165;

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
	var normalLessonsPrice = 0;
	var summerLessonsPrice = 0;
	var normalAccommodationPrice = 0;
	var summerAccommodationPrice = 0;

	var optionPrice = 0;
	var totalToPrint = 0;
	var examOption = 0;
	var statusExam = false;

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
		totalToPrint = 80+(summerWeeksNumber*summerLessonsPrice)+(normalWeeksNumber*normalLessonsPrice)+(summerWeeksNumber*summerAccommodationPrice)+(normalWeeksNumber*normalAccommodationPrice)+optionPrice+examOption;
	    document.getElementById('totalPrice').innerHTML = "Total: £"+totalToPrint; //Change the value printed in the view
	}
	
	function setLesson(){
		var selectedLesson = theForm.elements["lesson"];
		summerLessonsPrice = lesson_price_summer[selectedLesson.value];
		normalLessonsPrice = lesson_price_non_summer[selectedLesson.value];
		if(theForm.elements["lesson"].value === "B2" || theForm.elements["lesson"].value === "C1" || theForm.elements["lesson"].value === "C2"){
			document.getElementById('examView').hidden = false
			document.getElementById('examLabel').innerHTML = "Cambridge Exam (£"+exam_Fee[theForm.elements["lesson"].value]+")";
			statusExam = false
			setExamOption()
		} else {
			document.getElementById('examView').hidden = true
			document.getElementById('examFee').innerHTML = "";
			theForm.elements["exam"].checked = false
			statusExam = false
			examOption = 0
		}
		if(theForm.elements["lesson"].value !== "None" ){
			document.getElementById("datesView").hidden = false
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
			computeTotal()
			var price = (summerWeeksNumber*summerLessonsPrice)+(normalWeeksNumber*normalLessonsPrice);
			document.getElementById('lessonReview').innerHTML = "- Course : £"+price;
			console.log("- Course: £"+price+" ("+summerWeeksNumber+" x £"+summerLessonsPrice+") + ("+normalWeeksNumber+" x £"+normalLessonsPrice+")")
			var value = (summerWeeksNumber*summerAccommodationPrice)+(normalWeeksNumber*normalAccommodationPrice);
			if(value > 0){
				document.getElementById('accomodationReview').innerHTML = "- Accommodation: £"+value;
				console.log("- Accommodation: £"+value+" ("+summerWeeksNumber+" x £"+summerAccommodationPrice+") + ("+normalWeeksNumber+" x £"+normalAccommodationPrice+")")
			} 
		}
		else{
			document.getElementById('lessonReview').innerHTML = "";
			document.getElementById('accomodationReview').innerHTML = "";
		}
		document.getElementById("accommodationView").hidden = false
	}

	function setExamOption(){
		if(theForm.elements["exam"].checked){
			if(!statusExam){
				examOption = parseInt(exam_Fee[theForm.elements["lesson"].value]);
				document.getElementById('examFee').innerHTML = "- Cambridge Exam Fees: £"+examOption;
			}
		}
		else{
			if(statusExam){
				examOption = 0
				document.getElementById('examFee').innerHTML = "";
			}
		}
		statusExam = theForm.elements["exam"].checked
		computeTotal()
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

	function getNextMonday(d){
		var ret = new Date(d.toString())

		while(!(ret.toString().substring(0,3) === "Mon")){
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