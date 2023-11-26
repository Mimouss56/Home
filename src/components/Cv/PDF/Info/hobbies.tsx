import {
  Text, StyleSheet, View,
} from '@react-pdf/renderer';
import { styleList, styleSection } from '../../Styles/content';
import { styleTitle } from '../../Styles/title';

function Hobbies() {
  const styles = StyleSheet.create({
    styleSection: styleSection as object,
    styleTitle: styleTitle as object,
    styleList: styleList as object,
  });

  return (
    <View style={styles.styleSection}>
      <Text style={styles.styleTitle}>Loisirs</Text>
      <View style={styles.styleList}>
        <Text>License Zelda de Nintendo</Text>
        <Text>Série Médicale US</Text>
        <Text>French Touch</Text>
      </View>
    </View>
  );
}

export default Hobbies;
