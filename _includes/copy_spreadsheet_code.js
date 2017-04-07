/******************************************************************************
 * This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
 * But has been simplified and cleaned up to make it more beginner friendly   *
 * All credit still goes to Martin and any issues/complaints/questions to me. *
 ******************************************************************************/


var TO_ADDRESS = "arthur.koenigs@gmail.com";

function formatMailBody(obj) { // function to spit out all the keys/values from the form in HTML
  var result = "";
  for (var key in obj) { // loop over the object passed to the function
    result += "<h3 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h3><div>" + obj[key] + "</div>";
    // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value,
    // and append it to the `result` string created at the start.
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    record_data(e);

    var mailData = e.parameters; // just create a slightly nicer variable name for the data

    var calendarTitle = String(mailData.gtitle).split(' ').join('+');
     var calendarHourBegin = String(mailData.hourstart);
     var calendarHourEnd = String(mailData.hourend);
     var calendarDate = String(mailData.date).replace(/\//g, '');
     var calendarInfo = 'Pour plus de renseignements, rendez-vous sur yoga-rires.fr ou contactez-nous via contact@yoga-rires.fr';
     var calendarInfoStripped = String(calendarInfo).replace(" ", "+");
     var calendarAddress = String(mailData.adresse).split(' ').join('+');

     var calendarData = '"https://calendar.google.com/calendar/render?action=TEMPLATE&text='+(calendarTitle)+'&dates='+(calendarDate)+(calendarHourBegin)+'/'+(calendarDate)+(calendarHourEnd)+'&details='+(calendarInfo)+'&location='+(calendarAddress)+'&sf=true&output=xml" ';

     var buttonStyle = ' style="font-size:16px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block"><span style="color: #FFFFFF">';

     var calendarButton = '<table cellspacing="0" cellpadding="0"><tr><td align="center" width="300" height="40" bgcolor="#40C3BD" style="-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; color: #ffffff; display: block;"> <a href= '+(calendarData)+ 'target="_blank"' + (buttonStyle) + ' Ajouter à mon agenda </span></a></td></tr></table>';

    function displayMessage() {
      if (typeof mailData.message !== 'undefined'){
        return '<div style="color: #777777"><b>Votre message : </b> <i>' + mailData.message + '</i></div>'
      }
    }


    MailApp.sendEmail({
      to: TO_ADDRESS,
      name: 'Rires Éveillés',
      subject: 'Inscription cours Yoga du Rire',
      replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
      htmlBody: "<h2> Bonjour " + (mailData.name) + " !</h2><br> Merci pour votre inscription au cours de <b>Rires Éveillés</b> <br><br> <h3>" + (mailData.cours) + " :</h3> <b>Adresse :</b> " + (mailData.adresse) + "<br><br><b>Date du cours : </b>" + (mailData.date) + " " + (mailData.heure) + '<br><br>' + (calendarButton) + '<h3> Vous allez rire ! </h3><br> <a href="http://yoga-rires.fr/" target="_blank"><i>Rires Éveillés</i></a> <br><br>' + (displayMessage()),
      cc: String(mailData.email)
    });

    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * record_data inserts the data received from the html form submission
 * e is the data received from the POST
 */
function record_data(e) {
  Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName('reponses'); // select the responses sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row     = [ new Date() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(e);
  }
  finally {
    return;
  }

}
