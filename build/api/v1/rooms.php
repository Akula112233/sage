<?php

$host = 'mysql:host=database-1.clw2s8yue9sq.us-east-1.rds.amazonaws.com;dbname=mhacks_db';
$user = 'admin';
$pass = 'IHATEPASSWORD3052984059ANGRY!!!!!!!(#)$#';

$conn = new PDO($host, $user, $pass);

error_reporting(E_ALL);

header('Content-Type: application/json');

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

	$response = json_decode(curl_exec($curl));

	curl_close($curl);
	
	if (isset($response['error'])) {
		echo json_encode(array('messages'=>NULL, 'error'=>true, 'error_message'=>'Error getting Facebook info: '.$response['error']['message']));
	} elseif (isset($response['id'])) {
		$stmt = $conn->prepare('SELECT * FROM discussion_rooms WHERE (type IN (0, 1)) OR creator_id = :facebook_id');
		$stmt->execute(array('facebook_id' => $response['id']));
		
		$rooms = array('rooms'=>array(), 'error'=>false, 'error_message'=>'');
		
		while ($row = $stmt->fetch()) {
			array_push($rooms['rooms'], array('id'=>$row['id'], 'creator_id'=>$row['creator_id'], 'description'=>$row['description'], 'discussion_name'=>$row['discussion_name'], 'member_count'=>$row['member_count'], 'member_limit'=>$row['member_limit'], 'expiration_time'=>$row['expiration_time'], 'last_active_time'=>$row['last_active_time'], 'type'=>$row['type']));
		}
		
		echo json_encode($rooms);
	}
} else {
	echo json_encode(array('messages'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>