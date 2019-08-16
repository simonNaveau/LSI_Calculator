//Author: NAVEAU Simon, simon.navo@gmail.com
////////////////////////////////////////////If you have a value to change it's here//////////////////////////////////////////

var lesson_prices = {
	"2019": {"None": {"summer": 0, "normal": 0},
	"GE": {"summer": 295, "normal": 270},
	"IELTS": {"summer": 295, "normal": 270},
	"B2": {"summer": 295, "normal": 270},
	"C1": {"summer": 295, "normal": 270},
	"C2": {"summer": 295, "normal": 270}},

	"2020": {"None": {"summer": 0, "normal": 0},
	"GE": {"summer": 300, "normal": 250},
	"IELTS": {"summer": 300, "normal": 250},
	"B2": {"summer": 300, "normal": 250},
	"C1": {"summer": 300, "normal": 250},
	"C2": {"summer": 300, "normal": 250}}
};

var accommodation_prices = {
	"2019": {"None": {"summer": 0, "normal": 0},
	"Homestay": {"summer": 165, "normal": 155},
	"Full-En": {"summer": 175, "normal": 165},
	"Superior": {"summer": 165, "normal": 155}},

	"2020": {"None": {"summer": 0, "normal": 0},
	"Homestay": {"summer": 200, "normal": 120},
	"Full-En": {"summer": 200, "normal": 150},
	"Superior": {"summer": 300, "normal": 200}}
};

var summerDates = {
	"2019": {"start": new Date("2019-06-10T00:00:00Z"), "end":new Date("2019-08-30T00:00:00Z")},
	"2020": {"start": new Date("2020-06-08T00:00:00Z"), "end":new Date("2020-09-01T00:00:00Z")}
};
for (var key in summerDates) {
	summerDates[key]["start"].setHours(00,00,00)
	summerDates[key]["end"].setHours(00,00,00)
}

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

var fixedFees = 80;
document.getElementById('totalPrice').innerHTML = "Total: £"+fixedFees; //Change the value printed in the view
document.getElementById('fee').innerHTML = "- Registration fee: £"+fixedFees; //Change the value printed in the view

var theForm = document.forms["mainForm"];
setCalendar();
var startDate = 0;
var endDate = 0;
var accommodationTotal = 0;
var lessonTotal = 0;
var theLessons = "None";
var theAccomodation = "None";
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

function computeAccommodation(s, e){
	var ret = 0
	var startingYear = s.getFullYear();
	var endingYear = e.getFullYear();
	if(startingYear != endingYear){
		var tmpDate = new Date(startingYear, 11, 31, 10, 00, 00);
		var tmp = setWeeks(s, tmpDate);

		var usableYear = startingYear
		while((typeof accommodation_prices[usableYear] )=== 'undefined'){
			usableYear -= 1;
		}
		ret += tmp["sum"]*accommodation_prices[usableYear][theAccomodation]["summer"];
		ret += tmp["norm"]*accommodation_prices[usableYear][theAccomodation]["normal"];

		for (var i = startingYear+1; i <= endingYear; i++) {
			if(i != endingYear){
				var tmpDate1 = new Date(i, 00, 01, 00, 00, 00);
				var tmpDate2 = new Date(i, 11, 31, 00, 00, 00);
				tmp = setWeeks(tmpDate1, tmpDate2);
				usableYear = i
				while((typeof accommodation_prices[usableYear]) === 'undefined'){
					usableYear -= 1;
				}
				ret += tmp["sum"]*accommodation_prices[usableYear][theAccomodation]["summer"];
				ret += tmp["norm"]*accommodation_prices[usableYear][theAccomodation]["normal"];
			} else {
				var tmpDate3 = new Date(endingYear, 00, 01, 00, 00, 00);
				var tmp = setWeeks(tmpDate3, e);
				usableYear = endingYear
				while((typeof accommodation_prices[usableYear]) === 'undefined'){
					usableYear -= 1;
				}
				ret += tmp["sum"]*accommodation_prices[usableYear][theAccomodation]["summer"];
				ret += tmp["norm"]*accommodation_prices[usableYear][theAccomodation]["normal"];
			} 
		}
	} else {
		var res = setWeeks(startDate, endDate);
		while((typeof accommodation_prices[startingYear]) === 'undefined'){
			startingYear -= 1;
		}
		ret += res["sum"]*accommodation_prices[startingYear][theAccomodation]["summer"];
		ret += res["norm"]*accommodation_prices[startingYear][theAccomodation]["normal"];
	}
	return ret
}

