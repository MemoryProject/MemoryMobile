import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Memory = () => {
    const [cards, setCards] = useState<any>([]);
    const [flippedCards, setFlippedCards] = useState<any>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        const newCards = createCards();
        setCards(newCards);
    }, []);

    useEffect(() => {
        if (flippedCards.length === 2) {
            if (flippedCards[0].content !== flippedCards[1].content) {
                setTimeout(() => {
                    let newCards = [...cards];
                    newCards[flippedCards[0].index].flipped = false;
                    newCards[flippedCards[1].index].flipped = false;
                    setCards(newCards);
                }, 350);
            }
            setFlippedCards([]);
        }
    }, [flippedCards]);

    useEffect(() => {
        // @ts-ignore
        if (cards.length > 0 && cards.every(card => card.flipped)) {
            setGameOver(true);
            Alert.alert("Félicitations !", "Vous avez trouvé toutes les paires !");
        }
    }, [cards]);

    const handleCardTap = (index: number) => {
        if (cards[index].flipped) {
            return;
        }

        let newCards = [...cards];
        newCards[index].flipped = true;

        setCards(newCards);
        setFlippedCards([...flippedCards, { ...newCards[index], index }]);
    };

    const createCards = () => {
        const cardPairs = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑'];
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

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        return cards;
    };

    return (
        <View style={styles.container}>
            {cards.map((card: { content: string, flipped: boolean }, index: number) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardTap(index)}>
                    <Text style={styles.cardContent}>
                        {card.flipped ? card.content : ''}
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

export default Memory;