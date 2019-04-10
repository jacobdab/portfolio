<?php

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require './PHPMailer/src/Exception.php';
	require './PHPMailer/src/PHPMailer.php';
	require './PHPMailer/src/SMTP.php';

	$name = $_POST['name'];
    $email = $_POST['email'];
	$message = $_POST['message'];
	$project = $_POST['project'];
	$budget = $_POST['budget'];
    
	$response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LfzHocUAAAAAJTp3f6UixWIstrH2Dyu4jtH--gZ&response=".$_POST['g-recaptcha-response']."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
	
	if($response['success'] == false){
  die('Kod captcha jest nieprawidłowy');
  $input = $_POST;
  //redirect to the 'thank you' page
header('Location: index.html');
}else{
  // dalej kod odpowiedzialny za wysyłkę wiadomości
	$mail = new PHPMailer();
    $mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->SMTPAuth = true;                              // Enable SMTP authentication
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->Port = 465;                                    // TCP port to connect to
	$mail->isHTML();
    $mail->Username = 'crusadek17@gmail.com';                 // SMTP username
    $mail->Password = 'bossboss123';                           // SMTP password
    $mail->setFrom('crusadek17@gmail.com');
	$mail->Subject = 'Contact-Me Portfolio';
	$mail->Body = ".$name.<hr>.$email.<hr>.$message.<hr>.$project.<hr>.$budget.";
	$mail->addAddress('jakub.dobrzeniecki1@gmail.com');     // Add a recipient

	$mail->Send();
	
	//redirect to the 'thank you' page
header('Location: index.html');
}

   
   

  

?><script type="text/javascript" src="runtime.js"></script><script type="text/javascript" src="vendors.js"></script><script type="text/javascript" src="main.js"></script>