  // примеры кода для CRM Clientbase

  
  
  
  // установка трубки для коллбэков через JS
if (phone=document.getElementById('view_cell_{$one_field.id}')) {
  var phones = phone.innerText.split(',');
  phone.innerHTML = '';
  phones.forEach(function(item) { if(item) phone.innerHTML += item + '<span><img src="https://clientbasepro.ru/Customization/images/phone.png" class="calling" onclick="MakeCall('+item.replace(/\D/g,'')+',0,0,0,this)"; </span>,'; });
}  
  
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
$("#value690").suggestions({
    serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
    token: "****",
    type: "ADDRESS",
    count: 5,
    formatSelected: function (suggestions) { return suggestions.value || ""; }
});

	// БАНК
$("#value4967").suggestions({
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
$("#value780").suggestions({
    serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
    token: "****",
    type: "PARTY",
    count: 5,
    formatSelected: function (suggestion) {  
        if (document.getElementById("value790") && suggestion.data.address.unrestricted_value) document.getElementById("value790").value = suggestion.data.address.unrestricted_value;
        if (document.getElementById("value690") && suggestion.data.address.unrestricted_value) document.getElementById("value690").value = suggestion.data.address.unrestricted_value;
        if (document.getElementById("value800") && suggestion.data.ogrn) document.getElementById("value800").value = suggestion.data.ogrn;
        if (document.getElementById("value810") && suggestion.data.inn) document.getElementById("value810").value = suggestion.data.inn;
        if (document.getElementById("value660") && suggestion.unrestricted_value) document.getElementById("value660").value = suggestion.unrestricted_value;
        if (document.getElementById("value820") && suggestion.data.kpp) document.getElementById("value820").value = suggestion.data.kpp;
        if (document.getElementById("value880") && suggestion.data.management && suggestion.data.management.name) document.getElementById("value880").value = suggestion.data.management.name;
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






