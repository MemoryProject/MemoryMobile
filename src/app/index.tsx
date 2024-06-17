import {Button, Modal, StatusBar} from 'react-native';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import * as Font from 'expo-font';
import { Picker } from '@react-native-picker/picker';

const ImageUrl = 'https://www.pngmart.com/files/13/Pattern-PNG-Transparent.png';

export default function Index() {

    const [fontLoadError, setFontLoadError] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [theme, setTheme] = useState('fruits');
    const [isPickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'Hello-Samosa': require('../../assets/fonts/Hello-Samosa.ttf'),
                });
                setFontLoaded(true);
            } catch (error) {
                console.error("Chargement de l'application (erreur:", error,")");
                setFontLoadError(true);
            }
        }

        loadFonts();
    }, []);

    const togglePicker = () => {
        setPickerVisible(!isPickerVisible);
    };

    if (fontLoadError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <ActivityIndicator size="large" color="yellow" />
                <Text style={{ color: 'white' }}>Chargement de l'application</Text>
            </View>
        );
    }

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
                    <TouchableOpacity onPress={togglePicker}>
                        <Text style={styles.buttonText}>Choisir un thème</Text>
                    </TouchableOpacity>
                    <Modal visible={isPickerVisible} transparent={true}>
                        <View style={styles.overlay} />
                        <View style={styles.centeredView}>
                            <View style={styles.centeredModal}>
                                <Picker
                                    selectedValue={theme}
                                    style={ styles.pickerContainer }
                                    itemStyle={styles.pickerItem}
                                    onValueChange={(itemValue, itemIndex) => setTheme(itemValue)}
                                >
                                    <Picker.Item label="Fruits et légumes" value="fruits" />
                                    <Picker.Item label="Emoji" value="emoji" />
                                    <Picker.Item label="Animaux" value="animals" />
                                </Picker>
                                <TouchableOpacity onPress={togglePicker}>
                                    <Text style={styles.buttonText}>Choisir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={styles.linksContainer}>
                        <Link style={styles.text} href={`/Memory?difficulty=easy&theme=${theme}`}>Facile</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linksContainer}>
                        <Link style={styles.text} href={`/Memory?difficulty=normal&theme=${theme}`}>Normal</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linksContainer}>
                        <Link style={styles.text} href={`/Memory?difficulty=hard&theme=${theme}`}>Difficile</Link>
                    </TouchableOpacity>
                </View>
                <StatusBar barStyle="light-content" />
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
        marginBottom: 100,
        fontFamily: 'Hello-Samosa',
    },
    mobileTitle: {
        color: '#FFEB8A',
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 100,
        fontFamily: 'Hello-Samosa',
    },
    pickerContainer: {
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        marginVertical: 15,
    },
    pickerItem: {
        color: '#5A5A5A',
    },
    buttonText: {
        color: '#FFEB8A',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 50,
        marginVertical: 15,
        textAlign: 'center',
        flexDirection: 'row',
        width: '60%',
    }
});
