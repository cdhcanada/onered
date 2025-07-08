# دليل إعداد Google Sheets لموقع Red1One
## للعمل مع الجدول الموجود: 1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA

## الخطوات المطلوبة:

### 1. فتح جدول البيانات الموجود
1. اذهب إلى الرابط: https://docs.google.com/spreadsheets/d/1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA/edit
2. تأكد من وجود الصفحات: `Orders` و `ProductRequests`

### 2. إعداد Google Apps Script
1. في جدول البيانات، اذهب إلى **Extensions** > **Apps Script**
2. احذف الكود الموجود واستبدله بالكود الجديد من ملف `Code.gs`
3. احفظ المشروع باسم "Red1One API"

### 3. إعداد العناوين (اختياري)
1. في Google Apps Script، اذهب إلى **Functions**
2. اختر `setupHeaders` واضغط **Run**
3. هذا سيضيف العناوين المطلوبة للصفحات

### 4. نشر التطبيق
1. اضغط على **Deploy** > **New deployment**
2. اختر **Type**: Web app
3. في **Execute as**: اختر "Me"
4. في **Who has access**: اختر "Anyone"
5. اضغط **Deploy**
6. انسخ رابط Web app URL

### 5. تحديث الموقع
1. في ملف `src/hooks/useGoogleSheets.ts`
2. استبدل `GOOGLE_SHEETS_URL` بالرابط الذي نسخته من الخطوة السابقة

### 6. اختبار النظام
1. في Google Apps Script، اذهب إلى **Functions**
2. اختر `testSetup` واضغط **Run** لاختبار الطلبات
3. اختر `testProductRequest` واضغط **Run** لاختبار طلبات المنتجات
4. تحقق من إضافة البيانات في الصفحات الموجودة

## هيكل البيانات:

### صفحة "Orders"
- Order ID (رقم الطلب)
- Order Date (تاريخ الطلب)
- Customer Name (اسم العميل)
- Email (البريد الإلكتروني)
- Phone (رقم الهاتف)
- State (الولاية)
- Address (العنوان)
- Products (المنتجات)
- Total USD (المجموع بالدولار)
- Total DZD (المجموع بالدينار)
- Notes (ملاحظات)
- Status (حالة الطلب)

### صفحة "ProductRequests"
- Request ID (رقم الطلب)
- Request Date (تاريخ الطلب)
- Product Name (اسم المنتج)
- Product URL (رابط المنتج)
- Product Description (وصف المنتج)
- Customer Name (اسم العميل)
- Email (البريد الإلكتروني)
- Phone (رقم الهاتف)
- State (الولاية)
- Address (العنوان)
- Notes (ملاحظات)
- Status (حالة الطلب)
- Suggested Price (السعر المقترح)

## المميزات:
- ✅ يعمل مع الجدول الموجود
- ✅ يحافظ على البيانات الحالية
- ✅ إضافة تلقائية للعناوين إذا لم تكن موجودة
- ✅ تنسيق تلقائي وجميل للجداول
- ✅ دعم كامل للغة العربية والإنجليزية
- ✅ نظام مبسط بدون تعقيدات
- ✅ مجاني تماماً

## ملاحظات مهمة:
- الكود يستخدم ID الجدول مباشرة: `1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA`
- سيتم إضافة البيانات الجديدة للصفحات الموجودة
- إذا لم تكن العناوين موجودة، سيتم إضافتها تلقائياً
- النظام لا يحذف أي بيانات موجودة

## استكشاف الأخطاء:
إذا واجهت مشكلة:
1. تأكد من أن لديك صلاحية تعديل الجدول
2. تأكد من وجود الصفحات `Orders` و `ProductRequests`
3. جرب تشغيل `setupHeaders` لإضافة العناوين
4. تأكد من نشر التطبيق بصلاحية "Anyone"