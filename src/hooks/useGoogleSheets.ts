import { useState } from 'react';

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyxbypF1WwpwijQAUsFiaQsAXONHdS1WXDW-kJX9FZ-nawLzHktZGiHmbz5rp0FQlG-OQ/exec';

export const useGoogleSheets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (orderData: any) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 إرسال بيانات الطلب:', orderData);
      
      // إنشاء FormData بدلاً من JSON
      const formData = new FormData();
      formData.append('action', 'submitOrder');
      formData.append('data', JSON.stringify(orderData));
      
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        body: formData
      });

      console.log('📡 استجابة الخادم:', response.status);
      
      if (response.ok) {
        const result = await response.text();
        console.log('✅ نتيجة الإرسال:', result);
        return { success: true };
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
    } catch (err) {
      console.error('❌ خطأ في إرسال الطلب:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال الطلب');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const requestProduct = async (productData: any) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 إرسال طلب المنتج:', productData);
      
      // إنشاء FormData بدلاً من JSON
      const formData = new FormData();
      formData.append('action', 'requestProduct');
      formData.append('data', JSON.stringify(productData));
      
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        body: formData
      });

      console.log('📡 استجابة الخادم:', response.status);
      
      if (response.ok) {
        const result = await response.text();
        console.log('✅ نتيجة الإرسال:', result);
        return { success: true };
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
    } catch (err) {
      console.error('❌ خطأ في إرسال طلب المنتج:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال طلب المنتج');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitOrder,
    requestProduct,
    loading,
    error
  };
};