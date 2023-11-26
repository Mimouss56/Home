import {
  Text, StyleSheet, View,
} from '@react-pdf/renderer';
import { styleList, styleSection } from '../../Styles/content';
import { styleTitle } from '../../Styles/title';

function Lang() {
  const styles = StyleSheet.create({
    styleSection: styleSection as object,
    styleTitle: styleTitle as object,
    styleList: styleList as object,
  });

  return (
    <View style={styles.styleSection}>
      <Text style={styles.styleTitle}>Langues</Text>
      <View style={styles.styleList}>
        <Text>Français - C2</Text>
        <Text>Anglais - A2</Text>

      </View>
    </View>
  );
}

export default Lang;
