import {
  Page, View, Document, StyleSheet, Font, Text, Image, Link,
} from '@react-pdf/renderer';
import HeaderCv from './Header/header';
import Xp from './Main/xp';
import Contact from './Info/contact';
// import Skills from '../Info/skills';
import {
  Glob, Left, Right, FontRoboto, Footer,
} from '../Styles/global';
import { imgStyle, linkWithImg } from '../Styles/content';
import Skills from './Info/skills';
import Lang from './Info/lang';
import Hobbies from './Info/hobbies';
import Dev from './Main/dev';
import { IUser } from '../../../@types/Home/user';

function PDFExport({ info }: { info: IUser }) {
  const styles = StyleSheet.create({
    styleGlob: Glob as object,
    styleLeft: Left as object,
    styleRight: Right as object,
    styleFooter: Footer as object,
    styleImg: imgStyle as object,
    styleLink: {
      ...linkWithImg,
      color: 'red',
    } as object,
  });

  Font.register(FontRoboto);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.styleGlob}>
          <View style={styles.styleLeft}>
            <HeaderCv title={info.cv.title} desc={info.cv.description} />
            <Dev />
            <Xp
              content={
                info?.cv.job.filter(
                  (j) => j.competences.some((c) => c.name === 'Maintenance'),
                )
              }
              titre="Autres Expériences"
            />
            <Xp content={info.cv.school} titre="Formations" />
            <View style={styles.styleFooter}>
              <Text>
                {'CV généré avec passion avec '}
                <Link src="https://react-pdf.org/" style={styles.styleLink}>
                  <Image src="https://react-pdf.org/images/logo.png" style={styles.styleImg} />
                  <Text style={styles.styleLink}>
                    REACT PDF
                  </Text>
                </Link>

              </Text>
            </View>
          </View>
          <View style={styles.styleRight}>
            <Contact mouss={info} />
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
