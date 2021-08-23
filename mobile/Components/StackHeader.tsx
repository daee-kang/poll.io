import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { STYLES } from '../Constants';

interface Props {
    Left?: ReactNode;
    Right?: ReactNode;
}

const StackHeader = ({ Left, Right }: Props) => {
    //the header should just have a left and a right side
    //they can or cannot have functionality its just a layout

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: STYLES.PAGEPADDING
            }}
        >
            {Left}
            {Right}
        </View>
    );
};

export default StackHeader;
