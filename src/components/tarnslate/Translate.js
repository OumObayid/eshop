import React, { useEffect } from "react";

const GoogleTranslate = () => {
    const googleTranslateElementInit = ()=> {
        /* eslint-disable no-new */
        new window.google.translate.TranslateElement({pageLanguage: 'pt', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT}, 'google_translate_element')
      }
    useEffect(() => { 

        // in some cases, the google translate script adds a style to the opening html tag.
        // this added style disables scrolling.
        // the next 3 lines removes this added style in order to re-enable scrolling.
        // if (window.document.scrollingElement.hasAttribute("style")) {
        //   window.document.scrollingElement.setAttribute("style", "");        
        // }
      
          window.googleTranslateElementInit = googleTranslateElementInit();

      });

  return (
    <>
    <script type='text/javascript' src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' />
    <div id="google_translate_element" ></div>
    </>
  );
};

export default GoogleTranslate;