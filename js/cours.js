// js for maison-verte.md

function getFirstAndThirdWed(year, month){
    // Convert date to moment (month 0-11)
    var myMonth = moment({year: year, month: month});
    // Get first Wednesday of the first week of the month
    var firstWednesday = myMonth.weekday(3);
    // Check if first Wednesday is in the given month
    if( firstWednesday.month() != month ){
        firstWednesday.add(1, 'weeks');
    }
    // Get 3rd Wednesday of the month
    var third = firstWednesday.clone().add(2, 'weeks');
    return [firstWednesday, third];
}

$('.maison-verte').datetimepicker({
  locale: 'fr',
  useCurrent: false,
  enabledDates: getFirstAndThirdWed(moment().year(), moment().month()),
  format: "dddd LL",
  icons: {
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
  },
  minDate: moment(),
}).on("dp.update", function (e) {
  if( e.viewDate ){
    var enabledDates = getFirstAndThirdWed(e.viewDate.year(), e.viewDate.month());
    $('.maison-verte').data("DateTimePicker").enabledDates(enabledDates);
  }
});

// js for barbara.md

$(function () {
       $('.barbara').datetimepicker({
           locale: 'fr',
           useCurrent: false,
           daysOfWeekDisabled: [0,1,2,3,4,6],
           format: "dddd LL",
           minDate: moment(),
           icons: {
             previous: 'fa fa-chevron-left',
             next: 'fa fa-chevron-right',
           }
       });
   });
