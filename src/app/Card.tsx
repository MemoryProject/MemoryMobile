import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const Card = ({ card, handleCardTap }) => (
    <TouchableOpacity style={[styles.card, card.matched ? styles.matchedCard : null]} onPress={handleCardTap}>
        <Text style={styles.cardContent}>
            {card.flipped ? card.content : ''}
        </Text>
    </TouchableOpacity>
);

export default Card;