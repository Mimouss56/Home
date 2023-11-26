import { Text, StyleSheet } from '@react-pdf/renderer';
import { styleContent } from '../../Styles/content';

function HeaderCv() {
  const styles = StyleSheet.create({
    styleContent: styleContent as object,
    styleH1: {
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '18px',
      fontFamily: 'Roboto',
      fontStyle: 'bold',
      padding: '8px ',

    },

  });
  return (
    <>
      <Text style={styles.styleH1}>
        Développeur Application Web et Mobile
      </Text>
      <Text style={styles.styleContent}>
        Fort d&apos;une diversité d&apos;expériences professionnelles,
        j&apos;ai cultivé une capacité d&apos;adaptation remarquable,
        une aptitude prononcée à la résolution de problèmes et un sens du service client affûté.
        Ces compétences, alliées à mon autonomie et à ma rigueur organisationnelle,
        m&apos;ont permis d&apos;exceller dans chaque rôle que j&apos;ai entrepris.
      </Text>
    </>
  );
}

export default HeaderCv;
