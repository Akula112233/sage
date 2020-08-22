<?php

$host = 'mysql:host=database-1.clw2s8yue9sq.us-east-1.rds.amazonaws.com;dbname=mhacks_db';
$user = 'admin';
$pass = 'IHATEPASSWORD3052984059ANGRY!!!!!!!(#)$#';

$conn = new PDO($host, $user, $pass);

if (isset($_GET['room'])) {
	$room = $_GET['room'];
	
	$stmt = $conn->prepare('SELECT * FROM messages WHERE discussion_room_id = :room_id');
	$stmt->execute(array('room_id' => $room));
	
	$messages = array();
	
	while ($row = $stmt->fetch()) {
		array_push($messages, $row);
	}
	
	echo json_encode($messages);
else {
	echo json_encode(array('messages'=>NULL, 'error'=>true, 'error_message'=>'No room specified'));
}

?>