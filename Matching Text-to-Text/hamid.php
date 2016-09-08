<?php
$dir = "E:\\SVN-2\\MEng\\data\\C" . $_GET["c_f"] ."\\matchtxttotxt\\". $_GET["dir"];
if( is_dir($dir) === false )
{
	mkdir($dir,0777,true);
}
$dir .= "\\" . $_GET["name"];
file_put_contents($dir, file_get_contents($_GET["url"]));

