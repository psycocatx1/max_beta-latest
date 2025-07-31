'use client';

import React from 'react';
import styles from './OriginalItem.module.scss';
import { Image } from '@/components/Image';

export interface OriginalItemData {
  id: string;
  name: string;
  description?: string;
  image?: string;
  language?: string;
  price_USD?: number;
  discount_price_USD?: number;
  currency_symbol?: string;
  additional_data?: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    language?: string;
    price_USD?: number;
    discount_price_USD?: number;
    currency_symbol?: string;
  };
}

interface OriginalItemProps {
  data: OriginalItemData;
  label: string;
  onClick?: () => void;
  showPrice?: boolean;
}

export const OriginalItem = ({
  data,
  label,
  onClick,
  showPrice = false
}: OriginalItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };
  return (
    <div className={styles.original_item} onClick={handleClick}>
      <div className={styles.original_item_header}>
        <span className={styles.original_item_label}>{label}</span>
      </div>
      <div className={styles.original_item_content}>
        {data.image && (
          <div className={styles.original_item_image_container}>
            <Image
              src={data.image}
              alt={data.name}
              width={60}
              height={60}
              className={styles.original_item_image}
            />
          </div>
        )}

        <div className={styles.original_item_text}>
          <span className={styles.original_item_name}>{data.name}</span>

          {data.description && (
            <p className={styles.original_item_description}>{data.description}</p>
          )}

          {data.language && (
            <p className={styles.original_item_description}>{data.language}</p>
          )}

          {showPrice && data.price_USD && (
            <div className={styles.original_item_price}>
              {data.discount_price_USD ? (
                <>
                  <span className={styles.original_item_old_price}>
                    ${data.price_USD}
                  </span>
                  <span className={styles.original_item_discount}>
                    ${data.discount_price_USD}
                  </span>
                </>
              ) : (
                <span className={styles.original_item_current_price}>
                  ${data.price_USD}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 