import { Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation} from '@react-navigation/native'

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';

import { Heading } from '../../components/Heading';
import { GameCard, GamecardProps } from '../../components/GameCard';

import { Background } from '../../components/Background';

export function Home() {

  const navigation = useNavigation();

  function handleNavigation({id, title, bannerUrl} : GamecardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  const [games, setGames] = useState<GamecardProps[]>([])

  useEffect(() => {
    fetch('http://192.168.15.5:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      });
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleNavigation(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}