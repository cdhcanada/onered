// Google Apps Script code for handling Red1One orders and product requests
// كود محدث لحل مشكلة عدم وصول البيانات
// Spreadsheet ID: 1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA

function doGet(e) {
  return ContentService
    .createTextOutput('Red1One API is working! ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    console.log('📥 تم استلام طلب POST');
    console.log('📋 محتوى الطلب:', e);
    
    let data, action, requestData;
    
    // التعامل مع أنواع مختلفة من البيانات
    if (e.postData && e.postData.contents) {
      // JSON data
      try {
        data = JSON.parse(e.postData.contents);
        action = data.action;
        requestData = data.data;
      } catch (jsonError) {
        console.log('❌ خطأ في تحليل JSON، جاري المحاولة مع FormData');
      }
    }
    
    // إذا لم ينجح JSON، جرب FormData
    if (!action && e.parameter) {
      action = e.parameter.action;
      if (e.parameter.data) {
        try {
          requestData = JSON.parse(e.parameter.data);
        } catch (parseError) {
          requestData = e.parameter.data;
        }
      }
    }
    
    console.log('🎯 العملية المطلوبة:', action);
    console.log('📊 البيانات:', requestData);
    
    if (action === 'submitOrder') {
      return handleOrder(requestData);
    } else if (action === 'requestProduct') {
      return handleProductRequest(requestData);
    } else if (action === 'test') {
      return ContentService
        .createTextOutput('Test successful! ✅')
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    return ContentService
      .createTextOutput('❌ عملية غير صحيحة: ' + action)
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('❌ خطأ عام:', error);
    return ContentService
      .createTextOutput('❌ خطأ: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function handleOrder(orderData) {
  try {
    console.log('🛒 معالجة طلب الشراء');
    
    // فتح الجدول المحدد
    const spreadsheet = SpreadsheetApp.openById('1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA');
    let ordersSheet = spreadsheet.getSheetByName('Orders');
    
    // إنشاء الصفحة إذا لم تكن موجودة
    if (!ordersSheet) {
      console.log('📄 إنشاء صفحة Orders جديدة');
      ordersSheet = spreadsheet.insertSheet('Orders');
    }
    
    // إضافة العناوين إذا لم تكن موجودة
    const headers = [
      'Order ID', 'Order Date', 'Customer Name', 'Email', 'Phone', 
      'State', 'Address', 'Products', 'Total USD', 'Total DZD', 'Notes', 'Status'
    ];
    
    const firstRow = ordersSheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (!firstRow[0] || firstRow[0] === '') {
      console.log('📝 إضافة العناوين');
      ordersSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // تنسيق العناوين
      const headerRange = ordersSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // تحضير نص المنتجات
    const productsString = orderData.items ? orderData.items.map(item => 
      `${item.nameAr || item.name} - الكمية: ${item.quantity} - السعر: ${item.priceInDZD} دج - المنصة: ${item.platform}`
    ).join('\n') : 'لا توجد منتجات';
    
    // إضافة صف جديد
    const newRow = [
      orderData.orderId || 'ORDER_' + Date.now(),
      new Date(orderData.orderDate || Date.now()),
      orderData.name || '',
      orderData.email || '',
      orderData.phone || '',
      orderData.state || '',
      orderData.address || '',
      productsString,
      orderData.total || 0,
      orderData.totalInDZD || 0,
      orderData.notes || '',
      'جديد'
    ];
    
    console.log('➕ إضافة صف جديد:', newRow);
    ordersSheet.appendRow(newRow);
    
    // تنسيق الصف الجديد
    const lastRow = ordersSheet.getLastRow();
    const dataRange = ordersSheet.getRange(lastRow, 1, 1, newRow.length);
    dataRange.setBorder(true, true, true, true, true, true);
    
    // تغيير حجم الأعمدة تلقائياً
    ordersSheet.autoResizeColumns(1, newRow.length);
    
    console.log('✅ تم حفظ الطلب بنجاح');
    
    return ContentService
      .createTextOutput('✅ تم حفظ الطلب بنجاح - ID: ' + (orderData.orderId || 'ORDER_' + Date.now()))
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('❌ خطأ في معالجة الطلب:', error);
    return ContentService
      .createTextOutput('❌ خطأ في حفظ الطلب: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function handleProductRequest(requestData) {
  try {
    console.log('🔍 معالجة طلب منتج');
    
    // فتح الجدول المحدد
    const spreadsheet = SpreadsheetApp.openById('1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA');
    let requestsSheet = spreadsheet.getSheetByName('ProductRequests');
    
    // إنشاء الصفحة إذا لم تكن موجودة
    if (!requestsSheet) {
      console.log('📄 إنشاء صفحة ProductRequests جديدة');
      requestsSheet = spreadsheet.insertSheet('ProductRequests');
    }
    
    // إضافة العناوين إذا لم تكن موجودة
    const headers = [
      'Request ID', 'Request Date', 'Product Name', 'Product URL', 'Product Description',
      'Customer Name', 'Email', 'Phone', 'State', 'Address', 'Notes', 'Status', 'Suggested Price'
    ];
    
    const firstRow = requestsSheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (!firstRow[0] || firstRow[0] === '') {
      console.log('📝 إضافة العناوين');
      requestsSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // تنسيق العناوين
      const headerRange = requestsSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#dc2626');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // إضافة صف جديد
    const newRow = [
      requestData.requestId || 'REQ_' + Date.now(),
      new Date(requestData.requestDate || Date.now()),
      requestData.productName || '',
      requestData.productUrl || '',
      requestData.productDescription || '',
      requestData.name || '',
      requestData.email || '',
      requestData.phone || '',
      requestData.state || '',
      requestData.address || '',
      requestData.notes || '',
      'جديد',
      '' // السعر المقترح - يتم ملؤه يدوياً
    ];
    
    console.log('➕ إضافة طلب منتج جديد:', newRow);
    requestsSheet.appendRow(newRow);
    
    // تنسيق الصف الجديد
    const lastRow = requestsSheet.getLastRow();
    const dataRange = requestsSheet.getRange(lastRow, 1, 1, newRow.length);
    dataRange.setBorder(true, true, true, true, true, true);
    
    // تغيير حجم الأعمدة تلقائياً
    requestsSheet.autoResizeColumns(1, newRow.length);
    
    console.log('✅ تم حفظ طلب المنتج بنجاح');
    
    return ContentService
      .createTextOutput('✅ تم حفظ طلب المنتج بنجاح - ID: ' + (requestData.requestId || 'REQ_' + Date.now()))
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('❌ خطأ في معالجة طلب المنتج:', error);
    return ContentService
      .createTextOutput('❌ خطأ في حفظ طلب المنتج: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// دالة اختبار لتجربة النظام
function testConnection() {
  console.log('🧪 اختبار الاتصال');
  
  const testOrder = {
    orderId: 'TEST_' + Date.now(),
    orderDate: new Date().toISOString(),
    name: 'عميل تجريبي',
    email: 'test@example.com',
    phone: '0123456789',
    state: 'الجزائر',
    address: 'عنوان تجريبي',
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
    notes: 'هذا طلب تجريبي'
  };
  
  return handleOrder(testOrder);
}

// دالة اختبار طلب منتج
function testProductRequest() {
  console.log('🧪 اختبار طلب منتج');
  
  const testRequest = {
    requestId: 'REQ_TEST_' + Date.now(),
    requestDate: new Date().toISOString(),
    productName: 'منتج تجريبي مطلوب',
    productUrl: 'https://example.com/product',
    productDescription: 'وصف المنتج التجريبي',
    name: 'عميل تجريبي',
    email: 'test@example.com',
    phone: '0123456789',
    state: 'الجزائر',
    address: 'عنوان تجريبي',
    notes: 'ملاحظات تجريبية'
  };
  
  return handleProductRequest(testRequest);
}

// دالة لإعداد العناوين يدوياً
function setupSheetsManually() {
  try {
    const spreadsheet = SpreadsheetApp.openById('1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA');
    
    // إعداد صفحة الطلبات
    let ordersSheet = spreadsheet.getSheetByName('Orders');
    if (!ordersSheet) {
      ordersSheet = spreadsheet.insertSheet('Orders');
    }
    
    const orderHeaders = [
      'Order ID', 'Order Date', 'Customer Name', 'Email', 'Phone', 
      'State', 'Address', 'Products', 'Total USD', 'Total DZD', 'Notes', 'Status'
    ];
    
    ordersSheet.getRange(1, 1, 1, orderHeaders.length).setValues([orderHeaders]);
    const orderHeaderRange = ordersSheet.getRange(1, 1, 1, orderHeaders.length);
    orderHeaderRange.setBackground('#dc2626');
    orderHeaderRange.setFontColor('#ffffff');
    orderHeaderRange.setFontWeight('bold');
    
    // إعداد صفحة طلبات المنتجات
    let requestsSheet = spreadsheet.getSheetByName('ProductRequests');
    if (!requestsSheet) {
      requestsSheet = spreadsheet.insertSheet('ProductRequests');
    }
    
    const requestHeaders = [
      'Request ID', 'Request Date', 'Product Name', 'Product URL', 'Product Description',
      'Customer Name', 'Email', 'Phone', 'State', 'Address', 'Notes', 'Status', 'Suggested Price'
    ];
    
    requestsSheet.getRange(1, 1, 1, requestHeaders.length).setValues([requestHeaders]);
    const requestHeaderRange = requestsSheet.getRange(1, 1, 1, requestHeaders.length);
    requestHeaderRange.setBackground('#dc2626');
    requestHeaderRange.setFontColor('#ffffff');
    requestHeaderRange.setFontWeight('bold');
    
    console.log('✅ تم إعداد الصفحات والعناوين بنجاح');
    return 'تم إعداد الصفحات والعناوين بنجاح ✅';
    
  } catch (error) {
    console.error('❌ خطأ في إعداد الصفحات:', error);
    return 'خطأ في إعداد الصفحات: ' + error.toString();
  }
}