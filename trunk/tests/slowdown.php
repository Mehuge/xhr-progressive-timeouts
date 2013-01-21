<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-type: text/plain");
	header("Cache-Control: no-cache");
	flush();

	function makeBuffer($size,$with) {
		$buffer = "";
		while (strlen($buffer) < $size) $buffer = $buffer . $with;
		return substr($buffer,0,$size);;
	}

	function send($s,$d,$buffer) {
		$i = 0;
		while ($i < $s) {
			if (rand(1,100)<2) sleep(rand(1,20));
			echo $buffer;
			$i += 1024;
			if ($d) usleep($d * 1000000);
			flush();
		}
	}

	$s = $_GET["s"]; $d = $_GET["d"];
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method == "GET") {
		$buffer = makeBuffer(1024,"0123456789ABCDEF");
		send($s,$d,$buffer);
	} else if ($method == "PUT" || $method == "POST") {
		$body = @file_get_contents('php://input');
		echo $method." ".$_SERVER["CONTENT_TYPE"]." ".$body;
	} else if ($method == "OPTIONS" || $method == "HEAD") {
		$body = @file_get_contents('php://input');
		echo $method." ".$_SERVER["CONTENT_TYPE"]." ".$body;
	}
?>
