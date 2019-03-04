  // примеры кода для CRM Clientbase

  
  
  
  // установка трубки для коллбэков через JS
if (phone=document.getElementById('view_cell_{$one_field.id}')) {
  var phones = phone.innerText.split(',');
  phone.innerHTML = '';
  phones.forEach(function(item) { phone.innerHTML += item + '<span><img src="https://clientbasepro.ru/Customization/images/phone.png" class="calling" onclick="MakeCall('+item.replace(/\D/g,'')+',0,0,0,this)"; </span>'; });
}  
  
  
  // скрытие пустого поля в карточке средствами JS
display_field({$one_field.id}, $('#view_cell_{$one_field.id}').text()!="");
display_field({$one_field.id}, $('#view_cell_{$one_field.id}').text()!="0");
display_field({$one_field.id}, $('#view_cell_{$one_field.id}').text()!="0,00");


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











