import { supabase } from './supabase';
import * as Notifications from 'expo-notifications';
import { Notification } from '../types';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  private tableName = 'notifications';
  
  // Note: This service needs to be fully migrated to Supabase
  // Currently simplified for Firebase removal

  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const notifications: Notification[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notifications.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as Notification);
      });

      return notifications;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch notifications');
    }
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    try {
      const docRef = doc(db, this.collectionName, notificationId);
      await updateDoc(docRef, {
        isRead: true,
      });

      const docSnap = await getDoc(docRef);
      return { id: docSnap.id, ...docSnap.data() } as Notification;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to mark notification as read');
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        where('isRead', '==', false)
      );

      const querySnapshot = await getDocs(q);
      const updatePromises: Promise<void>[] = [];

      querySnapshot.forEach((docSnap) => {
        updatePromises.push(updateDoc(docSnap.ref, { isRead: true }));
      });

      await Promise.all(updatePromises);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to mark all as read');
    }
  }

  async sendNotification(notification: Partial<Notification>): Promise<Notification> {
    try {
      const data = {
        ...notification,
        createdAt: new Date(),
        isRead: false,
      };

      const docRef = await addDoc(collection(db, this.collectionName), data);
      
      // Send push notification
      await this.sendPushNotification(notification.userId!, notification.title!, notification.message!);
      
      return { id: docRef.id, ...data } as Notification;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send notification');
    }
  }

  async sendPushNotification(userId: string, title: string, body: string, data?: any) {
    try {
      // Get user's push token from Firestore
      const userDoc = await getDoc(doc(db, 'users', userId));
      const pushToken = userDoc.data()?.pushToken;

      if (!pushToken) {
        console.warn('No push token found for user:', userId);
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
        },
        trigger: null, // Send immediately
      });
    } catch (error: any) {
      console.error('Failed to send push notification:', error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Push notification permissions not granted');
        return false;
      }

      return true;
    } catch (error: any) {
      console.error('Failed to request notification permissions:', error);
      return false;
    }
  }

  async registerForPushNotifications(userId: string): Promise<string | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const token = (await Notifications.getExpoPushTokenAsync()).data;

      // Save token to Firestore
      await updateDoc(doc(db, 'users', userId), {
        pushToken: token,
      });

      return token;
    } catch (error: any) {
      console.error('Failed to register for push notifications:', error);
      return null;
    }
  }
}

export const notificationService = new NotificationService();
export default notificationService;
