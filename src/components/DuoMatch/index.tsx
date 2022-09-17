import {React, useState} from 'react';
import { View, Modal, Text, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from '../../theme';

import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [isCopping, setisCopping] = useState(false);

    async function handeCopyDiscordToClipBoard() {
        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord Copiado', 'Usúario copiado na área de transferência');
    }

    return (
        <Modal
            {...rest}
            transparent
            statusBarTranslucent
            animationType='fade'
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading
                        title="Let's play!"
                        subtitle='Agora é só começar a jogar!'
                        style={styles.header}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handeCopyDiscordToClipBoard}
                        disabled={isCopping}
                    >

                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </Modal>

    );
}