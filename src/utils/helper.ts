import NetInfo from '@react-native-community/netinfo';

export const checkConnection = async (): Promise<boolean> => {
  try {
    const response = await NetInfo.fetch();
    return response.isConnected ?? false;
  } catch (error) {
    return false;
  }
};

const now = new Date();
export const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
