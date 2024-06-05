import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
    Image,
    Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Memory = () => {
    const navigation = useNavigation();
    const [cards, setCards] = useState<any>([]);
    const [flippedCards, setFlippedCards] = useState<any>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);
    const ImageUrl = 'https://www.pngmart.com/files/13/Pattern-PNG-Transparent.png';
    const route = useRoute();
    const difficulty = route.params?.difficulty || 'easy';
    const cardPairsCount = difficulty === 'easy' ? 8 : difficulty === 'normal' ? 12 : 16;
    const theme = route.params?.theme || 'fruits';

    useEffect(() => {
        const newCards = createCards();
        setCards(newCards);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!gameOver) {
            interval = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            // @ts-ignore
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [gameOver]);

    useEffect(() => {
        // @ts-ignore
        if (cards.length > 0 && cards.every(card => card.flipped)) {
            setGameOver(true);
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            Alert.alert(
                "Félicitations !",
                `Vous avez trouvé toutes les paires en ${minutes > 0 ? `${minutes} minutes et ${seconds} secondes` : `${seconds} secondes`} avec ${moves + 1} essais et ${errors} erreurs !`,
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    }
                ]
            );
        }
    }, [cards]);

    useEffect(() => {
        if (flippedCards.length === 2) {
            if (flippedCards[0].content !== flippedCards[1].content) {
                setTimeout(() => {
                    let newCards = [...cards];
                    newCards[flippedCards[0].index].flipped = false;
                    newCards[flippedCards[1].index].flipped = false;
                    setCards(newCards);
                }, 350);
                setErrors(errors + 1);
            } else {
                setTimeout(() => {
                    let newCards = [...cards];
                    newCards[flippedCards[0].index].matched = true;
                    newCards[flippedCards[1].index].matched = true;
                    setCards(newCards);
                }, 10);
            }
            setFlippedCards([]);
            setMoves(moves + 1);
        }
    }, [flippedCards]);

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
        let cardPairs;
        switch (theme) {
            case 'fruits':
                cardPairs = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍐', '🍈', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒'];
                break;
            case 'emoji':
                cardPairs = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰'];
                break;
            case 'animals':
                cardPairs = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];
                break;
        }
        if (Array.isArray(cardPairs)) {
            cardPairs = cardPairs.slice(0, cardPairsCount);
        } else {
            // Handle error here
            console.error('cardPairs is not an array');
            cardPairs = []; // default to an empty array if not an array
        }
        let cards: any[] = [];

        cardPairs.forEach((pair) => {
            cards.push({
                content: pair,
                flipped: false,
                matched: false,
            });
            cards.push({
                content: pair,
                flipped: false,
                matched: false,
            });
        });

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        return cards;
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#797979', '#5A5A5A', '#424242']}
                style={StyleSheet.absoluteFillObject}
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
                    <View style={styles.statsContainer}>
                        <Text style={styles.timer}>
                            ⌛ : {elapsedTime >= 60 ? `${Math.floor(elapsedTime / 60)} min ${elapsedTime % 60} s` : `${elapsedTime} s`}
                        </Text>
                        <Text style={styles.timer}>🃏 Essais : {moves}</Text>
                        <Text style={styles.timer}>❌ : {errors}</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.cardContainer}>
                        {cards.map((card: { content: string, flipped: boolean, matched: boolean }, index: number) => (
                            <TouchableOpacity key={index} style={[styles.card, card.matched ? styles.matchedCard : null]} onPress={() => handleCardTap(index)}>
                                <Text style={styles.cardContent}>
                                    {card.flipped ? card.content : ''}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <StatusBar style="auto" />
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
};

const numCardsPerRow = 5; // Number of cards per row
const screenWidth = Dimensions.get('window').width; // Get the screen width
const cardSize = screenWidth / numCardsPerRow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4A3A5C',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    timer: {
        color: '#FFEB8A',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20,
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: cardSize,
        height: cardSize,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1%',
        backgroundColor: '#E2E2E2',
        borderRadius: 15,
    },
    cardContent: {
        fontSize: 30,
    },
    matchedCard: {
        backgroundColor: '#ffefad',
    },
});
export default Memory;