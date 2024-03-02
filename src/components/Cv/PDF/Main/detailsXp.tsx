import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { IEmploi } from '../../../../@types/Home/emploi';
import { dateSection, flexGlobal } from '../../Styles/global';
import { titleAnnote, titleEntView, titleTitle } from '../../Styles/title';
import { contentView } from '../../Styles/content';

function DetailsXp({
  ent,
  title,
  date,
  description,
}: IEmploi) {
  const dateDebut = new Date(date.debut);
  const dateFin = new Date(date.fin);

  const styles = StyleSheet.create({
    Date: dateSection as object,
    titleAnnote: titleAnnote as object,
    titleEnt: titleEntView as object,
    titleTitle: titleTitle as object,
    flexGlobal: flexGlobal as object,
    Content: contentView as object,

  });

  return (
    <View id="xp_1" style={styles.flexGlobal}>
      {/* 1er Bloc de date */}
      <Text id="xp_date" style={styles.Date}>
        {`${dateDebut.getMonth() + 1}/${dateDebut.getFullYear()} - ${dateFin.getMonth() + 1}/${dateFin.getFullYear()}`}
      </Text>
      {/* Bloc de D'ent */}
      <View id="xp_content" style={styles.Content}>
        <View style={styles.titleEnt}>
          <Text style={styles.titleTitle}>{title}</Text>
          <Text style={styles.titleAnnote}>{`${ent.name}, ${ent.town} (${ent.postalCode})`}</Text>
        </View>
        {/* Bloc de desc */}
        <View>
          <Text>
            {description}
          </Text>
        </View>
      </View>
    </View>

  );
}

export default DetailsXp;
