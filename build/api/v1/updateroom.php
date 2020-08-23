<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

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
			
			$stmt = $conn->prepare('SELECT * FROM discussion_rooms r JOIN allowed_ids a ON r.id = a.room_id WHERE a.facebook_id = :facebook_id AND r.id = :room_id GROUP BY r.id LIMIT 0,1');
			$stmt->execute(array('facebook_id' => $response['id'], 'room_id' => $room_id));
			
			$success_out = array('success'=>false, 'error'=>true, 'error_message'=>'Invalid room or you are not in the room');
			
			while ($row = $stmt->fetch()) {
				$stmt_2 = $conn->prepare('UPDATE discussion_rooms SET last_active_time = CURRENT_TIMESTAMP WHERE id = :room_id');
				$success = $stmt->execute(array('room_id' => $room_id));
				
				$success_out = array('success'=>$success, 'error'=>false, 'error_message'=>'');
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