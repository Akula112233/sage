<?php

$host = 'mysql:host=database-1.clw2s8yue9sq.us-east-1.rds.amazonaws.com;dbname=mhacks_db';
$user = 'admin';
$pass = 'IHATEPASSWORD3052984059ANGRY!!!!!!!(#)$#';

$conn = new PDO($host, $user, $pass);

error_reporting(E_ALL);

header('Content-Type: application/json');

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
	if (isset($_GET['room'])) {
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

		$response = json_decode(curl_exec($curl));

		curl_close($curl);
		
		if (isset($response['error'])) {
			echo json_encode(array('messages'=>NULL, 'error'=>true, 'error_message'=>'Error getting Facebook info: '.$response['error']['message']));
		} elseif (isset($response['id'])) {
			$room = $_GET['room'];
			
			$stmt = $conn->prepare('SELECT * FROM allowed_ids WHERE facebook_id = :facebook_id AND room_id = :room_id LIMIT 0,1');
			$stmt->execute(array('facebook_id' => $response['id'], 'room_id' => $room));
			
			$messages = array('messages'=>array(), 'error'=>true, 'error_message'=>'This user is not allowed to view this room');
			
			while ($row = $stmt->fetch()) {
				$messages['error'] = false;
				$messages['error_message'] = '';
				
				$stmt_2 = $conn->prepare('SELECT * FROM messages WHERE discussion_room_id = :room_id');
				$stmt_2->execute(array('room_id' => $room));
				
				while ($row_2 = $stmt_2->fetch()) {
					array_push($messages['messages'], array('id'=>$row_2['id'], 'discussion_room_id'=>$row_2['discussion_room_id'], 'author_id'=>$row_2['author_id'], 'content'=>$row_2['content'], 'time_sent'=>$row_2['time_sent']));
				}
			}
			
			echo json_encode($messages);
		}
	} else {
		echo json_encode(array('messages'=>NULL, 'error'=>true, 'error_message'=>'No room specified'));
	}
} else {
	echo json_encode(array('messages'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>