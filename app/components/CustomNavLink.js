'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../CustomNavLink.module.css'; // Asumimos que crearemos este archivo

const CustomNavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
      {children}
    </Link>
  );
};

export default CustomNavLink;