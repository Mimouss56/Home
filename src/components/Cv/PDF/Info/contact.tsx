import {
  Text, StyleSheet, View, Link, Image,
} from '@react-pdf/renderer';
import {
  UrlRight, imgStyle, linkWithImg, styleContent, styleList, styleSection,
} from '../../Styles/content';
import { styleH1, styleTitle } from '../../Styles/title';

function Contact() {
  const styles = StyleSheet.create({
    styleSection: styleSection as object,
    styleH1: styleH1 as object,
    styleContent: styleContent as object,
    styleTitle: styleTitle as object,
    styleLink: UrlRight as object,
    imgStyle: imgStyle as object,
    linkWithImg: linkWithImg as object,
    styleList: styleList as object,
  });

  return (
    <View style={styles.styleSection}>
      <Text style={styles.styleH1}>LE PRIOL Matthieu</Text>
      <Text style={styles.styleContent}>
        {'En pleine reconversion, je suis passionné d\'informatique et spécialisé en développement web fullstack JavaScript. Autonome et autodidacte, j\'ai acquis des compétences solides dans ce domaine en suivant ma passion.'}
      </Text>
      <Text style={styles.styleTitle}>Contact</Text>
      <View style={styles.styleList}>
        <Link src="mailto:lepriol.matthieu@gmail.com"><Text style={styles.styleLink}>lepriol.matthieu@gmail.com</Text></Link>
        <Link src="tel:0649389905" style={styles.styleLink}>06.49.38.99.05</Link>
        <Text style={styles.styleLink}>Belz, Morbihan, France</Text>

        <Link src="https://www.mimouss.fr" style={styles.linkWithImg}>
          <Image src="https://img.icons8.com/ios-filled/32/ffffff/domain.png" style={styles.imgStyle} />
          <Text style={styles.styleLink}>
            www.mimouss.fr
          </Text>
        </Link>
        <Link src="https://www.linkedin.com/in/matthieu-le-priol56/" style={styles.linkWithImg}>
          <Image src="https://img.icons8.com/ios-filled/32/ffffff/linkedin.png" style={styles.imgStyle} />
          <Text style={styles.styleLink}>
            matthieu-le-priol56/
          </Text>
        </Link>

      </View>

    </View>
  );
}

export default Contact;
