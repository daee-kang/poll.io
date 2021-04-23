import { StyleSheet } from 'react-native';
import { COLORS } from '../Constants';


export default StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    },
    title: {
        fontFamily: 'roboto-slab-bold',
        fontSize: 65,
        textAlign: 'left',
        color: COLORS.SECONDARY
    },
    h1: {
        fontFamily: 'roboto-slab-bold',
        fontSize: 30,
        textAlign: 'left',
        color: COLORS.SECONDARY
    }
});

