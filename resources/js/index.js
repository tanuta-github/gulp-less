Inputmask().mask(document.querySelectorAll("input"))

const calendar = el => {
    if (!el) return
    myCalendar = jsCalendar.new(el)
    myCalendar.onDateClick(function(event, date){
       event.target.closest('div').previousElementSibling.value=jsCalendar.tools.dateToString(date, 'DD.MM.YYYY', 'ru')
       myCalendar.set(date)
    })
}
calendar(document.getElementById("calendar"))

//const choices = new Choices(document.querySelector('select'))
var swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    touchRatio: 0.1,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
    })