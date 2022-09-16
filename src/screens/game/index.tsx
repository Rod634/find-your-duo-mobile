import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native'
import { View, TouchableOpacity, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { DuoCard } from '../../components/DuoCard';



export function Game() {

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.navigate('home');
  }

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
          <View style={styles.right}/>
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
          />

        <DuoCard/>
        
      </SafeAreaView>
    </Background>
  );
}