import {
  Text, StyleSheet, View, Image,
} from '@react-pdf/renderer';
import { styleH3, styleTitle } from '../../Styles/title';
import { flexImg, styleSection } from '../../Styles/content';

const color = 'color';
const size = '64';

function Skills() {
  const styles = StyleSheet.create({
    styleSection: styleSection as object,
    styleTitle: styleTitle as object,
    styleH3: styleH3 as object,
    styleFlex: flexImg as object,
    imgStyle: {
      maxHeight: 30,
    },
  });

  return (
    <View style={styles.styleSection}>
      <Text style={styles.styleTitle}>Technos</Text>
      <Text style={styles.styleH3}>Front-end</Text>
      <View style={styles.styleFlex}>
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/html-5--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/css3.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/javascript--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/react-native.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/redux.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/typescript.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/bootstrap.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/ejs.png`} />
      </View>
      <Text style={styles.styleH3}>Back-end</Text>
      <View style={styles.styleFlex}>
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/nodejs.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/express.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/postgreesql.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/mysql-logo.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/php.png`} />
        <Image style={styles.imgStyle} src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" />
      </View>
      <Text style={styles.styleH3}>Outils</Text>
      <View style={styles.styleFlex}>
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/visual-studio-code-2019.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/000000/${size}/git.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/github--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/discord--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/wordpress.png`} />
      </View>
    </View>
  );
}

export default Skills;
