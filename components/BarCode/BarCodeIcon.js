
import React from 'react';
import { Icon } from 'react-native-gradient-icon';
export default function BarCodeIcon({size=70}){
    const iconSize= size;
    return(
        <Icon  
            size={iconSize}
            colors={[
                {color:"#206593",offset:"0",opacity:"1"},
                {color:"#25EADE",offset:"1",opacity:"1"},
            ]}
            name="barcode-scan" type="material-community" />  
    )
}