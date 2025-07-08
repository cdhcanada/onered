// Google Apps Script code for handling Red1One orders and product requests
// نظام مبسط بدون إشعارات - يعمل مع الجدول الموجود
// Spreadsheet ID: 1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const requestData = data.data;
    
    if (action === 'submitOrder') {
      return handleOrder(requestData);
    } else if (action === 'requestProduct') {
      return handleProductRequest(requestData);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleOrder(orderData) {
  try {
    // Open the specific spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById('1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA');
    let ordersSheet = spreadsheet.getSheetByName('Orders');
    
    if (!ordersSheet) {
      ordersSheet = spreadsheet.insertSheet('Orders');
      // Add headers
      const headers = [
        'Order ID',
        'Order Date',
        'Customer Name',
        'Email',
        'Phone',
        'State',
        'Address',
        'Products',
        'Total USD',
        'Total DZD',
        'Notes',
        'Status'
      ];
      ordersSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = ordersSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // Check if headers exist, if not add them
    const firstRow = ordersSheet.getRange(1, 1, 1, 12).getValues()[0];
    if (!firstRow[0] || firstRow[0] === '') {
      const headers = [
        'Order ID',
        'Order Date',
        'Customer Name',
        'Email',
        'Phone',
        'State',
        'Address',
        'Products',
        'Total USD',
        'Total DZD',
        'Notes',
        'Status'
      ];
      ordersSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = ordersSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // Prepare products string
    const productsString = orderData.items.map(item => 
      `${item.nameAr} (${item.name}) - Qty: ${item.quantity} - Price: ${item.priceInDZD} DZD - Platform: ${item.platform}`
    ).join('\n');
    
    // Add new row
    const newRow = [
      orderData.orderId,
      new Date(orderData.orderDate),
      orderData.name,
      orderData.email,
      orderData.phone,
      orderData.state,
      orderData.address,
      productsString,
      orderData.total,
      orderData.totalInDZD,
      orderData.notes || '',
      'New'
    ];
    
    ordersSheet.appendRow(newRow);
    
    // Auto-resize columns
    ordersSheet.autoResizeColumns(1, newRow.length);
    
    // Format the new row
    const lastRow = ordersSheet.getLastRow();
    const dataRange = ordersSheet.getRange(lastRow, 1, 1, newRow.length);
    dataRange.setBorder(true, true, true, true, true, true);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderId: orderData.orderId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error handling order:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleProductRequest(requestData) {
  try {
    // Open the specific spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById('1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA');
    let requestsSheet = spreadsheet.getSheetByName('ProductRequests');
    
    if (!requestsSheet) {
      requestsSheet = spreadsheet.insertSheet('ProductRequests');
      // Add headers
      const headers = [
        'Request ID',
        'Request Date',
        'Product Name',
        'Product URL',
        'Product Description',
        'Customer Name',
        'Email',
        'Phone',
        'State',
        'Address',
        'Notes',
        'Status',
        'Suggested Price'
      ];
      requestsSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = requestsSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // Check if headers exist, if not add them
    const firstRow = requestsSheet.getRange(1, 1, 1, 13).getValues()[0];
    if (!firstRow[0] || firstRow[0] === '') {
      const headers = [
        'Request ID',
        'Request Date',
        'Product Name',
        'Product URL',
        'Product Description',
        'Customer Name',
        'Email',
        'Phone',
        'State',
        'Address',
        'Notes',
        'Status',
        'Suggested Price'
      ];
      requestsSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = requestsSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // Add new row
    const newRow = [
      requestData.requestId,
      new Date(requestData.requestDate),
      requestData.productName,
      requestData.productUrl,
      requestData.productDescription || '',
      requestData.name,
      requestData.email,
      requestData.phone,
      requestData.state,
      requestData.address,
      requestData.notes || '',
      'New',
      '' // Suggested Price - to be filled manually
    ];
    
    requestsSheet.appendRow(newRow);
    
    // Auto-resize columns
    requestsSheet.autoResizeColumns(1, newRow.length);
    
    // Format the new row
    const lastRow = requestsSheet.getLastRow();
    const dataRange = requestsSheet.getRange(lastRow, 1, 1, newRow.length);
    dataRange.setBorder(true, true, true, true, true, true);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, requestId: requestData.requestId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error handling product request:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the setup
function testSetup() {
  const testOrder = {
    orderId: 'TEST' + Date.now(),
    orderDate: new Date().toISOString(),
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '0123456789',
    state: 'Algiers',
    address: 'Test Address',
    items: [
      {
        nameAr: 'منتج تجريبي',
        name: 'Test Product',
        quantity: 1,
        priceInDZD: 2600,
        platform: 'aliexpress'
      }
    ],
    total: 10,
    totalInDZD: 2600,
    notes: 'This is a test order'
  };
  
  return handleOrder(testOrder);
}

// Function to test product request
function testProductRequest() {
  const testRequest = {
    requestId: 'REQ' + Date.now(),
    requestDate: new Date().toISOString(),
    productName: 'Test Product Request',
    productUrl: 'https://example.com/product',
    productDescription: 'Test product description',
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '0123456789',
    state: 'Algiers',
    address: 'Test Address',
    notes: 'Test notes'
  };
  
  return handleProductRequest(testRequest);
}

// Function to setup headers if they don't exist
function setupHeaders() {
  try {
    const spreadsheet = SpreadsheetApp.openById('1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA');
    
    // Setup Orders sheet
    let ordersSheet = spreadsheet.getSheetByName('Orders');
    if (ordersSheet) {
      const headers = [
        'Order ID',
        'Order Date',
        'Customer Name',
        'Email',
        'Phone',
        'State',
        'Address',
        'Products',
        'Total USD',
        'Total DZD',
        'Notes',
        'Status'
      ];
      ordersSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      const headerRange = ordersSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // Setup ProductRequests sheet
    let requestsSheet = spreadsheet.getSheetByName('ProductRequests');
    if (requestsSheet) {
      const headers = [
        'Request ID',
        'Request Date',
        'Product Name',
        'Product URL',
        'Product Description',
        'Customer Name',
        'Email',
        'Phone',
        'State',
        'Address',
        'Notes',
        'Status',
        'Suggested Price'
      ];
      requestsSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      const headerRange = requestsSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    console.log('Headers setup completed successfully');
    return 'Headers setup completed successfully';
    
  } catch (error) {
    console.error('Error setting up headers:', error);
    return 'Error: ' + error.toString();
  }
}