function computeLesson(s, e){
	var ret = 0
	var startingYear = s.getFullYear();
	var endingYear = e.getFullYear();
	if(startingYear != endingYear){
		var tmpDate = new Date(startingYear, 11, 31, 10, 00, 00);
		var tmp = setWeeks(s, tmpDate);

		var usableYear = startingYear
		while((typeof lesson_prices[usableYear] )=== 'undefined'){
			usableYear -= 1;
		}
		ret += tmp["sum"]*lesson_prices[usableYear][theLessons]["summer"];
		ret += tmp["norm"]*lesson_prices[usableYear][theLessons]["normal"];

		for (var i = startingYear+1; i <= endingYear; i++) {
			if(i != endingYear){
				var tmpDate1 = new Date(i, 00, 01, 00, 00, 00);
				var tmpDate2 = new Date(i, 11, 31, 00, 00, 00);
				tmp = setWeeks(tmpDate1, tmpDate2);
				usableYear = i
				while((typeof lesson_prices[usableYear]) === 'undefined'){
					usableYear -= 1;
				}
				ret += tmp["sum"]*lesson_prices[usableYear][theLessons]["summer"];
				ret += tmp["norm"]*lesson_prices[usableYear][theLessons]["normal"];
			} else {
				var tmpDate3 = new Date(endingYear, 00, 01, 00, 00, 00);
				var tmp = setWeeks(tmpDate3, e);
				usableYear = endingYear
				while((typeof lesson_prices[usableYear]) === 'undefined'){
					usableYear -= 1;
				}
				ret += tmp["sum"]*lesson_prices[usableYear][theLessons]["summer"];
				ret += tmp["norm"]*lesson_prices[usableYear][theLessons]["normal"];
			} 
		}
	} else {
		var res = setWeeks(startDate, endDate);
		while((typeof lesson_prices[startingYear]) === 'undefined'){
			startingYear -= 1;
		}
		console.log(theLessons)
		ret += res["sum"]*lesson_prices[startingYear][theLessons]["summer"];
		ret += res["norm"]*lesson_prices[startingYear][theLessons]["normal"];
	}
	return ret
}

function computeTotal(){
	totalToPrint = fixedFees+optionPrice+examOption;
	if(startDate != 0 && endDate != 0 && theAccomodation !== "None") accommodationTotal = computeAccommodation(startDate, endDate);
	if(accommodationTotal != 0){
		document.getElementById('lessonReview').innerHTML = "- Lessons: £"+accommodationTotal;
	} else {
		document.getElementById('lessonReview').innerHTML = "";
	}

	if(startDate != 0 && endDate != 0 && theLessons !== "None") lessonTotal = computeLesson(startDate, endDate);
	if(lessonTotal != 0){
		document.getElementById('lessonReview').innerHTML = "- Lessons: £"+lessonTotal;
	} else {
		document.getElementById('lessonReview').innerHTML = "";
	}
	totalToPrint += lessonTotal+lessonTotal;
	document.getElementById('totalPrice').innerHTML = "Total: £"+totalToPrint; //Change the value printed in the view
}

function setLesson(){
	var selectedLesson = theForm.elements["lesson"].value;
	theLessons = theForm.elements["lesson"].value

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
	var selectedAcco = theForm.elements["accomodation"].value;
	theAccomodation = theForm.elements["accomodation"].value;
	if(theForm.elements["accomodation"].value !== "None"){
		document.getElementById("optionForm").hidden = false
	}else{
		document.getElementById('accomodationReview').innerHTML = "";
	}
	computeTotal();
}

function setWeeks(starting, ending){

	var tmpStart = getPreviousMonday(starting)
	var tmpEnd = getNextSaturday(ending)
	var sum = 0;
	var norm = 0;

	if((typeof summerDates[ending.getFullYear()] )!== 'undefined') {
		var tmpSummerStart = summerDates[starting.getFullYear()]["start"];
		var tmpSummerEnd = summerDates[ending.getFullYear()]["end"];
		if(tmpStart>= tmpSummerStart && tmpEnd<=tmpSummerEnd){
			sum = weeksBetween(tmpStart, tmpEnd)
		} else if(tmpStart>=tmpSummerStart && tmpStart<tmpSummerEnd && tmpEnd>=tmpSummerEnd){
			sum = weeksBetween(tmpStart, tmpSummerEnd)
			norm = weeksBetween(tmpSummerEnd, tmpEnd)
		} else if(tmpStart<=tmpSummerStart && tmpEnd>tmpSummerStart && tmpEnd<=tmpSummerEnd){
			norm = weeksBetween(tmpStart, tmpSummerStart)
			sum = weeksBetween(tmpSummerStart, tmpEnd)
		} else if(tmpStart<=tmpSummerStart && tmpEnd<tmpSummerStart){
			norm = weeksBetween(tmpStart, tmpEnd)
			sum = 0
		} else if(tmpStart>tmpSummerEnd && tmpEnd>tmpSummerEnd){
			norm = weeksBetween(tmpStart, tmpEnd)
			sum = 0
		} else if(tmpStart<tmpSummerStart && tmpEnd>tmpSummerEnd){
			norm = weeksBetween(tmpStart, tmpSummerStart) + weeksBetween(tmpEnd, tmpSummerEnd)
			sum = weeksBetween(tmpSummerStart, tmpSummerEnd)
		}
	} else {
		norm = weeksBetween(tmpStart, tmpEnd)
	}
	return {"sum": sum, "norm": norm}
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
		document.getElementById("accommodationView").hidden = false
		computeTotal()
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
		document.getElementById("accommodationView").hidden = false
		computeTotal()
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