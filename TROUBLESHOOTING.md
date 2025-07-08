# دليل حل مشاكل Google Sheets
## المشكلة: "تم إرسال الرسالة" لكن لا تصل للجدول

## 🔍 خطوات التشخيص:

### 1. اختبار الرابط مباشرة
افتح هذا الرابط في المتصفح:
```
https://script.google.com/macros/s/AKfycbxvHsZ_Epkjj0e194dHs0__m4KzgONYQIt-4DD_Rau8tfOyHUtj2q3csHhzABjNVauw-A/exec
```

**النتيجة المتوقعة:** يجب أن تظهر رسالة "Red1One API is working! ✅"

### 2. فحص إعدادات Google Apps Script

#### أ. التأكد من الكود:
1. اذهب إلى [Google Apps Script](https://script.google.com)
2. افتح مشروعك
3. استبدل الكود بالكود الجديد من ملف `Code-Fixed.gs`
4. احفظ المشروع

#### ب. التأكد من النشر:
1. اضغط **Deploy** > **Manage deployments**
2. تأكد من الإعدادات:
   - **Type**: Web app
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
3. إذا كانت الإعدادات خاطئة، اضغط **Edit** وصححها
4. اضغط **Deploy**

### 3. اختبار النظام من Apps Script

#### أ. اختبار الاتصال:
1. في Apps Script، اذهب إلى **Functions**
2. اختر `testConnection`
3. اضغط **Run**
4. تحقق من ظهور بيانات في صفحة `Orders`

#### ب. اختبار طلب المنتج:
1. اختر `testProductRequest`
2. اضغط **Run**
3. تحقق من ظهور بيانات في صفحة `ProductRequests`

#### ج. إعداد الصفحات يدوياً:
1. اختر `setupSheetsManually`
2. اضغط **Run**
3. هذا سينشئ الصفحات والعناوين

### 4. فحص الجدول

#### أ. التأكد من وجود الصفحات:
1. افتح الجدول: https://docs.google.com/spreadsheets/d/1R1gCpjKc9RWZ2m6IdPQQ5ngUBioGVJMOt3fs7-gOPmA/edit
2. تأكد من وجود صفحات:
   - `Orders`
   - `ProductRequests`

#### ب. التأكد من الصلاحيات:
- تأكد من أن لديك صلاحية تعديل الجدول
- إذا كان الجدول مشترك، تأكد من صلاحية "Editor"

### 5. فحص المتصفح

#### أ. فتح Developer Tools:
1. اضغط F12 في المتصفح
2. اذهب إلى تبويب **Console**
3. جرب إرسال طلب من الموقع
4. راقب الرسائل في Console

#### ب. فحص Network:
1. في Developer Tools، اذهب إلى **Network**
2. جرب إرسال طلب
3. ابحث عن الطلب المرسل للرابط
4. تحقق من الاستجابة

## 🛠️ الحلول الشائعة:

### الحل 1: إعادة نشر التطبيق
1. في Apps Script، اضغط **Deploy** > **New deployment**
2. اختر **Type**: Web app
3. **Execute as**: Me
4. **Who has access**: Anyone
5. اضغط **Deploy**
6. انسخ الرابط الجديد وحدث الموقع

### الحل 2: تغيير طريقة الإرسال
الكود الجديد يستخدم FormData بدلاً من JSON لحل مشاكل CORS

### الحل 3: فحص الأذونات
1. في Apps Script، اضغط على أيقونة القفل بجانب **Run**
2. اعطي جميع الأذونات المطلوبة
3. تأكد من السماح للتطبيق بالوصول لـ Google Sheets

### الحل 4: إنشاء مشروع جديد
إذا استمرت المشكلة:
1. أنشئ مشروع Apps Script جديد
2. انسخ الكود الجديد
3. انشر التطبيق
4. حدث الرابط في الموقع

## 📞 إذا استمرت المشكلة:

أرسل لي:
1. **لقطة شاشة** من صفحة Deploy في Apps Script
2. **رسائل Console** من المتصفح
3. **لقطة شاشة** من الجدول
4. **نتيجة** اختبار الرابط مباشرة

## ✅ علامات النجاح:

- [ ] الرابط يعمل ويظهر "Red1One API is working!"
- [ ] `testConnection` ينجح ويضيف بيانات للجدول
- [ ] `testProductRequest` ينجح ويضيف بيانات للجدول
- [ ] الموقع يرسل البيانات بدون أخطاء في Console
- [ ] البيانات تظهر في الجدول فوراً