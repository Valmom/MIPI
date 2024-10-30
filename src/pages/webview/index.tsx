import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewStyles } from './style';

export function WebViewPage() {
  return (
    <SafeAreaView style={WebViewStyles.container}>
      <WebView
        source={{ uri: 'https://mipi.equatorialenergia.com.br/entrar' }}
        style={WebViewStyles.webView}
      />
    </SafeAreaView>
  )
}