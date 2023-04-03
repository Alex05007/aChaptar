<?php
	$robot = false;
	
	$data = explode(";", base64_decode($_GET['tracking']));
	
	if ($data[0] == "mouse") {
		$avg_dist = 0;
		for ($i=1; $i<count($data); $i++) {
			$point = explode(",", $data[$i]);
			$avg_dist += intval($point[2]);
		}
		$avg_dist = $avg_dist / ($i - 1);
		if ($avg_dist > 50)
			$robot = true;
		if ($i < 30)
			$robot = true;
	} else if ($data[0] == "mobile") {
		switch ($data[3]) {
		  case 0:
			$s = intval($data[2]) + intval($data[6]);
			break;
		  case 1:
			$s = intval($data[2]) * intval($data[6]);
			break;
		  case 2:
			$s = intval($data[2]) - intval($data[6]);
			break;
		}
		if ($data[1] != $s)
			$robot = true;
		if (intval($data[7]) < 100)
			$robot = true;
	} else {
		$robot = true;
	}
	
	$keyLog = explode(";", base64_decode($_GET['keyLog']));
	$avg_dur = 0;
	for ($i=0; $i<count($keyLog); $i++) {
		$avg_dur += intval($keyLog[2]);
	}
	$avg_dur = $avg_dur / $i;
	if ($i > 10 && $avg_dur < 5)
		$robot = true;
	
	if ($robot == true)
		echo "aCAPTCHA_robot_detected";
	else
		echo "aCAPTCHA_robot_false";
?>