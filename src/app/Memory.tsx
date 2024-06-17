import React, { useEffect } from 'react';
import {View, SafeAreaView, ScrollView, StatusBar, Text, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';
import useGameLogic from './useGameLogic';
import useTimer from './useTimer';
import styles from './styles';
import { Stack } from 'expo-router';

const ImageUrl = 'https://www.pngmart.com/files/13/Pattern-PNG-Transparent.png';

const Memory = () => {
    const { cards, elapsedTime, moves, errors, handleCardTap, setElapsedTime } = useGameLogic();
    const { startTimer, stopTimer } = useTimer();

    useEffect(() => {
        startTimer();

        return () => {
            stopTimer();
        };
    }, []);

    return (
        <LinearGradient
            colors={['#797979', '#5A5A5A', '#424242']}
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
        >
            <Image source={{ uri: ImageUrl }}
                   style={styles.backgroundImage}
                   resizeMode="cover"
            />
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Screen options={{
                    title: 'Memory Mobile',
                    headerTintColor: '#E2E2E2',
                    headerBackTitle: 'Retour',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                }}  />
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
                <View style={styles.statsContainer}>
                    <Text style={styles.timer}>
                        ⌛ : {elapsedTime >= 60 ? `${Math.floor(elapsedTime / 60)} min ${elapsedTime % 60} s` : `${elapsedTime} s`}
                    </Text>
                    <Text style={styles.timer}>🃏 Essais : {moves}</Text>
                    <Text style={styles.timer}>❌ : {errors}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.cardContainer}>
                    {cards.map((card, index) => (
                        <Card key={index} card={card} handleCardTap={() => handleCardTap(index)} />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Memory;