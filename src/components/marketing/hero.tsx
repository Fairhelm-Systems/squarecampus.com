// @ts-nocheck

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LogIn, CalendarClock } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import Link from 'next/link';
import { LinkButton } from './link-button';
import { useCalEmbed } from '@/hooks/useCalEmbed';
import { CONSTANTS } from '@/constants/links';

const heroHighlights = [
  {
    title: 'Single source of truth',
    detail: 'Admissions, academics, finance, facilities, and communication stay synced across every branch.',
  },
  {
    title: 'Automation for the day-to-day',
    detail: 'Timetables, fee cycles, alerts, and approvals run on autopilot so teams focus on students.',
  },
  {
    title: 'Enterprise-grade trust',
    detail: 'Role-based permissions, audit trails, and 24x7 monitoring keep staff, teachers, and parents aligned.',
  },
];

const heroStats = [
  { value: '7 days', label: 'Implementation window' },
  { value: '99.9%', label: 'Uptime across regions' },
  { value: '15-20 hrs', label: 'Weekly time saved per team' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
  });
  return (
    <div
      id='home'
      ref={parentRef}
      className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-40 bg-neutral-900'
    >
      <BackgroundGrids />
      <CollisionMechanism
        beamOptions={{
          initialX: -400,
          translateX: 600,
          duration: 7,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: -200,
          translateX: 800,
          duration: 4,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 200,
          translateX: 1200,
          duration: 5,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        containerRef={containerRef}
        parentRef={parentRef}
        beamOptions={{
          initialX: 400,
          translateX: 1400,
          duration: 6,
          repeatDelay: 3,
        }}
      />

      <div className='text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-3xl font-semibold tracking-tight text-neutral-300 md:text-7xl'>
        <Balancer>
          <motion.h2>
            {'The operating system that keeps every school day in sync'
              .split(' ')
              .map((word, index) => (
                <motion.span
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className='inline-block'
                  key={index}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
          </motion.h2>
        </Balancer>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.5 }}
        className='relative z-20 mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-200'
      >
        SquareCampus is the all-in-one OS for schools and colleges,connecting admissions,
        academics, finance, communication, and compliance in one responsive command center.
        Every team works from the same playbook with zero manual stitching.
      </motion.p>
      <div className='relative z-20 mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 text-sm text-neutral-200 sm:grid-cols-3'>
        {heroHighlights.map((highlight) => (
          <div
            key={highlight.title}
            className='rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-4 text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.3em] text-white/70'>
              {highlight.title}
            </p>
            <p className='mt-2 text-sm leading-relaxed text-neutral-300'>
              {highlight.detail}
            </p>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.7 }}
        className="mb-10 mt-8 flex w-full flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20"
      >
        {/* Primary entry: existing users dropping into the system */}
        <LinkButton
          as={Link}
          href={CONSTANTS.LOGIN_LINK}
          variant="dark"
          className="group inline-flex w-full max-w-xs items-center justify-center gap-1.5 text-center sm:w-40"
        >
          <span>Login</span>
          <LogIn
            className="h-4 w-4 text-neutral-200 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </LinkButton>

        {/* High-intent entry: new schools booking time with the team */}
        <LinkButton
          data-cal-namespace={calOptions.namespace}
          data-cal-link={CONSTANTS.CALCOM_LINK}
          data-cal-config={`{"layout":"${calOptions.layout}"}`}
          as="button"
          variant="primary"
          className="group inline-flex w-full max-w-xs items-center justify-center gap-1.5 sm:w-40"
        >
          <span>Book a call</span>
          <CalendarClock
            className="h-4 w-4 text-neutral-900 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-6"
            aria-hidden="true"
          />
        </LinkButton>
      </motion.div>
      <div className='relative z-20 mt-6 grid w-full max-w-4xl grid-cols-1 gap-2 text-center sm:grid-cols-3'>
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-2xl border border-neutral-800/60 bg-neutral-900/60 py-6 px-4 text-center'
          >
            <p className='text-lg font-semibold text-white'>{stat.value}</p>
            <p className='text-xs uppercase tracking-[0.3em] text-neutral-400'>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9, ease: 'easeOut' }}
        ref={containerRef}
        className='relative mx-auto max-w-7xl rounded-[32px] border border-neutral-800/50 bg-neutral-700 p-2 backdrop-blur-lg md:p-4'
      >
        <div className='rounded-[24px] border border-neutral-700 bg-black p-2'>
          <Image
            src='/images/marketing/dashboard.png'
            alt='header'
            width={1920}
            height={1080}
            className='rounded-[20px]'
          />
        </div>
      </motion.div>
    </div>
  );
}

const BackgroundGrids = () => {
  return (
    <div className='pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4'>
      <div className='relative h-full w-full'>
        <GridLineVertical className='left-0' />
        <GridLineVertical className='left-auto right-0' />
      </div>
      <div className='relative h-full w-full'>
        <GridLineVertical className='left-0' />
        <GridLineVertical className='left-auto right-0' />
      </div>
      <div className='relative h-full w-full bg-gradient-to-b from-transparent via-neutral-800 to-transparent'>
        <GridLineVertical className='left-0' />
        <GridLineVertical className='left-auto right-0' />
      </div>
      <div className='relative h-full w-full'>
        <GridLineVertical className='left-0' />
        <GridLineVertical className='left-auto right-0' />
      </div>
    </div>
  );
};

type CollisionMechanismProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  parentRef: React.RefObject<HTMLDivElement>;
  beamOptions?: {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };
};

const CollisionMechanism = ({
  parentRef,
  containerRef,
  beamOptions = {},
}: CollisionMechanismProps) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
          if (beamRef.current) {
            beamRef.current.style.opacity = '0';
          }
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
        // Set beam opacity to 0
        if (beamRef.current) {
          beamRef.current.style.opacity = '1';
        }
      }, 2000);

      // Reset the beam animation after a delay
      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate='animate'
        initial={{
          translateY: beamOptions.initialY || '-200px',
          translateX: beamOptions.initialX || '0px',
          rotate: beamOptions.rotate || -45,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || '800px',
            translateX: beamOptions.translateX || '700px',
            rotate: beamOptions.rotate || -45,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          'absolute left-96 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent',
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=''
            style={{
              left: `${collision.coordinates.x + 20}px`,
              top: `${collision.coordinates.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

CollisionMechanism.displayName = 'CollisionMechanism';

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn('absolute z-50 h-2 w-2', props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className='absolute -inset-x-10 top-0 m-auto h-[4px] w-10 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-sm'
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: 'easeOut' }}
          className='absolute h-1 w-1 rounded-full bg-gradient-to-b from-orange-500 to-yellow-500'
        />
      ))}
    </div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          '--background': '#ffffff',
          '--color': 'rgba(0, 0, 0, 0.2)',
          '--height': '5px',
          '--width': '1px',
          '--fade-stop': '90%',
          '--offset': offset || '150px', //-100px if you want to keep the line inside
          '--color-dark': 'rgba(255, 255, 255, 0.3)',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]',
        'bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
        '[background-size:var(--width)_var(--height)]',
        '[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]',
        '[mask-composite:exclude]',
        'z-30',
        className
      )}
    ></div>
  );
};
