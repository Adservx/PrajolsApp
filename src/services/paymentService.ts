import { apiClient } from './api';
import { Linking } from 'react-native';
import { Fee } from '../types';

// Khalti Configuration
const KHALTI_PUBLIC_KEY = 'YOUR_KHALTI_PUBLIC_KEY';
const KHALTI_SECRET_KEY = 'YOUR_KHALTI_SECRET_KEY';

// IME Pay Configuration
const IMEPAY_MERCHANT_CODE = 'YOUR_IMEPAY_MERCHANT_CODE';
const IMEPAY_MODULE = 'YOUR_IMEPAY_MODULE';
const IMEPAY_USERNAME = 'YOUR_IMEPAY_USERNAME';
const IMEPAY_PASSWORD = 'YOUR_IMEPAY_PASSWORD';

interface PaymentResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  message?: string;
}

class PaymentService {
  // Khalti Payment Integration
  async initiateKhaltiPayment(fee: Fee): Promise<PaymentResponse> {
    try {
      const payload = {
        publicKey: KHALTI_PUBLIC_KEY,
        productIdentity: fee.id,
        productName: `Fee Payment - ${fee.type}`,
        productUrl: 'https://yourschool.com',
        amount: fee.amount * 100, // Khalti expects amount in paisa (1 NPR = 100 paisa)
        mobile: '', // Student's mobile number
      };

      // In a real app, you would open Khalti SDK or web view
      // For now, we'll simulate the payment process
      const response = await apiClient.post('/payments/khalti/initiate', payload) as any;

      return {
        success: true,
        transactionId: response.idx,
        amount: fee.amount,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Khalti payment initiation failed');
    }
  }

  async verifyKhaltiPayment(token: string, amount: number): Promise<PaymentResponse> {
    try {
      const payload = {
        token,
        amount: amount * 100,
      };

      const response = await apiClient.post('/payments/khalti/verify', payload, {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
        },
      }) as any;

      return {
        success: response.state?.name === 'Completed',
        transactionId: response.idx,
        amount: response.amount / 100,
        message: response.state?.message || 'Payment successful',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Khalti payment verification failed');
    }
  }

  // IME Pay Payment Integration
  async initiateIMEPayPayment(fee: Fee): Promise<PaymentResponse> {
    try {
      const payload = {
        MerchantCode: IMEPAY_MERCHANT_CODE,
        Amount: fee.amount,
        RefId: fee.id,
        Method: 'POST',
        Module: IMEPAY_MODULE,
        UserName: IMEPAY_USERNAME,
        Password: IMEPAY_PASSWORD,
        CancelUrl: 'yourapp://payment/cancel',
        SuccessUrl: 'yourapp://payment/success',
        FailUrl: 'yourapp://payment/fail',
      };

      const response = await apiClient.post('/payments/imepay/initiate', payload) as any;

      // Open IME Pay URL
      if (response.paymentUrl) {
        await Linking.openURL(response.paymentUrl);
      }

      return {
        success: true,
        transactionId: response.TokenId,
        amount: fee.amount,
      };
    } catch (error: any) {
      throw new Error(error.message || 'IME Pay payment initiation failed');
    }
  }

  async verifyIMEPayPayment(transactionId: string, refId: string): Promise<PaymentResponse> {
    try {
      const payload = {
        TransactionId: transactionId,
        RefId: refId,
        MerchantCode: IMEPAY_MERCHANT_CODE,
        UserName: IMEPAY_USERNAME,
        Password: IMEPAY_PASSWORD,
      };

      const response = await apiClient.post('/payments/imepay/verify', payload) as any;

      return {
        success: response.ResponseCode === '0',
        transactionId: response.TransactionId,
        amount: parseFloat(response.Amount),
        message: response.ResponseDescription || 'Payment successful',
      };
    } catch (error: any) {
      throw new Error(error.message || 'IME Pay payment verification failed');
    }
  }

  // Generic payment processing
  async processPayment(
    fee: Fee,
    paymentMethod: 'khalti' | 'imepay' | 'cash' | 'bank'
  ): Promise<PaymentResponse> {
    try {
      switch (paymentMethod) {
        case 'khalti':
          return await this.initiateKhaltiPayment(fee);
        case 'imepay':
          return await this.initiateIMEPayPayment(fee);
        case 'cash':
        case 'bank':
          // Handle cash/bank payments through backend
          return await apiClient.post('/payments/offline', {
            feeId: fee.id,
            method: paymentMethod,
            amount: fee.amount,
          });
        default:
          throw new Error('Invalid payment method');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Payment processing failed');
    }
  }

  // Get payment history
  async getPaymentHistory(studentId: string) {
    try {
      return await apiClient.get(`/payments/history/${studentId}`);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch payment history');
    }
  }

  // Generate invoice
  async generateInvoice(feeId: string) {
    try {
      return await apiClient.get(`/payments/invoice/${feeId}`);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to generate invoice');
    }
  }

  // Download receipt
  async downloadReceipt(transactionId: string) {
    try {
      return await apiClient.get(`/payments/receipt/${transactionId}`, {
        responseType: 'blob',
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to download receipt');
    }
  }
}

export const paymentService = new PaymentService();
export default paymentService;
