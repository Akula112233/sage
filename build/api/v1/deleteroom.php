<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: authorization, Authorization, Accept, accept, Accept-Encoding");

$host = 'mysql:host=database-1.clw2s8yue9sq.us-east-1.rds.amazonaws.com;dbname=mhacks_db';
$user = 'admin';
$pass = 'IHATEPASSWORD3052984059ANGRY!!!!!!!(#)$#';

$conn = new PDO($host, $user, $pass);

error_reporting(E_ALL);
ini_set('display_errors', 1);

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
		if (isset($_POST['id'])) {
			$room_id = $_POST['id'];
			
			$check_stmt = $conn->prepare("SELECT * FROM discussion_rooms WHERE room_id = :room_id AND creator_id = :facebook_id LIMIT 0,1");
			$check_stmt->execute(array('room_id'=>$room_id, 'facebook_id'=>$response['id']));
			
			$success_out = array('success'=>false, 'error'=>true, 'error_message'=>'Invalid room or you are not the room creator');
			
			while ($row = $check_stmt->fetch()) {
				$stmt = $conn->prepare("DELETE * FROM allowed_ids WHERE room_id = :room_id");
				$success_1 = $stmt->execute(array('room_id'=>$room_id));
				
				$stmt = $conn->prepare("DELETE * FROM discussion_rooms WHERE id = :room_id");
				$success_2 = $stmt->execute(array('room_id'=>$room_id));
				
				$stmt = $conn->prepare("DELETE * FROM messages WHERE discussion_room_id = :room_id");
				$success_3 = $stmt->execute(array('room_id'=>$room_id));
				
				$stmt = $conn->prepare("DELETE * FROM room_tags WHERE room_id = :room_id");
				$success_4 = $stmt->execute(array('room_id'=>$room_id));
				
				$success_out = array('success'=>$success_1 & $success_2 & $success_3 & $success_4, 'error'=>false, 'error_message'=>'');
			}
			
			echo json_encode($success_out);
		} else {
			echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No room specified'));
		}
	} else {
		echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'Unknown Facebook error'));
	}
} else {
	echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>