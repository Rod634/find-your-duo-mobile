import { ImageBackground } from 'react-native';
import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

interface backgroundProps {
    children: React.ReactNode;
}

export function Background({ children } : backgroundProps) {
  return (
    <ImageBackground 
        style={styles.container}
        source={backgroundImg}
        defaultSource={backgroundImg}
    >
        {children}
    </ImageBackground>
  );
}