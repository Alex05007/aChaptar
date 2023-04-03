<?php
	$aCAPTCHA_data = file_get_contents("https://gnets.myds.me/developer/acaptcha/api/data/?tracking=" . base64_encode($_POST['aCAPTCHA_data']) . "&keyLog=" . base64_encode($_POST['aCAPTCHA_data_keyLog']));
	if ($aCAPTCHA_data == "aCAPTCHA_robot_false") {
		echo "Hi " . $_POST['fname'] . " " . $_POST['lname'];
	} else if ($aCAPTCHA_data == "aCAPTCHA_robot_detected") {
		//echo "yes";
	} else {
		//error occured
	}

?>