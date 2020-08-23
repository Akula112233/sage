<?php

$host = 'mysql:host=database-1.clw2s8yue9sq.us-east-1.rds.amazonaws.com;dbname=mhacks_db';
$user = 'admin';
$pass = 'IHATEPASSWORD3052984059ANGRY!!!!!!!(#)$#';

$conn = new PDO($host, $user, $pass);

error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
	$auth = $_SERVER["HTTP_AUTHORIZATION"];
	$auth_array = explode(" ", $auth);
	[$user, $pass] = explode(":", base64_decode($auth_array[1]), 2);
	
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => "https://graph.facebook.com/me?access_token=$user",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "GET",
	));

	$response = json_decode(curl_exec($curl), true);

	curl_close($curl);
	
	if (isset($response['error'])) {
		echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'Error getting Facebook info: '.$response['error']['message']));
	} elseif (isset($response['id'])) {
		if (isset($_POST['id']) && isset($_POST['interests'])) {
			$stmt = $conn->prepare('UPDATE users SET interests = :interests WHERE facebook_id = :facebook_id');
			$success $stmt->execute(array('facebook_id' => $response['id'], 'interests' => $_POST['interests']));
			
			$success_out = array('success'=>$success, 'error'=>false, 'error_message'=>'');
			
			echo json_encode($success_out);
		} else {
			echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No user and/or interests specified'));
		}
	} else {
		echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'Unknown Facebook error'));
	}
} else {
	echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>