import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link, Stack} from "expo-router";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

const ImageUrl = 'https://www.pngmart.com/files/13/Pattern-PNG-Transparent.png';
export default function Index() {
    return (
        <LinearGradient
            colors={['#797979', '#5A5A5A', '#424242']}
            style={styles.container}
        >
            <Image source={{ uri: ImageUrl }}
                   style={styles.backgroundImage}
                   resizeMode="cover"
            />
            <Stack.Screen options={{headerShown: false}} />
            <View style={styles.container}>
                <Text style={styles.title}>Memory <Text style={styles.mobileTitle}>Mobile</Text></Text>
                <TouchableOpacity style={styles.text}>
                    <Link style={styles.text} href="/Memory">Commencer le jeu !</Link>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    title: {
        color: '#E2E2E2',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    mobileTitle: {
        color: '#FFEB8A',
        fontSize: 32,
        fontWeight: 'bold',
    },
    text: {
        color: '#5A5A5A',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#E2E2E2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});