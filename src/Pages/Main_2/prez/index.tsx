import { IUser } from '../../../@types/Home/user';
import Tags from '../../../components/Tag';
import useFetchData from '../../../hook/useFetchData';

function Prez({ Mouss }: { Mouss: IUser }) {
  const [dataHardSkill] = useFetchData('/api/home/hardskill');
  return (
    <section id="landing-page" className="bg-dark vh-100 d-flex align-items-center ">
      <div className="w-75 h-50 m-auto row">
        <div className="col-md-6">
          <h1>{`${Mouss.last_name} ${Mouss.first_name}`}</h1>
          <p>{`${Mouss.prez}`}</p>
        </div>
        <div className="col-md-6">
          {/* {dataHardSkill && dataHardSkill.map((skill : IHard) => (
            <Tags
              key={skill.id}
              icon="https://img.icons8.com/ios/40/000000/html-5.png"
              name="HTML"
              color="red"
            />
          ))} */}
          <Tags
            icon="https://img.icons8.com/ios/40/000000/html-5.png"
            name="HTML"
            color="red"
          />
          <Tags
            icon="https://img.icons8.com/ios/40/000000/css3.png"
            name="CSS"
            color="blue"
          />
          <Tags
            icon="https://img.icons8.com/ios/40/000000/javascript.png"
            name="JS"
            color="yellow"
          />
          <Tags
            icon="https://img.icons8.com/ios/40/000000/react-native.png"
            name="React"
            color="blue-dark"
          />

          <img src="https://via.placeholder.com/500" alt="test" />
        </div>

      </div>
    </section>
  );
}

export default Prez;

/*
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/html-5--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/css3.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/javascript--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/react-native.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/redux.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/typescript.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/bootstrap.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/ejs.png`} />
      </View>
      <Text style={styles.styleH3}>Back-end</Text>
      <View style={styles.styleFlex}>
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/nodejs.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/express.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/postgreesql.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/mysql-logo.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/php.png`} />
        <Image style={styles.imgStyle} src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" />
      </View>
      <Text style={styles.styleH3}>Outils</Text>
      <View style={styles.styleFlex}>
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/visual-studio-code-2019.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/000000/${size}/git.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/github--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/discord--v1.png`} />
        <Image style={styles.imgStyle} src={`https://img.icons8.com/${color}/${size}/wordpress.png`} />
*/
