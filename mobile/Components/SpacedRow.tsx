import React, { ReactNode } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { STYLES } from '../Constants';

interface Props {
    Left?: ReactNode;
    Right?: ReactNode;
    style?: StyleProp<ViewStyle>;
}

const SpacedRow = ({ Left, Right, style }: Props) => {
    //the header should just have a left and a right side
    //they can or cannot have functionality its just a layout

    return (
        <View
            style={[style, {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }]}
        >
            {Left}
            {Right}
        </View>
    );
};

export default SpacedRow;
