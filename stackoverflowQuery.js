function loadAPIResponse()
{
	var apiCall
	var xmlhttp;
	var response
	
	var questionsArray;
	var myDate;
	var myEpoch;
	var myYear;
	var myMonth;
	var myDay;

	var epochDate;
	var myDate;
	var humanDate;
  
	xmlhttp=new XMLHttpRequest();
	  
	xmlhttp.onreadystatechange=function() {
		var question = score = createDate = title = noAnswers = null;
		
		  if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			response = JSON.parse(xmlhttp.responseText);
			
			//parse results and put in array
			questionsArray = new Array();
			for (var i = 0; i < response.items.length; i++) {
			    var question = new Object();			
				question.question_id = response.items[i].question_id;
				question.score = response.items[i].score;
				question.createDate = response.items[i].creation_date;
				question.title = response.items[i].title;
				question.noAnswers = response.items[i].answer_count;
				questionsArray[i] = question;
			}	
				
			//Output results to myDiv
			var monthToInt = parseInt(document.getElementById("month").value);
			monthToInt++;
			document.getElementById('myDiv').innerHTML = "<h3>Questions posted since " +monthToInt +"/"
			+document.getElementById("day").value +"/" +document.getElementById("year").value +"</h3><br>";
			for (var j = 0; j < 10; j++) {
				document.getElementById('myDiv').innerHTML += "<ul><li>votes: "	+ questionsArray[j].score
				+ "</li><li>asked date: " + epochToHumanDate(questionsArray[j].createDate)
				+ "</li><li>number of answers: " + questionsArray[j].noAnswers
				+ "</li><li><a href=http://stackoverflow.com/questions/" + questionsArray[j].question_id
				+ " target='new'>" + questionsArray[j].title + "</a></li></ul><br>";
				epochDate = questionsArray[j].creation_date;
			}
		
		}
	}
	
	function epochToHumanDate(epochDate) {
		myDate = new Date(epochDate * 1000);
		humanDate = myDate.toLocaleDateString();
		return humanDate;
	}
	
	//change form date to epoch time for api call
	myYear = document.getElementById("year").value
	myMonth = document.getElementById("month").value
	myDay = document.getElementById("day").value
	myDate = new Date(myYear, myMonth, myDay);
	myEpoch = myDate.getTime()/1000.0;	
	
	//build api call into string and send as ajax request
	apiCall = "http://api.stackexchange.com/2.1/questions?fromdate="+myEpoch+"&tagged=" +document.getElementById("tag").value+ "&site=stackoverflow&order=desc&sort=votes"
	console.log ("apiCall is " +apiCall);
	xmlhttp.open("GET",apiCall,true);
	xmlhttp.send();
	
}