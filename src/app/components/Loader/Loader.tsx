import { CSSProperties } from 'react';
import { PulseLoader } from 'react-spinners';

interface LoaderProps {
  size?: number | string;
  margin?: number | string;
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

const Loader = (props: LoaderProps) => {
  const {
    size = 12,
    margin = 6,
    color = '#EA580C',
    speedMultiplier = 0.7,
    ...rest
  } = props;

  return (
    <PulseLoader
      size={size}
      margin={margin}
      color={color}
      speedMultiplier={speedMultiplier}
      {...rest}
    />
  );
};

export default Loader;
