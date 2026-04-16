function doPost(e) {
  try {
    // Parse the form data
    var formData = e.parameter;
    var files = e.files; // For file uploads

    // Open the Google Sheet
    var sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();

    // Prepare the row data
    var rowData = [];
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    headers.forEach(function(header) {
      if (formData[header]) {
        rowData.push(formData[header]);
      } else {
        rowData.push("");
      }
    });

    // Handle file uploads
    if (files) {
      var folder = DriveApp.getFolderById("YOUR_FOLDER_ID");
      Object.keys(files).forEach(function(key) {
        var blob = files[key];
        var file = folder.createFile(blob);
        var fileUrl = file.getUrl();
        rowData.push(fileUrl);
      });
    }

    // Append the row to the sheet
    sheet.appendRow(rowData);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log("Error: " + error.message);
    return ContentService.createTextOutput("Error: " + error.message).setMimeType(ContentService.MimeType.TEXT);
  }
}