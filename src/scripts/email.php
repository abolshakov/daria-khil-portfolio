<?php
  
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
      header("Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type");

      $formdata = json_decode(file_get_contents("php://input"), true);

      if( ! empty($formdata)) {
        $to      = "hundred.dots@gmail.com";
	    $subject = $formdata["subject"];
	    $message = "Name: ".$formdata["name"]."\r\n";
      	$message .= "Email: ".$formdata["email"]."\r\n";
      	$message .= "Message: ".$formdata["message"]."\r\n";

	    mail($to, $subject, $message);
      }
  
?>