<?php

$host = 'mysql:host=database-1.clw2s8yue9sq.us-east-1.rds.amazonaws.com;dbname=mhacks_db';
$user = 'admin';
$pass = 'IHATEPASSWORD3052984059ANGRY!!!!!!!(#)$#';

$conn = new PDO($host, $user, $pass);

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

function JoinRoom($connection, $room_id, $facebook_id) {
	$stmt = $connection->prepare('SELECT * FROM allowed_ids WHERE room_id = :room_id AND facebook_id = :facebook_id LIMIT 0,1');
	$stmt->execute(array('room_id' => $room_id, 'facebook_id' => $facebook_id));
	
	while ($row = $stmt->fetch()) {  // if person is already in room
		return true;
	}
	
	$stmt = $connection->prepare('INSERT INTO allowed_ids (room_id, facebook_id) VALUES (:room_id, :facebook_id)');
	$success_1 = $stmt->execute(array('room_id' => $room_id, 'facebook_id' => $facebook_id));
	
	$stmt = $connection->prepare('UPDATE discussion_rooms SET member_count = member_count + 1 WHERE id = :room_id');
	$success_2 = $stmt->execute(array('room_id' => $room_id));
	
	return $success_1 && $success_2;
}

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
		if (isset($_POST['id'])) {
			$room_id = $_POST['id'];
			
			$stmt = $conn->prepare('SELECT type, password, member_count, member_limit FROM discussion_rooms WHERE id = :room_id LIMIT 0,1');
			$stmt->execute(array('room_id' => $room_id));
			
			while ($row = $stmt->fetch()) {
				
				if (($row['type'] == 0 || ($row['type'] == 2 && (isset($_POST['password']) && $_POST['password'] == $row['password']))) && $row['member_count'] < $row['member_limit']) {
					$success = JoinRoom($conn, $room_id, $response['id']);
					
					$success_out = array('success'=>$success, 'error'=>false, 'error_message'=>'');
				} else {
					$success_out = array('success'=>false, 'error'=>false, 'error_message'=>'');
				}
				
				echo json_encode($success_out);
			}
			
			
		} else {
			echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No room id specified'));
		}
	} else {
		echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'Unknown Facebook error'));
	}
} else {
	echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>