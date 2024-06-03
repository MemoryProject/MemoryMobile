import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Test = () => {
    const [cards, setCards] = useState<any>([]);

    useEffect(() => {
        const newCards = createCards();
        setCards(newCards);
    }, []);

    const createCards = () => {
        const cardPairs = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍍', '🥥'];
        let cards: any[] = [];

        cardPairs.forEach((pair) => {
            cards.push({
                content: pair,
                flipped: false,
            });
            cards.push({
                content: pair,
                flipped: false,
            });
        });

        // Shuffle cards
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        return cards;
    };

    return (
        <View style={styles.container}>
            {cards.map((card: { content: string, flipped: boolean }, index: number) => (
                <TouchableOpacity key={index} style={styles.card}>
                    <Text style={styles.cardContent}>
                        {card.content}
                    </Text>
                </TouchableOpacity>
            ))}
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '25%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    cardContent: {
        fontSize: 30,
    },
});

export default Test;