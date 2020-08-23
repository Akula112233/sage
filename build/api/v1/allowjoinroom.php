<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include_once(dirname(__DIR__).'/joinroom.php');

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
		if (isset($_POST['user_id']) && isset($_POST['room_id'])) {
			$room_id = $_POST['id'];
			
			$stmt = $conn->prepare('SELECT type, member_count, member_limit, creator_id FROM discussion_rooms WHERE id = :room_id AND creator_id = :creator_id LIMIT 0,1');
			$stmt->execute(array('creator_id' => $response['id']));
			
			$success_out = array('success'=>false, 'error'=>true, 'error_message'=>'Invalid room or you are not the room creator');
			
			while ($row = $stmt->fetch()) {
				if ($row['type'] == 1 && $row['member_count'] < $row['member_limit']) {
					$success = JoinRoom($conn, $room_id, $_POST['user_id']);
					
					$success_out = array('success'=>$success, 'error'=>false, 'error_message'=>'');
				} else {
					$success_out = array('success'=>false, 'error'=>false, 'error_message'=>'');
				}
			}
			
			echo json_encode($success_out);
		} else {
			echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No user and/or room specified'));
		}
	} else {
		echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'Unknown Facebook error'));
	}
} else {
	echo json_encode(array('success'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>