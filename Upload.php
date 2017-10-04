<?php
	 $fileArr = pathinfo($_FILES["file"]["name"]);
	  $fileType = $_FILES["file"]["type"];
	  $extensiion = $fileArr['extension'];
				   
	 $fileName = sha1(date('Y-m-d H:i:s')."-".time()).".".$extensiion;
	 $root = "Media/";
	move_uploaded_file($_FILES["file"]["tmp_name"],$root.$fileName);
	$filUrl =  "http://uat.bibash.com.np/Media/".$fileName;
	
	 
	echo json_encode(array("link"=>$filUrl));
?>