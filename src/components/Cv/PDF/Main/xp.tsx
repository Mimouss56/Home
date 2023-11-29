import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { IEmploi } from '../../../../@types/Home/emploi';
import DetailsXp from './detailsXp';
import { titleSection } from '../../Styles/title';

function Xp(contents: { content: IEmploi[], titre: string }) {
  const {
    content,
    titre,
  } = contents;

  const styles = StyleSheet.create({
    titleSection: titleSection as object,
  });

  return (
    <View id="xp">
      <Text id="title_info" style={styles.titleSection}>{titre}</Text>
      {
        content.map((emploi: IEmploi) => (
          <DetailsXp
            key={emploi.ent}
            ent={emploi.ent}
            date={emploi.date}
            lieu={emploi.lieu}
            description={emploi.description}
            title={emploi.title}
            competences={emploi.competences}
          />
        ))
      }
    </View>
  );
}

export default Xp;
