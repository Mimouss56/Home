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
        content
          .sort((a, b) => (a.date.fin > b.date.fin ? -1 : 1))
          .map((emploi: IEmploi) => {
            // console.log(emploi);
            return (
              <DetailsXp
                key={emploi.id}
                ent={emploi.ent}
                date={emploi.date}
                description={emploi.description}
                title={emploi.title}
                competences={emploi.competences}
                id={emploi.id}
                type="job"
              />
            );
          })
      }
    </View>
  );
}

export default Xp;
