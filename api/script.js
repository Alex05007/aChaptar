document.write('<input type="hidden" name="aCAPTCHA_data" id="aCAPTCHA_data">');
document.write('<input type="hidden" name="aCAPTCHA_data_keyLog" id="aCAPTCHA_data_keyLog">');

function isTouchDevice(){
    return window.ontouchstart !== undefined;
}

var keyLog_time = 0;
var keyLog_time_last = 0;
var keyLog_timer = setInterval( function () {
	keyLog_time++;
}, 1);

document.addEventListener('keypress', logKey);
function logKey(e) {
  document.getElementById('aCAPTCHA_data_keyLog').value = document.getElementById('aCAPTCHA_data_keyLog').value + (keyLog_time - keyLog_time_last) + ";";
  keyLog_time_last = keyLog_time;
}

if (!isTouchDevice()) {
	document.write('<link rel="stylesheet" href="https://gnets.myds.me/developer/acaptcha/api/style.css">');
	document.write('<div id="aCAPTCHA_protected" onClick="location.assign(\'https://gnets.myds.me/developer/acaptcha\')">');     
		document.write('<img src="https://gnets.myds.me/developer/acaptcha/api/img/robot.png" width="30px">');
		document.write('<p>Protected by aCAPTCHA</p>');
	document.write('</div>');
	
	
	document.write('<div id="aCAPTCHA">');
		document.write('<div class="aCAPTCHA_checkbox">');
		  document.write('<label>');
			document.write('<input type="checkbox" id="aCAPTCHA_checkbox" onClick="aCAPTCHA_nextStep()"><span class="aCAPTCHA_checkbox-material"><span class="check"></span></span> I\'m not a robot.');
		  document.write('</label>');
		document.write('</div>');
		document.write('<div id="aCAPTCHA_2nd_step" class="aCAPTCHA_step" style="display:none;">');
			document.write('<div id="aCAPTCHA_3rd_step_problem"></div>');
			document.write('<input type="number" id="aCAPTCHA_3rd_step_nr">');
			document.write('<a href="javascript:aCAPTCHA_result()">Submit</a>');
		document.write('</div>');
	document.write('</div>');
	
	document.getElementById('aCAPTCHA_data').value = "mouse;";

	var lastX = 0;
	var lastY = 0;

	var trackMouse = setInterval(function() {
		const mouseX = [];
		const mouseY = [];
		onmousemove = function(e){
			mouseY.push(e.clientY);
			mouseX.push(e.clientX);
			var dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)).toFixed(2);
			lastX = e.clientX;
			lastY = e.clientY;
			if (!document.getElementById('aCAPTCHA_data').value.includes("mobile"))
				document.getElementById('aCAPTCHA_data').value = document.getElementById('aCAPTCHA_data').value + e.clientX + "," + e.clientY + "," + dist + ";";
		}
	}, 1);

	function aCAPTCHA_nextStep() {
		if (document.getElementById('aCAPTCHA_data').value.length < 500) {
			document.getElementById('aCAPTCHA_2nd_step').style.display = "block";
			document.getElementById('aCAPTCHA_checkbox').disabled = true;
			document.getElementById('aCAPTCHA_2nd_step').setAttribute('id', 'aCAPTCHA_2nd_step');
			aCAPTCHA_problem_2();
		}
	}

} else {

	document.write('<link rel="stylesheet" href="https://gnets.myds.me/developer/acaptcha/api/style.css">');
	document.write('<div id="aCAPTCHA">');
		document.write('<div class="aCAPTCHA_checkbox">');
		  document.write('<label>');
			document.write('<input type="checkbox" id="aCAPTCHA_checkbox" onClick="aCAPTCHA_nextStep()"><span class="aCAPTCHA_checkbox-material"><span class="check"></span></span> I\'m not a robot.');
		  document.write('</label>');
		document.write('</div>');
		document.write('<div id="aCAPTCHA_2nd_step" class="aCAPTCHA_step" style="display:none;">');
			document.write('<div id="aCAPTCHA_3rd_step_problem"></div>');
			document.write('<input type="number" id="aCAPTCHA_3rd_step_nr">');
			document.write('<a href="javascript:aCAPTCHA_result()">Submit</a>');
		document.write('</div>');
	document.write('</div>');

	function aCAPTCHA_nextStep() {
		document.getElementById('aCAPTCHA_2nd_step').style.display = "block";
		document.getElementById('aCAPTCHA_checkbox').disabled = true;
		document.getElementById('aCAPTCHA_2nd_step').setAttribute('id', 'aCAPTCHA_2nd_step');
		aCAPTCHA_problem_2();
	}

}
var suspicion = 0;
var robot = false;
var prob = 0;
function firstClick(img) {
	var img2 = document.getElementById('aCAPTCHA_img_' + img);
	img2.setAttribute('onClick', 'lastClick()');
}

var nr1 = Math.floor(Math.random() * 5)+1;
var nr2 = Math.floor(Math.random() * 3);
var nr3 = Math.floor(Math.random() * 10);
var nr4 = Math.floor(Math.random() * 100);
var nr5 = Math.floor(Math.random() * 5)+1;

var aCAPTCHA_problem_2_time = 0;

function aCAPTCHA_problem_2() {
	nr1 = Math.floor(Math.random() * 5)+1;
	nr2 = Math.floor(Math.random() * 3);
	nr3 = Math.floor(Math.random() * 10);
	nr4 = Math.floor(Math.random() * 100);
	nr5 = Math.floor(Math.random() * 5)+1;
	
	var problem = "";
	for (var i=0; i<nr1; i++) {
		problem = problem + "<img src='https://gnets.myds.me/developer/acaptcha/api/img/robot.png' width='10px'>";
	}
	switch (nr2) {
	  case 0:
	    var s = " + ";
		break;
	  case 1:
	    var s = " x ";
		break;
	  case 2:
	    var s = " - ";
		break;
	}
	problem = problem + s;
	for (var i=0; i<nr5; i++) {
		problem = problem + "<img src='https://gnets.myds.me/developer/acaptcha/api/img/person.png' width='10px'>";
	}
	document.getElementById('aCAPTCHA_3rd_step_problem').innerHTML = problem;
	document.getElementById('aCAPTCHA_3rd_step_problem').setAttribute('data-result', nr3);
	var time = setInterval(function () {
		aCAPTCHA_problem_2_time++;
	}, 1);
}

function aCAPTCHA_result() {
	document.getElementById('aCAPTCHA_data').value = "mobile;" + document.getElementById('aCAPTCHA_3rd_step_nr').value + ";" + nr1 + ";" + nr2 + ";" + nr3 + ";" + nr4 + ";" + nr5 + ";" + aCAPTCHA_problem_2_time;
	//document.getElementById('aCAPTCHA_submit_button').disabled = false;
	document.getElementById('aCAPTCHA_2nd_step').style.display = "none";
}
