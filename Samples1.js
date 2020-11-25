  // примеры кода для CRM Clientbase

  
  
  
  // установка трубки для коллбэков через JS
if (phone=document.getElementById('view_cell_{$one_field.id}')) {
  var phones = phone.innerText.split(',');
  phone.innerHTML = '';
  phones.forEach(function(item) { if(item) phone.innerHTML += item + '<span><img src="https://clientbasepro.ru/Customization/images/phone.png" class="calling" onclick="MakeCall('+item.replace(/\D/g,'')+',0,0,0,this)"; </span>,'; });
}

var phone = document.getElementById('view_cell_{$one_field.id}');
var phone_array = phone.innerText.split(',');
new_phone = new Array();
var item_r;
phone_array.forEach(function(item, i, arr) {
        item_r = item.replace(/\D/g, '');
        new_phone[i] = '<div style="display:inline;">'
                        + item
                        + '<img src="images/phone_icon1.png" title="Позвонить со своего внутреннего" height="16" width="16" style="margin-left:3px;cursor:pointer; margin-top:0px; vertical-align:bottom;" onclick="make_call_telphin('+item_r+')";>'
                        + '<img src="images/mobile_phone.png" title="Позвонить со своего мобильного" height="16" width="16" style="margin-left:3px; cursor:pointer; margin-top:0px; vertical-align:bottom;" onclick="make_call_telphin('+item_r+',1)";></div> ';
    });
phone.innerHTML = new_phone.join();
  
  // обнуление поля при установке курсора, если в поле было 0 с ведущими нулями
if (el=document.getElementById('value{$one_field.id}')) el.onclick = function() { if('0,00'==this.value)this.value=''; }
if (el=document.getElementById('view_cell_{$one_field.id}')) el.onclick = function() { if('0,00'==this.value)this.value=''; }
  
  
  // скрытие пустого поля в карточке средствами JS
display_field({$one_field.id}, $('#view_cell_{$one_field.id}').text()!="");
display_field({$one_field.id}, $('#view_cell_{$one_field.id}').text()!="0");
display_field({$one_field.id}, $('#view_cell_{$one_field.id}').text()!="0,00");

  // скрытие фильтра с 0 кол-вом строк в нём
if ((a=document.querySelector('a[href="fields.php?table=XXX&filter=YYY"]'))&&a.text&&-1!=a.text.indexOf('(0)')) a.style.display='none';

    // АДРЕС
$("#value{$one_field.id}").suggestions({
    serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
    token: "****",
    type: "ADDRESS",
    count: 5,
    formatSelected: function (suggestions) { return suggestions.value || ""; }
});

	// БАНК
$("#value{$one_field.id}").suggestions({
    serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
    token: "****",
    type: "BANK",
    count: 5,
    formatSelected: function (suggestion) { 
        if ((el=document.getElementById("value4957")) && suggestion.data.name && suggestion.data.name.short) el.value = suggestion.data.name.short;
        if ((el=document.getElementById("value4977")) && suggestion.data.correspondent_account) el.value = suggestion.data.correspondent_account;
        return suggestion.data.bic || ""; 
    }
});

    // РЕКВИЗИТЫ
$("#value{$one_field.id}").suggestions({
    serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
    token: "****",
    type: "PARTY",
    count: 5,
    formatSelected: function (suggestion) {  
        if (el=document.getElementById("value790") && suggestion.data.address.unrestricted_value) el.value = suggestion.data.address.unrestricted_value;
        if (el=document.getElementById("value690") && suggestion.data.address.unrestricted_value) el.value = suggestion.data.address.unrestricted_value;
        if (el=document.getElementById("value800") && suggestion.data.ogrn) el.value = suggestion.data.ogrn;
        if (el=document.getElementById("value810") && suggestion.data.inn) el.value = suggestion.data.inn;
        if (el=document.getElementById("value660") && suggestion.unrestricted_value) el.value = suggestion.unrestricted_value;
        if (el=document.getElementById("value820") && suggestion.data.kpp) el.value = suggestion.data.kpp;
        if (el=document.getElementById("value880") && suggestion.data.management && suggestion.data.management.name) el.value = suggestion.data.management.name;
        return suggestion.unrestricted_value || "";
    }
});


  // скрытие групп полей для ФЛ/ЮЛ
function SetAccountType () {
    var v = document.getElementById("value{$one_field.id}");
    var vc = document.getElementById("view_cell_{$one_field.id}");
    var edit = ((edit=document.getElementById('edit_block')) && 'none'!=edit.style.display) ? 1 : 0;
    var type = 0;
    if ((edit && v && 'ФЛ'==v.value) || (!edit && vc && ('ФЛ'==vc.value || 'ФЛ'==vc.innerText))) type = 1;
    else if ((edit && v && 'ЮЛ'==v.value) || (!edit && vc && ('ЮЛ'==vc.value || 'ЮЛ'==vc.innerText))) type = 2;
    if (type) {
        if (1==type) {
            display_fgroup(31, 0);
            display_fgroup(51, 0);
            display_fgroup(21, 1);
            return 1;
        }
        else if (2==type) {
            display_fgroup(31, 1);
            display_fgroup(51, 1);
            display_fgroup(21, 0);
            return 2;
        }        
    }
    return false;   
}

$(document).ready(SetAccountType);
$('#value{$one_field.id}').change(SetAccountType);
$('#view_cell_{$one_field.id}').change(SetAccountType);
calc.calcFunctions.push(SetAccountType);






