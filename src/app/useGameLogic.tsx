import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import useTimer from './useTimer';

const useGameLogic = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const difficulty = route.params?.difficulty || 'easy';
    const theme = route.params?.theme || 'fruits';
    const cardPairsCount = difficulty === 'easy' ? 8 : difficulty === 'normal' ? 12 : 16;

    const [cards, setCards] = useState<any>([]);
    const [flippedCards, setFlippedCards] = useState<any>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [moves, setMoves] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);
    const { elapsedTime, startTimer, stopTimer, setElapsedTime } = useTimer();

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
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [gameOver]);

    useEffect(() => {
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
                        onPress: () => navigation.navigate('index'),
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
            console.error('cardPairs is not an array');
            cardPairs = [];
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

    return { cards, elapsedTime, moves, errors, handleCardTap, setElapsedTime };
};

export default useGameLogic;