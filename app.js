const express = require('express')
const mongoose = require('mongoose');
const request = require('request')
const tableEvent = require('./model/tableEvent')
const keys = require('./keys/key')

const app = express()

app.use(express.urlencoded({extended: true}));

async function addTableEvent(
  eventId, 
  eventDate, 
  ticketAdultPrice,
  ticketAdultQuantity,
  ticketKidPrice,
  ticketKidQuantity,
  ticketPreferential,
  ticketGroup) {
  const equalPrice = (ticketAdultPrice * ticketAdultQuantity) + (ticketKidPrice * ticketKidQuantity ) // Получаем общую сумму заказа
  let event = new tableEvent({                // Создаем новый заказ
    eventId: eventId,
    eventDate: eventDate,
    ticketAdultPrice: ticketAdultPrice,
    ticketAdultQuantity: ticketAdultQuantity,
    ticketKidPrice: ticketKidPrice,
    ticketKidQuantity: ticketKidQuantity,
    ticketPreferential: ticketPreferential,   // По умолчанию значение пустой массив
    ticketGroup: ticketGroup,                 // По умолчанию значение пустой массив
    barcode: Date.now(),
    equalPrice: equalPrice,
    created: new Date()
 })

  request.post({                               // Запрашиваем бронирование
    url: 'https://api.site.com/book', 
    form: {
      eventId: event.eventId,
      eventDate: event.eventDate,
      ticketAdultPrice: event.ticketAdultPrice,
      ticketAdultQuantity: event.ticketAdultQuantity,
      ticketKidPrice: event.ticketKidPrice,
      ticketKidQuantity: event.ticketKidQuantity,
      barcode: event.barcode,
    },
  },
    (err, res, body) => {
    if(body == "order successfully booked" )    //После успешной брони, запрашиваем подтверджение
      request.post({
        url: 'https://api.site.com/approve', 
        form: {
          barcode: event.barcode,
        },
      },
        async (err, res, body) => {
        if(body == "order successfully aproved" ){
          await event.save()                    //В случаии успеха сохраняем в БД
        }else{
          res.send(err);                        //Отлавливаем ошибки
        }
        }
      )
    }
  )
}

app.get('/', async (req, res) => {
  const event = await tableEvent.find()
  res.send(event)
})

const PORT = process.env.PORT || 3000;

async function start(){
  try{
    await mongoose.connect(keys.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    })
  }catch (err) {
    console.log(err);
  }
}

start()