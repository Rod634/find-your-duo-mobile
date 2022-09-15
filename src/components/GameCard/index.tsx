import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GamecardProps {
    id: string,
    title: string,
    _count: {
        ads: Number
    }
    bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
    data: GamecardProps;
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground
                source={{uri: data.bannerUrl}}
                style={styles.cover}
            >

                <LinearGradient
                    colors={THEME.COLORS.FOOTER}
                    style={styles.footer}
                >

                    <Text style={styles.name}>
                        {data.title}
                    </Text>

                    <Text style={styles.ads}>
                        {data._count.ads} {data._count.ads > 1 ? ' anúncios' : ' anúncio' }  
                    </Text>

                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}