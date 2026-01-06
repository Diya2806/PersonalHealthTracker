import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import SummaryCard from '../components/SummaryCard';
import ActionButton from '../components/ActionButton';
import { getActivities } from '../utils/storage';

export default function Dashboard() {
  const [summary, setSummary] = useState({ water: 0, steps: 0, sleep: 0 });

  const loadData = async () => {
    const data = await getActivities();
    let water = 0, steps = 0, sleep = 0;

    data.forEach((item: any) => {
      if (item.type === 'water') water += Number(item.value);
      if (item.type === 'steps') steps += Number(item.value);
      if (item.type === 'sleep') sleep += Number(item.value);
    });

    setSummary({ water, steps, sleep });
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Today</Text>
      <Text style={styles.date}>{new Date().toDateString()}</Text>

      <SummaryCard title="💧 Water Intake" value={summary.water} />
      <SummaryCard title="🚶 Steps Walked" value={summary.steps} />
      <SummaryCard title="😴 Sleep Hours" value={summary.sleep} />

      <ActionButton title="➕ Log Activity" onPress={() => router.push('/add-activity')} />
      <ActionButton title="📊 View History" onPress={() => router.push('/history')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  heading: { fontSize: 26, fontWeight: 'bold' },
  date: { color: '#777', marginBottom: 20 },
});
