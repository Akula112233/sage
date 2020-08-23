<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$host = 'mysql:host=database-1.clw2s8yue9sq.us-east-1.rds.amazonaws.com;dbname=mhacks_db';
$user = 'admin';
$pass = 'IHATEPASSWORD3052984059ANGRY!!!!!!!(#)$#';

$conn = new PDO($host, $user, $pass);

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$stmt = $conn->prepare('SELECT id FROM discussion_rooms r WHERE TIMEDIFF(CURRENT_TIMESTAMP, r.last_active_time) > r.expiration_time');
$stmt->execute();

$old_rooms = array();

while ($row = $stmt->fetch()) {
	array_push($old_rooms, $row['id']);
}

$room_list = ''
foreach ($old_rooms as $index->$room) {
	$room_list .= $room.', ';
}

$room_list = substr($room_list, 0, -2);

$stmt = $conn->prepare("DELETE * FROM allowed_ids WHERE room_id IN ($room_list)");
$stmt->execute();

$stmt = $conn->prepare("DELETE * FROM discussion_rooms WHERE id IN ($room_list)");
$stmt->execute();

$stmt = $conn->prepare("DELETE * FROM messages WHERE discussion_room_id IN ($room_list)");
$stmt->execute();

$stmt = $conn->prepare("DELETE * FROM room_tags WHERE room_id IN ($room_list)");
$stmt->execute();

?>