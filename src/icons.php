<?php
header('Content-type: text/json');

$actions = array(
    0 => array(
        'id' => 123,
        'css_class' => 'icoTest icoPos1',
        'title' => 'Test 1',
        'vip' => false,
        'rest_time' => 0,
        'recovery_time' => 600,
    ),
    1 => array(
        'id' => 123,
        'css_class' => 'icoTest icoPos2',
        'title' => 'Test 2',
        'vip' => false,
        'rest_time' => 428,
        'recovery_time' => 660,
    ),
    2 => array(
        'id' => 123,
        'css_class' => 'icoTest icoPos3',
        'title' => 'Test 3',
        'vip' => true,
        'rest_time' => 0,
        'recovery_time' => 480,
    ),
    3 => array(
        'id' => 123,
        'css_class' => 'icoTest icoPos4',
        'title' => 'Test 4',
        'vip' => false,
        'rest_time' => 150,
        'recovery_time' => 550,
    ),
);

echo json_encode($actions);