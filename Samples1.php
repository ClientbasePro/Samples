<?php

  // примеры кода для CRM Clientbase

  
 
 
  // уведомление аналог JS alert, работающее даже в подтаблице
calc_alerts($text);


  // суммирование из подтаблицы
if ('delete'==$event['type'] || $line['Статус записи']) $c = " AND id<>$ID ";
$row = sql_fetch_assoc(data_select_field(550, 'SUM(f7460) AS sum', "status=0 {$c} AND f9430='".$line['Счёт']['raw']."'"));
$line['Счёт']['Оплачено'] = $row['sum'];  
  
  
  // часть 1 Отчётов с выбором периода МГ - МГ
$months = array('Январь'=>1,'Февраль'=>2,'Март'=>3,'Апрель'=>4,'Май'=>5,'Июнь'=>6,'Июль'=>7,'Август'=>8,'Сентябрь'=>9,'Октябрь'=>10,'Ноябрь'=>11,'Декабрь'=>12);
$months_ = array_flip($months);
$m1 = ($m1=intval($_REQUEST['m1'])) ? $m1 : 1;
$y1 = ($y1=intval($_REQUEST['y1'])) ? $y1 : date("Y");
$m2 = ($m2=intval($_REQUEST['m2'])) ? $m2 : intval(date("m"));
$y2 = ($y2=intval($_REQUEST['y2'])) ? $y2 : date("Y");
$m = 1;
while ($m<13) { $mList1 .= '<option value="'.$m.'" '.(($m==$m1)?" selected ":"").'>'.$months_[$m].'</option>'; $m++; }
$m = 1;
while ($m<13) { $mList2 .= '<option value="'.$m.'" '.(($m==$m2)?" selected ":"").'>'.$months_[$m].'</option>'; $m++; }
$y = 2017;
while ($y<2026) { $yList1 .= '<option '.(($y==$y1)?" selected ":"").'>'.$y.'</option>'; $y++; }
$y = 2017;
while ($y<2026) { $yList2 .= '<option '.(($y==$y2)?" selected ":"").'>'.$y.'</option>'; $y++; }
$smarty->assign("mList1", $mList1);
$smarty->assign("mList2", $mList2);
$smarty->assign("yList1", $yList1);
$smarty->assign("yList2", $yList2);
  
  // часть 2
<div class="reportFilters">
  <table style="margin: 0px auto;">
    <tr>
      <td>        
        <span>Период с <select name="m1" onchange="document.getElementById('report_form').submit();return false;">{$mList1}</select> <select name="y1" onchange="document.getElementById('report_form').submit();return false;">{$yList1}</select></span>
      </td>
      <td>
        <span>по <select name="m2" onchange="document.getElementById('report_form').submit();return false;">{$mList2}</select> <select name="y2" onchange="document.getElementById('report_form').submit();return false;">{$yList2}</select></span>
      </td>
    </tr>
  </table>
</div>  

  // дописать 0 в дне месяца, если он до 10
str_pad($month, 2, '0', STR_PAD_LEFT);

  // коды для ВО
echo '<script>window.opener.location.reload(1); window.close(); </script>';

$s = <<<EOT
<form method="GET">
  <input type='hidden' name='id' value='$button_id'> 
  <input type='hidden' name='line_id' value='$ID'>  
  <h3>Заголовок</h3>
  <input type='date' min='$today' name='date' value='$tomorrow'>
  <input type='submit' value='Записать'>
</form>
EOT;
echo $s;

  // загрузка вышестоящего поля из нижестоящего в подтаблице
if (!$line['Категория']['raw'] && $line['Прайс-лист']['raw'] && $line['Прайс-лист']['Категория']['raw']) $line['Категория'] = $line['Прайс-лист']['Категория']['raw'];

  // форматирование телефонов
foreach (explode(',',$line['Телефон']) as $index=>$phone) if ($phone) $phones[$index] = ($p=SetNumber($phone)) ? : $phone;
$line['Телефон'] = implode(', ', $phones);
  

  // универсальный код полного удаления записи и всех ссылающихся на неё записей
  // получаем все таблицы, ссылающиеся на данную таблицу
