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
		if (isset($_GET['id'])) {
			$room_id = $_GET['id'];
			$stmt = $conn->prepare('SELECT * FROM discussion_rooms WHERE id = :room_id LIMIT 0,1');
			$stmt->execute(array('room_id' => $room_id));
			
			$rooms = array('rooms'=>array(), 'error'=>false, 'error_message'=>'');
			
			while ($row = $stmt->fetch()) {
				$room = array('id'=>$row['id'], 'creator_id'=>$row['creator_id'], 'description'=>$row['description'], 'discussion_name'=>$row['discussion_name'], 'member_count'=>$row['member_count'], 'member_limit'=>$row['member_limit'], 'expiration_time'=>$row['expiration_time'], 'last_active_time'=>$row['last_active_time'], 'type'=>$row['type'], 'tags'=>array());
				
				$stmt_2 = $conn->prepare('SELECT tag FROM room_tags WHERE room_id = :room_id');
				$stmt_2->execute(array('room_id' => $row['id']));
				
				while ($row_2 = $stms_2->fetch()) {
					array_push($room['tags'], $row_2['tag']);
				}
				
				array_push($rooms['rooms'], $room);
			}
			
			echo json_encode($rooms);
		} elseif (isset($_GET['keyword'])) {
			$stmt = $conn->prepare('SELECT r.* FROM discussion_rooms r WHERE r.discussion_name LIKE %:name%');
			$stmt->execute(array('name' => $_GET['name']));
			
			$rooms = array('rooms'=>array(), 'error'=>false, 'error_message'=>'');
			
			while ($row = $stmt->fetch()) {
				$room = array('id'=>$row['id'], 'creator_id'=>$row['creator_id'], 'description'=>$row['description'], 'discussion_name'=>$row['discussion_name'], 'member_count'=>$row['member_count'], 'member_limit'=>$row['member_limit'], 'expiration_time'=>$row['expiration_time'], 'last_active_time'=>$row['last_active_time'], 'type'=>$row['type'], 'tags'=>array());
				
				$stmt_2 = $conn->prepare('SELECT tag FROM room_tags WHERE room_id = :room_id');
				$stmt_2->execute(array('room_id' => $row['id']));
				
				while ($row_2 = $stms_2->fetch()) {
					array_push($room['tags'], $row_2['tag']);
				}
				
				array_push($rooms['rooms'], $room);
			}
			
			echo json_encode($rooms);
		} elseif (isset($_GET['tags'])) {
			$tags = $_GET['tags'];
			
			$escaped_tags = array();
			$like_string = '';
			
			foreach ($tags as $index=>$tag) {
				$escaped_tag = $conn->quote($tag);
				$escaped_tags[$index] = $escaped_tag;
				$like_string .= " OR r.name LIKE %$escaped_tag% OR r.description LIKE %$escaped_tag%";
			}
			
			$stmt = $conn->prepare('SELECT r.* FROM discussion_rooms r JOIN room_tags t ON t.room_id = r.id WHERE t.tag IN ('.implode(', ', $escaped_tags).')'.$like_string.' GROUP BY r.id');
			$stmt->execute();
			
			echo 'SELECT r.* FROM discussion_rooms r JOIN room_tags t ON t.room_id = r.id WHERE t.tag IN ('.implode(', ', $escaped_tags).')'.$like_string.' GROUP BY r.id';
			
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
			echo json_encode(array('rooms'=>NULL, 'error'=>true, 'error_message'=>'No id, tags, name, or description specified'));
		}
	} else {
		echo json_encode(array('rooms'=>NULL, 'error'=>true, 'error_message'=>'Unknown Facebook error'));
	}
} else {
	echo json_encode(array('rooms'=>NULL, 'error'=>true, 'error_message'=>'No authorization given'));
}

?>