import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';

import Search_Name from '../components/search/search-name';
import Search_ID from '../components/search/search-id';
import Filter_Tags from '../components/search/filter-tags';

import styles from '@/styles/Buttons.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function LandingPage() {
  return (
    <>
      <div className={styles.search_btn}>
        {/* <Search_Name /> */}
        {/* <Search_ID /> */}
        <Filter_Tags />
      </div>
    </>
  );
}
