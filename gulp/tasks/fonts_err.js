// File needs tobe fixed

import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // looking for .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // convert to .ttf
      .pipe(fonter({ formats: [`ttf`] }))
      // deploy back to source folder
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};

export const ttfToWoff = () => {
  // looking for .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      // convert to woff
      .pipe(fonter({ formats: [`woff`] }))
      // deploy to destination folder
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // looking for ttf
      .pipe(app.gulp.src(`$${app.path.srcFolder}/fonts/*.ttf`))
      // convert to woff2
      .pipe(ttf2woff2())
      // deploy to destination folder
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontsStyle = () => {
  // Font style file for fonts
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Checking if fonts exist
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Check if style file for fonts exists
      if (!fs.existsSync(fontsFile)) {
        // If no file - create it
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < items.length; i++) {
          // Attach fonts to styles
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly != fontFileName) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;
            switch (fontWeight.toLowerCase()) {
              case 'thin':
                fontWeight = 100;
                break;
              case 'extralight':
                fontWeight = 200;
                break;
              case 'light':
                fontWeight = 300;
                break;
              case 'medium':
                fontWeight = 500;
                break;
              case 'semibold':
                fontWeight = 600;
                break;
              case 'bold':
                fontWeight = 700;
                break;
              case 'extrabold':
              case 'heavy':
                fontWeight = 800;
                break;
              case 'black':
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
                break;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {
									font-family: ${fontName};
									font-display: swap;
									src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
									font-weight: ${fontWeight};
									font-style: normal;
							}\r\n`,
              cb
            );
          }
          newfileOnly = fontFileName;
        }
      }
    } else {
      // If file exist - log it to console
      console.log(
        'Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!'
      );
    }
  });
};
