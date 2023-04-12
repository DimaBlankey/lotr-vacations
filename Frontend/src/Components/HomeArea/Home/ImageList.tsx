import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image1 from "../../../Assets/images/02f70c25-c557-44db-88e2-ecc2634bbad0.webp"
import Image2 from "../../../Assets/images/154bdc39-89d7-4adb-b7bd-7982dc340600.jpg"
import Image3 from "../../../Assets/images/19b7a038-c056-496b-a8e1-f41ebfe51000.jpg"
import Image4 from "../../../Assets/images/8877289c-ade4-401a-ba74-13afe756df1f.jpg"
import Image5 from "../../../Assets/images/a3f01383-03e5-4613-b4a3-dd8276fbfaab.jpg"
import Image6 from "../../../Assets/images/f586f169-2d7f-47ed-aeae-863029d48ca5.webp"
import Image7 from "../../../Assets/images/9d5a5d0f-e259-4c7e-ad45-e361113a982e.png"
import Image8 from "../../../Assets/images/92d0440e-91cf-467c-a653-0242b6de0057.png"


function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: Image1,
    title: 'vacations',
    rows: 2,
    cols: 2,
  },
  {
    img: Image8,
    title: 'vacations',
  },
  {
    img: Image3,
    title: 'vacations',
  },
  {
    img: Image4,
    title: 'vacations',
    cols: 2,
  },
  {
    img: Image5,
    title: 'vacations',
    cols: 2,
  },
  {
    img: Image6,
    title: 'Honey',
    author: 'vacations',
    rows: 2,
    cols: 2,
  },
  {
    img: Image7,
    title: 'vacations',
  },
  {
    img: Image2,
    title: 'vacations',
  },


];
