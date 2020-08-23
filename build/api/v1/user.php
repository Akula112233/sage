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
		echo json_encode(array('user'=>NULL, 'error'=>true, 'error_message'=>'Error getting Facebook info: '.$response['error']['message']));
	} elseif (isset($response['id'])) {
		if (isset($_GET['id'])) {
			$facebook_id = $_GET['id'];
			$stmt = $conn->prepare('SELECT * FROM users WHERE facebook_id = :facebook_id LIMIT 0,1');
			$stmt->execute(array('facebook_id' => $facebook_id));
			
			$user = array('error'=>false, 'error_message'=>'');
			
			while ($row = $stmt->fetch()) {
				$user['user'] = array('facebook_id'=>$row['facebook_id'], 'name'=>$row['name'], 'avatar_url'=>$row['avatar_url'], 'interests'=>$row['interests']);
			}
			
			echo json_encode($user);
		} else {
			echo json_encode(array('user'=>NULL, 'error'=>true, 'error_message'=>'No id or tags specified'));
		}
	} else {
		echo json_encode(array('user'=>NULL, 'error'=>true, 'error_message'=>'Unknown Facebook error'));
	}
} else {
	echo json_encode(array('user'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>