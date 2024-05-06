import {
  Text, StyleSheet, View, Link, Image,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  UrlRight, imgStyle, linkWithImg, styleContent, styleList, styleSection, avatarImg,
} from '../../Styles/content';
import { styleH1, styleTitle } from '../../Styles/title';
import axiosInstance from '../../../../utils/axios';
import { MoussID, baseUrl } from '../../../../../config.json';
import { IUser } from '../../../../@types/Home/user';

function Contact() {
  const [userMouss, setUserInfo] = useState({} as IUser);
  const fetchInfo = async () => {
    try {
      const userInfoDataReponse = await axiosInstance.get(`/api/home/user/${MoussID}`);
      setUserInfo(userInfoDataReponse.data.user);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données');
    }
  };

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

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <View style={styles.styleSection}>
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Image src={`${baseUrl}/images/${userMouss.avatar?.path}`} style={styles.avatarImg} />
        <Text style={styles.styleH1}>{`${userMouss.last_name} ${userMouss.first_name}`}</Text>
      </View>
      <Text style={styles.styleContent}>
        {userMouss.prez}
      </Text>
      <Text style={styles.styleTitle}>Contact</Text>
      <View style={styles.styleList}>
        <Link src={`mailto:${userMouss.email}`}>
          <Text style={styles.styleLink}>{userMouss.email}</Text>
        </Link>
        <Link src={`tel:${userMouss.phone}`} style={styles.styleLink}>
          <Text style={styles.styleLink}>{userMouss.phone}</Text>
        </Link>
        <Text style={styles.styleLink}>{userMouss.address}</Text>
        {userMouss.website && (
          <Link src={`${userMouss.website}`} style={styles.linkWithImg}>
            <Image src="https://img.icons8.com/ios-filled/32/ffffff/domain.png" style={styles.imgStyle} />
            <Text style={styles.styleLink}>
              {userMouss.website}
            </Text>
          </Link>
        )}
        {userMouss.linkedin && (
          <Link src={`${userMouss.linkedin}`} style={styles.linkWithImg}>
            <Image src="https://img.icons8.com/ios-filled/32/ffffff/linkedin.png" style={styles.imgStyle} />
            <Text style={styles.styleLink}>
              {userMouss.linkedin.split('/')[4]}
            </Text>
          </Link>
        )}
        {userMouss.github && (
          <Link src={`${userMouss.github}`} style={styles.linkWithImg}>
            <Image src="https://img.icons8.com/ios-filled/32/ffffff/github.png" style={styles.imgStyle} />
            <Text style={styles.styleLink}>
              {userMouss.github.split('/')[3]}
            </Text>
          </Link>
        )}

      </View>

    </View>
  );
}

export default Contact;
