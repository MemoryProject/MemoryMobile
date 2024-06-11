import { StyleSheet, Dimensions } from 'react-native';

const numCardsPerRow = 5;
const screenWidth = Dimensions.get('window').width;
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
        opacity: 1,
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

export default styles;