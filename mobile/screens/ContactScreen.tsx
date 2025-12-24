import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

const API_CONTACT = 'https://loadify.online/api/contact';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Validation', 'Please fill required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (res.ok) {
        Alert.alert('Success', 'Message sent — thank you!');
        setName(''); setEmail(''); setPhone(''); setMessage('');
      } else {
        const data = await res.json();
        Alert.alert('Error', data?.error || 'Failed to send');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Network error');
    } finally { setLoading(false); }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Contact Us</Text>
      <View style={{ marginTop: 16 }}>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 8 }} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 8 }} />
        <TextInput placeholder="Phone (optional)" value={phone} onChangeText={setPhone} style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 8 }} />
        <TextInput placeholder="Message" value={message} onChangeText={setMessage} multiline numberOfLines={4} style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, height: 120 }} />

        <TouchableOpacity onPress={handleSubmit} style={{ marginTop: 12, backgroundColor: '#111827', padding: 14, borderRadius: 12, alignItems: 'center' }} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '600' }}>Send Message</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