$res = sql_query("SELECT id, table_id FROM ".$config['table_prefix']."fields WHERE type_field=5 AND type_value LIKE '".$table_id."|%'");
while ($row=sql_fetch_assoc($res)) data_delete($row['table_id'], EVENTS_ENABLE, "f".$row['id']."=$ID");
  // удаляем теперь саму запись
data_delete($table_id, EVENTS_ENABLE, "id=$ID");
  // информирование и переход в таблицу
display_notification('Запись успешно удалена!',3);
header('Location: fields.php?table='.$table_id);


  // перевод справочника в галочки поля-мультисписка
  // удаляемую строку исключаем и снимаем отметки по ней
if ('delete'==$event['type'] || $line['Статус записи']) {
  $c = " AND id<>'".$ID."' ";
  SetCheckList(0, 'f5151', "f5151 LIKE '%".$line['Потребность']."%'", [$line['Потребность']], 'delete');
}
  // составляем новый список вариантов выбора
$e = GetArrayFromTable(0, 'f5141', "status=0 {$c} ORDER BY f5141");
$body = implode("\r\n", $e);
sql_query("UPDATE ".FIELDS_TABLE." SET type_value='".$body."' WHERE id=5151 AND table_id=291 LIMIT 1");
  // если переименовали строку, заменяем галочки
if ($event['changed'][5141] && $event['changed'][5141]['old']) SetCheckList(0, 'f5151', "f5151 LIKE '".$event['changed'][5141]['old']."'", [$line['Потребность']], [$event['changed'][5141]['old']]);

  
  // пример бэкенд кода для работы с JS функцией SetValue
$tableId =intval($_REQUEST['tableId']);
$fieldId = form_input($_REQUEST['fieldId']);
$lineId = intval($_REQUEST['lineId']);
$value  = form_input($_REQUEST['value']);
$value2  = form_input($_REQUEST['value2']);
$default = form_input($_REQUEST['default']);
$unique = form_input($_REQUEST['unique']);
if ($tableId && $fieldId && $lineId) {
  $time = time();
    // тип поля
  $e = sql_fetch_assoc(sql_query("SELECT type_field, type_value, mult_value FROM ".FIELDS_TABLE." WHERE id='".intval(preg_replace('/\D/i','',$fieldId))."' LIMIT 1"));
    // форматируем пришедшее значение под тип поля значение
    // даты
  if (2==$e['type_field']) $value = (!IsNullDate($value))   ?   date('Y-m-d H:i:s',strtotime($value))   :   NULL_DATETIME;
    // если новая строка, сначала создаём её
  if (-1==$lineId) {
    $ins = [];
    $ins['status'] = 0;
      // проверка полей при создании по умолчанию
    if ($default && 'undefined'!=$default) {
      foreach (explode(",",$default) as $tmp) if (($tmp2=explode("=",$tmp)) && 2==count($tmp2)) $ins[$tmp2[0]] = $tmp2[1];
      if ($unique) {
        $cond = '';
        if ('undefined'!=$unique) foreach (explode(",",$unique) as $field) $cond .= " AND ".$field."='".$ins[$field]."' ";
        if ($cond) {
          $e = sql_fetch_assoc(data_select_field($tableId, 'id', "status=0 {$cond} LIMIT 1"));
          if ($e['id']) $lineId = $e['id'];
        }
      }
    }
    if (-1==$lineId) $lineId = data_insert($tableId, EVENTS_ENABLE, $ins);
    $echo['id'] = $lineId;
  }
    // сохраняем значение поля
    // мультисписки
  if (4==$e['type_field'] && 1==$e['mult_value'] && $value2) {
    if ($value) SetCheckList(0, $fieldId, $lineId, $value2);
    else SetCheckList(0, $fieldId, $lineId, $value2, 'delete');
    $echo['result'] = "ok";
  }
    // остальные поля
  else {
    data_update($tableId, EVENTS_ENABLE, [$fieldId=>$value], "id=$lineId LIMIT 1");
    $echo['result'] = "ok";
  }
  $time2 = time();
  if ($time2>$time) $echo['timing'] = intval($time2-$time);
  if ($echo) echo json_encode($echo, JSON_UNESCAPED_UNICODE); 
  exit;
}
