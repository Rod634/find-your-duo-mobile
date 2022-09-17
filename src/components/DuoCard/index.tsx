import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number
}

interface Props {
  data: DuoCardProps,
  onConnect: () => void
}

export function DuoCard({data, onConnect} : Props) {
  return (
    <View style={styles.container}>
        <DuoInfo
          label='Nome'
          value={data.name}
        />
        <DuoInfo
          label='Tempo de jogo'
          value={`${data.yearsPlaying} ${data.yearsPlaying > 1 ? "anos" : "ano"}`}
        />
        <DuoInfo
          label='Disponibilidade'
          value={`${data.weekDays.length} ${data.weekDays.length > 1 ? "dias" : "dia"} \u2022 ${data.hourStart} - ${data.hourEnd}`}
        />
        <DuoInfo
          label='Chamada de áudio'
          value={data.useVoiceChannel? 'Sim' : 'Não'}
          colorValue={data.useVoiceChannel? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />

      <TouchableOpacity style={styles.button}>
      
        {/* <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        /> */}

        <Text 
          style={styles.buttonText}
          onPress={onConnect}
        >
          Conectar
        </Text>

      </TouchableOpacity>

    </View>
  );
}