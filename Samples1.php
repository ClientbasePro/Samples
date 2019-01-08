<?php

  // примеры кода для CRM Clientbase

  
  
  
  // форматирование поля для телефона
$p = explode(',', $line['Телефон']);
foreach ($p as $phone) $phones[] = ($p_=SetNumber($phone)) ? $p_ : $phone;
$line['Телефон'] = implode(',', $phones);  

  
  // уведомление аналог JS alert, работающее даже в подтаблице
calc_alerts($text);


  // суммирование из подтаблицы
if ('delete'==$event['type'] || $line['Статус записи']) $c = " AND id!='".$ID."' ";
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
  <input type="date" min="$today" name="date" value='$tomorrow'>
  <input type="submit" value="Записать">
</form>
EOT;
echo $s;

  // загрузка вышестоящего поля из нижестоящего в подтаблице
if (!$line['Категория']['raw'] && $line['Прайс-лист']['raw'] && $line['Прайс-лист']['Категория']['raw']) $line['Категория'] = $line['Прайс-лист']['Категория']['raw'];



  
  
  
?>