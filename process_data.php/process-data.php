<?
$webhookUrl = 'https://crm.alephtrade.com/rest/1/kcqrgedx1pd92xko/crm.lead.add.json';

$title = 'Заполнение заявки "АлефТрейд - ';

if(1) {
    $title .= 'Дегустация"';
}
else {
    $title .= 'Подбор кофемашины"';
}

$leadData = [
    'fields' => [
        'TITLE' => $title,
        'NAME' => 'TEST',
        'LAST_NAME' => 'title',
        'PHONE' => [['VALUE' => '+79778354054', 'VALUE_TYPE' => 'WORK']],
        'EMAIL' => [['VALUE' => 'ccron@yandex.kz', 'VALUE_TYPE' => 'WORK']],
        'SOURCE_ID' => 'WEB',   // Источник
        'SOURCE_DESCRIPTION' => 'АлефТрейд - Лендинг B2B 2025-06',
    ],
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $webhookUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($leadData));
$response = curl_exec($ch);
curl_close($ch);

// Проверка ответа
$result = json_decode($response, true);
if (isset($result['result']['ID'])) {
    echo "Лид создан, ID: " . $result['result']['ID'];
} 
elseif (isset($result['result'])) {
    echo "Лид создан, ID: " . $result['result'];
} 
else {
    echo "Ошибка создания лида: " . print_r($result, true);
}
?>