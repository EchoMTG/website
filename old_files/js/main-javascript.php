<?php
header('Content-Type: application/javascript');

ob_start();
$loader = require '../../vendor/autoload.php';

if($_SERVER['HTTP_HOST'] == "dev.echomtg.com"){
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

	
	foreach (glob("to_compile/*.js") as $filename)
	{
	    include $filename;
	}
	
	$string = ob_get_clean();
	// Disable YUI style comment preservation.
	//$minifiedCode = \JShrink\Minifier::minify($string, array('flaggedComments' => false));
	//echo $minifiedCode;   
	
	$file = '../../static/main.js';

	// Open the file to get existing content

	 file_put_contents($file,$string);
	 echo $string;
} else {
	include 'main.js';
}