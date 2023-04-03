document.write('<input type="text" name="aCAPTCHA" id="aCAPTCHA_data" style="display:none;" contentEditable="false">');

document.write('<link rel="stylesheet" href="https://gnets.myds.me/acaptcha/api/style.css">');
document.write('<div id="aCAPTCHA">');
    document.write('<div class="aCAPTCHA_checkbox">');
      document.write('<label>');
        document.write('<input type="checkbox" id="aCAPTCHA_checkbox" onClick="aCAPTCHA_nextStep()"><span class="aCAPTCHA_checkbox-material"><span class="check"></span></span> I\'m not a robot.');
      document.write('</label>');
    document.write('</div>');
    document.write('<div id="aCAPTCHA_2nd_step" class="aCAPTCHA_step" style="display:none;">');
        document.write('<p>Plese click the two images.</p>');
        document.write('<img id="aCAPTCHA_img_1" src="https://gnets.myds.me/acaptcha/api/img/robot.png" onClick="firstClick(\'2\')">');
        document.write('<img id="aCAPTCHA_img_2" src="https://gnets.myds.me/acaptcha/api/img/person.png" onClick="firstClick(\'1\')">');
    document.write('</div>');
    document.write('<div id="aCAPTCHA_3rd_step" class="aCAPTCHA_step" style="display:none;">');
    	document.write('<div id="aCAPTCHA_3rd_step_problem"></div>');
        document.write('<input type="number" id="aCAPTCHA_3rd_step_nr">');
        document.write('<a href="javascript:aCAPTCHA_result()">Submit</a>');
    document.write('</div>');
document.write('</div>');

var aCAPTCHA_disable = setInterval(function () {
	document.getElementById('aCAPTCHA_submit_button').disabled = true;
	document.body.onerror = "aCAPTCHA_robot()";
}, 1);

function aCAPTCHA_robot() {
	document.getElementById('aCAPTCHA_data').value = "robot";
	document.getElementById('aCAPTCHA_protected_form').submit();
}

function aCAPTCHA_nextStep() {
	document.getElementById('aCAPTCHA_2nd_step').style.display = "block";
	document.getElementById('aCAPTCHA_checkbox').disabled = true;
	document.getElementById('aCAPTCHA_2nd_step').setAttribute('id', 'aCAPTCHA_2nd_step');
	document.getElementById('aCAPTCHA_data').value = document.getElementById('aCAPTCHA_data').value + "next_step();";
}
var trackMouse;
var suspicion = 0;
var robot = false;
var prob = 0;
function firstClick(img) {
	var img2 = document.getElementById('aCAPTCHA_img_' + img);
	img2.setAttribute('onClick', 'lastClick()');
	trackMouse = setInterval(function() {
		const mouseX = [];
		const mouseY = [];
		onmousemove = function(e){mouseY.push(e.clientY); mouseX.push(e.clientX);}
		img2.addEventListener('click', function () {
			var lenght = mouseY.length;
			var prevY = 0;
			for (var i=0; i<lenght; i++) {
				if (mouseY[i] == prevY) {
					//suspicion++;
				}
				prevY = mouseY[i];
			}
			//document.getElementById('aCAPTCHA_data').value = document.getElementById('aCAPTCHA_data').value + "[" + mouseX.toString() + "];[" + mouseY.toString() + "];";
			var prevX = 0;
			for (var i=0; i<lenght; i++) {
				if (mouseX[i] == prevX) {
					//suspicion++;
				}
				prevX = mouseX[i];
			}
			document.getElementById('aCAPTCHA_data').value = document.getElementById('aCAPTCHA_data').value + suspicion + ";";
			if (suspicion > 1000) {
				prob++;
			}
			if (mouseX[length] == img2.offsetLeft || mouseX[length] == img2.offsetRight || mouseX[length] == img2.offsetLeft + img2.offsetWidth/2) {
				prob++;
			}
			if (mouseY[0] > mouseY[lenght] - 10 || mouseY[0] < mouseY[lenght] + 10 ) {
				prob++;
			}
			//document.getElementById('aCAPTCHA_data').value = document.getElementById('aCAPTCHA_data').value + mouseX[length] + ";" + img2.offsetLeft + ";" + img2.offsetRight + ";" + (img2.offsetLeft + img2.offsetWidth/2) + ";" + mouseY[0] + ";" + (mouseY[lenght] - 10) + ";" +  + (mouseY[lenght] + 10) + ";";
		});
	}, 1);
}

var nr1 = Math.floor(Math.random() * 5)+1;
var nr2 = Math.floor(Math.random() * 3);
var nr3 = Math.floor(Math.random() * 10);
var nr4 = Math.floor(Math.random() * 100);
var nr5 = Math.floor(Math.random() * 5)+1;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function lastClick() {
	clearInterval(trackMouse);
	document.getElementById('aCAPTCHA_2nd_step').style.display = "none";
	document.getElementById('aCAPTCHA_3rd_step').style.display = "block";
	aCAPTCHA_problem_2();
}

function aCAPTCHA_problem_2() {
	nr1 = Math.floor(Math.random() * 5)+1;
	nr2 = Math.floor(Math.random() * 3);
	nr3 = Math.floor(Math.random() * 10);
	nr4 = Math.floor(Math.random() * 100);
	nr5 = Math.floor(Math.random() * 5)+1;
	
	var problem = "";
	for (var i=0; i<nr1; i++) {
		problem = problem + "<img src='https://gnets.myds.me/acaptcha/api/img/robot.png' width='10px'>";
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
		problem = problem + "<img src='https://gnets.myds.me/acaptcha/api/img/person.png' width='10px'>";
	}
	document.getElementById('aCAPTCHA_3rd_step_problem').innerHTML = problem;
	document.getElementById('aCAPTCHA_3rd_step_problem').setAttribute('data-result', nr3);
}

var aCAPTCHA_problem_2_tries = 0;

function aCAPTCHA_result() {
	switch (nr2) {
	  case 0:
	    var r = nr1+nr5;
		break;
	  case 1:
	    var r = nr1*nr5;
		break;
	  case 2:
	    var r = nr1-nr5;
		break;
	}
	
	document.getElementById('aCAPTCHA_data').value = document.getElementById('aCAPTCHA_data').value + "|" + document.getElementById('aCAPTCHA_3rd_step_nr').value + ";" + nr1 + ";" + nr2 + ";" + nr3 + ";" + nr4 + ";" + nr5 +";";
	if (document.getElementById('aCAPTCHA_3rd_step_nr').value != r) {
		if (aCAPTCHA_problem_2_tries < 2) {
			aCAPTCHA_problem_2();
			aCAPTCHA_problem_2_tries
		} else {
			prob++;
			if (prob > 3) {
				document.getElementById('aCAPTCHA_data').value = "robot";
				document.getElementById('aCAPTCHA_protected_form').submit();
			}
		}
	} else {
		clearInterval(aCAPTCHA_disable);
		document.getElementById('aCAPTCHA_submit_button').disabled = false;
		document.getElementById('aCAPTCHA_3rd_step').style.display = "none";
	}
}
