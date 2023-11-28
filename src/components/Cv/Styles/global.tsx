import RobotoLightItalic from '../../../assets/font/Roboto/Roboto-LightItalic.ttf';
import RobotoBold from '../../../assets/font/Roboto/Roboto-Bold.ttf';
import RobotoRegular from '../../../assets/font/Roboto/Roboto-Regular.ttf';
// import RobotoLight from '../../../assets/font/Roboto/Roboto-Light.ttf';
import RobotoThin from '../../../assets/font/Roboto/Roboto-Thin.ttf';

export const FontRoboto = {
  family: 'Roboto',
  fonts: [
    {
      src: RobotoThin,
      fontWeight: 100,
      fontStyle: 'thin',
    },
    {
      src: RobotoLightItalic,
      fontWeight: 300,
      fontStyle: 'light italic',
    },
    {
      src: RobotoRegular,
      fontWeight: 400,
      fontStyle: 'regular',
    },
    {
      src: RobotoBold,
      fontWeight: 700,
      fontStyle: 'bold',
    },
  ],

};
export const dateSection = {
  width: '10%',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontStyle: 'light italic',
  margin: '5px',

};

export const Glob = {
  display: 'flex',
  flexDirection: 'row',
  fontSize: '10px',
  fontFamily: 'Roboto',
  fontStyle: 'regular',
};
export const flexGlobal = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  // alignItems: 'center',
  margin: '5px',
};
export const Left = {
  backgroundColor: '#ffffff',
  width: '70%',
  padding: '10px',
};
export const Right = {
  backgroundColor: '#ce6b01',
  width: '30%',
};
