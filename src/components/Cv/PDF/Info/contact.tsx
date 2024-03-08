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
  const [userInfo, setUserInfo] = useState({} as IUser);
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
  console.log(userInfo);

  return (
    <View style={styles.styleSection}>
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Image src={`${baseUrl}/images/${userInfo.avatar?.path}`} style={styles.avatarImg} />
        <Text style={styles.styleH1}>{`${userInfo.last_name} ${userInfo.first_name}`}</Text>
      </View>
      <Text style={styles.styleContent}>
        {userInfo.prez}
      </Text>
      <Text style={styles.styleTitle}>Contact</Text>
      <View style={styles.styleList}>
        <Link src={`mailto:${userInfo.email}`}>
          <Text style={styles.styleLink}>{userInfo.email}</Text>
        </Link>
        <Link src={`tel:${userInfo.phone}`} style={styles.styleLink}>{userInfo.phone}</Link>
        <Text style={styles.styleLink}>{userInfo.address}</Text>

        <Link src={`${userInfo.website}`} style={styles.linkWithImg}>
          <Image src="https://img.icons8.com/ios-filled/32/ffffff/domain.png" style={styles.imgStyle} />
          <Text style={styles.styleLink}>
            {userInfo.website}
          </Text>
        </Link>
        <Link src={`${userInfo.linkedin}`} style={styles.linkWithImg}>
          <Image src="https://img.icons8.com/ios-filled/32/ffffff/linkedin.png" style={styles.imgStyle} />
          <Text style={styles.styleLink}>
            {userInfo.linkedin?.split('/')[4]}
          </Text>
        </Link>
        <Link src={`${userInfo.github}`} style={styles.linkWithImg}>
          <Image src="https://img.icons8.com/ios-filled/32/ffffff/github.png" style={styles.imgStyle} />
          <Text style={styles.styleLink}>
            {userInfo.github?.split('/')[3]}
          </Text>
        </Link>

      </View>

    </View>
  );
}

export default Contact;
