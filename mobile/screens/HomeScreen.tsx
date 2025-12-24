import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';

const API_ENDPOINT = 'https://downloader.seositechecker.pro/api/download';
const AUTH_TOKEN = 'Bearer c42b70c65f64e53088baac5f85a78bbf27743d1c';

export default function HomeScreen({ navigation }: any) {
  const [url, setUrl] = useState('');
  const [mp3, setMp3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: AUTH_TOKEN,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, mp3 }),
      });
      const data = await res.json();
      setResult({ success: res.ok, ...data });
    } catch (err) {
      console.error(err);
      setResult({ success: false, error: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const downloadAndShare = async (downloadUrl: string) => {
    try {
      const filename = downloadUrl.split('/').pop() || 'downloaded.file';
      const localUri = FileSystem.documentDirectory + filename;
      const downloadRes = await FileSystem.downloadAsync(downloadUrl, localUri);
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadRes.uri);
        }
      }
    } catch (err) {
      console.error('Download error', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: '700' }}>Download Videos</Text>
        <Text style={{ color: '#666', marginTop: 8 }}>Fast, simple, and free. Download videos instantly.</Text>
      </View>

      <View style={{ marginTop: 24, backgroundColor: 'transparent' }}>
        <Text style={{ marginBottom: 8 }}>Video URL</Text>
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="Paste video URL here"
          style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 12 }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <TouchableOpacity
            onPress={() => setMp3(!mp3)}
            style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: mp3 ? '#0ea5e9' : '#f3f4f6', alignItems: 'center', justifyContent: 'center' }}
          >
            {mp3 && <Text style={{ color: '#fff' }}>✓</Text>}
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>Extract MP3 audio only</Text>
        </View>

        <View style={{ marginTop: 16 }}>
          <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#111827', padding: 14, borderRadius: 12, alignItems: 'center' }} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '600' }}>Download Video</Text>}
          </TouchableOpacity>
        </View>
      </View>

      {result && (
        <View style={{ marginTop: 24 }}>
          {result.success ? (
            <>
              { (result.url || result.download_url) && !mp3 && (
                <Video
                  source={{ uri: result.url || result.download_url }}
                  useNativeControls
                  style={{ width: '100%', height: 300, borderRadius: 12 }}
                  resizeMode="contain"
                />
              )}

              { (result.url || result.download_url) && mp3 && (
                <Text>Audio ready — use Download now</Text>
              )}

              <View style={{ flexDirection: 'column', marginTop: 12 }}>
                <TouchableOpacity onPress={() => downloadAndShare(result.download_url || result.url)} style={{ backgroundColor: '#111827', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: '#fff' }}>Download Now</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setUrl(''); setResult(null); setMp3(false); }} style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 12, alignItems: 'center' }}>
                  <Text>Get Another</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={{ color: 'red' }}>{result.error || 'Failed to process'}</Text>
          )}
        </View>
      )}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}
