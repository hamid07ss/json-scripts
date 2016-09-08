<?php
/**
 * Created by PhpStorm.
 * User: M.Azadi <mohammad.azadi@yahoo.com>
 * Date: 8/31/2016
 * Time: 3:20 PM
 */


ini_set('xdebug.var_display_max_depth', 10);
ini_set('xdebug.var_display_max_children', 2560);
ini_set('xdebug.var_display_max_data', 10240);


require 'E:/SVN-1/kint-master/Kint.class.php';

//require_once( 'E:/SVN-1/php-console-master/phpConsoleConfig.php');
//PC::debug('hi.');

if ( isset( $_GET["qtype"] ) ) {
	$file =  'E:/data json/C*/U*/* - * - * [' . $_GET["qtype"] . '*.en.json' ;
//	$file =  'E:/Share/eng town/data json/C*/U*/* - * - * [' . $_GET["qtype"] . '*.en.json';
	echo $file;
	$files = glob($file);


	$arr=[];
	$arrV=[];
	foreach ( $files as $file ) {
		$json = json_decode( file_get_contents( $file ), true);
		$refs = $json[ 0 ]["content"];
		foreach($refs as $k => $v){
			if(!empty($v)) {
				$arr['refs.'.$k] = $file;
				$arrV[ 'refs.'.$k ][]  = [count($v), $file];
			}
		}
		$flts = $json[ 0 ]["filterOptions"];
		foreach($flts as $k => $v){
			if(!empty($v)) {
				$arr['fltr.'.$k] = $file;
				$arrV['fltr.'. $k ][]  =[ $v, $file];
			}
		}
	}
	for($t = 0;$t < 36;$t++){
		if($arrV["refs.audios"][$t][0] !== $arrV["refs.pics"][$t][0]){
			echo 'tst';
		}
	}
	ksort($arr);
	ksort($arrV);

	echo '<div style="white-space: pre-wrap;">';
	d( $arr );
	d( $arrV );
	echo '</div>';
} else {
	echo '<link rel="stylesheet" href="../lib/bootstrap.css" />';
	echo '<div class="container" style="text-align: center;padding: 50px">
    <div class="get_data">
        <form action="script.php" method="get">
            <span class="txt">insert question type</span>
            <input class="qtype" name="qtype" type="text"/>
            <input class="submit" value="submit" type="submit"/>
        </form>
    </div>
</div>';
}

