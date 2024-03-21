import { Text, StyleSheet } from '@react-pdf/renderer';
import { styleContent } from '../../Styles/content';
import { ICVDetails } from '../../../../@types/Home/emploi';

function HeaderCv({ title }: { title: ICVDetails }) {
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
        {title.title}
      </Text>
      <Text style={styles.styleContent}>
        {title.description}
      </Text>
    </>
  );
}

export default HeaderCv;
