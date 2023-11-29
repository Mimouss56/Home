import {
  Page, View, Document, StyleSheet, Font,
} from '@react-pdf/renderer';
import { IEmploi } from '../../../@types/Home/emploi';
import HeaderCv from './Header/header';
import Xp from './Main/xp';
import Contact from './Info/contact';
// import Skills from '../Info/skills';
import {
  Glob, Left, Right, FontRoboto,
} from '../Styles/global';
import Skills from './Info/skills';
import Lang from './Info/lang';
import Hobbies from './Info/hobbies';
import Dev from './Main/dev';

interface Props { listJob: IEmploi[], listSchool: IEmploi[] }

function PDFExport({ listJob, listSchool }: Props) {
  const styles = StyleSheet.create({
    styleGlob: Glob as object,
    styleLeft: Left as object,
    styleRight: Right as object,
  });

  Font.register(FontRoboto);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.styleGlob}>
          <View style={styles.styleLeft}>
            <HeaderCv />
            <Dev />
            <Xp content={listJob} titre="Autres Expériences" />
            <Xp content={listSchool} titre="Formations" />

          </View>
          <View style={styles.styleRight}>
            <Contact />
            <Skills />
            <Lang />
            <Hobbies />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFExport;
