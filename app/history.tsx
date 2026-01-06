import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { getActivities } from '../utils/storage';

export default function History() {
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    const activities = await getActivities();
    setData([...activities].reverse());
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const icon = (type: string) => {
    if (type === 'water') return '💧';
    if (type === 'steps') return '🚶';
    if (type === 'sleep') return '😴';
    return '';
  };

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(_, i) => i.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.type}>
            {icon(item.type)} {item.type.toUpperCase()}
          </Text>
          <Text style={styles.value}>Value: {item.value}</Text>
          <Text style={styles.time}>
            {item.date} • {item.time}
          </Text>
          {item.notes ? <Text style={styles.notes}>📝 {item.notes}</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F5F7FA', padding: 10 },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },

  type: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  value: { fontSize: 15 },
  time: { fontSize: 12, color: '#777', marginTop: 4 },
  notes: { marginTop: 6, fontStyle: 'italic' },
});
