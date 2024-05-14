import { Text, StyleSheet } from '@react-pdf/renderer';
import { styleContent } from '../../Styles/content';

function HeaderCv({ title, desc }: { title: string, desc: string }) {
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
        {title}
      </Text>
      <Text style={styles.styleContent}>
        {desc}
      </Text>
    </>
  );
}

export default HeaderCv;
