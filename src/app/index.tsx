import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link, Stack} from "expo-router";
import React, {useEffect, useState} from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import * as Font from 'expo-font';

const ImageUrl = 'https://www.pngmart.com/files/13/Pattern-PNG-Transparent.png';

export default function Index() {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'Hello-Samosa': require('../../assets/fonts/Hello-Samosa.ttf'),
                });
                setFontLoaded(true);
            } catch (error) {
                console.error(ActivityIndicator, error);
            }
        }

        loadFonts();
    }, []);

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
                <View>
                    <TouchableOpacity style={styles.linksContainer}>
                        <Link style={styles.text} href="/Memory?difficulty=easy">Facile</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linksContainer}>
                        <Link style={styles.text} href="/Memory?difficulty=normal">Normal</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linksContainer}>
                        <Link style={styles.text} href="/Memory?difficulty=hard">Difficile</Link>
                    </TouchableOpacity>
                </View>
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
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 60,
        fontFamily: 'Hello-Samosa',
    },
    mobileTitle: {
        color: '#FFEB8A',
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 60,
        fontFamily: 'Hello-Samosa',
    },
    text: {
        color: '#5A5A5A',
        fontSize: 17,
        fontWeight: 'bold',
        backgroundColor: '#E2E2E2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 15,
        textAlign: 'center',
        flexDirection: 'row',
        width: '60%',
    },
    linksContainer: {
        color: '#5A5A5A',
        fontSize: 17,
        fontWeight: 'bold',
        backgroundColor: '#E2E2E2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 15,
        textAlign: 'center',
        flexDirection: 'row',
        width: '60%',
    }
});
