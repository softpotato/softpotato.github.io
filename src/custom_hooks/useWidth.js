import { useState, useEffect } from 'react';

/**
 * This is partially based off the 2 posts below,
 * but it returns the width of xs, sm, md, and
 * lg.
 * 
 * Citation: 
 * https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto
 * https://www.sobyte.net/post/2021-09/detecting-mobile-browser/#:~:text=window.screen%EF%BC%8Cwindow.innerWidth%20Another%20way%20to%20tell%20if%20it%20is,is%20the%20width%20of%20the%20screen%20%28in%20pixels%29.
 * 
 */
export default function useWidth() {
  function getWidth() {
    if (window.innerWidth < 768) {
      return "xs";
    } else if (window.innerWidth < 991) {
      return "sm";
    } else if (window.innerWidth < 1199) {
      return "md";
    } else {
      return "lg";
    }
  }

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {setWidth(getWidth())});
    return () => {
      window.removeEventListener('resize', () => {setWidth(getWidth())});
    }
  }, []);

  return width;
}