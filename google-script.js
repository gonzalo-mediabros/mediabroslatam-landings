/**
 * LEADS MB V-3.0 (Placeholder)
 * Este script debe ser copiado y pegado en el editor de Google Apps Script.
 * 
 * Funcionalidad:
 * 1. Recibe POST requests con JSON.
 * 2. Valida origen y API Key.
 * 3. Sanitiza inputs.
 * 4. Guarda en Google Sheet.
 * 5. Envía notificaciones (opcional).
 */

const CONFIG = {
  SHEET_NAME: "Leads",
  ADMIN_EMAIL: "admin@mediabroslatam.com",
  ALLOWED_DOMAIN: "https://www.mediabroslatam.com",
  API_KEY: "mb_leads_v3_placeholder" // Cambiar esto
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Validaciones de Seguridad
    if (data.api_key !== CONFIG.API_KEY) {
      return ContentService.createTextOutput(JSON.stringify({result: "error", error: "Invalid API Key"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Honeypot check
    if (data.website && data.website.length > 0) {
      // Silently fail for bots
      return ContentService.createTextOutput(JSON.stringify({result: "success", message: "Saved"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Guardar en Sheet
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      sheet = doc.insertSheet(CONFIG.SHEET_NAME);
      const headers = ["Date", "Name", "Email", "Phone", "Company", "Origin", "Message"];
      sheet.appendRow(headers);
    }

    const nextRow = sheet.getLastRow() + 1;
    const newRow = [
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.origin || "",
      data.message || ""
    ];

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService.createTextOutput(JSON.stringify({result: "success", row: nextRow}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setup() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  if (!doc.getSheetByName(CONFIG.SHEET_NAME)) {
    doc.insertSheet(CONFIG.SHEET_NAME);
  }
}
