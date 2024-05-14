import {
  Text, StyleSheet, View, Link, Image,
} from '@react-pdf/renderer';
import {
  UrlRight, imgStyle, linkWithImg, styleContent, styleList, styleSection, avatarImg,
} from '../../Styles/content';
import { styleH1, styleTitle } from '../../Styles/title';
import { baseUrl } from '../../../../../config.json';
import { IUser } from '../../../../@types/Home/user';

function Contact({ mouss }: { mouss: IUser }) {
  const styles = StyleSheet.create({
    styleSection: styleSection as object,
    styleH1: styleH1 as object,
    styleContent: styleContent as object,
    styleTitle: styleTitle as object,
    styleLink: UrlRight as object,
    imgStyle: imgStyle as object,
    linkWithImg: linkWithImg as object,
    styleList: styleList as object,
    avatarImg: avatarImg as object,
  });

  return (
    <View style={styles.styleSection}>
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Image src={`${baseUrl}/images/${mouss.avatar?.path}`} style={styles.avatarImg} />
        <Text style={styles.styleH1}>{`${mouss.last_name} ${mouss.first_name}`}</Text>
      </View>
      <Text style={styles.styleContent}>
        {mouss.prez}
      </Text>
      <Text style={styles.styleTitle}>Contact</Text>
      <View style={styles.styleList}>
        <Link src={`mailto:${mouss.email}`}>
          <Text style={styles.styleLink}>{mouss.email}</Text>
        </Link>
        <Link src={`tel:${mouss.phone}`} style={styles.styleLink}>
          <Text style={styles.styleLink}>{mouss.phone}</Text>
        </Link>
        <Text style={styles.styleLink}>{mouss.address}</Text>
        {mouss.website && (
          <Link src={`${mouss.website}`} style={styles.linkWithImg}>
            <Image src="https://img.icons8.com/ios-filled/32/ffffff/domain.png" style={styles.imgStyle} />
            <Text style={styles.styleLink}>
              {mouss.website}
            </Text>
          </Link>
        )}
        {mouss.linkedin && (
          <Link src={`${mouss.linkedin}`} style={styles.linkWithImg}>
            <Image src="https://img.icons8.com/ios-filled/32/ffffff/linkedin.png" style={styles.imgStyle} />
            <Text style={styles.styleLink}>
              {mouss.linkedin.split('/')[4]}
            </Text>
          </Link>
        )}
        {mouss.github && (
          <Link src={`${mouss.github}`} style={styles.linkWithImg}>
            <Image src="https://img.icons8.com/ios-filled/32/ffffff/github.png" style={styles.imgStyle} />
            <Text style={styles.styleLink}>
              {mouss.github.split('/')[3]}
            </Text>
          </Link>
        )}

      </View>

    </View>
  );
}

export default Contact;
