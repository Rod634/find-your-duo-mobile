import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {

  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [discordSelected, setDiscordSelected] = useState<string>('');

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('home');
  }

  async function getDiscordUser (adsId: string) {
    fetch(`http://192.168.15.2:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => {
        setDiscordSelected(data.discord);
      });
  }

  useEffect(() => {
    fetch(`http://192.168.15.2:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => {
        setAds(data);
      });
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={ads.length == 0 ? styles.emptyList : styles.contentList}
          ListEmptyComponent={
            <Text style={styles.noAdText}>
              Sem anúncios por enquanto :(
            </Text>
          }
        />

          <DuoMatch
            visible={discordSelected.length > 0}
            discord="rod#634"
            onClose={() => setDiscordSelected('')}
          />

      </SafeAreaView>
    </Background>
  );
}