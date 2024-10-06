<?php
header("Expires: Sat, 05 Nov 2005 00:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Content-Type: text/xml; charset=UTF-8");

// Configuration file is required.
require_once("conf.php");

$name = $_POST['name'];
$bigbadskoi = array("А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ь","Ы","Ъ","Э","Ю","Я");
$bigbadswin = array("�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�");
$biggoodskoi = array("�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�");
$biggoodswin = array("�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�");

$smallbadskoi = array("а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ь","ы","ъ","э","ю","я");
$smallbadswin = array("�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�");
$smallgoods = array("�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�");

//$name = str_replace("��","�",$name);
//$name = str_replace("��","�",$name);

//$name = str_replace($smallbadskoi,$smallgoods,$name);
//$name = str_replace($smallbadswin,$smallgoods,$name);
//$name = str_replace($bigbadskoi,$biggoodskoi,$name);
//$name = str_replace($bigbadswin,$biggoodswin,$name);

// if ($name != '' && $name != '��� ��������') {
 if ($name != '') {
$sql->query("insert into wtagonliners (name,p_vremya_z) values ('$name',current_timestamp)");
}

$sql->query("delete from wtagonliners where current_timestamp-p_vremya_z > 0.0001");


// Retrieve last 20 messages from database and order them in descending order 
$sql->query("SELECT date, name, url, message FROM wtagshoutbox ORDER BY messageid DESC LIMIT 20");

include_once("response.php");
?>
