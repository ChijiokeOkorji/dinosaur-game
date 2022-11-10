import { useCallback, useLayoutEffect, useRef } from 'react';

import styles from './dinosaur-style.module.scss';

const Dinosaur = ({ setBounds, onAnimationEnd, playerJump, isRunning, isContact }) => {
  const playerRef = useRef(null);

  const point1 = useRef(null);
  const point2 = useRef(null);
  const point3 = useRef(null);

  const timerRefreshFrame = useRef(null);

  const getObjectBound = useCallback(() => {
    const bound1 = point1.current.getBoundingClientRect();
    const bound2 = point2.current.getBoundingClientRect();
    const bound3 = point3.current.getBoundingClientRect();

    setBounds([
      {
        left: bound1.left,
        right: bound1.right,
        bottom: bound1.bottom
      },
      {
        left: bound2.left,
        right: bound2.right,
        bottom: bound2.bottom
      },
      {
        left: bound3.left,
        right: bound3.right,
        bottom: bound3.bottom
      }
    ]);

    timerRefreshFrame.current = requestAnimationFrame(getObjectBound);
  }, [setBounds]);

  useLayoutEffect(() => {
    if ((isRunning && !isContact)) {
      timerRefreshFrame.current = requestAnimationFrame(getObjectBound);
    } else {
      cancelAnimationFrame(timerRefreshFrame.current);
    }
    
    return () => cancelAnimationFrame(timerRefreshFrame.current);
  }, [isRunning, isContact, getObjectBound]);

  useLayoutEffect(() => {
    if (isContact) {
      playerRef.current.style.animationPlayState = 'paused';
    } else {
      playerRef.current.style.animationPlayState = 'running';
    }
  }, [isContact]);

  return (
    <div
      className={`${playerJump ? `${styles.jump} ` : ''}${styles.player} grid`}
      onAnimationEnd={onAnimationEnd}
      ref={playerRef}
    >
      <div className={styles.p1} />
      <div className={styles.p2} />
      <div className={styles.p3} ref={point1} />
      <div className={styles.p4} />
      {isRunning && isContact &&
        <div className={styles.pupil} />
      }
      <div className={styles.p5} />
      <div className={styles.p6} />
      <div className={styles.p7} />
      <div className={styles.p8} />
      <div className={styles.p9} />
      <div className={styles.p10} />
      <div className={styles.p11} />
      <div className={styles.p12} />
      <div className={styles.p13} />
      <div className={styles.p14} />
      <div className={styles.p15} ref={point2} />
      <div className={styles.p16} />
      <div className={styles.p17} />
      <div className={styles.p18} ref={point3} />
      <div className={styles.p19} />
      <div className={styles.p20} />
      <div className={`${!(playerJump || isContact) ? `${styles.legUp} ` : ''}${styles.p21}`} />
      <div className={`${!(playerJump || isContact) ? `${styles.legUp} ` : ''}${styles.p22}`} />
      <div className={`${!(playerJump || isContact) ? `${styles.footUp} ` : ''}${styles.p23}`} />
      <div className={`${!(playerJump || isContact) ? `${styles.footUp} ` : ''}${styles.p24}`} />
    </div>
  );
};

export { Dinosaur };
