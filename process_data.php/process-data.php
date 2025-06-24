<?php
define('WEBHOOK_URL', 'https://crm.alephtrade.com/rest/1/kcqrgedx1pd92xko/crm.lead.add.json');
define('LEAD_URL', 'https://crm.alephtrade.com/crm/lead/details/'); // sufix: ID/
define('AR_NAMES', array(
    'NAME'          => 'Имя',
    'LAST_NAME'     => 'Фамилия',
    'PHONE'         => 'Телефон',
    'EMAIL'         => 'Email',
    'SOURCE_ID'     => 'Источник',
    'SOURCE_DESCRIPTION' => 'Дополнительно об источнике'
));

header('Content-Type: application/json');

$fieldsConfig = [
    'NAME' => [
        'required' => true,
        'max_length' => 100,
        'error_message' => 'Укажите ваше имя'
    ],
    'EMAIL' => [
        'required' => true,
        'max_length' => 255,
        'filter' => FILTER_VALIDATE_EMAIL,
        'error_message' => 'Укажите корректный email'
    ],
    'CONSENT' => [
        'required' => true,
        'allowed_values' => ['1', 'yes', 'true', 'on'],
        'error_message' => 'Необходимо дать согласие'
    ],
    'PHONE' => [
        'required' => false,
        'max_length' => 20,
        'pattern' => '/^[\d\s\-\+\(\)]{7,20}$/',
        'error_message' => 'Некорректный формат телефона'
    ],
    'TYPE' => [
        'required' => true,
        'allowed_values' => ['1', '2'],
        'error_message' => 'Заполнена несуществующая форма'
    ]
];


function validateField($value, $config) {
    $value = trim($value ?? '');
    
    // Проверка на обязательность
    if ($config['required'] && empty($value)) {
        return [false, $config['error_message']];
    }
    
    // Если поле необязательное и пустое - пропускаем проверки
    if (!$config['required'] && empty($value)) {
        return [true, ''];
    }
    
    // Проверка максимальной длины
    if (isset($config['max_length']) && mb_strlen($value) > $config['max_length']) {
        return [false, $config['error_message']];
    }
    
    // Проверка по фильтру
    if (isset($config['filter']) && !filter_var($value, $config['filter'])) {
        return [false, $config['error_message']];
    }
    
    // Проверка по регулярному выражению
    if (isset($config['pattern']) && !preg_match($config['pattern'], $value)) {
        return [false, $config['error_message']];
    }
    
    // Проверка допустимых значений
    if (isset($config['allowed_values']) && !in_array(strtolower($value), $config['allowed_values'])) {
        return [false, $config['error_message']];
    }
    
    return [true, htmlspecialchars($value, ENT_QUOTES, 'UTF-8')];
}

function processData($data) {
    
    //$title = 'Заполнение заявки "АлефТрейд - ';
    $title = '"АлефТрейд - ';
    if($data['TYPE'] == 1) {
        $title .= 'Дегустация"';
    }
    else {
        $title .= 'Подбор кофемашины"';
    }
    $title .= ' ' . date('Y-m-d H:i:s');
    
    $partsName = explode(" ", $data['NAME']);

    $leadData = [
        'fields' => [
            'TITLE' => $title,
            'NAME' => $partsName[0] ?? '',          // Имя
            'LAST_NAME' => $partsName[1] ?? '',     // Фамилия
            'SECOND_NAME' => $partsName[2] ?? '',   // Отчество
            'PHONE' => [[
                'VALUE' => $data['PHONE'] ?? '',
                'VALUE_TYPE' => 'WORK'
            ]],
            'EMAIL' => [[
                'VALUE' => $data['EMAIL'],
                'VALUE_TYPE' => 'WORK'
            ]],
            'ASSIGNED_BY_ID' => '96',               // Отвественный
            'SOURCE_ID' => 'WEB',                   // Источник
            'SOURCE_DESCRIPTION' => 'АлефТрейд - Лендинг B2B 2025-06',
        ],
    ];
    
    sendToCRMLead($leadData);
}

function sendToCRMLead($leadData) {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, WEBHOOK_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($leadData));
    $response = curl_exec($ch);
    curl_close($ch);

    // Проверка ответа
    $result = json_decode($response, true);
    if (isset($result['result']['ID'])) {
        $ID = $result['result']['ID'];
    } 
    elseif (isset($result['result'])) {
        $ID = $result['result'];
    } 
    else {
        //echo "Ошибка создания лида: " . print_r($result, true);
        $ID = 0;
    }
    
    sendEmail($leadData['fields'], $ID);
}

function sendEmail($leadDataFields, $ID) {
    
    $message = '
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>'.$leadDataFields['TITLE'].'</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .footer { color: #777; font-size: 0.9em; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>';
    
    if($ID) {
        $message .= "<h1>Создан новый лид</h1>";
        $message .= '<p><a href="' . LEAD_URL . $ID . '/">' . LEAD_URL . $ID . '/</a></p>';
    } else {
        $message = "<h1>Новый лид НЕ создан</h1>";
    }
    
    foreach ($leadDataFields as $key => $field) {
    
        if(isset($arNames[$key])) {
            $key = $arNames[$key];
        }
        
        if( isset($field['0']) && isset($field['0']['VALUE']) ) {
            $message .= '<p>' . $key . ': ' . $field['0']['VALUE'] . '</p>';
        }
        else {
            $message .= '<p>' . $key . ': ' . $field . '</p>';
        }
    }
    
    $message .= "<p>- - -<br />Это сообщение было сформировано автоматически. Пожалуйста, не отвечайте на него.<br />По всем вопросам обратитесь в ИТ отдел.</p>";
    
    // Отправляем письмо менеджеру
    $to = "abalduev@alephtrade.com";
    $subject = $leadDataFields['TITLE'];
    
    $fromEmail = "no-reply@alephtrade.com";
    
    $headers = [
        "From" =>$fromEmail,
        "Reply-To" => "it@alephtrade.com",
        "MIME-Version" => "1.0", //html
        "Content-Type" => "text/html; charset=utf-8", //html
        "Auto-Submitted" => "auto-generated",
        "X-Auto-Response-Suppress" => "OOF, AutoReply"
    ];

    mail($to, $subject, $message, $headers);
}

// Обработка запроса
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    $validData = [];
    
    foreach ($fieldsConfig as $fieldName => $config) {
        $postValue = $_POST[$fieldName] ?? null;
        list($isValid, $result) = validateField($postValue, $config);
        
        if (!$isValid) {
            $errors[$fieldName] = $result;
        } else if ($result !== '') {
            $validData[$fieldName] = $result;
        }
    }
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'errors' => $errors,
            'text' => 'Проверьте правильность заполнения формы'
        ]);
        exit;
    }

    // Все данные валидны - можно обрабатывать дальше
    echo json_encode([
        'status' => 'success',
        'data' => $validData,
        'text' => 'Данные успешно получены'
    ]);
    
    processData($validData);
    
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'text' => 'Разрешены только POST-запросы'
    ]);
}
?>