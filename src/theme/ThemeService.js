import chroma from 'chroma-js';
import BaseFilledButton from '../components/Base/BaseFilledButton';
import BaseFlatButton from '../components/Base/BaseFlatButton';
import BaseGradientButton from '../components/Base/BaseGradientButton';
import BaseOutlinedButton from '../components/Base/BaseOutlinedButton';
import BaseReliefButton from '../components/Base/BaseReliefButton';
import defaultTheme from './defaultTheme';

class ThemeService {
  static getBaseAttributes = (color, theme, colorVariation) => {
    const variation = colorVariation ? colorVariation : 'main';
    const baseTheme = theme[color] ? theme : defaultTheme;
    const baseColor =
      baseTheme[color] && baseTheme[color][variation]
        ? chroma(baseTheme[color][variation])
        : chroma(color);
    let baseTextColor =
      baseColor.luminance() > 0.7 ? chroma('black') : chroma('white');
    if (baseTheme.text && baseTheme.text.light && baseTheme.text.dark) {
      baseTextColor =
        baseColor.luminance() > 0.7
          ? chroma(baseTheme.text.dark)
          : chroma(baseTheme.text.light);
    }

    return [baseColor, baseTextColor];
  };

  static getRippleOptions = (variant, ref) => {
    const options = {};

    if (['gradient, relief'].includes(variant)) {
      options.disabled = true;
    }
    const color = chroma(ref.current.style.color);
    options.rippleColor = color.alpha(0.15).css();
    return options;
  };

  static getButtonVariant = (variant) => {
    switch (variant) {
      case 'flat':
        return BaseFlatButton;
      case 'outlined':
        return BaseOutlinedButton;
      case 'relief':
        return BaseReliefButton;
      case 'gradient':
        return BaseGradientButton;
      default:
        return BaseFilledButton;
    }
  };

  static getIconButtonSize = (size) => {
    switch (size) {
      case 'small':
        return {
          padding: '.486rem',
          lineHeight: '1',
          fontSize: '.9rem'
        };
      case 'large':
        return {
          padding: '.8rem',
          lineHeight: '1.25',
          fontSize: '1.25rem'
        };
      default:
        return {
          padding: '.786rem',
          lineHeight: '1',
          fontSize: '1rem'
        };
    }
  };

  static getButtonSize = (size) => {
    switch (size) {
      case 'small':
        return {
          padding: '.486rem 1rem',
          lineHeight: '1',
          fontSize: '.9rem'
        };
      case 'large':
        return {
          padding: '.8rem 2rem',
          lineHeight: '1.25',
          fontSize: '1.25rem'
        };
      default:
        return {
          padding: '.786rem 1.5rem',
          lineHeight: '1',
          fontSize: '1rem'
        };
    }
  };

  static getReliefButtonStyle = (color, active, theme, colorVariation) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseAttributes(
      color,
      theme,
      colorVariation
    );
    return {
      mainText: baseTextColor.hex(),
      mainBg: active ? baseColor.darken(0.5).hex() : baseColor.hex(),
      hoverBg: baseColor.brighten(0.2).hex(),
      activeBg: baseColor.darken().hex()
    };
  };

  static getGradientButtonStyle = (color, active, theme, colorVariation) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseAttributes(
      color,
      theme,
      colorVariation
    );
    return {
      mainText: baseTextColor.hex(),
      mainLightBg: active ? baseColor.hex() : baseColor.brighten().hex(),
      mainDarkBg: active ? baseColor.darken().hex() : baseColor.hex(),
      activeLightBg: baseColor.hex(),
      activeDarkBg: baseColor.darken().hex()
    };
  };

  static getFilledButtonStyle = (color, active, theme, colorVariation) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseAttributes(
      color,
      theme,
      colorVariation
    );
    return {
      mainText: baseTextColor.hex(),
      main: baseColor.hex(),
      mainBg: active ? baseColor.darken(0.5).hex() : baseColor.hex(),
      activeBg: baseColor.darken(0.5).hex()
    };
  };

  static getAlertStyle = (color, colorVariation, theme) => {
    const [baseColor] = ThemeService.getBaseAttributes(
      color,
      theme,
      colorVariation
    );
    return {
      bg: baseColor.alpha(0.13).css(),
      main: baseColor.hex(),
      boxShadow: baseColor.alpha(0.4).css()
    }
  }

  static getFlatButtonStyle = (color, active, theme, colorVariation) => {
    const [baseColor] = ThemeService.getBaseAttributes(
      color,
      theme,
      colorVariation
    );
    return {
      mainBg: active ? baseColor.alpha(0.15).css() : baseColor.alpha(0).css(),
      main: baseColor.hex(),
      hoverBg: active
        ? baseColor.alpha(0.15).css()
        : baseColor.alpha(0.05).css(),
      activeBg: baseColor.alpha(0.15).css()
    };
  };

  // static getTypographyStyle = (variant, theme, color, colorVariant) => {
  //   switch (true) {
  //     case variant.match('/h[1-6]/'):
  //       return ThemeService.getHeadingStyle(
  //         variant,
  //         theme,
  //         color,
  //         colorVariant
  //       );
  //     case variant.match('/display[1-4]/'):
  //       return ThemeService.getDisplayStyle(
  //         variant,
  //         theme,
  //         color,
  //         colorVariant
  //       );
  //     case:
  //   }
  // };

  static getBadgeStyle = (theme, color, colorVariation, light) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseAttributes(
      color,
      theme,
      colorVariation
    );
    return {
      bg: light ? baseColor.alpha(0.13).css() : baseColor.hex(),
      hoverBg: light ? baseColor.alpha(0.2).css() : baseColor.darken(0.5).hex(),
      text: light ? baseColor.hex() : baseTextColor.hex(),
      boxShadow: baseColor.hex()
    };
  };
}

export default ThemeService;
