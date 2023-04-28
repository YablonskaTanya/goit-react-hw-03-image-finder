import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#3f51b5"
      innerCircleColor="#3f51b5"
      middleCircleColor="#3f51b5"
    />
  );
};
