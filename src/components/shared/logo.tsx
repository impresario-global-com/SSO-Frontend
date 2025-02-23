import React from 'react';
import logoSvg from '@/assets/logo.svg';
import doBeLogoSvg from '@/assets/do-be-logo.svg';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Logo: React.FC<LogoProps> = (props) => {
  return <img src={logoSvg} alt="Cause i" {...props} />;
};

export const DoBeLogo: React.FC<LogoProps> = (props) => {
  return <img src={doBeLogoSvg} alt="Do Be" {...props} />;
};

export default Logo;
