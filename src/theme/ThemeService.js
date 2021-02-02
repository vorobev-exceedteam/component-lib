import chroma from 'chroma-js';
import BaseFilledButton from '../components/Base/BaseFilledButton';
import BaseFlatButton from '../components/Base/BaseFlatButton';
import BaseGradientButton from '../components/Base/BaseGradientButton';
import BaseOutlinedButton from '../components/Base/BaseOutlinedButton';
import BaseReliefButton from '../components/Base/BaseReliefButton';
import defaultTheme from './defaultTheme';

class ThemeService {
  static getBaseColors = (
    color = 'primary',
    theme,
    colorVariation = 'main'
  ) => {
    const baseTheme = ThemeService.getBaseTheme(theme);
    const baseColor = baseTheme[color]
      ? chroma(baseTheme[color][colorVariation])
      : chroma(color);
    let baseTextColor =
      baseColor.luminance() > 0.7 ? chroma('black') : chroma('white');
    if (baseTheme.text?.light && baseTheme.text?.dark) {
      baseTextColor =
        baseColor.luminance() > 0.7
          ? chroma(baseTheme.text.dark)
          : chroma(baseTheme.text.light);
    }
    return [baseColor, baseTextColor, baseTheme];
  };

  static getBaseTheme = (theme) => {
    return Object.keys(theme).length ? theme : defaultTheme;
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

  static getInputSize = (size) => {
    switch (size) {
      case 'small':
        return {
          padding: '.188rem .857rem',
          lineHeight: '1',
          height: '2.142rem',
          fontSize: '.857rem'
        };
      case 'large':
        return {
          padding: '.75rem 1.143rem',
          lineHeight: '1.25',
          height: '3.2857rem',
          fontSize: '1.143rem'
        };
      default:
        return {
          padding: '.438rem 1rem',
          lineHeight: '1.45',
          height: '2.714rem;',
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

  static getReliefButtonStyle = (color, theme, colorVariation) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );
    return {
      mainText: baseTextColor.hex(),
      mainBg: baseColor.hex(),
      hoverBg: baseColor.brighten(0.2).hex(),
      activeBg: baseColor.darken().hex()
    };
  };

  static getGradientButtonStyle = (color, theme, colorVariation) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );
    return {
      mainText: baseTextColor.hex(),
      mainLightBg: baseColor.brighten().hex(),
      main: baseColor.hex(),
      activeDarkBg: baseColor.darken().hex()
    };
  };

  static getFilledButtonStyle = (color, theme, colorVariation) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );
    return {
      mainText: baseTextColor.hex(),
      main: baseColor.hex(),
      mainBg: baseColor.hex(),
      activeBg: baseColor.darken(0.5).hex()
    };
  };

  static getAlertStyle = (color, colorVariation, theme) => {
    const [baseColor] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );
    return {
      bg: baseColor.alpha(0.13).css(),
      main: baseColor.hex(),
      boxShadow: baseColor.alpha(0.4).css()
    };
  };

  static getFlatButtonStyle = (color, theme, colorVariation) => {
    const [baseColor] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );
    return {
      mainBg: baseColor.alpha(0).css(),
      main: baseColor.hex(),
      hoverBg: baseColor.alpha(0.05).css(),
      activeBg: baseColor.alpha(0.15).css()
    };
  };

  static getBadgeStyle = (theme, color, colorVariation) => {
    const [baseColor, baseTextColor] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );
    return {
      main: baseColor.hex(),
      bgLight: baseColor.alpha(0.13).css(),
      hoverBg: baseColor.darken(0.5).hex(),
      hoverBgLight: baseColor.alpha(0.2).css(),
      text: baseTextColor.hex()
    };
  };

  static getInputStyle = (color, colorVariation, theme) => {
    const [baseColor, baseTextColor, baseTheme] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );
    return {
      bg: baseColor.hex(),
      text: baseTextColor.hex(),
      success: baseTheme.success[colorVariation || 'main'],
      danger: baseTheme.danger[colorVariation || 'main']
    };
  };

  static getTypographyStyle = (
    variant,
    theme,
    fontWeightVariant,
    color,
    colorVariation
  ) => {
    const [baseColor, baseTextColor, baseTheme] = ThemeService.getBaseColors(
      color,
      theme,
      colorVariation
    );

    const textColor = color ? baseColor : chroma(baseTheme.text.dark);
    let fontWidth;
    switch (fontWeightVariant) {
      case 'light':
        fontWidth = '400';
        break;
      case 'bold':
        fontWidth = '600';
        break;
      default:
        fontWidth = '500';
        break;
    }
    switch (variant) {
      case 'h1':
        return {
          fontSize: '2rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'h2':
        return {
          fontSize: '1.714rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'h3':
        return {
          fontSize: '1.5rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'h4':
        return {
          fontSize: '1.286rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'h5':
        return {
          fontSize: '1.07rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'h6':
        return {
          fontSize: '1rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'secondary':
        return {
          fontSize: '.857rem',
          textColor: textColor.alpha(0.35).css(),
          fontWidth
        };
      case 'display1':
        return {
          fontSize: '6rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'display2':
        return {
          fontSize: '5.5rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'display3':
        return {
          fontSize: '4.5rem',
          textColor: textColor.hex(),
          fontWidth
        };
      case 'display4':
        return {
          fontSize: '3.5rem',
          textColor: textColor.hex(),
          fontWidth
        };
      default:
        return {
          fontSize: '1.25rem',
          textColor: textColor.hex(),
          fontWidth
        }
    }
  };
}

export default ThemeService;
