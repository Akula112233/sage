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
		echo json_encode(array('rooms'=>NULL, 'error'=>true, 'error_message'=>'Error getting Facebook info: '.$response['error']['message']));
	} elseif (isset($response['id'])) {
		$stmt = $conn->prepare('SELECT * FROM discussion_rooms');
		$stmt->execute(array('facebook_id' => $response['id']));
		
		$rooms = array('rooms'=>array(), 'error'=>false, 'error_message'=>'');
		
		while ($row = $stmt->fetch()) {
			$room = array('id'=>$row['id'], 'creator_id'=>$row['creator_id'], 'description'=>$row['description'], 'discussion_name'=>$row['discussion_name'], 'member_count'=>$row['member_count'], 'member_limit'=>$row['member_limit'], 'expiration_time'=>$row['expiration_time'], 'last_active_time'=>$row['last_active_time'], 'type'=>$row['type'], 'tags'=>array());
			
			$stmt_2 = $conn->prepare('SELECT tag FROM room_tags WHERE room_id = :room_id');
			$stmt_2->execute(array('room_id' => $row['id']));
			
			while ($row_2 = $stmt_2->fetch()) {
				array_push($room['tags'], $row_2['tag']);
			}
			
			array_push($rooms['rooms'], $room);
		}
		
		echo json_encode($rooms);
	} else {
		echo json_encode(array('rooms'=>NULL, 'error'=>true, 'error_message'=>'Unknown Facebook error'));
	}
} else {
	echo json_encode(array('rooms'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>