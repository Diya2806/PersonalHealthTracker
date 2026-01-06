import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'ACTIVITIES';

export const getActivities = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveActivity = async (activity: any) => {
  const existing = await getActivities();
  existing.push(activity);
  await AsyncStorage.setItem(KEY, JSON.stringify(existing));
};
