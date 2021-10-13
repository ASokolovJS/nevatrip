// id: "6164288af7dedb1b6a5139ac", //уникальный id который присваивается при создании заказа (Id взят для наглядности)
// barcode: Date.now()  // Генерируется автоматически на основе количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC, в виде (1633954585626), Что исключает присваивание одного и того же номера разным заказам.

[
  {                                        //Вид одного заказа
    id: "6164288af7dedb1b6a5139ac", 
    eventId: eventId,
    eventDate: eventDate,
    ticketAdultPrice: ticketAdultPrice,
    ticketAdultQuantity: [{                 //свойством .length получим длину массива объектов, что и будет являться кол-вом купленных билетов
      id: "6164288af7dedb1b6a5139ac", 
      barcode: Date.now()  
    }],
    ticketKidPrice: ticketKidPrice,
    ticketKidQuantity: [{ 
      id: "6164288af7dedb1b6a5139ac", 
      barcode: Date.now()  
    }],
                                            // При соблюдении условия, что необходимо добавлять к заказу доп. категории билетов
    ticketPreferential: [{
      title: "",
      price: "",
      id: "6164288af7dedb1b6a5139ac", 
      barcode: Date.now()  
    }],
    ticketGroup: [{
      title: "",
      price: "",
      id: "6164288af7dedb1b6a5139ac", 
      barcode: Date.now()  
    }],
    barcode: Date.now(), 
    equalPrice: equalPrice,
    created: new Date()
  }
]