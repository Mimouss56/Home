import {
  StyleSheet, Text, View, Link,
} from '@react-pdf/renderer';
import {
  titleAnnote, titleEntView, titleSection, titleTitle,
} from '../../Styles/title';
import { dateSection, flexGlobal } from '../../Styles/global';
import { UrlLeft, contentView, viewContentDev } from '../../Styles/content';

function Dev() {
  const styles = StyleSheet.create({
    titleSection: titleSection as object,
    Date: dateSection as object,
    titleAnnote: titleAnnote as object,
    titleEnt: titleEntView as object,
    titleTitle: titleTitle as object,
    flexGlobal: flexGlobal as object,
    Content: contentView as object,
    viewContentDev: viewContentDev as object,
    UrlLeft: UrlLeft as object,
  });

  return (
    <section id="dev">
      <Text id="title_info" style={styles.titleSection}>Expérience Développeur</Text>

      <View id="xp_1" style={styles.flexGlobal}>
        {/* 1er Bloc de date */}
        <Text id="xp_date" style={styles.Date}>2023</Text>
        {/* Bloc de D'ent */}

        <View id="xp_content" style={styles.Content}>
          <View style={styles.titleEnt}>
            <Text style={styles.titleTitle}>Développeur JS</Text>
          </View>
          {/* Bloc de desc */}
          <View style={styles.viewContentDev}>
            <Text>
              Création d&apos;un outils web pour mes besoins personnels : sous ReactJS et NodeJS
            </Text>
            <Text>
              Création suivi de candidature Gestion diffusion CV sous React
              Mise en place d&apos;API REST pour une école maternelle
              Gestion complète de suivi de distribution d&apos;argent de poche sur le mérite
            </Text>
            <Link
              style={styles.UrlLeft}
              src="https://www.mimouss.fr"
            >
              <Text>Mimouss Home</Text>
            </Link>
          </View>

          <View style={styles.viewContentDev}>
            <Text>Création d&apos;une application web sous ReactJS et NodeJS</Text>
            <Text>(système de collaboration entre développeurs pour du pair-programming.)</Text>
            <Link
              style={styles.UrlLeft}
              src="https://oside.mimouss.fr"
            >
              <Text>O&apos;Side Project</Text>
            </Link>
          </View>
          <View style={styles.viewContentDev}>
            <Text>Migration de l&apos;application bbc.mimouss.fr de PHP sous JS</Text>
            <Text>(Authentification et gestion utilisateur via Discord, Gestion de dons)</Text>
          </View>
        </View>
      </View>

      <View id="xp_1" style={styles.flexGlobal}>
        {/* 1er Bloc de date */}
        <Text id="xp_date" style={styles.Date}>2012 - 2023</Text>
        {/* Bloc de D'ent */}
        <View id="xp_content" style={styles.Content}>
          <View style={styles.titleEnt}>
            <Text style={styles.titleTitle}>Développeur PHP</Text>
            <Text style={styles.titleAnnote}>(autodidacte)</Text>
          </View>
          {/* Bloc de desc */}
          <View style={styles.viewContentDev}>
            <Text>
              Création sous PHP du site de la kermesse de l&apos;école maternelle de Fouras.
            </Text>
            <Text>(Gestion complète des lots et des tickets de tombola.)</Text>
          </View>
          <View style={styles.viewContentDev}>
            <Text>
              Création d&apos;un site de compte rendu hebdomadaire de déplacements professionnels.
            </Text>
            <Text>(Gestion d&apos;un backoffice pour plusieurs utilisateurs.)</Text>
          </View>
          <View style={styles.viewContentDev}>
            <Text>Création d&apos;une application pour une communauté de joueurs.</Text>
            <Text>(Authentification via Discord, Gestion de dons)</Text>
          </View>
        </View>
      </View>

      <View id="xp_1" style={styles.flexGlobal}>
        {/* 1er Bloc de date */}
        <Text id="xp_date" style={styles.Date}>2012</Text>
        {/* Bloc de D'ent */}
        <View id="xp_content" style={styles.Content}>
          <View style={styles.titleEnt}>
            <Text style={styles.titleTitle}>Développeur WordPress</Text>
            <Text style={styles.titleAnnote}>(autodidacte)</Text>
          </View>
          {/* Bloc de desc */}
          <View style={styles.viewContentDev}>
            <Text>Apprentissage de WordPress et des plugins.</Text>
            <Text>
              Création du site vitrine du club de handball,
              gestion complète avec hébergement sous OVH.
            </Text>
            <Text>
              Développement de plugin de gestion des résultats des scores
              et des classements.
            </Text>
          </View>
        </View>
      </View>

    </section>

  );
}

export default Dev;
